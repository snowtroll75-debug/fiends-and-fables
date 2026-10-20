# Fiends & Fables Prime 0.11.0 — Derivation Repair Report

**Target:** Foundry VTT 14.367 / TRG Prime 3.479.1 (verified live in the TRG V14 world, 3 September 2026)  
**Prior release:** 0.10.11  
**Source findings:** `Fiends & Fables automation and implementation audit` (3 September 2026) — findings L1–L6, F1–F6, F9.

This is a repair release. No Actor was added, removed or renamed; 294 Actors and 13 templates remain. Every change below was first made on temporary copies of the Actors inside a running Foundry world on the current core, measured against the Fiends & Fables 2.8 printed stat blocks, and only then written into the compendium packs. The packaged data is the same transform the live run used (verified by fingerprint on a 37-actor sample, 37/37 identical).

## Result

| Check (282 book-matched Actors, live on core 3.479.1) | 0.10.11 | 0.11.0 |
|---|---|---|
| Actors deriving the printed Defence Bonus | 120 | **282** |
| Actors deriving the printed Fort / Ref / Will | 257 | **282** |
| Actors deriving the printed initiative | 256 | **282** |
| Actors deriving the printed HP | 261 | **282** |
| Actors deriving the printed DR | 259 | **282** |
| Actors deriving the printed CR | 184 | **282** |
| Printed senses resolved by the senses engine | 425 of 523 | **589 of 589** items, all at the printed range |
| Packs openable by LevelDB / Foundry | 0 of 5 (no MANIFEST) | **5 of 5** (`extractPack` clean) |

Viper's saves and Raven Swarm's DB are book typos (Fort +45 / Ref +60; DB +85) and were checked against the module's own recorded values instead. Twelve Actors are side-box variants with no full printed block (Aboleth Magi, Banshee Dirge Singer, the six Giant Shamans, the four Draeglir) and received the structural fixes but no calibration.

## 1. Packaging (was F1, critical)

All five packs are rebuilt with classic-level and compacted; each carries its `MANIFEST`, `CURRENT` and write-ahead log. Foundry's own `extractPack` reads 294 / 13 / 190 / 113 / 191 documents with no errors.

## 2. Double-counted derivations (was L1, L2, L3, L5)

The module reproduced printed totals by writing values into the Actor's typed bonus slots that core has since learned to derive itself. Three system slots are now zeroed on every Actor — `combat.defence.{status,other,class,item}`, `combat.saves.*.other` and `combat.initiative.other` — because each was found duplicating either an effect the Actor already carries (the 0.10.9 lycanthrope "Source Stat Calibration" effect wrote Fort +3 / Will −3 / DB +2 *and* the same values were baked into the slots) or a rule core now applies (the Codex half-level DB bonus, the creature-type CR). 105 Actors had at least one such slot.

Where a printed total still differed after that, the difference was measured live and written as a single calibration into the `other` slot of that statistic — the module's own convention (`hp.other` already carried this role on 57 Actors). 190 Actors received a calibration: DB on 130, CR on 98, initiative on 28, HP on 21, Will on 18, Fort on 15, Ref on 14, DR on 23, one or more skills on 26. CR calibrations subtract the creature-type CR core adds on derive (Eternal / Elemental 2, Construct 4). DR calibrations reduce the baked natural armour first, then the race/heritage effect's natural-armour change when the slot is already zero (Survival Instinct Actors: Somnichan, Nubifor, Nightmare Lord, Fancalia, Nightmare, Doctus); Fire Giant's plate gains DR +12 to reach the printed 18.

Skills were calibrated only where the difference was not core's climb/swim-speed circumstance bonus (the book omits it on some blocks and includes it on others — left to core) and not a skill governed by an authored conditional on one of the Actor's items.

## 3. Senses (was F4 / L4)

Every sense ability (603 items) now carries core's current `flags.trg-prime.creatureAbility.derives` block taken from the matching core entry (Darkvision, Nightvision, Scent and Life Sense live in core's *abilities* pack; Tremorsense, Echolocation, Blindsight, Smokevision, Vibration Sense, Sonar Sense and Blood Scent in *creature-abilities*), plus `fixedFeet` set to the range printed in the item's own name. `sensesOf()` resolves all 589 at the printed range.

## 4. Stale core copies refreshed (was F3)

998 embedded items on 201 Actors were re-sourced from core 3.479.1's packs — system data, effects and `flags.trg-prime`: every innate spell (system.effects / damage now current; innate, uses and PP kept from the module), and the feats and Codex abilities whose current core entry carries mechanism the copy lacked (Alertness, Bravery, Survivalist, Silver Tongue, Subtle, Evasion, Resolve, Keen Sense, Eternal Summons, Abyssal Healing, Life Drain, Rend, Shadow Hand, Aura of Death / Heat / Ruin, Regeneration, Sunlight Weakness, Shadowy, Smokevision …). Item ids are unchanged; effect ids are new.

