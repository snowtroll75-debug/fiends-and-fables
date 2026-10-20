# Fiends & Fables Prime 0.13.1

12 October 2026. Requires TRG Prime 3.634.0. This release fixes one defect found when testing 0.13.0 live.

**The Dracoral's Restore Senses now has one use.** 0.13.0 added the Focus trait to it, but left the per-day count "unlimited" from when it was read as a constant spell. A printed count overrides the Focus default of one use, so it could still be cast without limit. The count is cleared, so it now arrives as a Focus spell with one use, like the Avoral's Charm Kind.

`verify-module-block4` (19 checks) now confirms there is no count, one use and the focus flag. `verify-module-block3` still passes all 35 checks.
