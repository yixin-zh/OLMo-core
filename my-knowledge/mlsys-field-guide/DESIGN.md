---
name: ML Systems Field Guide
description: A pipeline-debugger field guide that turns model-system concepts into inspectable evidence.
colors:
  paper: "#f3f5f3"
  surface: "#ffffff"
  surface-2: "#e9edeb"
  surface-3: "#dce2df"
  ink: "#111418"
  muted: "#4f5b66"
  faint: "#77838d"
  rule: "#c7cfcb"
  rule-strong: "#8d9994"
  probe: "#1557d6"
  probe-hover: "#0d45ad"
  probe-deep: "#0d3d9d"
  probe-soft: "#e2ebff"
  amber: "#f2c84b"
  amber-deep: "#594600"
  amber-soft: "#fff5c9"
  red: "#b8322a"
  red-soft: "#ffe7e3"
  green: "#087a50"
  green-deep: "#075b3d"
  green-soft: "#dff4ea"
  console-text: "#eef4f1"
  console-highlight: "#ffe386"
typography:
  display:
    fontFamily: '"Avenir Next", Avenir, "Segoe UI", Helvetica, Arial, sans-serif'
    fontSize: "clamp(2rem, 4vw, 4.35rem)"
    fontWeight: 700
    lineHeight: 1.13
    letterSpacing: "-0.035em"
  headline:
    fontFamily: '"Avenir Next", Avenir, "Segoe UI", Helvetica, Arial, sans-serif'
    fontSize: "clamp(1.45rem, 2.4vw, 2.35rem)"
    fontWeight: 700
    lineHeight: 1.13
    letterSpacing: "-0.025em"
  title:
    fontFamily: '"Avenir Next", Avenir, "Segoe UI", Helvetica, Arial, sans-serif'
    fontSize: "1.1rem"
    fontWeight: 700
    lineHeight: 1.13
  body:
    fontFamily: '"Avenir Next", Avenir, "Segoe UI", Helvetica, Arial, sans-serif'
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.55
  label:
    fontFamily: '"Avenir Next", Avenir, "Segoe UI", Helvetica, Arial, sans-serif'
    fontSize: "0.72rem"
    fontWeight: 700
    lineHeight: 1.3
    letterSpacing: "0.06em"
  micro:
    fontFamily: '"SFMono-Regular", Consolas, "Liberation Mono", monospace'
    fontSize: "0.58rem–0.92rem"
    fontWeight: 400–800
    lineHeight: 1.2–1.55
    use: "Dense matrices, chips, probe indices, inline trace metadata, and console output only"
  mono:
    fontFamily: '"SFMono-Regular", Consolas, "Liberation Mono", monospace'
rounded:
  control: "6px"
  compact: "4px"
  capsule: "999px"
components:
  button-primary:
    backgroundColor: "{colors.probe}"
    textColor: "{colors.surface}"
    typography: "{typography.body}"
    rounded: "{rounded.control}"
    padding: "0.65rem 0.95rem"
    height: "2.65rem"
  button-secondary:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    rounded: "{rounded.control}"
    padding: "0.65rem 0.95rem"
    height: "2.65rem"
  field:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    rounded: "{rounded.control}"
    padding: "0.5rem"
    height: "2.55rem"
  source-chip-repo:
    backgroundColor: "{colors.probe-soft}"
    textColor: "{colors.probe-deep}"
    rounded: "999px"
    padding: "0.28rem 0.45rem"
  instrument-panel:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "0"
    padding: "1rem"
  navigation-link-active:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "0"
    padding: "1.15rem 0.7rem 1rem"
  rail-step-active:
    backgroundColor: "{colors.probe-soft}"
    textColor: "{colors.ink}"
    rounded: "{rounded.control}"
    padding: "0.75rem 0.55rem"
  notebook-probe:
    backgroundColor: "{colors.probe}"
    textColor: "{colors.surface}"
    rounded: "50%"
    size: "1.15rem"
  lab-output:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.console-text}"
    typography: "{typography.mono}"
    rounded: "0"
    padding: "0.9rem"
  report-ledger:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "0"
    padding: "0"
---

# Design System: ML Systems Field Guide

## Overview

**Creative North Star: "Pipeline Debugger"**

Pipeline Debugger treats learning like stepping through a compiler and GPU trace. The visual system is a light, matte instrument deck: notebook-blue probes select inspectable claims; hairline rules expose boundaries; and dense but orderly panels keep equations, code trails, controls, and evidence visible together. It is technical without impersonating a terminal and pedagogical without turning the learner's handwriting into decoration.

