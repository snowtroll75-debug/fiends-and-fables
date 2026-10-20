# Fiends & Fables Prime 0.10.10 — Core Consistency Repair Report

**Target:** Foundry VTT 14.365 / TRG Prime 3.344.1
**Prior release:** 0.10.9
**Source finding:** `Fiends-and-Fables-Prime-Core-Consistency-Check.md` (20 August 2026)
**Date:** 20 August 2026

This is a repair-only release. It does not add, remove, or renumber any Actor, and it does not touch any of the 289 Actors that were not implicated by the consistency check. Everything below is a fix for a defect identified in the linked report; nothing here is new content.

## 1. Broken embedded items — 73 items restored on 5 Actors (was Critical)

Bugbear, Bulette, Kothorn, Boar, and Blink Dog, Alpha each had an `items` array pointing at item IDs that were never written under their own Actor key in the compiled `creatures` pack — a clone-and-rename authoring gap where the source Actor's items never got re-keyed to the new Actor. This crashed Foundry's own official pack-extraction tool (`extractPack`) and would have left a live world unable to hydrate any of these five Actors' embedded items.

Every one of the 73 references now resolves. `extractPack` runs clean against `packs/creatures` with no errors, and a full top-down scan (every Actor's `items` array checked against its own embedded-item keyspace) confirms **0 unresolved references across all 294 Actors**.

The repair used three different strategies depending on what the item actually was:

**Identity items (Race / Heritage) — corrected outright, no caveat needed.** These five Actors' Race and Heritage items were replaced with the module's own standalone, purpose-built entries from the `races` and `heritages` packs — not invented, not borrowed from the wrong creature:

| Actor | Race | Heritage |
|---|---|---|
| Bugbear | "Bugbear" (canonical) | *none* — the canonical Bugbear Race's own text says "The Soldier's additional differences are stored on its Heritage," confirming the base Bugbear carries no Heritage of its own. The donor's "Bugbear Soldier" Heritage slot was dropped. |
| Bulette | "Bulette" (canonical, "Direct Bulette Race") | *none* |
| Kothorn | "Boar" (canonical family Race) | "Kothorn" (canonical, `sourceRace: Boar`) |
| Boar | "Boar" (canonical family Race) | *none* — same base-form reasoning as Bugbear |
| Blink Dog, Alpha | "Blink Dog" (canonical family Race, unchanged from before) | "Blink Dog, Alpha" (canonical, `sourceRace: Blink Dog`) — **newly added**, since the donor (base Blink Dog) never had a Heritage item to begin with |

**Generic badge and boilerplate items — restored as-is, confirmed correct or content-identical regardless of owner.** Creature Type and Creature Class items are shared category badges, not creature-specific content — cross-checking each one against the confirmed-correct Creature Type value for that Actor (see §2) showed every donor's badge already matched. Feats and non-tuned Abilities were spot-checked pack-wide (e.g. "Iron Will," "Toughness," "Power Attack," "Scent (55 ft.)") and found to carry byte-identical rules text across every copy in the pack — they're system reference text, not per-creature tuning, so restoring the donor's copy restores the correct content, not a placeholder.

**Creature-tuned content — restored for referential integrity, explicitly flagged as an interim placeholder.** Weapons (attack bonus and damage differ per Actor — confirmed by direct comparison), Armour, any feat whose text ties it to a specific stat block ("Skill Focus" entries), and any Ability whose own description names the donor creature by species (e.g. Behir's "Electricity Breath," "Storm of Claws," and the Behir-worded copy of "Constrict") were restored using the donor's actual content so the Actor loads and functions, but each one now opens with:

> *"[INTERIM PLACEHOLDER — content restored from a donor creature during the Aug 2026 pack repair; needs re-tuning against this creature's real stat block before use. See the repair report.]"*

This applies to 4 items on Bugbear (Javelin, Greatsword, Unarmed Strike, Leather), 11 on Bulette, 3 each on Kothorn and Boar, and 1 on Blink Dog, Alpha. **Bulette is the weakest of the five repairs** — its donor, Behir, is a thematically unrelated creature, so its restored Abilities (Swallow, Electricity Breath, Storm of Claws, Constrict, Monstrous Grab, Wise Skills) and both weapons are flagged even though some read as generic; treat the whole Bulette stat block as provisional until it's checked against the actual published Bulette entry. Kothorn, Boar, and Bugbear are lower-risk since their donors (Cave Bear, Bugbear Soldier) are the same-family or closely related creature. Blink Dog, Alpha only has one flagged item (Bite) since its donor is the base form of the exact same creature.

Full per-item breakdown (what was restored as-is vs. flagged) is in `repair_report.json` alongside this report for anyone who wants the raw list.

## 2. Blank creature-type index entries — fixed (was Moderate)

`data/creature-type-index.json` had an empty `"type"` field for the same five Actors named above. All five now carry their real value:

- Bugbear → Humanoid
- Bulette → Beast
- Kothorn → Animal
- Boar → Animal
- Blink Dog, Alpha → Beast

Re-running the index/pack cross-check confirms all 294 index entries match a real pack Actor, all 294 pack Actors have an index entry, and all 294 `type` values are one of the core system's 12 real Creature Types. 0 blanks, 0 mismatches.

## 3. Invented Creature Class names — corrected (was Moderate–High)

The eight Actors carrying "Verdant Caster (Creature Class)" or "Ethereal Caster (Creature Class)" — Frost/Cloud/Storm/Hill/Stone/Fire Giant Shaman, Aboleth Magi, and Banshee Dirge Singer — now carry the real core value, **"Caster (Creature Class)"**. This was the lower-risk fix flagged in the original report (vs. shipping the two invented names as real new Creature Class items); if the "Verdant"/"Ethereal" flavour distinction matters mechanically, that's still open for a future release with its own proficiency-table entries.

Re-running the proficiency-key match against core's full 24-key table (8 player classes + 16 Creature Classes) now returns **0 unmatched `identity.class` strings across all 294 Actors**. None of these eight will silently fall through to the no-proficiency case that caused the historical Barrow Wight −4 bug.

## 4. Manifest version bump — done (was Informational)

`module.json`'s `relationships.systems[0].compatibility.verified` moved from `3.320.0` to `3.344.1`, matching the core build this repair was verified against. Module version bumped to `0.10.10`.

## Validation

- `extractPack` (official `@foundryvtt/foundryvtt-cli`) runs clean against all 5 packs — `races`, `heritages`, `abilities`, `creatures`, `templates` — with no errors.
- Top-down Actor→embedded-item reference scan: **0 unresolved references / 294 Actors** (was 73 missing / 5 Actors).
- Type-schema validation (Actor and Item `type` fields against core's `template.json`): **0 violations**, all 5 packs.
- Creature-type index ↔ pack cross-check: **294/294 matched, 0 blanks, 0 invalid type values**.
- Creature Class proficiency-key match: **0 unmatched `identity.class` strings / 294 Actors**.
- Actor count preserved: **294/294**, byte-identical for every Actor not named in this report.
- Template count preserved: **13/13**, unchanged.

## What's still open

- The 22 flagged placeholder items (listed in §1 and in `repair_report.json`) are functional but not verified against the real "TRG Prime Fiends & Fables 2.7" source book — they were restored from a donor creature to stop the crash, not authored fresh. This report doesn't have source-book authority to write corrected weapon damage or ability text, so those numbers should be checked against the book directly, Bulette first given it has the weakest donor match.
- Whether "Boar" and "Bugbear" are correctly modeled with zero Heritage is inferred from the pattern in the data (the base Blink Dog and the canonical Bugbear Race's own text), not confirmed against the source book directly — worth a quick sanity check.
