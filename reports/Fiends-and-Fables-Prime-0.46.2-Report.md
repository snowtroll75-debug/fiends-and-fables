# Fiends & Fables Prime 0.46.2

Graham, 18 November 2026: "Please add the card to the other eternals."

- **Returned Essence on every Eternal.** The core Eternal type grants Darkvision, Nightvision, Eternal Essence and Returned Essence. Only the four Draeglir carried Returned Essence, so a TRG Prime Codex apply on any other published Eternal added it, and an unchanged apply was not quite unchanged (found in the live test of 3.699.0). The other 43 Eternals now carry the core card, which is text only, with no effects or automation.
- **Tooling.** `tools/returned-essence-0.46.2.mjs` is idempotent: `--check` reports no further changes. `tools/verify-rulings-0.46.1.mjs` now also checks that every Eternal holds the card exactly once and that item IDs are unique (171 checks pass). `tools/verify-joint-audit-0.46.0.mjs` still passes its 422 checks.
- **Codex counterpart.** TRG Prime Codex 0.2.2 prices an ability the creature's own type grants through the type ledger, so the card adds no DP and is not listed as unresolved.
