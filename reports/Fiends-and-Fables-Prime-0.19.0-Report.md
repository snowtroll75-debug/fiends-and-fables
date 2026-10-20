# Fiends & Fables Prime 0.19.0

Fiends & Fables 3.0 block 10, the demons. Graham's rulings of 13 October 2026: "go with your recommendations". Requires TRG Prime 3.640.0.

- **R1 Weapons:**
  - **Marilith's Cold Iron Silver Broadsword:** now cold iron (it was adamantine), so it rolls the printed 3d10+11.
  - **Balor's Vorpal Adamantine Broadsword:** its base is now 1d10+6. It keeps its adamantine and rolls the printed 5d10+15.
  - **Succubus's Claw:** 2d6+2, as printed.
- **R2 Quasit:**
  - **Claw:** it exposes the struck creature to Quasit Venom.
  - **Quasit Shifting:** now Change Shape (1 AP), with its own form plus a bat (Tiny), giant rat (Small, 25 ft), giant spider (Medium, 25 ft) and wolf (Medium, 35 ft).
- **R3 Auras:**
  - **Aura of Flames (Balor):** 20 ft, 3d8+10 fire, Fortitude DC 34. The save avoids only the critical. The damage is doubled for a creature the Balor holds.
  - **Reactive Evil (Balor):** a creature whose resistance or immunity lessens the fire turns the aura evil and fire until the Balor's next turn.
  - **Aura of Paranoia (Khavar):** Will DC 29 at the start of each creature's turn, with the printed ladder. A success or better gives a day's immunity.
  - **Aura of Command (Marilith):** within 100 ft, allies get +1 circumstance and enemies −1, to attacks, saves, skill and spellcraft checks.
- **R4 Damage back to whoever strikes the demon:**
  - **Reactive Slime (Aroch):** a reaction against a creature in its reach that hits it: 2d6 acid, basic Reflex DC 21.
  - **The Balor's flames:** any creature that strikes the Balor takes 3d8+10 fire; its Fortitude save avoids only the critical.
- **R5 Death Throes (Balor):** when it dies, a card offers the explosion: 100 ft, 10d8 evil plus 10d8 fire, basic Reflex DC 34.
- **R6 Vrock:** each of its three abilities has one Focus use.
  - **Cloud of Spores:** 1 AP, adjacent creatures, 2d8 poison, basic Fortitude DC 26. Anything worse than a success rolls 2d8 recurring piercing.
  - **Dance of Ruin:** 3 AP, 30 ft, 4d12 electricity, basic Reflex DC 26.
  - **Stunning Screech:** 1 AP, 30 ft, Fortitude DC 26. A failure gives Stunned 2 and a fumble Stunned 3. Demons are passed over.
- **R7 Succubus:**
  - **Aura of Seduction:** +2 circumstance to its Deception and Diplomacy, offered on its own check.
  - **Draining Kiss:** 1 AP on a creature it holds. It deals 3d6 essence (basic Fortitude), heals the Succubus by what it dealt, and inflicts Soul Drain 5 (maximum 20). A DC 25 Will save follows.
  - **Embrace:** a grapple rolled with Diplomacy.
- **R8 Storm of Blades (Marilith):** 2 AP, two modes.
  - **Every creature in reach:** a strike for each targeted creature, with the multiple attack penalty counted after.
  - **One target, all blades:** +25 damage. On a critical it becomes +50, and the severity steps up (deadly).

The tools are `module-block10.mjs` and `verify-module-block10.mjs`. Blocks 3 to 10 all verify green.
