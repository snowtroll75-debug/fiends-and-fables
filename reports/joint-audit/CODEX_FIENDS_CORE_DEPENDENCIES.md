# Codex / Fiends & Fables — core dependencies

Joint audit, 18 November 2026. Tested against TRG Prime core **3.698.4** only (Foundry 14.367).

## Versions

| Module | Version | `relationships.systems` trg-prime minimum → verified | Other modules |
|---|---|---|---|
| TRG Prime Codex | 0.1.5 → **0.2.0** | 3.685.2 → **3.698.4** (verified was 3.685.2) | Recommends Fiends & Fables Prime (optional) |
| Fiends & Fables Prime | 0.45.2 → **0.46.0** | 3.663.0 → **3.698.4** (verified was 3.663.4) | Recommends TRG Prime Codex (optional) |

The minimum versions were left as they were. Every behaviour added in this audit is data that older cores ignore rather than misread (§3). Neither module requires the other.

## 1. What each module relies on in core

| Core feature | Codex 0.2.0 | Fiends 0.46.0 | Notes |
|---|---|---|---|
| Actor and Item classes, creature preparation (types, classes, size, reach, Death State) | Preview, create, apply | Every published actor | Core derives every statistic; neither module calculates one |
| Creature type rules (`creature-type-rules.mjs`: crit immunity, flanking) | Preview display | Embedded type items | — |
| Creature attacks: `flags.trg-prime.creatureAttack`, including `secondary` packets | Natural-attack copies | 106 riders; dragon Bite (FF-10); Lich and Ghost (FF-12) | The module's own `secondaryDamage` flag is descriptive only |
| Stat-block weapon proficiency (`flags.trg-prime.statBlockWeapon`) | — | Creature weapons; Lich Bony Hand | — |
| Ammunition fit (`compatibleWeaponGroup` against weapon group and family) | — | Bows and crossbows (FF-07) | — |
| Defences: immunity tokens, DR (natural + `dr.total` + armour), resistances, weaknesses | Ledger pricing | All creatures | — |
| Ability collapse at −5 and the Mindless trait (`system.details.traits`) | — | Skeleton and Zombie templates (FF-14) | — |
| Codex inheritance (`codex-inheritance.mjs`) by base name; `codexInherit: false` opt-out | Not federated (no `extends`) | 59 abilities inherit core; breaths opt out (FF-13) | — |
| Focus and uses (`uses-workflow.mjs`): blank uses + Focus = 1; Refocus | Spell editing (`itemUsesMax`, `itemUsesRemaining`, `usesPoolItem`) | Innate Focus spells; breath | — |
| Breath area (`moduleBreathArea` reads `flags.fiends-and-fables-prime.breath`) | — | 24 breaths and generated breaths | A core reader of Fiends data |
| Grants (`feats-workflow.reconcileAllGrants`, `grant-autorun.queueGrantPass`, `aspect-workflow.pruneAspectBonusSpells`) | Settling grants after create/apply | Type and race grants on templates | CO-01 proposal |
| Feats workflow (`feats-workflow.mjs`) | — | Familiar feats | — |
| Size table (`SIZE_TABLE` reach) | Blocks a mismatched apply | — | RD-02 |

## 2. Core changes proposed (not applied)

| ID | File | Change | Why | Companion regression on release |
|---|---|---|---|---|
| CO-01 | `module/grants-workflow.mjs` | `applyGrant` holds ability items under their base name as well as their full name: "darkvision (60 ft.)" is held as "darkvision" too. Patch: `core-proposal/CO-01-grant-base-name.patch`. | Stops later grant passes adding a generic sense beside a printed-range one. This affects every published creature with a printed sense range, not only templates. | Pillars of Faith, Inner Tempest, Eldritch Arts, Codex, Fiends battery |
| CO-02 | `packs/creature-types` (Ooze) | Add `, precision` to the Ooze type's `system.combat.immunities` effect | Codex 1.6 and the printed Ochre Jelly list precision. Core already resolves "precision" as an immunity token. | Codex (copy of the type), Fiends (6 embedded Ooze types); same battery |

Neither change is required for Codex 0.2.0 or Fiends 0.46.0 to work. Each closes a gap that both modules currently inherit.

## 3. Behaviour on cores older than 3.698.4 (untested)

- `flags.trg-prime.creatureAttack.secondary` was read before 3.663.0 (Fiends 0.12.x already relied on it).
- `codexInherit: false` is ignored by a core without federated inheritance, which also has nothing to inherit from.
- On a core that does not exempt Mindless creatures from ability collapse, a skeleton or zombie would fall unconscious as before. The trait itself does no harm.
- The Codex's grant settling and spell-editing imports need the core functions named above, unchanged since 3.685.2.

## 4. Standalone checks

| Configuration | Result |
|---|---|
| Core + Fiends (no Codex) | Every Fiends section of the battery ran; same results as with the Codex |
| Core + Codex (no Fiends) | Codex-built creature identical (battery configuration 3). The battery's variant section is skipped. The picker lists NPCs from whatever module Actor packs are installed, and lists nothing if there are none. |
| Core + Codex + Fiends | Reference |
| All modules (Eldritch Arts, Inner Tempest, Pillars of Faith) | Identical, apart from the breath area under Inner Tempest (FF-13, fixed) |