## 5. Data corrections (was F5, F6, L6)

- Movement: Rat Swarm 30 land / 10 swim / 10 climb (was 10 land, fly 60); Giant Rat 25 land (was 10 land, fly 60); Raven and Raven Swarm fly 40 (was 60); Fire Giant land 25 (was 35); Water Primal – Synarmi land 10 / swim 100 (was 15 / 80); Reaver loses the fly / swim / climb / burrow 30 the book does not print.
- 0.10.10 donor placeholders: Bulette Bite and Claw −2 attack (derive +17, were +19); Bugbear Unarmed Strike 1d4 (was 1d4+1), Javelin −2 attack; Blink Dog, Alpha Bite 1d10 (was 1d8). `expectedAttack` / `expectedDamage` flags updated.
- 66 orphan embedded records left under the five 0.10.10 Actors are purged (5424 → 5358 items).

## 6. Scripts (was F2, F7, F9)

`template-framework.mjs`: Ghost `flyEqualsLand` reads the pooled land speed and overrides `movement.fly.base` (fly now equals land; was 0); werebat/wereraven override `movement.fly.base`; ghost natural-attack conversion uses `ghostConvertedKey` and removal strips the conversion flags explicitly (the creature's own Unarmed weapon is no longer deleted on removal); duplicate Darkvision from core's Undead auto-grant is collapsed after apply; a failed apply rolls back its generated items, effects and creature type; the manager honours a GM picking an unmet-requirement template with `force`; the Actor-directory entry uses `getActorContextOptions` (Foundry 13+); the dead `renderActorSheet` / `renderApplicationV2` registrations are gone and the header button sits before the close control.

`dragon-framework.mjs`: movement writes target `.base` on pooled speeds; `identity.level` is only written on NPCs (core derives it from XP on characters); rebuilds delete only framework-generated items; `sourceCalibration` survives a rebuild; the age-category select drives advancement when the exact box is untouched; `CONST.ACTIVE_EFFECT_MODES` (deprecated) replaced; directory hook and header placement as above.

`creature-compendium-filter.mjs`: the dead `renderCompendiumCollection` registration removed.

Live check of the patched template framework (scratch Goblin Warrior, applied and removed werewolf, ghost, skeleton, wereraven): land 20 → 30 / 25 as printed, ghost fly 20 = land, one Darkvision, wereraven fly 40, all 14 original items present afterwards, creature type restored.

## 7. Manifest

`module.json` → 0.11.0; core compatibility minimum 3.412.0 (movement pools), verified 3.479.1; Foundry verified 14.367.

## Still open (not touched by this release)

- Attack totals were only approximated statically; ±1–3 differences on ~250 lines need a strike-card pass.
- Afflictions modelled as text abilities (Spider/Snake Venom, Lycanthropic Curse, Filth/Ghoul Fever, Mummy Rot, Zombie Plague…) are not converted to affliction items.
- Abyssal Familiar, Nirvanic Familiar and Scaly Resilience (F&F 2.8 Chapter 3) exist in neither core nor module.
- Book errata (Viper saves, Barghest/Lynxara attack bonuses, Oceanidh Hunter DC, Raven Swarm DB, Ankheg "Wis", Storm Crow "Ball Lightning Heal", Fancalia "Mirage Terrian") remain in the 2.8 source.

## Appendix — calibrations written per Actor

| Actor | Calibration (slot `other` unless CR / DR) |
|---|---|
| Air | CR -2 |
| Air Primal - Briez | CR -2 |
| Air Primal - Gayl | CR -2 |
| Air Primal - Stourm | CR -2 |
| Air Primal - Tempast | CR -2 |
| Akrexe | DB -3, CR -2 |
| Angrenilir | CR -2 |
| Animus Armour | DB -1, HP -15, CR -4 |
| Animus Colossus | DB -6, HP -15, CR -4 |
| Animus Statue | DB -1, HP -15, CR -4 |
| Animus Statue, Giant | DB -3, HP -15, CR -4 |
| Ankheg | DB -1 |
| Ankheg, Queen | DB -4 |
| Ape | DB -1, DR -3, intimidate -2 |
| Ape Lord | DB -4, DR -3 |
| Arcane Lich | culture -7, linguistics -5, meditation -5, mentalFocus -5, planes -5, powerManipulation -5 |
| Archangel | DB -10, CR -2 |
| Aroch | DB -3, Init -15, CR -2, stealth +1, thievery +1 |
| Athach | DB -6, HP -23 |
| Avoral | DB -4, HP +9, CR -2 |
| Azur | DB -1, CR -2, crafting +4 |
| Balor | DB -10, Init -30, CR -2, stealth +1 |
| Banshee | DB -8 |
| Barghest | DB -2, CR -2 |
| Basilisk | DB -3 |
| Bat Swarm | DR -3 |
| Behir | DB -4 |
| Belkar | DB -3, CR -2 |
| Belkar Storm Lord | DB -5, CR -2 |
| Blightborn | DB -1, Ref -1, Init -5, acrobatics -1, athletics +1, climbing -1, stealth -1 |
| Blink Dog | DB -1 |
| Blink Dog, Alpha | DB -2 |
| Boar | DB -1, Will -2, DR -3 |
| Bugbear | Will -2, DR -1 |
| Bulette | DB -4, Fort +3, Will +2, HP -35, athletics +1 |
| Cave Bear | DB -3, DR -3 |
| Cave Troll | DB -5, intimidate +4 |
| Centaur | DB -1, Fort -2, CR -1 |
| Cheetah | DB -1, CR -1 |
| Cherubim | DB -1, CR -2 |
| Chuul | DB -4, Will -2 |
| Clay Golem | Init +20 |
| Cloaker | DB -2, Will -2, CR -1 |
| Cloud Giant | Fort -1 |
| Cockatrice | DB -2, Fort -2, CR -1 |
| Cold Dragon, Talon | DB -1 |
| Constrictor | DB -3 |
| Crimson Muck | Ref -1 |
| Crocodile | DB -2, CR -1 |
| Cursarion | CR -2 |
| Cyclops | DB -2 |
| Dancing Broom | HP -15, CR -4 |
| Dao | CR -2 |
| Djinn | CR -2 |
| Doctus | DB -2, Ref -1, Init -5, DR -2, CR -2, stealth -1 |
| Dracoral | DB -11, CR -2 |
| Dretch | DB -1, CR -2, stealth +1, survival +1 |
| Earth | CR -2 |
| Earth Primal - Aerph | Init +5, HP +10, CR -2 |
| Earth Primal - Maoton | CR -2 |
| Earth Primal - Pebbal | CR -2 |
| Earth Primal - Stown | CR -2 |
| Efreet | CR -2 |
| Fancalia | DB -5, Init +20, DR -10, CR -2 |
| Feloral | DB -1, CR -2 |
| Fire | CR -2 |
| Fire Giant | DR +12 |
| Fire Primal - Emba | CR -2 |
| Fire Primal - Flaim | HP -45, CR -2 |
| Fire Primal - Intheno | CR -2 |
| Fire Primal - Pyroclas | HP +10, CR -2 |
| Flame Beetle | DR -3 |
| Flying Rug | DB -3, HP -15, CR -4 |
| Forest Troll | DB -3 |
| Gargoyle | CR -2 |
| Giant Bat | DB -1, DR -3 |
| Giant Eagle | DR -2 |
| Giant Spider | survival -2 |
| Giant Stag Beetle | DB -2, DR -3 |
| Glimmerwick | DB +7 |
| Goblin Elite | acrobatics +1, athletics +1, climbing +1, intimidate +1, stealth +1, thievery +1 |
| Goblin Warrior | acrobatics +1, athletics +1, climbing +1, intimidate +2, stealth +1, thievery +1 |
| Gondathel | HP +12, CR -2 |
| Gravhek | DB -4, CR -2 |
| Grey Spider | DB -3 |
| Grizzly Bear | DB -1, DR -3 |
| Guardian | DB -5, CR -2 |
| Hantya | DB -6, Init -15, CR -2 |
| Hill Troll | DB -4 |
| Huanling | Init -25 |
| Ice | CR -2 |
| Inferno Spider | DB -5 |
| Jann | CR -2 |
| Khavar | DB -7, Init -25, CR -2 |
| Kobold Elite | DB +1, Ref +3, Will -3, Init +5 |
| Kobold Sneak | DB +1, Ref +3, Will -3 |
| Kothorn | DB -2, Fort +2, DR -3 |
| Laeleth | DB -7, DR -3, intimidate -4 |
| Leopard | DB -2, CR -1 |
| Lion | DB -2, CR -1 |
| Luporal | DB -3, CR -2 |
| Lustrian Brave | DB +2, Fort +3, Will -3 |
| Lustrian Khrissk | DB +2, Fort +3, Ref +3, Will -3 |
| Lynxara | Fort -2, CR -1 |
| Mammoth | HP +11 |
| Marid | CR -2 |
| Marilith | DB -8, Init -20, CR -2 |
| Minotaur | DB +2, Fort +3, Will -3, Init -10 |
| Mirneth | DB -5 |
| Monstrous Spider | DB -3 |
| Morndulir Soldier | DB +2, Fort +3, Will -3, Init -5, DR -4 |
| Morndulir Worker | DB +1, Fort +3, Will -3, DR -1 |
| Mortivor | DB -7, CR -2 |
| Mountain Serpent | DB -5, acrobatics -4, climbing -8 |
| Mountain Troll | DB -5 |
| Mournkin | DB -3 |
| Mummy | Will -6, Init +5, CR +1 |
| Nettlehide | DB -2, Ref +2, Init +10, HP -10, athletics -2, stealth +2 |
| Nightmare | DB -2, Ref +1, Init +5, DR -7, CR -2, acrobatics +1, athletics -1, stealth +1 |
| Nightmare Lord | DB -5, Ref +1, Init +5, DR -12, CR -2, acrobatics +1, athletics -1, stealth +1 |
| Nightray | DB -4 |
| Nimblespring | DB -1 |
| Nixie | DB -1, Ref -1, Init -5, acrobatics -1, athletics -3, stealth -1 |
| Nocturnus | DB -5, CR -2 |
| Noxmortis | DB -9, CR -3 |
| Nubifor | DB -4, Ref +3, Init +15, DR -15, CR -2, acrobatics +3, athletics -4, stealth +3 |
| Obsidral | CR -2 |
| Oceanidh | DB +1, Fort +3, Will -3 |
| Oceanidh Hunter | DB +2, Fort +3, Ref +3, Will -3, Init -10 |
| Ogre | DB +1, Fort +3, Will -3 |
| Ogre Soldier | DB +2, Fort +3, Will -3 |
| Oryceps | Init +30 |
| Phoenix | CR -2 |
| Polar Bear | DB -2, DR -3 |
| Pyraquenil | CR -2 |
| Pyroral | DB -6, CR -2 |
| Quasit | Init -10, CR -2 |
| Queldor | DB -4, CR -2 |
| Raven Swarm | Ref +1, Init +5, acrobatics +1, climbing +1, stealth +1 |
| Reaver | DB -10, CR -2 |
| River Troll | DB -4 |
| Rumellor | CR -2 |
| Salamander | CR -2 |
| Salamaxis | CR -2 |
| Sand Serpent | DB -1 |
| Seraphim | DB -8, CR -2 |
| Shark | HP -10 |
| Skeleton Champion | DB -3, acrobatics +2, athletics +2, climbing +2, stealth +2 |
| Smilodon | DB -4, CR -1 |
| Snow Troll | DB -6 |
| Somnichan | DB -6, Ref +4, Init +20, DR -20, CR -2, acrobatics +4, athletics -4, stealth +4 |
| Spectre | DB -3 |
| Sphinx | DB -5, CR +1 |
| Spider Swarm | DB -1 |
| Storm Crow | DB -6 |
| Succubus | DB -4, Init -10, CR -2 |
| Tenebrax | DB -3, CR -2 |
| Thel | DB -5, Init -10, CR -2 |
| Thornkin | DB -3 |
| Tiger | DB -3, CR -1 |
| Titan | DB -10 |
| Titasuchus | DB -5, CR -1 |
| Triclops | DB -8, CR +1 |
| Vampire | DB -4 |
| Violith | DB -1, CR -2 |
| Virtue | DB -3, CR -2 |
| Vrock | DB -6, CR -2 |
| Waarg | DB -2, HP -10 |
| Water | CR -2 |
| Water Primal - Dropp | HP -28, CR -2 |
| Water Primal - Synarmi | Will +1, Init +5, HP -36, CR -2, nature +1, perception +1, planes +1, survival +1 |
| Water Primal - Tydal | CR -2 |
| Water Primal - Waive | CR -2 |
| Werebat | DB -1 |
| Werebear | DB -3 |
| Wereboar | DB -2 |
| Werecat | DB -5 |
| Wererat | DB -1, culture -2 |
| Wereraven | DB -3 |
| Werewolf | DB -2 |
| Wight | DB -3 |
| Wolf | DB -1, HP -4 |
| Wood Golem | CR -4 |
| Wraith | DB -5 |
| Wrathmorta | DB -6, CR -2 |
| Wulve | DB -2, HP -8 |
| Wysp | DB -3 |
| Xort | stealth +2 |
| Yulussil | CR -2 |
| Zylar | DB -4 |
