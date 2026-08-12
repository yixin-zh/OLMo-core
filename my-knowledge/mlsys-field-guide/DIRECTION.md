# Surface brief

## Scope and mode

A multi-page local reading and laboratory surface for one technical learner. The first surface must
explain the whole model lifecycle, provide an obvious study path, and make every evidence boundary
inspectable without requiring familiarity with the interface.

## Chosen direction

Pipeline Debugger. The guide behaves like a compiler and GPU trace viewer: a learner single-steps
from notebook term to equation, code, experiment, measurement, and releasable evidence. The three
blue notebook dots become probe pins, not ornament. Matte instrument panels, diagnostic rules,
breakpoints, and status tape carry the visual world.

The direction was delegated after the comparison server failed twice without recording an answer
and no structured-question tool was available. The choice wins on both audience identification and
product clarity: ML systems readers already understand traces and inspectors, and the metaphor maps
directly to the requested learning mechanism.

## First viewport

A compact utility strip spans the top. A lifecycle rail occupies the left edge. The center is a
dominant live trace from source notes and tokens through model/training stages to release evidence.
A proof inspector on the right shows the selected equation, source status, and OLMo-core trail. A
bottom lab console turns the selected probe into one concrete task. The trace, not a hero headline,
owns most of the viewport.

## Signature interaction

Selecting a blue probe moves one synchronized vertical cursor across the trace, proof inspector,
and lab console. The user sees what changes mathematically, in code, in systems cost, and in the
technical-report ledger. Keyboard arrows single-step; reduced motion updates immediately.

## Content and evidence constraints

- Official CS336 Spring 2026 is authoritative course material; unofficial Spring 2025 notes are an
  explanatory index only and must carry a warning.
- Illustrative curves and benchmark values are labelled synthetic. Model claims cite primary
  papers. OLMo-core support is separated from educational extensions.
- The photos remain visible and their uncertain readings retain confidence labels.
- The site must remain useful as a linear document, printable, and keyboard-operable.

## Composition inventory

| Region | Commitment | Medium |
| --- | --- | --- |
| Utility strip | Product name, page tabs, source/evidence status | Semantic HTML/CSS |
| Lifecycle rail | Tokens → model → train → eval → serve → release | HTML list + authored SVG connectors |
| Execution trace | Dense but legible stages, synchronized cursor, blue probes | HTML/CSS + inline SVG/canvas plots |
| Proof inspector | Equation, derivation, source level, code trail, caveat | Semantic HTML + MathML where practical |
| Lab console | Task, expected observation, evidence to capture | HTML form controls |
| Notebook viewer | Rotated/cropped source photos with keyed overlays | User-provided raster + HTML annotations |
| Report ledger | Architecture, data, scaling, recipe, run, eval, serve, security | HTML table/form + localStorage export |

## Component grammar

Corners are nearly square with a restrained 6–10 px radius only on interactive grouping surfaces.
Rules are 1 px neutral gray; selected probes are solid cobalt circles. Amber denotes attention
required, red denotes a contradiction or unsafe claim, and patterns plus labels repeat every color
state. Surfaces use no decorative shadow; floating inspectors use one broad low-contrast shadow.
Type is a cockpit-readable sans, with monospace limited to code, formulas, paths, and measurements.
The interface is light because it is used for long study sessions beside notes in ordinary room
light.

## Unresolved decisions

No deployment target is chosen. The static site is local-first. Actual lab results and measured GPU
traces do not exist yet and must never be implied by illustrative demos.
