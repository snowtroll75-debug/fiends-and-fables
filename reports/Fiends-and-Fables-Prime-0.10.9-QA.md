# Fiends & Fables Prime 0.10.9 — Final Native Actor Completion QA

**Target:** Foundry VTT 14.365 / TRG Prime 3.320.0  
**Authoritative creature source:** TRG Prime Fiends & Fables 2.7  
**Core reference:** TRG Prime Core 3.2  
**Author-approved allocation baseline:** Fiends & Fables Author Review v0.5  
**Date:** 18 August 2026

## New Actors

- Wererat — Level 2 / EL 1.
- Wereraven — Level 7 / EL 5.
- Werewolf — Level 4 / EL 3.
- Mournkin — Level 6 / EL 5.

This is intentionally a four-creature batch. The author-review inventory reconciles to **294 planned native Actors** plus **13 reusable templates**, with one separately accounted duplicate printing that must not become another Actor. Version 0.10.8 contained 290 creature Actors; these four complete the approved native Actor inventory at **294/294**.

## Lycanthrope completion

The existing reusable **Lycanthrope Race** and the existing transformation Templates are retained. This release adds only the missing worked-stat Heritages and ready-made Actors for Wererat, Wereraven and Werewolf.

### Wererat

- Approved purchased allocation: STR 1, CON 1, DEX 1, INT 1, WIS 1, CHA 1 (6/6).
- Final scores: STR 2, CON 2, DEX 4, INT 0, WIS 3, CHA 0.
- Initiative +35; DB 17; Fort +6, Ref +11, Will +4; HP 65.
- Disease immunity; physical resistance; silver weakness.
- Bite, hybrid-only Claw, Shortsword and Hand Crossbow reproduce the printed attack records.
- Hand Crossbow is a true missile weapon at range 40 and starts with **20 standard bolts**.
- Nimble Dodge and Streetwise use their Core 3.2 rules text rather than placeholder summaries.
- The printed Stealthy Strike (1d6) value is preserved explicitly.

### Wereraven

- Approved purchased allocation: STR 2, CON 1, DEX 2, INT 1, WIS 1, CHA 1 (8/8).
- Final scores: STR 1, CON 3, DEX 5, INT 2, WIS 3, CHA 0.
- Speed 25 / Fly 40; Initiative +40; DB 26; Fort +15, Ref +14, Will +9; HP 136.
- Includes Diving Strike, Evasion, Keen Sense, Mobility, Stealthy Strike, Survey Wildlife and Weapon Finesse.
- Bite, Claw, Shortsword and Composite Shortbow reproduce the printed ready-made attack package.
- Composite Shortbow is a true missile weapon and starts with **20 standard arrows**.

### Werewolf

- Approved purchased allocation: STR 1, CON 1, DEX 2, INT 1, WIS 1, CHA 1 (7/7).
- Final scores: STR 4, CON 3, DEX 2, INT -1, WIS 2, CHA 0.
- Speed 35; Initiative +20; DB 18; DR 1; Fort +12, Ref +8, Will +5; HP 107.
- Includes Bravery, Combat Reflexes, Power Attack, Skill Focus (Track) and Toughness.
- Bite, hybrid-only Claw, Broadsword and Composite Shortbow reproduce the printed attack package.
- Composite Shortbow starts with **20 standard arrows**.
- HP calibration explicitly accounts for the live Toughness effect so its +10 HP is not counted twice.

## Mournkin worked Actor

Mournkin is implemented as a **living Humanoid**, not Undead. The new ready-made Mournkin Race/Actor is distinct from the pre-existing reusable Mournkin transformation Template, which remains unchanged.

- Approved purchased allocation: STR 1, CON 1, DEX 2, INT 1, WIS 2, CHA 1 (8/8).
- Final scores: STR 1, CON 1, DEX 4, INT 2, WIS 3, CHA 1.
- Initiative +55; DB 24; DR 2 (Leather); Fort +9, Ref +15, Will +10; HP 99.
- Nightvision 130 ft.; Life Sense 45 ft.; cold resistance; essence weakness.
- Includes Agile Strikes, Altered Cantrip, Aura of Power, Class Training, Divine Knight, Evasion, Grave Authority, Grave-Touched Presence, Improved Initiative, Iron Will, Stealthy Strike, Weapon Focus (Brawling) and Whispers of the Grave.
- Grave Authority, Grave-Touched Presence and Whispers of the Grave use the source rules rather than invented replacements.
- Leather is an Actor-local copy calibrated to the source's explicit **DR 2 (Leather)**.
- Grave Touch preserves the printed +12 / 1d6+1 cold as a rules-bearing manual attack card because applying current BAB weapon-die progression would incorrectly increase the source's one-die attack.
- Dagger is labelled **Expert, Potency I** and retains the printed +12 / 1d4+3 provenance.

### Mournkin magic

The ready-made creature is configured as a Divinity caster:

- CL 3.
- Spellcraft +6.
- PP 15.
- Cantrips: Orb of Cold, Stabilise.
- PP 2: Animate Dead, Cure.

Stabilise was absent from the existing creature-pack spell copies, so its complete Core 3.2 cantrip rules are included directly rather than inventing or omitting the spell.

## Preservation

- Creature Actors after release: **294**.
- Previous 0.10.8 Actor roots retained byte-for-byte: **290/290**.
- All previous logical Race, Heritage, Ability and Affliction records retained unchanged.
- Reusable Templates retained unchanged: **13/13**.
- Dragon framework unchanged; existing true-dragon Breath Weapon Focus / 0 PP policy remains intact.
- Template framework unchanged.
- Creature compendium Type-filter script unchanged.
- All new Actor and Item descriptions remain plain text.
- No TRG Prime core files modified.

## Validation

Final pre-package automated validation: **108/108 passed**.

Coverage includes WAL CRC32C integrity, Actor count and uniqueness, prior-root byte preservation, logical pack preservation, template preservation, JavaScript syntax, approved Ability reconstruction, HP/DB/save/initiative/DR reconstruction, embedded Item/Effect references, artwork linkage, ammunition, ranged attack modes, Mournkin casting, and static Type-index coverage.

A clean-world interactive Foundry UI smoke test has not been performed and remains the one runtime validation step still pending.
