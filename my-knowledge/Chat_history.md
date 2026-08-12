Q1 Please cross reference Minimax M3's tech report against https://openathena.ai/blog/delphi/ which introduces the scaling law for LLMs (Chinchilla's, Sardana's, Complete(d), and McLeish's) and what they did in practice to verify them. Check any coverage about how much data was fed to such a giant model of N=2.8T. Give visualization by comparing it with other frontier models/open source frontier models. DeepSeek v4 flash is also a good example.

A1
There is an important correction before comparing the scaling laws: **MiniMax M3 is not the (N\approx2.8\text{T}) model.** M3 is about **428B total / 22–23B activated parameters**. The new **Kimi K3** is the model at **2.78T total / 104.2B activated parameters**. ([Hugging Face][1])

After reading the K3 technical report, MiniMax's M3 material, Delphi, and the underlying scaling-law papers, the particularly interesting result is this:

> **Kimi K3 explicitly says that it searched over tokens-per-parameter as part of its scaling-law work, but it does not disclose the final pretraining token count or final TPP of the 2.8T model.**

That omission is quite striking given how much more transparent Delphi is. It also means claims such as “K3 must have been trained on 50T/60T/100T tokens because Chinchilla says so” are not currently evidence-backed.

### What Delphi is actually combining

I'd slightly revise the taxonomy in the OpenAthena post. Chinchilla and Sardana are genuinely about choosing (N) and (D). Complete(^{(d)})P is primarily a **hyperparameter-transfer law**, while McLeish/Gemstones is more a **scaling-law experimental suite showing that the answer changes with architecture, optimization and the cost metric**.

| Work                      | What question it really answers                                                                      | How it was experimentally checked                                                                     | Relation to Delphi / K3                                                                   |
| ------------------------- | ---------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| **Chinchilla / Hoffmann** | Under fixed training FLOPs, how should parameters (N) and tokens (D) trade off?                      | >400 models, 70M–16B parameters, 5–500B tokens; then a full 70B Chinchilla trained on 1.3T tokens     | Delphi inherits its IsoFLOP idea                                                          |
| **Sardana et al.**        | What if the objective is **training + future inference**, rather than training FLOPs alone?          | 47 models; deliberately pushes overtraining as far as **10,000 tokens/parameter**                     | Explains why deployed models can rationally be much smaller and much more heavily trained |
| **Complete(^{(d)})P**     | How do optimal optimizer HPs transfer with **width, depth, batch and training duration**?            | HPs tuned around 50M params / 1.6B tokens, transferred to about **14,000× larger FLOP budgets**       | Delphi borrows the token-horizon idea, but modifies it                                    |
| **McLeish / Gemstones**   | How sensitive are scaling prescriptions to shape, LR, schedule, hardware/time objective, etc.?       | >4,000 checkpoints up to 2B parameters, multiple widths/depths/LRs/cooldowns                          | Shows why a single “20 tokens/parameter” rule shouldn't be treated as universal           |
| **Delphi**                | Can the whole recipe be made predictive enough to extrapolate substantially beyond the fitting runs? | IsoFLOPs (3\times10^{18})–(3\times10^{20}), then completely held-out (10^{21},10^{22},10^{23}) runs   | Its final 25B/600B run is a very strong falsification test                                |
| **Kimi K3**               | What (B,\eta,\mathrm{TPP}), model shape and architecture work for their new MoE?                     | Dedicated scaling-law searches + held-out OOD validation, plus independent searches for cosine vs WSD | Methodologically related, but far less numerical detail is released                       |
| **MiniMax M3**            | Primarily: can sparse attention make 1M context practical without degrading quality?                 | MSA/GQA ablations and systems tests, including a 109B experimental model                              | Not a Delphi-style published (N,D) scaling suite                                          |

Chinchilla's empirical result was approximately equal scaling of (N) and (D); the actual Chinchilla was 70B parameters and 1.3T tokens, about **18.6 tokens/parameter**. ([Google DeepMind][2]) Sardana changes the objective by adding inference demand and finds that, at high expected inference volume, it is economical to **train a smaller model on substantially more data**, experimentally testing ratios up to 10,000 tokens/parameter. ([arXiv][3])

Complete(^{(d)})P is different: it is about ensuring that the hyperparameters found on cheap experiments remain appropriate when duration changes. Apple reports direct transfer out to roughly 14,000× the original FLOP budget. ([Apple Machine Learning Research][4]) McLeish's Gemstones then makes an even broader warning: the fitted “optimal” prescription can materially change with width/depth, LR, cooldown, the checkpoints included in the fit, and even whether cost is counted in FLOPs or GPU-hours. Their suite contains over 4,000 checkpoints. ([arXiv][5])

### Delphi's verification is unusually strong

This part of Delphi is worth emphasizing, because it goes beyond merely fitting a pretty scaling curve.

Their first recipe actually **failed**. They fitted seven IsoFLOP buckets from (3\times10^{18}) through (3\times10^{20}) FLOPs, where everything appeared smooth, but the (10^{22}) run missed the prediction by 2.5%, while the (10^{23}) run diverged. ([Open Athena][6])

They traced much of the problem to transferring optimization hyperparameters to much longer token horizons. The revised recipe switched to AdamH and introduced the Complete(^{(d)})P-inspired duration correction

[
\eta_{\rm proj}
===============

\eta_0
\sqrt{\frac{B}{B_0}}
\left(\frac{T_0}{T}\right)^{0.3}.
]

So, critically, **“use more tokens” also changes the correct optimizer settings**. Treating (D) as something you can increase while leaving the training recipe untouched was exactly what broke their first scaling experiment. ([Open Athena][6])

They then did a separate 24-condition sanity experiment spanning two widths, four batch sizes and three training horizons, checking whether the transferred HPs landed in the empirical low-loss basin. Finally they refit only through (3\times10^{20}) FLOPs and left (10^{21},10^{22},10^{23}) genuinely held out. Errors became +0.5%, +0.2%, and +0.2%, respectively. The largest model was **25B parameters trained on 600B tokens = 24 tokens/parameter**. ([Open Athena][6])

