---
name: linkedin-growth-engine
description: Complete LinkedIn Growth & Ghostwriting Engine based on 11 specialized skills. Covers post writing with 20 proven hook formulas, AI humanization (anti-AI tone scrubbing), profile optimization, content planning, comment drafting, thread replies, hook extraction, and content repurposing.
argument-hint: "[write|humanize|plan|hook|optimize|reply|repurpose]"
metadata:
  author: AmrWaled
  version: "1.0.0"
  source: sergebulaev/linkedin-skills
---

# LinkedIn Growth & Ghostwriting Engine

A modular, production-grade skill suite for engineering high-reach, authoritative, and conversion-focused LinkedIn content and presence. Incorporates the complete 11-skill architecture from `sergebulaev/linkedin-skills`.

---

## 1. The 11 Core Capabilities

| Skill Module | Core Responsibility |
|---|---|
| `linkedin-post-writer` | Writes high-converting posts using 20 proven hook formulas (F1–F20) tailored for founders, B2B, and specialists. |
| `linkedin-humanizer` | Scrubs robotic AI markers, balances rhythm, and injects sensory details and concrete numbers. |
| `linkedin-hook-extractor` | Deconstructs viral LinkedIn posts and extracts their underlying psychological hook formula. |
| `linkedin-content-planner` | Builds strategic weekly content calendars balancing authority, trust, and case studies. |
| `linkedin-profile-optimizer` | Audits and re-architects Headline, About, Experience, and Featured sections for inbound leads. |
| `linkedin-comment-drafter` | Crafts high-value, authority-building comments on key industry accounts to steal attention ethically. |
| `linkedin-reply-handler` | Crafts thoughtful replies to comments under your posts to double conversation and boost dwell time. |
| `linkedin-repurposer` | Transforms YouTube transcripts, Twitter threads, blogs, and audio notes into high-impact LinkedIn posts. |
| `linkedin-thread-monitor` | Tracks ongoing industry discussions and extracts relevant talking points. |
| `linkedin-engager-analytics` | Analyzes engagement patterns to identify potential high-ticket clients and partners. |
| `linkedin-employee-advocacy` | Formats and scales brand content for team members and co-workers. |

---

## 2. Post Writing & The 20 Hook Formulas (F1–F20)

### Group 1: The Classics (F1–F10)
- **F1: The Contrarian Truth**: State a common industry belief, then sharply contradict it with real experience.
- **F2: The Zero-to-Hero Metric**: "From [Undesirable State] to [Desirable State] in [Timeframe] without [Pain Point]."
- **F3: The Confession**: "I spent [Time/Money] doing [Common Practice]. Here is why I stopped."
- **F4: The Micro-Case Study**: "How [Client/Company] achieved [Result] using an unexpected strategy."
- **F5: The Resource Curation**: "I audited [Number] [Tools/Accounts/Campaigns]. Here are the top [Number] worth your time."
- **F6: The Question & Pivot**: "Why do 90% of [Target Role] struggle with [Problem]? It's not [Expected Reason]."
- **F7: The Behind-the-Scenes**: "What actually happens behind closed doors when [Milestone/Event] happens."
- **F8: The Hard Truth List**: "[Number] uncomfortable truths about [Industry/Role] nobody wants to admit."
- **F9: The Breakdown**: "A teardown of how [Top Player] does [Process/Strategy]."
- **F10: The Lesson Learned**: "[Number] years in [Industry] taught me [Number] lessons I wish I knew at 20."

### Group 2: The Modern Retainers (F11–F16)
- **F11: The Stop Doing This**: "Stop doing [Common Habit]. Do this instead."
- **F12: The Observation**: "I noticed something strange happening in [Industry] this week."
- **F13: The Framework Teardown**: "My simple [Number]-step framework to solve [Problem]."
- **F14: The Prediction**: "Where [Industry/Tech] is heading in the next 12 months (and how to prepare)."
- **F15: The Dialogue**: "Client asked: '[Common Question]'. My answer surprised them."
- **F16: The Cost of Inaction**: "Every day you don't fix [Problem], it costs you [Quantifiable Loss]."

### Group 3: Founder & Authority Hooks (F17–F20)
- **F17: The Build-in-Public**: "We just replaced a $400/month tool by building our own in 3 weeks. Here's the math."
- **F18: The Philosophy Shift**: "Why I refuse to hire for [Skill] and hire for [Attribute] instead."
- **F19: The Tactical Playbook**: "The exact system we use to manage [Operations/Marketing] across multiple clients."
- **F20: The Manifesto**: "In 2026, [Old Approach] is dead. Here is what winning companies are doing."

---

## 3. The 4-Stage Humanizer Pipeline

Never publish raw LLM output. Run every draft through this strict 4-stage pipeline:

```
[Draft Post] 
     │
     ▼
1. SCRUB (Remove AI vocabulary & em-dashes)
     │
     ▼
2. RHYTHM (Vary sentence lengths: Short. Medium. Long explanation.)
     │
     ▼
3. CONCRETE INJECTION (Add verified names, exact numbers, sensory verbs)
     │
     ▼
4. VOICE PROFILE MATCH (Align with authentic personal dialect & quirks)
```

### Stage 1: Scrubbing List
- **Banned Words**: delve, foster, leverage, crucial, testament, beacon, paramount, tapestry, synergy, bespoke, game-changer.
- **Banned Punctuation**: Strip excessive em-dashes (`—`). Limit to maximum 1 per 100 words or replace with commas, parentheses, or line breaks.
- **Banned Intros**: "In today's fast-paced world...", "Have you ever wondered...", "As a passionate [Role]...".

### Stage 2: Sentence Rhythm
Alternate cadence intentionally:
- Short punchy statement (1–3 words).
- Context sentence (8–12 words).
- Breathing space.
- A slightly longer explanation that develops the thought without filler.

### Stage 3: Adding Verifiable Ground Truth
Ensure every post has at least **one specific, non-generic fact**:
- An exact duration ("in 18 days", not "in a few weeks")
- An exact number ("11.7 EGP per lead", "4 accounts", not "low costs")
- A real location or entity ("Tanta, Egypt", "Engaz Developments")

---

## 4. Execution Directives for LinkedIn Output
1. **White Space is King**: Never write blocks of text longer than 2 sentences.
2. **One Clear CTA**: Never ask the reader to do 3 things. Exactly one action: Comment a keyword, DM, or answer a single question.
3. **BiDi / RTL Preservation**: When writing Arabic with English tech terms, never end lines with Latin characters or dangling brackets to prevent text inversion on mobile.
