# Codex / Fiends & Fables — single cross-module defect register

Joint audit of TRG Prime Core 3.698.4, TRG Prime Codex 0.1.5 → **0.2.0** and Fiends & Fables Prime 0.45.2 → **0.46.0**, 18 November 2026.

This is the only defect list for the audit. Every finding has exactly one owner: **Core**, **Codex**, **Fiends** (Fiends & Fables Prime), or **Rules** (a decision for Graham). The other reports refer to these IDs rather than keeping their own lists.

Status key:
- **Fixed — live**: repaired, and the repair was exercised in the Test world during this audit. Those runs used development copies served from a scratch folder, not the installed module, so the post-install re-run (§6) is still owed.
- **Fixed — static**: repaired and checked by the Node suites or pack verifiers. A live check is planned for the post-install battery.
- **Proposed**: drafted for a module Graham owns separately (Core). Not applied or deployed.
- **Decision**: needs Graham's ruling. Data is left as printed until he rules.
- **Note**: checked and found correct or harmless. Recorded so nobody re-investigates it.

Baseline check: the uploaded `fiends-and-fables-prime.zip` 0.45.2 is the GitHub 0.45.2 release after Foundry v14's load-time migration. Normalised, both copies hold the same documents. The only differences are schema defaults Foundry fills in, and 10 orphan effect rows that appear only in the GitHub copy (FF-11). The repairs were made on the GitHub tree, so the repository history stays intact.

---

## 1. Fiends & Fables Prime (owner: Fiends) — fixed in 0.46.0

