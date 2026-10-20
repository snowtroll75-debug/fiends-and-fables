# Fiends & Fables Prime 0.11.1 — Attack Totals, Afflictions and Feats

**Target:** Foundry VTT 14.367 / TRG Prime 3.485.0 (verified live in the TRG V14 world, 4 September 2026)  
**Prior release:** 0.11.0 (derivation repair — see `Fiends-and-Fables-Prime-0.11.0-Repair-Report.md`)

Three pieces of work from the audit's follow-up list, plus one defect found on the way. As with 0.11.0, every data change was first made on temporary copies of the installed 0.11.0 Actors inside a running world on core 3.485.0, measured, and then written into the packs by the same transform. All temporary Actors and their chat messages were deleted afterwards. 294 Actors and 13 templates remain; a sixth pack (`feats`, 3 items) is added.

## 1. Attack totals through core's Strike maths

Every printed attack line in the 2.8 book (598 lines on 277 Actors) was compared with the modifier total core's `rollWeaponAttack` would produce for that weapon on the installed Actor — BAB and ability, creature level, Finesse (Dex swap), weapon `attackBonus`, runes, racial and weapon-focus bonuses, favoured weapon, with core's stacking rules. 392 lines already matched; 6 could not be matched to a weapon; the rest fall into four groups.

**Calibrated (40 Actors, 3 weapons).** Where every melee line on an Actor was off by the same amount (±1 to ±4), that amount is written once into `system.combat.attack.other` — the attack analogue of the `defence.other` calibration 0.11.0 used, so it also moves the Actor's attack DC. Sovereign / Talon dragons (+1 across the board), the trolls (−1 / −2), the Primals, Somnichan and Titan (−4), Skeleton Warrior (+2) and so on. Three weapons carried a residual of their own and take it as weapon `attackBonus`: Cave Dragon, Sovereign — Bite +1 (book 35 vs 34 for the other attacks); Mortivor — Greataxe −1; Efreet — Unarmed −2. Live: a real Strike card for Behir's Bite reads **+19** (7 BAB and ability, +1 Other, +4 creature level, +7 dice) — the printed value.

**Ranged attacks — a core gap, not calibrated (29 lines).** For 24 of the 29 ranged lines the printed bonus equals the Strength-based total with Dexterity swapped in: Archangel Bow 35 (core 39), Ogre Javelin 5 (11), Cyclops Heavy Crossbow 7 (11), Hill Troll Rock 13 (19), Earth Primal – Aerph Rock 21 (38)… The Core Rulebook 3.7 says Dexterity "affects ranged attack rolls" and gives AB as "BAB + Str Bonus (or Dex Bonus)", but `attack-workflow.mjs` applies the Dexterity swap only through the Finesse trait on melee weapons — `abilityKey` is always the Actor's single attack ability, so a missile or thrown Strike rolls with Strength. Writing 29 negative `attackBonus` values into the data would make the module's Actors right today and doubly wrong the day core adds the swap, so these are left alone and listed here for a core fix (use Dex for `missile` / `thrown` Strikes when it is higher — or always, per the rulebook line). The five Blast weapons (Air / Fiery / Wind / Elemental Blast) and Grey Spider's Web are in the same group.

**Finesse attacks — book errata, not calibrated (17 lines).** Where a Finesse weapon's owner has Dex above Str, core (correctly, per the Finesse trait text) rolls with Dex, and the book's printed number is the *Strength* total: Arcane Lich Bony Hand 18 (core 25), Noxmortis Soul Touch 33 (41), Thornkin Thorn Slash 10 (11), Phasmus Slam 21 (22), Pegasus, Avoral, Cockatrice, Banshee, Nixie, Sand Serpent, Viper, Dancing Broom, Werebat Dagger, Mournkin Dagger, Doctus Dagger. The module already ships these Actors with the trait, so the sheet rolls the higher, rule-correct value. Suggested for the 2.9 errata.

**Not calibrated — larger disagreements (4).** Kraken Tentacle / Bite printed 40, core 50 (−10 across the Actor); Titan Elemental Blast printed 31, core 44; Dao Slam 16 vs 20; Giant Rat Bite printed +20 (typo for +2/+4). Left for a ruling.

The 0.11.0 Bugbear Javelin −2 is **reverted** (it was calibrated against the ranged Dex assumption above); Bulette Bite / Claw −2 and the Blink Dog, Alpha damage stay.

## 2. Natural ranged attacks could not be fired (new, high)

Core's Strike refuses a `missile` weapon that has no compatible ammunition ("no compatible ammunition"), and treats the module's non-core `attackMode: "ranged"` as melee (reach checks, no range increment). Ten Actors' natural projectiles were therefore unusable from the sheet — Grey Spider and Monstrous Spider Web, Flame Beetle Fire Mote, Phoenix Fire Ray, Violith Spines, Manticore Spikes, Crimson Muck Molten Spit, Nocturnus Soul Blast, Xort Needle Fire — as were the ten `ranged` Blasts (Air / Fire / Water Primals, Djinn, Titan) and Shadowblade. Verified live: `selectAmmunition` reports `blocked: true` for the installed 0.11.0 Web.

