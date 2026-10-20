# Fiends & Fables Prime 0.10.8 — Vrock & Lycanthrope Worked-Stat Batch QA

**Target:** Foundry VTT 14.365 / TRG Prime 3.320.0  
**Authoritative creature source:** TRG Prime Fiends & Fables 2.7  
**Author-approved allocation baseline:** Fiends & Fables Author Review v0.5  
**Date:** 18 August 2026

## Scope

Version 0.10.8 adds five previously missing complete creature stat blocks:

- Vrock — Level 12 / EL 13
- Werebat — Level 3 / EL 3
- Werebear — Level 6 / EL 4
- Wereboar — Level 4 / EL 3
- Werecat — Level 8 / EL 5

The creature Actor count increases from 285 to 290. All 285 previous Actor root documents remain byte-identical.

The four lycanthropes are the sourcebook's worked creature stat blocks. They are deliberately added alongside, not instead of, the existing reusable transformation Templates. The 13 transformation Templates remain unchanged.

## Taxonomy and Ability Score construction

Vrock extends the existing Demon Race with a Vrock Heritage and uses the Eternal Creature Class.

The four lycanthropes introduce a reusable Lycanthrope Race and four worked-stat Heritages. This follows the author-review family taxonomy. Purchased Ability Scores remain on the Actor and are kept separate from Creature Type, Race/Heritage and size modifiers.

Approved purchased allocations:

- Vrock: STR 2, CON 2, DEX 2, INT 1, WIS 2, CHA 1 — 10/10
- Werebat: STR 1, CON 1, DEX 2, INT 1, WIS 1, CHA 1 — 7/7
- Werebear: STR 2, CON 1, DEX 2, INT 1, WIS 1, CHA 1 — 8/8
- Wereboar: STR 1, CON 1, DEX 2, INT 1, WIS 1, CHA 1 — 7/7
- Werecat: STR 2, CON 1, DEX 2, INT 1, WIS 1, CHA 1 — 8/8

## Vrock

Vrock resolves to the printed STR 6, CON 5, DEX 4, INT 2, WIS 3, CHA 3; Initiative +35; DB 34; DR 12; Fort +24, Ref +22, Will +22; HP 245.

The reusable Demon Race continues to supply its established +15 HP family component plus good/order weaknesses. Vrock Heritage supplies only its subtype residuals, printed DB components, electricity resistance and cold-iron weakness. Eternal Creature Type already grants +2 to all saving throws, so no duplicate Vrock save modifier is stored.

Vrock includes:

- Abyssal Healing, Alertness, Combat Reflexes, Eternal Essence, Eternal Summons, Lightning Reflexes, Power Attack and Survival Instinct.
- Cloud of Spores: 1 AP; adjacent creatures; 2d8 poison, basic Fortitude; on less than Success also 2d8 recurring piercing; normal flat check; maximum 10 rounds.
- Dance of Ruin: 3 AP; 30-foot radius; 4d12 electricity, basic Reflex; each additional Vrock adds 2d12 damage, 10 feet of radius and +1 save DC, maximum five Vrocks.
- Stunning Screech: 1 AP; non-demons in a 30-foot burst make Fortitude saves; Failure stunned 2, Fumble stunned 3.
- Bite +24, 3d10+6 piercing plus 1d6 evil.
- Claw +24, 3d8+6 slashing plus 1d6 evil.
- Divinity innate spells DC 25 (+15): Dimension Door PP 8 and Mirror Image PP 6. Neither entry has an at-will/constant marker, so both are Focus innate spells and consume no ordinary PP.

## Lycanthrope family

The reusable Lycanthrope Race stores only genuinely common worked-stat components:

- +15 HP family component.
- Physical resistance.
- Silver weakness.

Each worked-stat Heritage stores its approved combined racial/subtype residual and printed natural DR. This is separate from the existing transformation Template data and avoids forcing one numeric vector across all seven lycanthrope examples.

All four Actors include the sourcebook's common lycanthrope abilities as plain-text rules cards:

- Animal Empathy.
- Luna Frenzy.
- Lycanthropic Curse.
- Shift Form.

Shape-changing itself remains a GM-facing rule on these ready-made Actors. The existing Template runtime remains the mechanism for applying/removing lycanthropy to arbitrary PC/NPC Actors.

### Werebat

- Medium; Speed 25; Fly 25; Nightvision 130 ft.; Echolocation 130 ft.
- Final abilities STR 3, CON 3, DEX 4, INT 1, WIS 3, CHA -1.
- DB 18; DR 1; Fort +10, Ref +14, Will +5; HP 78.
- Bite +7, Wing +7 and Dagger +7.
- Exceptional Training (Meditation) is represented using the current Core Exceptional Training rule with Meditation selected.

### Werebear

- Large; Speed 30; Nightvision 120 ft.; Scent 35 ft.
- Final abilities STR 5, CON 4, DEX 2, INT 1, WIS 2, CHA -1.
- DB 22; DR 2; Fort +17, Ref +10, Will +9; HP 159.
- Bite +14, Claw +14, Greataxe +15.
- The printed Handaxe line gives separate melee/thrown attack values. As one Foundry weapon record cannot safely represent both source attack configurations, it is stored as Handaxe (Melee) and Handaxe (Thrown).
- A visible Actor-only Source Stat Calibration accounts for current Humanoid Creature Class differences without changing the Lycanthrope Race, Heritage or transformation Template.

### Wereboar

- Medium; Speed 30; Nightvision 130 ft.; Scent 40 ft.
- Final abilities STR 3, CON 4, DEX 1, INT 0, WIS 3, CHA -1.
- DB 17; DR 1; Fort +15, Ref +7, Will +6; HP 70.
- Gore +9, Pick +9 and Javelin +7.
- Diehard includes its current Core Death State +1 Active Effect; the +2 circumstance bonus to Dying Checks remains explicit in the feat text.
- The sourcebook's summary lycanthrope table lists Wereboar as Level 5, while the detailed worked stat block and the author-approved allocation ledger identify it as Level 4. This Actor follows the detailed stat block and approved ledger: Level 4 / EL 3.

### Werecat

- Medium; Speed 35; Nightvision 140 ft.; Scent 45 ft.
- Final abilities STR 4, CON 3, DEX 4, INT 0, WIS 4, CHA -2.
- Initiative +60; DB 28; DR 2; Fort +13, Ref +17, Will +11; HP 133.
- Bite +14, Claw +14 and Composite Shortbow +14.
- Starts with 20 standard arrows under the module ammunition rule.
- The printed Actor specifically lists Stealthy Strike (2d6); this actor-specific value is retained instead of recalculating it from a different revision of the feat.
- Survey Wildlife uses the current Core rule text.
- Fiends & Fables lists Cat's Landing for this creature but supplies no standalone Cat's Landing rules block in the provided source and no matching reusable implementation exists in the module. The selection is retained as a manual source card without inventing mechanics.

## Retention and validation

- All 285 v0.10.7 Actor roots retained byte-identically.
- All 13 transformation Templates retained unchanged.
- creature-compendium-filter.mjs unchanged and Node syntax valid.
- dragon-framework.mjs unchanged and Node syntax valid.
- template-framework.mjs unchanged and Node syntax valid.
- All new description fields are plain text.
- All new embedded Item and Active Effect references resolve.
- LevelDB WAL CRC checks pass for creatures, races, heritages and templates.
- Automated release validation: **104/104 passed** before final archive checks.
- Live clean-world Foundry VTT UI smoke testing has not been performed.
