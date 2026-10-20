# Fiends & Fables Prime 0.18.1

Found while live-testing block 9. Requires TRG Prime 3.639.0.

- **Token sizes:** five creatures' tokens were 3×3. Core's size table gives the following, and these are now correct:
  - **Large (2×2):** the Chuul, Cloaker and Centaur.
  - **Small (1×1):** the Cockatrice.
  - **Medium (1×1):** the Lynxara.
- **Why it mattered:** a 3×3 Cockatrice could not stand next to its prey. Core refused the move with "you cannot end your turn in a space another creature occupies".
- **Viper and Raven:** their half-square (0.5) tokens are also set to 1×1, matching core's size table and every other Tiny creature in the module.
- **Checks:** every one of the 294 creatures now has its size's footprint, verified in `verify-module-block9`.

Actors already imported into a world keep their old tokens. Re-import them, or set each token's size by hand.
