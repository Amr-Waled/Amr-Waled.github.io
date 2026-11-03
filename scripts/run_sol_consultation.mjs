import { spawn } from 'child_process';
import { readFileSync, existsSync, mkdirSync, writeFileSync } from 'fs';
import { resolve } from 'path';

const CODEX_BIN = 'C:\\Users\\dell\\AppData\\Local\\OpenAI\\Codex\\bin\\896a0166b774037a\\codex.exe';
const WORK_DIR = 'F:\\Seo personal';
const OUTPUT_FILE = resolve(WORK_DIR, 'SOL_6.1_MASTER_CONSULTATION.md');

const prompt = `
[ROLE: CHIEF EXECUTIVE GROWTH STRATEGIST & MASTER B2B CONSULTANT (SOL 6.1 - HIGH REASONING EFFORT)]
Client Name: عمرو وليد (Amr Waled)
Background & Ground Truth:
- Education: Mechanical Power Engineering Student (Senior Year, Class of 2027) @ Tanta University.
- Career Transition: Leaving full-time Marketing Manager role at Engaz Developments on October 24, 2026 to become an independent Growth Marketer & Systems Architect.
- Shipped Proof of Work:
  * Engaz Developments: +1,000,000 views, CPL 11.7 EGP, 2.5M EGP sales per 1K ad spend in Basyoun projects. Custom CRM & corporate website live.
  * Insight Clinic (Dr. Jehan Abdel-Hameed): Encrypted cloud EMR & booking system running daily in production.
  * El-Awael POS: Fast offline inventory & POS system for retail/bookstores.
  * El-Modarag Platform: EdTech SaaS with AI RAG and GPA simulation (in active engineering).
- Active Clients: Dr. Sally Salem (Autism content & ManyChat automation), Maqam (Electrical switches & sockets B2B/B2C launching mid-November).
- Core Positioning: Growth Marketer & Performance Media Buyer with an unfair technical advantage (Vibe Coder who builds custom CRMs, landing pages, and systems to stop lead leakage).
- Educational Mission: Empowering & training university students and youth (Ex-President Enactus Tanta, Xplore Camp founder, Hult Prize trainer).
- Anti-Cringe Policy: Strict Egyptian professional tone, direct, data-backed (ROI/ROAS/CPL/CAC), zero AI fluff or motivational clichés.

YOUR MISSION:
Deliver an exhaustive, master-level consultation session ("جلسة تقدر بـ 6 مليون دولار") for Amr Waled's Personal Branding, High-Ticket B2B Hunting, and Content Strategy.

STRUCTURE MANDATE:
Divide your entire master response into exactly 50 distinct, in-depth axes (50 محور استراتيجي وتنفيذي مفصل من الألف إلى الياء), grouped logically into core strategic pillars:
1. التموضع الاستراتيجي والفئة المنفردة (Positioning & Category of One)
2. سيكولوجية البيزنس أونر وفلسفة الاستهداف (High-Ticket B2B Buyer Psychology)
3. هندسة العروض التي لا تُرفض وتسعير القيمة (Grand Slam Offers & Value Pricing)
4. ترسانة دراسات الحالة وأدلة الإثبات الميداني (Proof of Work Leverage)
5. مصفوفة المحتوى وركائز النشر الـ 4 (Content Pillars & Matrix)
6. هندسة الاسكريبتات والهوك في أول 3 ثوانٍ والمونتاج (Hook, Retention & Script Architecture)
7. منصة LinkedIn وهندسة التواجد المؤسسي وسحب الليدات (LinkedIn Authority Engine)
8. منصات الفيديو القصير والانتشار وإعادة التدوير (Short-Form Omnipresence & ManyChat)
9. استراتيجية صيد الشركات الكبرى (B2B Outbound Hunting & Trojan Horse Audits)
10. البنية التشغيلية وإدارة الوقت وخارطة التحول إلى SaaS (Operating Rhythm & SaaS Roadmap)

In each of the 50 axes, go deep, concrete, actionable, and tailored specifically to Amr Waled's exact situation (leaving Oct 24, running ads, building CRMs, talking to business owners).
Speak in powerful, professional, authentic Egyptian business language with technical English terminology.
`.trim();

console.log('☀️ [Sol-Bridge] Launching Sol 6.1 (High Reasoning Effort) via Codex CLI...');

const args = [
  'exec',
  '--ephemeral',
  '--sandbox', 'read-only',
  '-m', 'gpt-6.1-sol',
  '-c', 'model_reasoning_effort="high"',
  '-o', OUTPUT_FILE,
  '-'
];

const proc = spawn(CODEX_BIN, args, {
  cwd: WORK_DIR,
  stdio: ['pipe', 'inherit', 'inherit']
});

proc.stdin.write(prompt, 'utf-8');
proc.stdin.end();

proc.on('close', (code) => {
  if (code === 0) {
    console.log('\n✅ [Sol-Bridge] Sol 6.1 completed the master consultation!');
    console.log(`📁 Master Consultation saved to: ${OUTPUT_FILE}`);
  } else {
    console.error(`\n❌ [Sol-Bridge] Codex exited with code ${code}`);
    process.exit(code);
  }
});
