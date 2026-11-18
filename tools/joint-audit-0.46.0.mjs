/**
 * Fiends & Fables Prime 0.46.0 — data repairs from the joint Codex / Fiends &
 * Fables audit (18 November 2026). Each repair names its defect-register ID.
 *
 *   node tools/joint-audit-0.46.0.mjs [--check]
 *
 * Reads packs/<name>, applies the repairs in memory, and writes each pack back
 * as a freshly compacted LevelDB. Idempotent: a second run changes nothing.
 * --check reports what would change and exits 1 if anything would.
 *
 * Document IDs are preserved everywhere. Records that no parent lists
 * (orphaned rows from earlier rebuilds) are dropped (FF-11).
 */
import fs from "node:fs";
import path from "node:path";
import { readRaw, writeRaw, assemble, flatten, changesOf, setChanges } from "./lib/packs.mjs";

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const CHECK = process.argv.includes("--check");
const log = [];
const note = (id, text) => log.push(`${id}: ${text}`);

// TRG Prime 3.627.1+ (current 3.698.4) Undead type, "Undead: immunities".
const UNDEAD_IMMUNITIES = ["bleeding", "poison", "sleep", "disease", "paralyzed", "soul drain", "subdual", "stunned"];

const sigOf = (item) => JSON.stringify((item?.effects ?? []).map((e) => changesOf(e).map((c) => [c.key, String(c.value)])));

async function load(name) {
  const dir = path.join(ROOT, "packs", name);
  const rows = await readRaw(dir);
  const { top, orphans } = assemble(rows);
  return { name, dir, rows, top, orphans };
}

function actor(pack, name) {
  const hit = pack.top.find((t) => t.kind === "actors" && t.doc.name === name);
  if (!hit) throw new Error(`Actor not found: ${name}`);
  return hit.doc;
}
function item(pack, name) {
  const hit = pack.top.find((t) => t.kind === "items" && t.doc.name === name);
  if (!hit) throw new Error(`Item not found in ${pack.name}: ${name}`);
  return hit.doc;
}

/** Make an embedded item carry a pack entry's mechanics, keeping its own id and placement. */
function adoptPackItem(embedded, packItem, keepFlags = true) {
  const id = embedded._id;
  const sort = embedded.sort;
  const flags = keepFlags ? embedded.flags : packItem.flags;
  const effectIds = (embedded.effects ?? []).map((e) => e._id);
  const replacement = structuredClone(packItem);
  replacement._id = id;
  replacement.sort = sort;
  replacement.flags = { ...structuredClone(packItem.flags ?? {}), ...structuredClone(flags ?? {}) };
  replacement.effects = (replacement.effects ?? []).map((e, i) => ({ ...e, _id: effectIds[i] ?? e._id }));
  return replacement;
}

