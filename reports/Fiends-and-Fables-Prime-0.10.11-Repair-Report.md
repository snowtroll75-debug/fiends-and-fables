# Fiends & Fables Prime 0.10.11 — Hand-Budget Repair Report

**Target:** Foundry VTT 14.365 / TRG Prime 3.344.1
**Prior release:** 0.10.10
**Source finding:** Graham reported the Goblin Warrior gave a "no free hands" error on every equip attempt (20 August 2026).
**Date:** 20 August 2026

## What was wrong

Core's hand-budget rule (`module/held-items.mjs`) gives every actor a 2-hand total, and blocks equipping anything that would push the running total over that. It checks the *sum of every currently-`equipped` item's hand cost*, not just the one item being newly equipped.

The Goblin Warrior shipped with its Shortsword, Shield, **and** Shortbow all marked `equipped: true` at once — three different weapon/shield loadouts stacked simultaneously. That alone is 1 + 2 + 2 = 5 hands' worth of gear on a 2-handed creature, before touching anything. Because the check sums *all* equipped items, the Actor was already over capacity the moment it loaded — so the "no free hands" message fired on literally any equip attempt, including re-equipping something that was already on. The reported symptom ("everything I tried to equip told me no free hands") is exactly what that produces.

Part of the overshoot was compounded by the Shield's own `system.size` being `"medium"` while the Goblin's own body size is `"small"` — under core's sizing rule, a shield one size category larger than its wielder costs 2 hands instead of 1, tripling what a "light shield" should reasonably cost a goblin.

## Scope: 9 Actors, not just the one

Checking every equipped weapon/shield/gear/consumable's hand cost against each of the 294 Actors' own size turned up the identical pattern on 8 more Actors — all shipped with multiple alternate weapon options (sword *and* bow, axe *and* spear, melee *and* thrown versions of the same weapon) marked equipped simultaneously instead of the stat block's alternate attack options being modeled as one active loadout with the rest available-but-unequipped.

| Actor | Was (equipped, hands) | Fix |
|---|---|---|
| Bugbear | Javelin (1) + Greatsword (2) = 3 | Unequip Javelin. Greatsword stays as the primary melee weapon. |
| Bugbear Soldier | Javelin (1) + Greatsword (2) = 3 | Same as Bugbear. |
| Centaur | Broadsword (1) + Spear (1) + Composite Longbow (1) = 3 | Unequip Spear (redundant with Broadsword as a melee option). Broadsword and Composite Longbow — melee and ranged — stay equipped together. |
| Goblin Elite | Shortsword (1) + Shield (2, mis-sized) + Shortbow (2) = 5 | Shield resized `medium → small` to match the Goblin's own body size (now 1 hand). Unequip Shortbow. Shortsword + Shield is the default melee kit. |
| Goblin Warrior | Shortsword (1) + Shield (2, mis-sized) + Shortbow (2) = 5 | Same as Goblin Elite. |
| Lustrian Brave | Club (Melee) (1) + Club (Thrown) (1) + Long Spear (1) + Javelin (1) = 4 | Club (Melee) and Club (Thrown) are the same physical club split into two attack-mode entries (identical item art, quantity 1 each) — only one should ever be "in hand" at once, so Club (Thrown) is unequipped. Javelin also unequipped as a redundant second ranged option. Long Spear + Club (Melee) is the default kit. |
| Lustrian Khrissk | Battle Axe (1) + Long Spear (1) + Composite Shortbow (1) = 3 | Unequip Long Spear. Battle Axe + Composite Shortbow — melee and ranged — stay equipped together. |
| Skeleton Champion | Broadsword (1) + Composite Shortbow (1) + Shield (1) = 3 | Unequip Composite Shortbow. Broadsword + Shield is the default melee kit. |
| Werebear | Greataxe (1) + Handaxe (Melee) (1) + Handaxe (Thrown) (1) = 3 | Handaxe (Melee) and Handaxe (Thrown) are the same physical handaxe split the same way as the Lustrian Brave's club (identical item art, quantity 1 each) — Handaxe (Thrown) is unequipped. Greataxe + Handaxe (Melee) is the default kit. |

Bite, Claw, Hoof, and Unarmed items were untouched throughout — they're all flagged `natural: true` in the data and correctly never consume hand budget.

## Judgment calls — flagged for review

Which single weapon combination to leave equipped by default was not always obvious from the data alone (these Actors' descriptions don't state a preferred stance), so the choices above default to keeping one melee option plus, where the kit includes one, one ranged option — the closest reading of "a versatile combatant with alternate attack options" available without inventing anything. Every dropped item is still on the Actor sheet, just unequipped, so re-equipping a different combination for a given encounter (e.g. running the Goblin Warrior as an archer instead of sword-and-board) is a one-click toggle, not a rebuild. Worth a quick sanity check against the actual Fiends & Fables 2.7 stat blocks, particularly:

- Whether the Melee/Thrown item pairs (Lustrian Brave's Club, Werebear's Handaxe) are indeed meant to be one physical weapon in two use-modes, as their shared placeholder art suggests, or whether they're deliberately two separate items that the source intends to be dual-wielded (which would need a different fix — e.g. checking whether dual-wielding two identical light weapons is even legal under the hand-budget rule as written).
- Whether Centaur, Lustrian Khrissk, and Skeleton Champion's chosen "one melee + one ranged" default matches their actual published stance, versus some other combination.

## Also found, not fixed this pass

While tracing the "no free hands" report, a second, unrelated bug turned up: the actor sheet's Reload button (`module/sheets/actor-sheet.mjs`, `row.hasLoad`) only appears for a weapon with an explicit "Load N" trait — it never checks for the Quick Load trait, so **no Quick-Load-only weapon ever shows a Reload button at all**, including the Goblin Warrior's Shortbow and both of core's own Short Bow and Composite Shortbow items. This is a core-system UI bug, not a Fiends & Fables data issue, and outside this module's own fix — flagging it here since it was found in the same investigation and is still open. Happy to fix it in the core system on request.

## Validation

- `extractPack` (official `@foundryvtt/foundryvtt-cli`) runs clean against all 5 packs after this change.
- Actor/Item type-schema validation: 0 violations across all 5 packs.
- Hand-budget scan (every equipped weapon/shield/gear/consumable's hand cost, per Actor, against that Actor's own size): **0 Actors over capacity, 294/294 checked** — was 9 over capacity.
- Actor and Template counts unchanged: 294/294, 13/13.
