# Primary-paper packet

This directory is a compact, offline packet for the field guide. It favors papers that establish
the architecture, positional encoding, sparse-expert, scaling, data, and serving concepts used in
the interactive lessons. Each file was downloaded on **2026-08-13**, checked for a `%PDF-` file
signature, parsed with `pdfinfo`, and pinned in `SHA256SUMS.txt`.

| Local file | Title | Identifier | Topic | Source URL | Pages | SHA-256 | Downloaded |
| --- | --- | --- | --- | --- | ---: | --- | --- |
| `attention-is-all-you-need.pdf` | Attention Is All You Need | arXiv:1706.03762 | Transformer and multi-head attention | <https://arxiv.org/pdf/1706.03762> | 15 | `bdfaa68d8984f0dc02beaca527b76f207d99b666d31d1da728ee0728182df697` | 2026-08-13 |
| `glu-variants.pdf` | GLU Variants Improve Transformer | arXiv:2002.05202 | GLU, GEGLU, and SwiGLU feed-forward blocks | <https://arxiv.org/pdf/2002.05202> | 5 | `7398ae8b163722a6b5410fb975722adbe6b5f6f9c7f1efa584f1c6b79eaa93e2` | 2026-08-13 |
| `roformer.pdf` | RoFormer: Enhanced Transformer with Rotary Position Embedding | arXiv:2104.09864 | RoPE mathematics and relative-position property | <https://arxiv.org/pdf/2104.09864> | 14 | `e9a481fbe1c8a20b7b1fa566b13102a1896c7829fa9a8b4c80528452a5ddaf79` | 2026-08-13 |
| `yarn.pdf` | YaRN: Efficient Context Window Extension of Large Language Models | arXiv:2309.00071 | RoPE context extension | <https://arxiv.org/pdf/2309.00071> | 20 | `e7c0268a796138460c6ba2f67a7cba5bd922c401aea94c1fcd09c4b76b883c85` | 2026-08-13 |
| `grouped-query-attention.pdf` | GQA: Training Generalized Multi-Query Transformer Models from Multi-Head Checkpoints | arXiv:2305.13245 | MHA, MQA, GQA, and KV-cache trade-offs | <https://arxiv.org/pdf/2305.13245> | 7 | `ba9094fe73db9bf515d47ae8b2d502fee9d8a6c7b1327e197ddb160f4c63b94a` | 2026-08-13 |
| `qwen2-vl.pdf` | Qwen2-VL: Enhancing Vision-Language Model's Perception of the World at Any Resolution | arXiv:2409.12191 | Multimodal rotary position embedding | <https://arxiv.org/pdf/2409.12191> | 52 | `30bb0f6c9babf910295d6b7cd34b6f54824236f68782664c3c93fbf4803275d0` | 2026-08-13 |
| `switch-transformer.pdf` | Switch Transformers: Scaling to Trillion Parameter Models with Simple and Efficient Sparsity | arXiv:2101.03961 | Top-1 MoE routing, capacity, and load balancing | <https://arxiv.org/pdf/2101.03961> | 40 | `f340f6ace31abf7d0730ef461404279f40d3c890e9cc2daeb7068b3304afdbd6` | 2026-08-13 |
| `deepseek-moe.pdf` | DeepSeekMoE: Towards Ultimate Expert Specialization in Mixture-of-Experts Language Models | arXiv:2401.06066 | Fine-grained routed and shared experts | <https://arxiv.org/pdf/2401.06066> | 33 | `a64b509e1410d09cf5b70570788d27790985fb9808ce436b9da8de73f2eed651` | 2026-08-13 |
| `deepseek-v3.pdf` | DeepSeek-V3 Technical Report | arXiv:2412.19437 | MoE balancing, training recipe, and systems report | <https://arxiv.org/pdf/2412.19437> | 53 | `812a3fd645c80725354de9d831a6785503007a60681461407f64e97305fa9330` | 2026-08-13 |
| `llama-2.pdf` | Llama 2: Open Foundation and Fine-Tuned Chat Models | arXiv:2307.09288 | Decoder architecture, GQA, data, and post-training | <https://arxiv.org/pdf/2307.09288> | 77 | `1df284ce95f783002074bfe8f21d47c646b396ceb1736ea3ec0ea212fc070d91` | 2026-08-13 |
| `chinchilla.pdf` | Training Compute-Optimal Large Language Models | arXiv:2203.15556 | Compute-optimal scaling laws | <https://arxiv.org/pdf/2203.15556> | 36 | `3fd3632a8ef48171bd25282990221d49535d75356192f068b3b2ebe08f2aedd4` | 2026-08-13 |
| `olmo.pdf` | OLMo: Accelerating the Science of Language Models | arXiv:2402.00838 | Open model, data, training, and evaluation artifacts | <https://arxiv.org/pdf/2402.00838> | 21 | `121e82248da601e8e4d4da5fa9b4486660ecf0f5a0fae5292b7af3c656c2385d` | 2026-08-13 |
| `olmo-2.pdf` | 2 OLMo 2 Furious | arXiv:2501.00656 | OLMo 2 architecture and staged training | <https://arxiv.org/pdf/2501.00656> | 58 | `8614beaaf35ce5d20fde755d350bd02637bdbe5a390de237ce942c8ac4ee2dd8` | 2026-08-13 |
| `olmo-3.pdf` | OLMo 3 | arXiv:2512.13961 | Open model lifecycle and released artifacts | <https://arxiv.org/pdf/2512.13961> | 118 | `f75208766c58a7eec434be61c93b5f7d904f2d2de31c02fca98dc9db0980fcae` | 2026-08-13 |
| `dolma.pdf` | Dolma: An Open Corpus of Three Trillion Tokens for Language Model Pretraining Research | arXiv:2402.00159 | Dataset construction, filtering, and documentation | <https://arxiv.org/pdf/2402.00159> | 64 | `8c8ca17ecf6a7a7cde309daba7badbca32012c9f67decc87d3f54d28aaa43429` | 2026-08-13 |
| `pagedattention-vllm.pdf` | Efficient Memory Management for Large Language Model Serving with PagedAttention | arXiv:2309.06180 | KV-cache management and serving throughput | <https://arxiv.org/pdf/2309.06180> | 16 | `55b3b324d779a67c59dac2519445e3b07c14e6ff5c656fadb47a3d7b5997469e` | 2026-08-13 |

## Integrity check

From this directory, run:

```sh
shasum -a 256 -c SHA256SUMS.txt
```

## Copyright and licensing

These local copies are retained for personal/local study. Copyright and redistribution terms remain
specific to each paper and its authors or publisher. Inclusion here does not relicense any work;
check the paper's source page and license before redistributing a PDF or derived material.