The task-led hybrid changes composition without changing identity. Trace-first model pages, the notebook-first source decoder, browser-local lab sheets, and the ledger-first report builder all share the same utility strip, lifecycle rail, status language, panel anatomy, and proof-oriented interaction. The interface should feel calm enough for a long study session and exact enough that a learner can tell what is sourced, computed, illustrative, missing, or form-complete at a glance.

**Key Characteristics:**

- Matte, light instrument surfaces separated by one-pixel diagnostic rules.
- Cobalt probe pins and synchronized selection states derived from the notebook's blue dots.
- Compact sans-serif hierarchy with monospace reserved for equations, paths, values, and machine output.
- Evidence strength communicated by text and structure as well as color.
- Responsive, printable, keyboard-operable layouts that retain the learning sequence.

## Colors

The palette is neutral laboratory paper with one investigative blue and three tightly governed evidence signals. Screen-specific tonal steps such as chart-series blue, softened borders, and alert-border blends may be literal members of the documented tonal ramps in the sidecar; they are not new semantic colors.

### Primary

- **Notebook Cobalt** (`probe`): the active probe, selected tab, current rail step, actionable link, and repo-grounded trail. Its darker values are limited to hover and readable text on the blue wash.
- **Selection Wash** (`probe-soft`): the quiet background behind selected controls, equations, and repository evidence.

### Secondary

- **Attention Amber** (`amber`, `amber-soft`, `amber-deep`): requests attention, marks an active notebook pin, or identifies an illustrative/conditional claim. It never means success.
- **Verified Green** (`green`, `green-soft`, `green-deep`): primary/official evidence, passed checks, or completed lab state.
- **Contradiction Red** (`red`, `red-soft`): corrections, blockers, and unsafe or contradictory claims. It is diagnostic, not decorative.

### Neutral

- **Grid Paper** (`paper`): the page field and faint 32 px horizontal study grid.
- **Instrument White** (`surface`): panels, controls, rails, and readable work areas.
- **Control Deck Grays** (`surface-2`, `surface-3`): grouped controls, table headers, live conclusions, and meter tracks.
- **Console Ink** (`ink`): primary text, dark bands, arrows, and browser-local lab output.
- **Diagnostic Slate** (`muted`) and **Quiet Telemetry** (`faint`): explanatory copy, labels, shapes, and secondary metadata.
- **Hairline Rule** (`rule`) and **Control Border** (`rule-strong`): structural divisions and interactive boundaries.
- **Console Readout** (`console-text`) and **Console Highlight** (`console-highlight`): high-contrast lab output and changed-value emphasis on the dark console.

**The Probe Is an Action Rule.** Cobalt marks something the learner can select, inspect, follow, or verify; never scatter it as ambient decoration.

**The Evidence Is Redundant Rule.** Every green, amber, red, or blue state repeats its meaning in a label, icon/dot, border, pattern, or status sentence so hue is never the only signal.

## Typography

**Display Font:** Avenir Next with Avenir, Segoe UI, Helvetica, Arial, and sans-serif fallbacks

**Body Font:** Avenir Next with the same system-safe fallback chain

**Label/Mono Font:** SFMono-Regular with Consolas, Liberation Mono, and monospace fallbacks

**Character:** The UI stack is cockpit-readable and restrained, while the mono stack makes tensor shapes, code paths, equations, hashes, measurements, and deterministic browser output visually auditable. Both are local/system stacks; the site has no hosted-font dependency.

### Hierarchy

- **Display** (700, responsive `clamp(2rem, 4vw, 4.35rem)`, 1.13): page identity and the largest learning question; keep it within roughly 20 characters per line where the composition allows.
- **Headline** (700, responsive `clamp(1.45rem, 2.4vw, 2.35rem)`, 1.13): major bands and conceptual transitions.
- **Title** (700, `1.1rem`, 1.13): instruments, proofs, lab sections, and ledger groupings.
- **Body** (400, `1rem`, 1.55): explanation and instructions, normally capped at the implemented `72ch` reading measure.
- **Label** (700, `0.72rem`, 1.3, `0.06em`): lifecycle headings and compact operational metadata; uppercase only where the implementation explicitly uses it.
- **Mono** (size follows its component): equations, values, source paths, confidence, status readouts, and output—not continuous explanatory prose.
- **Micro** (`0.58rem–0.92rem`, component-specific): dense matrices, provenance chips, probe indices, plot legends, and mono console output. It is intentionally a compact utility range, never the primary reading hierarchy.

**The Two Registers Rule.** Sans-serif explains the system; monospace exposes the artifact. Do not use mono merely to make the site look technical.

## Layout

