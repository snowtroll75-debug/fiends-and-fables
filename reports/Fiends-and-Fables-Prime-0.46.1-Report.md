# Fiends & Fables Prime 0.46.1

Graham's rulings of 18 November 2026 on the joint TRG Prime Codex / Fiends & Fables audit, carried into the published creatures. Verified with TRG Prime 3.699.0, which carries the same rulings in core. Minimum unchanged: 3.663.0. Still needs nothing from the Codex.

- **RD-01 Eternals have no Death State:** the 47 Eternal creatures' type now matches core 3.699.0, so an Eternal is destroyed at 0 HP.
- **CO-02 / RD-08 Oozes are immune to disease and precision:** the 6 Ooze creatures (Ochre Jelly and the five Mucks) carry core 3.699.0's immunities.
- **RD-06 the Dragon Level Table is followed:** Cold Dragon, Talon breathes a 30-foot cone (the printed example gave 20), and Cold Dragon, Sovereign a 40-foot cone (printed 30). No dragon keeps a printed exception any longer.

These take effect with core 3.699.0, which also applies the core-only rulings. Nothing in this module changes for them:
- **RD-03:** Swim/Climb +4 applies only when actually swimming or climbing.
- **RD-04:** Keen Sense is shown on the sheet.
- **Mindless creatures:** never collapsed by their mental scores. This covers the Skeleton Warrior and Skeleton Champion ("Ethics Mindless").
- **Printed-range senses:** no longer granted twice.

## Tests

- `tools/rulings-0.46.1.mjs`: old-value matched; `--check` reports no further changes.
- `tools/verify-rulings-0.46.1.mjs`: 77 checks pass.
- `tools/verify-joint-audit-0.46.0.mjs`: 422 checks still pass.

Still owed after installation: the shared battery and the 294-creature re-derivation on core 3.699.0.
