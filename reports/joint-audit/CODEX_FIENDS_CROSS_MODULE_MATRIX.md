# Codex / Fiends & Fables — cross-module duplication matrix

Joint audit, 18 November 2026. Core 3.698.4, Codex 0.1.5 → 0.2.0, Fiends & Fables Prime 0.45.2 → 0.46.0.

Everything here was compared on mechanics: effect changes, `flags.trg-prime` automation declarations, system fields and embedded effects, after normalising Foundry's v13/v14 effect formats. Names were used only to find candidate pairs; nothing was merged because two names matched. Defect IDs refer to `CODEX_FIENDS_DEFECT_REGISTER.md`.

## Ownership rule applied

| Layer | Owner | Meaning in practice |
|---|---|---|
| System mechanics: derivation, attacks, damage packets, defences, conditions, grants, Focus/PP, inheritance | **Core** | Modules declare data that core reads; they never re-implement a core calculation. |
| Creature construction: types, classes, generic abilities, natural attacks, DP/XPM/EL, the Builder | **Codex** | The Codex reuses core documents; its own copies must equal core's. |
| Published actors, unique abilities, races and heritages, variants, templates, feats, art | **Fiends** | Creature-specific data overrides generic data on that creature only. |

## A. Feature groups

| Feature | Codex reference | Fiends reference | Rules source | Mechanical comparison | Duplicate status | Owner | Repair | Dependencies | Testing | Final status |
|---|---|---|---|---|---|---|---|---|---|---|
| Creature types (12) | `packs/creature-types` (native copies) | Embedded type item on each of 294 actors | Codex 1.6 Part I "Creature Types"; Core | Codex copies = core, except Eternal `noDeathState`. Fiends embedded copies = core, except Undead (missing 8 immunity rows). | Codex: 11 identical, 1 conflicting (Eternal). Fiends: Undead variant (drift); others identical. | Core | FF-01 (Undead rows). CX-01 guards Eternal. RD-01 pending. CO-02 proposed (Ooze precision). | Core type effects; `critImmune` and `cannotBeFlanked` flags | Verifier FF-01; live Mummy; live derivation of 294 actors | Resolved (RD-01 ruled; CO-02 and RD-08 fixed in core 3.699.0; Fiends 0.46.1 and Codex 0.2.1 synced) |
| Creature/NPC classes (16) | `packs/creature-classes` | Embedded class item (Ethereal Caster and Verdant Caster have no core class) | Codex Part I "Creature Classes" | Codex = core for all 16. Fiends embedded = core for all core-named classes. | Identical | Core (Codex copy) / Fiends (Ethereal and Verdant Caster) | None | Core class progression | xmatrix | Resolved |
| Natural attacks (10 generic) | `packs/creature-attacks` | Weapon items on actors (printed names: Tail, Wing, Claws…) | Codex Part II Ch. 8 | Codex = core. Fiends attacks are printed instances with creature-specific damage, so they are equivalent, not duplicates. | Equivalent (printed instances) | Codex/Core generic; Fiends instance | CX-04 aliases, so apply never duplicates | Core creature-attack metadata | Live unchanged apply | Resolved |
| Secondary damage packets | — | 106 weapon riders (0.12.x); dragon Bite; Lich Bony Hand; Ghost Essence Attacks | Fiends 3.0 blocks; Core damage | Core rolls `flags.trg-prime.creatureAttack.secondary`. Framework-generated attacks wrote an unread module flag. | Conflicting (unread duplicate flag) | Core mechanism; Fiends data | FF-10, FF-12 | Core attack workflow | Live: 1d6 cold, 2d8 essence | Resolved |
| Generic creature abilities (Codex 116 / core) | `packs/creature-abilities` | `abilities` pack (190) + 196 embedded-only names | Codex Part II Ch. 8; Fiends 3.0 | Codex copies = core (103 identical; naming splits such as Slow → Slow I/II). Fiends: 50 share a name with core and inherit core, which is a superset; Fiends' own keys survive the merge. | Equivalent (inheritance; no double declaration) | Core | None needed | Core `codex-inheritance.mjs` | Ability audit; battery | Resolved |
| Abilities sharing a name with another sourcebook | — | Cold/Fire/Light Dragon Breath (embedded); High Magic | Inner Tempest | Inner Tempest's dragon breath data replaced Fiends breath areas (15 ft instead of 20 ft) when Inner Tempest was installed. High Magic: Inner Tempest data is a compatible subset. | Conflicting (breaths); compatible (High Magic) | Fiends (breath data) | FF-13: `codexInherit:false` on every published and generated breath | Core inheritance opt-out | Battery A against 2; verifier | Resolved; live recheck owed |
| True dragon breath | — | 24 published breaths; generated breaths | Fiends 3.0 Dragons; Core Focus | Focus trait with blank uses gives 1 use; 0 PP; Refocus restores; core `moduleBreathArea` reads `flags.fiends-and-fables-prime.breath` | Single implementation | Core mechanism; Fiends data | FF-13 | Core Focus, breath area | Live: 0 PP, uses 1→0, 30 HP | Resolved |
| Senses with printed ranges | Codex senses priced by type/ability | "Darkvision (60 ft.)" and similar on actors | Core grants | A type grant re-added a generic sense next to the printed one on any later grant pass. | Duplicate (runtime) | Core | CO-01, fixed in core 3.699.0 | Core grants workflow | Live: Ghost on Ghoul | Resolved (pending install) |
| Races and heritages | Codex prices them as layers (DP Designer) | `races` and `heritages` packs plus embedded copies | Fiends 3.0 | 11 pack items differed from their own creatures' copies. Behir and Cave Bear were wrongly layered. Mite Swarm lacked a row. | Variant (drift) | Fiends | FF-04, FF-05, FF-06, FF-08 | — | Verifier; live Behir and Cave Bear | Resolved |
| Templates (13) | — (the Codex has no templates) | `templates` pack and `template-framework.mjs` | Fiends 3.0 Templates | Transformations apply and reverse; the defects were type replacement, the Mindless trait, unread packets and stray provenance. | — | Fiends | FF-12, FF-14, FF-15, FF-16 | Core ability collapse (Mindless trait), core grants | Live: all 13 on a Goblin, plus Undead-on-Undead cases | Resolved |
| Dragon advancement | — | `dragon-framework.mjs` | Fiends 3.0 Dragon Level Table | Duplicate progression abilities on published dragons | Duplicate (runtime) | Fiends | FF-09 | Core creature-attacks pack | Live: Cold Dragon Talon | Resolved; RD-06 ruled: table (0.46.1) |
| Feats (Chapter 3, 3) | Codex prices feats by category | `feats` pack and `feats-framework.mjs` | Fiends 3.0 Ch. 3; Core feats | Familiar feats draw a compendium creature. Scaly Resilience is core-owned and its Fiends conditionals are cleared. | Single implementation | Fiends (familiars), Core (Scaly Resilience) | None | Core feats workflow | Ability audit | Resolved |
| Ammunition | — | Creature crossbows and bows | Core weapons | Crossbow group/family did not match core's ammunition fit | Conflicting | Fiends (data) | FF-07 | Core `compatibleWeaponGroup` | Verifier; live archer | Resolved |
| Builder variants of published creatures | `foundry-adapter.mjs`, `fiends-adapter.mjs` | Compendium actors | Codex Part II | The Builder could not read printed names or provisional DP and had no variant path | — | Codex | CX-03, CX-04, CX-05, CX-06, CX-07 | Fiends compendium (optional) | Live import, apply and guard; 8 Node tests | Resolved |
| DP valuation | `dp.mjs` | — | Codex Part II | Codex-built ledgers unchanged; imported ledgers provisional | — | Codex | CX-05, CX-06, CX-07; RD-07 | — | Node 0.1.5 = 0.2.0 comparison | Resolved (provisional by design) |
| Eternal Death State | Eternal type `noDeathState: true` | Published Eternal (47) keep core | Codex Part II vs Core | Conflicting rule readings | Conflicting | Rules | CX-01 guard | — | Live | Ruled RD-01: no Death State (core 3.699.0) |
| Tiny/Diminutive reach | Builder blocks a mismatched apply | Quasit and others | Codex tables vs Core `SIZE_TABLE` | 5 ft vs 0 | Conflicting | Rules | — | — | Live: Quasit apply blocked | Ruled RD-02: 0 ft (Codex 0.2.1) |

