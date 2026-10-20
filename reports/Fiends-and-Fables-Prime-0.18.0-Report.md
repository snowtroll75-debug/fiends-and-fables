# Fiends & Fables Prime 0.18.0

Fiends & Fables 3.0 block 9, Centaur to Akrexe. Graham's rulings of 13 October 2026: "all recommendations". Requires TRG Prime 3.639.0.

- **R1 Spell fixes:**
  - **Blast of Energy (Triclops):** its duplicate damage row is gone, so it deals its 14d8 force once.
  - **Focus spells:** Blast of Energy, the Triclops's Dominate and the Lynxara's Charm Kind no longer carry a "focus" use count. Their Focus trait governs them, so a cast now spends the use.
- **R2 Cyclopian PP:** the Cyclops, Zylar and Triclops have their printed PP 8, 37 and 62. Each base is the printed pool less the casting ability.
- **R3 Akrexe:**
  - **Fire Bolt:** four a day, no longer Focus.
  - **Breath Weapon:** one Focus use.
- **R4 Chuul:**
  - **Tentacle:** it exposes the struck creature to the Chuul's own Paralytic Venom, at its level.
  - **Mandibles:** now a Constrict-kind action. It costs 1 AP and deals 3d6 piercing to held creatures that are paralyzed. Their Fortitude save avoids only the critical, never the damage.
- **R5 Cockatrice:**
  - **Bite:** now +8, as printed.
  - **Petrifying Bite:** a Fortitude save at DC 19. A failure gives Slowed 1, and a fumble Slowed 2; each failed save adds to the Slowed already there. At Slowed 3 the target is Petrified. The 24-hour recovery save is printed on the card.
- **R6 Cloaker:**
  - **Envelop:** now automated. It costs 1 AP and deals 3d6 bludgeoning to the targeted creature, basic Reflex DC 19. On a failure or worse the creature is also Immobilised.
  - **Fast Healing 1:** heals 1 HP at the start of each turn.
- **R7 Foresight Gaze (Cyclops, Zylar, Triclops):** a free action with one Focus use. It gives the creature advantage on its next d20 check, as a button on that check's card.

The tools are `module-block9.mjs` and `verify-module-block9.mjs`. Blocks 3 to 9 all verify green.
