# Pedagogy and accessibility proofread · v2

Date: 2026-08-13  
Reviewer: independent v2 subagent  
Scope: all eight learning pages at desktop and 390 px, headings, local routes, keyboard interaction, reduced motion, notebook probes, lab protocol, and report accessibility.

## Verdict before remediation

Revise. The course structure and evidence boundaries were strong, but three P1 defects weakened the learning contract: a learner could complete an unchanged lab without explaining an invariant, the pivotal notebook controls were not usable enough, and the phase-token table clipped on mobile.

## Findings and resolutions

| Priority | Finding | Resolution |
| --- | --- | --- |
| P1 | Lab completion required only any hypothesis and snapshot. Controls, explanation, and staleness were not bound to the evidence. | `labs.html` now stores a schema-v2 snapshot with controls, hypothesis, invariant explanation, output, revision, fingerprint, and time. Completion requires a meaningful perturbation and a current snapshot; later edits revoke it. |
| P1 | Notebook zoom glyphs were white on white and pins had roughly 18 px targets. | Toolbar buttons now force ink text. Pins retain small visual dots inside 40 px targets; selection also changes size and shape. |
| P1 | The report phase-token table clipped its last column at 390 px. | It now sits in a labeled, focusable horizontal-scroll region. |
| P2 | The first landing action jumped to RoPE before foundations. | The default entry is now decoder shape tracing; Labs publishes explicit foundation and gap-driven routes. |
| P2 | Report percentage was hidden with the decorative SVG. | Only the SVG is hidden; the percentage output is named and included in the live summary. |
| P2 | Two model canvases had descriptions but no accessible names. | Both canvases now use their visible panel headings with `aria-labelledby`. |
| P2 | Multiline lab results were announced on every control tick. | Detailed outputs are labeled non-live regions; concise progress and snapshot feedback remains polite live status. |
| P2 | Mobile evidence ribbons visually truncated. | The ribbon wraps below 620 px. |
| P3 | The Labs rail statically marked Model current. | It now defaults to Foundations rather than making the false claim. |

## Verification

The reviewer originally passed all eight pages for one H1, heading order, duplicate IDs, labels, local links, console health, navigation, tab behavior, reduced motion, image alt text, and most chart fallbacks. After remediation, a fresh check of `labs.html` passed inline-script parsing, `html-validate`, `git diff --check`, and headless Edge interaction tests for completion/staleness, MoE, inference, RL, and accessibility roles.

Final status: all P1 items resolved; no raw notebook image or nested course repository was modified.