## B. Core / Codex native copies

| Pack | Rows compared | Identical | Differs | Only core | Only Codex |
|---|---|---|---|---|---|
| Creature types | 12 | 11 | 1 (Eternal `noDeathState`) | 0 | 0 |
| Creature classes | 16 | 16 | 0 | 0 | 0 |
| Natural attacks | 10 | 10 | 0 | 0 | 0 |
| Creature abilities | 116 | 103 | 0 | 2 (Slow, Scorching Breath) | 11 (Constrict, Detect Magic, Acute Sense, Pack Attack, Monstrous Grab, Gallop, Monstrous Knockdown, Slow I, Trample, Slow II, Eternal Essence) |

The "only" rows are the same abilities filed in a different core pack (core `abilities`), or the Codex's split of Slow into tiers. None of them is a mechanical conflict. Scorching Breath has its own Codex ID (Codex 0.1.0).

## C. Embedded types and classes on the 294 Fiends actors

| Type | Actors | Matches core 3.698.4 |
|---|---|---|
| Animal 50, Humanoid 47, Eternal 47, Elemental 34, Wyrm 30, Beast 25, Fey 12, Construct 11, Ooze 6, Plant 6, Aberration 5 | 273 | Yes |
| Undead | 21 | Repaired in 0.46.0 (FF-01) |

