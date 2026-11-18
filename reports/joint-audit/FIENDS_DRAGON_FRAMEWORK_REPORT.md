# Fiends & Fables Prime — dragon framework report

Joint audit, 18 November 2026. Fiends 0.46.0, with Graham's RD-06 ruling carried in 0.46.1 (`scripts/dragon-framework.mjs`) on core 3.698.4.

## Requirement

True dragon breath must use the Focus mechanics and cost 0 PP. The framework must advance dragons by the Dragon Level Table without duplicating abilities, attacks or benefits, and published dragons must keep their printed statistics.

## How breath works (one implementation)

| Part | Owner | Mechanism |
|---|---|---|
| Uses | Core | Focus trait + `usesPerDay` 1, so one use; Refocus restores items with the Focus trait and a finite maximum |
| Cost | Core / Fiends data | `breath.ppCost: 0`. Using the breath spends no PP. |
| Area | Core reads Fiends data | `moduleBreathArea` reads `flags.fiends-and-fables-prime.breath`. `areaOf` prefers `flags.trg-prime.creatureAbility.area` and the activation's printed area. |
| Save and damage | Fiends data | `creatureAbility.activation` {action, 2 AP, area, save, damage} |
| Inheritance | Fiends | `codexInherit: false` (FF-13), so no other sourcebook's same-named breath can replace the Fiends data |
| Scaly Resilience | Core | Reaction against a declared dragon breath: +1 circumstance to the save and half damage. Fiends conditionals are cleared, so it applies once. |

Live result (installed 0.45.2, deterministic dice): the published Cold Dragon, Talon breath spends 0 PP, uses go 1→0, and 30 HP is lost on a failed save. This was identical in configurations 1, 2 and 3. Configuration A (with Inner Tempest) showed a 15-ft area instead of the printed 20 ft, because Inner Tempest's "Cold Dragon Breath" was inherited by name. That is FF-13, fixed in 0.46.0.

## Published breath weapons (24)

Every breath carries Focus, 1 use, 0 PP and `codexInherit: false` (0.46.0). Distances as in 0.46.1.

