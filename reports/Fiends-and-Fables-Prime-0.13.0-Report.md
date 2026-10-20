# Fiends & Fables Prime 0.13.0

12 October 2026. Requires TRG Prime **3.634.0**.

This is the data half of Fiends & Fables 3.0 block 4: the Agothians and the Angels, under Graham's rulings of 12 October 2026 ("go with your recommendations").

## Changes

- **R1: the six ally auras.** Each aura is now declared as an ally aura with the effect it gives allies inside it. Core 3.634.0 applies that effect to allies when they enter and removes it when they leave.

  | Aura | Radius | What allies inside receive |
  |---|---|---|
  | Radiant Aura (Dracoral) | 20 ft | +1 status DB and saves; essence and evil resistance; healing spells warped 2 PP free |
  | Calming Aura (Luporal) | 20 ft | +1 status Will saves |
  | Archangel Aura | 20 ft | +2 status DB against evil attackers; +2 status saves against evil creatures (offered to tick); healing spells warped 2 PP free |
  | Guardian Aura | 10 ft | +1 status DB; essence resistance |
  | Seraphim Aura | 20 ft | +2 status DB against evil attackers; +2 status damage against evil creatures |
  | Inspiring Aura (Virtue) | 20 ft | +1 status attack rolls; +1 status saves against fear |

- **R2: Regeneration.** The Dracoral's and Archangel's Regeneration 20 (Evil) and the Seraphim's Regeneration 16 (Evil) now heal automatically at the start of the creature's turn. Evil damage negates them, and they hold the creature from death while active.
- **R4: the Archangel's DR.** An actor effect adds +8 DR, bringing it from 20 to the printed 28.
- **R5: the Luporal's damage.** Its Bite is now 1d8+1 and its Claw 1d6+1. With its Strength, they now roll the printed 2d8+5 and 2d6+5 instead of +4.
- **R6: two riders.** The Archangel Bow now adds 2d6 good damage and the Virtue's Slam adds 1d6 good damage.
- **R7: the Cherubim's Radiant Eyes.** It is now a declared area: a 30-foot line with basic Reflex DC 14 for 2d6 damage. You choose cold or fire when you use it.
- **R8: Lay on Hands.** Agothians can use it half their level per day, rounded up: Feloral 1, Luporal 3, Avoral 5, Dracoral 10. The Pyroral has no Lay on Hands.
- **R9: the Dracoral's Restore Senses** is now a Focus spell, not a constant one.
- **R10: the Virtue's Harmonize** is now a declared 1 AP action. Core rolls the aid and adds it to the companion Virtue's next innate save DC this round.

## Checks

- The changes are written by `tools/module-block4.mjs`, which is safe to run more than once. It made 22 writes.
- `verify-module-block4` passes all 19 checks. These include the rule that every actor's effect list matches its effect records.
- `verify-module-block3` still passes all 35 checks.
