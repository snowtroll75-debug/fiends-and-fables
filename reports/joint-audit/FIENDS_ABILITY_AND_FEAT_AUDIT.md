# Fiends & Fables Prime — ability and feat audit

Joint audit, 18 November 2026. Fiends 0.46.0, Codex 0.2.0, core 3.698.4.

## What was checked

Each ability that reaches a published creature was checked from three sides:

1. **Where its automation comes from at runtime.** Core `codex-inheritance.mjs` merges `flags.trg-prime` from the first entry with the same base name, searching core `creature-abilities`, then core `abilities`, then each federated sourcebook. The entry's own keys win the merge. An item with `codexInherit: false` opts out.
2. **Whether the same benefit can arrive twice.** That would happen if the same AE, damage packet, grant, resource use, feat benefit, handler or trigger were declared both on the item and by another owner.
3. **What a player sees when the ability is used.** Automated: core runs the declared mechanism. Card: Use posts the cost and outcome. Manual: the GM resolves it, and the item says so. Text: a passive note with nothing to resolve.

## Abilities pack (190 items)

| Classification | Items |
|---|---|
| Automated (declared mechanism core runs) | 61 |
| Card (Use posts cost/outcome) | 37 |
| Manual (GM resolves; flagged) | 53 |
| Text / passive note | 39 |

| Automation source | Items |
|---|---|
| Inherits core (same base name) | 59 |
| Own declarations (Fiends) | 43 |
| None (card, manual or text) | 87 |
| Inherits Inner Tempest (High Magic, compatible subset) | 1 |

No double application was found:

- **Shared names (50).** Core inheritance supplies the mechanism. The Fiends copy adds only creature-specific keys, such as printed traits, a printed area or a reaction profile, and the merge keeps those. There is no second effect and no second handler.
- **Dragon breaths (24 embedded).** These were overridden by Inner Tempest's same-named breaths when Inner Tempest was installed. That was a conflict, not a duplicate, and FF-13 makes the Fiends data authoritative.
- **Scaly Resilience.** The feat is core-owned; the Fiends conditionals are empty, so the save bonus and halving apply once.
- **Template-granted abilities.** Templates record what they add, and removal deletes only those items. FF-16 removed the stray marks that let a removal reach items the template did not add.
- **Grant passes.** A printed-range sense such as "Darkvision (60 ft.)" can be re-granted generically next to itself (CO-01, fixed in core 3.699.0). This is the one runtime duplicate path found, and it lies in core.

Embedded-only abilities: 196 names, 1,264 copies. These are creature-specific abilities printed in the blocks and embedded on the actors. 116 carry their own core declarations. 80 are text cards (238 copies), mostly descriptive traits and unique once-off powers. Senses and other generic abilities with a printed range, such as "Darkvision (70 ft.)" and "Scent (55 ft.)", also inherit core's declarations by base name.

## Feats (Chapter 3 pack: 3)

| Feat | Implementation | Owner | Status |
|---|---|---|---|
| Nirvanic Familiar | Use draws a Cherubim from the creature compendium as the familiar (`feats-framework.mjs`) | Fiends | Correct; no core duplicate |
| Abyssal Familiar | Use draws a Quasit | Fiends | Correct |
| Scaly Resilience | Core 3.632+ (dragon breath reaction: +1 save, half damage); Fiends conditionals cleared | Core | Correct; single source |

The 86 creature feat items with an empty "featNote" effect are cosmetic, and no behaviour depends on them. On the Codex side, published creatures' printed feats are valued by category (CX-07), and the level-progression General feats are credited back (RD-07). The Builder manages only exact catalogue matches, so a parameterised printed feat such as "Weapon Focus (Brawling)" is never replaced by a generic copy.

## Codex/Fiends cross-validation of generic abilities

Codex 0.2.0 maps printed names to Codex components: Tail→Tail Slap, Wing/Wings, Claws→Claw, Unarmed/Fist→Unarmed Strike, Snow Vision→Snowvision, called auras such as Freezing Aura→Elemental Aura, and printed ranges by base name. Anything that cannot be mapped stays on the creature unchanged and is listed as unresolved in its DP ledger. The most common unresolved items are Rock (16), High Magic (15), Incorporeal (13), Learned Spell Repertoire (8), Dragon Advancement (24 across 3 tiers), Breath Weapon (7), Luna Frenzy, Shift Form and Animal Empathy (7 each). None is changed by the Codex.