That last number is interesting: **Delphi's training-compute optimum is still remarkably Chinchilla-like in (D/N)** despite using a much newer architecture and recipe.

### Kimi K3 does something recognizably similar — but doesn't disclose (D)

K3's technical report is particularly illuminating when read after Delphi. Moonshot says it did dedicated scaling-law experiments because the architecture/data/training changes alter the optimum. In those experiments, it explicitly retuned:

[
\boxed{
\text{batch size},\quad
\text{learning rate},\quad
\text{tokens-per-parameter (TPP)},\quad
\text{model shape}
}
]

and evaluated the resulting law on **held-out OOD validation data**. It reports an approximately **2.5× scaling-efficiency improvement over Kimi K2**. 

There is an especially good methodological detail: K3 found cosine decay better than WSD, but discovered that their optimal batch sizes and peak learning rates differed substantially. Therefore Moonshot ran an **independent scaling-law search for each LR schedule**, rather than using one set of HPs for both. 

That is almost a direct real-world example of the Gemstones warning: “architecture A beats architecture B” or “schedule A beats B” is unreliable if each has not been separately optimized.

But the K3 report stops short of the Delphi level of transparency. It does **not** provide the final K3 token count, final TPP, fitted scaling coefficients, the detailed (N\times D) search grid, or a numerical statement like “the final 2.78T run landed 0.2% from our preregistered forecast.” It shows the scaling curves and the 2.5× efficiency shift, but not enough information to reproduce the final (D) decision. The architecture is explicitly 2.78T total / 104.2B active, 896 routed experts with 16 selected per token. ([arXiv][7])

This is what makes the next comparison crucial.

This is why applying Chinchilla directly to K3 as

[
D\approx20N=20(2.78T)\approx55.6T
]

is **not justified**. Chinchilla's (N) was the parameter count of a dense model. K3 stores 2.78T parameters but executes only about 104B of them per token. Neither (N_{\rm total}) nor (N_{\rm active}) alone captures MoE scaling. OpenAthena explicitly acknowledges this limitation: Delphi is a **dense-transformer scaling suite**, and extending its recipe to MoEs is listed as future work. ([Open Athena][6])

For perspective, if you nevertheless perform the arithmetic:

[
20\times 2.78T=55.6T
]

using total parameters, but

[
20\times104.2B=2.08T
]

using activated parameters.

A **27× disagreement** depending merely on what you call (N) tells us that neither calculation can be treated as K3's training budget.

### What can we infer from Kimi K2?

There is at least one useful anchor. Kimi K2 was pretrained on **15.5T tokens**, with roughly 1T total / 32B active parameters. ([arXiv][8]) K3's own table gives the more precise architectural comparison of 1.04T/32.6B versus 2.78T/104.2B. 

If, purely as a thought experiment, K3 maintained K2's:

[
D/N_{\rm total},
]

you would obtain roughly (41!-!43T) tokens. If it maintained K2's

[
D/N_{\rm active},
]

you get roughly (49.5T).

And old Chinchilla's 18.6 tokens/parameter applied to K3 total parameters gives about (51.7T).

So three unrelated extrapolations happen to cluster around roughly **40–52T tokens**. I would **not call that an estimate**. The apparent agreement could easily be coincidental: K3 changed MoE sparsity, attention, depth, optimizer, multimodal data, training context and scaling efficiency, and the report explicitly says it retuned TPP. The reliable statement as of the current report remains:

[
\boxed{D_{\mathrm{Kimi,K3}}\text{ has not been publicly disclosed.}}
]

I also searched recent coverage specifically for “Kimi K3 training tokens,” “trillion tokens,” and “tokens per parameter”; I did not find a credible Moonshot or independent source providing the missing number.

### MiniMax M3 is actually the more extreme data-scaling example

This is where M3 becomes very relevant to your original scaling-law question.

MiniMax itself says the pretraining pipeline was completely re-architected, that M3 receives interleaved multimodal data from step zero, and that its experiments found interleaved data continued scaling well. But MiniMax's own public M3 post doesn't state a numerical token budget. ([Minimax][9])

NVIDIA's technical deployment article does: it reports that M3 was trained natively across **about 100 trillion interleaved tokens**. It independently gives the architecture as 428B total / 22B active. ([NVIDIA Developer][10])

So, taking NVIDIA's figure at face value,

[
\frac{100T}{428B}\approx234
]

tokens per **total** parameter, or

[
\frac{100T}{22B}\approx4,545
]

tokens per **activated** parameter.

That is nowhere near classic Chinchilla.

And that isn't necessarily irrational. M3 has only ~22B active parameters per token, while MSA cuts its 1M-context attention compute enormously. MiniMax reports 9× prefill / 15× decoding acceleration relative to M2, while its MSA paper demonstrates quality parity with GQA on its experimental 109B model and large reductions in long-context attention compute. ([Hugging Face][1])

In economic terms, **M3 looks much more like the world Sardana predicted**:

[
\text{pay a large one-time pretraining bill}
\quad\longrightarrow\quad
\text{ship a much smaller active model}
\quad\longrightarrow\quad
\text{save inference repeatedly}.
]

That doesn't prove MiniMax actually used Sardana's equations. It means its revealed engineering choice has the same qualitative optimum.

### DeepSeek V4 Flash makes this even clearer

DeepSeek provides an unusually nice natural comparison. The official V4 release says:

* V4 Pro: **1.6T total / 49B active**
* V4 Flash: **284B total / 13B active**
* both were pretrained on **more than 32T tokens**. ([Hugging Face][11])

So, using the disclosed lower bound of 32T:

[
\begin{aligned}
\text{V4 Pro:}\qquad&
D/N_{\rm total}>20,
&
D/N_{\rm active}>653,\
\text{V4 Flash:}\qquad&
D/N_{\rm total}>113,
&
D/N_{\rm active}>2462.
\end{aligned}
]

The **Pro** configuration even looks Chinchilla-ish if you naïvely divide by total parameters, whereas **Flash uses essentially the same huge data corpus on a model only 18% as large in total parameters and 27% as large in active parameters**.

