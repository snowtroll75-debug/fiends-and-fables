# Fiends & Fables Prime 0.16.0

13 October 2026. Requires TRG Prime **3.637.0**. This is a module-only release.

This release covers Fiends & Fables 3.0 block 7, the Grizzly Bear to the Boar, under Graham's rulings of 13 October 2026 ("go with your recommendations").

## Changes

- **R1: the Behir.** It now has its printed abilities: Str 7, Con 5, Dex 2, Int −2, Wis 3, Cha 0.
  - In a world trial these gave initiative +25, DB 25, saves 20/15/10, HP 215 and damage +7, all as printed. Its skills now match too.
  - Natural DR rises from 6 to 8.
  - Bite and Claw carry −1 so they roll the printed +19. Without it, the raised Strength took them to +20.
- **R2: the Boar** is a boar again, not a bear:
  - It now has a Gore (+6, 1d8+4 piercing), Acute Sense (Smell), Powerful Charge and Toughness.
  - It no longer has the Bite and Claw, Iron Will, Monstrous Grab, Sudden Charge or Skill Focus (Swim).
  - Its senses are Nightvision 120 ft and Scent 70 ft.
  - Will stays at the printed +3, now carried by its race.
  - Powerful Charge is the Codex's compound action, so it is automated: 2 AP, Stride twice, then a Gore at +2 with an extra die.
- **R3: the Polar Bear** loses Skill Focus (Swim), which the book does not list. Its Athletics stays at +17, because core gives +4 for its swim speed. The book prints +13 without it, as with the Mirneth's Climbing.
- **R4: the Mirneth's Deafening Screech** now rolls as a 30-foot emanation: 5d10 sonic, basic Fortitude DC 25, 2 AP, with one Focus use.
- **R5: the Behir's two abilities** now roll:
  - **Electricity Breath:** a 60-foot line, 9d6 electricity, basic Reflex DC 22, 2 AP, with one Focus use.
  - **Storm of Claws:** a 3 AP compound action. It moves up to its speed without provoking reactions and makes four Claw strikes. The multiple attack penalty applies after them.
- **R6: the Belkar's Suffocate** now hits the enemies in its own space: 3d6 poison, basic Fortitude DC 20, 2 AP. The size requirement is printed on the card.
- **R7: the Belkar's spells.** Darkness has four uses a day. Obscuring Mist has one Focus use; it was unlimited.
- **R8: the Alpha Blink Dog.** Its innate spells now carry its own printed DC 18 (+8), not the Blink Dog's DC 14. Dimension Door is at will, and it has the printed Combat Reflexes.
- **R9: the Flame Beetle.**
  - **Fire Mote:** now a 30-foot missile. It rolls 1d6 fire with no Strength added, and its attack uses Dexterity. A −2 keeps the attack at the printed +3.
  - **Luminous Glow:** raises the light level one step through core's light rail.

## Checks

- `tools/module-block7.mjs` applies the changes and is safe to run more than once. It made 26 writes and 11 deletions.
- `verify-module-block7` passes all 18 checks, including that every item list and effect list matches its records.
- `verify-module-block3`, `verify-module-block4`, `verify-module-block5` and `verify-module-block6` all still pass.
