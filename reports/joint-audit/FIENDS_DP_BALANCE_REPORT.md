# Fiends & Fables Prime — Development Point balance report

Joint audit, 18 November 2026. All 294 published creatures valued with the TRG Prime Codex 0.2.0 DP engine (`module/dp.mjs`, `module/fiends-adapter.mjs`) against the 250-DP XPM benchmark.

**Nothing in this report changed a published creature.** Levels, statistics and published EL stay as printed. A difference between the Codex EL and the published EL is a finding for Graham to review, not a defect.

## How a published creature is valued

- **Type, class, size, movement, natural attacks, generic abilities, senses.** Valued from the Codex ledgers, using printed-name aliases (CX-04).
- **Attributes.** Measured from the creature's own published base, so level-based increases are progression rather than purchases (CX-06).
- **Race and heritage.** Valued provisionally from their declared effects: racial ability modifiers, resistances, immunities and weaknesses on a published schedule, natural DR and fixed HP. An immunity the type ledger already prices is not counted again.
- **Feats.** Exact catalogue matches are valued at their category rate. Parameterised and tiered printings are valued at their base entry's rate. The level-progression General feats (1st level and every two levels after) are credited back. This last step is CX-07 and is provisional pending RD-07.
- **Innate spells.** Valued per spell from its printed availability.
- **Everything else.** Listed by name with the reason it could not be valued. The total is then **provisional**: a lower bound on the ledger, not a verdict.

## Summary

| Measure | Value |
|---|---|
| Creatures valued | 294 (0 errors) |
| Complete ledgers (every component valued) | 28 |
| Complete ledgers whose Codex EL equals the published EL | 18 of 28 (7 are +1, 3 are +2) |
| Creatures with at most 2 unresolved components | 123; Codex EL = published EL for 69 |
| Unresolved components per creature | 0: 28 · 1–2: 95 · 3–5: 123 · 6–10: 44 · >10: 4 |
| Distinct unresolved component names | 672 (1,000 occurrences) |

For the 123 creatures with at most 2 unresolved components, the Codex EL minus the published EL comes out as follows: −1: 2 creatures · 0: 69 · +1: 32 · +2: 13 · +3: 5 · +4: 1 · +5: 1. Valuing an unresolved component could move a total either way, since weaknesses carry negative DP. For these creatures, though, one or two components are rarely enough to close a gap of two or more levels.

The CX-07 feat correction raised the number of complete ledgers from 19 to 28 and removed a systematic overcount. Before it, every printed General feat was priced as an additional purchase.

## Complete ledgers that disagree with the printed EL

| Creature | Level | Published EL | Codex EL | % of 250 |
|---|---|---|---|---|
| Cursarion | 5 | 6 | 7 | 170.8 |
| Dao | 7 | 7 | 8 | 131.2 |
| Druhari | 6 | 4 | 5 | 74.2 |
| Giant Eagle | 8 | 5 | 7 | 70.6 |
| Gryphon | 6 | 4 | 5 | 74.6 |
| Jann | 6 | 5 | 6 | 112.4 |
| Ochre Jelly | 6 | 4 | 5 | 78.4 |
| Salamander | 7 | 5 | 7 | 91.0 |
| Titan Hound | 5 | 3 | 4 | 59.6 |
| Wyvern | 7 | 5 | 7 | 91.8 |

Complete and in agreement: Azure Muck, Bugbear, Bugbear Soldier, Druharr, Eagle, Giant Rat, Giant Spider, Golden Muck, Guard Dog, Minotaur, Morndulir Soldier, Morndulir Worker, Ogre, Ogre Soldier, Riding Dog, Riding Horse, Salamaxis, Viper.

## What most often blocks a complete valuation

| Component | Occurrences | Note |
|---|---|---|
| Natural attack: Rock | 16 | Thrown rock is not a Codex natural attack |
| High Magic | 15 | No Codex valuation |
| Incorporeal | 13 | No Codex valuation |
| Demon race: weakness to good / to order | 11 / 11 | Weakness scope not on a published schedule |
| Dragon Advancement (Base +0 / +6 / +12) | 8 each | Progression marker, not a purchasable component |
| Learned Spell Repertoire | 8 | Casting package |
| Soulaes race: weakness to good | 8 | As above |
| Breath Weapon; Class casting; Lycanthrope weakness to silver; Animal Empathy; Luna Frenzy; Shift Form | 7 each | |
| Verdant Caster (Creature Class) | 6 | Fiends class with no Codex ledger |

Valuing any of these needs a Codex sourcebook anchor. Following the Codex rule, none was invented. They are the natural next items for a Codex valuation pass, which is Graham's scope decision.

## Per-creature ledgers

`fiends-dp-ledgers.json` has each creature's layer subtotals and unresolved list. The Codex Builder shows the full itemised ledger, with source and reason, for any creature started as a variant.

