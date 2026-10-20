# Fiends & Fables Prime 0.10.4 — Lynxara, Centaur, Chuul, Cloaker & Cockatrice QA

**Target:** Foundry VTT 14.365 / TRG Prime 3.320.0  
**Authoritative source:** TRG Prime Fiends & Fables 2.7  
**Author-approved allocation baseline:** Fiends & Fables Author Review v0.5

## New Actors

- Lynxara — Level 1 / EL 0.
- Centaur — Level 3 / EL 2.
- Chuul — Level 8 / EL 7.
- Cloaker — Level 5 / EL 4.
- Cockatrice — Level 3 / EL 2.

## Source fidelity

Lynxara uses the approved shared Cat Race + Lynxara Heritage structure, while using the Beast Creature Class rather than Animal. Its source prints Bite and Claw at +25 in an otherwise current-scale Level-1 stat block. The raw values are preserved in provenance and the playable attacks use +5, the direct x5 normalization. Nature's Power is represented as its complete printed scaling rules card rather than an automatic actor mutation. The source also prints Level DC 14 rather than the normal Level-1 DC 15; the raw DC is retained in source metadata and no unrelated rules are changed.

Centaur is a direct Beast Race. The source's unexplained `DB +16 (18s)` notation is preserved in metadata; the playable headline DB remains 16. Its Spear is a true Thrown 20-foot weapon and its Composite Longbow is a Missile 100-foot weapon supplied with 20 standard arrows. DR 4 (Chest) uses neutral torso-only armour because the source names no armour type. Lightning Reflexes remains a real feat; a visible -3 Reflex source calibration reproduces the printed +9 under the current Beast chassis.

Chuul is a direct Aberration Race. Paralytic Venom and Mandibles retain their complete printed rules. The current Level-8 Aberration class derives a two-point lower base defence than the source's printed `Base +18`; the ready-made Actor therefore carries visible DB +2, Fort +3 and Will -2 source calibrations rather than altering the reusable Aberration class. Claw and Tentacle store pre-BAB 1d8 bases so BAB +6 supplies the second damage die exactly once.

Cloaker is a direct Aberration Race. Sonic Moan uses the actual Chapter-2 Fiends & Fables definition: 2 AP, 30-foot radius, 3d6 sonic and a basic Will save. Envelop and the explicitly printed Fast Healing 1 are retained. Current Aberration progression requires a visible +2 Will source calibration to reproduce the published +15.

Cockatrice is a direct Beast Race. Petrifying Bite contains the full DC 19 Fortitude/Slowed/Petrified progression and the 24-hour recovery saves. Instinctive Defence remains a real feat. The ready-made Actor uses visible +2 Fort / +1 Will / +5 Initiative source calibrations, and its Bite uses a -2 item-local attack correction to reproduce the printed +8 under the current Beast attack formula.

## Validation

All 265 previous Actor root documents/IDs remain byte-identical. Existing runtime scripts remain unchanged. New descriptions are plain text. The primary release suite passes **314/314** checks and the independent mechanics/fresh-extraction audit passes **241/241**, for **555/555 checks overall**. LevelDB/WAL integrity, embedded references, Type index, image paths, derived Ability Scores/HP/DB/saves/initiative, weapon attack equations, weapon modes, ammunition and ZIP round-trip are covered. Live clean-world Foundry UI smoke testing remains pending.