| Dragon | Level | Breath | Fiends breath data | Traits | Uses | PP | codexInherit |
|---|---|---|---|---|---|---|---|
| Cave Dragon, Scaleborn | 4 | Cave Dragon Breath | {"shape":"line","distance":30,"damage":"4d8","damageType":"acid","ppCost":0} | Acid, Arcane, Focus, Invocation, Save | 1 | 0 | false |
| Cave Dragon, Sovereign | 16 | Cave Dragon Breath | {"shape":"line","distance":80,"damage":"16d8","damageType":"acid","ppCost":0} | Acid, Arcane, Focus, Invocation, Save | 1 | 0 | false |
| Cave Dragon, Talon | 10 | Cave Dragon Breath | {"shape":"line","distance":60,"damage":"10d8","damageType":"acid","ppCost":0} | Acid, Arcane, Focus, Invocation, Save | 1 | 0 | false |
| Cold Dragon, Scaleborn | 4 | Cold Dragon Breath | {"shape":"cone","distance":15,"genericDistance":15,"damage":"4d8","damageType":"cold","save":"reflex","ppCost":0} | Arcane, Cold, Focus, Invocation, Save | 1 | 0 | false |
| Cold Dragon, Sovereign | 16 | Cold Dragon Breath | {"shape":"cone","distance":40,"genericDistance":40,"damage":"16d8","damageType":"cold","save":"reflex","ppCost":0} | Arcane, Cold, Focus, Invocation, Save | 1 | 0 | false |
| Cold Dragon, Talon | 10 | Cold Dragon Breath | {"shape":"cone","distance":30,"genericDistance":30,"damage":"10d8","damageType":"cold","save":"reflex","ppCost":0} | Arcane, Cold, Focus, Invocation, Save | 1 | 0 | false |
| Fire Dragon, Scaleborn | 6 | Fire Dragon Breath | {"shape":"cone","distance":15,"damage":"6d8","damageType":"fire","save":"reflex","ppCost":0} | Arcane, Fire, Focus, Invocation, Save | 1 | 0 | false |
| Fire Dragon, Sovereign | 18 | Fire Dragon Breath | {"shape":"cone","distance":40,"damage":"18d8","damageType":"fire","save":"reflex","ppCost":0} | Arcane, Fire, Focus, Invocation, Save | 1 | 0 | false |
| Fire Dragon, Talon | 12 | Fire Dragon Breath | {"shape":"cone","distance":30,"damage":"12d8","damageType":"fire","save":"reflex","ppCost":0} | Arcane, Fire, Focus, Invocation, Save | 1 | 0 | false |
| Forest Dragon, Scaleborn | 5 | Forest Dragon Breath | {"shape":"cone","distance":15,"damage":"5d6","damageType":"poison","save":"reflex","ppCost":0} | Arcane, Focus, Invocation, Poison, Save | 1 | 0 | false |
| Forest Dragon, Sovereign | 17 | Forest Dragon Breath | {"shape":"cone","distance":40,"damage":"17d6","damageType":"poison","save":"reflex","ppCost":0} | Arcane, Focus, Invocation, Poison, Save | 1 | 0 | false |
| Forest Dragon, Talon | 11 | Forest Dragon Breath | {"shape":"cone","distance":30,"damage":"11d6","damageType":"poison","save":"reflex","ppCost":0} | Arcane, Focus, Invocation, Poison, Save | 1 | 0 | false |
| Guardian Dragon, Hatchling | 8 | Guardian Dragon Breath | {"shape":"cone","distance":15,"damage":"8d12","damageType":"force","save":"reflex","ppCost":0} | Arcane, Focus, Force, Invocation, Save | 1 | 0 | false |
| Guardian Dragon, Sovereign | 20 | Guardian Dragon Breath | {"shape":"cone","distance":40,"damage":"20d12","damageType":"force","save":"reflex","ppCost":0} | Arcane, Focus, Force, Invocation, Save | 1 | 0 | false |
| Guardian Dragon, Talon | 14 | Guardian Dragon Breath | {"shape":"cone","distance":30,"damage":"14d12","damageType":"force","save":"reflex","ppCost":0} | Arcane, Focus, Force, Invocation, Save | 1 | 0 | false |
| Light Dragon, Scaleborn | 5 | Light Dragon Breath | {"shape":"line","distance":30,"damage":"5d10","damageType":"electricity","save":"reflex","ppCost":0} | Arcane, Electricity, Focus, Invocation, Save | 1 | 0 | false |
| Light Dragon, Sovereign | 17 | Light Dragon Breath | {"shape":"line","distance":80,"damage":"17d10","damageType":"electricity","save":"reflex","ppCost":0} | Arcane, Electricity, Focus, Invocation, Save | 1 | 0 | false |
| Light Dragon, Talon | 11 | Light Dragon Breath | {"shape":"line","distance":60,"damage":"11d10","damageType":"electricity","save":"reflex","ppCost":0} | Arcane, Electricity, Focus, Invocation, Save | 1 | 0 | false |
| Sea Dragon, Scaleborn | 4 | Sea Dragon Breath | {"shape":"line","distance":30,"damage":"4d10","damageType":"sonic","save":"fortitude","ppCost":0} | Arcane, Focus, Invocation, Save, Sonic | 1 | 0 | false |
| Sea Dragon, Sovereign | 16 | Sea Dragon Breath | {"shape":"line","distance":80,"damage":"16d10","damageType":"sonic","save":"fortitude","ppCost":0} | Arcane, Focus, Invocation, Save, Sonic | 1 | 0 | false |
| Sea Dragon, Talon | 10 | Sea Dragon Breath | {"shape":"line","distance":60,"damage":"10d10","damageType":"sonic","save":"fortitude","ppCost":0} | Arcane, Focus, Invocation, Save, Sonic | 1 | 0 | false |
| Shade Dragon, Mature | 19 | Shade Dragon Breath | {"shape":"cone","distance":40,"damage":"19d12","damageType":"coldfire","save":"reflex","ppCost":0} | Arcane, Cold, Fire, Focus, Invocation, Save | 1 | 0 | false |
| Shade Dragon, Scaleborn | 7 | Shade Dragon Breath | {"shape":"cone","distance":15,"damage":"7d12","damageType":"coldfire","save":"reflex","ppCost":0} | Arcane, Cold, Fire, Focus, Invocation, Save | 1 | 0 | false |
| Shade Dragon, Talon | 13 | Shade Dragon Breath | {"shape":"cone","distance":30,"damage":"13d12","damageType":"coldfire","save":"reflex","ppCost":0} | Arcane, Cold, Fire, Focus, Invocation, Save | 1 | 0 | false |

**RD-06, ruled 18 November 2026: the table is followed.** In 0.46.0, two Cold Dragon examples kept their printed cones, Talon 20 ft and Sovereign 30 ft, where the table gives 30 ft and 40 ft. In 0.46.1 they follow the table: Talon 30 ft and Sovereign 40 ft, with no exceptions left (`tools/rulings-0.46.1.mjs`).

## Advancement repairs

| ID | Defect | Repair | Live evidence |
|---|---|---|---|
| FF-09 | Advancing a published dragon added a second copy of each progression ability it already had (Wing Buffet, Draconic Assault, Ice Climb…), because only `dragonGenerated` items counted as present. | The eligible set of abilities is worked out for the new level. Abilities already present are kept, including printed ones with their creature-specific data. Framework-managed abilities the dragon has outgrown are removed, and missing ones are added once. "Snow Vision" and "Snowvision" are treated as one. | Cold Dragon, Talon advanced: one copy of each ability; breath 40 ft / 30 ft per the table |
| FF-10 | Generated Bite lost its 1d6 energy rider (cave acid, cold, fire, forest poison, guardian force, light electricity, shade coldfire). | Bite carries `flags.trg-prime.creatureAttack.secondary` [{1d6, energy}] alongside the descriptive module flag. | Bite deals 1d6 cold |
| FF-13 | Generated breaths could inherit another sourcebook's same-named breath. | Generated breath has `codexInherit: false` and its own activation {action, 2 AP, save}. | Verifier |

Published dragons themselves are not changed by the framework unless the GM advances one. Advancement edits a world actor, never a compendium actor.

## Not changed

- Sweep keeps no invented damage profile: the table unlocks it without a worked example, and the item says so.
- Sea dragons get no Wings; Guardian, Light and Shade use "Wing" (singular), as printed.
- Coldfire uses the Fiends & Fables cold/fire interaction rules described on the item.
