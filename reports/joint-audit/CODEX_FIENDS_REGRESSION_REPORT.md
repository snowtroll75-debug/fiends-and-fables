# Codex / Fiends & Fables — regression report

Joint audit, 18 November 2026. Foundry 14.367, TRG Prime core 3.698.4, separate **Test** world (the campaign world was not used). Dice were fixed for every live run (`CONFIG.Dice.randomUniform = () => 0.5`), so equal behaviour gives equal numbers.

## 1. Shared behavioural battery

`tests/live/creature-battery.mjs` is one file, shipped byte-identical in both repositories. `runBattery({ label })` runs only the sections whose modules are installed. It builds fixtures in a temporary folder on the viewed scene, and `cleanup()` removes them.

| Section | Checks |
|---|---|
| CORE (always) | A creature built from core packs only (Undead type and class, Bite, Regeneration, Stench): derived sheet, damage packets against immunity and DR, Bite attack |
| FIENDS | Snapshots of Archangel, Behir, Mummy, Cave Bear, Raven Swarm and Cold Dragon, Talon; true dragon breath (area, PP, uses, damage); stat-block archer (attack, ammunition); templates (Zombie, Skeleton, Lich, Werewolf: apply, duplicates, statuses, restoration); dragon advancement (duplicates, Bite packet) |
| CODEX | A Codex-built creature (derived sheet, ledger, XPM); a variant of a published creature (when both are installed) |

## 2. Baseline: installed Codex 0.1.5 and Fiends 0.45.2

| Check | A: all modules (with EA, IT, PoF) | 1: Core+Codex+Fiends | 2: Core+Fiends | 3: Core+Codex |
|---|---|---|---|---|
| Core fixture (HP 96, DB 19, saves 14/9/11; poison immune; Bite 20 success) | ✓ | ✓ | ✓ | ✓ |
| Codex-built creature (HP 90, DB 19, ledger 162, XPM −0.2) | ✓ | ✓ | n/a | ✓ |
| Archangel DR | 36 ✗ (printed 28) | 36 ✗ | 36 ✗ | n/a |
| Mummy immunities | no disease ✗ | ✗ | ✗ | n/a |
| Breath: area / PP / uses / damage | **15 ft** ✗ / 0 / 1→0 / 30 | 20 ft / 0 / 1→0 / 30 | 20 ft / 0 / 1→0 / 30 | n/a |
| Archer: +9 success; ammunition 20→19 | ✓ | ✓ | ✓ | n/a |
| Zombie / Skeleton template | unconscious + prone, not restored ✗ | ✗ | ✗ | n/a |
| Lich / Werewolf template | applied and restored ✓ (Bony Hand packet absent) | ✓ | ✓ | n/a |
| Dragon advance (Cold Dragon, Talon → 16) | Snow Vision, Wing Buffet, Draconic Assault and Ice Climb ×2 ✗; Bite packet absent ✗ | ✗ | ✗ | n/a |

The shared mechanics were identical in every configuration. The only configuration-dependent result was the breath area under Inner Tempest (FF-13). The defects in the baseline were the same with or without the Codex, so none of them was caused by the two modules interacting.

## 3. Repairs exercised live (development copies)

The 0.46.0 and 0.2.0 code was served from a scratch folder in the Test world (`zz-joint-audit/`). The 0.46.0 data repairs were applied to world snapshots of the affected creatures. Results:

