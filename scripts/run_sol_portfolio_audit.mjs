import { spawn } from 'child_process';
import { resolve } from 'path';

const CODEX_BIN = 'C:\\Users\\dell\\AppData\\Local\\OpenAI\\Codex\\bin\\2993767bd1dfb009\\codex.exe';
const WORK_DIR = 'F:\\Seo personal';
const OUTPUT_FILE = resolve(WORK_DIR, 'SOL_6.1_PORTFOLIO_AUDIT.md');

const prompt = `
[ROLE: CHIEF BRAND ARCHITECT & PERFORMANCE MARKETING STRATEGIST (SOL 6.1 - HIGH REASONING EFFORT)]
Client Name: عمرو وليد (Amr Waled)
Target Goal: "هدفي هو ان لما اى حد ييجي يفكر في ميدياباينج او براندينج او جروث يكلمني" (Top of mind authority for Media Buying, Branding, and Growth Marketing).

Context & Current Assets in "F:\\Seo personal":
- The portfolio currently consists of:
  * index.html: Heavy emphasis on "مسوق في طنطا / ميديا باير طنطا / سيستم CRM / بديل شركة تسويق ودعاية في طنطا".
  * about.html: Bio connecting Mechanical Engineering (Tanta Univ 2027), Engaz Developments Marketing Manager, Enactus President, AlBootcamp, Autism 50 scripts initiative.
  * solutions.html & systems.html: Offering CRM systems, meta ads media buying, corporate websites, GEO/SEO.
  * case studies: Engaz (+2.5M sales per 1K spend, 11.7 EGP CPL, custom CRM), Insight Clinic (cloud EMR, 5.0 Google rating), Sally Salem (519K views, 235% growth), Maqam (remote media buying).
  * Playbooks: AI Media Buyer Playbook 2026, Vibe Coding Playbook, GEO Playbook.
  * Master Consultation: SOL_6.1_MASTER_CONSULTATION.md (50 strategic axes).

MANDATE (Brutal Objectivity & Zero Fluff - بدون تطبيل وبكل أمانة وموضوعية):
Conduct a comprehensive, surgical audit of Amr Waled's portfolio and positioning to achieve his stated goal:
"لما اى حد ييجي يفكر في ميدياباينج او براندينج او جروث يكلمني"

Analyze and answer the following in deep, structured detail:
1. الفجوة القاتلة والتناقض في التموضع الحالي (The Identity Crisis & Strategic Misalignment):
   - كيف يتعارض التركيز الشديد على "طنطا / محلي" في الكلمات المفتاحية والـ SEO مع طموح صيد عملاء High-Ticket إقليميين وعرب في الميديا باينج والبراندينج والجروث؟
   - هل هو "مبرمج ومطور CRM" أم "خبير ميديا باينج" أم "مستشار جروث وبراندينج"؟ كيف يؤثر تشتت الرسالة على عقل العميل؟
2. ما الذي ينقص البورتفليو فوراً (What is Missing?):
   - من منظور صاحب شركة يدور على Media Buyer أو Growth Partner يدير له مئات آلاف الجنيهات أو الريالات، ما هي الأدلة والأقسام والعناصر الغائبة تماماً من الموقع؟
3. الأخطاء القاتلة في الصفحات الحالية وتجربة المستخدم والتحويل (UX & Conversion Mistakes):
   - التدقيق في Hero Section، Call to Actions، دراسات الحالة، وطريقة عرض النتائج.
   - ما الذي يجعل الزائر يقول "ده شاطر بس مش هكلمه" أو "ده لسه طالب بيجرب"؟
4. خطة الإصلاح الجراحية (Surgical Fix & Transformation Roadmap):
   - كيف نعيد صياغة الصفحة الرئيسية وصفحات الخدمات لتخدم المعادلة الثلاثية: (Media Buying + Branding + Systems/Growth)؟
   - العرض الذي لا يقاوم (Irresistible Grand Slam Offer) للعملاء الكبار.
5. أسئلة المصارحة والمواجهة المباشرة لعمرو وليد (The Grill-Me Questions):
   - أهم 5 إلى 7 أسئلة حرجة ومفصلية يجب على عمرو الإجابة عليها وتحديد موقفه منها الآن لحسم هويته وتسعيره وسعته التشغيلية.

Speak in powerful, highly professional, direct Egyptian business language with technical marketing terminology. Zero sycophancy, absolute truth and tactical precision.
`.trim();

console.log('🚀 [Sol-Bridge] Spawning Codex CLI with Sol 6.1 for Portfolio Audit...');

const proc = spawn(CODEX_BIN, [
  'exec',
  '--ephemeral',
  '--sandbox', 'read-only',
  '-m', 'gpt-6.1-sol',
  '-c', 'model_reasoning_effort="high"',
  '-o', OUTPUT_FILE,
  '-'
], {
  cwd: WORK_DIR,
  stdio: ['pipe', 'inherit', 'inherit']
});

proc.stdin.write(prompt, 'utf-8');
proc.stdin.end();

proc.on('close', (code) => {
  if (code === 0) {
    console.log('\n✅ [Sol-Bridge] Sol 6.1 finished portfolio audit successfully!');
    console.log(`📁 Audit file: ${OUTPUT_FILE}`);
  } else {
    console.error(`\n❌ [Sol-Bridge] Codex exited with code ${code}`);
    process.exit(code);
  }
});
