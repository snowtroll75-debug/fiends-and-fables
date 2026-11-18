/**
 * Fiends & Fables Prime 0.46.2 — every published Eternal carries Returned
 * Essence (Graham, 18 November 2026).
 *
 *   node tools/returned-essence-0.46.2.mjs [--check]
 *
 * The core Eternal type grants "Darkvision, Nightvision, Eternal Essence,
 * Returned Essence". Only the four Draeglir carried the last of these, so
 * the TRG Prime Codex's full grant reconcile added it on an otherwise
 * unchanged apply of any other published Eternal (found live, 18 Nov 2026).
 * Each Eternal without it receives a copy of the core TRG Prime abilities
 * pack's item (text only; no effects, no automation), shaped like the
 * Draeglir copies. Idempotent: a creature that already has it is untouched.
 * --check reports what would change and exits 1 if anything would.
 */
import path from "node:path";
import { readRaw, writeRaw, assemble, flatten, randomId } from "./lib/packs.mjs";

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const CHECK = process.argv.includes("--check");
const CORE_ABILITIES = process.env.TRG_PRIME_PACKS ? path.join(process.env.TRG_PRIME_PACKS, "abilities") : null;

/** The core item, as the Draeglir copies hold it (text card). */
const FALLBACK = {
  name: "Returned Essence", type: "ability", img: "icons/environment/people/cleric-grey.webp",
  system: {
    source: "Creature Codex", category: "Racial", tier: "", level: 0, prerequisites: "", active: true,
    description: "When you are slain, your native essence returns to your home plane. This prevents you from being restored to life in any way.",
    traits: "", usesPerDay: "", bonusUses: 0, usesValue: 0, sourceRace: "Eternal", sourceClass: ""
  },
  effects: [], folder: null, sort: 0, ownership: { default: 0 }, flags: {}
};

async function coreItem() {
  if (!CORE_ABILITIES) return FALLBACK;
  const doc = assemble(await readRaw(CORE_ABILITIES)).top.map((t) => t.doc).find((d) => d.name === "Returned Essence");
  if (!doc) throw new Error("Returned Essence not found in the core abilities pack");
  const { _id, _stats, ...rest } = structuredClone(doc);
  return { ...rest, effects: [], flags: {}, folder: null, sort: 0, ownership: { default: 0 } };
}

async function main() {
  const template = await coreItem();
  const dir = path.join(ROOT, "packs", "creatures");
  const rows = await readRaw(dir);
  const { top } = assemble(rows);
  const added = [];
  for (const { kind, doc: actor } of top) {
    if (kind !== "actors") continue;
    const type = (actor.items ?? []).find((i) => i.type === "creature-type");
    if (type?.name !== "Eternal") continue;
    if ((actor.items ?? []).some((i) => i.name === "Returned Essence")) continue;
    const item = structuredClone(template);
    item._id = randomId(`${actor._id}-returned-essence`).toLowerCase().replace(/[^a-z0-9]/g, "0").slice(0, 16);
    item.sort = 0;
    actor.items.push(item);
    added.push(actor.name);
  }
  console.log(added.length ? `Returned Essence added to ${added.length} Eternals: ${added.join(", ")}` : "No changes.");
  const out = flatten(top);
  if (added.length && !CHECK) await writeRaw(dir, out);
  if (CHECK && added.length) process.exit(1);
}

main().catch((e) => { console.error(e); process.exit(2); });
