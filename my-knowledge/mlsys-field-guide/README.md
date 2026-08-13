# ML Systems Field Guide

An interactive, local-first bridge from the three notebook photos and CS224N foundations through
CS336-style model construction, training, systems work, and transparent model reporting.

## Open the site

Start a static server from the **OLMo-core repository root** so the page links to `src/` and the
local paper packet resolve together:

```sh
python3 -m http.server 8765
```

Then open:

<http://127.0.0.1:8765/my-knowledge/mlsys-field-guide/index.html>

If you intentionally serve from `my-knowledge/mlsys-field-guide/` instead, the learning pages
still work, but links that inspect OLMo-core source will not resolve because `../../src/` is outside
that server root.

No build step, package install, account, analytics, or network request is required for the site
itself. Hypotheses, lab snapshots, completion state, and report drafts stay in browser-local
storage. Export them before clearing site data or changing browser profiles.

## Learning surfaces

| Page | Purpose |
| --- | --- |
| `index.html` | Study path and full source-to-release lifecycle trace |
| `notebook.html` | Three-image decoder with 60 proofread semantic probes |
| `model.html` | Transformer shapes, activations, RoPE, heads/KV cache, and MoE |
| `training.html` | Data/token flow, mixtures, scaling, schedules, phases, and eval gates |
| `systems.html` | Parallelism, inference profiling, serving boundaries, security, and RL rollout |
| `labs.html` | Eleven deterministic labs with hypothesis and snapshot completion gates |
| `report.html` | Thirteen-ledger transparent LLM technical-report builder |
| `sources.html` | Version boundaries, repo coverage, corrections, and primary-source registry |

## Evidence boundary

- Browser calculators are deterministic teaching instruments, not measured model or hardware
  results.
- OLMo-core is executable evidence for model/training/data-loader/distributed/generation behavior
  only where an exact code trail is linked.
- Vision/M-RoPE, raw-crawl curation, production serving, a complete training/data security program,
  and online RL orchestration are explicitly external extensions.
- Official CS336 Spring 2026 material and unofficial auto-generated Spring 2025 notes remain
  separate. The nested course repositories and original notebook photos are not copied into the
  site commits.
- Missing report evidence remains missing; the report score cannot reach 100% from prose alone.
  Even 100% means form-complete self-attestation—the browser cannot resolve or externally verify
  artifact references.

## Paper packet integrity

Sixteen primary papers are cached for local study. Verify their exact bytes with:

```sh
cd my-knowledge/mlsys-field-guide/papers
shasum -a 256 -c SHA256SUMS.txt
```

See `papers/README.md` for source URLs, identifiers, page counts, hashes, and the copyright note.

## Milestones

1. `7e8cd9613` — product direction, version boundaries, and evidence registry.
2. `617933b3b` — notebook decoder and model workbench.
3. `3bb5f5df4` — training lifecycle and systems/rollout workbench.
4. `6e47fd7cd` — hands-on labs, report ledger, and verified paper packet.
5. Final verification — two independent v2 proofreads, design-system documentation, detector,
   responsive/browser/static checks, and review records.

## Core validation

From the repository root:

```sh
npx --yes html-validate@10.10.0 'my-knowledge/mlsys-field-guide/*.html'
node --check my-knowledge/mlsys-field-guide/assets/js/site.js
node --check my-knowledge/mlsys-field-guide/assets/js/notebook-probes.js
git diff --check
```

The final review records live in `reviews/` and the visual system is documented in `DESIGN.md`.