async function main() {
  const creatures = await load("creatures");
  const races = await load("races");
  const heritages = await load("heritages");
  const abilities = await load("abilities");
  const feats = await load("feats");
  const templates = await load("templates");
  const all = [creatures, races, heritages, abilities, feats, templates];
  const actors = creatures.top.filter((t) => t.kind === "actors").map((t) => t.doc);

  // FF-01: the 21 undead carry a pre-3.627.1 copy of the Undead type without disease immunity.
  let fixedUndead = 0;
  for (const a of actors) {
    const type = a.items.find((i) => i.type === "creature-type" && i.name === "Undead");
    if (!type) continue;
    const eff = type.effects.find((e) => /immunities/i.test(e.name));
    if (!eff) continue;
    const have = changesOf(eff).map((c) => String(c.value).replace(/^,\s*/, ""));
    if (UNDEAD_IMMUNITIES.every((x) => have.includes(x))) continue;
    setChanges(eff, UNDEAD_IMMUNITIES.map((x) => ({ key: "system.combat.immunities", type: "add", value: `, ${x}`, priority: 20 })));
    fixedUndead++;
  }
  if (fixedUndead) note("FF-01", `Undead type on ${fixedUndead} creatures now carries disease immunity (core 3.627.1+ type).`);

  // FF-02: Archangel's printed-DR calibration double-counts the heritage's natural DR 8.
  {
    const a = actor(creatures, "Archangel");
    const before = a.effects.length;
    a.effects = a.effects.filter((e) => e.flags?.["fiends-and-fables-prime"]?.calibration !== "printedDR");
    if (a.effects.length !== before) note("FF-02", "Archangel: removed the 'Printed DR 28' calibration (Survival Instinct 20 + natural 8 = printed 28).");
  }

  // FF-03: stale initiative and skill calibrations (book: init = (Dex + Wis) x 5).
  for (const [name, init, skills] of [
    ["Raven Swarm", 0, ["acrobatics", "climbing", "stealth"]],
    ["Water Primal - Synarmi", 0, ["nature", "planes", "survival"]]
  ]) {
    const a = actor(creatures, name);
    let changed = false;
    if (Number(a.system.combat.initiative.other) !== init) { a.system.combat.initiative.other = init; changed = true; }
    for (const s of skills) if (Number(a.system.skills[s].other) !== 0) { a.system.skills[s].other = 0; changed = true; }
    if (changed) note("FF-03", `${name}: initiative 'other' and ${skills.join("/")} 'other' calibrations cleared to match the printed block.`);
  }

  // FF-04: Behir's race item is a renamed copy of the Behir race without its electricity immunity.
  {
    const a = actor(creatures, "Behir");
    const idx = a.items.findIndex((i) => i.type === "race");
    if (a.items[idx].name !== "Behir") {
      a.items[idx] = adoptPackItem(a.items[idx], item(races, "Behir"));
      note("FF-04", "Behir: race item 'Bulette' replaced by the pack's Behir race (adds the printed electricity immunity).");
    }
  }

  // FF-05: Cave Bear was assembled from the Boar race and a customised Kothorn heritage.
  {
    const a = actor(creatures, "Cave Bear");
    const r = a.items.findIndex((i) => i.type === "race");
    const h = a.items.findIndex((i) => i.type === "heritage");
    if (a.items[r].name !== "Bear") {
      a.items[r] = adoptPackItem(a.items[r], item(races, "Bear"));
      a.items[h] = adoptPackItem(a.items[h], item(heritages, "Cave Bear"));
      note("FF-05", "Cave Bear: race Boar/heritage Kothorn replaced by race Bear/heritage Cave Bear (identical totals).");
    }
  }

  // FF-06: Mite Swarm's printed mental immunity.
  {
    const a = actor(creatures, "Mite Swarm");
    for (const target of [a.items.find((i) => i.type === "heritage" && i.name === "Mite Swarm"), item(heritages, "Mite Swarm")]) {
      const eff = target.effects.find((e) => changesOf(e).some((c) => c.key === "system.combat.immunities"));
      const rows = changesOf(eff).map((c) => ({ ...c }));
      const row = rows.find((c) => c.key === "system.combat.immunities");
      if (!/\bmental\b/i.test(String(row.value))) {
        row.value = String(row.value).replace(/,\s*reactions/i, ", mental, reactions");
        if (!/\bmental\b/.test(row.value)) row.value += ", mental";
        setChanges(eff, rows);
        note("FF-06", `Mite Swarm (${target === a.items.find((i) => i.type === "heritage") ? "creature" : "heritage pack"}): mental immunity added as printed.`);
      }
    }
  }

  // FF-07: crossbow copies predate core 3.575.0 (group Crossbow; one categorised Unarmed).
  for (const a of actors) for (const w of a.items) {
    if (w.type !== "weapon" || !/crossbow/i.test(w.name) || w.system.natural) continue;
    const before = JSON.stringify([w.system.group, w.system.ammunitionFamily, w.system.category]);
    w.system.group = "Bow"; w.system.ammunitionFamily = "Crossbow"; w.system.category = "Simple";
    if (JSON.stringify([w.system.group, w.system.ammunitionFamily, w.system.category]) !== before) note("FF-07", `${a.name} ${w.name}: group Bow, ammunition family Crossbow, category Simple (core weapons pack).`);
  }

  // FF-08: race / heritage pack entries that lag their (book-verified) creatures.
  const drift = JSON.parse(fs.readFileSync(path.join(ROOT, "tools/data/race-heritage-reconcile.json"), "utf8"));
  for (const entry of drift) {
    const pack = entry.type === "race" ? races : heritages;
    const target = item(pack, entry.name);
    const source = actors.find((a) => a.name === entry.from)?.items.find((i) => i.type === entry.type && i.name === entry.name);
    if (!source) throw new Error(`No creature ${entry.from} with ${entry.type} ${entry.name}`);
    if (sigOf(source) === sigOf(target)) continue;
    if (source.effects.length === target.effects.length) {
      target.effects.forEach((e, i) => setChanges(e, changesOf(source.effects[i]).map((c) => ({ ...c }))));
    } else {
      // The creature carries an effect the pack entry lacks: take the creature's
      // effects whole, keeping the pack's own effect ids where they line up.
      target.effects = source.effects.map((e, i) => ({ ...structuredClone(e), _id: target.effects[i]?._id ?? e._id }));
    }
    note("FF-08", `${entry.type} '${entry.name}' pack entry now matches ${entry.from} (${entry.why}).`);
  }

  // FF-13: a dragon's printed breath is the module's own. By name, core's Codex
  // inheritance gave the Cold, Fire and Light breaths Inner Tempest's companion
  // breath (a 15-foot cone / 30-foot line at every age). Opt every breath out,
  // so core reads the printed shape, distance and dice from the breath flag.
  let optedOut = 0;
  for (const a of actors) for (const i of a.items) {
    if (i.type !== "ability" || !i.flags?.["fiends-and-fables-prime"]?.breath) continue;
    if (i.flags?.["trg-prime"]?.codexInherit === false) continue;
    i.flags["trg-prime"] = { ...(i.flags["trg-prime"] ?? {}), codexInherit: false };
    optedOut++;
  }
  if (optedOut) note("FF-13", `${optedOut} dragon breath weapons opt out of name-based Codex inheritance (Inner Tempest's companion breaths no longer override the printed areas).`);

  // FF-16: twenty undead were built from the Arcane Lich, and their Undead type
  // (and the Shade Wraith's Faultless Casting) still carry the lich template's
  // provenance (templateKey "lich"). Removing a lich template from any of them
  // deleted the creature's own type. Only the Arcane Lich is a lich-template
  // creature; everywhere else the provenance is cleared.
  let cleared = 0;
  for (const a of actors) {
    if (a.flags?.["fiends-and-fables-prime"]?.templates?.lich || a.name === "Arcane Lich") continue;
    for (const i of a.items) {
      const f = i.flags?.["fiends-and-fables-prime"];
      if (!f?.templateKey) continue;
      delete f.templateKey; delete f.templateGenerated;
      cleared++;
    }
  }
  if (cleared) note("FF-16", `${cleared} items on non-lich creatures no longer carry the lich template's provenance.`);

  // FF-11: drop orphaned rows and rewrite each pack compacted.
  let changedAny = false;
  for (const p of all) {
    const rows = flatten(p.top);
    const same = rows.size === p.rows.size && [...rows].every(([k, v]) => JSON.stringify(v) === JSON.stringify(p.rows.get(k)));
    if (p.orphans.length) note("FF-11", `${p.name}: ${p.orphans.length} orphaned rows removed.`);
    // Hygiene (FF-11): every pack is rewritten compacted, so stale tables,
    // LOG files and superseded .log generations never ship.
    const files = fs.readdirSync(p.dir);
    const stale = files.some((f) => /^LOG|^LOCK$/.test(f)) || files.filter((f) => f.endsWith(".log")).some((f) => fs.statSync(path.join(p.dir, f)).size > 0);
    if (same && !stale) continue;
    if (!same) changedAny = true;
    if (stale && same) note("FF-11", `${p.name}: rewritten compacted (stale LevelDB files removed).`);
    if (!CHECK) await writeRaw(p.dir, rows);
  }
  console.log(log.join("\n") || "No changes.");
  if (CHECK && changedAny) process.exit(1);
}

main().catch((e) => { console.error(e); process.exit(2); });