| ID | Area | Symptom | Root cause | Repair | Evidence | Status |
|---|---|---|---|---|---|---|
| FF-01 | Creature types | The 21 Undead creatures lacked the core Undead type's condition immunities. For example, the Mummy could contract disease. | Embedded copies of the Undead type had drifted from core 3.698.4, missing immunity rows. Every other embedded type and class matched core. | The embedded Undead type now carries the core rows: bleeding, poison, sleep, disease, paralyzed, soul drain, subdual, stunned. | Verifier FF-01 (21 actors). Live: the Mummy is immune to disease. | Fixed — live |
| FF-02 | Archangel | DR 36 against a printed 28. | A "Printed DR 28" calibration effect was stacked on top of DR that the race and armour already supplied. | The calibration effect is removed. Nothing else changed. | Live: DR 28. | Fixed — live |
| FF-03 | Raven Swarm, Water Primal – Synarmi | Initiative and three skills each 1–5 higher than printed. | Leftover `initiative.other` and skill `other` bonuses. | Those bonuses set to 0. | Live: Raven Swarm Init 35 and skills 8. Synarmi Init 20; Nature 15, Planes 12, Survival 14. | Fixed — live |
| FF-04 | Behir | Race item was a stub without the printed electricity immunity or natural DR. | The embedded race had never been replaced by the pack's Behir race. | The pack race is adopted with its ID kept. | Live: electricity immune, HP 215, DB 25, STR 7. | Fixed — live |
| FF-05 | Cave Bear | Race was "Cave Bear", so the shared Bear race traits were missing. | Race and heritage were the wrong way round. | Race is now Bear and heritage is Cave Bear. | Live: every derived statistic matches the printed block. | Fixed — live |
| FF-06 | Mite Swarm | Printed immunity to mental effects was missing. | The heritage and creature lacked the row. | Row added on both the creature and the pack heritage. | Verifier FF-06. | Fixed — static |
| FF-07 | Crossbows (all creature stat-block crossbows) | Core's ammunition-fit check rejected bolts for the creatures' crossbows. | Group was "Crossbow" with no ammunition family. Core fits ammunition by `compatibleWeaponGroup` against the weapon group and family. | Group set to Bow, ammunition family to Crossbow, category to Simple, matching the core weapon pack. | Verifier ammunition check. Live archer: +9 hit, ammunition 20→19. | Fixed — live (bow), static (crossbow) |
| FF-08 | Races and heritages | Eleven pack race/heritage items differed from the copies embedded in their own creatures: Thornkin, Wysp, Spectre, Banshee, Sequoia Allium, Wraith, Wrathmorta, Flying Rug, Animus Statue Giant, Skeleton Warrior, Thel. | The pack items were edited after the creatures were built. A creature dragged from the pack and a variant built from the race item would disagree. | The pack items now match the creature copies, which match the printed blocks. Effect IDs are kept. `tools/data/race-heritage-reconcile.json` lists every change. | Verifier FF-08. | Fixed — static |
| FF-09 | Dragon framework | Advancing a published dragon added a second Wing Buffet, Draconic Assault, Ice Climb and so on beside the dragon's own. | The rebuild loop treated only `dragonGenerated` items as existing. Published dragons' abilities carry no such mark. | The loop now keeps abilities the dragon already has, removes only outgrown framework-managed ones, and adds each missing ability once. | Live: Cold Dragon Talon advanced; no duplicates. | Fixed — live |
| FF-10 | Dragon framework | Generated dragon Bites did not deal their 1d6 energy damage. | The framework wrote `flags.fiends-and-fables-prime.secondaryDamage`, which core never reads. | It also writes `flags.trg-prime.creatureAttack.secondary` = [{1d6, energy}], which core rolls. | Live: Bite deals 1d6 cold. | Fixed — live |
| FF-11 | All packs | 10 orphan effect rows; packs contained LOG/LOCK and stale tables. | Old build artefacts. | Orphans dropped; every pack rewritten fresh and compacted. Every surviving key and ID is preserved. | Verifier S1–S4. Pack diff: only orphans and FF-02 removed. | Fixed — static (Foundry load in post-install run) |
| FF-12 | Template framework | Lich Bony Hand's 2d8 essence and Ghost Essence Attacks' 1d6 cold were never dealt. | Same unread module flag as FF-10. | The core packet is written on apply. The Ghost's previous `creatureAttack` is snapshotted and restored on removal. | Live: Lich 2d8 essence; Ghost 1d6 cold; removal restores the attack. | Fixed — live |
| FF-13 | Breath weapons | With Inner Tempest installed, published dragon breaths took Inner Tempest's "Cold/Fire/Light Dragon Breath" area. The 20-ft area became 15 ft. | Core Codex inheritance federates abilities by base name across every sourcebook. Inner Tempest's dragon breaths share these names. | All 24 published breaths and the framework's generated breaths set `codexInherit: false` and keep their own Focus and area data. This is the documented core opt-out. | Battery A showed 15 ft with Inner Tempest and 20 ft without. Verifier FF-13. | Fixed — static (live re-check in post-install battery, config A) |
| FF-14 | Skeleton / Zombie templates | Setting Intelligence and Charisma to −5 knocked the creature unconscious (ability collapse). | Core exempts a creature only when "Mindless" is in `system.details.traits`. The templates granted Mindless only as an ability card. | The template adds the Mindless trait when its custom grants include Mindless or it sets Intelligence ≤ −5. The previous traits are stored and restored on removal or rollback. | Live: Int/Cha −5, conscious; removal restores traits. | Fixed — live |
| FF-15 | Undead templates on Undead creatures | Ghost or Lich on a Ghoul replaced the Ghoul's own Undead type. Removing the template then deleted it, along with the senses it granted. | The template replaced the type unconditionally. | The type is replaced only when the creature is not already Undead. | Live: Ghost and Lich on a Ghoul applied and removed; type and senses intact. | Fixed — live |
| FF-16 | Template provenance | 21 items on non-lich creatures carried stray `templateKey: "lich"` or `templateGenerated` marks. Removing a template could delete them. | Build residue. | Marks cleared on the 21 items. The Arcane Lich's genuine marks are kept. | Verifier FF-16. Live: Ghoul keeps its type after a Lich is removed. | Fixed — live |

## 2. TRG Prime Codex (owner: Codex) — fixed in 0.2.0

