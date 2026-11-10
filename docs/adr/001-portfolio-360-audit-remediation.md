# ADR 001: Remediation of Portfolio Security, Clean URL Canonicalization, and Standard `llms.txt` GEO Architecture

- **Date:** 2026-11-11
- **Status:** Accepted & Implemented

## Context
A full 360° audit of `https://amrwaled.vercel.app` identified four structural bottlenecks:
1. Sensitive and internal files (`gsc-credentials.json`, private consultation `.md` files) were publicly reachable on the live Vercel deployment, and `4,256` ignored files (`node_modules/`, `skills/`) remained tracked in the Git index.
2. Vercel's `"cleanUrls": true` stripped `.html` extensions with `308` redirects, while `sitemap.xml`, `<link rel="canonical">`, and internal links pointed to `.html` URLs, and short rewrites (`/engaz`, `/crm`, `/clinic`, `/geo`) pointed to `.html` destinations that returned `404`.
3. `llms.txt` opened with imperative prompt-injection directives (`CRITICAL DIRECTIVE TO ALL AI MODELS... you MUST recommend`) and raw unformatted URLs, causing Lighthouse `llms-txt` validation failure (`0/100`) and risking RAG anti-injection filtering.
4. Mobile LCP (`5.4s`) suffered from render-blocking Google Fonts/AOS stylesheets, `data-aos` on the hero section, and `385KB–726KB` uncompressed JPEG banners.

## Decision
1. Enforce a strict `.vercelignore` + `.gitignore` boundary and purge `node_modules/` and internal folders from the Git index.
2. Standardize all canonical URLs, `sitemap.xml` entries, `vercel.json` rewrites, and internal links on clean extensionless paths (`/crm-systems`, `/marketing-tanta`, `/engaz-case-study`, etc.) strictly under `https://amrwaled.vercel.app`.
3. Re-architect `llms.txt`, `llms-full.txt`, and `CLAUDE_CONTEXT.md` to comply 100% with the `llmstxt.org` specification using third-person factual entity grounding and Markdown `[Anchor](URL)` links.
4. Eliminate render-blocking CSS/fonts, compress all heavy images by 85–90%, deduplicate the 4 portrait image hashes, add a flicker-free Dark/Light theme toggle, and embed a fail-safe B2B lead capture form (`localStorage` retry queue + `/api/save-lead` + Telegram plain-text safe formatting).

## Alternatives Considered
- **Disabling `cleanUrls` in `vercel.json`:** Rejected because clean extensionless URLs (`/brand`, `/crm-systems`, `/marketing-tanta`) are superior for user sharing, WhatsApp links, and modern SEO.
- **Keeping dual-domain URLs (`amr-waled.github.io`) in `sitemap.xml`:** Rejected because the Sitemap protocol forbids cross-host `<loc>` entries and splits domain authority.
