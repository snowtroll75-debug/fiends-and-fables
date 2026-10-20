# Fiends & Fables Prime 0.15.0

12 October 2026. Requires TRG Prime **3.636.0**.

This is the data half of Fiends & Fables 3.0 block 6, covering the Laeleth through the Cave Bear. It follows Graham's rulings of 12 October 2026: "your recommendation on all".

## Changes

- **R1: 82 innate spells on 23 creatures are now innate.** The module's source recorded these spells as innate, but the spells themselves were not marked innate. As a result they cast as learned spells, with PP and a casting check, and they lacked their printed DCs. Each one now:
  - is marked innate
  - has the usage the book prints: at will (unlimited), or Focus (one use, ready on placement)
  - declares its printed DC and attack where the book prints them

  Where the creature had no tradition or casting ability, it now has one: Divinity uses Wisdom, Verdant uses Constitution, Ethereal uses Charisma and Arcane uses Intelligence.

  The affected creatures are:
  - the Azur
  - the Djinn, Efreet, Dao and Marid
  - the Jann, Pixie and Dryad
  - the Rumellor, Gondathel, Obsidral, Pyraquenil and Yulussil
  - the Frost, Storm, Flame and Earth Drakes
  - Draeglir Halya, Vyair, Aelin and Tyel
  - the Angrenilir and the Human Ghost

  For example, the Azur's Fire Bolt and Burning Hands now cast at the printed DC 16 (+6).
- **R2: the Cave Bear** now has its printed Con 5, Wis 1 and Cha −1. This was measured in the world to give:

  | | Value |
  |---|---|
  | HP | 165 |
  | DB | 21 |
  | Saves | 18 / 14 / 8 |
  | Initiative | +10 |
  | Perception and Survival | +7 |
  | Bite and Claw | +14 |

  All of these are as printed. The heritage's unexplained −40 HP is gone.
- **R3: the Azur's Crafting** is now +6, with a Smithing specialist skill at +10, as printed.
- **R4: the Athach's Rock** now rolls +22, as printed.
- **R5: the Athach's Bite** now exposes its target to the Athach's own Athach Venom, using the after-strike that carries the Aboleth's Slime.
- **R6: the Azur Aura** now works:
  - it is a 5-foot aura dealing 1d4 fire, with a basic Fortitude save against Level DC 16
  - it triggers when a creature enters it and at the start of its turn
  - unticking the ability's Active switches it off, which is the printed Free Action
- **R7: Banshee Wail.** The Banshee now has core's Wail of the Banshee as an innate Focus spell. It casts for 2 AP at the Banshee's Level DC 31. The note about bypassing silence stays on the spell.
- **R8: Petrifying Gaze** is now a 30-foot aura with a Fortitude save against DC 20:

  | Result | Effect |
  |---|---|
  | Critical | Unaffected |
  | Success | Slowed 1 for 1 round |
  | Partial | Petrified for 1 minute, with a new save at the end of each of its turns |
  | Failure | Petrified for 1 minute |
  | Fumble | Petrified permanently |

  A blinded creature is passed over.
- **R9: Bat Bites** now hits every enemy in the swarm's own space for 1d4 piercing, with a basic Reflex save against DC 15, for 1 AP. On a Fumble the target also takes Bleeding 1.
- **R10: Change Shape** (Barghest, Gravhek) now offers four forms:

  | Form | Speed | Other effects |
  |---|---|---|
  | Its own form | Unchanged | None |
  | Goblin guise | 20 | Small; no Bite or Claw |
  | Hobgoblin or bugbear guise | 20 | No Bite or Claw |
  | Wolf | 40 | The bite gains Monstrous Knockdown |
- **R11: the Gravhek's spell uses.** Invisibility now has one Focus use, and Charm Kind two a day, as printed.
- **R12: stale "manual" markers.** 226 markers on 81 ability names have been cleared. Core automates these abilities, either through their own declarations or through the Codex entry of the same name. Examples are Eternal Summons, Spell Resilience, Hover, Wing Buffet, Souldrinker, Abyssal Healing and Life Sense.

## Noted

About 70 creatures whose innate spells were already marked innate in block 3 still have no casting ability. Their printed DC and attack override the derived ones, so nothing rolls wrong. They will be given casting abilities as each creature's block is audited.

## Checks

- The changes are written by `tools/module-block6.mjs`, which is safe to run more than once. It made 329 writes.
- `verify-module-block6` passes all 19 checks, including a check that every actor's item list matches its records.
- `verify-module-block3` (35 checks), `verify-module-block4` (19 checks) and `verify-module-block5` (23 checks) all still pass.