These 18 weapons are now `attackMode: "thrown"` with `natural: true` and their range increment set from the printed range — core's thrown path gives them range increments and the −4 per increment, and its natural-weapon guard means nothing is consumed or dropped on a throw. Live: Grey Spider's Web Strike now rolls (+15 total, quantity unchanged). Bows, crossbows and slings, which carry ammunition items, are unchanged.

## 3. Afflictions with printed stages (25 items on 24 Actors)

The venom / fever / curse abilities that were plain text are now core `affliction` items, so the Apply button, the initial-exposure save, the per-stage saves, the stage ladder and the immunity gate all work on them: Spider Venom ×4, Snake Venom ×4, Lycanthropic Curse ×7 (one save; incubation "until the next full moon"; stage 1 = subjected to Luna Frenzy each full moon), Filth Fever ×2 (level 0 as printed, 5 stages), Ghoul Fever ×2 (6 stages), Mummy Rot, Quasit Venom, Athach Venom, Zombie Plague, Paralytic Venom ×2 (Chuul, Azure Muck). Stage text and intervals are the book's; where the book prints no intermediate stage (Quasit Venom stage 2, Ghoul Fever stages 3 and 5) or no interval (Zombie Plague stages 1, 2, 5) the entry says so rather than inventing one. Each carries the same `creatureAbility.activation` trigger block the module's existing Slime affliction uses, and `flags.fiends-and-fables-prime.convertedFromText = "0.11.1"`.

Save DCs: the book's creature DC is 14 + level, and the three printed affliction DCs are two above it (Ghoul Fever 18 / 20, Wyvern Venom 23), so those take `rarityModifier +2`; the two existing Paralytic Venom items (Ghoul, Ghast) were at level 0 (DC 14) and now use the creature's level +2 as printed. Live: Ghoul Fever applied to a temporary Actor rolls the exposure save at DC 18, the stage-2 interval save at DC 18, moves 2 → 1 on a success and posts "Stage 1: No effect — next save at the end of: 1 day".

## 4. Feats pack (new)

`packs/feats` adds the three Chapter 3 feats not in core (the other seven — Crimson Covenant, Ebon Bind, Enhanced Hearing / Smell / Vision, Grave Authority, Howling Kinship — already ship in core's feats pack).

- **Abyssal Familiar** (Class, Evil; Familiar, BSB +6) and **Nirvanic Familiar** (Class, Good; Familiar, Divinity Caster, BSB +6) get a Use button from the new `scripts/feats-framework.mjs`, which registers them in core's `FEAT_AUTOMATION`. Core builds every familiar from one stat block on a `familiar`-type Actor, which has nowhere to hold a creature's own scores and attacks, so "replace its base statistics with those of a quasit" is done by drawing the Quasit / Cherubim from this module's creature compendium as a linked, friendly Actor bound to the master (`flags.fiends-and-fables-prime.familiar`, core's `grantedBy`), carrying the old familiar's chosen abilities across (Empathic Link and the familiars-pack picks; not the stat-block race's grants), and — after a confirmation that names it — deleting the old familiar Actor. Requires the Familiar feat; refuses a second familiar. Live: a temporary character with core's Familiar summoned a Toad through core's own workflow, then Abyssal Familiar produced "FFTMP Master's Quasit Familiar" (DB 15, HP 35 — the book's Quasit), removed the Toad and carried Empathic Link.
- **Scaly Resilience** (Campaign, Class, Focus; Reaction) is authored with a core conditional: +1 circumstance, manual tick, on saving throws ("your DB or saving throw against a dragon's breath weapon"). The Resistance to the breath weapon and the DB alternative are applied by hand — noted on the item. Live: the conditional row appears in `conditionalRows` for a save.

## 5. Packaging

- `module.json`: version 0.11.1, system verified 3.485.0, new `feats` pack in the module folder, `scripts/feats-framework.mjs` in `esmodules`.
- `packs/creatures` rebuilt (8429 records — 294 Actors, 5358 items, 2777 effects; also carries the orphan-effect fix that restores Bugbear's DR 4). Other packs unchanged from 0.11.0.
- Two Actors in the installed world compendium (Cave Bear, Behir) differ from the 0.11.0 package (`hp.other −15`, 13 extra items) — apparently edited in-world; the package does not carry those edits.

## For Graham — rulings wanted

1. Ranged attacks with Dexterity: fix in core (`attack-workflow.mjs`), or should the module bake it? (This report assumes core.)
2. Finesse lines in the book printed with Strength: errata the book, or is the printed number intended?
3. Kraken (−10), Titan Elemental Blast (−13), Dao Slam (−4), Giant Rat Bite (+20): which number is right?
