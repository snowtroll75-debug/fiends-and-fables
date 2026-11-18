/**
 * Verifies the 0.46.0 joint-audit repairs in the built packs.
 *
 *   node tools/verify-joint-audit-0.46.0.mjs [packsDir]
 *
 * Every check reads the compiled LevelDB, never the repair script, so a pack
 * that was not rebuilt fails. Run against 0.45.2's packs it reports the
 * defects (see the report for the before/after counts).
 */
import path from "node:path";
import fs from "node:fs";
import { readRaw, assemble, changesOf } from "./lib/packs.mjs";

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const PACKS = path.resolve(process.argv[2] ?? path.join(ROOT, "packs"));
let pass = 0, fail = 0;
const ok = (id, cond, detail = "") => { if (cond) pass++; else { fail++; console.log(`FAIL ${id} ${detail}`); } };

const load = async (n) => assemble(await readRaw(path.join(PACKS, n)));
const creatures = await load("creatures");
const races = await load("races");
const heritages = await load("heritages");
const actors = creatures.top.filter((t) => t.kind === "actors").map((t) => t.doc);
const A = (n) => actors.find((a) => a.name === n);
const words = (item, key) => (item?.effects ?? []).flatMap((e) => changesOf(e).filter((c) => c.key === key).flatMap((c) => String(c.value).split(",").map((w) => w.trim().toLowerCase()).filter(Boolean)));

// Structure
ok("S1 294 creatures", actors.length === 294, String(actors.length));
for (const p of [creatures, races, heritages]) ok(`S2 no orphaned rows (${p.top[0]?.kind})`, p.orphans.length === 0, String(p.orphans.length));
const ids = new Set(actors.map((a) => a._id));
ok("S3 creature ids unique and 16 chars", ids.size === 294 && actors.every((a) => /^[A-Za-z0-9]{16}$/.test(a._id)));
for (const dir of fs.readdirSync(PACKS)) {
  const files = fs.readdirSync(path.join(PACKS, dir));
  ok(`S4 ${dir}: MANIFEST and CURRENT present, no LOCK/LOG`, files.some((f) => f.startsWith("MANIFEST-")) && files.includes("CURRENT") && !files.some((f) => /^(LOCK|LOG|LOG\.old)$/.test(f)), files.join(","));
}

// FF-01 Undead disease immunity
const undead = actors.filter((a) => a.items.some((i) => i.type === "creature-type" && i.name === "Undead"));
ok("FF-01 21 undead", undead.length === 21, String(undead.length));
for (const a of undead) ok(`FF-01 ${a.name} disease immunity`, words(a.items.find((i) => i.type === "creature-type"), "system.combat.immunities").includes("disease"));

// FF-02 Archangel
ok("FF-02 Archangel has no printed-DR calibration", !A("Archangel").effects.some((e) => e.flags?.["fiends-and-fables-prime"]?.calibration === "printedDR"));

// FF-03 calibrations
ok("FF-03 Raven Swarm initiative other 0", Number(A("Raven Swarm").system.combat.initiative.other) === 0);
ok("FF-03 Raven Swarm skill others 0", ["acrobatics", "climbing", "stealth"].every((s) => Number(A("Raven Swarm").system.skills[s].other) === 0));
ok("FF-03 Synarmi initiative other 0", Number(A("Water Primal - Synarmi").system.combat.initiative.other) === 0);
ok("FF-03 Synarmi skill others 0", ["nature", "planes", "survival"].every((s) => Number(A("Water Primal - Synarmi").system.skills[s].other) === 0));

// FF-04 Behir
const behirRace = A("Behir").items.find((i) => i.type === "race");
ok("FF-04 Behir race is Behir", behirRace?.name === "Behir", behirRace?.name);
ok("FF-04 Behir electricity immunity", words(behirRace, "system.combat.immunities").includes("electricity"));

// FF-05 Cave Bear
ok("FF-05 Cave Bear race Bear", A("Cave Bear").items.find((i) => i.type === "race")?.name === "Bear");
ok("FF-05 Cave Bear heritage Cave Bear", A("Cave Bear").items.find((i) => i.type === "heritage")?.name === "Cave Bear");

// FF-06 Mite Swarm
ok("FF-06 Mite Swarm mental immunity (creature)", words(A("Mite Swarm").items.find((i) => i.type === "heritage"), "system.combat.immunities").some((w) => w === "mental"));
ok("FF-06 Mite Swarm mental immunity (heritage pack)", words(heritages.top.find((t) => t.doc.name === "Mite Swarm")?.doc, "system.combat.immunities").some((w) => w === "mental"));

// FF-07 crossbows
for (const a of actors) for (const w of a.items.filter((i) => i.type === "weapon" && /crossbow/i.test(i.name))) {
  ok(`FF-07 ${a.name} ${w.name}`, w.system.group === "Bow" && w.system.ammunitionFamily === "Crossbow" && w.system.category === "Simple");
}

// FF-08 race/heritage packs match their creatures
const plan = JSON.parse(fs.readFileSync(path.join(ROOT, "tools/data/race-heritage-reconcile.json"), "utf8"));
const sig = (i) => JSON.stringify((i?.effects ?? []).map((e) => changesOf(e).map((c) => [c.key, String(c.value)])));
for (const e of plan) {
  const pack = (e.type === "race" ? races : heritages).top.find((t) => t.doc.name === e.name)?.doc;
  const own = A(e.from)?.items.find((i) => i.type === e.type && i.name === e.name);
  ok(`FF-08 ${e.type} ${e.name}`, pack && own && sig(pack) === sig(own));
}

// FF-13 dragon breaths keep their own declarations
const breaths = actors.flatMap((a) => a.items.filter((i) => i.type === "ability" && i.flags?.["fiends-and-fables-prime"]?.breath).map((i) => [a.name, i]));
ok("FF-13 24 dragon breaths found", breaths.length >= 24, String(breaths.length));
for (const [n, i] of breaths) ok(`FF-13 ${n} ${i.name} opts out of inheritance`, i.flags?.["trg-prime"]?.codexInherit === false);
for (const [n, i] of breaths) ok(`FF-13 ${n} ${i.name} Focus, 0 PP`, /\bfocus\b/i.test(String(i.system.traits)) && Number(i.flags["fiends-and-fables-prime"].breath.ppCost ?? 0) === 0);

// FF-16 lich provenance only on the Arcane Lich
for (const a of actors) {
  const stray = a.items.filter((i) => i.flags?.["fiends-and-fables-prime"]?.templateKey && a.name !== "Arcane Lich");
  ok(`FF-16 ${a.name} has no stray template provenance`, stray.length === 0, stray.map((i) => i.name).join(","));
}
ok("FF-16 Arcane Lich keeps its lich provenance", A("Arcane Lich").items.some((i) => i.flags?.["fiends-and-fables-prime"]?.templateKey === "lich"));

// Ammunition: every missile weapon has fitting ammunition (core ammunition.mjs rule)
const family = (w) => String(w.system.ammunitionFamily || w.system.group || "").toLowerCase();
for (const a of actors) for (const w of a.items.filter((i) => i.type === "weapon" && i.system.attackMode === "missile" && String(i.system.category).toLowerCase() !== "natural")) {
  const fits = a.items.filter((i) => i.type === "ammunition" && String(i.system.compatibleWeaponGroup).toLowerCase() === family(w) && Number(i.system.quantity) > 0);
  ok(`AM ${a.name} ${w.name} has ammunition`, fits.length > 0);
}

console.log(`verify-joint-audit-0.46.0: ${pass} passed, ${fail} failed`);
process.exit(fail ? 1 : 0);