## Abilities pack: full list

| Ability | Type | Creatures using it | Automation source | Classification | Declared mechanisms |
|---|---|---|---|---|---|
| Absorb Minerals | ability | 1 | inherits core | Manual (GM resolves) | — |
| Abyssal Healing | ability | 9 | inherits core | Automated (declared mechanism) | activation, action |
| Air Blast Magic | ability | 4 | own declarations | Card (Use posts cost/outcome) | activation |
| Alien Mind | ability | 1 | inherits core | Automated (declared mechanism) | derives |
| All Metamagic Feats | ability | 1 | none | Manual (GM resolves) | — |
| Amorphous Split | ability | 1 | inherits core | Automated (declared mechanism) | action |
| Aquatic | ability | 4 | none | Text / passive note | — |
| Arcadian Caster | ability | 5 | inherits core | Automated (declared mechanism) | derives |
| Arcane Lich Spell Repertoire | ability | 1 | none | Manual (GM resolves) | — |
| Ashen Aura | ability | 2 | inherits core | Automated (declared mechanism) | auras |
| Aura of Ashes | ability | 1 | own declarations | Automated (declared mechanism) | auras |
| Aura of Confusion | ability | 1 | inherits core | Automated (declared mechanism) | auras |
| Aura of Death | ability | 4 | inherits core | Automated (declared mechanism) | auras |
| Aura of Fire | ability | 1 | inherits core | Automated (declared mechanism) | auras |
| Aura of Heat | ability | 1 | inherits core | Automated (declared mechanism) | auras |
| Aura of Ruin | ability | 1 | inherits core | Automated (declared mechanism) | auras |
| Aura of Tranquillity | ability | 0 | own declarations | Card (Use posts cost/outcome) | activation |
| Aureate Resonance | ability | 1 | own declarations | Automated (declared mechanism) | auras |
| Banshee Wail | ability | 2 | none | Manual (GM resolves) | — |
| Blightborn Spell Repertoire | ability | 1 | own declarations | Card (Use posts cost/outcome) | activation |
| Blindsight (55 ft.) | ability | 2 | inherits core | Automated (declared mechanism) | derives |
| Blindsight 30 ft | ability | 2 | inherits core | Automated (declared mechanism) | derives |
| Blood Scent | ability | 2 | inherits core | Automated (declared mechanism) | derives |
| Camouflage | ability | 1 | own declarations | Automated (declared mechanism) | conditionals |
| Caustic Blood | ability | 2 | inherits core | Automated (declared mechanism) | derives |
| Caustic Strikes | ability | 0 | inherits core | Automated (declared mechanism) | derives |
| Cave Dragon Species | ability | 0 | none | Text / passive note | — |
| Celestial Flight | ability | 1 | none | Manual (GM resolves) | — |
| Cloud Weaving | ability | 1 | none | Manual (GM resolves) | — |
| Cold Dragon Species | ability | 0 | none | Text / passive note | — |
| Coldfire Aura | ability | 1 | own declarations | Automated (declared mechanism) | auras |
| Constrict | ability | 6 | inherits core | Automated (declared mechanism) | activation, action |
| Corrode | ability | 1 | inherits core | Automated (declared mechanism) | derives |
| Darkness Unleashed | ability | 1 | none | Manual (GM resolves) | — |
| Deafening Screech | ability | 1 | none | Text / passive note | — |
| Dispelling Strike | ability | 1 | inherits core | Automated (declared mechanism) | afterStrikes, activation |
| Dragon Age & Level Advancement | ability | 0 | none | Text / passive note | — |
| Dream Weave Breath | ability | 1 | none | Manual (GM resolves) | — |
| Dual Minds | ability | 1 | none | Text / passive note | — |
| Earth Drake Breath | ability | 1 | own declarations | Card (Use posts cost/outcome) | activation |
| Earth Glide | ability | 4 | none | Manual (GM resolves) | — |
| Earthbound | ability | 4 | none | Manual (GM resolves) | — |
| Earthquake Stomp | ability | 1 | own declarations | Automated (declared mechanism) | area |
| Eclipse Spell Repertoire | ability | 1 | own declarations | Card (Use posts cost/outcome) | activation |
| Efreet Shifting | ability | 1 | own declarations | Card (Use posts cost/outcome) | activation |
| Electricity Breath | ability | 1 | none | Text / passive note | — |
| Elemental Grasp | ability | 4 | inherits core | Automated (declared mechanism) | derives |
| Elusive Movement | ability | 5 | inherits core | Automated (declared mechanism) | derives |
| Emit Spores | ability | 1 | own declarations | Card (Use posts cost/outcome) | activation |
| Enchanting Touch | ability | 1 | none | Manual (GM resolves) | — |
| Endless Hunger | ability | 1 | inherits core | Manual (GM resolves) | — |
| Entangling Vines | ability | 3 | inherits core | Automated (declared mechanism) | activation, area |
| Envelop | ability | 1 | none | Text / passive note | — |
| Essence Attacks | ability | 1 | none | Text / passive note | — |
| Ether Leap | ability | 1 | none | Text / passive note | — |
| Fast Healing | ability | 1 | none | Manual (GM resolves) | — |
| Fear of Water | ability | 1 | inherits core | Manual (GM resolves) | — |
| Fiery Aura | ability | 1 | inherits core | Automated (declared mechanism) | auras |
| Fiery Blood | ability | 2 | inherits core | Automated (declared mechanism) | derives |
| Fiery Grasp | ability | 1 | inherits core | Automated (declared mechanism) | derives |
| Filth Fever | ability | 2 | none | Text / passive note | — |
| Fire Breath | ability | 1 | none | Manual (GM resolves) | — |
| Fire Dragon Species | ability | 0 | none | Text / passive note | — |
| Flame Drake Breath | ability | 1 | own declarations | Card (Use posts cost/outcome) | activation |
| Foresight Gaze | ability | 3 | none | Text / passive note | — |
| Forest Dragon Species | ability | 0 | none | Text / passive note | — |
| Forge Fire | ability | 1 | own declarations | Card (Use posts cost/outcome) | activation |
| Freezing Aura | ability | 3 | inherits core | Automated (declared mechanism) | auras |
| Freezing Blood | ability | 1 | inherits core | Automated (declared mechanism) | derives |
| Frill Display | ability | 1 | own declarations | Automated (declared mechanism) | activation, area |
| Frost Drake Breath | ability | 1 | own declarations | Card (Use posts cost/outcome) | activation |
| Frostsnarl Spell Repertoire | ability | 1 | own declarations | Card (Use posts cost/outcome) | activation |
| Garlic Breath | ability | 1 | none | Manual (GM resolves) | — |
| Garlic Repulsion | ability | 1 | inherits core | Automated (declared mechanism) | derives |
| Gleam-Dart Escape | ability | 1 | none | Manual (GM resolves) | — |
| Guardian Dragon Species | ability | 0 | none | Text / passive note | — |
| Guardian Luck | ability | 0 | none | Manual (GM resolves) | — |
| High Magic | ability | 15 | inherits Inner Tempest | Manual (GM resolves) | — |
| Horn of Purity | ability | 1 | own declarations | Card (Use posts cost/outcome) | activation |
| Hover | ability | 15 | inherits core | Automated (declared mechanism) | derives |
| Howl | ability | 1 | inherits core | Automated (declared mechanism) | activation, area |
| Huanling Shifting | ability | 1 | own declarations | Card (Use posts cost/outcome) | activation |
| Huanling Spell Repertoire | ability | 1 | own declarations | Card (Use posts cost/outcome) | activation |
| Huanling Venom | affliction | 1 | own declarations | Card (Use posts cost/outcome) | activation |
| Incorporeal | ability | 13 | none | Manual (GM resolves) | — |
| Iron Golem Breath | ability | 1 | own declarations | Card (Use posts cost/outcome) | activation |
| Irritating Glamour | ability | 1 | none | Manual (GM resolves) | — |
| Keen Sight | ability | 3 | none | Text / passive note | — |
| Learned Spell Repertoire | ability | 8 | none | Text / passive note | — |
| Learned Spell Repertoire | ability | 8 | none | Text / passive note | — |
| Life Drain | ability | 4 | inherits core | Automated (declared mechanism) | afterStrikes, activation |
| Life Sense | ability | 27 | inherits core | Automated (declared mechanism) | derives |
| Light Dragon Species | ability | 0 | none | Text / passive note | — |
| Lightning Strike | ability | 2 | none | Manual (GM resolves) | — |
| Luminous Aura | ability | 1 | none | Manual (GM resolves) | — |
| Magic Dispelling | ability | 10 | inherits core | Automated (declared mechanism) | action |
| Magpie | ability | 1 | none | Text / passive note | — |
| Mandibles | ability | 1 | none | Text / passive note | — |
| Marshlight Spell Repertoire | ability | 1 | own declarations | Card (Use posts cost/outcome) | activation |
| Medusa Arcane Repertoire | ability | 1 | none | Text / passive note | — |
| Mindless | ability | 1 | none | Manual (GM resolves) | — |
| Molten Blood | ability | 1 | own declarations | Card (Use posts cost/outcome) | activation |
| Morphic Camouflage | ability | 1 | none | Manual (GM resolves) | — |
| Mountain's Wrath | ability | 1 | own declarations | Card (Use posts cost/outcome) | activation |
| Mucus Cloud | ability | 2 | own declarations | Card (Use posts cost/outcome) | activation |
| Natural Camouflage | ability | 2 | inherits core | Automated (declared mechanism) | conditionals |
| Nature's Power | ability | 1 | none | Text / passive note | — |
| Necrotic Spew | ability | 1 | own declarations | Card (Use posts cost/outcome) | activation |
| Nightray Breath | ability | 1 | own declarations | Card (Use posts cost/outcome) | activation |
| Nimble Escape | ability | 2 | own declarations | Card (Use posts cost/outcome) | activation |
| Paralytic Touch | ability | 1 | none | Manual (GM resolves) | — |
| Paralytic Venom | ability | 4 | none | Text / passive note | — |
| Pegasus Spell Repertoire | ability | 1 | none | Text / passive note | — |
| Petrifying Bite | ability | 1 | none | Text / passive note | — |
| Petrifying Breath | ability | 1 | own declarations | Card (Use posts cost/outcome) | activation |
| Petrifying Gaze | ability | 2 | none | Manual (GM resolves) | — |
| Phase | ability | 1 | none | Manual (GM resolves) | — |
| Phasmus Telepathy | ability | 1 | none | Text / passive note | — |
| Phylactery of Eternal Resurgence | ability | 1 | none | Manual (GM resolves) | — |
| Pixie Bow Casting | ability | 1 | none | Text / passive note | — |
| Plant Critical Immunity | ability | 1 | none | Text / passive note | — |
| Plant Resistance | ability | 1 | inherits core | Automated (declared mechanism) | derives |
| Prankster’s Cruelty | ability | 1 | none | Manual (GM resolves) | — |
| Reborn from the Ashes | ability | 1 | none | Text / passive note | — |
| Reflective Scales | ability | 1 | inherits core | Automated (declared mechanism) | activation, derives |
| Regeneration | ability | 9 | inherits core | Automated (declared mechanism) | derives |
| Regeneration 10 (Acid/Fire) | ability | 1 | none | Manual (GM resolves) | — |
| Regeneration 11 (Acid/Fire) | ability | 1 | none | Manual (GM resolves) | — |
| Regeneration 13 (Acid/Fire) | ability | 1 | none | Manual (GM resolves) | — |
| Regeneration 15 (Cold/Evil) | ability | 0 | none | Text / passive note | — |
| Regeneration 7 (Acid/Fire) | ability | 1 | none | Manual (GM resolves) | — |
| Regeneration 8 (Acid/Fire) | ability | 2 | none | Manual (GM resolves) | — |
| Regeneration 8 (Moonlight only) | ability | 2 | none | Manual (GM resolves) | — |
| Regeneration 9 (Acid/Fire) | ability | 1 | none | Manual (GM resolves) | — |
| Rend | ability | 4 | inherits core | Automated (declared mechanism) | activation, action |
| Riddle Master | ability | 1 | none | Manual (GM resolves) | — |
| Scorching Breath | ability | 0 | inherits core | Card (Use posts cost/outcome) | activation |
| Screech | ability | 1 | own declarations | Card (Use posts cost/outcome) | activation |
| Sea Dragon Species | ability | 0 | none | Text / passive note | — |
| Shade Dragon Species | ability | 0 | none | Text / passive note | — |
| Shadow Breath | ability | 0 | inherits core | Card (Use posts cost/outcome) | activation |
| Shadow Hand | ability | 5 | inherits core | Automated (declared mechanism) | afterStrikes, activation |
| Shadow Touch | ability | 2 | none | Manual (GM resolves) | — |
| Shadowthorn Spell Repertoire | ability | 1 | own declarations | Card (Use posts cost/outcome) | activation |
| Shifting Aura | ability | 1 | own declarations | Automated (declared mechanism) | auras |
| Shocking Aura | ability | 1 | inherits core | Automated (declared mechanism) | auras |
| Shocking Blood | ability | 1 | inherits core | Automated (declared mechanism) | derives |
| Silent Glide | ability | 1 | none | Manual (GM resolves) | — |
| Slime | affliction | 2 | own declarations | Card (Use posts cost/outcome) | activation |
| Slow (I) | ability | 1 | inherits core | Automated (declared mechanism) | derives |
| Smoke Form | ability | 3 | inherits core | Automated (declared mechanism) | derives |
| Smokevision | ability | 14 | inherits core | Automated (declared mechanism) | derives |
| Snake Venom | ability | 4 | none | Manual (GM resolves) | — |
| Sonar Sense | ability | 2 | inherits core | Automated (declared mechanism) | activation, derives |
| Sonic Moan | ability | 1 | inherits core | Automated (declared mechanism) | activation, area |
| Soul Eclipse | ability | 1 | none | Manual (GM resolves) | — |
| Spider Bites | ability | 1 | none | Manual (GM resolves) | — |
| Spider Venom | ability | 4 | none | Text / passive note | — |
| Spiteful Strike | ability | 1 | none | Manual (GM resolves) | — |
| Statue | ability | 2 | none | Text / passive note | — |
| Stone Golem Breath | ability | 1 | own declarations | Card (Use posts cost/outcome) | activation |
| Storm Drake Breath | ability | 1 | own declarations | Card (Use posts cost/outcome) | activation |
| Storm of Claws | ability | 1 | none | Manual (GM resolves) | — |
| Suffocate | ability | 2 | none | Manual (GM resolves) | — |
| Swarm | ability | 4 | none | Text / passive note | — |
| Swimby Attack | ability | 4 | inherits core | Automated (declared mechanism) | activation, compound |
| Tear Flesh | ability | 2 | inherits core | Automated (declared mechanism) | activation, action |
| Telepathy 100 ft | ability | 9 | inherits core | Text / passive note | — |
| Thorny Defence | ability | 1 | none | Manual (GM resolves) | — |
| Thunder Strike | ability | 1 | none | Manual (GM resolves) | — |
| Thundering Strike | ability | 2 | none | Manual (GM resolves) | — |
| Torrent of Strikes | ability | 1 | inherits core | Automated (declared mechanism) | activation, compound |
| Uncanny Balance | ability | 1 | own declarations | Automated (declared mechanism) | conditionals |
| Undead Spawn | ability | 5 | inherits core | Automated (declared mechanism) | derives |
| Unicorn Spell Repertoire | ability | 1 | own declarations | Card (Use posts cost/outcome) | activation |
| Universal Divinity Repertoire | ability | 1 | none | Manual (GM resolves) | — |
| Venomous Blood | ability | 0 | none | Manual (GM resolves) | — |
| Verdant Repertoire (Lustrian Khrissk) | ability | 1 | none | Manual (GM resolves) | — |
| Vibration Sense | ability | 6 | inherits core | Automated (declared mechanism) | derives |
| Violet Spore | ability | 2 | none | Text / passive note | — |
| Vorpal Weapons | ability | 1 | inherits core | Automated (declared mechanism) | derives |
| Wail of the Departed | ability | 0 | own declarations | Automated (declared mechanism) | activation, area |
| Water Glide | ability | 3 | inherits core | Card (Use posts cost/outcome) | activation |
| Wind Lash | ability | 1 | own declarations | Card (Use posts cost/outcome) | activation |
| Wind Rider | ability | 1 | own declarations | Card (Use posts cost/outcome) | activation |
| Wing Buffet | ability | 13 | inherits core | Automated (declared mechanism) | activation, area |
| Wyvern Venom | affliction | 1 | none | Text / passive note | — |
| Xort Defence | ability | 1 | own declarations | Card (Use posts cost/outcome) | activation |
| Xort Shifting | ability | 1 | own declarations | Card (Use posts cost/outcome) | activation |
| Zombie Plague | ability | 1 | none | Manual (GM resolves) | — |

