---
name: scrapling-web-intelligence
description: Advanced adaptive web scraping, anti-bot bypass (Cloudflare Turnstile), and structured web intelligence stack using Scrapling and ScrapeGraph AI. Extracts clean JSON data with self-healing DOM parsers and token-efficient selectors.
argument-hint: "[scrape|bypass|adaptive|extract|crawl|schema]"
metadata:
  author: AmrWaled
  version: "1.0.0"
  sources:
    - D4Vinci/Scrapling
    - ScrapeGraphAI/just-scrape
---

# Scrapling: Adaptive Web Scraping & Intelligence Stack

An industrial-grade web intelligence skill designed for resilient data extraction, anti-bot mitigation, and LLM token optimization. Combines self-healing DOM parsing (`Scrapling`) with prompt-driven semantic scraping (`ScrapeGraph AI`).

---

## 1. The Core Scraping Stack

| Tool | Architecture Role | Best When... |
|---|---|---|
| **Scrapling** | Adaptive Python Engine & MCP Server | Websites change layouts frequently, or are protected by Cloudflare Turnstile / anti-bot challenges. |
| **ScrapeGraph AI** | Prompt-Driven Zero-Code Extractor | You need immediate, structured JSON from a single page using natural language instructions. |
| **Stealth Fetcher** | Headless Browser Automation (Chromium) | Pages heavily rely on dynamic client-side rendering (React/Vue/Next.js hydration). |

---

## 2. Key Technical Superpowers

### A. The Adaptive "Self-Healing" Parser
Traditional scrapers break whenever a site redesigns its classes (e.g., `.product-card_v2` becomes `.item-wrapper_9x`).
- **Scrapling's Solution**: Learns the semantic structure of target elements based on text proximity, tag hierarchy, and content patterns.
- If a class or ID disappears, Scrapling locates the element in its new position automatically without developer intervention.

### B. Anti-Bot & Cloudflare Turnstile Bypassing
- Built-in stealth headers mimicking authentic residential browser TLS fingerprints and canvas signatures.
- Automatically handles Turnstile and JS challenges without triggering CAPTCHAs or 403 Forbidden responses.

### C. Token-Efficient Extraction (Saving LLM Context)
- Dumping a 500KB raw HTML file into an LLM wastes thousands of context tokens and degrades reasoning.
- Scrapling isolates target subtrees using precise CSS selectors, strips extraneous inline scripts, styles, and SVG bloat, and delivers lean Markdown or JSON directly to the agent.

---

## 3. Extraction Patterns & Workflows

### Pattern 1: Prompt-Based Instant Extraction (ScrapeGraph AI)
For one-off datasets where writing code is unnecessary:
```
Prompt: "Extract table of property units with columns: Unit Number, Area (sqm), Total Price, Down Payment, Delivery Date."
Input: Target URL
Output: Clean validated JSON schema
```

### Pattern 2: Multi-Page Spider Crawling (Scrapling Framework)
For deep catalog extraction or market research:
1. Initialize session with proxy rotation and polite delay (1.5s–3s).
2. Follow pagination links using dynamic URL matching.
3. Stream collected records directly to disk/DB to prevent memory leaks.

---

## 4. Operational Best Practices
1. **Never Hammer Target Servers**: Always enforce rate limiting and random delays (jitter) between requests to avoid IP bans.
2. **Validate Before Storage**: Check returned data types (e.g., ensure prices are numbers, not empty strings) before inserting into production databases.
3. **Data Freshness Verification**: Verify the page timestamp or HTTP headers (`Last-Modified`, `Cache-Control`) to avoid scraping stale cached responses.
