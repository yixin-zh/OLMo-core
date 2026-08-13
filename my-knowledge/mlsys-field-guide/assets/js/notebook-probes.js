"use strict";

window.NOTEBOOK_PROBES = [
  {
    page: "20260812_174414.JPG",
    mark_type: "arrow-note",
    literal:
      "cos decay ↔ WSD decay; (Kimi K3) → different optimal batch size & peak lr ... as they are coupled → independent scaling law search",
    normalized:
      "Cosine decay versus warmup-stable-decay; jointly study batch size, peak learning rate, and schedule.",
    question_semantics: "not-question",
    confidence: "medium",
    correction:
      "Cosine and WSD are not interchangeable: cosine decays across most of training, while WSD has a stable plateau and terminal decay. Batch size, peak LR, and schedule interact, so a transparent search must record the joint trial grid.",
    lesson_id: "scaling-joint-search",
  },
  {
    page: "20260812_174414.JPG",
    mark_type: "heading",
    literal: "Transparency in LLM tech reports / What's inside training yaml (OLMo 2)",
    normalized:
      "A technical report needs architecture, recipe, execution, data, scaling, evaluation, and release evidence—not merely YAML.",
    question_semantics: "not-question",
    confidence: "high",
    correction:
      "A YAML can establish intended recipe transparency, but checkpoints, logs, exact data/order, code revision, failures, and evaluations are needed for execution transparency.",
    lesson_id: "report-transparency-stack",
  },
  {
    page: "20260812_174414.JPG",
    mark_type: "field-cluster",
    literal: "model (dim, heads#, layer#)",
    normalized: "Model width d_model, number of query heads, and depth.",
    question_semantics: "not-question",
    confidence: "high",
    correction:
      "Also record head dimension and, for GQA/MQA, the number of KV heads; normally d_head = d_model / n_heads.",
    lesson_id: "model-shape",
  },
  {
    page: "20260812_174414.JPG",
    mark_type: "underline-cluster",
    literal: "mlp_ratio; hidden size → ffn hidden size: dim × ... (SwiGLU)",
    normalized: "FFN expansion width and parameter-equated gated width.",
    question_semantics: "not-question",
    confidence: "high",
    correction:
      "An MLP ratio is architecture-specific. A two-matrix FFN near 4d and a three-matrix SwiGLU near 8d/3 have similar parameter cost; neither multiplier is universal.",
    lesson_id: "ffn-width-budget",
  },
  {
    page: "20260812_174414.JPG",
    mark_type: "underline",
    literal: "weight tying → better for encoding only",
    normalized: "Share the token-embedding and LM-output matrices.",
    question_semantics: "not-question",
    confidence: "high",
    correction:
      "Weight tying is not limited to encoders; decoder-only language models can also tie input embeddings to the LM head. It trades parameters and inductive bias against flexibility.",
    lesson_id: "weight-tying",
  },
  {
    page: "20260812_174414.JPG",
    mark_type: "underline-cluster",
    literal: "alibi, rope, rope_theta / pos. enc.",
    normalized: "Alternative positional mechanisms and RoPE frequency base θ.",
    question_semantics: "not-question",
    confidence: "high",
    correction:
      "ALiBi adds distance-dependent attention bias; RoPE rotates Q/K pairs. rope_theta shapes the frequency spectrum but is not by itself a guaranteed context-length setting.",
    lesson_id: "position-text",
  },
  {
    page: "20260812_174414.JPG",
    mark_type: "underline-cluster",
    literal: "flash att, att dropout",
    normalized: "Attention kernel choice versus attention-probability regularization.",
    question_semantics: "not-question",
    confidence: "high",
    correction:
      "FlashAttention is an exact, IO-aware implementation of attention. Attention dropout changes the computation statistically and is a separate recipe choice.",
    lesson_id: "attention-kernel-vs-math",
  },
  {
    page: "20260812_174414.JPG",
    mark_type: "underline-cluster",
    literal: "For image: Vision Backbone, input size, patch size, pos. patch size, pos. feat #",
    normalized: "Vision input resolution, patchification, token grid, and positional representation.",
    question_semantics: "not-question",
    confidence: "high",
    correction:
      "Separate pixel resolution, patch size, resulting patch-token count, and positional-embedding dimensions; “pos_patch_size” and “pos_feat#” are not universal field names.",
    lesson_id: "vision-tokenization",
  },
  {
    page: "20260812_174414.JPG",
    mark_type: "underline",
    literal: "include_bias",
    normalized: "Bias inclusion must be specified per projection or module.",
    question_semantics: "not-question",
    confidence: "high",
    correction:
      "A single global bias flag is often insufficient: Q/K/V/O projections, FFN layers, embeddings, and normalization affine parameters can differ.",
    lesson_id: "projection-bias",
  },
  {
    page: "20260812_174414.JPG",
    mark_type: "underline-question",
    literal: "block_type; sklearn.PolynomialFeatures(?) / nn.Sequential()",
    normalized: "Transformer-block implementation choice.",
    question_semantics: "learner-question",
    confidence: "high",
    correction:
      "A block type chooses an architecture such as sequential or parallel residual blocks. sklearn.PolynomialFeatures is unrelated; torch.nn.Sequential is only a container, not the architecture itself.",
    lesson_id: "block-anatomy",
  },
  {
    page: "20260812_174414.JPG",
    mark_type: "underline-cluster",
    literal: "layer_norm; type w/ affine, eps; rms; bias & weight",
    normalized: "Normalization family, placement, epsilon, and affine parameters.",
    question_semantics: "not-question",
    confidence: "high",
    correction:
      "LayerNorm centers and scales; RMSNorm scales without subtracting the mean. Record pre/post placement, epsilon, affine-scale use, and bias separately.",
    lesson_id: "normalization",
  },
  {
    page: "20260812_174414.JPG",
    mark_type: "field-cluster",
    literal: "bias for attn; attn.wqkv; qk norms; residual; embedding dropout (prob.)",
    normalized: "Attention projections, QK normalization, residual topology, and dropout sites.",
    question_semantics: "not-question",
    confidence: "medium",
    correction:
      "These are separate architectural axes. “embedding dropout” is a probability, whereas residual layout and QK normalization change block structure.",
    lesson_id: "attention-block-controls",
  },
  {
    page: "20260812_174414.JPG",
    mark_type: "underline",
    literal: "norm_after",
    normalized: "Whether normalization occurs after a sublayer or block.",
    question_semantics: "not-question",
    confidence: "high",
    correction:
      "Prefer the explicit terms pre-norm and post-norm and draw the residual path; a Boolean name alone hides which operation it applies to.",
    lesson_id: "residual-norm-order",
  },
  {
    page: "20260812_174414.JPG",
    mark_type: "blue-dot",
    literal: "Swin Transformer",
    normalized: "Hierarchical vision Transformer using shifted-window attention.",
    question_semantics: "not-question",
    confidence: "high",
    correction:
      "Use as a concrete vision-backbone example, not as a normalization or activation option.",
    lesson_id: "vision-swin-example",
  },
  {
    page: "20260812_174414.JPG",
    mark_type: "underline-example-list",
    literal:
      "activation_type: swiglu, llama silu, silu, relu, gelu, swiglu, quick gelu, gelu-pytorch-tanh",
    normalized: "Scalar activations versus gated FFN families and approximation variants.",
    question_semantics: "not-question",
    confidence: "high",
    correction:
      "ReLU/GELU/SiLU are scalar activations; SwiGLU is a gated two-branch FFN. “Llama SiLU” should be taught as Llama 2's SwiGLU-style FFN using SiLU, and the duplicate SwiGLU entry should be removed.",
    lesson_id: "activation-workbench",
  },
  {
    page: "20260812_174414.JPG",
    mark_type: "field-cluster",
    literal: "max seq length, vocab size, embedding size",
    normalized: "Context limit, vocabulary rows, and embedding width.",
    question_semantics: "not-question",
    confidence: "high",
    correction:
      "Vocabulary size determines embedding-table rows; embedding width is usually d_model. Context length also drives attention and KV-cache cost.",
    lesson_id: "token-embedding-shapes",
  },
  {
    page: "20260812_174414.JPG",
    mark_type: "cross-out",
    literal: "eos / pad token id",
    normalized: "EOS and padding token identities and masking semantics.",
    question_semantics: "not-question",
    confidence: "high",
    correction:
      "EOS and PAD are semantically distinct even when a tokenizer reuses one numeric ID. Loss and attention masks must make the intended behavior explicit.",
    lesson_id: "special-token-semantics",
  },
  {
    page: "20260812_174414.JPG",
    mark_type: "underline-cluster",
    literal: "init device, init_fn*; std / cutoff factor; weight init",
    normalized: "Parameter materialization device and statistical initialization recipe.",
    question_semantics: "not-question",
    confidence: "high",
    correction:
      "init_device controls where tensors are created; init_fn controls their distribution and depth scaling. Record both, including seeds and any truncation cutoff.",
    lesson_id: "initialization-basics",
  },
  {
    page: "20260812_174414.JPG",
    mark_type: "field-cluster",
    literal: "For MoE: mlp_type, moe_expert#, moe_parallelism; weight / expert model",
    normalized: "Expert FFN type, expert count, active parameter count, and expert-parallel layout.",
    question_semantics: "not-question",
    confidence: "medium",
    correction:
      "Expert parallelism is a distribution strategy, not a weight type. Report total experts, active top-k, shared experts, per-expert width, and EP/TP/DP mesh.",
    lesson_id: "moe-configuration",
  },
  {
    page: "20260812_174414.JPG",
    mark_type: "underline-cluster",
    literal: "moe_topk, moe_dropless, capacity factor",
    normalized: "Router fan-out, dispatch policy, and per-expert capacity.",
    question_semantics: "not-question",
    confidence: "high",
    correction:
      "Capacity factor matters for capacity-limited dispatch; a dropless implementation typically routes every assignment and may leave capacity_factor unused or null.",
    lesson_id: "moe-dispatch",
  },
  {
    page: "20260812_174414.JPG",
    mark_type: "blue-dot",
    literal: "DeepSeek MoE → shared expert",
    normalized: "DeepSeekMoE: fine-grained routed experts plus shared experts.",
    question_semantics: "not-question",
    confidence: "high",
    correction:
      "Shared experts are only one of its ideas; also teach expert segmentation, routed specialization, and the distinction between the DeepSeekMoE architecture and later DeepSeek-V3 balancing controls.",
    lesson_id: "moe-deepseek",
  },
  {
    page: "20260812_174414.JPG",
    mark_type: "blue-dot",
    literal: "dMoE",
    normalized: "Likely dense-to-MoE or distributed-MoE shorthand; source reading unresolved.",
    question_semantics: "transcription-uncertain",
    confidence: "medium",
    correction:
      "Keep the literal label visible but do not expand the acronym without its source. It is not interchangeable with DeepSeekMoE.",
    lesson_id: "moe-variant-ledger",
  },
  {
    page: "20260812_174414.JPG",
    mark_type: "blue-dot",
    literal: "Switch Transformer",
    normalized: "Top-1 capacity-limited sparse MoE with auxiliary load balancing.",
    question_semantics: "not-question",
    confidence: "high",
    correction:
      "Use Switch as the contrast to dropless/top-k designs: top-1 routing, finite expert capacity, possible token dropping, and an auxiliary balance loss.",
    lesson_id: "moe-switch",
  },
  {
    page: "20260812_174414.JPG",
    mark_type: "question-cluster",
    literal:
      "why here, not in training? depends on routing internals; shared expert, loss & zloss weight*, load blc (in fp32)",
    normalized:
      "Why router configuration lives under the model although auxiliary router losses act during training.",
    question_semantics: "learner-question",
    confidence: "medium",
    correction:
      "The router is model structure, while load-balancing and z-loss terms enter the training objective. Configuration ownership does not imply that every field affects inference; stable router reductions may use FP32 without making FP32 definitional.",
    lesson_id: "moe-model-vs-objective",
  },
  {
    page: "20260812_174420.JPG",
    mark_type: "example-algorithm",
    literal: "x —model→ logits —cross entropy/labels→ L_LM",
    normalized: "Causal-LM forward pass and token cross-entropy.",
    question_semantics: "not-question",
    confidence: "high",
    correction:
      "Targets are normally next-token-shifted IDs; ignored/padded positions are masked. Cross-entropy is applied to logits and implicitly contains log-softmax.",
    lesson_id: "lm-loss-path",
  },
  {
    page: "20260812_174420.JPG",
    mark_type: "example-algorithm",
    literal: "(MoE only) h_t —router→ r_t —top-k→ {expert IDs}",
    normalized: "Router logits/scores select top-k experts for each token representation.",
    question_semantics: "not-question",
    confidence: "high",
    correction:
      "Distinguish router logits, normalized scores, selected expert IDs, dispatch weights, and the combine step after expert computation.",
    lesson_id: "moe-routing-algorithm",
  },
  {
    page: "20260812_174420.JPG",
    mark_type: "example-algorithm",
    literal: "L_load blcing (lb loss); L_router-z (z loss); softmax normalizing term",
    normalized: "MoE load-balancing loss and router log-partition z-loss.",
    question_semantics: "not-question",
    confidence: "high",
    correction:
      "Load balancing couples expert assignment frequencies with router probabilities; router z-loss penalizes squared logsumexp of router logits. They solve different failure modes.",
    lesson_id: "moe-losses",
  },
  {
    page: "20260812_174420.JPG",
    mark_type: "field-cluster",
    literal: "training (seed, epoch, dry-run, fine tune)",
    normalized: "Run identity, horizon, validation mode, and training phase.",
    question_semantics: "not-question",
    confidence: "high",
    correction:
      "Large pretraining is commonly controlled by steps or tokens rather than epochs. A dry run validates construction; fine-tuning is a separate phase/recipe, not merely a flag.",
    lesson_id: "run-controls",
  },
  {
    page: "20260812_174420.JPG",
    mark_type: "question-mark",
    literal: "LLM ViT connector (l,v)? embedding",
    normalized:
      "Multimodal connector maps vision features into the language-model embedding space; the parenthetical notation is unresolved.",
    question_semantics: "learner-question",
    confidence: "medium",
    correction:
      "Teach the tensor shapes before naming the connector: vision tokens [B,N_v,d_v] are projected/resampled to [B,N'_v,d_model] and inserted into the LM sequence.",
    lesson_id: "multimodal-connector",
  },
  {
    page: "20260812_174420.JPG",
    mark_type: "asterisk-cluster",
    literal: "optimizer*, scheduler*, data, evaluators*",
    normalized: "Core training components with independent configuration and state.",
    question_semantics: "not-question",
    confidence: "high",
    correction:
      "The optimizer owns parameter state, the scheduler updates optimizer fields, data owns sequence/order state, and evaluators consume checkpoints or live model state.",
    lesson_id: "training-component-graph",
  },
  {
    page: "20260812_174420.JPG",
    mark_type: "field-cluster",
    literal: "batch size; micro~; eval bs",
    normalized: "Global training batch, per-device microbatch, and evaluation batch.",
    question_semantics: "not-question",
    confidence: "high",
    correction:
      "Record units as sequences and tokens, plus gradient-accumulation steps and world size; evaluation batch is tuned independently because it has no backward pass.",
    lesson_id: "batch-accounting",
  },
  {
    page: "20260812_174420.JPG",
    mark_type: "question-cluster",
    literal: "resume behavior → restore dataloader?; ff dataloader to next ckpt?",
    normalized:
      "Boolean resume policies for restoring data-loader state or deterministically fast-forwarding it.",
    question_semantics: "boolean",
    confidence: "high",
    correction:
      "These are candidate Boolean controls, but their interaction must be specified: restoring cursor/RNG state and fast-forwarding should not both advance the data twice.",
    lesson_id: "resume-data-state",
  },
  {
    page: "20260812_174420.JPG",
    mark_type: "field",
    literal: "activation ckpting",
    normalized: "Activation checkpointing/rematerialization.",
    question_semantics: "not-question",
    confidence: "high",
    correction:
      "This saves activation memory by recomputing selected forward regions during backward; it is unrelated to model checkpoint files.",
    lesson_id: "activation-checkpointing",
  },
  {
    page: "20260812_174420.JPG",
    mark_type: "underline-cross-out-cluster",
    literal: "saving shared/sharded/un~ ckpts; no pretrain ckpts (true)",
    normalized: "Checkpoint representation and whether a phase emits pretraining checkpoints.",
    question_semantics: "not-question",
    confidence: "medium",
    correction:
      "Use “sharded” versus “unsharded/full” consistently. A Boolean that disables pretraining checkpoints must not be mistaken for absence of a pretrained initialization checkpoint.",
    lesson_id: "checkpoint-artifacts",
  },
  {
    page: "20260812_174420.JPG",
    mark_type: "underline-cluster",
    literal:
      "ckpt to restore / resume from(url); dataloader/trainer; reset optim state after restart (false)",
    normalized:
      "Checkpoint source and independently restorable model, trainer, data, and optimizer states.",
    question_semantics: "boolean",
    confidence: "high",
    correction:
      "reset_optimizer_state is Boolean. A true resume normally restores optimizer/scheduler/trainer/data state; loading model weights with reset state is a warm start or new phase.",
    lesson_id: "checkpoint-resume-semantics",
  },
  {
    page: "20260812_174420.JPG",
    mark_type: "underline-cluster",
    literal: "max grad norm; multi-component grad norm; calc. grad clip; for multimodal",
    normalized: "Global or component-wise gradient-norm measurement and clipping.",
    question_semantics: "not-question",
    confidence: "high",
    correction:
      "Specify norm type, scope, reduction across distributed shards, clipping threshold, and whether modality-specific groups are clipped jointly or separately.",
    lesson_id: "gradient-clipping",
  },
  {
    page: "20260812_174420.JPG",
    mark_type: "field",
    literal: "batch divisor (for distributed)",
    normalized: "Constraint ensuring batch quantities divide across ranks and accumulation.",
    question_semantics: "not-question",
    confidence: "medium",
    correction:
      "Replace the vague name with an equation such as global_batch = microbatch × accumulation × data_parallel_world_size and state padding/drop behavior for remainders.",
    lesson_id: "distributed-batch-equation",
  },
  {
    page: "20260812_174420.JPG",
    mark_type: "question-cluster",
    literal: "precision, wandb-monitor, compile? → torch.compile",
    normalized: "Numeric precision, experiment logging, and Boolean graph compilation.",
    question_semantics: "boolean",
    confidence: "high",
    correction:
      "Only compile is the Boolean question here. Precision changes numerical/storage behavior; W&B is observability; torch.compile is a performance path that needs correctness and recompile checks.",
    lesson_id: "precision-compile-observe",
  },
  {
    page: "20260812_174420.JPG",
    mark_type: "underline",
    literal: "FSDP (wrapping strat, sharding strat, precision) / Fully sharded data parallel",
    normalized:
      "FSDP policy for module wrapping, parameter/gradient/state sharding, and mixed precision.",
    question_semantics: "not-question",
    confidence: "high",
    correction:
      "FSDP is sharded data parallelism, not replicated DDP: report sharding mode, wrap boundaries, mesh size, parameter/reduction dtypes, resharding, and checkpoint format.",
    lesson_id: "fsdp-anatomy",
  },
  {
    page: "20260812_174420.JPG",
    mark_type: "blue-dot",
    literal: "softmax aux. loss for z-loss ... · PaLM",
    normalized: "LM-output z-loss example, distinct from MoE router z-loss.",
    question_semantics: "not-question",
    confidence: "medium",
    correction:
      "Both penalize a log-partition, but one acts on vocabulary logits and the other on router logits. Name the tensor and coefficient so the two cannot be conflated.",
    lesson_id: "z-loss-comparison",
  },
  {
    page: "20260812_174420.JPG",
    mark_type: "underline-blue-dot-question",
    literal: "fused loss? · flash attention (fused CE loss)",
    normalized: "Question about fused cross-entropy versus FlashAttention.",
    question_semantics: "boolean",
    confidence: "high",
    correction:
      "A fused-loss flag can be Boolean, but FlashAttention fuses/tiles the attention computation—not cross-entropy. Fused linear cross-entropy is a separate kernel family.",
    lesson_id: "kernel-fusion-boundaries",
  },
  {
    page: "20260812_174420.JPG",
    mark_type: "field",
    literal: "extra steps after cancel (for ckpting & metrics)",
    normalized: "Graceful preemption/cancellation protocol.",
    question_semantics: "not-question",
    confidence: "high",
    correction:
      "Define these as bounded shutdown actions, not extra optimization steps: stop admitting work, synchronize, save an atomic checkpoint, flush metrics, then exit.",
    lesson_id: "preemption-recovery",
  },
  {
    page: "20260812_174420.JPG",
    mark_type: "underline",
    literal: "profiling (python, torch)",
    normalized: "Host-language profiling versus PyTorch CPU/GPU operator tracing.",
    question_semantics: "not-question",
    confidence: "high",
    correction:
      "Use Python profiling for orchestration overhead and torch.profiler/device traces for operators, kernels, memory, communication, and prefill/decode timelines.",
    lesson_id: "profiling-layers",
  },
  {
    page: "20260812_174420.JPG",
    mark_type: "underline-question-cluster",
    literal:
      "optimizer (type, lr, weight decay, eps, beta); lion / adamw; lr relationship w/ scheduler?",
    normalized:
      "Optimizer family and hyperparameters; scheduler mutates the optimizer learning-rate field.",
    question_semantics: "learner-question",
    confidence: "high",
    correction:
      "AdamW betas are a pair, epsilon stabilizes normalization, and weight decay is decoupled. The scheduler supplies LR as a function of step/token count; beta is not Boolean.",
    lesson_id: "optimizer-scheduler-contract",
  },
  {
    page: "20260812_174420.JPG",
    mark_type: "question-cluster",
    literal: "decay norm and bias?; decay embeddings?",
    normalized: "Boolean parameter-group policies for applying weight decay.",
    question_semantics: "boolean",
    confidence: "high",
    correction:
      "These can be Boolean recipe flags, not universal rules. Record exact named-parameter groups and effective decay so exclusions are reproducible.",
    lesson_id: "optimizer-parameter-groups",
  },
  {
    page: "20260812_174430.JPG",
    mark_type: "field-cluster",
    literal: "scheduler (type, unit); cos / linear w/warmup / inv.sqrt; steps/tokens",
    normalized: "Learning-rate schedule family and progress unit.",
    question_semantics: "not-question",
    confidence: "high",
    correction:
      "Schedule units must agree with the trainer horizon. Current OLMo-core supports step- and token-based scheduling; record the complete piecewise function, not only its name.",
    lesson_id: "scheduler-families",
  },
  {
    page: "20260812_174430.JPG",
    mark_type: "question-cluster",
    literal: "max scheduler?; constant?",
    normalized: "Possible sequential-scheduler horizon and constant-schedule choice.",
    question_semantics: "learner-question",
    confidence: "high",
    correction:
      "constant is a scheduler type, not a Boolean. A sequential scheduler's schedulers_max is a numeric boundary list; it should not be called a generic “max scheduler” flag.",
    lesson_id: "scheduler-composition",
  },
  {
    page: "20260812_174430.JPG",
    mark_type: "asterisk-question",
    literal: "different between phases of training; multimodal?",
    normalized:
      "Which recipe fields change across pretraining, midtraining, long-context, SFT, and multimodal phases.",
    question_semantics: "learner-question",
    confidence: "high",
    correction:
      "Phases may change data mixture, sequence length, LR schedule, optimizer state, objectives, trainable modules, and evaluation gates; multimodality is not the sole distinction.",
    lesson_id: "training-phases",
  },
  {
    page: "20260812_174430.JPG",
    mark_type: "underline-cluster",
    literal: "t_warmup, t_max (steps)",
    normalized: "Warmup duration and scheduler horizon in the selected unit.",
    question_semantics: "not-question",
    confidence: "high",
    correction:
      "t_max may be supplied by the trainer or overridden by a scheduler. Always attach units and state whether warmup is included inside the horizon.",
    lesson_id: "scheduler-timebase",
  },
  {
    page: "20260812_174430.JPG",
    mark_type: "underline-question",
    literal: "alpha_f ?",
    normalized: "Final learning-rate fraction η_min / η_peak.",
    question_semantics: "learner-question",
    confidence: "high",
    correction:
      "alpha_f is numeric, not Boolean. In current OLMo-core cosine/linear schedules, eta_min = initial_lr × alpha_f.",
    lesson_id: "scheduler-final-ratio",
  },
  {
    page: "20260812_174430.JPG",
    mark_type: "field-cluster",
    literal: "grad clip warmup factor; warmup min lr",
    normalized: "Gradient-clipping ramp versus learning-rate warmup floor.",
    question_semantics: "not-question",
    confidence: "high",
    correction:
      "These are separate mechanisms: one changes the clipping threshold, the other changes LR. Give each its own curve and unit.",
    lesson_id: "dual-warmups",
  },
  {
    page: "20260812_174430.JPG",
    mark_type: "underline-cluster",
    literal: "tokenizer (identifier, eos/pad/bos token id, truncate direction)",
    normalized: "Tokenizer identity, special-token IDs, and truncation policy.",
    question_semantics: "not-question",
    confidence: "high",
    correction:
      "Tokenizer identity and IDs belong in the artifact manifest; truncation direction belongs to preprocessing/collation and must be recorded separately.",
    lesson_id: "tokenizer-contract",
  },
  {
    page: "20260812_174430.JPG",
    mark_type: "underline-question",
    literal: "dolma2, gpt2 (a json), mm? hf-...",
    normalized: "Concrete tokenizer identifiers; “mm” reading is unresolved, possibly multimodal.",
    question_semantics: "transcription-uncertain",
    confidence: "medium",
    correction:
      "Dolma2 and GPT-2 are concrete tokenizer families/Hugging Face identifiers. Do not infer a multimodal tokenizer from “mm” until its originating schema is located.",
    lesson_id: "tokenizer-examples",
  },
  {
    page: "20260812_174430.JPG",
    mark_type: "underline-example-list",
    literal:
      "init_fn (type: mitchell, normal, kaiming normal, fan_in, full-megatron; tf.VarianceScaling; Llama 2)",
    normalized: "Initialization schemes and source-specific names.",
    question_semantics: "not-question",
    confidence: "high",
    correction:
      "These names come from different libraries and papers and are not one portable enum. Current OLMo-core uses its own InitMethod set; each scheme needs an equation and source mapping.",
    lesson_id: "initializer-taxonomy",
  },
  {
    page: "20260812_174430.JPG",
    mark_type: "warning-note",
    literal: "won't work w/ fsdp",
    normalized: "Concern about initialization compatibility with FSDP.",
    question_semantics: "learner-question",
    confidence: "high",
    correction:
      "This is too categorical. Compatibility depends on when parameters are materialized and initialized, meta-device handling, sharded initialization, and synchronization; verify per implementation.",
    lesson_id: "distributed-initialization",
  },
  {
    page: "20260812_174430.JPG",
    mark_type: "field-example-cluster",
    literal:
      "eval (label, data*, eval batch size, max new tokens, max examples/subset batches#, save pred/tokens; ind. eval tasks e.g. VQA, clock, reading)",
    normalized:
      "Evaluator identity, dataset, resource caps, generation controls, artifacts, and task suite.",
    question_semantics: "not-question",
    confidence: "high",
    correction:
      "Separate loss/perplexity evaluation from generation/task evaluation, record checkpoint and decoding config, and place cheap online evals versus expensive phase-gate evals explicitly.",
    lesson_id: "evaluation-gates",
  },
  {
    page: "20260812_174430.JPG",
    mark_type: "underline-cluster",
    literal: "data (dataset, dataloader (num_workers, drop_last, memmap data type))",
    normalized: "Dataset identity/storage plus loader concurrency and last-batch policy.",
    question_semantics: "not-question",
    confidence: "high",
    correction:
      "Memmap is a storage/access strategy while dtype is the element representation; drop_last is Boolean and changes token/example accounting.",
    lesson_id: "data-loader-basics",
  },
  {
    page: "20260812_174430.JPG",
    mark_type: "question-cluster",
    literal: "pin_memory?; persistent_workers?",
    normalized: "Boolean PyTorch DataLoader controls.",
    question_semantics: "boolean",
    confidence: "high",
    correction:
      "Both are Boolean in generic PyTorch. In current OLMo-core, pinning is derived from CUDA target and worker count, while persistent_workers is set internally false rather than exposed by these configs.",
    lesson_id: "data-loader-memory-workers",
  },
  {
    page: "20260812_174430.JPG",
    mark_type: "question-cluster",
    literal: "prefetch_factor?; timeout?",
    normalized: "Numeric loader queue depth and timeout duration.",
    question_semantics: "learner-question",
    confidence: "high",
    correction:
      "Neither is Boolean: prefetch_factor is an integer/None and timeout is a duration. Current OLMo-core exposes prefetch_factor but not the pictured generic timeout field in its main loader config.",
    lesson_id: "data-loader-queues",
  },
  {
    page: "20260812_174430.JPG",
    mark_type: "field-question-cluster",
    literal:
      "mixture (sampling rate) ↓ aggregate; split, seed, pad, shuffle?; root_size_mixture; shuffle_messages; max seq length, multi_model?, for_inference?",
    normalized:
      "Mixture weights and aggregation, deterministic partition/order, sequence policy, and Boolean multimodal/inference modes.",
    question_semantics: "boolean",
    confidence: "medium",
    correction:
      "Treat shuffle, multimodal, and for_inference as candidate Boolean fields only after locating their source schema. Sampling rates need normalization and provenance; seed/order/split must be checkpointable. “root_size_mixture” and “multi_model” readings remain schema-dependent.",
    lesson_id: "data-mixture-ordering",
  },
];
