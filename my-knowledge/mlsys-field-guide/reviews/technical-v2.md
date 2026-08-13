# Technical proofread · v2

Date: 2026-08-13  
Reviewer: independent v2 subagent  
Scope: formulas and interactives across all eight pages, 60 notebook probes, OLMo-core source trails, OLMo 3 stage scripts, and all 16 cached papers.

## Verdict before remediation

Revise. No P0 defect was found, and the architecture, tokenizer constants, stage counters, training transitions, eval placement, 6ND convention, activation curves, RoPE identity, KV formula, MoE loss formulas, and repository/external boundaries were otherwise materially correct. Four P1 teaching errors still required repair.

## Findings and resolutions

| Priority | Finding | Resolution |
| --- | --- | --- |
| P1 | Report scoring treated trailing missing markers and arbitrary proof prose as complete, allowed every ledger to become N/A, and overclaimed “release-ready.” | Missing markers are detected anywhere, including unbracketed `n/a` and `none`. Executed-or-stronger claims require an artifact location and immutable identifier shape. Identity and Release are permanently required—not conditional or N/A—and zero required ledgers blocks. The score is explicitly form-complete self-attestation, never external verification. Defaults were weakened to their warranted states. |
| P1 | Cosine and linear schedules used global progress after warmup, causing a discontinuity. | Both re-zero and shorten decay with `u=(t-warm)/(1-warm)`; zero-warmup is handled explicitly. |
| P1 | Inference calculators counted the first sampled token twice. | Prefill produces token 1; iterative decode uses `max(O−1,0)`. TTFT is queue plus prefill, and allocated `S+O` is distinguished from final-live `S+O−1`. |
| P1 | DeepSeek-style MoE selection bias was added to logits. | The lab softmaxes first, selects using probability plus bias, and retains the original probability as routed weight. |
| P2 | OlmoRL facts blended an arXiv-v2 A100 experiment with an author-blog H100 experiment. | The two source configurations now occupy separately attributed rows, with their mismatch visibly unresolved. |
| P2 | Bias-aware FFN matching still used the bias-free `2h/3` result. | Bias mode now uses the exact `h(2d+1)/(3d+2)` expression. |
| P2 | The RL lab implied quadratic pair construction was inherent. | Group-statistic advantage work is labeled O(G); `G(G−1)/2` is optional pairwise preference/diagnostic work. |
| P2 | The hierarchical mixture equation omitted local sibling normalization. | It is now an explicit product of per-node child weight divided by that node's sibling sum. |
| P2 | Page 2 had 21 probes but 19 coordinates, two routes were broken, and FSDP wording was taxonomically wrong. | Two calibrated coordinates were added, count equality is asserted, routes use real anchors, and FSDP is correctly described as sharded data parallelism rather than replicated DDP. |
| P2 | The source footer claimed no PDFs were downloaded. | It now records 16 cached PDFs pinned by SHA-256. |
| Uncertainty | “bf16 params” did not establish original/master parameter or optimizer storage. | The report limits the statement to FSDP compute/materialization dtype and leaves other storage unresolved. |

## Verification

The paper packet passes every entry in `papers/SHA256SUMS.txt`. The repaired report passed `html-validate`, inline-JavaScript parsing, proof/placeholder assertions, and DOM integration checks. The repaired systems and labs tools passed syntax/static checks; the labs reviewer additionally exercised the corrected MoE, inference, and RL paths in headless Edge.

Final status: all P1 and listed P2 items resolved; the browser tools remain explicitly illustrative where no real run exists.