| Repair | Result |
|---|---|
| FF-01 | Mummy immune to disease (and the other seven core Undead immunities) |
| FF-02 | Archangel DR 28 |
| FF-03 | Raven Swarm Init 35, Acrobatics/Climbing/Stealth 8. Synarmi Init 20, Nature 15, Planes 12, Survival 14 |
| FF-04 | Behir immune to electricity; HP 215, DB 25, STR 7 unchanged |
| FF-05 | Cave Bear (race Bear + heritage Cave Bear): every derived value identical to the printed block |
| FF-09 / FF-10 | Cold Dragon, Talon advanced: no duplicate abilities; Bite deals 1d6 cold; breath 40 ft / 30 ft per the table |
| FF-12 | Lich Bony Hand 2d8 essence; Ghost 1d6 cold; removal restores the original attack data |
| FF-14 | Skeleton and Zombie: INT/CHA −5, conscious; removal restores traits |
| FF-15 / FF-16 | Ghost and Lich on a Ghoul: type kept through apply and removal |
| All 13 templates | Applied to and removed from a Goblin one after another; snapshot identical after each removal |
| CX-01 | Published Eternal type untouched by apply; a Codex-built Eternal keeps the Codex reading |
| CX-03 | Variant import made a world copy with provenance; the compendium actor was unchanged; apply on a compendium actor refused |
| CX-04 | Unchanged apply on a variant: identical actor, no duplicate components |
| CX-05 | Modified apply (+2 levels, Regeneration): provisional subtotal 325.5 |
| RD-02 | Quasit variant apply blocked by the Tiny reach mismatch (by design until ruled) |
| Residual (CO-01) | Ghost on Ghoul: one extra generic Darkvision (core grant pass) |

## 4. Static and Node suites

| Suite | Result |
|---|---|
| Codex `tests/joint-audit.test.mjs` (8 tests, including all 294 Fiends creatures importing and valuing, and 0.1.5 vs 0.2.0 Codex-built ledgers identical) | 8 / 8 pass |
| Mutation check of the Codex tests (3 deliberate breakages of the repaired code) | all 3 caught |
| Fiends `tools/verify-joint-audit-0.46.0.mjs` (structure S1–S4, FF-01…08, FF-13, FF-16, ammunition) | 422 passed, 0 failed on 0.46.0; 54 failed on 0.45.2 (before the FF-13/16 checks were added) |
| Fiends `tools/joint-audit-0.46.0.mjs --check` (idempotence) | "No changes." |
| Codex packs rebuilt (CX-02) | 175 rows byte-identical before and after |
| Pack diff 0.45.2 → 0.46.0 | Only the intended rows changed or were removed (see the creature audit) |
| Syntax (`node --check`) on every changed script | pass |
| Core `npm run verify` with the CO-01 patch | see §6 |

## 5. Still owed after installation

Graham installs the two ZIPs into the Test world. The following then runs:

1. Foundry loads all Fiends and Codex packs (rebuilt LevelDB) without repair prompts.
2. `runBattery` in configurations A, 1, 2 and 3 with the installed 0.46.0 and 0.2.0. Expected: the ✗ rows in §2 become the §3 results, the breath area is 20 ft in A, and every shared mechanic stays identical across configurations.
3. The Codex toolkit's "Published creatures (start a variant)" picker, screenshot-verified.
4. Cleanup of the temporary actors, scene and chat cards.

## 6. Core proposal CO-01 regression

The patch (`core-proposal/CO-01-grant-base-name.patch`, one function in `module/grants-workflow.mjs`) is committed only on the local branch `proposed/joint-audit-grant-basename` of core 3.698.4. It was not pushed, released or installed.

| Check | Result |
|---|---|
| `node --check module/grants-workflow.mjs` | pass |
| The 19 core verify scripts that exercise grants, grant auto-run, sourcebook/module federation, feats, focus declarations and granted senses or warps (`verify-audit-3698`, `-block10-core`, `-block3-core`, `-block40-aspects`, `-chapter2`, `-chooser-duplicates`, `-chooser-index-fields`, `-feat-budget-grants`, `-feat-grants`, `-focus-declarations`, `-granted-senses`, `-granted-warps`, `-heritage-derives`, `-module-api`, `-module-classes`, `-module-feats`, `-sourcebooks`, `-specialist-alternative`, `-unliving-mechanisms`) | 19 / 19 pass |
| Full `npm run verify` | **Not completed.** It was stopped at this environment's 30-minute limit, with no failure reported before then. It must run in full before any core release. |
| Live acceptance (after approval) | Ghost on a Ghoul, then any grant pass: exactly one Darkvision. Then the companion regressions (Pillars of Faith, Inner Tempest, Eldritch Arts) and this battery. |