Again, I would not claim DeepSeek “used Sardana's law” without them saying so. But Flash is almost a textbook demonstration of the inference-aware logic Sardana formalizes.

Qwen3 is another good comparison: its flagship 235B-A22B shares the family's approximately **36T-token** pretraining corpus, with over 30T in its general stage, around 5T in a reasoning-oriented stage, and hundreds of billions more for long context. ([arXiv][12]) Meta's dense Llama 3.1 405B, meanwhile, was trained on more than 15T tokens. ([Meta AI][13])

That produces a revealing spectrum:

| Model             | Total / active (N) |   Disclosed (D) | (D/N_{\rm total}) | (D/N_{\rm active}) |
| ----------------- | -----------------: | --------------: | ----------------: | -----------------: |
| Chinchilla        |          70B / 70B |            1.3T |              18.6 |               18.6 |
| Delphi            |          25B / 25B |            0.6T |                24 |                 24 |
| Kimi K2           |      1.04T / 32.6B |           15.5T |              14.9 |                475 |
| Llama 3.1 405B    |        405B / 405B |            >15T |               >37 |                >37 |
| Qwen3-235B-A22B   |         235B / 22B |            ≈36T |              ≈153 |             ≈1,636 |
| DeepSeek V4 Pro   |         1.6T / 49B |            >32T |               >20 |               >653 |
| DeepSeek V4 Flash |         284B / 13B |            >32T |              >113 |             >2,462 |
| MiniMax M3        |         428B / 22B |          ≈100T* |              ≈234 |             ≈4,545 |
| **Kimi K3**       | **2.78T / 104.2B** | **undisclosed** |                 — |                  — |

*The ~100T M3 figure is NVIDIA's reporting rather than a numerical disclosure in MiniMax's own scaling-law write-up. ([NVIDIA Developer][10])

The (D/N_{\rm active}) column is **not meant as a new scaling law**. It is there precisely to demonstrate how misleading a single “tokens per parameter” number becomes for sparse models.

### The broader shift I think these models demonstrate

The original Chinchilla problem was approximately

[
\min_{N,D} L(N,D)
\qquad
\text{s.t.}\quad
C_{\rm train}\le C_0.
]

Modern frontier-model design looks substantially more like

[
\min_{\substack{
N_{\rm total},N_{\rm active},D,\
E,k,\text{shape},\text{attention},\text{context}
}}
\left[
L+
\lambda_{\rm train}C_{\rm train}
+
\lambda_{\rm serve}C_{\rm inference}
+
\lambda_{\rm latency}T_{\rm latency}
+
\lambda_{\rm memory}M
\right].
]

That is why the apparent trajectory from Chinchilla → Llama/Qwen → MiniMax M3/DeepSeek V4 Flash isn't simply “people discovered Chinchilla was wrong.” Chinchilla answered **training-compute optimality**. Modern production labs are optimizing a different objective.

Delphi explicitly recognizes this. It calls Llama 3 8B/15T roughly **90× overtrained relative to its training-compute optimum**, and estimates that a 10×-overtrained configuration may need roughly 6× as much training compute to reach the loss of its compute-optimal counterpart—but notes that this particular extrapolation is less well validated. ([Open Athena][6]) Gemstones independently observes that the loss penalty for substantial overtraining can be surprisingly small and that FLOP-optimality ceases to be the whole story once GPU time and deployment constraints matter. ([arXiv][14])

So my read of K3 is somewhat different from “Moonshot simply scaled Chinchilla to (N=2.8T).” Their report points toward a **multi-dimensional MoE scaling law**: TPP itself was experimentally searched, alongside active capacity, expert sparsity, depth/shape, optimizer and schedule. The 2.78T figure largely represents an enormous **conditional capacity pool**; the per-token computation is associated much more closely with its 104B active pathway. And unlike MiniMax M3's reported 100T data budget, **Moonshot has so far chosen not to tell us where its final K3 landed on the (D) axis**. 

That distinction—**total capacity vs active compute vs data exposure**—is probably the most useful way to read modern frontier scaling, rather than comparing everything against “20 tokens per parameter.”

I can monitor Moonshot's report/repository for the missing K3 final token budget or TPP if they publish it.

[1]: https://huggingface.co/MiniMaxAI/MiniMax-M3?utm_source=chatgpt.com "MiniMaxAI/MiniMax-M3 · Hugging Face"
[2]: https://deepmind.google/blog/an-empirical-analysis-of-compute-optimal-large-language-model-training/?utm_source=chatgpt.com "An empirical analysis of compute-optimal large language model training — Google DeepMind"
[3]: https://arxiv.org/abs/2401.00448?utm_source=chatgpt.com "Beyond Chinchilla-Optimal: Accounting for Inference in Language Model Scaling Laws"
[4]: https://machinelearning.apple.com/research/completed-hyperparameter?utm_source=chatgpt.com "Completed Hyperparameter Transfer across Modules, Width, Depth, Batch and Duration - Apple Machine Learning Research"
[5]: https://arxiv.org/abs/2502.06857?utm_source=chatgpt.com "Gemstones: A Model Suite for Multi-Faceted Scaling Laws"
[6]: https://openathena.ai/blog/delphi/ "Scaling Laws That Extrapolate 300× Past the Fit | Open Athena"
[7]: https://arxiv.org/pdf/2607.24653 "Kimi K3: Open Frontier Intelligence"
[8]: https://arxiv.org/abs/2507.20534?utm_source=chatgpt.com "Kimi K2: Open Agentic Intelligence"
[9]: https://www.minimax.io/blog/minimax-m3 "MiniMax M3: Frontier Coding, 1M Context, Native Multimodality — All in One Model - MiniMax Research | MiniMax"
[10]: https://developer.nvidia.com/blog/deploy-long-context-reasoning-and-agentic-workflows-with-minimax-m3-on-nvidia-accelerated-infrastructure/?utm_source=chatgpt.com "Deploy Long-Context Reasoning and Agentic Workflows with MiniMax M3 on NVIDIA Accelerated Infrastructure | NVIDIA Technical Blog"
[11]: https://huggingface.co/deepseek-ai/DeepSeek-V4-Flash?utm_source=chatgpt.com "deepseek-ai/DeepSeek-V4-Flash · Hugging Face"
[12]: https://arxiv.org/abs/2505.09388 "Qwen3 Technical Report"
[13]: https://ai.meta.com/blog/meta-llama-3-1/?utm_source=chatgpt.com "Introducing Llama 3.1: Our most capable models to date"
[14]: https://arxiv.org/abs/2502.06857 "Gemstones: A Model Suite for Multi-Faceted Scaling Laws"


