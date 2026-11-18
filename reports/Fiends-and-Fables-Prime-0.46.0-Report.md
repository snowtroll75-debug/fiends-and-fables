# Fiends & Fables Prime 0.46.0

Joint TRG Prime Codex / Fiends & Fables audit, 18 November 2026. Verified with TRG Prime 3.698.4 (minimum unchanged: 3.663.0), tested in the separate Test world. Fiends & Fables Prime still needs nothing from the Codex, and lists it only as an optional recommendation. All findings for both modules are kept in one register: `reports/joint-audit/CODEX_FIENDS_DEFECT_REGISTER.md`.

All 294 published creatures were derived live on core 3.698.4 and compared with the 283 printed blocks: 6,568 fields, 6,492 equal. Every remaining difference is a rules decision (RD-03 Swim/Climb +4, RD-05 Fearful Strength), a display choice (RD-04 Keen/Acute Sense) or a book misprint. None is unexplained.

## Creature data

- **FF-01 Undead:** the 21 Undead creatures' type now carries the core Undead immunities. The Mummy, for example, is immune to disease.
- **FF-02 Archangel:** the extra "Printed DR 28" effect is removed. DR is 28, as printed (it was 36).
- **FF-03 Raven Swarm and Water Primal – Synarmi:** leftover initiative and skill bonuses removed; Initiative 35 and 20, and the skills are as printed.
- **FF-04 Behir:** the race is the pack's Behir race, with electricity immunity and natural DR.
- **FF-05 Cave Bear:** race Bear, heritage Cave Bear.
- **FF-06 Mite Swarm:** immune to mental effects, as printed.
- **FF-07 Crossbows:** group Bow, ammunition family Crossbow, Simple, so bolts fit.
- **FF-08 Races and heritages:** 11 pack items now match the creatures built from them (Thornkin, Wysp, Spectre, Banshee, Sequoia Allium, Wraith, Wrathmorta, Flying Rug, Animus Statue Giant, Skeleton Warrior, Thel).
- **FF-13 Dragon breath:** all 24 breath weapons keep their own Focus, area, save and 0 PP when another module (Inner Tempest) has a breath with the same name.
- **FF-16:** 21 items with stray template marks are cleared, so a template removal can never delete them.
- **FF-11 Packs:** 10 orphan rows removed. Every pack is rewritten compacted, with no stale tables, logs or locks. IDs, art, descriptions and other flags are unchanged.

## Dragon framework

- **FF-09:** advancing a published dragon keeps the abilities it already has and adds each missing one once. Before, Wing Buffet, Draconic Assault, Ice Climb and Snow Vision were doubled.
- **FF-10:** a generated Bite deals its 1d6 energy damage (acid, cold, fire, poison, force, electricity or coldfire).
- **FF-13:** generated breaths keep their own data.

## Templates

- **FF-12:** Lich Bony Hand deals its 2d8 essence, and the Ghost's attacks deal 1d6 cold. Removing the Ghost restores the original attacks.
- **FF-14:** Skeleton and Zombie give the creature the Mindless trait, so Intelligence and Charisma −5 no longer knock it unconscious. Removal restores its traits.
- **FF-15:** an Undead template on a creature that is already Undead (Ghost or Lich on a Ghoul) keeps the creature's own type and senses.

## Tests

- `tools/verify-joint-audit-0.46.0.mjs`: 422 checks pass. `tools/joint-audit-0.46.0.mjs --check`: no further changes.
- `tests/live/creature-battery.mjs`: the shared behaviour battery, identical in TRG Prime Codex 0.2.0. Results are in `reports/joint-audit/CODEX_FIENDS_REGRESSION_REPORT.md`.
- Still owed after installation: the battery in all three configurations (Core + Fiends, Core + Codex + Fiends, Core + Codex) and a Foundry load check of the rebuilt packs.

## For Graham's ruling

RD-01 to RD-08 are listed in the register. Published data is left as printed until a ruling.

## Proposed for core (not applied)

- **CO-01:** printed-range senses held by base name in the grant workflow. This stops a generic second Darkvision appearing, for example after Ghost on a Ghoul.
- **CO-02:** the Ooze type should grant precision immunity.
