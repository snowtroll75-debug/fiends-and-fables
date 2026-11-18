/**
 * Verifies the 0.46.1 rulings data (tools/rulings-0.46.1.mjs).
 *   node tools/verify-rulings-0.46.1.mjs
 */
import path from "node:path";
import { readRaw, assemble, changesOf } from "./lib/packs.mjs";

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
let pass = 0; const fail = [];
const ok = (label, cond, detail = "") => { if (cond) pass++; else fail.push(`${label}${detail ? ` — ${detail}` : ""}`); };
const actors = assemble(await readRaw(path.join(ROOT, "packs", "creatures"))).top.filter((t) => t.kind === "actors").map((t) => t.doc);
const typeOf = (a) => a.items.find((i) => i.type === "creature-type");

const eternals = actors.filter((a) => typeOf(a)?.name === "Eternal");
ok("RD-01 47 Eternals", eternals.length === 47, String(eternals.length));
for (const a of eternals) ok(`RD-01 ${a.name} has no Death State`, typeOf(a).system.noDeathState === true);

const oozes = actors.filter((a) => typeOf(a)?.name === "Ooze");
ok("CO-02/RD-08 6 Oozes", oozes.length === 6, String(oozes.length));
for (const a of oozes) {
  const e = typeOf(a).effects.find((x) => x.name === "Ooze: immunities");
  const w = changesOf(e).map((c) => String(c.value).replace(/^,\s*/, ""));
  ok(`CO-02/RD-08 ${a.name} immune to disease and precision`, w.includes("disease") && w.includes("precision") && w.length === 9, w.join(", "));
  ok(`CO-02/RD-08 ${a.name} v13 and v14 rows agree`, JSON.stringify((e.changes ?? []).map((c) => String(c.value))) === JSON.stringify((e.system?.changes ?? []).map((c) => String(c.value))));
}

for (const [name, ft] of [["Cold Dragon, Scaleborn", 15], ["Cold Dragon, Talon", 30], ["Cold Dragon, Sovereign", 40]]) {
  const a = actors.find((x) => x.name === name);
  const b = a.items.find((i) => i.flags?.["fiends-and-fables-prime"]?.breath);
  const f = b.flags["fiends-and-fables-prime"];
  ok(`RD-06 ${name} breath ${ft} ft`, f.breath.distance === ft && f.breath.genericDistance === ft);
  ok(`RD-06 ${name} activation area`, b.flags["trg-prime"].creatureAbility.activation.area === `${ft}-foot cone`);
  ok(`RD-06 ${name} description`, b.system.description.includes(`Area: ${ft}-foot cone`) && !/deliberately preserves/.test(b.system.description));
  ok(`RD-06 ${name} no source exception`, !f.sourceException);
  ok(`RD-06 ${name} breath still Focus, 0 PP, own data`, /Focus/.test(b.system.traits) && f.breath.ppCost === 0 && b.flags["trg-prime"].codexInherit === false);
}
ok("RD-06 no source exceptions remain", !actors.some((a) => a.items.some((i) => i.flags?.["fiends-and-fables-prime"]?.sourceException)));

console.log(`verify-rulings-0.46.1: ${pass} passed, ${fail.length} failed`);
for (const f of fail) console.log(`  ✗ ${f}`);
process.exitCode = fail.length ? 1 : 0;
