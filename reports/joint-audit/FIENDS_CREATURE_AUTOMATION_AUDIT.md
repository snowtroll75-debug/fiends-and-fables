# Fiends & Fables Prime — creature automation audit

Joint audit, 18 November 2026. Fiends & Fables Prime 0.45.2 → 0.46.0 on TRG Prime core 3.698.4 (Foundry 14.367, Test world).

## Method

1. **Live derivation.** All 294 published creatures were snapshotted into the Test world from the installed 0.45.2 compendium. Core 3.698.4 prepared each one, and the derived sheet was read back. That covers level, size, HP, PP, DB, DR, CR, saves, Death State, initiative, reach, movement, the six abilities, every skill, and immunities, resistances and weaknesses. The results are in `derived-0.45.2-core-3.698.4.json`.
2. **Book comparison.** The 283 stat blocks in *TRG Prime Fiends & Fables 3.0* were parsed and matched to the creatures. The other 11 published creatures are variants with no separate block: Aboleth Magi, Banshee Dirge Singer, Belkar Storm Lord, the six Giant Shamans, Shade Walker and Shade Wing. Each was checked through its base creature.
3. **Every difference was explained or repaired.** Published statistics were never changed to fit a calculation. A difference was repaired only when its cause was a data or automation defect; otherwise it is recorded against a rules decision or a book misprint.
4. **Behaviour.** Attacks, packets, defences, breath, ammunition, templates and dragon advancement went through the shared battery (`CODEX_FIENDS_REGRESSION_REPORT.md`).

## Results

| Measure | Count |
|---|---|
| Creatures | 294 |
| Matched to a printed block | 283 (+11 variants checked through their base) |
| Statistic fields compared | 6,568 |
| Equal to the printed block | 6,492 |
| Creatures matching their block exactly | 231 |
| Creatures whose only differences are explained (rules decision, display or misprint) | 62 |
| Creatures whose only difference was a defect, now fixed | 1 (Archangel) |
| Unexplained differences remaining | **0** |
| Printed immunity words checked | 818; 5 had been missing: Behir (FF-04), Mite Swarm (FF-06), Flying Rug "nonlethal" (≈ core "subdual", equivalent), Ochre Jelly "critical" (core `critImmune`, equivalent) and "precision" (CO-02) |

Differences by cause, counted per creature:

| Cause | Creatures | Owner and status |
|---|---|---|
| Swim/Climb +4 applied to the whole Athletics/Climbing skill | 46 | RD-03 decision |
| Keen/Acute Sense +2 applied at roll time, not in the sheet total | 12 | RD-04 (display only; rolls are correct) |
| Fearful Strength: Intimidate uses Strength | 3 | RD-05 decision |
| Leftover initiative/skill bonuses (Raven Swarm, Synarmi) | 2 | FF-03 fixed |
| Archangel printed-DR calibration stacked on real DR | 1 | FF-02 fixed |
| Book misprint (Viper saves; Raven Swarm DB 85) | 2 | none needed |

Level, HP and the six ability scores match the book for every matched creature.

## Repairs to creature data in 0.46.0

FF-01 (21 Undead), FF-02 (Archangel), FF-03 (Raven Swarm, Synarmi), FF-04 (Behir), FF-05 (Cave Bear), FF-06 (Mite Swarm), FF-07 (crossbows on 4 creatures), FF-13 (24 breaths), FF-16 (21 items with stray template marks) and FF-11 (orphan rows). Raw pack change against GitHub 0.45.2: creatures 11 rows removed (10 orphans plus the Archangel calibration effect), 80 rows changed (3 actors, 52 items, 25 effects). Races: 6 effects changed. Heritages: 6 changed, 1 effect added. The abilities, templates and feats packs are unchanged apart from being rewritten compacted. Every actor, item and effect ID that remains is unchanged, as are art, descriptions and flags not named above.

## Spellcasting, PP and innate magic

Every innate spell declares its printed DC and modifier (0.12.x). Focus innates carry the Focus trait, so blank uses give 1 use and Refocus restores it. True dragon breath spends 0 PP (FF-13 keeps the Fiends data). Two casting classes, Ethereal Caster and Verdant Caster, exist only in Fiends. Core runs them; the Codex cannot value them yet, so their DP rows are shown as unresolved.

## Standalone use

Fiends 0.46.0 needs nothing from the Codex. Each of the two lists the other only under `relationships.recommends`. Battery configuration 2 (Core + Fiends) matched configuration 1 (Core + Codex + Fiends) in every shared mechanic.

## Per-creature inventory

Derived values (HP, DB, DR, saves) are the live 0.45.2 derivation on core 3.698.4. Where a 0.46.0 repair changes a value, the last column names it. For example, Archangel's DR is 28 after FF-02, and Behir derives HP 215, DB 25 and STR 7 after FF-04. "Declared" counts ability items that carry their own core automation declarations; abilities that inherit core's declarations by name are counted in the ability audit.

