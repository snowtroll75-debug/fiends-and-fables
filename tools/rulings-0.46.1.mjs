/**
 * Fiends & Fables Prime 0.46.1 — Graham's rulings of 18 November 2026 on the
 * joint TRG Prime Codex / Fiends & Fables audit, carried into the published
 * creatures. Each change names its ruling.
 *
 *   node tools/rulings-0.46.1.mjs [--check]
 *
 * Old-value matched and idempotent: a value that is neither the old nor the
 * new one is reported and left alone. --check reports what would change and
 * exits 1 if anything would. Document IDs are preserved everywhere.
 *
 *   RD-01  Eternal has no Death State: the 47 embedded Eternal types take
 *          `noDeathState: true`, as core 3.699.0's Eternal type does.
 *   CO-02 / RD-08  Ooze is immune to precision and disease: the 6 embedded
 *          "Ooze: immunities" effects take core 3.699.0's rows.
 *   RD-06  The Dragon Level Table is followed: Cold Dragon, Talon breathes a
 *          30-foot cone (was the printed 20) and Cold Dragon, Sovereign a
 *          40-foot cone (was 30).
 */
import path from "node:path";
import { readRaw, writeRaw, assemble, flatten, changesOf, setChanges } from "./lib/packs.mjs";

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const CHECK = process.argv.includes("--check");
const log = [];
const note = (id, text) => log.push(`${id}: ${text}`);

const OOZE_OLD = ["mental", "poison", "sleep", "paralyzed", "polymorph", "stunned", "flatFooted"];
const OOZE_NEW = ["disease", "mental", "poison", "sleep", "paralyzed", "polymorph", "precision", "stunned", "flatFooted"];
const OOZE_OLD_TEXT = "Immune to mental, poison, sleep, paralyzed, polymorph, stunned, flatFooted.";
const OOZE_NEW_TEXT = "Immune to disease, mental, poison, sleep, paralyzed, polymorph, precision, stunned, flatFooted.";
const words = (effect) => changesOf(effect).filter((c) => c.key === "system.combat.immunities").map((c) => String(c.value).replace(/^,\s*/, ""));
const sameList = (a, b) => JSON.stringify(a) === JSON.stringify(b);

const COLD = {
  "Cold Dragon, Talon": { from: 20, to: 30 },
  "Cold Dragon, Sovereign": { from: 30, to: 40 }
};

async function main() {
  const dir = path.join(ROOT, "packs", "creatures");
  const rows = await readRaw(dir);
  const { top } = assemble(rows);
  let eternal = 0, ooze = 0;
  const refused = [];

  for (const { kind, doc: actor } of top) {
    if (kind !== "actors") continue;
    for (const item of actor.items ?? []) {
      if (item.type !== "creature-type") continue;
      // RD-01
      if (item.name === "Eternal") {
        if (item.system?.noDeathState === false) { item.system.noDeathState = true; eternal++; }
        else if (item.system?.noDeathState !== true) refused.push(`${actor.name}: Eternal noDeathState is ${item.system?.noDeathState}`);
      }
      // CO-02 / RD-08
      if (item.name === "Ooze") {
        const effect = (item.effects ?? []).find((e) => e.name === "Ooze: immunities");
        if (!effect) { refused.push(`${actor.name}: no "Ooze: immunities" effect`); continue; }
        const have = words(effect);
        if (sameList(have, OOZE_NEW)) continue;
        if (!sameList(have, OOZE_OLD)) { refused.push(`${actor.name}: Ooze immunities are [${have.join(", ")}]`); continue; }
        setChanges(effect, OOZE_NEW.map((w) => ({ key: "system.combat.immunities", mode: 2, value: `, ${w}`, priority: 20 })));
        if (effect.description === OOZE_OLD_TEXT) effect.description = OOZE_NEW_TEXT;
        ooze++;
      }
    }
    // RD-06
    const cold = COLD[actor.name];
    if (cold) {
      const breath = (actor.items ?? []).find((i) => i.flags?.["fiends-and-fables-prime"]?.breath);
      const f = breath?.flags?.["fiends-and-fables-prime"];
      if (f?.breath?.distance === cold.to && !f.sourceException) continue;
      if (f?.breath?.distance !== cold.from || f.breath.genericDistance !== cold.to) { refused.push(`${actor.name}: breath distance ${f?.breath?.distance}`); continue; }
      f.breath.distance = cold.to;
      delete f.sourceException;
      const act = breath.flags?.["trg-prime"]?.creatureAbility?.activation;
      if (act?.area === `${cold.from}-foot cone`) act.area = `${cold.to}-foot cone`;
      breath.system.description = String(breath.system.description ?? "")
        .replace(`Area: ${cold.from}-foot cone`, `Area: ${cold.to}-foot cone`)
        .replace(` The generic Dragon Level Table gives a ${cold.to}-foot cone at this advancement; this ready-made Actor deliberately preserves the printed ${cold.from}-foot Cold Dragon example.`,
          ` The cone follows the Dragon Level Table (Graham's ruling, 18 November 2026; the printed example gave ${cold.from} feet).`);
      note("RD-06", `${actor.name}: breath ${cold.from}-foot cone → ${cold.to}-foot cone (Dragon Level Table).`);
    }
  }
  if (eternal) note("RD-01", `${eternal} embedded Eternal types: no Death State.`);
  if (ooze) note("CO-02/RD-08", `${ooze} embedded Ooze types: immune to disease and precision.`);
  for (const r of refused) note("REFUSED", r);

  const out = flatten(top);
  const same = out.size === rows.size && [...out].every(([k, v]) => JSON.stringify(v) === JSON.stringify(rows.get(k)));
  console.log(log.join("\n") || "No changes.");
  if (!same && !CHECK) await writeRaw(dir, out);
  if (refused.length) process.exit(3);
  if (CHECK && !same) process.exit(1);
}

main().catch((e) => { console.error(e); process.exit(2); });