| ID | Area | Symptom | Root cause | Repair | Evidence | Status |
|---|---|---|---|---|---|---|
| CX-01 | Eternal Death State | Applying the builder to a published Eternal creature would write the Codex's Part II "no Death State" over the core type. | Apply always patched `system.noDeathState`. | Patched only when the type item was placed by the Codex (it carries a Codex `sourceUuid`). The rules question is RD-01. | Live: published Eternal unchanged; Codex-built Eternal keeps the Codex reading. | Fixed — live |
| CX-02 | Codex packs | All four Codex packs shipped without a MANIFEST. CURRENT names `MANIFEST-000133`, which is absent, so a strict LevelDB open fails. | Build packaging. | Packs rebuilt from a repaired read: one table, MANIFEST and CURRENT. All 175 rows are byte-identical (115 + 10 + 16 + 34). | `tools/rebuild-codex-packs.mjs`: identical before and after. | Fixed — static |
| CX-03 | Builder and published creatures | No safe way to start a variant. A builder edit could reach a compendium actor. | No import path and no compendium guard. | `importCompendiumCreature(uuid)` makes a world copy with provenance (`variantOf`, `_stats.compendiumSource`). Apply refuses any actor in a pack. A "Published creatures (start a variant)" picker is added to the toolkit. | Live: import, unchanged apply, modified apply; pack untouched; compendium guard refuses. | Fixed — live (picker UI screenshot in post-install run) |
| CX-04 | Printed names | Fiends creatures blocked apply ("Wing Buffet requires Wings"). An unchanged apply would have added second copies of Tail, Wings, Claws and Darkvision (60 ft.). | Exact-name matching against Codex keys. | Aliases (Tail→Tail Slap, Wing/Wings, Claws→Claw, Unarmed/Fist, Snow Vision) and base-name matching (printed ranges). | Live: an unchanged apply leaves an identical actor. | Fixed — live |
| CX-05 | DP of published creatures | "Resolve all DP components" refused every Fiends creature. | Complete ledgers were required. | Imported designs get a provisional ledger: each unvalued component is listed with its reason, and the total is marked provisional. | Live: +2 levels plus Regeneration gave provisional subtotal 325.5. Node: all 294 import. | Fixed — live |
| CX-06 | DP attributes | An imported creature's level-based attribute increases were priced as purchases. | The attribute modifier was measured from 1. | Measured from the creature's own published base (`attributeBaseline`). Codex-built designs are unchanged. | Node: 0.1.5 vs 0.2.0 Codex-built ledgers identical. | Fixed — static |
| CX-07 | DP feats | Parameterised and tiered feats ("Weapon Focus (Brawling)", "Toughness II") were unvalued. Every printed General feat was priced as an additional purchase. | Exact-name catalogue match only. No allowance for the creature's own feat progression. | Base-entry category rate added as a DP-only row; such feats are never managed on apply, so the printed feat is never replaced. The level-progression General feats (1st level and every two levels after) are credited back provisionally under RD-07. | Node test CX-07. Complete ledgers went from 19 to 28. | Fixed — static |

## 3. TRG Prime Core (owner: Core) — proposed, not applied

| ID | Area | Symptom | Root cause | Proposal | Evidence | Status |
|---|---|---|---|---|---|---|
| CO-01 | Grant workflow | Any later grant pass gave a creature with a printed-range sense ("Darkvision (60 ft.)") a second, generic "Darkvision". Seen live with Ghost on a Ghoul. | `applyGrant`'s `held` set compares exact names. | Hold ability items under their base name as well, by the rule Codex inheritance already uses. `core-proposal/CO-01-grant-base-name.patch` (grants-workflow.mjs only). Proposed for 3.699.0. | Live: the reproduction leaves one residual extra Darkvision. Core `npm run verify` on the patched tree: see the regression report. | Proposed |
| CO-02 | Ooze type data | The Ooze type grants no precision-damage immunity. Codex 1.6 and the printed Ochre Jelly both list precision. | The type's immunity effect lacks a `precision` row. Core already resolves "precision" as an immunity token. | Add `, precision` to the Ooze type's `system.combat.immunities` effect. The Codex native copy and Fiends' 6 embedded Ooze types would follow at their next sync. Disease is a separate question (RD-08). | Ochre Jelly derived immunities lack precision; critical is handled by `critImmune`. | Proposed (data) |

## 4. Rules decisions (owner: Rules — Graham)

