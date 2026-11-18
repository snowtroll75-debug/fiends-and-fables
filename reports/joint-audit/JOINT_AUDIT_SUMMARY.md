# Joint audit — TRG Prime Codex and Fiends & Fables Prime

18 November 2026. Core TRG Prime 3.698.4 (Foundry 14.367), tested in the separate **Test** world. Nothing was installed, pushed, published or deployed.

## Outcome

| Deliverable | Version | Branch (local, not pushed) |
|---|---|---|
| TRG Prime Codex | 0.1.5 → **0.2.0** | `joint-audit-0.2.0` |
| Fiends & Fables Prime | 0.45.2 → **0.46.0** | `joint-audit-0.46.0` (from GitHub `main`) |
| Core proposal CO-01 | patch against 3.698.4 | `proposed/joint-audit-grant-basename` |
| Shared behaviour battery | `tests/live/creature-battery.mjs` | byte-identical in both modules |

Every finding is in **one register**, `CODEX_FIENDS_DEFECT_REGISTER.md`, with one owner each. The totals:

| Owner | Findings | Fixed | Proposed | Decision |
|---|---|---|---|---|
| Fiends & Fables | 16 (FF-01…FF-16) | 16 | — | — |
| Codex | 7 (CX-01…CX-07) | 7 | — | — |
| Core | 2 (CO-01, CO-02) | — | 2 | — |
| Rules (Graham) | 8 (RD-01…RD-08) | — | — | 8 |

No repairable cross-module conflict remains open in either module. What remains is the two core proposals, which belong to the core and are not required by either module, plus Graham's eight rulings.

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

1. **Graham installs** `trg-prime-codex-0.2.0.zip` and `fiends-and-fables-prime-0.46.0.zip` into the Test world. Claude then runs the post-install battery in the three configurations, takes the picker screenshot, runs the pack load check, and cleans up.
2. **Rulings** on RD-01 to RD-08.
3. **Approval or rejection** of core proposals CO-01 and CO-02. If approved: the full core verify, then the companion regressions.
4. **Release.** Pushing Fiends `main` publishes a release automatically, so it waits for approval.