## Embedded-only abilities

| Embedded ability (name as printed) | Copies | Core declarations carried |
|---|---|---|
| Nightvision (140 ft.) | 242 | creatureAbility |
| Darkvision (70 ft.) | 203 | creatureAbility |
| Scent (55 ft.) | 80 | creatureAbility |
| Eternal Essence | 47 | creatureAbility |
| Survival Instinct | 47 | creatureAbility |
| Monstrous Grab | 43 | — (text card) |
| Source Stat Calibration | 36 | — (text card) |
| Dragon Advancement (Base +12) | 24 | — (text card) |
| Tremorsense (25 ft.) | 22 | creatureAbility |
| Spell Resilience | 22 | creatureAbility |
| Flyby Attack | 21 | creatureAbility |
| Frightful Aura | 19 | creatureAbility, auras |
| Acute Sense (Smell) | 18 | conditionals |
| Eternal Summons | 18 | creatureAbility |
| Draconic Assault | 15 | creatureAbility |
| Keen Sense | 13 | creatureAbility, conditionals |
| Aura of Despair | 11 | creatureAbility, auras |
| Pack Attack | 11 | — (text card) |
| Souldrinker | 10 | creatureAbility |
| Shadowy | 8 | creatureAbility |
| Pouncing Assault | 8 | creatureAbility |
| Draconic Shifting | 7 | creatureAbility |
| Swallow | 7 | creatureAbility |
| Breath Weapon | 7 | creatureAbility |
| Animal Empathy | 7 | — (text card) |
| Luna Frenzy | 7 | creatureAbility |
| Lycanthropic Curse | 7 | creatureAbility |
| Shift Form | 7 | creatureAbility |
| Wise Skills | 6 | — (text card) |
| Fearful Strength | 6 | creatureAbility |
| Trample | 6 | — (text card) |
| Penetrating Strikes | 6 | creatureAbility |
| Powerful Charge | 6 | creatureAbility |
| Ice Climb | 5 | creatureAbility |
| Skill Focus (Search) | 5 | — (text card) |
| Whirlpool | 5 | creatureAbility, auras |
| Fiery Death | 5 | creatureAbility |
| Natural Leaper | 5 | creatureAbility |
| Ice Stride | 5 | creatureAbility |
| Sunlight Weakness | 4 | creatureAbility |
| Verdant Caster Repertoire | 4 | — (text card) |
| Secondary Critical | 4 | creatureAbility |
| Returned Essence | 4 | — (text card) |
| Soak | 4 | creatureAbility |
| Cold Dragon Spell Repertoire | 3 | — (text card) |
| Cold Dragon Breath | 3 | creatureAbility, codexInherit |
| Monstrous Knockdown | 3 | — (text card) |
| Detect Magic | 3 | conditionals, untrainedActions |
| Regeneration 20 (Evil) | 3 | creatureAbility |
| Fire Dragon Spell Repertoire | 3 | — (text card) |
| Fire Dragon Breath | 3 | creatureAbility, codexInherit |
| Echolocation (120 ft.) | 3 | creatureAbility |
| Diving Strike | 3 | creatureAbility |
| Drink Blood | 3 | creatureAbility |
| Wild Shape | 3 | classAbility |
| Forest Dragon Spell Repertoire | 3 | — (text card) |
| Forest Dragon Breath | 3 | creatureAbility, codexInherit |
| Sea Dragon Spell Repertoire | 3 | — (text card) |
| Sea Dragon Breath | 3 | creatureAbility, codexInherit |
| Cave Dragon Breath | 3 | creatureAbility, codexInherit |
| Cave Dragon Spell Repertoire | 3 | — (text card) |
| Shade Dragon Spell Repertoire | 3 | — (text card) |
| Shade Dragon Breath | 3 | creatureAbility, codexInherit |
| Light Dragon Spell Repertoire | 3 | — (text card) |
| Light Dragon Breath | 3 | creatureAbility, codexInherit |
| Crush | 3 | creatureAbility |
| Guardian Dragon Spell Repertoire | 3 | — (text card) |
| Guardian Dragon Breath | 3 | creatureAbility, codexInherit |
| Snow Vision | 2 | creatureAbility |
| Sneak Attack (6d6) | 2 | classAbility |
| Faultless Casting | 2 | creatureAbility |
| Whirlwind | 2 | creatureAbility, auras |
| Change Shape | 2 | creatureAbility |
| Soul Feed | 2 | — (text card) |
| Wild Empathy | 2 | classAbility, conditionals |
| Acidic Spittle | 2 | creatureAbility |
| Surge of Speed | 2 | creatureAbility |
| Undead Fortitude | 2 | creatureAbility |
| Form Weapon | 2 | — (text card) |
| Carrion Feast | 2 | creatureAbility |
| Ghoul Fever | 2 | creatureAbility |
| Draconic Roar | 2 | creatureAbility |
| Gallop | 2 | — (text card) |
| Watery Blast | 2 | creatureAbility |
| Ethereal Caster Repertoire | 2 | — (text card) |
| Nocturnus Soul Damage | 1 | — (text card) |
| Source Stat Calibration — Ape HP | 1 | — (text card) |
| Rat Bites | 1 | creatureAbility |
| Skewering Strikes | 1 | creatureAbility |
| Paralysing Gaze | 1 | — (text card) |
| Queldor Soul Damage | 1 | — (text card) |
| Luminous Glow | 1 | creatureAbility |
| Corruption | 1 | afterStrikes |
| Desperation Frenzy | 1 | — (text card) |
| Calming Aura | 1 | creatureAbility, auras |
| Air Primal - Briez Form | 1 | — (text card) |
| Archangel Aura | 1 | auras |
| Form Weapon, Greater | 1 | — (text card) |
| Smilodon Source Stat Calibration | 1 | — (text card) |
| Azur Aura | 1 | auras |
| Smithing Specialty | 1 | — (text card) |
| Skilled | 1 | — (text card) |
| Bonus Feat | 1 | — (text card) |
| Versatile | 1 | — (text card) |
| Lich Template | 1 | — (text card) |
| Fire Primal - Intheno Form | 1 | — (text card) |
| Earth Primal - Stown Form | 1 | — (text card) |
| Mummy Rot | 1 | creatureAbility |
| Source Stat Calibration — Barghest Will | 1 | — (text card) |
| Quasit Shifting | 1 | creatureAbility |
| Quasit Venom | 1 | creatureAbility, poison |
| Ettin Source Stat Calibration | 1 | — (text card) |
| True Caster | 1 | — (text card) |
| Aura of Command | 1 | auras |
| Storm of Blades | 1 | creatureAbility |
| Painful Truth | 1 | creatureAbility |
| No Form | 1 | — (text card) |
| Xithra | 1 | creatureAbility |
| Double Strike | 1 | creatureAbility |
| Necrotic Scream | 1 | creatureAbility |
| Soul Harvest | 1 | creatureAbility |
| Fast Healing 1 | 1 | — (text card) |
| Mite Bites | 1 | — (text card) |
| Source Stat Calibration — Ankheg Queen HP | 1 | — (text card) |
| Nightray Spell Repertoire | 1 | — (text card) |
| Earth Primal - Maoton Form | 1 | — (text card) |
| Enduring Reserves | 1 | creatureAbility |
| Harmonize | 1 | creatureAbility |
| Inspiring Aura | 1 | auras |
| Relentless Pursuit | 1 | — (text card) |
| Unstoppable Force | 1 | creatureAbility |
| Reaver Blade | 1 | — (text card) |
| Reaver Soul Damage | 1 | — (text card) |
| Air Primal - Stourm Form | 1 | — (text card) |
| Arcane Caster Repertoire | 1 | — (text card) |
| Zylar Defence Note | 1 | — (text card) |
| Air Primal - Tempast Form | 1 | — (text card) |
| Draeglir Vyair Spell Repertoire | 1 | — (text card) |
| Fire Healing | 1 | — (text card) |
| Grave-Touched Presence | 1 | — (text card) |
| Whispers of the Grave | 1 | — (text card) |
| Grave Touch | 1 | — (text card) |
| Regeneration 5 (Fire) | 1 | creatureAbility |
| Radiant Aura | 1 | creatureAbility, auras |
| Oceanidh Hunter Spell Repertoire | 1 | — (text card) |
| Athach Venom | 1 | creatureAbility, poison |
| Radiant Eyes | 1 | creatureAbility |
| Guardian Aura | 1 | auras |
| Fearful Power | 1 | creatureAbility |
| Bat Bites | 1 | creatureAbility |
| All Round Vision | 1 | creatureAbility |
| Nixie Spell Repertoire | 1 | — (text card) |
| Aura of Seduction | 1 | conditionals |
| Draining Kiss | 1 | creatureAbility |
| Embrace | 1 | creatureAbility |
| Dusty Haze | 1 | — (text card) |
| Sprint | 1 | creatureAbility |
| Lion Source Stat Calibration | 1 | — (text card) |
| Source Stat Calibration — Belkar Storm Lord HP | 1 | — (text card) |
| Source Stat Calibration — Belkar Storm Lord Fortitude | 1 | — (text card) |
| Fire Primal - Pyroclas Form | 1 | — (text card) |
| Earth Primal - Pebbal Form | 1 | — (text card) |
| Fear of Healing | 1 | creatureAbility |
| Reactive Slime | 1 | creatureAbility |
| Source Stat Calibration: War Horse HP | 1 | — (text card) |
| Earth Primal - Aerph Form | 1 | — (text card) |
| Regeneration 16 (Evil) | 1 | creatureAbility |
| Seraphim Aura | 1 | auras |
| Water Primal - Dropp Form | 1 | — (text card) |
| Blight Sense (40 ft.) | 1 | creatureAbility |
| Aura of Decay | 1 | creatureAbility, auras |
| Shambler Defences | 1 | — (text card) |
| Regeneration 6 (Fire) | 1 | creatureAbility |
| Water Primal - Tydal Form | 1 | — (text card) |
| Earth Pass | 1 | creatureAbility |
| Slowing Breath | 1 | creatureAbility |
| Stench | 1 | creatureAbility, auras |
| Air Primal - Gayl Form | 1 | — (text card) |
| Fire Primal - Flaim Form | 1 | — (text card) |
| Water Primal - Waive Form | 1 | — (text card) |
| Mortivor Soul Damage | 1 | — (text card) |
| Aura of Flames | 1 | creatureAbility, auras |
| Reactive Evil | 1 | creatureAbility |
| Death Throes | 1 | creatureAbility |
| Raven Beaks | 1 | creatureAbility |
| Regeneration 12 (Fire) | 1 | creatureAbility |
| Draeglir Tyel Spell Repertoire | 1 | — (text card) |
| Fire Primal - Emba Form | 1 | — (text card) |
| Nimblespring Spell Repertoire | 1 | — (text card) |
| Cloud of Spores | 1 | creatureAbility |
| Dance of Ruin | 1 | creatureAbility |
| Stunning Screech | 1 | creatureAbility |
| Water Primal - Synarmi Form | 1 | — (text card) |
| Reactive Disarm | 1 | creatureAbility |
| Aura of Paranoia | 1 | auras |
| Aura of Tranquility | 1 | creatureAbility |