| ID | Question | Affects | Current behaviour (unchanged) |
|---|---|---|---|
| RD-01 | Eternal Death State: Codex Part II says Eternals have no Death State, while the core rule and published Eternal blocks give one. Which governs? | 47 Eternal creatures; Codex-built Eternals | Published creatures keep the core value. Codex-built Eternals keep the Codex reading (CX-01). |
| RD-02 | Tiny/Diminutive reach: Codex tables say 5 ft, core `SIZE_TABLE` says 0. | Codex apply on Tiny and Diminutive creatures; for example, a Quasit variant is blocked | The Codex blocks a mismatched apply rather than writing a value. |
| RD-03 | Swim/Climb speed +4: whole Athletics/Climbing skill (core) or swim/climb checks only (as the printed totals imply)? | 46 creatures show +4 over print | Core applies it to the whole skill. |
| RD-04 | Keen/Acute Sense +2: applied at roll time, not in the sheet total. The printed Perception includes it. | 12 creatures show 2 under print on the sheet | No change recommended: rolls are correct. Display only. |
| RD-05 | Fearful Strength: Intimidate uses Strength, against the printed Intimidate. | Ape, Ape Lord, Laeleth | Core uses Strength. |
| RD-06 | Dragon Level Table against printed dragon examples: generated dragons follow the table (breath 40 ft line / 30 ft cone). | Dragon framework advancement | Follows the table. |
| RD-07 | Creature feats in DP: are a creature's level-progression General feats free, with only additional feats priced (Part I Feats; Part II "Additional General feat")? Is there a matching allowance for racial and class feats? | Provisional DP of every published creature, and of Codex-built creatures with feats | Imported creatures: General allowance credited, racial and class feats priced. Codex-built: unchanged from 0.1.5. |
| RD-08 | Ooze disease immunity: Codex 1.6 type text includes disease, while core and the printed Ochre Jelly omit it. | 6 Ooze creatures | Not immune (core). |

Book misprints, which the module already corrects silently, so no change is needed: Viper saves (printed Fort 45 / Ref 60 / Will 5; derived 9/12/1) and Raven Swarm DB 85 (derived 17).

## 5. Notes: checked, no change

- **Shared-name abilities.** 50 Fiends abilities share a name with a core ability. Core inheritance wins and is a superset of the Fiends copy, and each Fiends copy keeps its own extra keys through the merge. There is no double application.
- **High Magic.** It inherits Inner Tempest's High Magic when Inner Tempest is installed. That data is a compatible subset, so behaviour is identical with or without Inner Tempest.
- **Learned Spell Repertoire.** It appears twice in the Fiends abilities pack, so inheritance resolves nothing for it. That is by design: each copy carries its own data.
- **Scaly Resilience.** Owned by core 3.632+. The Fiends conditionals are cleared, so the benefit cannot be doubled.
- **Codex native copies against core 3.698.4.** Types, classes, attacks and abilities are identical except Eternal `noDeathState` (RD-01). The Codex packs are not federated (they declare no `extends`), so they cannot interfere with Fiends inheritance.
- **Cosmetic data.** 86 feat "featNote" effects are empty and have no mechanical effect. The Gaseous Form innate spell is a single spell and correct.
- **Minimum core versions.** Codex keeps 3.685.2 and Fiends keeps 3.663.0, both now *verified* 3.698.4. On older cores the new flags (`creatureAttack.secondary`, `codexInherit`, the Mindless trait exemption) are ignored, never harmful. Only 3.698.4 was tested.
- **Standalone use.** Fiends 0.46.0 needs nothing from the Codex. Each module lists the other only under `relationships.recommends`.

## 6. Outstanding work (not defects)

1. **Post-install regression.** Graham installs Codex 0.2.0 and Fiends 0.46.0 in the Test world. Then the shared battery runs in all three configurations, plus the toolkit picker screenshot and a Foundry load check of the rebuilt packs.
2. **Core decisions.** CO-01 and CO-02 need approval before any core release. A release would trigger the companion regressions (Pillars of Faith, Inner Tempest, Eldritch Arts) under the standing rule.
3. **Rules decisions.** RD-01 to RD-08 need rulings. Any data change that follows goes to the owner shown.
