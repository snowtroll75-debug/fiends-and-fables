# Fiends & Fables Prime 0.10.5 — Crocodile, Titasuchus, Cyclops, Zylar & Triclops QA

**Target:** Foundry VTT 14.365 / TRG Prime 3.320.0  
**Authoritative creature source:** TRG Prime Fiends & Fables 2.7  
**Allocation/taxonomy baseline:** Fiends & Fables Author Review v0.5

## New Actors

- Crocodile — Level 4 / EL 2 — Animal.
- Titasuchus — Level 10 / EL 8 — Animal.
- Cyclops — Level 5 / EL 5 — Humanoid.
- Zylar — Level 8 / EL 7 — Humanoid.
- Triclops — Level 14 / EL 16 — Humanoid.

## Taxonomy and Ability allocations

Crocodile and Titasuchus use the approved shared Crocodile Race, with Titasuchus as the subtype Heritage. Cyclops, Zylar and Triclops use the approved shared Cyclopian Race with individual subtype Heritages. Size remains on each Actor rather than being baked into Race data, and the Animal Creature Type retains its native Intelligence -5 and Fortitude/Reflex bonuses.

The approved purchased allocations are used exactly: Crocodile 1/1/2/1/1/1; Titasuchus 2/2/2/1/1/1; Cyclops 1/1/1/2/1/1; Zylar 1/2/1/2/1/1; Triclops 2/2/2/1/1/2.

## Source fidelity and automation

Crocodile and Titasuchus reproduce the printed Breath Control, Monstrous Grab, Physical Training and natural attacks; Titasuchus additionally carries Iron Will, Swallow and Toughness I. Their published HP, DB, saves and attacks derive from the current Animal class, size and stored family effects without ready-made source calibration.

Cyclops includes Foresight Gaze, the complete printed feat package, Slam, Greataxe and Heavy Crossbow. The Heavy Crossbow is a true Missile attack with 120-foot range and begins with 20 standard bolts. The source prints DR 4 as Chest 2 + Natural 2 without naming an armour type; the module therefore uses neutral torso-only DR 2 armour rather than inventing armour statistics. Its normal Verdant casting is CL 2 / Spellcraft +5 / PP 8 with four additional learned spells up to PP 4. Those learned spell names are not supplied by the source and have not been invented.

Zylar is the Arcane Cyclopian caster at CL 8 / Spellcraft +13 / PP 37. Fiends & Fables specifies four cantrips and twelve additional learned spells up to PP 8 without naming the repertoire. Mage Armour is the one evidenced learned spell because the source defence line explicitly names it (`Natural 2, Mage Armour 4`), so a Core 3.2 Mage Armour spell card is embedded while the remaining eleven additional spells and four cantrips remain unspecified. The unexplained `DB +19 (21s)` notation is preserved in provenance; the playable headline value is DB 19 and no unsupported shield interpretation has been invented.

Triclops is the Ethereal Cyclopian caster at CL 14 / Spellcraft +20 / PP 62, with four unnamed cantrips and twenty-two unnamed additional learned spells to PP 14. Its named innate spells remain separate: Dominate is Focus and See Invisible is Constant, both at the printed +20 / DC 30. Blast of Energy is a structured 2 AP, 60-foot, Spellcraft-attack Focus power dealing 14d8 force. The source's learned repertoire remains unfilled because no spell names are supplied.

## Validation

The release validation reconstructs each new Actor's final Ability Scores, HP, DB, saves, Initiative, DR, listed skills and weapon attack bonuses directly from the stored Actor/Race/Heritage/Creature-Type/Class/feat Active Effects. All 270 previous Actor root documents remain byte-identical. Existing runtime scripts remain byte-identical and pass Node syntax checking. LevelDB/WAL integrity, Actor->Item->Effect references, artwork, Type index and ZIP round-trip are also checked. Live clean-world Foundry UI smoke testing remains pending.
