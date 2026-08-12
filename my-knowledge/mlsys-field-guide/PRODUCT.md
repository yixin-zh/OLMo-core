# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Inferred after the stack question received no answer: dependency-free static HTML, CSS, and
JavaScript that works from a local web server. Keep content portable and avoid a framework or
hosted runtime unless the user later chooses one.

## Users

The primary user is an experienced technical learner expanding from ML systems and infrastructure
into foundation-model internals. They have heard many of the terms in the three notebook photos but
have not yet implemented them or established their mathematics hands-on.

## Product Purpose

Create an interactive, evidence-traceable field guide that bridges CS224N foundations, CS336
systems practice, and executable OLMo-core code. Success means the user can explain, derive,
implement, profile, and audit an LLM lifecycle from tokens and Transformer blocks through scaling,
training phases, evaluation, serving, security, data curation, and RL rollouts.

## Positioning

The guide uses the user's notebook photos as a gap map, then connects every corrected idea to its
mathematical establishment, a manipulable visual, a small exercise, a primary source, and—when the
capability exists—an exact OLMo-core code trail. It also treats architecture, recipe, and execution
transparency as separate release obligations, so a learner can assemble and audit a genuinely
transparent LLM technical report instead of reading architecture summaries alone.

## Operating Context

The guide is used beside the OLMo-core checkout, the official Stanford CS336 Spring 2026 lecture
bundle, the unofficial Spring 2025 notes, the three notebook photos, primary papers, and a terminal.
The learning rhythm is inspect, manipulate, derive, run, profile, and record evidence. Official
2026 material and unofficial 2025 explanations must remain visibly distinct because the course
order and content differ.

## Capabilities and Constraints

- Provide a multi-page local website with progressive paths, interactive diagrams and calculators,
  mathematical derivations, code trails, labs, glossaries, and citations.
- Proofread every underlined term, algorithm example, blue-dot item, and ambiguous question mark in
  the three photos. Some question marks denote Boolean configuration fields; the guide must say when
  that interpretation is certain, probable, or unresolved.
- Cover Transformer construction, attention heads, text and image positional methods, RoPE
  extensions, activation and gated-MLP choices, MoE routing and losses, tokenization and embeddings,
  data curation, scaling studies, training and evaluation phases, distributed training, model/data
  security, inference profiling and infrastructure, and RL rollout systems.
- Compare choices by motivation, equations, systems cost, failure modes, and real model examples,
  including Llama 2 and DeepSeek-MoE, without implying that OLMo-core implements every example.
- Make repository coverage boundaries explicit. OLMo-core is strong for architecture, training,
  distributed execution, mixtures, evaluation hooks, and basic generation; production serving,
  vision RoPE, raw-crawl curation, comprehensive security, and RL rollout are educational extensions.
- Use local course material as study input, not as content to republish wholesale. The unofficial
  notes are auto-generated and require verification against primary or official sources.
- Download only a curated set of relevant primary papers, retain source URLs and checksums, and
  avoid fabricating benchmarks, training runs, or implementation support.
- Preserve both nested course repositories untouched and exclude them from milestone commits.
- Commit each milestone separately, then run two fresh independent proofreading reviews and apply
  their material fixes before the final handoff.

## Brand Commitments

The three notebook photos are pivotal source artifacts. Their blue dots, underlines, arrows, and
groupings should remain recognizable in the learning experience without turning handwriting into a
decorative theme. The voice is precise, pedagogical, candid about evidence boundaries, and oriented
toward hands-on understanding rather than hype.

## Evidence on Hand

- `my-knowledge/20260812_174414.JPG`, `20260812_174420.JPG`, and `20260812_174430.JPG`: user-authored
  notebook photos containing the initial gap map.
- `my-knowledge/cs336-26spr-lectures/`: official Stanford CS336 Spring 2026 slides and executable
  lecture notebooks/scripts.
- `my-knowledge/cs336-transcription/`: unofficial, auto-generated Spring 2025 notes, deep dives,
  assignment guides, and screenshots; useful but not authoritative.
- The surrounding OLMo-core repository: executable architecture, training, data-mixture,
  evaluation, distributed-systems, and basic generation implementations.
- Primary papers and official documentation can be downloaded or linked. There are no local CS224N
  notes, completed learner lab results, measured benchmarks, or production deployment traces to
  claim as evidence.

## Product Principles

1. Move from shape to equation to code to measured system behavior.
2. Separate verified facts, repo-grounded behavior, illustrative data, and open questions.
3. Teach trade-offs by changing one variable and exposing what moves downstream.
4. Treat full-model transparency as architecture plus data, scaling search, recipe, execution,
   evaluation, and released artifacts.
5. Make gaps actionable: every concept ends in a small experiment or evidence-capture task.

## Accessibility & Inclusion

The site must support keyboard-only operation, visible focus, reduced motion, high-contrast text,
descriptive equations and diagrams, non-color-only states, responsive reading, and printable pages.
Interactive plots must expose their current values and conclusions as text.