Frontier model size: total versus activated parameters

Parameters in billions. Dense models activate essentially the full model; MoEs route only a fraction per token.

model	total	active
Kimi K3	2,780	104.2
DeepSeek V4 Pro	1,600	49
Kimi K2	1,040	32.6
MiniMax M3	428	22
Llama 3.1 405B	405	405
DeepSeek V4 Flash	284	13
Qwen3 235B-A22B	235	22
Delphi	25	25

Disclosed frontier pretraining token budgets

Trillions of pretraining tokens. Approximate and lower-bound disclosures are plotted at their reported boundary; Kimi K3 is deliberately omitted because Moonshot has not disclosed its final token count.

model	tokens
MiniMax M3 (~)	100
Qwen3 235B-A22B	36
DeepSeek V4 Flash (>)	32
DeepSeek V4 Pro (>)	32
Kimi K2	15.5
Llama 3.1 405B (>)	15
Chinchilla	1.3
Delphi	0.6

Q2 Please further explain what "scaling law for each LR schedule" means. Also regarding the transparency, please check from practitioner's ideas on generally acclaimed tech reports that features full transparency (and the tutorials that teaches training an LLM from scatch that covers those details), as compared to not that tranparent ones. Showcase the difference.

A2 
Yes. The phrase “independent scaling-law search for each learning-rate schedule” in Kimi K3 is stronger than simply saying “we tuned the learning rate.” It is also a good place to see the difference between a technically impressive report and a genuinely reproducible one.

The practitioner reaction to K3 captures that distinction unusually well: some researchers called its scaling-law result “a piece of art” and the report “amazing,” while others immediately pointed out that the report still does not disclose the final pretraining-token count. In other words, **technical depth and transparency are separate axes**. ([Techmeme][1])

### 1. What does “a scaling law for each LR schedule” actually mean?

Suppose Moonshot wants to compare:

[
s\in{\text{cosine},\ \text{WSD}}.
]

A naïve experiment would fix everything else:

[
N,\quad D,\quad B,\quad \eta_{\max}
]

and only switch the function describing learning rate over time:

[
\eta_t^{\rm cosine}
\quad\text{vs.}\quad
\eta_t^{\rm WSD}.
]

Then, if cosine gets lower validation loss, conclude:

> cosine is better.

K3 specifically argues that this comparison is **not fair**. At the same model size (N) and token budget (D), Moonshot found that cosine and WSD wanted substantially different **peak learning rates and batch sizes**. Therefore, using one schedule's good hyperparameters for the other can make the second schedule look artificially bad. ([alphaXiv][2])

The right mathematical picture is therefore not

[
L(\text{cosine};B,\eta)
\quad \text{vs.}\quad
L(\text{WSD};B,\eta)
]

at one shared (B,\eta).

Instead, for each schedule (s), you want something like

[
L_s^*(N,D)
==========

\min_{B,\eta_{\rm peak},\ldots}
L(N,D,B,\eta_{\rm peak},s,\ldots).
]

And if you're doing a full compute-optimal scaling study,

[
L_s^*(C)
========

\min_{\substack{
N,D,B,\eta_{\rm peak},\
\text{shape},\ldots\
\mathrm{FLOPs}\le C
}}
L(N,D,B,\eta_{\rm peak},s,\ldots).
]

Only then do you compare

[
L_{\rm cosine}^*(C)
\quad\text{against}\quad
L_{\rm WSD}^*(C).
]

That lower envelope is what matters.

A toy example makes this obvious. Imagine experiments reveal:

| Schedule |     Best peak LR | Best global batch | Validation loss |
| -------- | ---------------: | ----------------: | --------------: |
| Cosine   | (3\times10^{-4}) |         8M tokens |            1.90 |
| WSD      | (7\times10^{-4}) |        16M tokens |            1.94 |

But if you lazily run WSD using cosine's settings:

| Schedule |       LR | Batch |     Loss |
| -------- | -------: | ----: | -------: |
| Cosine   | (3e{-4}) |    8M | **1.90** |
| WSD      | (3e{-4}) |    8M |     2.05 |

you would conclude that cosine beats WSD by 0.15 loss.

After separately optimizing WSD, the actual difference is only 0.04.

That is essentially what the K3 text is warning against. Moonshot says it conducted an **independent scaling-law search for each schedule**, and after allowing each to operate at its own optimum, cosine still consistently won. ([alphaXiv][2])

There is also recent theoretical support for why this interaction is expected rather than weird. Work on optimal LR schedules under functional scaling laws shows that the optimal peak learning rate itself depends on training horizon and task regime, and that the optimal schedule shape can transition between power-decay-like and WSD-like behavior. So “schedule shape,” “peak LR,” and “how long you train” are coupled variables, not independent knobs. ([arXiv][3])

### 2. It does NOT necessarily mean K3 fitted two explicit LR equations

This is an important terminology nuance.

When K3 says “independent scaling-law search,” I would **not** interpret that as Moonshot necessarily having published something explicit like

[
\eta_{\rm cosine}^*(N)
======================

aN^{-0.37}
]

and

[
\eta_{\rm WSD}^*(N)
===================

bN^{-0.41}.
]

The public report does not give us such equations.

Rather, the disclosed procedure is approximately:

[
\boxed{
\text{choose schedule}
\rightarrow
\text{search HPs across scaling runs}
\rightarrow
\text{find its optimal recipe}
\rightarrow
\text{fit/compare resulting scaling behavior}.
}
]

K3's broader scaling study retunes batch size, learning rate, tokens-per-parameter and model shape after changing the architecture/data/training recipe, and evaluates the resulting scaling curves on held-out OOD validation data. ([alphaXiv][2])

