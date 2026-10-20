# Fiends & Fables Prime 0.10.10 — Change Log

## Fixed

- Restored 73 embedded items across 5 Actors (Bugbear, Bulette, Kothorn, Boar, Blink Dog, Alpha) that were filed under the wrong donor Actor's item collection at compile time, crashing Foundry's official `extractPack` tool and leaving these Actors' Items unreadable in a live world.
- Replaced Bugbear, Bulette, Kothorn, Boar, and Blink Dog, Alpha's Race/Heritage items with the module's own correct standalone Race/Heritage entries (previously pointing at the wrong creature's identity — e.g. Bulette carried a "Behir" Race).
- Added a missing "Blink Dog, Alpha" Heritage item to the Blink Dog, Alpha Actor.
- Filled 5 blank `type` entries in `data/creature-type-index.json` (Bugbear, Bulette, Kothorn, Boar, Blink Dog, Alpha) so they now appear under the compendium's Creature Type filter.
- Renamed `identity.class` on 8 Actors (Frost/Cloud/Storm/Hill/Stone/Fire Giant Shaman, Aboleth Magi, Banshee Dirge Singer) from the invented "Verdant Caster (Creature Class)" / "Ethereal Caster (Creature Class)" to the real core value "Caster (Creature Class)", closing a silent proficiency-lookup failure that would have left them with no weapon/armour/shield proficiency at all.
- Bumped `relationships.systems[0].compatibility.verified` from `3.320.0` to `3.344.1`.

## Flagged (not fixed — functional placeholder, needs designer review)

- 22 items across the same 5 repaired Actors (weapons, armour, and a handful of creature-specific Abilities) were restored using a donor creature's actual content so the Actor loads correctly, but are marked in-item with an interim-placeholder notice pending re-tuning against the real stat block. Full list and rationale in `Fiends-and-Fables-Prime-0.10.10-Repair-Report.md`.

## Retained

- All 294 creature Actors, byte-identical except where listed above.
- All 13 reusable templates, unchanged.
- All Race, Heritage, Ability, and Affliction records outside the 5 repaired Actors, unchanged.
- Dragon framework, template framework, and creature compendium Type-filter script, unchanged.
- No TRG Prime core system files modified.
