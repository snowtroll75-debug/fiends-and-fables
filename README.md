# Fiends and Fables

Foundry VTT module for TRG Prime: the Fiends & Fables 3.0 creature compendium (294 creatures, 13 templates, races, heritages, abilities and the Chapter 3 feats).

## Changelog

### 0.46.1 — 18 November 2026

Graham's rulings, verified with TRG Prime 3.699.0: Eternals have no Death State, Oozes are immune to disease and precision, and the Cold Dragon Talon and Sovereign breathe the Dragon Level Table's 30- and 40-foot cones. Details are in `reports/Fiends-and-Fables-Prime-0.46.1-Report.md`.

### 0.46.0 — 18 November 2026

Joint TRG Prime Codex / Fiends & Fables audit, verified with TRG Prime 3.698.4. Undead immunities, Archangel DR, Raven Swarm and Synarmi bonuses, Behir, Cave Bear and Mite Swarm traits, crossbow ammunition and 11 races/heritages repaired. Dragon advancement no longer duplicates abilities, and generated Bites deal their energy damage. Dragon breath keeps its own Focus data alongside Inner Tempest. The Ghost, Lich, Skeleton and Zombie templates apply and remove cleanly. Stale pack rows removed. Full details are in `reports/Fiends-and-Fables-Prime-0.46.0-Report.md`, and the single defect register is in `reports/joint-audit/`.

## Development

- `tools/joint-audit-0.46.0.mjs` applies the 0.46.0 data repairs; it is idempotent, and `--check` reports what it would change. `tools/verify-joint-audit-0.46.0.mjs` verifies them. Both need `classic-level`: set `CLASSIC_LEVEL_ROOT` to a folder whose `node_modules` has it, such as a TRG Prime checkout.
- `tools/rulings-0.46.1.mjs` and `tools/verify-rulings-0.46.1.mjs`: the 0.46.1 rulings data and its checks.
- `tests/live/creature-battery.mjs` is the shared behaviour battery, run from the GM console in a disposable world.
