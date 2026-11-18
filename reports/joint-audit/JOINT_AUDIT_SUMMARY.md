# Joint audit — TRG Prime Codex and Fiends & Fables Prime

18 November 2026. Audited on core TRG Prime 3.698.4 (Foundry 14.367) in the separate **Test** world, then updated the same day with Graham's rulings. Nothing was installed, pushed, published or deployed.

## Outcome

| Deliverable | Version | Branch (local, not pushed) |
|---|---|---|
| TRG Prime core | 3.698.4 → **3.699.0** (rulings, CO-01/02/03) | `release/3.699.0` |
| TRG Prime Codex | 0.1.5 → 0.2.0 → **0.2.1** | `joint-audit-0.2.0`, then `rulings-0.2.1` |
| Fiends & Fables Prime | 0.45.2 → 0.46.0 → **0.46.1** | `joint-audit-0.46.0`, then `rulings-0.46.1` (from GitHub `main`) |
| Shared behaviour battery | `tests/live/creature-battery.mjs` | byte-identical in both modules |

Every finding is in **one register**, `CODEX_FIENDS_DEFECT_REGISTER.md`, with one owner each. The totals:

| Owner | Findings | State |
|---|---|---|
| Fiends & Fables | 16 (FF-01…FF-16) | Fixed in 0.46.0 |
| Codex | 7 (CX-01…CX-07) | Fixed in 0.2.0 |
| Core | 3 (CO-01, CO-02, CO-03) | Fixed in 3.699.0 (approved 18 Nov) |
| Rules | 8 (RD-01…RD-08) | All ruled 18 Nov; carried in core 3.699.0, Codex 0.2.1 and Fiends 0.46.1 |

No repairable cross-module conflict remains open, and every rules decision has been ruled.

## How far automation goes

The audit does not claim that every ability is fully automated. Of the 190 abilities in the Fiends pack:

| Classification | Abilities |
|---|---|
| Automated by a declared mechanism | 61 |
| Card (Use posts the cost and outcome) | 37 |
| Manual (GM resolves) | 53 |
| Passive text | 39 |

DP ledgers are complete for 28 of the 294 creatures. The rest are provisional, and each one lists the components it could not value.

Every published creature's sheet derives to its printed block, with every difference explained. Breath, ammunition, templates, dragon advancement, damage packets and defences behave the same with or without the Codex, and with or without the other companion modules. The one exception was the Inner Tempest breath area, which 0.46.0 fixes.

## Reports

- `CODEX_FIENDS_DEFECT_REGISTER.md`: the single register, including unresolved questions.
- `CODEX_FIENDS_CROSS_MODULE_MATRIX.md`: duplication and ownership matrix.
- `FIENDS_CREATURE_AUTOMATION_AUDIT.md`: all 294 creatures against the book.
- `FIENDS_ABILITY_AND_FEAT_AUDIT.md`: every ability and feat, and its automation source.
- `FIENDS_DRAGON_FRAMEWORK_REPORT.md`, `FIENDS_TEMPLATE_FRAMEWORK_REPORT.md`.
- `FIENDS_DP_BALANCE_REPORT.md`: DP of every published creature (no published data changed).
- `CODEX_FIENDS_REGRESSION_REPORT.md`: test evidence.
- `CODEX_FIENDS_CORE_DEPENDENCIES.md`: what each module needs from core.
- Data: `fiends-dp-ledgers.json`, `creature-audit.json`, `ability-audit.json`.

## Next steps

1. **Install in the Test world:** core 3.699.0, Codex 0.2.1 and Fiends & Fables 0.46.1. Then Claude runs:
   - the shared battery in all three configurations;
   - the 294-creature re-derivation (the RD-03 and RD-04 differences should disappear);
   - the Mindless cases;
   - the picker screenshot and the pack load check;
   - cleanup.
2. **Companion regressions** on 3.699.0: Pillars of Faith, Inner Tempest and Eldritch Arts.
3. **Publishing.** Core and Fiends publish on push to `main`, so pushing waits for Graham's go-ahead.