The desktop shell is a sticky utility strip above a two-column application frame: a `13rem` lifecycle rail and a fluid main canvas. Trace surfaces may add a `21rem` proof inspector; page content uses responsive `clamp()` padding from `1rem` to `2.3rem`, a `72ch` prose measure, and one-pixel rules rather than free-floating cards. The core sequence is always source → tokens → model → train → eval → serve → release, while the Labs page compresses that same idea to foundations → model → train → systems → release.

Task-led compositions reuse the grid differently. The model and landing pages favor execution lanes plus an inspector; the notebook pairs a source image with a proofread inspector; workbenches use a wide experiment panel beside a narrower readout; labs use four-cell briefs and paired trail panels; the report uses a sticky score/state audit beside thirteen collapsible evidence ledgers. Spacing is deliberately literal in the current CSS—mostly `0.25rem` to `1rem` within controls and `2.5rem` to `5.5rem` between section bands—and is not yet a named spacing-token scale.

At `1180px` and below, inspectors and major workbenches stack, the lifecycle widths contract, and the proof inspector loses its floating shadow. At `980px`, lab briefs move from four to two columns. At `880px`, primary navigation becomes a menu, the lifecycle becomes a horizontal scroll rail, and diagram grids stack. At `720px`, report score, ledger, and phase grids become single-column. At `620px`, controls, lab trails, notebook layout, evidence boundaries, and footers become one column. Print removes navigation, lifecycle, action rows, lab console chrome, and probe cursors while expanding the learning content into a linear document.

**The Trace Survives Collapse Rule.** Responsive changes may stack or horizontally scroll dense structures, but they must preserve stage order, labels, current state, and the textual conclusion.

**The Linear Fallback Rule.** Every canvas, photo overlay, state matrix, or interactive plot needs a readable sequence, table, inspector, or output sentence in the document flow.

## Elevation & Depth

The system is flat by default. Depth comes from paper/surface tone, one-pixel borders, dark section bands, inset selection bars, and sticky positioning. The desktop proof inspector is the single broad floating surface, using the low-contrast `shadow-float`; it returns to flat at the `1180px` stacking breakpoint. Notebook probe pins use a compact shadow only to remain legible over photography.

### Shadow Vocabulary

- **Floating proof inspector** (`0 14px 40px rgba(17, 20, 24, 0.14)`): one desktop inspector that must read above a trace, never ordinary cards.
- **Photo probe separation** (`0 2px 8px rgba(17, 20, 24, 0.25)`): small pins over the notebook image only.
- **Selected strip marker** (`inset 0 -3px 0 #1557d6`): a state underline, not elevation.

**The Flat Instrument Rule.** Cards, ledgers, labs, tables, and controls remain flat at rest; shadow is reserved for spatially floating evidence or pins over imagery.

## Shapes

The form language is nearly square. Panels, tables, ledgers, lab sheets, status banners, and dark readouts use square corners and one-pixel borders. Repeated interactive controls and equation blocks use the active `6px` control radius. Source chips use a `999px` capsule; status dots, lifecycle nodes, and notebook probes are circular. A `10px` custom property exists in the stylesheet but is not used by a shipped component, so it is not a normative radius token.

Dashed borders mean a task contract or lab console, not generic emphasis. Thick top rules create diagnostic banners and score panels; they do not imitate side-tab cards or round into marketing cards.

**The Nearly Square Rule.** Apply rounding to controls and compact semantic chips, not to the instrument deck itself.

## Components

### Buttons

- **Shape:** compact control corners (`6px`) with a minimum `2.65rem` target and `0.65rem 0.95rem` padding.
- **Primary:** cobalt fill, white text, and cobalt border; used for the next concrete learning action, export action, or selected page control.
- **Secondary:** white fill, ink text, and the strong neutral border; hover strengthens the border to ink.
- **Hover / Focus / Active:** primary darkens to `probe-hover`; all buttons receive the global `3px` amber focus-visible outline with a `3px` offset; pressed choice strips use a blue wash plus an inset blue rule.

### Chips

- **Style:** small semantic capsules with a `999px` radius, one-pixel border, readable text, and soft background.
- **Variants:** primary/official is green, repository trail is cobalt, and caution is amber. The evidence ribbon's red contradiction state is a labeled dot rather than an unlabeled red chip.
- **State:** chips identify provenance or epistemic status; they are not general topics, filters, or ornament.

### Cards / Containers

