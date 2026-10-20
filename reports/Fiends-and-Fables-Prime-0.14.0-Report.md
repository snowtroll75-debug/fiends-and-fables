# Fiends & Fables Prime 0.14.0

12 October 2026. Requires TRG Prime **3.635.0**.

This is the data half of Fiends & Fables 3.0 block 5: the Animated Objects, the Ankhegs and the Apes, under Graham's rulings of 12 October 2026.

## Changes

- **R1: stat-block weapons.** All 568 weapons in the creature compendium are now marked as weapons from the creature's own stat block, and core 3.635.0 counts a creature as proficient with them. This removes a −4 from 44 manufactured weapons on 32 creatures. For example, the Animus Armour's Halberd goes from +3 to its printed +7. Of the 32 of those attacks that can be checked against the book, 29 now match exactly.
- **R2: the Animated Objects' defences are kept.** All six keep resistance to magic and physical damage and weakness to adamantine and fire (Graham: "these need to be automated"). Core already applies all four:
  - Physical resistance halves a mundane weapon blow.
  - Magic resistance halves damage from a magical source. A magical blow is halved only once.
  - Fire, or an adamantine weapon, adds 50%.
- **R3: immunities.** The Flying Rug is now immune to death effects, as printed. The Giant Animus Statue loses the immunity to necromancy, which the book does not print.
- **R4: the Dancing Broom's Slam** loses its extra +1 and now rolls the printed +2.
- **R5: Dusty Haze.** When the Broom's Slam deals damage, the Broom becomes Concealed until the start of its next turn.
- **R6: six riders** that never rolled before now roll:
  - the Ankheg's Bite (1d6 acid) and the Ankheg Queen's Bite (2d6 acid)
  - the Azur's Warhammer and Light Hammer (1d4 fire)
  - the Arcane Lich's Bony Hand (2d8 essence)
  - the Banshee Touch (1d10 cold)
- **R7: Acidic Spittle** now rolls as a 30-foot cone with basic Reflex, costing 2 AP.
  - **Ankheg:** 3d6 acid at DC 19. It is a Focus ability with one use, which a Refocus restores.
  - **Ankheg Queen:** 9d6 acid at DC 25, once per hour.
- **Housekeeping:** the Flying Rug's Hover is no longer marked as manual. It has been automated since core 3.631.0.

## Checks

- The changes are written by `tools/module-block5.mjs`, which can safely be run more than once. Its first run made 575 writes.
- `verify-module-block5` passes all 23 checks. These include a check that every item's effect list matches its effect records.
- `verify-module-block3` (35 checks) and `verify-module-block4` (19 checks) still pass.
