---
name: prompt-engineering-mastery
description: "Master prompt engineering across frontier LLMs (Claude 3.5, GPT-4o, Gemini 2.0, DeepSeek). Covers Chain-of-Thought (CoT), Few-Shot demonstrations, ReAct prompting, prompt caching, meta-prompting, and strict structured JSON outputs."
---

# Prompt Engineering Mastery Playbook

Architecting high-accuracy, hallucination-resistant, and cost-optimized prompts for production AI applications.

---

## 1. Advanced Prompting Frameworks

### 1. Chain-of-Thought (CoT) & Step-by-Step Reasoning
- Explicitly instruct the model to think before responding:
  ```markdown
  Before providing the final answer, break down the problem into logical components inside <thinking>...</thinking> tags. Verify edge cases and constraints, then output the final verified result.
  ```
- Best for complex calculations, logic puzzles, multi-step code generation, and legal/policy compliance.

### 2. Few-Shot In-Context Demonstrations
- Never rely on zero-shot for nuanced formatting or strict domain logic.
- Include 3-5 high-quality input/output pairs representing:
  1. Standard happy path
  2. Complex edge case
  3. Negative case (what NOT to do)

### 3. Role & System Architecture
- **System Prompt**: Set core persona, strict behavioral boundaries, forbidden actions, and tone.
- **Context/Reference Data**: Pass external documents inside clearly delimited XML tags (e.g. `<context>...</context>`).
- **User Prompt**: Provide the current instruction and inputs.

---

## 2. Enforcing Strict Structured Outputs

- Never ask the model to "please output in JSON format" without schema enforcement.
- Always use **Function Calling / Structured Outputs** (Zod in TypeScript, Pydantic in Python).
- Enforce strict typing with `response_format: { type: "json_schema", strict: true }`.

---

## 3. Prompt Caching & Cost Optimization

- **Anthropic & OpenAI Prompt Caching**:
  - Place static system instructions, tool definitions, and large reference documents at the top of the prompt.
  - The cache breakpoint triggers if the prefix is at least 1,024 tokens (Anthropic).
  - Subsequent requests achieve up to **90% cost reduction** and **80% latency reduction**.