- **Corner Style:** square by default; equation and caution/correction/evidence boxes use the `6px` control radius.
- **Background:** instrument white over grid paper; `surface-2` groups controls and table headers; ink is reserved for dark section bands and lab output.
- **Shadow Strategy:** flat except for the desktop proof inspector and photo probes described above.
- **Border:** one-pixel `rule` for structure, `rule-strong` for interactive/task boundaries, dashed strong rule for lab contracts.
- **Internal Padding:** usually `1rem`; section bands supply the larger responsive breathing room.

### Inputs / Fields

- **Style:** instrument-white field, strong neutral border, `6px` radius, minimum `2.55rem` height, and a visible textual label. Large lab hypothesis textareas intentionally stay square to read like writable sheets.
- **Focus:** the shared amber `3px` focus-visible outline is mandatory. Range controls use cobalt accents; completion checkboxes use green only alongside completion text.
- **Error / Disabled:** release blockers use red text plus explicit blocker copy; missing evidence remains written as missing rather than conveyed by a disabled-looking field.

### Navigation

- **Utility strip:** sticky, translucent grid-paper background with blur, product mark, page tabs, and utility actions.
- **Page tabs:** compact text with a transparent `3px` bottom rule; hover/current state turns the rule cobalt and the label ink.
- **Lifecycle rail:** sticky vertical trace on desktop and horizontal scroll rail below `880px`; circular nodes, connector rules, labels, and `aria-current` establish progress without color alone.
- **Mobile:** a real Menu button controls the wrapped navigation. Do not hide lifecycle meaning when secondary descriptions collapse.

### Notebook Probe

Blue probe pins sit directly over preserved notebook images with a white ring, compact separation shadow, index label, and associated inspector content. Each has a 40 px hit area around a smaller visual dot. The active pin grows, changes from a circle to a rounded square, and turns amber; its inspector exposes literal ink, normalized meaning, question semantics, confidence, correction, lesson route, and evidence boundary. Every overlapping mark also remains discoverable in the searchable probe index.

### Lifecycle Rail

The rail is the site's durable mental model, not merely page navigation. Keep stage order stable, use `aria-current="step"` for the active point, reserve filled cobalt nodes for current/completed states, and retain the local-boundary note wherever the wide rail is present.

### Lab Console

Each lab is a matte sheet with a numbered amber index, objective/prerequisite/invariant/execution-scope brief, required hypothesis, deterministic browser-local controls, dark mono output, invariant explanation/source trails, and a save-snapshot action. Completion is earned only after a learner perturbs at least one default, writes both a hypothesis and invariant explanation, and saves a current schema-versioned snapshot containing controls and output. Later edits stale that snapshot and revoke completion. Browser calculations are labeled as teaching output; external runtimes and empirical evidence remain explicitly separate.

### Report Ledger

The report builder combines a sticky score/state matrix with thirteen square, collapsible ledgers. Each ledger has an indexed summary, required or conditional fields, a proof reference, and source chips. Severity is `required`, `conditional`, or `not applicable`, except that artifact identity and release remain mandatory. Evidence strength advances from `intended` → `configured` → `executed` → `verified` → `released`. Executed-or-stronger states require a substantive, immutable-reference-shaped proof. A 100% score means the browser form is complete by those structural rules; reproducibility still requires external resolution and verification of the referenced artifacts.

**The Evidence Boundary Rule.** Primary/official, verified-in-checkout, illustrative/needs-verification, and contradiction-required are source-quality states; intended-to-released is execution maturity. Never merge the two scales or let a strong source label imply that a run was executed.

## Do's and Don'ts

### Do:

- **Do** preserve the Pipeline Debugger metaphor by connecting every probe to an equation, code or source trail, observable consequence, and evidence task.
- **Do** use cobalt only for current, inspectable, or repo-grounded state and repeat every status in words.
- **Do** keep controls semantic and keyboard-operable, with visible amber focus, `aria-current`/`aria-pressed` state, live textual outputs, and reduced-motion behavior.
- **Do** keep prose near the `72ch` measure while allowing tables, traces, images, and plots to use the wider instrument canvas.
- **Do** label synthetic curves, browser-local calculations, missing artifacts, and external-system boundaries at the point of use.
- **Do** maintain the print and linear-reading path when adding interaction.

### Don't:

- **Don't** round instrument panels, ledgers, lab sheets, or banners into generic soft cards.
- **Don't** add decorative gradients, glows, or shadows; the grid paper, rules, and one floating inspector already establish depth.
- **Don't** use monospace for ordinary explanation or cobalt as general decoration.
- **Don't** turn notebook handwriting, blue dots, equations, or status lights into texture detached from a learning action.
- **Don't** hide evidence state, source authority, or textual conclusions at narrow widths.
- **Don't** imply that an illustrative visualization, configured script, or browser calculation is a measured training or serving run.
