/**
 * Fiends & Fables Prime — feat automation (0.11.1).
 *
 * Chapter 3 of Fiends & Fables 2.8 adds ten feats. Seven already ship in the
 * core feats compendium (Crimson Covenant, Ebon Bind, Enhanced Hearing / Smell /
 * Vision, Grave Authority, Howling Kinship). The remaining three live in this
 * module's `feats` pack, and the two familiar feats get a Use button here:
 *
 *   ABYSSAL FAMILIAR  "Your familiar becomes a quasit. You replace its base
 *                      statistics with those of a quasit."
 *   NIRVANIC FAMILIAR "Your familiar becomes a cherubim. You replace its base
 *                      statistics with those of a cherubim."
 *
 * Core's Familiar engine builds every familiar from ONE stat block (the form is
 * appearance only), so "replace its base statistics" cannot be expressed on a
 * `familiar`-type actor — that actor type has no place for a creature's own
 * scores, attacks and abilities. The feat instead draws the creature from this
 * module's creature compendium as a linked actor bound to the master, carries
 * the old familiar's chosen abilities across, and (with confirmation) retires
 * the old familiar actor. Core's own one-familiar-per-master guard only counts
 * `familiar`-type actors, so the replacement never trips it.
 *
 * Registration is additive: core exports FEAT_AUTOMATION as a plain object and
 * looks feats up by lower-cased name, so adding two keys is all the wiring the
 * actor sheet needs to show the Use button.
 *
 * SCALY RESILIENCE is a manual conditional (+1 circumstance to DB or a save
 * against a dragon's breath weapon, plus Resistance to that breath) authored on
 * the feat itself via core's `conditionals` flag; it needs no script.
 */

const MODULE_ID = "fiends-and-fables-prime";
const SYSTEM_ID = "trg-prime";
const CREATURES_PACK = `${MODULE_ID}.creatures`;

const FAMILIAR_FEATS = {
  "abyssal familiar": { creature: "Quasit", deity: "your deity or patron" },
  "nirvanic familiar": { creature: "Cherubim", deity: "your deity" }
};

function ownsFeat(actor, name) {
  const wanted = String(name).trim().toLowerCase();
  return Array.from(actor?.items ?? []).some(
    (i) => i.type === "feat" && String(i.name).trim().toLowerCase() === wanted
  );
}

/** Core `familiar`-type actors bound to this master. */
function coreFamiliarsOf(master) {
  return Array.from(game.actors ?? []).filter(
    (a) => a.type === "familiar" && String(a.system?.familiar?.masterId ?? "") === master.id
  );
}

/** Creature familiars this module has already drawn forth for this master. */
function moduleFamiliarsOf(master) {
  return Array.from(game.actors ?? []).filter(
    (a) => String(a.getFlag(MODULE_ID, "familiar")?.masterId ?? "") === master.id
  );
}

async function confirm(title, content) {
  const { DialogV2 } = foundry.applications.api;
  return DialogV2.confirm({
    window: { title, icon: "fa-solid fa-crow" },
    classes: [SYSTEM_ID],
    position: { width: 480 },
    content: `<div class="${SYSTEM_ID} trg-check-dialog">${content}</div>`,
    rejectClose: false,
    modal: true
  });
}