Classes: every core-named class on every actor matches core. Ethereal Caster (1) and Verdant Caster (6) are Fiends classes with no core equivalent; the Codex values them as unresolved, shown openly in the ledger.

## D. Configurations exercised

| Configuration | Shared mechanics | Differences found |
|---|---|---|
| A: all installed modules (Codex, Fiends, Eldritch Arts, Inner Tempest, Pillars of Faith) | Identical to configuration 1 | Breath area 15 ft (Inner Tempest inheritance): FF-13 |
| 1: Core + Codex + Fiends | Reference | — |
| 2: Core + Fiends | Identical | — |
| 3: Core + Codex | Identical (Codex-built creature: HP 90, ledger 162, XPM −0.2) | — |

## Appendix: every Fiends abilities-pack item

"Core counterpart" and "Codex counterpart" show whether an item with the same base name exists there and how it differs mechanically. "Automation source at runtime" shows which declarations core uses after inheritance.

| Fiends ability | Uses on creatures | Core counterpart | Codex counterpart | Automation source at runtime | Classification | Owner |
|---|---|---|---|---|---|---|
| Absorb Minerals | 1 | variant (automation flags) | variant (automation flags) | inherits core | Manual (GM resolves) | Core (inherited) |
| Abyssal Healing | 9 | variant (automation flags) | variant (automation flags) | inherits core | Automated (declared mechanism) | Core (inherited) |
| Air Blast Magic | 4 | — | — | own declarations | Card (Use posts cost/outcome) | Fiends |
| Alien Mind | 1 | variant (automation flags) | variant (automation flags) | inherits core | Automated (declared mechanism) | Core (inherited) |
| All Metamagic Feats | 1 | — | — | none | Manual (GM resolves) | Fiends |
| Amorphous Split | 1 | variant (automation flags) | variant (automation flags) | inherits core | Automated (declared mechanism) | Core (inherited) |
| Aquatic | 4 | — | — | none | Text / passive note | Fiends |
| Arcadian Caster | 5 | variant (automation flags, traits) | variant (automation flags, traits) | inherits core | Automated (declared mechanism) | Core (inherited) |
| Arcane Lich Spell Repertoire | 1 | — | — | none | Manual (GM resolves) | Fiends |
| Ashen Aura | 2 | variant (automation flags) | variant (automation flags) | inherits core | Automated (declared mechanism) | Core (inherited) |
| Aura of Ashes | 1 | — | — | own declarations | Automated (declared mechanism) | Fiends |
| Aura of Confusion | 1 | variant (automation flags) | variant (automation flags) | inherits core | Automated (declared mechanism) | Core (inherited) |
| Aura of Death | 4 | variant (automation flags) | variant (automation flags) | inherits core | Automated (declared mechanism) | Core (inherited) |
| Aura of Fire | 1 | variant (automation flags) | variant (automation flags) | inherits core | Automated (declared mechanism) | Core (inherited) |
| Aura of Heat | 1 | variant (automation flags, traits) | variant (automation flags, traits) | inherits core | Automated (declared mechanism) | Core (inherited) |
| Aura of Ruin | 1 | variant (automation flags) | variant (automation flags) | inherits core | Automated (declared mechanism) | Core (inherited) |
| Aura of Tranquillity | 0 | — | — | own declarations | Card (Use posts cost/outcome) | Fiends |
| Aureate Resonance | 1 | — | — | own declarations | Automated (declared mechanism) | Fiends |
| Banshee Wail | 2 | — | — | none | Manual (GM resolves) | Fiends |
| Blightborn Spell Repertoire | 1 | — | — | own declarations | Card (Use posts cost/outcome) | Fiends |
| Blindsight (55 ft.) | 2 | variant (automation flags, traits) | — | inherits core | Automated (declared mechanism) | Core (inherited) |
| Blindsight 30 ft | 2 | variant (automation flags, traits) | — | inherits core | Automated (declared mechanism) | Core (inherited) |
| Blood Scent | 2 | variant (automation flags, traits) | variant (automation flags, traits) | inherits core | Automated (declared mechanism) | Core (inherited) |
| Camouflage | 1 | — | — | own declarations | Automated (declared mechanism) | Fiends |
| Caustic Blood | 2 | — | — | inherits core | Automated (declared mechanism) | Core (inherited) |
| Caustic Strikes | 0 | — | — | inherits core | Automated (declared mechanism) | Core (inherited) |
| Cave Dragon Species | 0 | — | — | none | Text / passive note | Fiends |
| Celestial Flight | 1 | — | — | none | Manual (GM resolves) | Fiends |
| Cloud Weaving | 1 | — | — | none | Manual (GM resolves) | Fiends |
| Cold Dragon Species | 0 | — | — | none | Text / passive note | Fiends |
| Coldfire Aura | 1 | — | — | own declarations | Automated (declared mechanism) | Fiends |
| Constrict | 6 | variant (automation flags, traits) | variant (automation flags, traits) | inherits core | Automated (declared mechanism) | Core (inherited) |
| Corrode | 1 | variant (automation flags) | variant (automation flags) | inherits core | Automated (declared mechanism) | Core (inherited) |
| Darkness Unleashed | 1 | — | — | none | Manual (GM resolves) | Fiends |
| Deafening Screech | 1 | — | — | none | Text / passive note | Fiends |
| Dispelling Strike | 1 | variant (automation flags) | variant (automation flags) | inherits core | Automated (declared mechanism) | Core (inherited) |
| Dragon Age & Level Advancement | 0 | — | — | none | Text / passive note | Fiends |
| Dream Weave Breath | 1 | — | — | none | Manual (GM resolves) | Fiends |
| Dual Minds | 1 | — | — | none | Text / passive note | Fiends |
| Earth Drake Breath | 1 | — | — | own declarations | Card (Use posts cost/outcome) | Fiends |
| Earth Glide | 4 | — | — | none | Manual (GM resolves) | Fiends |
| Earthbound | 4 | — | — | none | Manual (GM resolves) | Fiends |
| Earthquake Stomp | 1 | — | — | own declarations | Automated (declared mechanism) | Fiends |
| Eclipse Spell Repertoire | 1 | — | — | own declarations | Card (Use posts cost/outcome) | Fiends |
| Efreet Shifting | 1 | — | — | own declarations | Card (Use posts cost/outcome) | Fiends |
| Electricity Breath | 1 | — | — | none | Text / passive note | Fiends |
| Elemental Grasp | 4 | variant (automation flags) | variant (automation flags) | inherits core | Automated (declared mechanism) | Core (inherited) |
| Elusive Movement | 5 | variant (automation flags, traits) | variant (automation flags, traits) | inherits core | Automated (declared mechanism) | Core (inherited) |
| Emit Spores | 1 | — | — | own declarations | Card (Use posts cost/outcome) | Fiends |
| Enchanting Touch | 1 | — | — | none | Manual (GM resolves) | Fiends |
| Endless Hunger | 1 | variant (automation flags, traits) | variant (automation flags, traits) | inherits core | Manual (GM resolves) | Core (inherited) |
| Entangling Vines | 3 | variant (automation flags) | variant (automation flags) | inherits core | Automated (declared mechanism) | Core (inherited) |
| Envelop | 1 | — | — | none | Text / passive note | Fiends |
| Essence Attacks | 1 | — | — | none | Text / passive note | Fiends |
| Ether Leap | 1 | — | — | none | Text / passive note | Fiends |
| Fast Healing | 1 | — | — | none | Manual (GM resolves) | Fiends |
| Fear of Water | 1 | variant (automation flags) | variant (automation flags) | inherits core | Manual (GM resolves) | Core (inherited) |
| Fiery Aura | 1 | — | — | inherits core | Automated (declared mechanism) | Core (inherited) |
| Fiery Blood | 2 | — | — | inherits core | Automated (declared mechanism) | Core (inherited) |
| Fiery Grasp | 1 | — | — | inherits core | Automated (declared mechanism) | Core (inherited) |
| Filth Fever | 2 | — | — | none | Text / passive note | Fiends |
| Fire Breath | 1 | — | — | none | Manual (GM resolves) | Fiends |
| Fire Dragon Species | 0 | — | — | none | Text / passive note | Fiends |
| Flame Drake Breath | 1 | — | — | own declarations | Card (Use posts cost/outcome) | Fiends |
| Foresight Gaze | 3 | — | — | none | Text / passive note | Fiends |
| Forest Dragon Species | 0 | — | — | none | Text / passive note | Fiends |
| Forge Fire | 1 | — | — | own declarations | Card (Use posts cost/outcome) | Fiends |
| Freezing Aura | 3 | — | — | inherits core | Automated (declared mechanism) | Core (inherited) |
| Freezing Blood | 1 | — | — | inherits core | Automated (declared mechanism) | Core (inherited) |
| Frill Display | 1 | — | — | own declarations | Automated (declared mechanism) | Fiends |
| Frost Drake Breath | 1 | — | — | own declarations | Card (Use posts cost/outcome) | Fiends |
| Frostsnarl Spell Repertoire | 1 | — | — | own declarations | Card (Use posts cost/outcome) | Fiends |
| Garlic Breath | 1 | — | — | none | Manual (GM resolves) | Fiends |
| Garlic Repulsion | 1 | variant (automation flags) | variant (automation flags) | inherits core | Automated (declared mechanism) | Core (inherited) |
| Gleam-Dart Escape | 1 | — | — | none | Manual (GM resolves) | Fiends |
| Guardian Dragon Species | 0 | — | — | none | Text / passive note | Fiends |
| Guardian Luck | 0 | — | — | none | Manual (GM resolves) | Fiends |
| High Magic | 15 | — | — | inherits Inner Tempest | Manual (GM resolves) | inherits Inner Tempest |
| Horn of Purity | 1 | — | — | own declarations | Card (Use posts cost/outcome) | Fiends |
| Hover | 15 | variant (automation flags, traits) | variant (automation flags, traits) | inherits core | Automated (declared mechanism) | Core (inherited) |
| Howl | 1 | variant (automation flags) | variant (automation flags) | inherits core | Automated (declared mechanism) | Core (inherited) |
| Huanling Shifting | 1 | — | — | own declarations | Card (Use posts cost/outcome) | Fiends |
| Huanling Spell Repertoire | 1 | — | — | own declarations | Card (Use posts cost/outcome) | Fiends |
| Huanling Venom | 1 | — | — | own declarations | Card (Use posts cost/outcome) | Fiends |
| Incorporeal | 13 | — | — | none | Manual (GM resolves) | Fiends |
| Iron Golem Breath | 1 | — | — | own declarations | Card (Use posts cost/outcome) | Fiends |
| Irritating Glamour | 1 | — | — | none | Manual (GM resolves) | Fiends |
| Keen Sight | 3 | — | — | none | Text / passive note | Fiends |
| Learned Spell Repertoire | 8 | — | — | none | Text / passive note | Fiends |
| Learned Spell Repertoire | 8 | — | — | none | Text / passive note | Fiends |
| Life Drain | 4 | variant (automation flags, traits) | variant (automation flags, traits) | inherits core | Automated (declared mechanism) | Core (inherited) |
| Life Sense | 27 | variant (automation flags, traits) | variant (automation flags, traits) | inherits core | Automated (declared mechanism) | Core (inherited) |
| Light Dragon Species | 0 | — | — | none | Text / passive note | Fiends |
| Lightning Strike | 2 | — | — | none | Manual (GM resolves) | Fiends |
| Luminous Aura | 1 | — | — | none | Manual (GM resolves) | Fiends |
| Magic Dispelling | 10 | variant (automation flags, usesPerDay) | variant (automation flags, usesPerDay) | inherits core | Automated (declared mechanism) | Core (inherited) |
| Magpie | 1 | — | — | none | Text / passive note | Fiends |
| Mandibles | 1 | — | — | none | Text / passive note | Fiends |
| Marshlight Spell Repertoire | 1 | — | — | own declarations | Card (Use posts cost/outcome) | Fiends |
| Medusa Arcane Repertoire | 1 | — | — | none | Text / passive note | Fiends |
| Mindless | 1 | — | — | none | Manual (GM resolves) | Fiends |
| Molten Blood | 1 | — | — | own declarations | Card (Use posts cost/outcome) | Fiends |
| Morphic Camouflage | 1 | — | — | none | Manual (GM resolves) | Fiends |
| Mountain's Wrath | 1 | — | — | own declarations | Card (Use posts cost/outcome) | Fiends |
| Mucus Cloud | 2 | — | — | own declarations | Card (Use posts cost/outcome) | Fiends |
| Natural Camouflage | 2 | variant (automation flags, traits) | variant (automation flags, traits) | inherits core | Automated (declared mechanism) | Core (inherited) |
| Nature's Power | 1 | — | — | none | Text / passive note | Fiends |
| Necrotic Spew | 1 | — | — | own declarations | Card (Use posts cost/outcome) | Fiends |
| Nightray Breath | 1 | — | — | own declarations | Card (Use posts cost/outcome) | Fiends |
| Nimble Escape | 2 | — | — | own declarations | Card (Use posts cost/outcome) | Fiends |
| Paralytic Touch | 1 | — | — | none | Manual (GM resolves) | Fiends |
| Paralytic Venom | 4 | — | — | none | Text / passive note | Fiends |
| Pegasus Spell Repertoire | 1 | — | — | none | Text / passive note | Fiends |
| Petrifying Bite | 1 | — | — | none | Text / passive note | Fiends |
| Petrifying Breath | 1 | — | — | own declarations | Card (Use posts cost/outcome) | Fiends |
| Petrifying Gaze | 2 | — | — | none | Manual (GM resolves) | Fiends |
| Phase | 1 | — | — | none | Manual (GM resolves) | Fiends |
| Phasmus Telepathy | 1 | — | — | none | Text / passive note | Fiends |
| Phylactery of Eternal Resurgence | 1 | — | — | none | Manual (GM resolves) | Fiends |
| Pixie Bow Casting | 1 | — | — | none | Text / passive note | Fiends |
| Plant Critical Immunity | 1 | — | — | none | Text / passive note | Fiends |
| Plant Resistance | 1 | variant (automation flags) | variant (automation flags) | inherits core | Automated (declared mechanism) | Core (inherited) |
| Prankster’s Cruelty | 1 | — | — | none | Manual (GM resolves) | Fiends |
| Reborn from the Ashes | 1 | — | — | none | Text / passive note | Fiends |
| Reflective Scales | 1 | variant (automation flags) | variant (automation flags) | inherits core | Automated (declared mechanism) | Core (inherited) |
| Regeneration | 9 | variant (automation flags) | variant (automation flags) | inherits core | Automated (declared mechanism) | Core (inherited) |
| Regeneration 10 (Acid/Fire) | 1 | — | — | none | Manual (GM resolves) | Fiends |
| Regeneration 11 (Acid/Fire) | 1 | — | — | none | Manual (GM resolves) | Fiends |
| Regeneration 13 (Acid/Fire) | 1 | — | — | none | Manual (GM resolves) | Fiends |
| Regeneration 15 (Cold/Evil) | 0 | — | — | none | Text / passive note | Fiends |
| Regeneration 7 (Acid/Fire) | 1 | — | — | none | Manual (GM resolves) | Fiends |
| Regeneration 8 (Acid/Fire) | 2 | — | — | none | Manual (GM resolves) | Fiends |
| Regeneration 8 (Moonlight only) | 2 | — | — | none | Manual (GM resolves) | Fiends |
| Regeneration 9 (Acid/Fire) | 1 | — | — | none | Manual (GM resolves) | Fiends |
| Rend | 4 | variant (automation flags, traits) | variant (automation flags, traits) | inherits core | Automated (declared mechanism) | Core (inherited) |
| Riddle Master | 1 | — | — | none | Manual (GM resolves) | Fiends |
| Scorching Breath | 0 | variant (automation flags, traits) | — | inherits core | Card (Use posts cost/outcome) | Core (inherited) |
| Screech | 1 | — | — | own declarations | Card (Use posts cost/outcome) | Fiends |
| Sea Dragon Species | 0 | — | — | none | Text / passive note | Fiends |
| Shade Dragon Species | 0 | — | — | none | Text / passive note | Fiends |
| Shadow Breath | 0 | variant (automation flags, traits) | variant (automation flags, traits) | inherits core | Card (Use posts cost/outcome) | Core (inherited) |
| Shadow Hand | 5 | variant (automation flags) | variant (automation flags) | inherits core | Automated (declared mechanism) | Core (inherited) |
| Shadow Touch | 2 | — | — | none | Manual (GM resolves) | Fiends |
| Shadowthorn Spell Repertoire | 1 | — | — | own declarations | Card (Use posts cost/outcome) | Fiends |
| Shifting Aura | 1 | — | — | own declarations | Automated (declared mechanism) | Fiends |
| Shocking Aura | 1 | — | — | inherits core | Automated (declared mechanism) | Core (inherited) |
| Shocking Blood | 1 | — | — | inherits core | Automated (declared mechanism) | Core (inherited) |
| Silent Glide | 1 | — | — | none | Manual (GM resolves) | Fiends |
| Slime | 2 | — | — | own declarations | Card (Use posts cost/outcome) | Fiends |
| Slow (I) | 1 | variant (effects, automation flags) | — | inherits core | Automated (declared mechanism) | Core (inherited) |
| Smoke Form | 3 | variant (automation flags) | variant (automation flags) | inherits core | Automated (declared mechanism) | Core (inherited) |
| Smokevision | 14 | variant (automation flags, traits) | variant (automation flags, traits) | inherits core | Automated (declared mechanism) | Core (inherited) |
| Snake Venom | 4 | — | — | none | Manual (GM resolves) | Fiends |
| Sonar Sense | 2 | variant (automation flags) | variant (automation flags) | inherits core | Automated (declared mechanism) | Core (inherited) |
| Sonic Moan | 1 | variant (automation flags, traits) | variant (automation flags, traits) | inherits core | Automated (declared mechanism) | Core (inherited) |
| Soul Eclipse | 1 | — | — | none | Manual (GM resolves) | Fiends |
| Spider Bites | 1 | — | — | none | Manual (GM resolves) | Fiends |
| Spider Venom | 4 | — | — | none | Text / passive note | Fiends |
| Spiteful Strike | 1 | — | — | none | Manual (GM resolves) | Fiends |
| Statue | 2 | — | — | none | Text / passive note | Fiends |
| Stone Golem Breath | 1 | — | — | own declarations | Card (Use posts cost/outcome) | Fiends |
| Storm Drake Breath | 1 | — | — | own declarations | Card (Use posts cost/outcome) | Fiends |
| Storm of Claws | 1 | — | — | none | Manual (GM resolves) | Fiends |
| Suffocate | 2 | — | — | none | Manual (GM resolves) | Fiends |
| Swarm | 4 | — | — | none | Text / passive note | Fiends |
| Swimby Attack | 4 | variant (automation flags) | variant (automation flags) | inherits core | Automated (declared mechanism) | Core (inherited) |
| Tear Flesh | 2 | variant (automation flags, traits) | variant (automation flags, traits) | inherits core | Automated (declared mechanism) | Core (inherited) |
| Telepathy 100 ft | 9 | variant (automation flags, traits) | variant (automation flags, traits) | inherits core | Text / passive note | Core (inherited) |
| Thorny Defence | 1 | — | — | none | Manual (GM resolves) | Fiends |
| Thunder Strike | 1 | — | — | none | Manual (GM resolves) | Fiends |
| Thundering Strike | 2 | — | — | none | Manual (GM resolves) | Fiends |
| Torrent of Strikes | 1 | variant (automation flags) | variant (automation flags) | inherits core | Automated (declared mechanism) | Core (inherited) |
| Uncanny Balance | 1 | — | — | own declarations | Automated (declared mechanism) | Fiends |
| Undead Spawn | 5 | variant (automation flags) | variant (automation flags) | inherits core | Automated (declared mechanism) | Core (inherited) |
| Unicorn Spell Repertoire | 1 | — | — | own declarations | Card (Use posts cost/outcome) | Fiends |
| Universal Divinity Repertoire | 1 | — | — | none | Manual (GM resolves) | Fiends |
| Venomous Blood | 0 | — | — | none | Manual (GM resolves) | Fiends |
| Verdant Repertoire (Lustrian Khrissk) | 1 | — | — | none | Manual (GM resolves) | Fiends |
| Vibration Sense | 6 | variant (automation flags, traits) | variant (automation flags, traits) | inherits core | Automated (declared mechanism) | Core (inherited) |
| Violet Spore | 2 | — | — | none | Text / passive note | Fiends |
| Vorpal Weapons | 1 | variant (automation flags) | variant (automation flags) | inherits core | Automated (declared mechanism) | Core (inherited) |
| Wail of the Departed | 0 | — | — | own declarations | Automated (declared mechanism) | Fiends |
| Water Glide | 3 | variant (automation flags, traits) | variant (automation flags, traits) | inherits core | Card (Use posts cost/outcome) | Core (inherited) |
| Wind Lash | 1 | — | — | own declarations | Card (Use posts cost/outcome) | Fiends |
| Wind Rider | 1 | — | — | own declarations | Card (Use posts cost/outcome) | Fiends |
| Wing Buffet | 13 | variant (automation flags) | variant (automation flags) | inherits core | Automated (declared mechanism) | Core (inherited) |
| Wyvern Venom | 1 | — | — | none | Text / passive note | Fiends |
| Xort Defence | 1 | — | — | own declarations | Card (Use posts cost/outcome) | Fiends |
| Xort Shifting | 1 | — | — | own declarations | Card (Use posts cost/outcome) | Fiends |
| Zombie Plague | 1 | — | — | none | Manual (GM resolves) | Fiends |
