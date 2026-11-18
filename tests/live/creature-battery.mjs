/**
 * SHARED CREATURE BEHAVIOUR BATTERY — TRG Prime Core / Codex / Fiends & Fables.
 *
 * One file, shipped identically in both module repositories (tests/live/), and
 * run in a disposable world under each installation:
 *
 *   Core + Codex, Core + Fiends & Fables, Core + Codex + Fiends & Fables.
 *
 * Usage (GM console, a scratch scene viewed):
 *   const B = await import("<url of this file>");
 *   const results = await B.runBattery({ label: "core+codex+fiends" });
 *
 * Every die is fixed (CONFIG.Dice.randomUniform -> 0.5) for the run, so two
 * installations that behave the same produce identical numbers. Fixtures are
 * created in the folder "ZZ Battery (temporary)" with tokens on the viewed
 * scene; `cleanup()` removes them, their tokens, combats and chat cards.
 *
 * Sections run only when what they need is installed:
 *   CORE      a creature built from the core's own packs (always)
 *   FIENDS    published Fiends & Fables creatures and frameworks
 *   CODEX     a Codex-built creature, and a variant of a published creature
 */
const SYSTEM = "/systems/trg-prime/module/";
const FOLDER = "ZZ Battery (temporary)";
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function folder() {
  return game.folders.find((f) => f.type === "Actor" && f.name === FOLDER) ?? Folder.create({ name: FOLDER, type: "Actor" });
}

async function packDoc(collection, name) {
  const pack = game.packs.get(collection);
  if (!pack) return null;
  const hit = (await pack.getIndex()).find((e) => e.name === name);
  return hit ? pack.getDocument(hit._id) : null;
}

async function place(actor, x, y) {
  const td = await actor.getTokenDocument({ x, y });
  const [t] = await canvas.scene.createEmbeddedDocuments("Token", [td.toObject()]);
  await sleep(250);
  return canvas.tokens.get(t.id);
}

function snapshot(actor) {
  const s = actor.system;
  const c = s.combat;
  const dr = Number(c.naturalArmour?.dr ?? 0) + Math.max(0, Number(c.dr?.total ?? 0)) + Number(c.armour?.dr ?? 0);
  const counts = {};
  for (const i of actor.items) counts[`${i.type}:${i.name}`] = (counts[`${i.type}:${i.name}`] ?? 0) + 1;
  return {
    level: s.identity.level, hp: s.resources.hp.max, pp: s.resources.pp?.max ?? 0,
    db: c.defence.total, saves: [c.saves.fortitude.total, c.saves.reflex.total, c.saves.will.total],
    dr, cr: Number(c.criticalResistance?.total ?? c.criticalResistance ?? 0), deathState: c.deathState,
    abilities: Object.values(s.attributes).map((a) => a.total),
    immunities: String(c.immunities ?? "").split(",").map((x) => x.trim()).filter(Boolean).sort(),
    duplicates: Object.entries(counts).filter(([, n]) => n > 1).map(([k, n]) => `${k}×${n}`)
  };
}

async function coreFixture(f) {
  const parts = [
    ["trg-prime.creature-types", "Undead"], ["trg-prime.creature-classes", "Undead (Creature Class)"],
    ["trg-prime.creature-attacks", "Bite"], ["trg-prime.creature-abilities", "Regeneration"],
    ["trg-prime.creature-abilities", "Stench"]
  ];
  const items = [];
  for (const [c, n] of parts) { const d = await packDoc(c, n); if (!d) throw new Error(`core pack lacks ${n}`); const o = d.toObject(); delete o._id; items.push(o); }
  return Actor.create({
    name: "ZZ Battery core fixture", type: "npc", folder: f.id,
    system: { identity: { level: 6, size: "medium" }, attributes: { strength: { base: 3 }, constitution: { base: 2 }, dexterity: { base: 1 } } },
    items, prototypeToken: { actorLink: true }
  });
}

/** A packet of damage against an actor's current defences (pure core rule). */
async function packet(actor, amount, type) {
  const { resolveAgainstDefences } = await import(`${SYSTEM}combat/damage-workflow.mjs`);
  const r = resolveAgainstDefences(actor.system, { amount, type });
  return { taken: Number(r?.taken ?? NaN), immune: !!r?.immune, dr: Number(r?.drApplied ?? 0) };
}

