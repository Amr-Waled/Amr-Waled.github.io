---
name: agent-reach-researcher
description: Omnichannel web intelligence and social listening skill across 15 platforms (YouTube, Reddit, X/Twitter, GitHub, LinkedIn, Facebook, Instagram, Web, RSS) with zero API fees. Extracts video transcripts, customer pain points, unfiltered discussions, and competitor intelligence.
argument-hint: "[youtube|reddit|twitter|search|competitors|transcripts]"
metadata:
  author: AmrWaled
  version: "1.0.0"
  source: Panniantong/agent-reach
---

# Agent Reach: Omnichannel Web & Social Intelligence

A comprehensive research and intelligence-gathering skill that equips AI agents to crawl, search, and extract real user discussions, transcripts, and market data across 15 platforms without paid API subscriptions.

---

## 1. Supported Platform Channels

| Channel | Extraction Capability | Underlying Mechanism |
|---|---|---|
| **YouTube** | Pulls full timestamped video transcripts, video search, channel metadata | `yt-dlp` (No API key, zero quota) |
| **Reddit** | Searches subreddits, extracts top threads, complaints, comments, sentiment | Direct endpoints + unauthenticated JSON parsing |
| **X / Twitter** | Single tweets, user timelines, topical keyword search | Public tokenless endpoints & Nitter-style readers |
| **GitHub** | Repositories, READMEs, open issues, commit history, code search | `gh CLI` / raw git endpoints |
| **LinkedIn** | Public company pages, post content, profile highlights | Clean reader fallback |
| **Web & Blogs** | Converts messy HTML pages into clean, token-efficient Markdown | `jina-reader` (`r.jina.ai`) |
| **RSS / Atom** | Follows industry news, blog feeds, competitor press releases | `feedparser` |
| **Audio / Podcasts** | Converts spoken audio files into clean text | Local Whisper / transcript aggregators |
| **Meta (FB/IG)** | Public posts, group discussions, public reel descriptions | Fallback browser parser |

---

## 2. Core Strategic Use Cases

### A. Customer Pain Point Mining (Reddit & Community Forums)
- **Goal**: Identify the exact vocabulary, complaints, and unmet needs of a target audience before launching a marketing campaign or building a product.
- **Workflow**:
  1. Target relevant subreddits (e.g., `r/realestate`, `r/marketing`, `r/entrepreneur`).
  2. Query top posts with filters: `flair:Complaint`, `"how do I"`, `"is there a tool that"`.
  3. Extract the top 20 recurring frustrations into a categorized pain-point matrix.

### B. YouTube Transcript Intelligence & Content Reverse-Engineering
- **Goal**: Analyze what top-performing videos in a niche cover without watching hours of footage.
- **Workflow**:
  1. Pull transcripts for the top 5–10 videos on a keyword using `yt-dlp`.
  2. Parse the script hooks (first 30 seconds) to study retention mechanics.
  3. Extract core frameworks, counter-arguments, and FAQs to generate derivative articles or reels.

### C. Competitor Sentiment & Teardown
- **Goal**: Find out what customers hate about competing SaaS tools, agencies, or services.
- **Workflow**:
  1. Search for `"[Competitor Name] alternative"`, `"[Competitor Name] review"`, `"[Competitor Name] issues"`.
  2. Categorize feedback into: Pricing friction, support delays, missing features, complexity.
  3. Use findings to craft unassailable positioning (e.g., "Why we built a custom CRM instead of paying $400/mo for HubSpot").

---

## 3. Resilient Multi-Tier Scraping Architecture

When scraping modern platforms, Agent Reach implements a 3-tier fallback hierarchy:

```
[Request URL/Platform]
          │
    Tier 1: Direct Clean HTTP Reader (Fastest, zero footprint: jina, yt-dlp, feedparser)
          │ (If blocked / 403 / 412)
          ▼
    Tier 2: Cached Mirror / Anonymous Endpoint Proxy
          │ (If login required / Cloudflare wall)
          ▼
    Tier 3: Headless Browser Automation (Playwright / Puppeteer with stealth headers)
```

---

## 4. Execution Guidelines for Agents
1. **Never Hallucinate User Quotes**: Quote actual phrases from Reddit or YouTube comments verbatim when building buyer personas. Real customer language converts better than marketing copy.
2. **Filter Out Noise**: Discard promotional bot comments and focus exclusively on authentic peer-to-peer discussions.
3. **Respect Rate Limits**: Add polite delays between requests to prevent temporary IP bans during deep dives.