So “scaling law **for** each LR schedule” is better read as:

> **a separately optimized scaling recipe and scaling curve conditional on each LR schedule.**

This is closely related to what Delphi calls a distinction between a **scaling law** and a **scaling recipe**. Delphi explicitly says a scaling law by itself doesn't tell you how to train models; a recipe maps compute to width, depth, batch size, LR, duration, etc. ([Open Athena][4])

In notation:

[
C
\xrightarrow{\text{recipe }R_s}
(N,D,H,L,B,\eta,\ldots)
\xrightarrow{\text{train}}
L_{\rm val}
\xrightarrow{\text{fit}}
\text{scaling law}.
]

Thus K3 effectively evaluates two recipes,

[
R_{\rm cosine}(C)
]

and

[
R_{\rm WSD}(C),
]

rather than changing one line in an otherwise identical final training config.

---

## 3. This is precisely where K3's transparency stops short

Here's the information I would want if I were actually trying to reproduce Moonshot's conclusion.

| Question                                             | K3 tells us?            |
| ---------------------------------------------------- | ----------------------- |
| Was cosine compared with WSD?                        | ✅                       |
| Was minimum LR held fixed?                           | ✅                       |
| Were (B) and peak LR separately optimized?           | ✅                       |
| Did cosine win after separate optimization?          | ✅                       |
| Were K3 scaling laws evaluated on held-out OOD data? | ✅                       |
| Was TPP included in broader scaling search?          | ✅                       |
| Exact proxy model sizes used?                        | ❌ / insufficient detail |
| Exact token budgets at every scaling point?          | ❌                       |
| Exact candidate peak LRs?                            | ❌                       |
| Exact candidate batch sizes?                         | ❌                       |
| Number of trials per point?                          | ❌                       |
| Random seeds?                                        | ❌                       |
| Numerical losses of every trial?                     | ❌                       |
| Fitted LR-vs-scale rule?                             | ❌                       |
| Scaling-law coefficients and fitting code?           | ❌                       |
| Final K3 pretraining token count (D)?                | ❌                       |
| Final K3 TPP?                                        | ❌                       |
| Exact data mixture/order?                            | ❌                       |
| Complete pretraining code/config?                    | ❌                       |

That does **not** make the result weak. It means you can understand the conclusion and probably reproduce the *idea*, but you cannot independently reproduce Moonshot's experimental path from their disclosure alone.

And practitioners noticed exactly this dichotomy: contemporary reaction praised the K3 scaling-law work while separately criticizing the absence of the model's total training-token count. ([Techmeme][1])

---

# 4. What does a genuinely “fully transparent” LLM report look like?

A particularly clean spectrum is:

[
\text{Kimi / Llama / DeepSeek report}
\longrightarrow
\text{Delphi}
\longrightarrow
\text{Pythia / LLM360 / OLMo}.
]

They serve somewhat different purposes.

### Tier A — “I can inspect/reconstruct the actual training process”: OLMo, Pythia, LLM360

**OLMo is probably the best current reference for what practitioners mean by fully open.**

Ai2 releases the training data, training/midtraining/post-training datasets, source training code, reproducible recipes, evaluation code, intermediate checkpoints and logs. OLMo 2 specifically states that its artifacts include full training data, code/recipes, training logs and thousands of intermediate checkpoints. ([Allen Institute for AI][5])

This isn't just philosophical openness. Ai2 even exposes an actual command corresponding to its production 32B training run:

`torchrun ... OLMo-2-0325-32B-train.py`

and the same tooling permits continuing from an intermediate checkpoint or overriding the LR. ([AllenAI Docs][6])

That's a fundamentally different level of disclosure from:

> “we used AdamW with cosine decay.”

You have the executable definition of what “we used” means.

OLMo 2 32B also publishes concrete corpus accounting: its first-stage OLMo-Mix-1124 contains 3.9T tokens; 32B sees approximately 6T tokens/1.5 epochs, followed by its disclosed Dolmino midtraining process. Its infrastructure report even describes the H100 cluster, ~1800 tokens/s/GPU, ~38% MFU, checkpointing implementation, and the fact that throttling checkpoint uploads improved aggregate throughput by roughly 30%. ([Allen Institute for AI][7])

That last type of detail is valuable to practitioners because it's the stuff a conventional paper often leaves out even though it can determine whether your own run works.

There is a nice Hacker News exchange with an OLMo author that summarizes the practical standard. They note that because the project releases the data, training scripts and intermediate checkpoints, you can take one checkpoint, continue training for several steps on the stated data and check whether your loss agrees. They appropriately note that GPU execution isn't perfectly deterministic, but this is close to an executable audit trail. ([Hacker News][8])

---

### Pythia: perhaps the canonical **scientific experiment** version

Pythia was deliberately designed around questions that normal weight releases cannot answer.

It trained 16 models from 70M to 12B on public data in the **same exact order**, and publishes **154 checkpoints for each model**, along with the training code, data, analysis code, and tools for reconstructing the exact dataloader. ([arXiv][9])

“Same exact data order” sounds obsessive until you want to study something like:

> At which point during pretraining did the model memorize phrase (x)?

Then it becomes essential.

A final checkpoint cannot answer:

[
\theta_0
\rightarrow ? \rightarrow ? \rightarrow ? \rightarrow\theta_T.
]

Pythia gives you approximately

[
\theta_0
\rightarrow\theta_1
\rightarrow\theta_2
\rightarrow\dots
\rightarrow\theta_T
]

plus the data driving those transitions.

That's why Delphi explicitly cites Pythia as its inspiration and mentions subsequent research that used Pythia for memorization, training trajectories, emergence, layerwise prediction formation and model provenance. ([Open Athena][4])

---

### LLM360 goes even further in articulating what “transparent” should contain

LLM360 explicitly complains that final weights + high-level technical reports are insufficient. Its target artifact set is:

* all intermediate checkpoints;
* exact tokenized training data;
* correspondence between data and checkpoints;
* preprocessing and training source code;
* training logs;
* loss;
* gradient norms;
* evaluations throughout training.

Amber, for example, came with **360 checkpoints** and its per-step data sequence. ([LLM 360][10])