async function drawForthFamiliar(master, featItem, spec) {
  if (!game.user.isGM && !master.isOwner) {
    ui.notifications.warn("Only the character's owner or a GM can draw forth a familiar.");
    return null;
  }
  if (!ownsFeat(master, "Familiar") && !master.getFlag(SYSTEM_ID, "hasFamiliar")) {
    ui.notifications.warn(`${featItem.name} requires the Familiar feat — ${master.name} has no familiar to replace.`);
    return null;
  }
  const already = moduleFamiliarsOf(master);
  if (already.length) {
    ui.notifications.warn(
      `${master.name} already has ${already.map((a) => a.name).join(", ")}. Delete that actor first if it has died or been dismissed.`
    );
    return null;
  }

  const pack = game.packs.get(CREATURES_PACK);
  const index = pack ? await pack.getIndex() : null;
  const entry = index?.find((e) => e.name === spec.creature);
  const source = entry ? await pack.getDocument(entry._id) : null;
  if (!source) {
    ui.notifications.error(`${featItem.name}: ${spec.creature} is missing from the Fiends & Fables creature compendium.`);
    return null;
  }

  const old = coreFamiliarsOf(master);
  const oldNames = old.map((a) => a.name).join(", ");
  const ok = await confirm(
    featItem.name,
    `<p>You commune with ${spec.deity} and draw forth a <strong>${spec.creature}</strong>, which becomes ${master.name}'s familiar.</p>` +
      (old.length
        ? `<p>The existing familiar actor <strong>${oldNames}</strong> will be <strong>deleted</strong>; its chosen familiar abilities are carried across to the ${spec.creature}.</p>`
        : `<p>No familiar actor is bound to ${master.name} yet; the ${spec.creature} will be created as the familiar.</p>`) +
      `<p>The ${spec.creature}'s own statistics replace the familiar stat block, exactly as printed.</p>`
  );
  if (!ok) return null;

  const data = source.toObject();
  delete data._id;
  data.name = `${master.name}'s ${spec.creature} Familiar`;
  data.ownership = { ...(master.ownership ?? {}) };
  data.prototypeToken = foundry.utils.mergeObject(data.prototypeToken ?? {}, {
    name: data.name, actorLink: true, disposition: CONST.TOKEN_DISPOSITIONS.FRIENDLY
  });
  data.folder = master.folder?.id ?? null;
  foundry.utils.setProperty(data, `flags.${SYSTEM_ID}.grantedBy`, {
    sourceId: featItem.id, sourceName: featItem.name, actorId: master.id
  });
  foundry.utils.setProperty(data, `flags.${MODULE_ID}.familiar`, {
    masterId: master.id, masterName: master.name, feat: featItem.name, creature: spec.creature
  });
  // The old familiar's chosen abilities (Empathic Link and the picks from the
  // core familiars compendium) come across; its stat-block race, and what that
  // race granted (Nightvision, the Tiny bite — they carry a grantedBy flag), do
  // not — the creature brings its own senses and attacks.
  const carried = [];
  for (const f of old) {
    for (const item of f.items) {
      if (item.type !== "ability") continue;
      if (item.getFlag(SYSTEM_ID, "grantedBy")) continue;
      if (source.items.some((i) => i.name === item.name)) continue;
      const o = item.toObject();
      delete o._id;
      carried.push(o);
    }
  }
  if (carried.length) data.items = [...(data.items ?? []), ...carried];

  const familiar = await Actor.create(data);
  if (!familiar) return null;

  if (old.length) {
    await Actor.deleteDocuments(old.map((a) => a.id));
  }
  await master.setFlag(SYSTEM_ID, "hasFamiliar", true);

  const s = familiar.system;
  await ChatMessage.create({
    speaker: ChatMessage.getSpeaker({ actor: master }),
    content:
      `<div class="${SYSTEM_ID}"><h3>${featItem.name}</h3>` +
      `<p><strong>${familiar.name}</strong> answers the call${old.length ? `, taking the place of ${oldNames}` : ""}.</p>` +
      `<p>DB ${s.combat?.defence?.total ?? "?"}, HP ${s.resources?.hp?.max ?? "?"}; ` +
      `Fort +${s.combat?.saves?.fortitude?.total ?? 0}, Ref +${s.combat?.saves?.reflex?.total ?? 0}, Will +${s.combat?.saves?.will?.total ?? 0}.</p>` +
      (carried.length ? `<p>Carried across: ${carried.map((c) => c.name).join(", ")}.</p>` : "") +
      `</div>`
  });
  return familiar;
}

Hooks.once("ready", async () => {
  let workflow;
  try {
    workflow = await import(`${window.location.origin}/systems/${SYSTEM_ID}/module/feats-workflow.mjs`);
  } catch (err) {
    console.warn(`${MODULE_ID} | feats-framework: could not reach core's feat registry`, err);
    return;
  }
  const registry = workflow?.FEAT_AUTOMATION;
  if (!registry || Object.isFrozen(registry)) {
    console.warn(`${MODULE_ID} | feats-framework: core's FEAT_AUTOMATION is not extensible; familiar feats fall back to their descriptions.`);
    return;
  }
  for (const [key, spec] of Object.entries(FAMILIAR_FEATS)) {
    if (registry[key]) continue; // core has since built it — its version wins
    registry[key] = {
      hint: `Draw forth a ${spec.creature} from the Fiends & Fables compendium as your familiar, replacing the familiar stat block with the creature's own.`,
      use: (actor, item) => drawForthFamiliar(actor, item, spec)
    };
  }
  console.log(`${MODULE_ID} | feats-framework: registered ${Object.keys(FAMILIAR_FEATS).length} familiar feats.`);
});