| Creature | Lvl | Type | Race | Heritage | Class | HP | DB | DR | Fort/Ref/Will | Weapons | Abilities | Spells | Breath | Book comparison | 0.46.0 repairs |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Aboleth | 8 | Aberration | Aboleth | — | Aberration (Creature Class) | 191 | 22 | 2 | 16/11/22 | 1 | 4 (3 declared, 0 manual) | 6 |  | matches book |  |
| Aboleth Magi | 8 | Aberration | Aboleth | — | Aberration (Creature Class) | 191 | 22 | 2 | 16/11/22 | 1 | 5 (3 declared, 0 manual) | 6 |  | matches book |  |
| Air | 1 | Elemental | Aetherling | Air | Elemental (Creature Class) | 36 | 15 | 0 | 7/10/3 | 1 | 3 (2 declared, 0 manual) | 2 |  | matches book |  |
| Air Primal - Briez | 3 | Elemental | Primal | Air Primals | Elemental (Creature Class) | 71 | 19 | 1 | 10/15/6 | 2 | 6 (4 declared, 0 manual) | 1 |  | matches book |  |
| Air Primal - Gayl | 7 | Elemental | Primal | Air Primals | Elemental (Creature Class) | 136 | 25 | 2 | 15/18/11 | 2 | 7 (5 declared, 0 manual) | 3 |  | matches book |  |
| Air Primal - Stourm | 11 | Elemental | Primal | Air Primals | Elemental (Creature Class) | 229 | 32 | 2 | 20/22/18 | 2 | 7 (5 declared, 0 manual) | 4 |  | matches book |  |
| Air Primal - Tempast | 15 | Elemental | Primal | Air Primals | Elemental (Creature Class) | 330 | 39 | 3 | 25/26/22 | 2 | 8 (6 declared, 0 manual) | 5 |  | matches book |  |
| Akrexe | 6 | Eternal | Demon | Akrexe | Eternal (Creature Class) | 139 | 23 | 6 | 17/13/15 | 2 | 8 (7 declared, 0 manual) | 2 |  | matches book |  |
| Angrenilir | 8 | Eternal | Eldravi | Angrenilir | Eternal (Creature Class) | 167 | 24 | 8 | 19/13/19 | 2 | 5 (4 declared, 0 manual) | 11 |  | matches book |  |
| Animus Armour | 2 | Construct | Animated Object | Animus Armour | Construct (Creature Class) | 77 | 10 | 6 | 5/-2/1 | 2 | 2 (2 declared, 0 manual) | 0 |  | matches book |  |
| Animus Colossus | 12 | Construct | Animated Object | Animus Colossus | Construct (Creature Class) | 481 | 28 | 18 | 20/9/11 | 1 | 3 (2 declared, 0 manual) | 0 |  | matches book |  |
| Animus Statue | 3 | Construct | Animated Object | Animus Statue | Construct (Creature Class) | 96 | 12 | 6 | 7/0/2 | 1 | 3 (2 declared, 0 manual) | 0 |  | matches book |  |
| Animus Statue, Giant | 6 | Construct | Animated Object | Animus Statue, Giant | Construct (Creature Class) | 167 | 18 | 12 | 10/3/5 | 1 | 3 (2 declared, 0 manual) | 0 |  | matches book |  |
| Ankheg | 3 | Beast | Ankheg | — | Beast (Creature Class) | 114 | 14 | 4 | 13/8/3 | 1 | 6 (4 declared, 1 manual) | 0 |  | matches book |  |
| Ankheg, Queen | 9 | Beast | Ankheg | Ankheg, Queen | Beast (Creature Class) | 240 | 25 | 8 | 20/17/12 | 1 | 6 (4 declared, 0 manual) | 0 |  | matches book |  |
| Ape | 3 | Animal | Ape | — | Animal (Creature Class) | 74 | 16 | 1 | 13/12/3 | 2 | 4 (2 declared, 0 manual) | 0 |  | explained (rules decision / display / misprint): intimidate 8→12 |  |
| Ape Lord | 8 | Animal | Ape | Ape Lord | Animal (Creature Class) | 217 | 25 | 2 | 20/17/8 | 2 | 4 (2 declared, 0 manual) | 0 |  | explained (rules decision / display / misprint): intimidate 8→15 |  |
| Arcane Lich | 15 | Undead | Human | — | Caster (Creature Class) | 180 | 31 | 0 | 17/20/23 | 1 | 10 (3 declared, 0 manual) | 1 |  | matches book | FF-01 |
| Archangel | 20 | Eternal | Angel | Archangel | Eternal (Creature Class) | 375 | 49 | 36 | 34/31/36 | 3 | 9 (6 declared, 0 manual) | 11 |  | fixed in 0.46.0: DR 28→36 | FF-02 |
| Aroch | 7 | Eternal | Demon | Aroch | Eternal (Creature Class) | 143 | 25 | 7 | 18/15/19 | 3 | 8 (7 declared, 0 manual) | 3 |  | matches book |  |
| Athach | 12 | Humanoid | Athach | — | Humanoid (Creature Class) | 309 | 33 | 9 | 25/17/15 | 4 | 4 (3 declared, 1 manual) | 0 |  | matches book |  |
| Avoral | 9 | Eternal | Agothian | Avoral | Eternal (Creature Class) | 189 | 30 | 9 | 21/19/19 | 2 | 8 (7 declared, 0 manual) | 8 |  | explained (rules decision / display / misprint): perception 15→13 |  |
| Azur | 2 | Elemental | Azur | — | Elemental (Creature Class) | 48 | 14 | 6 | 11/8/8 | 2 | 4 (3 declared, 0 manual) | 2 |  | matches book |  |
| Azure Muck | 8 | Ooze | Muck | Azure Muck | Ooze (Creature Class) | 179 | 19 | 0 | 10/5/8 | 1 | 4 (2 declared, 0 manual) | 0 |  | explained (rules decision / display / misprint): athletics 5→9 |  |
| Balor | 20 | Eternal | Demon | Balor | Eternal (Creature Class) | 465 | 51 | 20 | 36/31/33 | 3 | 15 (12 declared, 0 manual) | 5 |  | matches book |  |
| Banshee | 17 | Undead | Banshee | — | Undead (Creature Class) | 215 | 43 | 0 | 24/31/29 | 1 | 5 (3 declared, 0 manual) | 1 |  | matches book | FF-01 |
| Banshee Dirge Singer | 17 | Undead | Banshee | Banshee Dirge Singer | Ethereal Caster (Creature Class) | 181 | 47 | 0 | 18/28/29 | 1 | 6 (3 declared, 0 manual) | 1 |  | matches book | FF-01 |
| Barghest | 4 | Eternal | Barghest | — | Eternal (Creature Class) | 105 | 18 | 4 | 16/10/15 | 2 | 8 (5 declared, 0 manual) | 5 |  | matches book |  |
| Basilisk | 6 | Beast | Basilisk | — | Beast (Creature Class) | 135 | 19 | 6 | 20/11/7 | 1 | 5 (3 declared, 1 manual) | 0 |  | matches book |  |
| Bat Swarm | 1 | Animal | Bat | Bat Swarm | Animal (Creature Class) | 76 | 15 | 0 | 9/14/3 | 0 | 3 (3 declared, 0 manual) | 0 |  | matches book |  |
| Behir | 8 | Beast | Behir | — | Beast (Creature Class) | 215 | 25 | 8 | 20/15/10 | 2 | 8 (5 declared, 1 manual) | 0 |  | explained (rules decision / display / misprint): climbing 13→17 | FF-04 |
| Belkar | 6 | Elemental | Belkar | — | Elemental (Creature Class) | 143 | 25 | 0 | 14/18/14 | 2 | 6 (4 declared, 0 manual) | 4 |  | matches book |  |
| Belkar Storm Lord | 10 | Elemental | Belkar | Belkar Storm Lord | Elemental (Creature Class) | 215 | 32 | 0 | 19/22/18 | 2 | 9 (3 declared, 0 manual) | 4 |  | matches book |  |
| Blightborn | 13 | Fey | Hag | Blightborn | Fey (Creature Class) | 208 | 26 | 4 | 20/21/21 | 3 | 5 (5 declared, 0 manual) | 0 |  | matches book |  |
| Blink Dog | 2 | Beast | Blink Dog | — | Beast (Creature Class) | 69 | 17 | 2 | 11/11/7 | 1 | 3 (2 declared, 0 manual) | 3 |  | matches book |  |
| Blink Dog, Alpha | 5 | Beast | Blink Dog | Blink Dog, Alpha | Beast (Creature Class) | 85 | 22 | 2 | 14/14/10 | 1 | 3 (2 declared, 0 manual) | 3 |  | matches book |  |
| Boar | 2 | Animal | Boar | — | Animal (Creature Class) | 83 | 14 | 2 | 13/10/3 | 1 | 4 (4 declared, 0 manual) | 0 |  | matches book |  |
| Bugbear | 2 | Humanoid | Bugbear | — | Tough (Creature Class) | 83 | 15 | 2 | 11/6/2 | 3 | 4 (3 declared, 0 manual) | 0 |  | matches book |  |
| Bugbear Soldier | 4 | Humanoid | Bugbear | Bugbear Soldier | Tough (Creature Class) | 111 | 18 | 3 | 13/8/6 | 3 | 4 (3 declared, 0 manual) | 0 |  | matches book |  |
| Bulette | 8 | Beast | Bulette | — | Beast (Creature Class) | 188 | 25 | 6 | 24/15/11 | 2 | 6 (6 declared, 0 manual) | 0 |  | matches book |  |
| Camel | 3 | Animal | Mount | Camel | Animal (Creature Class) | 120 | 14 | 0 | 15/10/5 | 1 | 3 (3 declared, 0 manual) | 0 |  | matches book |  |
| Cave Bear | 6 | Animal | Bear | Cave Bear | Animal (Creature Class) | 165 | 21 | 2 | 18/14/8 | 2 | 3 (2 declared, 0 manual) | 0 |  | matches book | FF-05 |
| Cave Dragon, Scaleborn | 4 | Wyrm | Cave Dragon | — | Wyrm (Creature Class) | 97 | 19 | 6 | 12/12/10 | 2 | 7 (4 declared, 0 manual) | 0 | yes | matches book | FF-13 |
| Cave Dragon, Sovereign | 16 | Wyrm | Cave Dragon | — | Wyrm (Creature Class) | 407 | 38 | 18 | 27/22/25 | 4 | 12 (8 declared, 0 manual) | 0 | yes | matches book | FF-13 |
| Cave Dragon, Talon | 10 | Wyrm | Cave Dragon | — | Wyrm (Creature Class) | 245 | 29 | 12 | 20/17/18 | 3 | 9 (6 declared, 0 manual) | 0 | yes | matches book | FF-13 |
| Cave Troll | 11 | Humanoid | Troll | Cave Troll | Humanoid (Creature Class) | 241 | 31 | 6 | 22/16/13 | 2 | 8 (7 declared, 0 manual) | 0 |  | matches book |  |
| Centaur | 3 | Beast | Centaur | — | Beast (Creature Class) | 101 | 16 | 4 | 11/9/4 | 4 | 4 (2 declared, 0 manual) | 0 |  | matches book |  |
| Cheetah | 3 | Animal | Cat | Cheetah | Animal (Creature Class) | 81 | 18 | 0 | 12/14/3 | 2 | 2 (2 declared, 0 manual) | 0 |  | matches book |  |
| Cherubim | 2 | Eternal | Angel | Cherubim | Eternal (Creature Class) | 49 | 17 | 2 | 11/10/11 | 1 | 6 (4 declared, 1 manual) | 6 |  | matches book |  |
| Chuul | 8 | Aberration | Chuul | — | Aberration (Creature Class) | 137 | 26 | 8 | 17/13/13 | 2 | 5 (3 declared, 0 manual) | 0 |  | explained (rules decision / display / misprint): athletics 13→17 |  |
| Clay Golem | 10 | Construct | Golem | Clay Golem | Construct (Creature Class) | 255 | 26 | 8 | 15/8/9 | 1 | 3 (3 declared, 0 manual) | 0 |  | matches book |  |
| Cloaker | 5 | Aberration | Cloaker | — | Aberration (Creature Class) | 125 | 19 | 2 | 11/10/15 | 2 | 6 (4 declared, 0 manual) | 0 |  | matches book |  |
| Cloud Giant | 16 | Humanoid | Giant | Cloud Giant | Tough (Creature Class) | 351 | 39 | 6 | 28/22/20 | 3 | 4 (4 declared, 0 manual) | 3 |  | matches book |  |
| Cloud Giant Shaman | 16 | Humanoid | Giant | Cloud Giant | Verdant Caster (Creature Class) | 287 | 31 | 6 | 23/19/26 | 3 | 5 (4 declared, 0 manual) | 3 |  | matches book |  |
| Cockatrice | 3 | Beast | Cockatrice | — | Beast (Creature Class) | 68 | 20 | 2 | 11/13/4 | 1 | 5 (2 declared, 1 manual) | 0 |  | matches book |  |
| Cold Dragon, Scaleborn | 4 | Wyrm | Cold Dragon | — | Wyrm (Creature Class) | 91 | 19 | 4 | 11/12/14 | 2 | 8 (5 declared, 0 manual) | 0 | yes | explained (rules decision / display / misprint): athletics 7→11 | FF-13 |
| Cold Dragon, Sovereign | 16 | Wyrm | Cold Dragon | — | Wyrm (Creature Class) | 367 | 35 | 16 | 26/19/29 | 4 | 14 (11 declared, 0 manual) | 0 | yes | explained (rules decision / display / misprint): athletics 26→30 | FF-13 |
| Cold Dragon, Talon | 10 | Wyrm | Cold Dragon | — | Wyrm (Creature Class) | 225 | 27 | 10 | 19/15/22 | 3 | 11 (8 declared, 0 manual) | 0 | yes | explained (rules decision / display / misprint): athletics 18→22 | FF-13 |
| Constrictor | 6 | Animal | Snake | Constrictor | Animal (Creature Class) | 159 | 23 | 2 | 17/16/7 | 1 | 4 (3 declared, 0 manual) | 0 |  | explained (rules decision / display / misprint): athletics 15→19; climbing 8→12 |  |
| Crimson Muck | 12 | Ooze | Muck | Crimson Muck | Ooze (Creature Class) | 279 | 25 | 0 | 18/8/12 | 2 | 4 (2 declared, 0 manual) | 0 |  | matches book |  |
| Crocodile | 4 | Animal | Crocodile | — | Animal (Creature Class) | 127 | 17 | 3 | 15/12/4 | 2 | 2 (1 declared, 0 manual) | 0 |  | explained (rules decision / display / misprint): athletics 9→13 |  |
| Cursarion | 5 | Eternal | Mystaron | Cursarion | Eternal (Creature Class) | 135 | 22 | 5 | 16/13/14 | 1 | 5 (2 declared, 0 manual) | 11 |  | matches book |  |
| Cyclops | 5 | Humanoid | Cyclopian | Cyclops | Humanoid (Creature Class) | 140 | 18 | 4 | 13/7/7 | 3 | 5 (3 declared, 0 manual) | 0 |  | matches book | FF-07 |
| Dancing Broom | 1 | Construct | Animated Object | Dancing Broom | Construct (Creature Class) | 47 | 12 | 3 | 0/1/1 | 1 | 3 (2 declared, 0 manual) | 0 |  | matches book |  |
| Dao | 7 | Elemental | Genie | Dao | Elemental (Creature Class) | 180 | 23 | 12 | 17/14/14 | 2 | 3 (3 declared, 0 manual) | 6 |  | matches book |  |
| Djinn | 8 | Elemental | Genie | Djinn | Elemental (Creature Class) | 161 | 28 | 2 | 15/20/12 | 3 | 4 (4 declared, 0 manual) | 10 |  | matches book |  |
| Doctus | 2 | Eternal | Mystaron | Doctus | Eternal (Creature Class) | 57 | 17 | 2 | 10/10/13 | 1 | 3 (1 declared, 0 manual) | 12 |  | matches book |  |
| Dracoral | 20 | Eternal | Agothian | Dracoral | Eternal (Creature Class) | 425 | 47 | 20 | 35/26/37 | 2 | 10 (7 declared, 0 manual) | 15 |  | matches book |  |
| Draeglir Aelin | 6 | Eternal | Draeglir | Aelin | Eternal (Creature Class) | 129 | 25 | 6 | 17/17/15 | 3 | 9 (7 declared, 0 manual) | 1 |  | explained (rules decision / display / misprint): perception 12→10 |  |
| Draeglir Halya | 20 | Eternal | Draeglir | Halya | Eternal (Creature Class) | 435 | 50 | 20 | 35/32/35 | 2 | 11 (9 declared, 0 manual) | 5 |  | explained (rules decision / display / misprint): perception 31→29 |  |
| Draeglir Tyel | 9 | Eternal | Draeglir | Tyel | Eternal (Creature Class) | 171 | 30 | 9 | 20/21/20 | 2 | 10 (7 declared, 0 manual) | 3 |  | explained (rules decision / display / misprint): perception 15→13 |  |
| Draeglir Vyair | 14 | Eternal | Draeglir | Vyair | Eternal (Creature Class) | 289 | 37 | 14 | 27/22/25 | 2 | 9 (6 declared, 0 manual) | 4 |  | explained (rules decision / display / misprint): perception 22→20 |  |
| Dread Shadow | 8 | Undead | Shadow | Dread Shadow | Undead (Creature Class) | 117 | 26 | 0 | 14/15/16 | 1 | 7 (5 declared, 0 manual) | 0 |  | explained (rules decision / display / misprint): perception 16→14 | FF-01 |
| Dretch | 2 | Eternal | Demon | Dretch | Eternal (Creature Class) | 71 | 13 | 2 | 12/6/9 | 2 | 3 (2 declared, 0 manual) | 2 |  | matches book |  |
| Druhari | 6 | Beast | Druharr | Druhari | Beast (Creature Class) | 123 | 24 | 2 | 17/18/7 | 2 | 4 (3 declared, 0 manual) | 0 |  | explained (rules decision / display / misprint): climbing 11→15 |  |
| Druharr | 3 | Beast | Druharr | Druharr | Beast (Creature Class) | 38 | 19 | 1 | 12/16/4 | 1 | 3 (3 declared, 0 manual) | 0 |  | explained (rules decision / display / misprint): climbing 9→13 |  |
| Dryad | 4 | Fey | Dryad | — | Fey (Creature Class) | 73 | 18 | 2 | 7/14/13 | 1 | 1 (1 declared, 0 manual) | 13 |  | matches book |  |
| Dusky Muck | 4 | Ooze | Muck | Dusky Muck | Ooze (Creature Class) | 111 | 15 | 0 | 7/3/4 | 2 | 3 (1 declared, 0 manual) | 0 |  | matches book |  |
| Eagle | 1 | Animal | Eagle | — | Animal (Creature Class) | 47 | 15 | 0 | 10/12/2 | 2 | 3 (3 declared, 0 manual) | 0 |  | matches book |  |
| Earth | 1 | Elemental | Aetherling | Earth | Elemental (Creature Class) | 57 | 11 | 2 | 8/6/3 | 1 | 4 (3 declared, 0 manual) | 2 |  | matches book |  |
| Earth Drake | 8 | Wyrm | Drake | Earth Drake | Wyrm (Creature Class) | 211 | 26 | 10 | 18/16/16 | 2 | 5 (4 declared, 0 manual) | 3 |  | matches book |  |
| Earth Primal - Aerph | 15 | Elemental | Primal | Earth Primals | Elemental (Creature Class) | 355 | 34 | 12 | 29/19/19 | 2 | 6 (2 declared, 1 manual) | 5 |  | matches book |  |
| Earth Primal - Maoton | 11 | Elemental | Primal | Earth Primals | Elemental (Creature Class) | 240 | 28 | 8 | 24/16/15 | 2 | 5 (2 declared, 1 manual) | 4 |  | matches book |  |
| Earth Primal - Pebbal | 3 | Elemental | Primal | Earth Primals | Elemental (Creature Class) | 87 | 14 | 4 | 14/8/6 | 1 | 5 (2 declared, 1 manual) | 1 |  | matches book |  |
| Earth Primal - Stown | 7 | Elemental | Primal | Earth Primals | Elemental (Creature Class) | 153 | 21 | 8 | 18/12/11 | 1 | 5 (2 declared, 1 manual) | 3 |  | matches book |  |
| Eclipse | 15 | Fey | Hag | Eclipse | Fey (Creature Class) | 190 | 30 | 6 | 22/24/23 | 2 | 6 (6 declared, 0 manual) | 7 |  | matches book |  |
| Efreet | 9 | Elemental | Genie | Efreet | Elemental (Creature Class) | 191 | 27 | 6 | 18/17/15 | 2 | 5 (3 declared, 0 manual) | 7 |  | matches book |  |
| Elephant | 8 | Animal | Elephant | — | Animal (Creature Class) | 217 | 23 | 4 | 20/15/11 | 3 | 4 (2 declared, 0 manual) | 0 |  | matches book |  |
| Ettin | 6 | Humanoid | Ettin | — | Humanoid (Creature Class) | 159 | 19 | 2 | 15/7/9 | 3 | 3 (2 declared, 0 manual) | 0 |  | matches book |  |
| Fancalia | 10 | Eternal | Mystaron | Fancalia | Eternal (Creature Class) | 165 | 31 | 10 | 19/18/21 | 1 | 5 (2 declared, 0 manual) | 17 |  | matches book |  |
| Feloral | 2 | Eternal | Agothian | Feloral | Eternal (Creature Class) | 19 | 17 | 2 | 11/10/12 | 2 | 4 (4 declared, 0 manual) | 6 |  | matches book |  |
| Fire | 1 | Elemental | Aetherling | Fire | Elemental (Creature Class) | 56 | 15 | 0 | 7/10/3 | 1 | 4 (3 declared, 0 manual) | 2 |  | matches book |  |
| Fire Dragon, Scaleborn | 6 | Wyrm | Fire Dragon | — | Wyrm (Creature Class) | 119 | 23 | 6 | 15/14/14 | 2 | 8 (5 declared, 0 manual) | 0 | yes | matches book | FF-13 |
| Fire Dragon, Sovereign | 18 | Wyrm | Fire Dragon | — | Wyrm (Creature Class) | 356 | 41 | 18 | 30/24/29 | 4 | 14 (10 declared, 0 manual) | 0 | yes | matches book | FF-13 |
| Fire Dragon, Talon | 12 | Wyrm | Fire Dragon | — | Wyrm (Creature Class) | 257 | 30 | 12 | 23/17/22 | 3 | 11 (8 declared, 0 manual) | 0 | yes | matches book | FF-13 |
| Fire Giant | 14 | Humanoid | Giant | Fire Giant | Tough (Creature Class) | 303 | 33 | 18 | 26/16/17 | 3 | 1 (1 declared, 0 manual) | 3 |  | matches book |  |
| Fire Giant Shaman | 14 | Humanoid | Giant | Fire Giant | Verdant Caster (Creature Class) | 247 | 26 | 6 | 20/13/23 | 3 | 2 (1 declared, 0 manual) | 3 |  | matches book |  |
| Fire Primal - Emba | 3 | Elemental | Primal | Fire Primals | Elemental (Creature Class) | 81 | 18 | 1 | 12/12/8 | 2 | 5 (4 declared, 0 manual) | 1 |  | matches book |  |
| Fire Primal - Flaim | 7 | Elemental | Primal | Fire Primals | Elemental (Creature Class) | 101 | 25 | 2 | 17/18/12 | 2 | 4 (3 declared, 0 manual) | 2 |  | matches book |  |
| Fire Primal - Intheno | 11 | Elemental | Primal | Fire Primals | Elemental (Creature Class) | 239 | 31 | 2 | 22/21/16 | 2 | 5 (4 declared, 0 manual) | 3 |  | matches book |  |
| Fire Primal - Pyroclas | 15 | Elemental | Primal | Fire Primals | Elemental (Creature Class) | 325 | 37 | 3 | 26/24/22 | 2 | 5 (4 declared, 0 manual) | 4 |  | matches book |  |
| Flame Beetle | 1 | Animal | Beetle | Flame Beetle | Animal (Creature Class) | 57 | 14 | 3 | 10/11/1 | 2 | 3 (3 declared, 0 manual) | 0 |  | matches book |  |
| Flame Drake | 9 | Wyrm | Drake | Flame Drake | Wyrm (Creature Class) | 209 | 27 | 6 | 18/17/17 | 2 | 9 (7 declared, 0 manual) | 3 |  | matches book |  |
| Flesh Golem | 8 | Construct | Golem | Flesh Golem | Construct (Creature Class) | 195 | 22 | 4 | 10/6/7 | 1 | 3 (3 declared, 0 manual) | 0 |  | matches book |  |
| Flying Rug | 7 | Construct | Animated Object | Flying Rug | Construct (Creature Class) | 146 | 25 | 6 | 7/12/6 | 1 | 4 (2 declared, 0 manual) | 0 |  | matches book |  |
| Forest Dragon, Scaleborn | 5 | Wyrm | Forest Dragon | — | Wyrm (Creature Class) | 110 | 21 | 4 | 13/13/12 | 2 | 7 (5 declared, 0 manual) | 0 | yes | matches book | FF-13 |
| Forest Dragon, Sovereign | 17 | Wyrm | Forest Dragon | — | Wyrm (Creature Class) | 401 | 36 | 16 | 28/20/27 | 4 | 11 (9 declared, 0 manual) | 0 | yes | matches book | FF-13 |
| Forest Dragon, Talon | 11 | Wyrm | Forest Dragon | — | Wyrm (Creature Class) | 252 | 28 | 10 | 21/18/20 | 3 | 9 (7 declared, 0 manual) | 0 | yes | matches book | FF-13 |
| Forest Troll | 7 | Humanoid | Troll | Forest Troll | Humanoid (Creature Class) | 149 | 22 | 4 | 13/12/12 | 2 | 5 (4 declared, 0 manual) | 4 |  | matches book |  |
| Frost Drake | 8 | Wyrm | Drake | Frost Drake | Wyrm (Creature Class) | 203 | 25 | 6 | 17/15/16 | 2 | 7 (6 declared, 0 manual) | 3 |  | matches book |  |
| Frost Giant | 12 | Humanoid | Giant | Frost Giant | Tough (Creature Class) | 267 | 30 | 21 | 23/14/15 | 3 | 2 (2 declared, 0 manual) | 2 |  | matches book |  |
| Frost Giant Shaman | 12 | Humanoid | Giant | Frost Giant | Verdant Caster (Creature Class) | 219 | 24 | 21 | 17/11/21 | 3 | 3 (2 declared, 0 manual) | 2 |  | matches book |  |
| Frostsnarl | 11 | Fey | Hag | Frostsnarl | Fey (Creature Class) | 177 | 25 | 6 | 19/20/19 | 1 | 5 (5 declared, 0 manual) | 4 |  | matches book |  |
| Gargoyle | 5 | Elemental | Gargoyle | — | Elemental (Creature Class) | 120 | 21 | 4 | 13/13/9 | 2 | 3 (2 declared, 0 manual) | 0 |  | matches book |  |
| Ghast | 4 | Undead | Ghoul | Ghast | Undead (Creature Class) | 85 | 20 | 1 | 11/13/11 | 2 | 9 (7 declared, 0 manual) | 0 |  | matches book | FF-01 |
| Ghoul | 2 | Undead | Ghoul | — | Undead (Creature Class) | 65 | 16 | 1 | 9/8/9 | 2 | 8 (6 declared, 0 manual) | 0 |  | matches book | FF-01 |
| Giant Bat | 2 | Animal | Bat | Giant Bat | Animal (Creature Class) | 87 | 16 | 2 | 10/12/3 | 2 | 2 (2 declared, 0 manual) | 0 |  | matches book |  |
| Giant Chameleon | 3 | Animal | Lizard | Giant Chameleon | Animal (Creature Class) | 98 | 17 | 2 | 11/13/5 | 2 | 3 (3 declared, 0 manual) | 0 |  | explained (rules decision / display / misprint): climbing 7→11 |  |
| Giant Eagle | 8 | Animal | Eagle | Giant Eagle | Animal (Creature Class) | 171 | 26 | 2 | 17/18/12 | 2 | 4 (4 declared, 0 manual) | 0 |  | explained (rules decision / display / misprint): perception 13→11 |  |
| Giant Frilled Lizard | 5 | Animal | Lizard | Giant Frilled Lizard | Animal (Creature Class) | 135 | 20 | 2 | 18/14/8 | 2 | 3 (3 declared, 0 manual) | 0 |  | explained (rules decision / display / misprint): climbing 8→12 |  |
| Giant Gecko | 1 | Animal | Lizard | Giant Gecko | Animal (Creature Class) | 56 | 14 | 2 | 9/11/2 | 1 | 2 (2 declared, 0 manual) | 0 |  | explained (rules decision / display / misprint): climbing 5→9 |  |
| Giant Rat | 1 | Animal | Rat | Giant Rat | Animal (Creature Class) | 48 | 14 | 0 | 11/11/2 | 1 | 3 (3 declared, 0 manual) | 0 |  | matches book |  |
| Giant Spider | 1 | Animal | Spider | Giant Spider | Animal (Creature Class) | 56 | 15 | 0 | 9/12/1 | 1 | 5 (4 declared, 0 manual) | 0 |  | explained (rules decision / display / misprint): climbing 6→10 |  |
| Giant Stag Beetle | 4 | Animal | Beetle | Giant Stag Beetle | Animal (Creature Class) | 135 | 17 | 4 | 18/12/5 | 2 | 3 (2 declared, 0 manual) | 0 |  | matches book |  |
| Glimmerwick | 2 | Fey | Glimmerwick | Glimmerwick | Fey (Creature Class) | 27 | 24 | 0 | 2/13/10 | 2 | 5 (5 declared, 0 manual) | 4 |  | matches book |  |
| Goblin Elite | 4 | Humanoid | Goblin | Goblin Elite | Tough (Creature Class) | 83 | 21 | 1 | 11/10/4 | 3 | 2 (2 declared, 0 manual) | 0 |  | matches book |  |
| Goblin Warrior | 1 | Humanoid | Goblin | — | Tough (Creature Class) | 30 | 15 | 1 | 8/6/1 | 3 | 2 (2 declared, 0 manual) | 0 |  | matches book |  |
| Golden Muck | 10 | Ooze | Muck | Golden Muck | Ooze (Creature Class) | 225 | 24 | 0 | 13/9/10 | 1 | 6 (2 declared, 0 manual) | 0 |  | matches book |  |
| Gondathel | 12 | Eternal | Eldravi | Gondathel | Eternal (Creature Class) | 279 | 30 | 12 | 27/16/24 | 1 | 5 (4 declared, 0 manual) | 8 |  | explained (rules decision / display / misprint): climbing 14→18 |  |
| Gorgon | 10 | Beast | Gorgon | — | Beast (Creature Class) | 235 | 30 | 8 | 25/18/16 | 2 | 6 (5 declared, 0 manual) | 3 |  | matches book |  |
| Gravhek | 8 | Eternal | Barghest | Gravhek | Eternal (Creature Class) | 203 | 25 | 8 | 21/14/21 | 2 | 8 (6 declared, 0 manual) | 6 |  | matches book |  |
| Grey Spider | 7 | Beast | Spider | Grey Spider | Beast (Creature Class) | 149 | 25 | 0 | 16/16/10 | 2 | 5 (4 declared, 0 manual) | 0 |  | matches book |  |
| Grizzly Bear | 3 | Animal | Bear | Grizzly Bear | Animal (Creature Class) | 110 | 15 | 1 | 15/11/5 | 2 | 3 (2 declared, 0 manual) | 0 |  | matches book |  |
| Gryphon | 6 | Beast | Gryphon | — | Beast (Creature Class) | 143 | 23 | 1 | 16/14/8 | 3 | 6 (6 declared, 0 manual) | 0 |  | explained (rules decision / display / misprint): perception 8→6 |  |
| Guard Dog | 1 | Animal | Dog | Guard Dog | Animal (Creature Class) | 47 | 13 | 1 | 10/10/1 | 1 | 4 (2 declared, 0 manual) | 0 |  | matches book |  |
| Guardian | 10 | Eternal | Angel | Guardian | Eternal (Creature Class) | 195 | 31 | 10 | 21/18/21 | 1 | 8 (5 declared, 0 manual) | 8 |  | matches book |  |
| Guardian Dragon, Hatchling | 8 | Wyrm | Guardian Dragon | — | Wyrm (Creature Class) | 157 | 25 | 10 | 15/15/16 | 2 | 9 (6 declared, 0 manual) | 0 | yes | matches book | FF-13 |
| Guardian Dragon, Sovereign | 20 | Wyrm | Guardian Dragon | — | Wyrm (Creature Class) | 440 | 41 | 22 | 32/22/33 | 4 | 15 (12 declared, 0 manual) | 0 | yes | matches book | FF-13 |
| Guardian Dragon, Talon | 14 | Wyrm | Guardian Dragon | — | Wyrm (Creature Class) | 319 | 32 | 16 | 25/18/26 | 3 | 12 (9 declared, 0 manual) | 0 | yes | matches book | FF-13 |
| Hantya | 13 | Eternal | Demon | Hantya | Eternal (Creature Class) | 260 | 33 | 13 | 25/19/23 | 2 | 12 (9 declared, 0 manual) | 7 |  | matches book |  |
| Hill Giant | 8 | Humanoid | Giant | Hill Giant | Tough (Creature Class) | 177 | 23 | 6 | 17/10/11 | 3 | 1 (1 declared, 0 manual) | 0 |  | matches book |  |
| Hill Giant Shaman | 8 | Humanoid | Giant | Hill Giant | Verdant Caster (Creature Class) | 145 | 19 | 6 | 11/7/17 | 3 | 2 (1 declared, 0 manual) | 0 |  | matches book |  |
| Hill Troll | 8 | Humanoid | Troll | Hill Troll | Humanoid (Creature Class) | 185 | 24 | 4 | 18/11/9 | 3 | 5 (4 declared, 0 manual) | 0 |  | matches book |  |
| Huanling | 8 | Fey | Huanling | — | Fey (Creature Class) | 109 | 24 | 0 | 10/19/18 | 3 | 5 (5 declared, 0 manual) | 3 |  | explained (rules decision / display / misprint): perception 16→14 |  |
| Human Ghost | 5 | Undead | Human Ghost | — | Undead (Creature Class) | 110 | 21 | 0 | 15/10/9 | 1 | 7 (3 declared, 0 manual) | 1 |  | matches book | FF-01 |
| Ice | 1 | Elemental | Aetherling | Ice | Elemental (Creature Class) | 45 | 15 | 1 | 6/10/4 | 1 | 3 (2 declared, 0 manual) | 2 |  | matches book |  |
| Inferno Spider | 10 | Beast | Spider | Inferno Spider | Beast (Creature Class) | 165 | 31 | 4 | 21/19/12 | 1 | 7 (6 declared, 0 manual) | 0 |  | explained (rules decision / display / misprint): climbing 18→22 |  |
| Iron Golem | 14 | Construct | Golem | Iron Golem | Construct (Creature Class) | 313 | 32 | 12 | 18/12/13 | 1 | 5 (5 declared, 0 manual) | 0 |  | matches book |  |
| Jann | 6 | Elemental | Genie | Jann | Elemental (Creature Class) | 117 | 22 | 0 | 13/13/11 | 2 | 2 (2 declared, 0 manual) | 6 |  | matches book |  |
| Khavar | 15 | Eternal | Demon | Khavar | Eternal (Creature Class) | 365 | 37 | 15 | 30/21/29 | 2 | 11 (9 declared, 0 manual) | 6 |  | matches book |  |
| Kobold Elite | 4 | Humanoid | Kobold | Kobold Elite | Humanoid (Creature Class) | 85 | 20 | 1 | 8/13/4 | 3 | 2 (1 declared, 0 manual) | 0 |  | matches book |  |
| Kobold Sneak | 1 | Humanoid | Kobold | Kobold Sneak | Humanoid (Creature Class) | 45 | 14 | 1 | 5/9/1 | 3 | 2 (1 declared, 0 manual) | 0 |  | matches book |  |
| Kothorn | 5 | Animal | Boar | Kothorn | Animal (Creature Class) | 105 | 19 | 2 | 18/13/8 | 1 | 4 (4 declared, 0 manual) | 0 |  | matches book |  |
| Kraken | 20 | Beast | Kraken | — | Beast (Creature Class) | 675 | 48 | 16 | 36/29/24 | 2 | 8 (7 declared, 0 manual) | 6 |  | explained (rules decision / display / misprint): athletics 36→40 |  |
| Laeleth | 14 | Animal | Ape | Laeleth | Animal (Creature Class) | 369 | 34 | 3 | 30/22/17 | 2 | 3 (2 declared, 0 manual) | 0 |  | explained (rules decision / display / misprint): intimidate 25→35 |  |
| Leopard | 4 | Animal | Cat | Leopard | Animal (Creature Class) | 93 | 20 | 1 | 13/15/4 | 2 | 3 (2 declared, 0 manual) | 0 |  | matches book |  |
| Light Dragon, Scaleborn | 5 | Wyrm | Light Dragon | — | Wyrm (Creature Class) | 100 | 24 | 2 | 11/18/14 | 2 | 7 (4 declared, 0 manual) | 0 | yes | matches book | FF-13 |
| Light Dragon, Sovereign | 17 | Wyrm | Light Dragon | — | Wyrm (Creature Class) | 367 | 39 | 14 | 26/25/29 | 4 | 12 (9 declared, 0 manual) | 0 | yes | matches book | FF-13 |
| Light Dragon, Talon | 11 | Wyrm | Light Dragon | — | Wyrm (Creature Class) | 230 | 31 | 8 | 19/21/22 | 3 | 10 (7 declared, 0 manual) | 0 | yes | matches book | FF-13 |
| Lion | 5 | Animal | Cat | Lion | Animal (Creature Class) | 153 | 20 | 2 | 15/14/8 | 2 | 5 (2 declared, 0 manual) | 0 |  | matches book |  |
| Luporal | 6 | Eternal | Agothian | Luporal | Eternal (Creature Class) | 129 | 23 | 6 | 17/13/19 | 2 | 8 (7 declared, 0 manual) | 8 |  | matches book |  |
| Lustrian Brave | 2 | Humanoid | Lustrian | Lustrian Brave | Humanoid (Creature Class) | 79 | 16 | 2 | 9/6/3 | 6 | 0 (0 declared, 0 manual) | 0 |  | explained (rules decision / display / misprint): athletics 6→10 |  |
| Lustrian Khrissk | 6 | Humanoid | Lustrian | Lustrian Khrissk | Humanoid (Creature Class) | 133 | 22 | 4 | 16/13/9 | 5 | 1 (0 declared, 1 manual) | 0 |  | explained (rules decision / display / misprint): athletics 9→13 |  |
| Lynxara | 1 | Beast | Cat | Lynxara | Beast (Creature Class) | 22 | 15 | 2 | 10/10/4 | 2 | 4 (3 declared, 0 manual) | 1 |  | matches book |  |
| Magnuslamnia | 14 | Animal | Shark | Magnuslamnia | Animal (Creature Class) | 369 | 35 | 6 | 27/23/15 | 1 | 7 (6 declared, 0 manual) | 0 |  | explained (rules decision / display / misprint): athletics 28→32 |  |
| Mammoth | 11 | Animal | Elephant | Mammoth | Animal (Creature Class) | 291 | 29 | 4 | 26/19/14 | 3 | 4 (2 declared, 0 manual) | 0 |  | matches book |  |
| Manticore | 8 | Beast | Manticore | Manticore | Beast (Creature Class) | 187 | 25 | 4 | 19/15/12 | 3 | 5 (5 declared, 0 manual) | 0 |  | matches book |  |
| Marid | 10 | Elemental | Genie | Marid | Elemental (Creature Class) | 215 | 32 | 4 | 21/20/17 | 2 | 3 (3 declared, 0 manual) | 17 |  | matches book |  |
| Marilith | 17 | Eternal | Demon | Marilith | Eternal (Creature Class) | 337 | 42 | 17 | 30/25/28 | 2 | 12 (9 declared, 0 manual) | 4 |  | matches book |  |
| Marshlight | 9 | Fey | Hag | Marshlight | Fey (Creature Class) | 117 | 23 | 4 | 13/19/18 | 1 | 5 (5 declared, 0 manual) | 4 |  | explained (rules decision / display / misprint): perception 15→13 |  |
| Medusa | 7 | Beast | Medusa | Medusa | Beast (Creature Class) | 143 | 26 | 4 | 18/19/9 | 3 | 6 (5 declared, 0 manual) | 0 |  | matches book |  |
| Minotaur | 6 | Humanoid | Minotaur | Minotaur | Humanoid (Creature Class) | 159 | 22 | 6 | 15/12/9 | 3 | 3 (3 declared, 0 manual) | 0 |  | matches book |  |
| Mirneth | 11 | Beast | Beetle | Mirneth | Beast (Creature Class) | 281 | 28 | 8 | 26/18/15 | 2 | 4 (3 declared, 0 manual) | 0 |  | explained (rules decision / display / misprint): climbing 15→19 |  |
| Mite Swarm | 2 | Animal | Shambler | Mite Swarm | Animal (Creature Class) | 89 | 17 | 0 | 11/15/1 | 0 | 3 (1 declared, 0 manual) | 0 |  | matches book | FF-06 |
| Monstrous Spider | 6 | Animal | Spider | Monstrous Spider | Animal (Creature Class) | 149 | 22 | 0 | 17/15/7 | 2 | 4 (4 declared, 0 manual) | 0 |  | matches book |  |
| Morndulir Soldier | 6 | Humanoid | Morndulir | Morndulir Soldier | Humanoid (Creature Class) | 133 | 22 | 12 | 14/10/7 | 3 | 1 (1 declared, 0 manual) | 3 |  | matches book | FF-07 |
| Morndulir Worker | 2 | Humanoid | Morndulir | Morndulir Worker | Humanoid (Creature Class) | 81 | 14 | 5 | 10/5/3 | 3 | 1 (1 declared, 0 manual) | 1 |  | matches book | FF-07 |
| Mortivor | 14 | Eternal | Soulaes | Mortivor | Eternal (Creature Class) | 323 | 35 | 14 | 30/20/25 | 2 | 9 (7 declared, 0 manual) | 10 |  | matches book |  |
| Mountain Serpent | 11 | Animal | Snake | Mountain Serpent | Animal (Creature Class) | 321 | 30 | 6 | 24/20/12 | 1 | 6 (5 declared, 0 manual) | 0 |  | explained (rules decision / display / misprint): athletics 20→24 |  |
| Mountain Troll | 10 | Humanoid | Troll | Mountain Troll | Humanoid (Creature Class) | 185 | 28 | 4 | 21/13/12 | 3 | 6 (5 declared, 0 manual) | 0 |  | matches book |  |
| Mournkin | 6 | Humanoid | Mournkin | — | Humanoid (Creature Class) | 99 | 24 | 2 | 9/15/10 | 2 | 6 (2 declared, 0 manual) | 4 |  | matches book |  |
| Mummy | 7 | Undead | Mummy | — | Undead (Creature Class) | 146 | 22 | 0 | 15/10/12 | 1 | 3 (2 declared, 0 manual) | 0 |  | matches book | FF-01 |
| Nettlehide | 9 | Plant | Nettlehide | — | Plant (Creature Class) | 222 | 20 | 6 | 19/9/15 | 1 | 6 (4 declared, 0 manual) | 9 |  | matches book |  |
| Nightmare | 7 | Eternal | Nightmare | — | Eternal (Creature Class) | 156 | 24 | 7 | 17/14/18 | 1 | 7 (6 declared, 0 manual) | 3 |  | matches book |  |
| Nightmare Lord | 12 | Eternal | Nightmare | Nightmare Lord | Eternal (Creature Class) | 233 | 34 | 12 | 23/20/24 | 1 | 7 (6 declared, 0 manual) | 5 |  | matches book |  |
| Nightray | 8 | Wyrm | Nightray | — | Wyrm (Creature Class) | 167 | 28 | 8 | 15/18/16 | 2 | 7 (6 declared, 0 manual) | 0 |  | matches book |  |
| Nimblespring | 5 | Fey | Nimblespring | — | Fey (Creature Class) | 85 | 21 | 0 | 9/16/13 | 2 | 4 (3 declared, 0 manual) | 4 |  | matches book |  |
| Nixie | 1 | Fey | Nixie | — | Fey (Creature Class) | 42 | 13 | 0 | 2/10/8 | 1 | 3 (2 declared, 0 manual) | 3 |  | explained (rules decision / display / misprint): athletics 3→7 |  |
| Nocturnus | 10 | Eternal | Soulaes | Nocturnus | Eternal (Creature Class) | 215 | 30 | 10 | 21/17/21 | 3 | 8 (6 declared, 0 manual) | 10 |  | matches book |  |
| Noxmortis | 18 | Eternal | Soulaes | Noxmortis | Eternal (Creature Class) | 297 | 46 | 18 | 29/28/32 | 1 | 8 (6 declared, 0 manual) | 7 |  | matches book |  |
| Nubifor | 15 | Eternal | Mystaron | Nubifor | Eternal (Creature Class) | 375 | 37 | 15 | 31/21/27 | 1 | 8 (3 declared, 0 manual) | 7 |  | matches book |  |
| Obsidral | 15 | Elemental | Gargoyle | Obsidral | Elemental (Creature Class) | 310 | 38 | 12 | 25/23/22 | 2 | 3 (2 declared, 0 manual) | 6 |  | matches book |  |
| Oceanidh | 2 | Humanoid | Oceanidh | — | Humanoid (Creature Class) | 71 | 17 | 1 | 12/8/2 | 1 | 2 (1 declared, 0 manual) | 0 |  | explained (rules decision / display / misprint): athletics 5→9 |  |
| Oceanidh Hunter | 6 | Humanoid | Oceanidh | Oceanidh Hunter | Humanoid (Creature Class) | 139 | 24 | 2 | 17/15/10 | 1 | 3 (1 declared, 0 manual) | 0 |  | explained (rules decision / display / misprint): athletics 11→15 |  |
| Ochre Jelly | 6 | Ooze | Ochre Jelly | — | Ooze (Creature Class) | 161 | 13 | 0 | 11/0/6 | 1 | 5 (3 declared, 0 manual) | 0 |  | matches book |  |
| Ogre | 4 | Humanoid | Ogre | — | Humanoid (Creature Class) | 131 | 15 | 4 | 13/5/5 | 3 | 2 (2 declared, 0 manual) | 0 |  | matches book |  |
| Ogre Soldier | 8 | Humanoid | Ogre | Ogre Soldier | Humanoid (Creature Class) | 187 | 23 | 6 | 17/10/10 | 3 | 2 (2 declared, 0 manual) | 0 |  | matches book |  |
| Oryceps | 4 | Plant | Oryceps | — | Plant (Creature Class) | 93 | 12 | 2 | 13/0/10 | 1 | 8 (4 declared, 0 manual) | 1 |  | matches book |  |
| Pegasus | 4 | Beast | Pegasus | — | Beast (Creature Class) | 117 | 20 | 1 | 14/13/7 | 2 | 5 (4 declared, 0 manual) | 2 |  | matches book |  |
| Phasmus | 14 | Aberration | Phasmus | — | Aberration (Creature Class) | 213 | 33 | 0 | 22/22/24 | 1 | 6 (4 declared, 0 manual) | 4 |  | matches book |  |
| Phoenix | 15 | Elemental | Phoenix | — | Elemental (Creature Class) | 325 | 41 | 6 | 25/26/24 | 3 | 7 (6 declared, 0 manual) | 8 |  | matches book |  |
| Pixie | 5 | Fey | Pixie | — | Fey (Creature Class) | 80 | 20 | 0 | 6/16/13 | 2 | 4 (3 declared, 0 manual) | 14 |  | matches book |  |
| Polar Bear | 5 | Animal | Bear | Polar Bear | Animal (Creature Class) | 155 | 20 | 1 | 18/14/7 | 2 | 3 (2 declared, 0 manual) | 0 |  | explained (rules decision / display / misprint): athletics 13→17 |  |
| Pyraquenil | 4 | Eternal | Eldravi | Pyraquenil | Eternal (Creature Class) | 101 | 19 | 4 | 15/13/11 | 2 | 5 (4 declared, 0 manual) | 5 |  | matches book |  |
| Pyroral | 13 | Eternal | Agothian | Pyroral | Eternal (Creature Class) | 260 | 37 | 13 | 25/23/23 | 3 | 6 (4 declared, 0 manual) | 17 |  | matches book |  |
| Quasit | 1 | Eternal | Demon | Quasit | Eternal (Creature Class) | 35 | 15 | 1 | 8/9/10 | 1 | 7 (6 declared, 0 manual) | 3 |  | matches book |  |
| Queldor | 8 | Eternal | Soulaes | Queldor | Eternal (Creature Class) | 149 | 25 | 8 | 21/14/17 | 2 | 9 (5 declared, 0 manual) | 5 |  | matches book |  |
| Rat Swarm | 2 | Animal | Rat | Rat Swarm | Animal (Creature Class) | 89 | 16 | 0 | 11/14/2 | 0 | 5 (4 declared, 0 manual) | 0 |  | matches book |  |
| Raven | 1 | Animal | Raven | — | Animal (Creature Class) | 36 | 15 | 0 | 9/12/3 | 1 | 3 (2 declared, 0 manual) | 0 |  | explained (rules decision / display / misprint): perception 8→6 |  |
| Raven Swarm | 3 | Animal | Raven | Raven Swarm | Animal (Creature Class) | 74 | 17 | 0 | 10/15/6 | 0 | 4 (2 declared, 0 manual) | 0 |  | explained (rules decision / display / misprint): DB 85→17; Init 35→40; acrobatics 8→9; climbing 8→9; stealth 8→9 | FF-03 |
| Reaver | 20 | Eternal | Soulaes | Reaver | Eternal (Creature Class) | 455 | 48 | 30 | 35/28/31 | 2 | 14 (10 declared, 0 manual) | 6 |  | explained (rules decision / display / misprint): athletics 34→38 |  |
| Riding Dog | 1 | Animal | Dog | Riding Dog | Animal (Creature Class) | 57 | 13 | 1 | 10/10/2 | 1 | 5 (2 declared, 0 manual) | 0 |  | matches book |  |
| Riding Horse | 2 | Animal | Mount | Riding Horse | Animal (Creature Class) | 93 | 16 | 0 | 13/12/3 | 1 | 3 (2 declared, 0 manual) | 0 |  | matches book |  |
| River Troll | 9 | Humanoid | Troll | River Troll | Humanoid (Creature Class) | 200 | 27 | 4 | 19/14/11 | 2 | 6 (5 declared, 0 manual) | 3 |  | explained (rules decision / display / misprint): athletics 15→19 |  |
| Roc | 15 | Animal | Roc | — | Animal (Creature Class) | 414 | 37 | 3 | 27/24/19 | 3 | 5 (2 declared, 0 manual) | 0 |  | matches book |  |
| Rumellor | 16 | Eternal | Eldravi | Rumellor | Eternal (Creature Class) | 285 | 43 | 16 | 28/28/29 | 1 | 8 (7 declared, 0 manual) | 7 |  | matches book |  |
| Salamander | 7 | Elemental | Salamander | — | Elemental (Creature Class) | 143 | 24 | 4 | 16/15/13 | 4 | 3 (2 declared, 0 manual) | 0 |  | matches book |  |
| Salamaxis | 10 | Elemental | Salamander | Salamaxis | Elemental (Creature Class) | 195 | 30 | 4 | 20/18/16 | 2 | 2 (2 declared, 0 manual) | 3 |  | matches book |  |
| Sand Serpent | 3 | Animal | Snake | Sand Serpent | Animal (Creature Class) | 84 | 18 | 2 | 13/16/3 | 1 | 3 (3 declared, 0 manual) | 0 |  | explained (rules decision / display / misprint): athletics 4→8; climbing 6→10 |  |
| Sea Dragon, Scaleborn | 4 | Wyrm | Sea Dragon | — | Wyrm (Creature Class) | 105 | 19 | 6 | 14/12/10 | 2 | 7 (5 declared, 0 manual) | 0 | yes | explained (rules decision / display / misprint): athletics 9→13 | FF-13 |
| Sea Dragon, Sovereign | 16 | Wyrm | Sea Dragon | — | Wyrm (Creature Class) | 423 | 35 | 18 | 29/21/27 | 3 | 13 (11 declared, 0 manual) | 0 | yes | explained (rules decision / display / misprint): athletics 29→33 | FF-13 |
| Sea Dragon, Talon | 10 | Wyrm | Sea Dragon | — | Wyrm (Creature Class) | 265 | 27 | 12 | 22/17/18 | 2 | 10 (8 declared, 0 manual) | 0 | yes | explained (rules decision / display / misprint): athletics 20→24 | FF-13 |
| Sequoia Allium | 12 | Plant | Sequoia Allium | — | Plant (Creature Class) | 327 | 26 | 4 | 25/10/16 | 2 | 6 (5 declared, 0 manual) | 3 |  | matches book |  |
| Seraphim | 16 | Eternal | Angel | Seraphim | Eternal (Creature Class) | 305 | 41 | 16 | 28/24/30 | 1 | 9 (6 declared, 0 manual) | 17 |  | matches book |  |
| Shade Dragon, Mature | 19 | Wyrm | Shade Dragon | — | Wyrm (Creature Class) | 369 | 43 | 16 | 28/26/30 | 4 | 11 (9 declared, 0 manual) | 0 | yes | explained (rules decision / display / misprint): climbing 24→28 | FF-13 |
| Shade Dragon, Scaleborn | 7 | Wyrm | Shade Dragon | — | Wyrm (Creature Class) | 116 | 28 | 4 | 13/19/15 | 2 | 7 (5 declared, 0 manual) | 0 | yes | explained (rules decision / display / misprint): climbing 15→19 | FF-13 |
| Shade Dragon, Talon | 13 | Wyrm | Shade Dragon | — | Wyrm (Creature Class) | 240 | 35 | 10 | 21/22/23 | 3 | 10 (8 declared, 0 manual) | 0 | yes | explained (rules decision / display / misprint): climbing 19→23 | FF-13 |
| Shade Stalker | 16 | Undead | Shade | Shade Stalker | Undead (Creature Class) | 269 | 45 | 0 | 24/29/21 | 1 | 9 (7 declared, 0 manual) | 8 |  | matches book | FF-01 |
| Shade Walker | 14 | Undead | Shade | Shade Walker | Undead (Creature Class) | 311 | 33 | 0 | 25/20/24 | 1 | 9 (6 declared, 1 manual) | 6 |  | matches book | FF-01 |
| Shade Wing | 12 | Undead | Shade | Shade Wing | Undead (Creature Class) | 251 | 32 | 0 | 22/19/22 | 2 | 11 (8 declared, 1 manual) | 7 |  | matches book | FF-01 |
| Shade Wraith | 20 | Undead | Shade | Shade Wraith | Undead (Creature Class) | 305 | 45 | 0 | 30/28/31 | 1 | 9 (8 declared, 0 manual) | 8 |  | matches book | FF-01 |
| Shadow | 4 | Undead | Shadow | — | Undead (Creature Class) | 77 | 19 | 0 | 9/10/11 | 1 | 7 (5 declared, 0 manual) | 0 |  | explained (rules decision / display / misprint): perception 10→8 | FF-01 |
| Shadowthorn | 7 | Fey | Hag | Shadowthorn | Fey (Creature Class) | 94 | 22 | 2 | 8/18/17 | 1 | 3 (3 declared, 0 manual) | 5 |  | matches book |  |
| Shambler | 6 | Plant | Shambler | — | Plant (Creature Class) | 143 | 19 | 6 | 16/6/12 | 1 | 8 (6 declared, 0 manual) | 2 |  | explained (rules decision / display / misprint): athletics 15→19 |  |
| Shark | 4 | Animal | Shark | — | Animal (Creature Class) | 121 | 18 | 1 | 15/13/4 | 1 | 6 (5 declared, 0 manual) | 0 |  | explained (rules decision / display / misprint): athletics 12→16 |  |
| Skeleton Champion | 4 | Undead | Skeleton | Skeleton Champion | Undead (Creature Class) | 111 | 19 | 0 | 13/9/4 | 3 | 2 (2 declared, 0 manual) | 0 |  | matches book | FF-01 |
| Skeleton Warrior | 1 | Undead | Skeleton | Skeleton Warrior | Undead (Creature Class) | 69 | 14 | 0 | 10/6/1 | 3 | 2 (2 declared, 0 manual) | 0 |  | matches book | FF-01 |
| Smilodon | 8 | Animal | Cat | Smilodon | Animal (Creature Class) | 187 | 25 | 4 | 18/17/11 | 2 | 5 (3 declared, 0 manual) | 0 |  | matches book |  |
| Snow Troll | 13 | Humanoid | Troll | Snow Troll | Humanoid (Creature Class) | 299 | 33 | 6 | 26/17/15 | 2 | 7 (6 declared, 0 manual) | 3 |  | matches book |  |
| Somnichan | 20 | Eternal | Mystaron | Somnichan | Eternal (Creature Class) | 560 | 48 | 20 | 35/28/32 | 3 | 8 (4 declared, 0 manual) | 5 |  | matches book |  |
| Soul Shade | 22 | Undead | Shade | Soul Shade | Undead (Creature Class) | 551 | 46 | 0 | 30/28/31 | 2 | 11 (10 declared, 0 manual) | 10 |  | matches book | FF-01 |
| Spectre | 7 | Undead | Spectre | — | Undead (Creature Class) | 129 | 25 | 0 | 16/17/18 | 1 | 7 (5 declared, 0 manual) | 0 |  | matches book | FF-01 |
| Sphinx | 10 | Beast | Sphinx | — | Beast (Creature Class) | 205 | 28 | 4 | 20/16/15 | 1 | 5 (3 declared, 0 manual) | 1 |  | matches book |  |
| Spider Swarm | 2 | Animal | Spider | Spider Swarm | Animal (Creature Class) | 41 | 16 | 0 | 9/14/1 | 0 | 4 (2 declared, 0 manual) | 0 |  | explained (rules decision / display / misprint): climbing 6→10 |  |
| Stone Giant | 10 | Humanoid | Giant | Stone Giant | Tough (Creature Class) | 215 | 29 | 8 | 20/14/12 | 3 | 1 (1 declared, 0 manual) | 0 |  | matches book |  |
| Stone Giant Shaman | 10 | Humanoid | Giant | Stone Giant | Verdant Caster (Creature Class) | 175 | 24 | 8 | 14/11/18 | 3 | 2 (1 declared, 0 manual) | 0 |  | matches book |  |
| Stone Golem | 12 | Construct | Golem | Stone Golem | Construct (Creature Class) | 267 | 29 | 9 | 15/10/11 | 1 | 5 (5 declared, 0 manual) | 0 |  | matches book |  |
| Storm Crow | 12 | Beast | Storm Crow | — | Beast (Creature Class) | 245 | 34 | 3 | 24/21/14 | 2 | 7 (4 declared, 0 manual) | 5 |  | matches book |  |
| Storm Drake | 9 | Wyrm | Drake | Storm Drake | Wyrm (Creature Class) | 210 | 29 | 4 | 17/19/17 | 2 | 8 (7 declared, 0 manual) | 4 |  | matches book |  |
| Storm Giant | 18 | Humanoid | Giant | Storm Giant | Tough (Creature Class) | 383 | 41 | 12 | 29/21/24 | 3 | 2 (2 declared, 0 manual) | 5 |  | matches book |  |
| Storm Giant Shaman | 18 | Humanoid | Giant | Storm Giant | Verdant Caster (Creature Class) | 311 | 32 | 12 | 23/18/30 | 3 | 3 (2 declared, 0 manual) | 5 |  | matches book |  |
| Succubus | 8 | Eternal | Demon | Succubus | Eternal (Creature Class) | 157 | 26 | 8 | 19/15/19 | 1 | 10 (9 declared, 0 manual) | 7 |  | matches book |  |
| Tenebrax | 6 | Eternal | Soulaes | Tenebrax | Eternal (Creature Class) | 105 | 25 | 6 | 10/16/7 | 1 | 9 (7 declared, 0 manual) | 6 |  | matches book |  |
| Terradon | 14 | Animal | Lizard | Terradon | Animal (Creature Class) | 373 | 32 | 9 | 30/20/19 | 3 | 4 (4 declared, 0 manual) | 0 |  | explained (rules decision / display / misprint): climbing 17→21 |  |
| Thel | 10 | Eternal | Demon | Thel | Eternal (Creature Class) | 175 | 31 | 10 | 20/20/21 | 1 | 8 (4 declared, 0 manual) | 9 |  | matches book |  |
| Thornkin | 6 | Plant | Thornkin | — | Plant (Creature Class) | 117 | 21 | 0 | 15/10/9 | 1 | 6 (5 declared, 0 manual) | 0 |  | matches book |  |
| Tiger | 6 | Animal | Cat | Tiger | Animal (Creature Class) | 159 | 22 | 2 | 17/15/9 | 2 | 4 (3 declared, 0 manual) | 0 |  | matches book |  |
| Titan | 20 | Humanoid | Titan | — | Humanoid (Creature Class) | 584 | 45 | 16 | 33/23/26 | 3 | 5 (2 declared, 0 manual) | 0 |  | matches book |  |
| Titan Hound | 5 | Animal | Dog | Titan Hound | Animal (Creature Class) | 140 | 19 | 2 | 16/13/8 | 1 | 4 (2 declared, 0 manual) | 0 |  | matches book |  |
| Titasuchus | 10 | Animal | Crocodile | Titasuchus | Animal (Creature Class) | 255 | 30 | 8 | 23/20/13 | 2 | 3 (2 declared, 0 manual) | 0 |  | explained (rules decision / display / misprint): athletics 19→23 |  |
| Triclops | 14 | Humanoid | Cyclopian | Triclops | Humanoid (Creature Class) | 273 | 33 | 6 | 21/18/19 | 1 | 5 (3 declared, 0 manual) | 3 |  | matches book |  |
| Unicorn | 10 | Beast | Unicorn | — | Beast (Creature Class) | 225 | 32 | 2 | 23/20/13 | 2 | 10 (10 declared, 0 manual) | 2 |  | matches book |  |
| Vampire | 10 | Undead | Vampire | — | Undead (Creature Class) | 195 | 34 | 2 | 20/19/14 | 2 | 8 (3 declared, 0 manual) | 7 |  | matches book | FF-01 |
| Verdant Muck | 6 | Ooze | Muck | Verdant Muck | Ooze (Creature Class) | 133 | 19 | 1 | 8/6/7 | 1 | 4 (3 declared, 0 manual) | 0 |  | matches book |  |
| Violith | 3 | Eternal | Soulaes | Violith | Eternal (Creature Class) | 71 | 18 | 3 | 12/11/11 | 2 | 7 (6 declared, 0 manual) | 2 |  | matches book |  |
| Viper | 1 | Animal | Snake | Viper | Animal (Creature Class) | 36 | 15 | 2 | 9/12/1 | 1 | 3 (3 declared, 0 manual) | 0 |  | explained (rules decision / display / misprint): fort 45→9; refl 60→12; will 5→1; climbing 6→10 |  |
| Virtue | 6 | Eternal | Angel | Virtue | Eternal (Creature Class) | 113 | 24 | 6 | 16/14/16 | 1 | 7 (6 declared, 0 manual) | 9 |  | matches book |  |
| Vrock | 12 | Eternal | Demon | Vrock | Eternal (Creature Class) | 245 | 34 | 12 | 24/22/22 | 2 | 9 (8 declared, 0 manual) | 2 |  | matches book |  |
| Waarg | 5 | Beast | Wolf | Waarg | Beast (Creature Class) | 145 | 20 | 2 | 16/12/8 | 1 | 6 (4 declared, 0 manual) | 0 |  | matches book |  |
| War Horse | 3 | Animal | Mount | War Horse | Animal (Creature Class) | 70 | 17 | 1 | 15/13/4 | 1 | 4 (2 declared, 0 manual) | 0 |  | matches book |  |
| Water | 1 | Elemental | Aetherling | Water | Elemental (Creature Class) | 46 | 14 | 1 | 7/9/4 | 1 | 4 (2 declared, 0 manual) | 1 |  | explained (rules decision / display / misprint): athletics 4→8 |  |
| Water Primal - Dropp | 3 | Elemental | Primal | Water Primals | Elemental (Creature Class) | 46 | 18 | 1 | 13/12/6 | 1 | 5 (4 declared, 0 manual) | 1 |  | explained (rules decision / display / misprint): athletics 5→9 |  |
| Water Primal - Synarmi | 15 | Elemental | Primal | Water Primals | Elemental (Creature Class) | 309 | 37 | 3 | 28/24/21 | 1 | 6 (5 declared, 0 manual) | 4 |  | explained (rules decision / display / misprint): Init 20→25; athletics 18→22; nature 15→16; planes 12→13; survival 14→15 | FF-03 |
| Water Primal - Tydal | 11 | Elemental | Primal | Water Primals | Elemental (Creature Class) | 240 | 31 | 2 | 23/21/17 | 1 | 6 (5 declared, 0 manual) | 3 |  | explained (rules decision / display / misprint): athletics 14→18 |  |
| Water Primal - Waive | 7 | Elemental | Primal | Water Primals | Elemental (Creature Class) | 143 | 24 | 2 | 18/17/10 | 1 | 5 (4 declared, 0 manual) | 2 |  | explained (rules decision / display / misprint): athletics 10→14 |  |
| Werebat | 3 | Humanoid | Lycanthrope | Werebat | Humanoid (Creature Class) | 78 | 18 | 1 | 10/14/5 | 3 | 7 (5 declared, 0 manual) | 0 |  | matches book |  |
| Werebear | 6 | Humanoid | Lycanthrope | Werebear | Humanoid (Creature Class) | 159 | 22 | 2 | 17/10/9 | 5 | 8 (5 declared, 0 manual) | 0 |  | matches book |  |
| Wereboar | 4 | Humanoid | Lycanthrope | Wereboar | Humanoid (Creature Class) | 70 | 17 | 1 | 15/7/6 | 3 | 8 (6 declared, 0 manual) | 0 |  | matches book |  |
| Werecat | 8 | Humanoid | Lycanthrope | Werecat | Humanoid (Creature Class) | 133 | 28 | 2 | 13/17/11 | 3 | 8 (6 declared, 0 manual) | 0 |  | matches book |  |
| Wererat | 2 | Humanoid | Lycanthrope | Wererat | Humanoid (Creature Class) | 65 | 17 | 0 | 6/11/4 | 4 | 7 (5 declared, 0 manual) | 0 |  | matches book | FF-07 |
| Wereraven | 7 | Humanoid | Lycanthrope | Wereraven | Humanoid (Creature Class) | 136 | 26 | 0 | 15/14/9 | 4 | 9 (7 declared, 0 manual) | 0 |  | matches book |  |
| Werewolf | 4 | Humanoid | Lycanthrope | Werewolf | Humanoid (Creature Class) | 107 | 18 | 1 | 12/8/5 | 4 | 7 (5 declared, 0 manual) | 0 |  | matches book |  |
| Wight | 6 | Undead | Wight | — | Undead (Creature Class) | 123 | 21 | 4 | 16/11/16 | 1 | 6 (4 declared, 0 manual) | 6 |  | matches book | FF-01 |
| Wolf | 2 | Animal | Wolf | — | Animal (Creature Class) | 69 | 15 | 1 | 11/11/2 | 1 | 5 (2 declared, 0 manual) | 0 |  | matches book |  |
| Wood Golem | 6 | Construct | Golem | Wood Golem | Construct (Creature Class) | 145 | 24 | 4 | 8/9/5 | 1 | 3 (3 declared, 0 manual) | 0 |  | matches book |  |
| Wraith | 10 | Undead | Wraith | — | Undead (Creature Class) | 175 | 30 | 0 | 20/18/22 | 1 | 9 (6 declared, 0 manual) | 3 |  | matches book | FF-01 |
| Wrathmorta | 12 | Eternal | Soulaes | Wrathmorta | Eternal (Creature Class) | 231 | 35 | 12 | 22/21/23 | 2 | 9 (8 declared, 0 manual) | 6 |  | matches book |  |
| Wulve | 4 | Animal | Wolf | Wulve | Animal (Creature Class) | 127 | 18 | 1 | 14/13/8 | 1 | 4 (2 declared, 0 manual) | 0 |  | matches book |  |
| Wysp | 7 | Fey | Wysp | — | Fey (Creature Class) | 74 | 22 | 0 | 8/18/15 | 1 | 5 (3 declared, 0 manual) | 4 |  | matches book |  |
| Wyvern | 7 | Wyrm | Drake | Wyvern | Wyrm (Creature Class) | 187 | 23 | 6 | 16/14/15 | 3 | 4 (4 declared, 0 manual) | 0 |  | matches book |  |
| Xort | 8 | Plant | Xort | — | Plant (Creature Class) | 143 | 22 | 6 | 18/10/12 | 2 | 4 (4 declared, 0 manual) | 0 |  | matches book |  |
| Yulussil | 20 | Eternal | Eldravi | Yulussil | Eternal (Creature Class) | 365 | 52 | 20 | 32/32/35 | 1 | 6 (5 declared, 0 manual) | 0 |  | matches book |  |
| Zombie, Human | 1 | Undead | Zombie, Human | — | Undead (Creature Class) | 55 | 10 | 0 | 10/3/7 | 2 | 8 (4 declared, 0 manual) | 0 |  | matches book | FF-01 |
| Zylar | 8 | Humanoid | Cyclopian | Zylar | Humanoid (Creature Class) | 139 | 19 | 2 | 9/7/18 | 1 | 6 (3 declared, 0 manual) | 1 |  | matches book |  |