| Creature | Lvl | Type | Class | Published EL | Codex EL | % of 250 | DP subtotal | Unresolved | Status | Unresolved components |
|---|---|---|---|---|---|---|---|---|---|---|
| Aboleth | 8 | aberration | aberration | 8 | 8 | 128.4 | 321 | 1 | provisional | ability: Mucus Cloud |
| Aboleth Magi | 8 | aberration | aberration | 8 | 8 | 128.4 | 321 | 2 | provisional | ability: Learned Spell Repertoire; ability: Mucus Cloud |
| Air | 1 | elemental | elemental | 0 | 0 | 78.2 | 195.5 | 1 | provisional | ability: Breath Weapon |
| Air Primal - Briez | 3 | elemental | elemental | 2 | 2 | 76.8 | 192 | 3 | provisional | natural attack: Air Blast; ability: Air Primal - Briez Form; ability: Air Blast Magic |
| Air Primal - Gayl | 7 | elemental | elemental | 5 | 6 | 89.2 | 223 | 3 | provisional | natural attack: Air Blast; ability: Air Primal - Gayl Form; ability: Air Blast Magic |
| Air Primal - Stourm | 11 | elemental | elemental | 8 | 11 | 100 | 250 | 3 | provisional | natural attack: Air Blast; ability: Air Primal - Stourm Form; ability: Air Blast Magic |
| Air Primal - Tempast | 15 | elemental | elemental | 13 | 16 | 116.4 | 291 | 3 | provisional | natural attack: Air Blast; ability: Air Primal - Tempast Form; ability: Air Blast Magic |
| Akrexe | 6 | eternal | eternal | 6 | 6 | 119.4 | 298.5 | 6 | provisional | Innate spell: Fire Bolt (4/day); Demon (race): weakness to good; Demon (race): weakness to order; Akrexe (heritage): combat.defence.other 3; Akrexe (heritage): combat.defence.status 1; ability: Breath Weapon |
| Angrenilir | 8 | eternal | eternal | 8 | 8 | 126.8 | 317 | 1 | provisional | ability: Forge Fire |
| Animus Armour | 2 | construct | construct | 1 | 1 | 63.4 | 158.5 | 1 | provisional | Animus Armour (heritage): combat.defence.other 1 |
| Animus Colossus | 12 | construct | construct | 10 | 13 | 124.2 | 310.5 | 2 | provisional | Animus Colossus (heritage): combat.defence.other 6; Animus Colossus (heritage): combat.defence.status 2 |
| Animus Statue | 3 | construct | construct | 2 | 2 | 70.2 | 175.5 | 1 | provisional | Animus Statue (heritage): combat.defence.other 1 |
| Animus Statue, Giant | 6 | construct | construct | 4 | 5 | 86.2 | 215.5 | 2 | provisional | Animus Statue, Giant (heritage): combat.defence.other 3; Animus Statue, Giant (heritage): combat.defence.status 1 |
| Ankheg | 3 | beast | beast | 2 | 2 | 66.4 | 166 | 4 | provisional | Ankheg (race): intelligence -5; Ankheg (race): combat.defence.other 1; ability: Wise Skills; ability: Acidic Spittle |
| Ankheg, Queen | 9 | beast | beast | 7 | 8 | 85.2 | 213 | 5 | provisional | Ankheg (race): intelligence -5; Ankheg (race): combat.defence.other 1; Ankheg, Queen (heritage): combat.defence.other 3; Ankheg, Queen (heritage): combat.defence.status 1; ability: Acidic Spittle |
| Ape | 3 | animal | animal | 2 | 2 | 58.8 | 147 | 2 | provisional | Ape (race): combat.defence.other 1; ability: Skill Focus (Search) |
| Ape Lord | 8 | animal | animal | 6 | 7 | 76.4 | 191 | 4 | provisional | Ape (race): combat.defence.other 1; Ape Lord (heritage): combat.defence.other 3; Ape Lord (heritage): combat.defence.status 1; ability: Skill Focus (Search) |
| Arcane Lich | 15 | undead | adept-npc | 19 | 15 | 101.6 | 254 | 10 | provisional | Human (race): identity.size medium; Human (race): combat.movement.land 25; natural attack: Bony Hand; ability: Skilled; ability: Arcane Lich Spell Repertoire; ability: Paralytic Touch; ability: Bonus Feat; ability: Phylactery of Eternal Resurgence; ability: Versatile; ability: Lich Template |
| Archangel | 20 | eternal | eternal | 28 | 30 | 199.2 | 498 | 10 | provisional | Angel (race): weakness to evil; Archangel (heritage): strength +6; Archangel (heritage): wisdom +5; Archangel (heritage): charisma +5; Archangel (heritage): combat.defence.other 10; Archangel (heritage): combat.defence.status 4; natural attack: Archangel Blade; ability: Regeneration 20 (Evil); ability: Archangel Aura; ability: Form Weapon, Greater |
| Aroch | 7 | eternal | eternal | 7 | 8 | 141.8 | 354.5 | 8 | provisional | Demon (race): weakness to good; Demon (race): weakness to order; Aroch (heritage): combat.defence.other 3; Aroch (heritage): combat.defence.status 1; Aroch (heritage): combat.initiative.other 15; Aroch (heritage): weakness to cold iron; ability: Fear of Healing; ability: Reactive Slime |
| Athach | 12 | humanoid | humanoid | 10 | 12 | 93.3 | 233.3 | 8 | provisional | Athach (race): constitution +5; Athach (race): combat.defence.other 9; Athach (race): combat.defence.status 2; Athach (race): combat.saves.fortitude.racial 3; Athach (race): combat.saves.will.racial -3; Athach (race): combat.initiative.other 5; Athach (race): weakness to cold iron; ability: Wise Skills |
| Avoral | 9 | eternal | eternal | 10 | 11 | 159.8 | 399.5 | 5 | provisional | Innate spell: Lay on Hands (5/day); Agothian (race): weakness to evil; Avoral (heritage): combat.defence.other 4; Avoral (heritage): combat.defence.status 1; ability: Skill Focus (Search) |
| Azur | 2 | elemental | elemental | 1 | 1 | 89.6 | 224 | 3 | provisional | Azur (race): combat.defence.other 1; ability: Azur Aura; ability: Smithing Specialty |
| Azure Muck | 8 | ooze | ooze | 6 | 6 | 60.4 | 151 | 0 | complete | — |
| Balor | 20 | eternal | eternal | 28 | 30 | 192.6 | 481.5 | 12 | provisional | Demon (race): weakness to good; Demon (race): weakness to order; Balor (heritage): strength +6; Balor (heritage): constitution +7; Balor (heritage): dexterity +6; Balor (heritage): combat.defence.other 10; Balor (heritage): combat.defence.status 4; Balor (heritage): combat.initiative.other 30; Balor (heritage): weakness to cold iron; ability: Aura of Flames; ability: Reactive Evil; ability: Death Throes |
| Banshee | 17 | undead | undead | 15 | 17 | 102.4 | 256 | 7 | provisional | Banshee (race): strength -6; Banshee (race): dexterity +8; Banshee (race): combat.defence.other 8; Banshee (race): combat.defence.status 3; Banshee (race): resistance to all damage except force or essence; natural attack: Banshee Touch; ability: Banshee Wail |
| Banshee Dirge Singer | 17 | undead | ? | 18 | 15 | 77.2 | 193 | 10 | provisional | Class casting; Banshee (race): strength -6; Banshee (race): dexterity +8; Banshee (race): combat.defence.other 8; Banshee (race): combat.defence.status 3; Banshee (race): resistance to all damage except force or essence; natural attack: Banshee Touch; ability: Banshee Wail; ability: Learned Spell Repertoire; Class: Ethereal Caster (Creature Class) |
| Barghest | 4 | eternal | eternal | 4 | 4 | 129 | 322.5 | 3 | provisional | Barghest (race): combat.defence.other 2; ability: Change Shape; ability: Soul Feed |
| Basilisk | 6 | beast | beast | 4 | 4 | 68.8 | 172 | 5 | provisional | Basilisk (race): intelligence -5; Basilisk (race): combat.defence.other 2; Basilisk (race): combat.defence.status 1; ability: Wise Skills; ability: Petrifying Gaze |
| Bat Swarm | 1 | animal | animal | 0 | 0 | 56.8 | 142 | 5 | provisional | Bat Swarm (heritage): immunity to mental effects; Bat Swarm (heritage): immunity to reactions provoked by movement; Bat Swarm (heritage): resistance to targeted; Bat Swarm (heritage): weakness to area damage; ability: Bat Bites |
| Behir | 8 | beast | beast | 7 | 8 | 114.2 | 285.5 | 5 | provisional | Behir (race): combat.defence.other 4; Behir (race): combat.defence.status 1; ability: Wise Skills; ability: Electricity Breath; ability: Storm of Claws |
| Belkar | 6 | elemental | elemental | 5 | 6 | 107 | 267.5 | 4 | provisional | Innate spell: Darkness (4/day); Belkar (race): combat.defence.other 3; Belkar (race): combat.defence.status 1; ability: Suffocate |
| Belkar Storm Lord | 10 | elemental | elemental | 10 | 11 | 119 | 297.5 | 6 | provisional | Belkar (race): combat.defence.other 3; Belkar (race): combat.defence.status 1; Belkar Storm Lord (heritage): combat.defence.other 2; Belkar Storm Lord (heritage): combat.defence.status 1; ability: Suffocate; ability: Verdant Caster Repertoire |
| Blightborn | 13 | fey | fey | 14 | 11 | 88.4 | 221 | 5 | provisional | Hag (race): weakness to cold iron; natural attack: Vile Touch; natural attack: Corrupted Staff; ability: Necrotic Spew; ability: Blightborn Spell Repertoire |
| Blink Dog | 2 | beast | beast | 1 | 1 | 77.2 | 193 | 1 | provisional | Blink Dog (race): combat.defence.other 1 |
| Blink Dog, Alpha | 5 | beast | beast | 4 | 4 | 85.2 | 213 | 3 | provisional | Blink Dog (race): combat.defence.other 1; Blink Dog, Alpha (heritage): combat.defence.other 1; Blink Dog, Alpha (heritage): combat.defence.status 1 |
| Boar | 2 | animal | animal | 1 | 1 | 58 | 145 | 2 | provisional | Boar (race): combat.defence.other 1; Boar (race): combat.saves.will.racial 2 |
| Bugbear | 2 | humanoid | martial-npc | 1 | 1 | 71.2 | 178 | 0 | complete | — |
| Bugbear Soldier | 4 | humanoid | martial-npc | 3 | 3 | 75.2 | 188 | 0 | complete | — |
| Bulette | 8 | beast | beast | 7 | 7 | 88.6 | 221.5 | 3 | provisional | Bulette (race): constitution +5; Bulette (race): combat.defence.other 4; Bulette (race): combat.defence.status 1 |
| Camel | 3 | animal | animal | 1 | 2 | 51.6 | 129 | 1 | provisional | ability: Enduring Reserves |
| Cave Bear | 6 | animal | animal | 4 | 5 | 70.2 | 175.5 | 2 | provisional | Cave Bear (heritage): combat.defence.other 3; Cave Bear (heritage): combat.defence.status 1 |
| Cave Dragon, Scaleborn | 4 | wyrm | wyrm | 3 | 3 | 89 | 222.5 | 4 | provisional | ability: High Magic; ability: Cave Dragon Breath; ability: Dragon Advancement (Base +0); ability: Cave Dragon Spell Repertoire |
| Cave Dragon, Sovereign | 16 | wyrm | wyrm | 20 | 19 | 147.4 | 368.5 | 4 | provisional | ability: High Magic; ability: Cave Dragon Breath; ability: Cave Dragon Spell Repertoire; ability: Dragon Advancement (Base +12) |
| Cave Dragon, Talon | 10 | wyrm | wyrm | 11 | 11 | 119 | 297.5 | 4 | provisional | ability: Cave Dragon Breath; ability: High Magic; ability: Dragon Advancement (Base +6); ability: Cave Dragon Spell Repertoire |
| Cave Troll | 11 | humanoid | humanoid | 8 | 9 | 82.8 | 206.9 | 3 | provisional | Cave Troll (heritage): combat.defence.other 5; Cave Troll (heritage): combat.defence.status 2; ability: Regeneration 11 (Acid/Fire) |
| Centaur | 3 | beast | beast | 2 | 2 | 68.4 | 171 | 1 | provisional | Centaur (race): combat.defence.other 1 |
| Cheetah | 3 | animal | animal | 1 | 2 | 48.2 | 120.5 | 2 | provisional | Cheetah (heritage): combat.defence.other 1; ability: Sprint |
| Cherubim | 2 | eternal | eternal | 1 | 2 | 110 | 275 | 4 | provisional | Angel (race): weakness to evil; Cherubim (heritage): combat.defence.other 1; ability: Wise Skills; ability: Radiant Eyes |
| Chuul | 8 | aberration | aberration | 7 | 7 | 88.7 | 221.7 | 3 | provisional | Chuul (race): combat.defence.other 4; Chuul (race): combat.defence.status 1; ability: Mandibles |
| Clay Golem | 10 | construct | construct | 7 | 10 | 90.2 | 225.5 | 1 | provisional | Golem (race): immunity to alteration |
| Cloaker | 5 | aberration | aberration | 4 | 4 | 85.6 | 214 | 4 | provisional | Cloaker (race): combat.defence.other 2; Cloaker (race): combat.defence.status 1; ability: Fast Healing 1; ability: Envelop |
| Cloud Giant | 16 | humanoid | martial-npc | 14 | 16 | 102.8 | 257 | 2 | provisional | natural attack: Rock; ability: Thundering Strike |
| Cloud Giant Shaman | 16 | humanoid | ? | 17 | 12 | 69.6 | 174 | 5 | provisional | Class casting; natural attack: Rock; ability: Thundering Strike; ability: Learned Spell Repertoire; Class: Verdant Caster (Creature Class) |
| Cockatrice | 3 | beast | beast | 2 | 2 | 49.6 | 124 | 3 | provisional | Cockatrice (race): combat.defence.other 1; ability: Wise Skills; ability: Petrifying Bite |
| Cold Dragon, Scaleborn | 4 | wyrm | wyrm | 4 | 4 | 95.8 | 239.5 | 4 | provisional | ability: Cold Dragon Spell Repertoire; ability: Dragon Advancement (Base +0); ability: Cold Dragon Breath; ability: High Magic |
| Cold Dragon, Sovereign | 16 | wyrm | wyrm | 20 | 19 | 149.4 | 373.5 | 4 | provisional | ability: Dragon Advancement (Base +12); ability: High Magic; ability: Cold Dragon Spell Repertoire; ability: Cold Dragon Breath |
| Cold Dragon, Talon | 10 | wyrm | wyrm | 11 | 11 | 120.6 | 301.5 | 4 | provisional | ability: Dragon Advancement (Base +6); ability: High Magic; ability: Cold Dragon Spell Repertoire; ability: Cold Dragon Breath |
| Constrictor | 6 | animal | animal | 4 | 4 | 64.4 | 161 | 3 | provisional | Constrictor (heritage): strength +5; Constrictor (heritage): combat.defence.other 3; Constrictor (heritage): combat.defence.status 1 |
| Crimson Muck | 12 | ooze | ooze | 8 | 9 | 65.6 | 164 | 2 | provisional | natural attack: Molten Spit; ability: Fiery Death |
| Crocodile | 4 | animal | animal | 2 | 3 | 60.4 | 151 | 1 | provisional | Crocodile (race): combat.defence.other 2 |
| Cursarion | 5 | eternal | eternal | 6 | 7 | 170.8 | 427 | 0 | complete | — |
| Cyclops | 5 | humanoid | humanoid | 5 | 4 | 59.6 | 149 | 10 | provisional | Cyclopian (race): combat.defence.other 2; Cyclopian (race): combat.defence.status 1; Cyclops (heritage): combat.defence.other 2; Cyclops (heritage): combat.saves.fortitude.other 3; Cyclops (heritage): combat.saves.will.other -3; ability: Foresight Gaze; ability: Verdant Caster Repertoire; feat: Hunt Prey; feat: Hunter’s Method; feat: Trap Finder |
| Dancing Broom | 1 | construct | construct | 0 | 0 | 55.8 | 139.5 | 1 | provisional | ability: Dusty Haze |
| Dao | 7 | elemental | elemental | 7 | 8 | 131.2 | 328 | 0 | complete | — |
| Djinn | 8 | elemental | elemental | 8 | 9 | 149.2 | 373 | 1 | provisional | natural attack: Wind Blast |
| Doctus | 2 | eternal | eternal | 2 | 2 | 163.2 | 408 | 1 | provisional | Doctus (heritage): combat.naturalArmourFlat.natural 0 |
| Dracoral | 20 | eternal | eternal | 30 | 28 | 176.2 | 440.5 | 13 | provisional | Innate spell: Lay on Hands (10/day); Agothian (race): weakness to evil; Dracoral (heritage): strength +7; Dracoral (heritage): constitution +6; Dracoral (heritage): intelligence +6; Dracoral (heritage): wisdom +6; Dracoral (heritage): charisma +5; Dracoral (heritage): combat.defence.other 10; Dracoral (heritage): combat.defence.status 4; ability: Skill Focus (Detect Deception); ability: Breath Weapon; ability: Radiant Aura; ability: Regeneration 20 (Evil) |
| Draeglir Aelin | 6 | eternal | eternal | 6 | 6 | 122.2 | 305.5 | 7 | provisional | Secondary Critical; Draeglir (race): weakness to good; Draeglir (race): weakness to silver; Draeglir (race): skills.stealth.racial 2; natural attack: Screech; ability: Screech; ability: Returned Essence |
| Draeglir Halya | 20 | eternal | eternal | 28 | 28 | 173.8 | 434.5 | 11 | provisional | Secondary Critical; Draeglir (race): weakness to good; Draeglir (race): weakness to silver; Draeglir (race): skills.stealth.racial 2; Halya (heritage): strength +5; Halya (heritage): constitution +6; Halya (heritage): dexterity +5; Halya (heritage): charisma +6; natural attack: Xithra; ability: Xithra; ability: Returned Essence |
| Draeglir Tyel | 9 | eternal | eternal | 10 | 10 | 141.4 | 353.5 | 8 | provisional | Secondary Critical; Draeglir (race): weakness to good; Draeglir (race): weakness to silver; Draeglir (race): skills.stealth.racial 2; natural attack: Shadowblade; ability: Sneak Attack; ability: Draeglir Tyel Spell Repertoire; ability: Returned Essence |
| Draeglir Vyair | 14 | eternal | eternal | 16 | 18 | 165.2 | 413 | 7 | provisional | Secondary Critical; Draeglir (race): weakness to good; Draeglir (race): weakness to silver; Draeglir (race): skills.stealth.racial 2; Vyair (heritage): strength +5; ability: Draeglir Vyair Spell Repertoire; ability: Returned Essence |
| Dread Shadow | 8 | undead | undead | 6 | 7 | 84.4 | 211 | 5 | provisional | Shadow Hand; Shadow (race): strength -5; Shadow (race): weakness to divine; natural attack: Soul Touch; ability: Incorporeal |
| Dretch | 2 | eternal | eternal | 1 | 1 | 85 | 212.5 | 4 | provisional | Demon (race): weakness to good; Demon (race): weakness to order; Dretch (heritage): combat.defence.other 1; Dretch (heritage): weakness to cold iron |
| Druhari | 6 | beast | beast | 4 | 5 | 74.2 | 185.5 | 0 | complete | — |
| Druharr | 3 | beast | beast | 2 | 2 | 60.6 | 151.5 | 0 | complete | — |
| Dryad | 4 | fey | fey | 3 | 4 | 91.2 | 228 | 1 | provisional | Dryad (race): weakness to cold iron |
| Dusky Muck | 4 | ooze | ooze | 3 | 3 | 64 | 160 | 1 | provisional | natural attack: Acidic Spit |
| Eagle | 1 | animal | animal | 0 | 0 | 50.6 | 126.5 | 0 | complete | — |
| Earth | 1 | elemental | elemental | 0 | 0 | 86.2 | 215.5 | 1 | provisional | ability: Breath Weapon |
| Earth Drake | 8 | wyrm | wyrm | 8 | 8 | 118.8 | 297 | 1 | provisional | ability: Earth Drake Breath |
| Earth Primal - Aerph | 15 | elemental | elemental | 13 | 16 | 110.4 | 276 | 4 | provisional | natural attack: Rock; ability: Earth Primal - Aerph Form; ability: Earth Glide; ability: Earthbound |
| Earth Primal - Maoton | 11 | elemental | elemental | 8 | 11 | 95.2 | 238 | 4 | provisional | natural attack: Rock; ability: Earth Primal - Maoton Form; ability: Earth Glide; ability: Earthbound |
| Earth Primal - Pebbal | 3 | elemental | elemental | 2 | 2 | 74.8 | 187 | 3 | provisional | ability: Earth Primal - Pebbal Form; ability: Earth Glide; ability: Earthbound |
| Earth Primal - Stown | 7 | elemental | elemental | 5 | 6 | 84.8 | 212 | 3 | provisional | ability: Earth Primal - Stown Form; ability: Earth Glide; ability: Earthbound |
| Eclipse | 15 | fey | fey | 18 | 16 | 127.6 | 319 | 5 | provisional | Hag (race): weakness to cold iron; Eclipse (heritage): charisma +5; natural attack: Eclipse Touch; ability: Shifting Aura; ability: Eclipse Spell Repertoire |
| Efreet | 9 | elemental | elemental | 9 | 10 | 140 | 350 | 1 | provisional | ability: Efreet Shifting |
| Elephant | 8 | animal | animal | 5 | 7 | 72.8 | 182 | 2 | provisional | natural attack: Trunk; natural attack: Tusk |
| Ettin | 6 | humanoid | humanoid | 4 | 4 | 60.2 | 150.4 | 2 | provisional | ability: Ettin Source Stat Calibration; ability: Dual Minds |
| Fancalia | 10 | eternal | eternal | 12 | 14 | 188 | 470 | 3 | provisional | Fancalia (heritage): combat.naturalArmourFlat.natural 0; ability: Enchanting Touch; ability: Morphic Camouflage |
| Feloral | 2 | eternal | eternal | 1 | 2 | 114.6 | 286.5 | 2 | provisional | Agothian (race): weakness to evil; Feloral (heritage): combat.defence.other 1 |
| Fire | 1 | elemental | elemental | 0 | 0 | 74.6 | 186.5 | 1 | provisional | ability: Breath Weapon |
| Fire Dragon, Scaleborn | 6 | wyrm | wyrm | 5 | 5 | 89 | 222.5 | 4 | provisional | ability: Fire Dragon Breath; ability: High Magic; ability: Fire Dragon Spell Repertoire; ability: Dragon Advancement (Base +0) |
| Fire Dragon, Sovereign | 18 | wyrm | wyrm | 21 | 21 | 142.2 | 355.5 | 4 | provisional | ability: Fire Dragon Spell Repertoire; ability: High Magic; ability: Fire Dragon Breath; ability: Dragon Advancement (Base +12) |
| Fire Dragon, Talon | 12 | wyrm | wyrm | 13 | 13 | 119.4 | 298.5 | 4 | provisional | ability: Dragon Advancement (Base +6); ability: High Magic; ability: Fire Dragon Breath; ability: Fire Dragon Spell Repertoire |
| Fire Giant | 14 | humanoid | martial-npc | 12 | 12 | 83.2 | 208 | 2 | provisional | Fire Giant (heritage): constitution +5; natural attack: Rock |
| Fire Giant Shaman | 14 | humanoid | ? | 14 | 11 | 51.6 | 129 | 5 | provisional | Class casting; Fire Giant (heritage): constitution +5; natural attack: Rock; ability: Learned Spell Repertoire; Class: Verdant Caster (Creature Class) |
| Fire Primal - Emba | 3 | elemental | elemental | 2 | 2 | 73.2 | 183 | 5 | provisional | Fire Primals (heritage): weakness to water; natural attack: Fiery Slam; natural attack: Fiery Blast; ability: Fire Primal - Emba Form; ability: Fiery Death |
| Fire Primal - Flaim | 7 | elemental | elemental | 5 | 6 | 76.8 | 192 | 5 | provisional | Fire Primals (heritage): weakness to water; natural attack: Fiery Slam; natural attack: Fiery Blast; ability: Fire Primal - Flaim Form; ability: Fiery Death |
| Fire Primal - Intheno | 11 | elemental | elemental | 8 | 9 | 88 | 220 | 5 | provisional | Fire Primals (heritage): weakness to water; natural attack: Fiery Slam; natural attack: Fiery Blast; ability: Fire Primal - Intheno Form; ability: Fiery Death |
| Fire Primal - Pyroclas | 15 | elemental | elemental | 12 | 15 | 99.6 | 249 | 5 | provisional | Fire Primals (heritage): weakness to water; natural attack: Fiery Slam; natural attack: Fiery Blast; ability: Fire Primal - Pyroclas Form; ability: Fiery Death |
| Flame Beetle | 1 | animal | animal | 0 | 0 | 48 | 120 | 2 | provisional | natural attack: Fire Mote; ability: Luminous Glow |
| Flame Drake | 9 | wyrm | wyrm | 9 | 9 | 119.8 | 299.5 | 1 | provisional | ability: Flame Drake Breath |
| Flesh Golem | 8 | construct | construct | 5 | 7 | 76.6 | 191.5 | 1 | provisional | Golem (race): immunity to alteration |
| Flying Rug | 7 | construct | construct | 4 | 6 | 78.6 | 196.5 | 2 | provisional | Flying Rug (heritage): combat.defence.other 3; Flying Rug (heritage): combat.defence.status 1 |
| Forest Dragon, Scaleborn | 5 | wyrm | wyrm | 4 | 4 | 89.8 | 224.5 | 4 | provisional | ability: Dragon Advancement (Base +0); ability: Wild Shape; ability: Forest Dragon Spell Repertoire; ability: Forest Dragon Breath |
| Forest Dragon, Sovereign | 17 | wyrm | wyrm | 20 | 20 | 139.4 | 348.5 | 5 | provisional | ability: Wild Empathy; ability: Dragon Advancement (Base +12); ability: Wild Shape; ability: Forest Dragon Breath; ability: Forest Dragon Spell Repertoire |
| Forest Dragon, Talon | 11 | wyrm | wyrm | 11 | 12 | 113.8 | 284.5 | 5 | provisional | ability: Wild Shape; ability: Dragon Advancement (Base +6); ability: Wild Empathy; ability: Forest Dragon Spell Repertoire; ability: Forest Dragon Breath |
| Forest Troll | 7 | humanoid | humanoid | 6 | 6 | 87.8 | 219.5 | 4 | provisional | Forest Troll (heritage): combat.defence.other 3; Forest Troll (heritage): combat.defence.status 1; ability: Regeneration 7 (Acid/Fire); ability: Verdant Caster Repertoire |
| Frost Drake | 8 | wyrm | wyrm | 7 | 8 | 116.4 | 291 | 1 | provisional | ability: Frost Drake Breath |
| Frost Giant | 12 | humanoid | martial-npc | 8 | 10 | 85.2 | 213 | 1 | provisional | natural attack: Rock |
| Frost Giant Shaman | 12 | humanoid | ? | 11 | 9 | 52 | 130 | 4 | provisional | Class casting; natural attack: Rock; ability: Learned Spell Repertoire; Class: Verdant Caster (Creature Class) |
| Frostsnarl | 11 | fey | fey | 11 | 9 | 87.4 | 218.5 | 3 | provisional | Hag (race): weakness to cold iron; Frostsnarl (heritage): constitution +5; ability: Frostsnarl Spell Repertoire |
| Gargoyle | 5 | elemental | elemental | 4 | 4 | 83 | 207.5 | 2 | provisional | Gargoyle (race): weakness to adamantine; ability: Statue (DC 32) |
| Ghast | 4 | undead | undead | 3 | 3 | 80.6 | 201.5 | 1 | provisional | ability: Carrion Feast |
| Ghoul | 2 | undead | undead | 1 | 1 | 72.2 | 180.5 | 1 | provisional | ability: Carrion Feast |
| Giant Bat | 2 | animal | animal | 1 | 1 | 58.8 | 147 | 1 | provisional | Giant Bat (heritage): combat.defence.other 1 |
| Giant Chameleon | 3 | animal | animal | 2 | 2 | 58.8 | 147 | 2 | provisional | natural attack: Tongue; ability: Camouflage |
| Giant Eagle | 8 | animal | animal | 5 | 7 | 70.6 | 176.5 | 0 | complete | — |
| Giant Frilled Lizard | 5 | animal | animal | 3 | 4 | 66 | 165 | 1 | provisional | ability: Frill Display |
| Giant Gecko | 1 | animal | animal | 0 | 0 | 47.2 | 118 | 1 | provisional | ability: Uncanny Balance |
| Giant Rat | 1 | animal | animal | 0 | 0 | 42 | 105 | 0 | complete | — |
| Giant Spider | 1 | animal | animal | 0 | 0 | 53.2 | 133 | 0 | complete | — |
| Giant Stag Beetle | 4 | animal | animal | 3 | 3 | 71.6 | 179 | 1 | provisional | Giant Stag Beetle (heritage): combat.defence.other 2 |
| Glimmerwick | 2 | fey | fey | 1 | 1 | 62.8 | 157 | 5 | provisional | ability: Gleam-Dart Escape; ability: Irritating Glamour; ability: Luminous Aura; ability: Prankster’s Cruelty; feat: Wingless Flight |
| Goblin Elite | 4 | humanoid | martial-npc | 2 | 3 | 60.8 | 152 | 1 | provisional | ability: Nimble Escape |
| Goblin Warrior | 1 | humanoid | martial-npc | 0 | 0 | 53.2 | 133 | 1 | provisional | ability: Nimble Escape |
| Golden Muck | 10 | ooze | ooze | 8 | 8 | 67.2 | 168 | 0 | complete | — |
| Gondathel | 12 | eternal | eternal | 13 | 15 | 154 | 385 | 2 | provisional | Gondathel (heritage): weakness to adamantine; ability: Mountain's Wrath |
| Gorgon | 10 | beast | beast | 10 | 10 | 108 | 270 | 4 | provisional | Gorgon (race): strength +5; Gorgon (race): immunity to petrification; Gorgon (race): weakness to adamantine; ability: Petrifying Breath |
| Gravhek | 8 | eternal | eternal | 9 | 10 | 163.4 | 408.5 | 7 | provisional | Barghest (race): combat.defence.other 2; Gravhek (heritage): combat.defence.other 2; Gravhek (heritage): combat.defence.status 1; Gravhek (heritage): weakness to good; Gravhek (heritage): weakness to order; ability: Change Shape; ability: Soul Feed |
| Grey Spider | 7 | beast | beast | 5 | 6 | 78.8 | 197 | 4 | provisional | Grey Spider (heritage): combat.defence.other 3; Grey Spider (heritage): combat.defence.status 1; natural attack: Web; ability: Phase |
| Grizzly Bear | 3 | animal | animal | 2 | 2 | 65.4 | 163.5 | 1 | provisional | Grizzly Bear (heritage): combat.defence.other 1 |
| Gryphon | 6 | beast | beast | 4 | 5 | 74.6 | 186.5 | 0 | complete | — |
| Guard Dog | 1 | animal | animal | 0 | 0 | 41.6 | 104 | 0 | complete | — |
| Guardian | 10 | eternal | eternal | 11 | 13 | 160.8 | 402 | 6 | provisional | Angel (race): weakness to evil; Guardian (heritage): combat.defence.other 5; Guardian (heritage): combat.defence.status 2; natural attack: Guardian Mace; ability: Form Weapon; ability: Guardian Aura |
| Guardian Dragon, Hatchling | 8 | wyrm | wyrm | 8 | 8 | 113 | 282.5 | 4 | provisional | ability: Guardian Dragon Spell Repertoire; ability: Dragon Advancement (Base +0); ability: Guardian Dragon Breath; ability: High Magic |
| Guardian Dragon, Sovereign | 20 | wyrm | wyrm | 28 | 28 | 179.4 | 448.5 | 4 | provisional | ability: Guardian Dragon Breath; ability: Dragon Advancement (Base +12); ability: Guardian Dragon Spell Repertoire; ability: High Magic |
| Guardian Dragon, Talon | 14 | wyrm | wyrm | 16 | 16 | 148.6 | 371.5 | 4 | provisional | ability: High Magic; ability: Dragon Advancement (Base +6); ability: Guardian Dragon Breath; ability: Guardian Dragon Spell Repertoire |
| Hantya | 13 | eternal | eternal | 15 | 19 | 197.4 | 493.5 | 7 | provisional | Demon (race): weakness to good; Demon (race): weakness to order; Hantya (heritage): combat.defence.other 6; Hantya (heritage): combat.defence.status 2; Hantya (heritage): combat.initiative.other 15; Hantya (heritage): weakness to cold iron; ability: Painful Truth |
| Hill Giant | 8 | humanoid | martial-npc | 6 | 7 | 72.8 | 182 | 2 | provisional | natural attack: Rock; feat: Big Menacing Fella |
| Hill Giant Shaman | 8 | humanoid | ? | 7 | 5 | 39.6 | 99 | 5 | provisional | Class casting; natural attack: Rock; ability: Learned Spell Repertoire; feat: Big Menacing Fella; Class: Verdant Caster (Creature Class) |
| Hill Troll | 8 | humanoid | humanoid | 5 | 6 | 58.1 | 145.2 | 4 | provisional | Hill Troll (heritage): combat.defence.other 4; Hill Troll (heritage): combat.defence.status 1; natural attack: Rock; ability: Regeneration 8 (Acid/Fire) |
| Huanling | 8 | fey | fey | 7 | 7 | 82.2 | 205.5 | 3 | provisional | Huanling (race): weakness to cold iron; ability: Huanling Spell Repertoire; ability: Huanling Shifting |
| Human Ghost | 5 | undead | undead | 4 | 5 | 112.4 | 281 | 4 | provisional | Human Ghost (race): strength -5; Human Ghost (race): resistance to all damage except essence or force; ability: Incorporeal; ability: Essence Attacks |
| Ice | 1 | elemental | elemental | 0 | 0 | 74.6 | 186.5 | 1 | provisional | ability: Breath Weapon |
| Inferno Spider | 10 | beast | beast | 7 | 9 | 81.2 | 203 | 4 | provisional | Inferno Spider (heritage): combat.defence.other 5; Inferno Spider (heritage): combat.defence.status 2; Inferno Spider (heritage): combat.criticalResistance 1; ability: Fire Breath |
| Iron Golem | 14 | construct | construct | 11 | 12 | 84.2 | 210.5 | 3 | provisional | Golem (race): immunity to alteration; Iron Golem (heritage): strength +5; ability: Iron Golem Breath |
| Jann | 6 | elemental | elemental | 5 | 6 | 112.4 | 281 | 0 | complete | — |
| Khavar | 15 | eternal | eternal | 19 | 21 | 187.8 | 469.5 | 8 | provisional | Demon (race): weakness to good; Demon (race): weakness to order; Khavar (heritage): constitution +6; Khavar (heritage): combat.defence.other 7; Khavar (heritage): combat.defence.status 3; Khavar (heritage): combat.initiative.other 25; Khavar (heritage): weakness to cold iron; ability: Aura of Paranoia |
| Kobold Elite | 4 | humanoid | humanoid | 2 | 3 | 50 | 125 | 1 | provisional | Kobold (race): resources.pp.base 1 |
| Kobold Sneak | 1 | humanoid | humanoid | 0 | 0 | 44.8 | 112 | 1 | provisional | Kobold (race): resources.pp.base 1 |
| Kothorn | 5 | animal | animal | 3 | 4 | 61.2 | 153 | 3 | provisional | Boar (race): combat.defence.other 1; Kothorn (heritage): combat.defence.other 1; Kothorn (heritage): combat.defence.status 1 |
| Kraken | 20 | beast | beast | 28 | 30 | 199.6 | 499 | 2 | provisional | Kraken (race): constitution +7; Kraken (race): dexterity +6 |
| Laeleth | 14 | animal | animal | 11 | 14 | 93.2 | 233 | 3 | provisional | Ape (race): combat.defence.other 1; Laeleth (heritage): combat.defence.other 6; Laeleth (heritage): combat.defence.status 2 |
| Leopard | 4 | animal | animal | 2 | 3 | 59.8 | 149.5 | 1 | provisional | Leopard (heritage): combat.defence.other 2 |
| Light Dragon, Scaleborn | 5 | wyrm | wyrm | 4 | 5 | 99.4 | 248.5 | 4 | provisional | ability: Dragon Advancement (Base +0); ability: Light Dragon Breath; ability: Light Dragon Spell Repertoire; ability: High Magic |
| Light Dragon, Sovereign | 17 | wyrm | wyrm | 20 | 20 | 149.4 | 373.5 | 4 | provisional | ability: Light Dragon Breath; ability: Dragon Advancement (Base +12); ability: Light Dragon Spell Repertoire; ability: High Magic |
| Light Dragon, Talon | 11 | wyrm | wyrm | 11 | 12 | 122.6 | 306.5 | 4 | provisional | ability: High Magic; ability: Light Dragon Spell Repertoire; ability: Light Dragon Breath; ability: Dragon Advancement (Base +6) |
| Lion | 5 | animal | animal | 4 | 4 | 67 | 167.5 | 3 | provisional | Lion (heritage): combat.defence.other 2; Lion (heritage): combat.defence.status 1; ability: Lion Source Stat Calibration |
| Luporal | 6 | eternal | eternal | 6 | 7 | 147.6 | 369 | 4 | provisional | Agothian (race): weakness to evil; Luporal (heritage): combat.defence.other 3; Luporal (heritage): combat.defence.status 1; ability: Calming Aura |
| Lustrian Brave | 2 | humanoid | humanoid | 1 | 1 | 52.8 | 132 | 2 | provisional | Lustrian (race): combat.deathState 6; feat: Hold Breath |
| Lustrian Khrissk | 6 | humanoid | humanoid | 6 | 4 | 65.6 | 164 | 6 | provisional | Lustrian (race): combat.deathState 6; ability: Verdant Repertoire (Lustrian Khrissk); feat: Hunt Prey; feat: Hunter’s Method; feat: Trap Finder; feat: Hold Breath |
| Lynxara | 1 | beast | beast | 0 | 0 | 69.8 | 174.5 | 2 | provisional | Lynxara (heritage): combat.saves.fortitude.other 2; ability: Nature's Power |
| Magnuslamnia | 14 | animal | animal | 11 | 14 | 104.8 | 262 | 2 | provisional | Shark (race): charisma -5; ability: Aquatic |
| Mammoth | 11 | animal | animal | 7 | 9 | 76.8 | 192 | 2 | provisional | natural attack: Trunk; natural attack: Tusk |
| Manticore | 8 | beast | beast | 6 | 7 | 83.4 | 208.5 | 1 | provisional | natural attack: Spikes |
| Marid | 10 | elemental | elemental | 11 | 13 | 153.2 | 383 | 1 | provisional | Marid (heritage): dexterity +5 |
| Marilith | 17 | eternal | eternal | 22 | 23 | 178 | 445 | 11 | provisional | Spell: Wall of Blade; Demon (race): weakness to good; Demon (race): weakness to order; Marilith (heritage): strength +5; Marilith (heritage): charisma +5; Marilith (heritage): combat.defence.other 8; Marilith (heritage): combat.defence.status 3; Marilith (heritage): combat.initiative.other 20; Marilith (heritage): weakness to cold iron; ability: Aura of Command; ability: Storm of Blades |
| Marshlight | 9 | fey | fey | 9 | 9 | 106.6 | 266.5 | 2 | provisional | Hag (race): weakness to cold iron; ability: Marshlight Spell Repertoire |
| Medusa | 7 | beast | beast | 7 | 6 | 77.6 | 194 | 2 | provisional | ability: Petrifying Gaze; ability: Medusa Arcane Repertoire |
| Minotaur | 6 | humanoid | humanoid | 5 | 5 | 82.2 | 205.4 | 0 | complete | — |
| Mirneth | 11 | beast | beast | 8 | 11 | 98.8 | 247 | 3 | provisional | Mirneth (heritage): combat.defence.other 5; Mirneth (heritage): combat.defence.status 2; ability: Deafening Screech |
| Mite Swarm | 2 | animal | animal | 1 | 1 | 71.2 | 178 | 6 | provisional | Mite Swarm (heritage): strength -7; Mite Swarm (heritage): immunity to reactions provoked by movement; Mite Swarm (heritage): resistance to targeted; Mite Swarm (heritage): weakness to area damage; ability: Swarm; ability: Mite Bites |
| Monstrous Spider | 6 | animal | animal | 4 | 4 | 61.2 | 153 | 3 | provisional | Monstrous Spider (heritage): combat.defence.other 3; Monstrous Spider (heritage): combat.defence.status 1; natural attack: Web |
| Morndulir Soldier | 6 | humanoid | humanoid | 4 | 4 | 60.4 | 151 | 0 | complete | — |
| Morndulir Worker | 2 | humanoid | humanoid | 1 | 1 | 48 | 120 | 0 | complete | — |
| Mortivor | 14 | eternal | eternal | 16 | 19 | 171.2 | 428 | 7 | provisional | Spell: Heal (PP 14 source listing); Soulaes (race): weakness to good; Mortivor (heritage): strength +5; Mortivor (heritage): constitution +5; Mortivor (heritage): combat.defence.other 7; Mortivor (heritage): combat.defence.status 2; ability: Mortivor Soul Damage |
| Mountain Serpent | 11 | animal | animal | 8 | 11 | 91.6 | 229 | 3 | provisional | Mountain Serpent (heritage): strength +5; Mountain Serpent (heritage): combat.defence.other 5; Mountain Serpent (heritage): combat.defence.status 2 |
| Mountain Troll | 10 | humanoid | humanoid | 8 | 9 | 72 | 180 | 4 | provisional | Mountain Troll (heritage): combat.defence.other 5; Mountain Troll (heritage): combat.defence.status 2; natural attack: Rock; ability: Regeneration 10 (Acid/Fire) |
| Mournkin | 6 | humanoid | humanoid | 5 | 5 | 71.6 | 179 | 4 | provisional | Mournkin (race): combat.defence.other 3; Mournkin (race): combat.defence.status 1; natural attack: Grave Touch; ability: Grave Touch |
| Mummy | 7 | undead | undead | 5 | 6 | 77.9 | 194.8 | 1 | provisional | ability: Skill Focus (Search) |
| Nettlehide | 9 | plant | plant | 9 | 10 | 138.4 | 346 | 1 | provisional | Nettlehide (race): strength +5 |
| Nightmare | 7 | eternal | eternal | 7 | 7 | 127.6 | 319 | 2 | provisional | Nightmare (race): strength +5; Nightmare (race): combat.naturalArmourFlat.natural 0 |
| Nightmare Lord | 12 | eternal | eternal | 13 | 14 | 143.6 | 359 | 3 | provisional | Nightmare (race): strength +5; Nightmare (race): combat.naturalArmourFlat.natural 0; Nightmare Lord (heritage): combat.naturalArmourFlat.natural 0 |
| Nightray | 8 | wyrm | wyrm | 9 | 8 | 121 | 302.5 | 3 | provisional | ability: Regeneration 8 (Moonlight only); ability: Nightray Breath; ability: Nightray Spell Repertoire |
| Nimblespring | 5 | fey | fey | 5 | 4 | 86.8 | 217 | 3 | provisional | Nimblespring (race): weakness to cold iron; ability: Ether Leap; ability: Nimblespring Spell Repertoire |
| Nixie | 1 | fey | fey | 0 | 0 | 72.2 | 180.5 | 2 | provisional | Nixie (race): weakness to cold iron; ability: Nixie Spell Repertoire |
| Nocturnus | 10 | eternal | eternal | 12 | 14 | 182.4 | 456 | 5 | provisional | Soulaes (race): weakness to good; Nocturnus (heritage): combat.defence.other 5; Nocturnus (heritage): combat.defence.status 2; natural attack: Soul Blast; ability: Nocturnus Soul Damage |
| Noxmortis | 18 | eternal | eternal | 28 | 23 | 164 | 410 | 8 | provisional | Soulaes (race): weakness to good; Noxmortis (heritage): intelligence +6; Noxmortis (heritage): wisdom +5; Noxmortis (heritage): charisma +6; Noxmortis (heritage): combat.defence.other 9; Noxmortis (heritage): combat.defence.status 3; Noxmortis (heritage): combat.criticalResistance 1; natural attack: Soul Touch |
| Nubifor | 15 | eternal | eternal | 19 | 22 | 190.8 | 477 | 3 | provisional | Nubifor (heritage): strength +8; Nubifor (heritage): combat.naturalArmourFlat.natural 0; ability: Cloud Weaving |
| Obsidral | 15 | elemental | elemental | 13 | 16 | 125 | 312.5 | 2 | provisional | Gargoyle (race): weakness to adamantine; ability: Statue (DC 42) |
| Oceanidh | 2 | humanoid | humanoid | 1 | 1 | 46.8 | 117 | 1 | provisional | ability: Aquatic |
| Oceanidh Hunter | 6 | humanoid | humanoid | 6 | 4 | 56.8 | 142 | 4 | provisional | ability: Aquatic; ability: Oceanidh Hunter Spell Repertoire; feat: Hunt Prey; feat: Trap Finder |
| Ochre Jelly | 6 | ooze | ooze | 4 | 5 | 78.4 | 196 | 0 | complete | — |
| Ogre | 4 | humanoid | humanoid | 3 | 3 | 55.2 | 138 | 0 | complete | — |
| Ogre Soldier | 8 | humanoid | humanoid | 6 | 6 | 68 | 170 | 0 | complete | — |
| Oryceps | 4 | plant | plant | 2 | 3 | 56.4 | 141 | 3 | provisional | ability: Emit Spores; ability: Violet Spore; ability: Plant Critical Immunity |
| Pegasus | 4 | beast | beast | 3 | 3 | 89.6 | 224 | 1 | provisional | ability: Pegasus Spell Repertoire |
| Phasmus | 14 | aberration | aberration | 12 | 15 | 119.6 | 299 | 1 | provisional | ability: Phasmus Telepathy |
| Phoenix | 15 | elemental | elemental | 18 | 22 | 192.2 | 480.5 | 4 | provisional | Phoenix (race): dexterity +7; Phoenix (race): weakness to evil; natural attack: Fire Ray; ability: Reborn from the Ashes |
| Pixie | 5 | fey | fey | 4 | 5 | 103.2 | 258 | 2 | provisional | Pixie (race): weakness to cold iron; ability: Pixie Bow Casting |
| Polar Bear | 5 | animal | animal | 4 | 4 | 73 | 182.5 | 2 | provisional | Polar Bear (heritage): combat.defence.other 2; Polar Bear (heritage): combat.defence.status 1 |
| Pyraquenil | 4 | eternal | eternal | 4 | 4 | 122 | 305 | 2 | provisional | natural attack: Fire Mote; ability: Molten Blood |
| Pyroral | 13 | eternal | eternal | 16 | 19 | 191.8 | 479.5 | 4 | provisional | Agothian (race): weakness to evil; Pyroral (heritage): dexterity +5; Pyroral (heritage): combat.defence.other 6; Pyroral (heritage): combat.defence.status 2 |
| Quasit | 1 | eternal | eternal | 0 | 1 | 102.2 | 255.5 | 5 | provisional | Demon (race): weakness to good; Demon (race): weakness to order; Quasit (heritage): combat.initiative.other 10; Quasit (heritage): weakness to cold iron; ability: Quasit Shifting |
| Queldor | 8 | eternal | eternal | 8 | 10 | 153 | 382.4 | 4 | provisional | Soulaes (race): weakness to good; Queldor (heritage): combat.defence.other 4; Queldor (heritage): combat.defence.status 1; ability: Queldor Soul Damage |
| Rat Swarm | 2 | animal | animal | 1 | 1 | 57.6 | 144 | 5 | provisional | Rat Swarm (heritage): immunity to mental effects; Rat Swarm (heritage): immunity to reactions provoked by movement; Rat Swarm (heritage): weakness to area damage; ability: Swarm; ability: Rat Bites |
| Raven | 1 | animal | animal | 0 | 0 | 42.4 | 106 | 1 | provisional | ability: Magpie |
| Raven Swarm | 3 | animal | animal | 2 | 2 | 61.9 | 154.8 | 5 | provisional | Raven Swarm (heritage): immunity to reactions provoked by movement; Raven Swarm (heritage): weakness to area damage; ability: Keen Sight; ability: Swarm; ability: Raven Beaks |
| Reaver | 20 | eternal | eternal | 28 | 30 | 194 | 485 | 10 | provisional | Soulaes (race): weakness to good; Reaver (heritage): strength +5; Reaver (heritage): constitution +6; Reaver (heritage): combat.defence.other 10; Reaver (heritage): combat.defence.status 4; ability: Relentless Pursuit; ability: Unstoppable Force; ability: Reaver Blade; ability: Regeneration 20 (Divine); ability: Reaver Soul Damage |
| Riding Dog | 1 | animal | animal | 0 | 0 | 46.4 | 116 | 0 | complete | — |
| Riding Horse | 2 | animal | animal | 1 | 1 | 62.4 | 156 | 0 | complete | — |
| River Troll | 9 | humanoid | humanoid | 7 | 8 | 75.6 | 189.1 | 3 | provisional | River Troll (heritage): combat.defence.other 4; River Troll (heritage): combat.defence.status 1; ability: Regeneration 9 (Acid/Fire) |
| Roc | 15 | animal | animal | 12 | 16 | 112.6 | 281.5 | 1 | provisional | ability: Keen Sight |
| Rumellor | 16 | eternal | eternal | 17 | 22 | 175.8 | 439.5 | 2 | provisional | ability: Wind Rider; ability: Wind Lash |
| Salamander | 7 | elemental | elemental | 5 | 7 | 91 | 227.5 | 0 | complete | — |
| Salamaxis | 10 | elemental | elemental | 10 | 10 | 105.6 | 264 | 0 | complete | — |
| Sand Serpent | 3 | animal | animal | 2 | 2 | 54 | 135 | 1 | provisional | Sand Serpent (heritage): combat.defence.other 1 |
| Sea Dragon, Scaleborn | 4 | wyrm | wyrm | 3 | 4 | 91.8 | 229.5 | 3 | provisional | ability: Dragon Advancement (Base +0); ability: Sea Dragon Spell Repertoire; ability: Sea Dragon Breath |
| Sea Dragon, Sovereign | 16 | wyrm | wyrm | 20 | 20 | 150.6 | 376.5 | 3 | provisional | ability: Sea Dragon Spell Repertoire; ability: Sea Dragon Breath; ability: Dragon Advancement (Base +12) |
| Sea Dragon, Talon | 10 | wyrm | wyrm | 11 | 11 | 116.6 | 291.5 | 3 | provisional | ability: Sea Dragon Breath; ability: Sea Dragon Spell Repertoire; ability: Dragon Advancement (Base +6) |
| Sequoia Allium | 12 | plant | plant | 10 | 12 | 90.8 | 227 | 6 | provisional | Sequoia Allium (race): constitution +6; Sequoia Allium (race): charisma -5; Sequoia Allium (race): immunity to critical (damage and bleed only); natural attack: Vine; ability: Garlic Breath; ability: Regeneration 12 (Fire) |
| Seraphim | 16 | eternal | eternal | 22 | 24 | 206 | 515 | 10 | provisional | Angel (race): weakness to evil; Seraphim (heritage): strength +5; Seraphim (heritage): wisdom +5; Seraphim (heritage): charisma +5; Seraphim (heritage): combat.defence.other 8; Seraphim (heritage): combat.defence.status 3; natural attack: Seraphim Greatsword; ability: Regeneration 16 (Evil); ability: Form Weapon; ability: Seraphim Aura |
| Shade Dragon, Mature | 19 | wyrm | wyrm | 24 | 24 | 154.6 | 386.5 | 4 | provisional | ability: Shade Dragon Breath; ability: Dragon Advancement (Base +12); ability: Coldfire Aura; ability: Shade Dragon Spell Repertoire |
| Shade Dragon, Scaleborn | 7 | wyrm | wyrm | 7 | 7 | 109.4 | 273.5 | 3 | provisional | ability: Shade Dragon Spell Repertoire; ability: Shade Dragon Breath; ability: Dragon Advancement (Base +0) |
| Shade Dragon, Talon | 13 | wyrm | wyrm | 14 | 15 | 137.8 | 344.5 | 3 | provisional | ability: Shade Dragon Spell Repertoire; ability: Shade Dragon Breath; ability: Dragon Advancement (Base +6) |
| Shade Stalker | 16 | undead | undead | 19 | 20 | 164 | 410 | 5 | provisional | Shade Stalker (heritage): dexterity +6; Shade Stalker (heritage): weakness to good; natural attack: Soul Claws; ability: Incorporeal; ability: Sneak Attack (6d6) |
| Shade Walker | 14 | undead | undead | 16 | 19 | 170.8 | 427 | 4 | provisional | Shade Walker (heritage): weakness to good; natural attack: Soul Claws; ability: Incorporeal; ability: Shadow Touch |
| Shade Wing | 12 | undead | undead | 13 | 15 | 150.4 | 376 | 8 | provisional | Shadow Hand; Shade Wing (heritage): dexterity +5; Shade Wing (heritage): weakness to good; natural attack: Soul Bite; natural attack: Soul Claws; ability: Incorporeal; ability: Shadow Touch; ability: Silent Glide |
| Shade Wraith | 20 | undead | undead | 22 | 28 | 177.6 | 444 | 4 | provisional | Shadow Hand; Shade Wraith (heritage): weakness to good; natural attack: Soul Claws; ability: Incorporeal |
| Shadow | 4 | undead | undead | 3 | 3 | 76 | 190 | 5 | provisional | Shadow Hand; Shadow (race): strength -5; Shadow (race): weakness to divine; natural attack: Soul Touch; ability: Incorporeal |
| Shadowthorn | 7 | fey | fey | 7 | 7 | 97 | 242.5 | 2 | provisional | Hag (race): weakness to cold iron; ability: Shadowthorn Spell Repertoire |
| Shambler | 6 | plant | plant | 5 | 5 | 77.2 | 193 | 2 | provisional | ability: Shambler Defences; ability: Regeneration 6 (Fire) |
| Shark | 4 | animal | animal | 2 | 3 | 68.8 | 172 | 2 | provisional | Shark (race): charisma -5; ability: Aquatic |
| Skeleton Champion | 4 | undead | undead | 4 | 4 | 95.6 | 239.1 | 7 | provisional | Skeleton (race): intelligence -6; Skeleton (race): charisma -6; Skeleton (race): combat.defence.other 1; Skeleton (race): combat.saves.will.other -6; Skeleton Champion (heritage): combat.defence.other 2; Skeleton Champion (heritage): combat.saves.will.other -4; Skeleton Champion (heritage): combat.initiative.other -20 |
| Skeleton Warrior | 1 | undead | undead | 1 | 0 | 83.6 | 208.9 | 4 | provisional | Skeleton (race): intelligence -6; Skeleton (race): charisma -6; Skeleton (race): combat.defence.other 1; Skeleton (race): combat.saves.will.other -6 |
| Smilodon | 8 | animal | animal | 5 | 7 | 76.2 | 190.5 | 3 | provisional | Smilodon (heritage): combat.defence.other 4; Smilodon (heritage): combat.defence.status 1; ability: Smilodon Source Stat Calibration |
| Snow Troll | 13 | humanoid | humanoid | 10 | 11 | 75.1 | 187.7 | 4 | provisional | Snow Troll (heritage): constitution +6; Snow Troll (heritage): combat.defence.other 6; Snow Troll (heritage): combat.defence.status 3; ability: Regeneration 13 (Acid/Fire) |
| Somnichan | 20 | eternal | eternal | 28 | 32 | 215.8 | 539.5 | 6 | provisional | Somnichan (heritage): strength +8; Somnichan (heritage): constitution +6; Somnichan (heritage): combat.naturalArmourFlat.natural 0; ability: Aureate Resonance; ability: Celestial Flight; ability: Dream Weave Breath |
| Soul Shade | 22 | undead | undead | 33 | 35 | 219.2 | 548 | 9 | provisional | Shadow Hand; Soul Shade (heritage): dexterity +8; Soul Shade (heritage): weakness to good; Soul Shade (heritage): weakness to silver; natural attack: Soul Claws; natural attack: Shadowy Tendril; ability: Incorporeal; ability: Darkness Unleashed; ability: Soul Eclipse |
| Spectre | 7 | undead | undead | 6 | 7 | 91.2 | 228 | 8 | provisional | Spectre (race): strength -5; Spectre (race): combat.defence.other 3; Spectre (race): combat.defence.status 1; Spectre (race): resistance to all damage except force or essence; natural attack: Soul Touch; ability: Incorporeal; ability: Corruption; ability: Desperation Frenzy |
| Sphinx | 10 | beast | beast | 11 | 11 | 111 | 277.5 | 4 | provisional | Sphinx (race): combat.defence.other 5; Sphinx (race): combat.defence.status 2; ability: Riddle Master; ability: Ethereal Caster Repertoire |
| Spider Swarm | 2 | animal | animal | 1 | 1 | 50.5 | 126.2 | 6 | provisional | Spider Swarm (heritage): combat.defence.other 1; Spider Swarm (heritage): immunity to reactions provoked by movement; Spider Swarm (heritage): resistance to targeted; Spider Swarm (heritage): weakness to area damage; ability: Swarm; ability: Spider Bites |
| Stone Giant | 10 | humanoid | martial-npc | 9 | 9 | 76 | 190 | 1 | provisional | natural attack: Rock |
| Stone Giant Shaman | 10 | humanoid | ? | 9 | 7 | 42.8 | 107 | 4 | provisional | Class casting; natural attack: Rock; ability: Learned Spell Repertoire; Class: Verdant Caster (Creature Class) |
| Stone Golem | 12 | construct | construct | 8 | 10 | 86.6 | 216.5 | 2 | provisional | Golem (race): immunity to alteration; ability: Stone Golem Breath |
| Storm Crow | 12 | beast | beast | 13 | 13 | 110.6 | 276.5 | 5 | provisional | Storm Crow (race): combat.defence.other 6; Storm Crow (race): combat.defence.status 2; ability: Keen Sight; ability: Thunder Strike; ability: Verdant Caster Repertoire |
| Storm Drake | 9 | wyrm | wyrm | 9 | 9 | 124.6 | 311.5 | 1 | provisional | ability: Storm Drake Breath |
| Storm Giant | 18 | humanoid | martial-npc | 18 | 19 | 123.6 | 309 | 4 | provisional | Spell: Anchor; Spell: Orb of Electricity; natural attack: Rock; ability: Lightning Strike |
| Storm Giant Shaman | 18 | humanoid | ? | 20 | 18 | 90.4 | 226 | 7 | provisional | Class casting; Spell: Anchor; Spell: Orb of Electricity; natural attack: Rock; ability: Lightning Strike; ability: Learned Spell Repertoire; Class: Verdant Caster (Creature Class) |
| Succubus | 8 | eternal | eternal | 9 | 10 | 154.6 | 386.5 | 10 | provisional | Demon (race): weakness to good; Demon (race): weakness to order; Succubus (heritage): charisma +6; Succubus (heritage): combat.defence.other 4; Succubus (heritage): combat.defence.status 1; Succubus (heritage): combat.initiative.other 10; Succubus (heritage): weakness to cold iron; ability: Aura of Seduction; ability: Draining Kiss; ability: Embrace |
| Tenebrax | 6 | eternal | eternal | 5 | 7 | 131 | 327.6 | 9 | provisional | Soulaes (race): weakness to good; Tenebrax (heritage): combat.defence.other 3; Tenebrax (heritage): combat.defence.status 1; Tenebrax (heritage): combat.saves.fortitude.other -5; Tenebrax (heritage): combat.saves.reflex.other 1; Tenebrax (heritage): combat.saves.will.other -8; natural attack: Soul Touch; ability: Incorporeal; ability: Fearful Power |
| Terradon | 14 | animal | animal | 11 | 12 | 77.8 | 194.5 | 3 | provisional | Terradon (heritage): strength +5; Terradon (heritage): constitution +5; ability: Earthquake Stomp |
| Thel | 10 | eternal | eternal | 12 | 14 | 172.2 | 430.5 | 10 | provisional | Demon (race): weakness to good; Demon (race): weakness to order; Thel (heritage): strength -6; Thel (heritage): combat.defence.other 5; Thel (heritage): combat.defence.status 2; Thel (heritage): combat.initiative.other 10; Thel (heritage): resistance to all damage except force; Thel (heritage): weakness to cold iron; ability: Incorporeal; ability: No Form |
| Thornkin | 6 | plant | plant | 4 | 4 | 56.8 | 142 | 4 | provisional | Thornkin (race): combat.defence.other 3; Thornkin (race): combat.defence.status 1; natural attack: Thorn Slash; ability: Thorny Defence |
| Tiger | 6 | animal | animal | 4 | 5 | 73 | 182.5 | 2 | provisional | Tiger (heritage): combat.defence.other 3; Tiger (heritage): combat.defence.status 1 |
| Titan | 20 | humanoid | humanoid | 28 | 30 | 191.5 | 478.8 | 7 | provisional | Titan (race): constitution +6; Titan (race): combat.defence.other 10; Titan (race): combat.defence.status 4; Titan (race): combat.criticalResistance 2; natural attack: Elemental Blast; ability: All Metamagic Feats; ability: Universal Divinity Repertoire |
| Titan Hound | 5 | animal | animal | 3 | 4 | 59.6 | 149 | 0 | complete | — |
| Titasuchus | 10 | animal | animal | 8 | 10 | 92.8 | 232 | 3 | provisional | Crocodile (race): combat.defence.other 2; Titasuchus (heritage): combat.defence.other 3; Titasuchus (heritage): combat.defence.status 2 |
| Triclops | 14 | humanoid | humanoid | 16 | 14 | 107.4 | 268.6 | 8 | provisional | Spell: Blast of Energy; Cyclopian (race): combat.defence.other 2; Cyclopian (race): combat.defence.status 1; Triclops (heritage): combat.defence.other 10; Triclops (heritage): combat.saves.fortitude.other 3; Triclops (heritage): combat.saves.will.other -3; ability: Foresight Gaze; ability: Ethereal Caster Repertoire |
| Unicorn | 10 | beast | beast | 12 | 12 | 134 | 335 | 2 | provisional | ability: Unicorn Spell Repertoire; ability: Horn of Purity |
| Vampire | 10 | undead | undead | 8 | 12 | 135 | 337.5 | 10 | provisional | Spell: Animal Form; Vampire (race): dexterity +5; Vampire (race): charisma +5; Vampire (race): combat.defence.other 5; Vampire (race): combat.defence.status 2; Vampire (race): skills.mentalFocus.racial 1; Vampire (race): combat.saves.will.racial 1; Vampire (race): resistance to mundane (silver); ability: Fast Healing; feat: Agile Strike |
| Verdant Muck | 6 | ooze | ooze | 5 | 4 | 69.2 | 173 | 1 | provisional | ability: Regeneration 5 (Fire) |
| Violith | 3 | eternal | eternal | 2 | 3 | 114.4 | 286 | 3 | provisional | Soulaes (race): weakness to good; Violith (heritage): combat.defence.other 1; natural attack: Spines |
| Viper | 1 | animal | animal | 0 | 0 | 42.8 | 107 | 0 | complete | — |
| Virtue | 6 | eternal | eternal | 6 | 7 | 142.8 | 357 | 6 | provisional | Angel (race): weakness to evil; Virtue (heritage): charisma +5; Virtue (heritage): combat.defence.other 3; Virtue (heritage): combat.defence.status 1; ability: Harmonize; ability: Inspiring Aura |
| Vrock | 12 | eternal | eternal | 13 | 14 | 148.2 | 370.5 | 8 | provisional | Demon (race): weakness to good; Demon (race): weakness to order; Vrock (heritage): combat.defence.other 6; Vrock (heritage): combat.defence.status 2; Vrock (heritage): weakness to cold iron; ability: Cloud of Spores; ability: Dance of Ruin; ability: Stunning Screech |
| Waarg | 5 | beast | beast | 4 | 4 | 77.6 | 194 | 3 | provisional | Wolf (race): combat.defence.other 1; Waarg (heritage): combat.defence.other 1; Waarg (heritage): combat.defence.status 1 |
| War Horse | 3 | animal | animal | 2 | 2 | 66.8 | 167 | 1 | provisional | feat: Armour Proficiency Light & Medium |
| Water | 1 | elemental | elemental | 0 | 0 | 76.2 | 190.5 | 1 | provisional | ability: Breath Weapon |
| Water Primal - Dropp | 3 | elemental | elemental | 2 | 2 | 76.8 | 192 | 2 | provisional | ability: Water Primal - Dropp Form; ability: Soak |
| Water Primal - Synarmi | 15 | elemental | elemental | 12 | 15 | 106.8 | 267 | 3 | provisional | ability: Water Primal - Synarmi Form; ability: Soak; ability: Watery Blast |
| Water Primal - Tydal | 11 | elemental | elemental | 8 | 11 | 92.4 | 231 | 3 | provisional | ability: Water Primal - Tydal Form; ability: Soak; ability: Watery Blast |
| Water Primal - Waive | 7 | elemental | elemental | 5 | 6 | 82.4 | 206 | 2 | provisional | ability: Water Primal - Waive Form; ability: Soak |
| Werebat | 3 | humanoid | humanoid | 3 | 2 | 70.8 | 177 | 5 | provisional | Lycanthrope (race): weakness to silver; Werebat (heritage): combat.defence.other 1; ability: Animal Empathy; ability: Luna Frenzy; ability: Shift Form |
| Werebear | 6 | humanoid | humanoid | 4 | 5 | 76.6 | 191.5 | 6 | provisional | Lycanthrope (race): weakness to silver; Werebear (heritage): combat.defence.other 3; Werebear (heritage): combat.defence.status 1; ability: Animal Empathy; ability: Luna Frenzy; ability: Shift Form |
| Wereboar | 4 | humanoid | humanoid | 3 | 3 | 62.8 | 157 | 5 | provisional | Lycanthrope (race): weakness to silver; Wereboar (heritage): combat.defence.other 2; ability: Animal Empathy; ability: Luna Frenzy; ability: Shift Form |
| Werecat | 8 | humanoid | humanoid | 5 | 7 | 71.8 | 179.5 | 7 | provisional | Lycanthrope (race): weakness to silver; Werecat (heritage): combat.defence.other 4; Werecat (heritage): combat.defence.status 1; ability: Animal Empathy; ability: Luna Frenzy; ability: Shift Form; feat: Cat's Landing |
| Wererat | 2 | humanoid | humanoid | 1 | 1 | 65 | 162.5 | 5 | provisional | Lycanthrope (race): weakness to silver; Wererat (heritage): combat.defence.other 1; ability: Animal Empathy; ability: Luna Frenzy; ability: Shift Form |
| Wereraven | 7 | humanoid | humanoid | 5 | 6 | 74.6 | 186.5 | 6 | provisional | Lycanthrope (race): weakness to silver; Wereraven (heritage): combat.defence.other 3; Wereraven (heritage): combat.defence.status 1; ability: Animal Empathy; ability: Luna Frenzy; ability: Shift Form |
| Werewolf | 4 | humanoid | humanoid | 3 | 3 | 63 | 157.5 | 5 | provisional | Lycanthrope (race): weakness to silver; Werewolf (heritage): combat.defence.other 2; ability: Animal Empathy; ability: Luna Frenzy; ability: Shift Form |
| Wight | 6 | undead | undead | 5 | 6 | 106.3 | 265.7 | 3 | provisional | Wight (race): combat.defence.other 3; Wight (race): combat.defence.status 1; ability: Spiteful Strike |
| Wolf | 2 | animal | animal | 1 | 1 | 50.7 | 126.8 | 1 | provisional | Wolf (race): combat.defence.other 1 |
| Wood Golem | 6 | construct | construct | 4 | 5 | 78.2 | 195.5 | 1 | provisional | Golem (race): immunity to alteration |
| Wraith | 10 | undead | undead | 9 | 12 | 134.6 | 336.5 | 5 | provisional | Wraith (race): strength -6; Wraith (race): combat.defence.other 5; Wraith (race): combat.defence.status 2; Wraith (race): resistance to all damage except force or essence; ability: Incorporeal |
| Wrathmorta | 12 | eternal | eternal | 13 | 15 | 169.4 | 423.5 | 5 | provisional | Soulaes (race): weakness to good; Wrathmorta (heritage): combat.defence.other 6; Wrathmorta (heritage): combat.defence.status 2; ability: Necrotic Scream; ability: Soul Harvest |
| Wulve | 4 | animal | animal | 2 | 3 | 66.6 | 166.6 | 2 | provisional | Wolf (race): combat.defence.other 1; Wulve (heritage): combat.defence.other 1 |
| Wysp | 7 | fey | fey | 5 | 6 | 82.8 | 207 | 7 | provisional | Wysp (race): combat.defence.other 3; Wysp (race): combat.defence.status 1; Wysp (race): combat.criticalResistance 2; Wysp (race): resistance to all damage except force (cold iron); Wysp (race): weakness to cold iron; natural attack: Shocking Touch; ability: Incorporeal |
| Wyvern | 7 | wyrm | wyrm | 5 | 7 | 91.8 | 229.5 | 0 | complete | — |
| Xort | 8 | plant | plant | 6 | 6 | 54 | 135 | 3 | provisional | natural attack: Needle Fire; ability: Xort Defence; ability: Xort Shifting |
| Yulussil | 20 | eternal | eternal | 34 | 24 | 148.8 | 372 | 4 | provisional | Yulussil (heritage): dexterity +7; Yulussil (heritage): intelligence +6; Yulussil (heritage): weakness to divine; ability: Aura of Ashes |
| Zombie, Human | 1 | undead | undead | 0 | 0 | 67.6 | 169 | 6 | provisional | Zombie, Human (race): intelligence -5; Zombie, Human (race): charisma -5; Zombie, Human (race): skills.athletics.racial 1; Zombie, Human (race): combat.saves.fortitude.other 2; ability: Mindless; ability: Slow (I) |
| Zylar | 8 | humanoid | humanoid | 7 | 6 | 64.7 | 161.8 | 8 | provisional | Cyclopian (race): combat.defence.other 2; Cyclopian (race): combat.defence.status 1; Zylar (heritage): combat.saves.fortitude.other -3; Zylar (heritage): combat.saves.reflex.other -3; Zylar (heritage): combat.saves.will.other 3; ability: Foresight Gaze; ability: Arcane Caster Repertoire; ability: Zylar Defence Note |
