# Fiends & Fables Prime — template framework report

Joint audit, 18 November 2026. Fiends 0.46.0 (`scripts/template-framework.mjs`, `packs/templates`) on core 3.698.4.

## Requirement

Templates must be real transformations, and removing one must reverse it cleanly. Nothing may be granted twice, and every generated item must record which template added it.

## How a template works

Applying a template to a **world** actor does the following:

1. Records a state snapshot on the actor (`flags.fiends-and-fables-prime.templates.<key>`): the previous type, speeds, traits, attacks, and the items it adds or replaces.
2. Adds one actor effect holding the statistic changes: ability adjustments or set values, speeds, natural DR, resistances, immunities and weaknesses.
3. Creates the granted abilities and attacks, each marked `templateKey` and `templateGenerated`.
4. Replaces the creature type where the template says so (Ghost, Lich, Skeleton, Zombie, Vampire: Undead).

Removal deletes exactly the marked items and the template's effect, then restores the snapshot. A failure part-way through rolls back to the snapshot. Templates are never applied to compendium actors.

## The 13 templates

| Template | Requirement | Transformation (summary as published) |
|---|---|---|
| Ghost | Any creature | Undead; fly speed = land speed; Darkvision, Life Sense; STR set −4; DEX +1, WIS +2, CHA +2; Essence Attacks (1d6 cold) |
| Lich | Spellcasting creature, level 15+ | Undead; Darkvision; Bony Hand (2d8 essence secondary); Phylactery |
| Mournkin | Humanoid | EL +1; Nightvision, Life Sense; DEX +1, INT +1; Resist Cold, Weak Essence; Grave-Touched Presence |
| Skeleton | Any creature | Land +5; Darkvision, Life Sense; STR/CON/DEX +1; INT and CHA set −5; Mindless; skill settings |
| Vampire | Humanoid | EL +2; Darkvision; STR +4, CON +2, DEX +4, INT +2, WIS +2, CHA +4; immunities, resistances, Fast Healing; Drink Blood… |
| Zombie | Any living creature | Land −5; Darkvision, Life Sense; STR +2, DEX −1; INT and CHA set −5; Endless Hunger, Mindless |
| Werebat | Humanoid | Fly 25; Nightvision, Echolocation; abilities; DR 1; Resist Physical, Weak Silver; lycanthrope abilities |
| Werebear | Humanoid | Large; land +5; lycanthrope package |
| Wereboar | Humanoid | Land +5; Nightvision, Scent; abilities; DR 1; Resist Physical, Weak Silver |
| Werecat | Humanoid | Land +10; Nightvision, Scent; abilities; DR 1; Resist Physical, Weak Silver |
| Wererat | Humanoid | Nightvision, Scent; abilities; Immune Disease; Resist Physical, Weak Silver |
| Wereraven | Humanoid | Fly 40; Nightvision, Scent; abilities; Resist Physical, Weak Silver; Diving Strike |
| Werewolf | Humanoid | Land +10; Nightvision, Scent; abilities; DR 1; Resist Physical, Weak Silver |

## Repairs in 0.46.0

| ID | Defect | Repair |
|---|---|---|
| FF-12 | Lich Bony Hand's 2d8 essence and Ghost Essence Attacks' 1d6 cold were declared on a module flag core never reads, so the damage was never dealt. | The core packet `flags.trg-prime.creatureAttack.secondary` is written. Bony Hand is a stat-block weapon, so it is proficient. The Ghost snapshots each attack's previous `creatureAttack` and restores it on removal, and adds only one Ghost packet even if a previous packet exists. |
| FF-14 | Skeleton and Zombie set Intelligence and Charisma to −5. Core's ability-collapse rule (a score of −5 or less means unconscious) exempts only a creature with the **Mindless trait**. The templates granted Mindless only as an ability card, so the new skeleton fell unconscious. | The template adds "Mindless" to `system.details.traits` when its custom grants include Mindless or it sets Intelligence to −5 or lower. The previous traits are stored and restored on removal and on rollback. Core's −5 mindless penalty to Intelligence and Charisma is unaffected. |
| FF-15 | An Undead template on a creature that is already Undead (Ghost or Lich on a Ghoul) replaced the creature's own type. Removal then deleted it and the senses it granted. | The type is replaced only when the creature is not already Undead. |
| FF-16 | 21 published items on non-lich creatures carried a stray `templateKey: "lich"` or `templateGenerated` mark, so a template removal could delete them. | The marks are cleared on those 21 items. The Arcane Lich, a genuine lich, keeps its marks. |

## Live evidence (Test world, deterministic dice)

- All 13 templates applied to and removed from a Goblin. After each removal the actor matched its pre-template snapshot: type, speeds, abilities, attacks, effects and traits.
- Skeleton and Zombie: INT and CHA −5 with the creature conscious. Removal restored the previous traits.
- Lich Bony Hand dealt 2d8 essence. Ghost attacks dealt 1d6 cold, and removal restored the original attack data.
- Ghost and Lich on a Ghoul: the Ghoul keeps its Undead type through apply and removal (FF-15, FF-16).
- Werewolf: abilities, DR, resistance and weakness applied once, and removal was clean.
- Residual, owned by core: Ghost on a Ghoul leaves one extra generic "Darkvision" beside the printed "Darkvision (60 ft.)". The core grant pass compares exact names. This is CO-01 (proposed core patch), not a template defect.

## No duplicated benefits

Each template's statistics live in one effect. Its abilities exist once, and a granted ability is skipped if the creature already holds one with the same base name. Only one Fiends & Fables template can be on an actor at a time: the framework refuses a second, which keeps restoration deterministic. The 13 live cases were therefore applied and removed one after another. Provenance is stored on every generated item and on the actor. The CO-01 core patch would close the one remaining duplicate path, printed-range senses.
