import { spawn } from 'child_process';
import { resolve } from 'path';

const CODEX_BIN = 'C:\\Users\\dell\\AppData\\Local\\OpenAI\\Codex\\bin\\896a0166b774037a\\codex.exe';
const WORK_DIR = 'f:\\Seo personal';
const OUTPUT_FILE = resolve(WORK_DIR, 'ASTRA_6_MARKETING_STRATEGY.md');

const prompt = `
[ROLE: GPT-6 ASTRA - PRINCIPAL STRATEGIST & SYSTEMS ARCHITECT]
المستخدم: عمرو وليد (مؤسس ومسوق رقمي في مصر).

المطلوب منك كـ GPT-6 Astra:
تقديم الدليل المعماري والاستراتيجي الأعمق لـ:
1. أفضل وأسرع الطرق المنهجية للبدء في تعلم التسويق من الصفر واحترافه خطوة بخطوة (Roadmap).
2. أهم القواعد والمبادئ الأولى (First Principles) التي لا بد من تعليمها لأي شخص قبل أن يلمس أي أداة أو منصة إعلانية (سيكولوجية الشراء، هندسة العروض التي لا ترفض، اقتصاديات الوحدة CAC, LTV, Margin، مستويات الوعي).
3. تفكيك شامل لمجالات وتخصصات التسويق المختلفة وتوضيح دور كل مجال، طبيعة عمله، والمهارات المطلوبة له، مع التركيز الشديد والتخصيص لـ (السوق المصري تحديداً) وطبيعة المستهلك والبيزنس في مصر (الميديا باينج، صناعة المحتوى والكوبي رايتينج، السيو والـ GEO، التسويق العقاري، تجارة الـ E-commerce والدفع عند الاستلام وإنستاباي، أتمتة الواتساب).
4. أسباب فشل 90% من المبتدئين في التحول من "منفذ أزرار" إلى "شريك أعمال ذو قيمة عالية".
5. أهم الكتب والمراجع العالمية الكلاسيكية والحديثة التي تصنع عقلية المسوق المحترف.

اكتب تحليلاً استراتيجياً غزيراً بالمعلومات والعمق، منظم في أقسام وجداول، بدون حشو إنشائي، وباللغة العربية الفصحى السلسة القوية.
`.trim();

console.log('🚀 [Astra-Bridge] Running GPT-6 Astra via Codex CLI...');

const args = [
  'exec',
  '--ephemeral',
  '-s', 'read-only',
  '-c', 'approval_policy="never"',
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
    console.log(`\n✅ [Astra-Bridge] Success! Astra 6 output written to: ${OUTPUT_FILE}`);
  } else {
    console.error(`\n❌ [Astra-Bridge] Codex exited with code ${code}`);
  }
  process.exit(code);
});