In other words, LLM360's definition is roughly:

[
\boxed{
\text{weights}
+
\text{code}
+
\text{data}
+
\text{order}
+
\text{configs}
+
\text{checkpoints}
+
\text{logs}
}
]

rather than just

[
\boxed{\text{weights + paper}.}
]

---

# 5. Delphi is a slightly different kind of excellent transparency

Delphi isn't merely “here is the successful final run.”

It tells you:

1. what hypothesis they tried;
2. where it failed;
3. how badly the scaling prediction failed;
4. their diagnosis;
5. what they changed;
6. the new hyperparameter-transfer rule;
7. their 24-condition validation;
8. which scaling points were allowed into the fit;
9. which runs were held out;
10. what was predicted before seeing those results;
11. the final prediction error;
12. the actual implementation files.

That makes the scientific claim **falsifiable**.

Their original recipe missed (10^{22}) FLOPs by 2.5% and their (10^{23}) run diverged. After modifying optimizer/weight-decay/duration scaling and validating it, they fit only through (3\times10^{20}) and correctly predicted the held-out (10^{21},10^{22},10^{23}) runs to within roughly 0.5%, 0.2%, and 0.2%. ([Open Athena][4])

This is extremely useful for interpreting K3.

K3 says:

> independent scaling search showed cosine > WSD.

Delphi would ideally show you something closer to:

[
\begin{array}{c|c|c|c|c}
C & B & \eta & D & L\
\hline
...&...&...&...&...
\end{array}
]

for both schedule families, then expose the fit and held-out points.

That's the piece missing from K3.

---

# 6. DeepSeek-V3 is an interesting middle ground

I would not put DeepSeek-V3 in the same category as OLMo, but its report is legitimately unusually informative for a commercial frontier lab.

DeepSeek tells us, among many other things:

[
N_{\rm total}=671B,\qquad
N_{\rm active}=37B,
]

[
D=14.8T,
]

and approximately

[
2.788\text{ million H800 GPU-hours}.
]

It describes MLA, DeepSeekMoE, auxiliary-loss-free balancing, multi-token prediction, FP8 training, communication/computation overlap and reports that its full run required no rollback from an irrecoverable loss spike. ([arXiv][11])

That degree of engineering disclosure was itself enthusiastically discussed by practitioners; Hacker News commentary singled out FP8 training, MTP, extreme MoE sparsity, low training cost and systems co-design as an unusually dense collection of practical innovations in one report. ([Hacker News][12])

But:

[
\text{DeepSeek-V3}
\neq
\text{fully reconstructable experiment}.
]

The exact training corpus isn't released; its exact token stream/order isn't reconstructable; there isn't a Pythia-like set of hundreds of training checkpoints with the corresponding examples; and the released repository doesn't give you an OLMo-like end-to-end recipe capable of regenerating the 14.8T-token pretraining run.

The practitioner debate around “DeepSeek is open-source” makes exactly this distinction: several users point out that weights without the training corpus and complete training pipeline are better described as **open weights** rather than reproducible open-source training. ([Reddit][13])

So I'd call DeepSeek-V3:

> **high recipe transparency, low process reproducibility.**

---

# 7. Llama 3 is another instructive case

Meta's Llama 3 report is actually quite rich scientifically. For example, it describes scaling-law experiments for data mixtures and reports roughly:

[
50% \text{ general knowledge},
\quad
25% \text{ math/reasoning},
\quad
17% \text{ code},
\quad
8% \text{ multilingual}.
]

It also explains that small scaling experiments were used to predict the large-model outcome and select candidate data mixtures. ([ResearchGate][14])

Meta discloses **15T+ pretraining tokens**, and its initial Llama 3 release explains the filtering pipeline—heuristics, NSFW filtering, semantic deduplication, quality classifiers—and that over 5% of the earlier Llama 3 training mix was high-quality non-English data. It also discusses its use of scaling laws to predict downstream benchmark performance before large runs. ([Meta AI][15])

And the 405B report gets quite engineering-specific: practitioners highlighted the batch/sequence curriculum starting around 4M-token batches at 4K sequences, then 8M/8K, and ultimately 16M-token batches; its final long-context extension gradually moves up toward 128K. ([Reddit][16])

Yet the corpus itself is not available. Independent research explicitly notes that the original Llama 3 corpus cannot be obtained and therefore has to be reconstructed approximately from public alternatives. ([MDPI][17])

Again:

> **excellent technical report ≠ reproducible training release.**

---

# 8. I would place Kimi K3 here

My own practical scale would be:

| Release         | Architecture detail | Final (D) | Exact data            | Training code     | Config/HPs                    | Intermediate ckpts/logs | Scaling experiment reproducible |
| --------------- | ------------------- | --------- | --------------------- | ----------------- | ----------------------------- | ----------------------- | ------------------------------- |
| **Pythia**      | ✅                   | ✅         | ✅ + order             | ✅                 | ✅                             | ✅ extensive             | ✅                               |
| **LLM360**      | ✅                   | ✅         | ✅ + mapping           | ✅                 | ✅                             | ✅ extensive             | ✅/very high                     |
| **OLMo 2/3**    | ✅                   | ✅         | ✅                     | ✅ production code | ✅                             | ✅ thousands             | ✅/very high                     |
| **Delphi**      | ✅                   | ✅         | ✅ mixture             | ✅                 | ✅ exceptionally detailed      | ✅                       | **✅ core purpose**              |
| **DeepSeek-V3** | ✅ excellent         | ✅ 14.8T   | ⚠️ description        | ❌ full pipeline   | ✅ many details                | ❌                       | ⚠️                              |
| **Llama 3**     | ✅ excellent         | ✅ 15T+    | ⚠️ categories/mixture | ❌                 | ✅ many details                | ❌                       | ⚠️                              |
| **Kimi K3**     | **✅ excellent**     | **❌**     | ⚠️ high-level         | ❌ full pipeline   | ⚠️ concepts but missing grids | ❌                       | **❌ currently**                 |

This is why I'd resist simply calling K3 “non-transparent.” It would be unfair.

A better description is:

[
\boxed{\text{K3 is highly explanatory but weakly reproducible.}}
]

Moonshot explains **why** they made many architectural/training choices extraordinarily well. It gives useful ablations and a serious scaling-law argument. The report documents a 2.8T/104B-active architecture and attributes an approximately 2.5× scaling-efficiency improvement over K2 to architecture, data and training improvements. ([arXiv][18])

But it doesn't give enough artifacts for an outsider to replay the experiments that led there.

---

# 9. The best tutorials make the missing information obvious

This is actually a great way to learn what a frontier technical report *should* tell you.

The strongest current example I found is no longer nanoGPT; it is Karpathy's newer **nanochat**.

nanochat explicitly covers:

[
\text{raw data}
\rightarrow
\text{tokenizer}
\rightarrow
\text{pretraining}
\rightarrow
\text{evaluation}
\rightarrow
\text{midtraining}
\rightarrow
\text{SFT}
\rightarrow
\text{RL}
\rightarrow
\text{chat model}.
]

It is deliberately a complete small-scale LLM laboratory rather than only an architecture demonstration. ([GitHub][19])

And look at the parameters Karpathy has to tell you before you can reproduce a run:

* exact dataset/shards;
* tokenizer algorithm;
* tokenizer training corpus size;
* vocabulary size;
* context length;
* depth;
* width;
* number of heads;
* parameter count;
* microbatch;
* global token batch;
* gradient accumulation;
* training tokens;
* number of iterations;
* scaling rule for learning rate;
* optimizer for matrices;
* optimizer for embeddings;
* learning-rate decay;
* precision;
* evaluation metric;
* GPU count/type;
* throughput;
* MFU;
* wall-clock duration;
* approximate dollar cost.

The walkthrough even calculates the Chinchilla-style training horizon explicitly. A ~560M-parameter example is assigned roughly

[
560M\times20\approx11.2B
]

training tokens and maps that to the optimization-step count from the global batch size. It explains that LR is scaled roughly with (1/\sqrt{d}), uses Muon for matrices plus AdamW for embedding/unembedding, and exposes the evaluation and training pipeline. ([GitHub][20])

nanochat even has:

`runs/scaling_laws.sh`

specifically for running scaling experiments. ([GitHub][19])

This is exactly why a practitioner reading K3 naturally asks:

> “Okay, you say TPP, LR and batch were searched. **What values did your equivalent of `scaling_laws.sh` actually run?**”

That's the missing layer.

---

# 10. Karpathy's older material exposes another important distinction

nanoGPT's training script literally exposes:

[
\begin{aligned}
\eta_{\max}&=6\times10^{-4}\
\beta_1&=0.9\
\beta_2&=0.95\
\lambda_{\rm WD}&=0.1\
|\nabla|*{\max}&=1.0\
T*{\rm warmup}&=2000\text{ steps}\
\eta_{\min}&=6\times10^{-5}.
\end{aligned}
]

It also exposes batch size, gradient accumulation, context size, precision and DDP configuration. ([GitHub][21])

The newer `build-nanogpt` tutorial deliberately starts with an empty file and adds each piece commit-by-commit until it reproduces GPT-2 124M. ([GitHub][22])

And `llm.c` goes one level deeper: it compares C/CUDA results against a PyTorch reference using known activations, logits, gradients and losses and demonstrates a complete GPT-2 reproduction. ([GitHub][23])

So there are actually three forms of transparency:

[
\boxed{
\begin{array}{ll}
\textbf{Algorithm transparency:}&
\text{Can I understand what you're doing?}[2mm]
\textbf{Recipe transparency:}&
\text{Do I know every knob/value?}[2mm]
\textbf{Execution transparency:}&
\text{Can I reconstruct the actual run?}
\end{array}}
]

Kimi K3 is excellent at the first, decent at the second in selected areas, and poor at the third.

OLMo/Pythia are strong at all three.

---

# 11. Raschka and Hugging Face are useful at different abstraction levels

Sebastian Raschka's *Build a Large Language Model From Scratch* is probably the best explanatory counterpart if your goal is understanding rather than production-scale reproduction. It walks through tokenization, embeddings, attention, GPT architecture, pretraining and finetuning; its supplementary material explicitly covers practical training-loop refinements including LR schedules. ([Sebastian Raschka, PhD][24])

Karpathy is somewhat closer to:

> “What exactly would I type if I were genuinely training an LM?”

Raschka is closer to:

> “What does every piece mean and why does it exist?”

Hugging Face's causal-LM-from-scratch tutorial is another level higher. It takes you from tokenized data through causal-LM batching and Transformers/Accelerate training. The worked example uses about 2.1B tokens and makes choices such as context length explicit, but abstracts away much more of the optimizer/distributed implementation through `Trainer`. ([Hugging Face][25])

So for your particular interest in scaling-law reports I would learn them in this order:

[
\boxed{
\text{Raschka}
\rightarrow
\text{nanochat/build-nanoGPT}
\rightarrow
\text{Pythia/OLMo}
\rightarrow
\text{Delphi}
\rightarrow
\text{K3/DeepSeek frontier reports}.
}
]

The reason is that after doing nanochat or OLMo once, omissions in a frontier report become extremely obvious.

---

## 12. A concrete example: what would a “fully transparent K3 §3.2” look like?

Instead of the current statement:

> Cosine and WSD have different optimal peak LRs/batch sizes; we ran independent scaling-law searches and cosine won.

a Pythia/OLMo/Delphi-level disclosure would give something like:

[
\textbf{search space}
]

[
N\in{0.5B,1.5B,4B,12B,\ldots}
]

[
D/N\in{10,20,40,80,\ldots}
]

[
B\in{1M,2M,4M,8M,16M}\text{ tokens}
]

[
\eta_{\max}\in
{1e{-4},2e{-4},4e{-4},8e{-4}}
]

[
s\in{\text{cosine,WSD}}.
]

Then provide every trial:

[
(N,D,B,\eta,s,\text{seed})
\longrightarrow
(L_{\rm train},L_{\rm val},\text{grad norm},\ldots).
]

Then fit, for each schedule,

[
B_s^*(C),\qquad
\eta_s^*(C),\qquad
N_s^*(C),\qquad
D_s^*(C),
]

followed by

[
L_s^*(C)=L_{\infty,s}+A_sC^{-\alpha_s}.
]

Then preregister or otherwise freeze the fit, train a larger held-out model, and report

[
\frac{
L_{\rm observed}-L_{\rm predicted}
}{
L_{\rm predicted}
}.
]

Then release:

* CSV/W&B logs;
* fitting script;
* config files;
* exact commit;
* intermediate checkpoints;
* token mixture;
* preferably token order.

**That would turn “we found cosine scales better” into something an independent lab could actually interrogate.**

And that is very close to what Delphi does for its central scaling claim and what OLMo/Pythia do for the underlying training trajectory. ([Open Athena][4])

So the deeper lesson from K3's wording is not merely that **cosine beats WSD**. It is that a training recipe is a coupled system:

[
\boxed{
\text{schedule}
\leftrightarrow
\eta_{\rm peak}
\leftrightarrow
B
\leftrightarrow
D
\leftrightarrow
N
\leftrightarrow
\text{architecture}.
}
]

Changing one major component can move the optimum of the others. This is also why simply copying “LR = (2\times10^{-4})” from a frontier report into another architecture is much less principled than it appears.

And it explains why I find the combination of **nanochat → OLMo/Pythia → Delphi** especially useful: nanochat shows you all the knobs, OLMo/Pythia show you what it looks like to expose the complete experiment, and Delphi shows how those knobs themselves should change when you scale. K3 then shows what a frontier industrial team is doing with the same philosophy—but only exposes part of the experimental notebook. ([GitHub][19])

[1]: https://techmeme.com/?utm_source=chatgpt.com "Techmeme"
[2]: https://www.alphaxiv.org/abs/2607.kimi-k3-report?utm_source=chatgpt.com "Kimi K3: Open Frontier Intelligence | alphaXiv"
[3]: https://arxiv.org/abs/2602.06797?utm_source=chatgpt.com "Optimal Learning-Rate Schedules under Functional Scaling Laws: Power Decay and Warmup-Stable-Decay"
[4]: https://openathena.ai/blog/delphi/?utm_source=chatgpt.com "Open Athena | Scaling Laws That Extrapolate 300× Past the Fit"
[5]: https://allenai.org/olmo2?utm_source=chatgpt.com "OLMo from Ai2"
[6]: https://docs.allenai.org/in_depth/training?utm_source=chatgpt.com "Training models | Ai2 platform documentation"
[7]: https://allenai.org/blog/olmo2-32b?utm_source=chatgpt.com "OLMo 2 32B: First fully open model to outperform GPT 3.5 and GPT 4o mini | Ai2"
[8]: https://news.ycombinator.com/item?id=46001889&utm_source=chatgpt.com "Olmo 3: Charting a path through the model flow to lead open-source AI | Hacker News"
[9]: https://arxiv.org/abs/2304.01373?utm_source=chatgpt.com "Pythia: A Suite for Analyzing Large Language Models Across Training and Scaling"
[10]: https://www.llm360.ai/news/introducing-llm360-fully-transparent-open-source-llms.html?utm_source=chatgpt.com "Introducing LLM360: Fully Transparent open-source LLMs | LLM360"
[11]: https://arxiv.org/abs/2412.19437?utm_source=chatgpt.com "DeepSeek-V3 Technical Report"
[12]: https://news.ycombinator.com/item?id=42517113&utm_source=chatgpt.com "DeepSeek-v3 Technical Report [pdf] | Hacker News"
[13]: https://www.reddit.com/r/LocalLLaMA/comments/1ibh9lr?utm_source=chatgpt.com "Why DeepSeek V3 is considered open-source?"
[14]: https://www.researchgate.net/publication/382739128_The_Llama_3_Herd_of_Models?_tp=eyJjb250ZXh0Ijp7InBhZ2UiOiJzY2llbnRpZmljQ29udHJpYnV0aW9ucyIsInByZXZpb3VzUGFnZSI6bnVsbCwic3ViUGFnZSI6bnVsbH19&utm_source=chatgpt.com "(PDF) The Llama 3 Herd of Models"
[15]: https://ai.meta.com/blog/meta-llama-3/?utm_source=chatgpt.com "Introducing Meta Llama 3: The most capable openly available LLM to date"
[16]: https://www.reddit.com/r/LocalLLaMA/comments/1f92ezf?utm_source=chatgpt.com "Long Context Pre-training Drawbacks"
[17]: https://www.mdpi.com/2079-9292/15/7/1533?utm_source=chatgpt.com "Evolving LLMs from Next-Token Prediction to Multi-Token Prediction via Self-Distillation"
[18]: https://arxiv.org/abs/2607.24653 "Kimi K3: Open Frontier Intelligence"
[19]: https://github.com/karpathy/nanochat?utm_source=chatgpt.com "GitHub - karpathy/nanochat: The best ChatGPT that $100 can buy. · GitHub"
[20]: https://github.com/karpathy/nanochat/discussions/1?utm_source=chatgpt.com "Introducing nanochat: The best ChatGPT that $100 can buy. · karpathy nanochat · Discussion #1 · GitHub"
[21]: https://github.com/karpathy/nanoGPT/blob/master/train.py?utm_source=chatgpt.com "nanoGPT/train.py at master · karpathy/nanoGPT · GitHub"
[22]: https://github.com/karpathy/build-nanogpt?utm_source=chatgpt.com "GitHub - karpathy/build-nanogpt: Video+code lecture on building nanoGPT from scratch · GitHub"
[23]: https://github.com/karpathy/llm.c?utm_source=chatgpt.com "GitHub - karpathy/llm.c: LLM training in simple, raw C/CUDA · GitHub"
[24]: https://sebastianraschka.com/llms-from-scratch/?utm_source=chatgpt.com "Build a Large Language Model (From Scratch) | Sebastian Raschka, PhD"
[25]: https://huggingface.co/docs/course/chapter7/6?utm_source=chatgpt.com "Training a causal language model from scratch · Hugging Face"
