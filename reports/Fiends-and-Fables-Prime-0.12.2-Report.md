# Fiends & Fables Prime 0.12.2

11 October 2026. This release fixes a defect found when re-testing 0.12.1 live.

**The Aboleth Magi's item effects have been restored.** In Foundry's pack format, an item's Active Effects are stored as separate records. When the Magi was rebuilt from the Aboleth in 0.12.0, its items were copied but those records were not. As a result, the Magi was missing:

- the Aboleth race's ability modifiers (it had Strength 4 instead of 8)
- natural DR 2
- the Aberration class's save bonuses and Death State
- the save bonuses from Great Fortitude and Iron Will
- Alertness
- Darkvision

All eight effects have been copied across. A copy built in the world with them matched the book exactly: DB 22, saves 16/11/22, HP 191, PP 36, Spellcraft +10 and Athletics +19.

`verify-module-block3` now has 35 checks. It also confirms that every item's effect list in the pack matches its effect records.
