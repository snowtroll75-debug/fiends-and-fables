# Fiends & Fables Prime 0.10.11 — Change Log

## Fixed

- Bugbear, Bugbear Soldier, Centaur, Goblin Elite, Goblin Warrior, Lustrian Brave, Lustrian Khrissk, Skeleton Champion, and Werebear all shipped with more weapons/shields simultaneously `equipped` than they have hands for, so any of them hit a "no free hands" error on every subsequent equip attempt. Each now has a legal default loadout (one melee option, plus one ranged option where the kit includes one); the unequipped alternates are still on the Actor, just toggled off.
- Goblin Elite and Goblin Warrior's Shield item was sized `medium` while both Actors are `small`, tripling the shield's own hand cost under core's sizing rule. Resized to `small` to match its wielder.

## Retained

- All 294 creature Actors, byte-identical except where listed above.
- All 13 reusable templates, unchanged.
- No TRG Prime core system files modified.

## Known, not fixed this release

- Core's actor-sheet Reload button only recognizes an explicit "Load N" trait, not the Quick Load trait — so no Quick-Load-only weapon (the Goblin Warrior's Shortbow included) ever shows a Reload button. This is a core-system issue outside this module. See `Fiends-and-Fables-Prime-0.10.11-Repair-Report.md`.