async function attack(attacker, weaponName, targetToken) {
  const { rollWeaponAttack } = await import(`${SYSTEM}combat/attack-workflow.mjs`);
  for (const t of canvas.tokens.placeables) t.setTarget(t === targetToken, { releaseOthers: false });
  const weapon = attacker.items.find((i) => i.type === "weapon" && i.name === weaponName);
  if (!weapon) return { error: `no ${weaponName}` };
  const check = await rollWeaponAttack(attacker, weapon, { skipTargetPrompt: true });
  await sleep(600);
  return { total: check?.outcome?.total ?? null, degree: check?.outcome?.degree?.key ?? null };
}

export async function runBattery({ label = "unlabelled" } = {}) {
  if (!game.user.isGM) throw new Error("GM only");
  if (!canvas.scene) throw new Error("View a scratch scene first");
  const originalRandom = CONFIG.Dice.randomUniform;
  CONFIG.Dice.randomUniform = () => 0.5;
  const autoDialogs = Hooks.on("renderDialogV2", (app) => setTimeout(() => app.element?.querySelector("footer button[data-action]")?.click(), 120));
  const fiends = !!game.modules.get("fiends-and-fables-prime")?.active;
  const codex = !!game.modules.get("trg-prime-codex")?.active;
  const out = { label, core: game.system.version, fiends: fiends ? game.modules.get("fiends-and-fables-prime").version : null, codex: codex ? game.modules.get("trg-prime-codex").version : null, results: {} };
  const R = out.results;
  const f = await folder();
  try {
    // CORE — identical in every installation.
    const fixture = await coreFixture(f);
    await sleep(1200);
    const fx = game.actors.get(fixture.id);
    R["core.fixture.snapshot"] = snapshot(fx);
    R["core.fixture.packets"] = {
      poison10: await packet(fx, 10, "poison"), slashing10: await packet(fx, 10, "slashing"),
      fire10: await packet(fx, 10, "fire"), essence10: await packet(fx, 10, "essence")
    };
    const fxTok = await place(fx, 200, 200);
    const dummy = await coreFixture(f); await dummy.update({ name: "ZZ Battery core target" });
    const dTok = await place(game.actors.get(dummy.id), 300, 200);
    R["core.attack.bite"] = await attack(fx, "Bite", dTok);

    if (fiends) {
      const pub = async (name, x, y) => {
        const d = (await packDoc("fiends-and-fables-prime.creatures", name)).toObject(); delete d._id; d.folder = f.id; d.name = `ZZ Battery ${name}`;
        const a = await Actor.create(d); await sleep(600); return { a: game.actors.get(a.id), t: await place(game.actors.get(a.id), x, y) };
      };
      for (const n of ["Archangel", "Behir", "Mummy", "Cave Bear", "Raven Swarm", "Cold Dragon, Talon"]) {
        const { a } = await pub(n, 1600, 1600); R[`fiends.${n}.snapshot`] = snapshot(a);
      }
      // Dragon breath: Focus, 0 PP, printed area, damage applied.
      const dragon = await pub("Cold Dragon, Talon", 400, 600);
      const t1 = await pub("Goblin Warrior", 700, 600);
      const breath = dragon.a.items.find((i) => i.name === "Cold Dragon Breath");
      const { declaredArea } = await import(`${SYSTEM}creature-area.mjs`);
      for (const t of canvas.tokens.placeables) t.setTarget(t === t1.t, { releaseOthers: false });
      const pp0 = dragon.a.system.resources.pp.value; const u0 = breath.system.usesValue; const hp0 = t1.t.actor.system.resources.hp.value;
      const { useCreatureAbility } = await import(`${SYSTEM}creature-activation-workflow.mjs`);
      await useCreatureAbility(dragon.a, breath); await sleep(1500);
      R["fiends.breath"] = { intro: declaredArea(breath)?.intro ?? null, ppSpent: pp0 - dragon.a.system.resources.pp.value,
        usesBefore: u0, usesAfter: dragon.a.items.get(breath.id).system.usesValue, targetHpLoss: hp0 - canvas.tokens.get(t1.t.id).actor.system.resources.hp.value };
      // Ranged attack consumes ammunition.
      const archer = await pub("Goblin Warrior", 400, 900);
      const ammo0 = archer.a.items.find((i) => i.type === "ammunition")?.system.quantity;
      R["fiends.archer.attack"] = await attack(archer.a, "Shortbow", t1.t);
      R["fiends.archer.ammo"] = { before: ammo0, after: game.actors.get(archer.a.id).items.find((i) => i.type === "ammunition")?.system.quantity };
      // Templates: apply, repeat, remove — reversible, no duplicates.
      const T = game.fiendsAndFablesPrime?.templates;
      for (const key of ["zombie", "skeleton", "lich", "werewolf"]) {
        const g = await pub("Goblin Warrior", 1600, 1600);
        const s0 = JSON.stringify(snapshot(g.a));
        await T.apply(g.a, key, { force: true }); await sleep(800);
        const during = snapshot(game.actors.get(g.a.id));
        const statuses = [...game.actors.get(g.a.id).statuses];
        await T.remove(game.actors.get(g.a.id), key); await sleep(800);
        R[`fiends.template.${key}`] = { duringDuplicates: during.duplicates, duringStatuses: statuses, restored: JSON.stringify(snapshot(game.actors.get(g.a.id))) === s0 };
      }
      // Dragon advancement: no duplicate abilities, secondary bite packet.
      const adv = await pub("Cold Dragon, Talon", 1600, 1600);
      await game.fiendsAndFablesPrime.dragons.advance(adv.a, 12); await sleep(800);
      const after = game.actors.get(adv.a.id);
      const { creatureSecondaryPackets } = await import(`${SYSTEM}combat/creature-secondary.mjs`);
      R["fiends.dragon.advance"] = { level: after.system.identity.level, duplicates: snapshot(after).duplicates,
        biteSecondary: creatureSecondaryPackets(after.items.find((i) => i.name === "Bite")).map((p) => p.label) };
    }

    if (codex) {
      const api = game.modules.get("trg-prime-codex").api;
      const design = api.construction.newDesign();
      Object.assign(design, { name: "ZZ Battery Codex Undead", level: 6, typeKey: "undead", classKey: "undead", size: "medium", attacks: ["bite"], abilities: ["regeneration", "stench"], regenerationBypass: "fire" });
      const { createCreature } = await import("/modules/trg-prime-codex/module/foundry-adapter.mjs");
      const made = await createCreature(design); await sleep(800);
      await made.update({ folder: f.id });
      R["codex.created.snapshot"] = snapshot(game.actors.get(made.id));
      R["codex.created.ledger"] = { total: made.getFlag("trg-prime-codex", "ledger")?.total ?? null, xpm: made.getFlag("trg-prime-codex", "ledger")?.metrics?.xpm ?? null };
      made.sheet?.close?.();
      if (fiends && api.importCompendiumCreature) {
        const uuid = `Compendium.fiends-and-fables-prime.creatures.Actor.${(await game.packs.get("fiends-and-fables-prime.creatures").getIndex()).find((e) => e.name === "Ghoul")._id}`;
        const { actor } = await api.importCompendiumCreature(uuid, { folder: f.id });
        R["codex.variant.ghoul"] = snapshot(actor);
      }
    }
  } catch (error) {
    R.error = `${error.message}\n${error.stack?.split("\n").slice(0, 3).join(" | ")}`;
  } finally {
    CONFIG.Dice.randomUniform = originalRandom;
    Hooks.off("renderDialogV2", autoDialogs);
  }
  return out;
}

export async function cleanup() {
  const f = game.folders.find((x) => x.type === "Actor" && x.name === FOLDER);
  const ids = game.actors.filter((a) => a.folder?.id === f?.id || a.name.startsWith("ZZ Battery")).map((a) => a.id);
  const tokenIds = canvas.scene?.tokens.filter((t) => ids.includes(t.actorId)).map((t) => t.id) ?? [];
  if (tokenIds.length) await canvas.scene.deleteEmbeddedDocuments("Token", tokenIds);
  for (const c of game.combats.filter((c) => c.scene?.id === canvas.scene?.id)) await c.delete();
  const msgs = game.messages.filter((m) => ids.includes(m.speaker?.actor)).map((m) => m.id);
  if (msgs.length) await ChatMessage.deleteDocuments(msgs);
  if (ids.length) await Actor.deleteDocuments(ids);
  if (f) await f.delete();
  return { actors: ids.length, tokens: tokenIds.length, messages: msgs.length };
}
