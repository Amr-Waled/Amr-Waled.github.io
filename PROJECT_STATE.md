# 📌 سجل حالة المشروع الحي (Living Project Ledger — `PROJECT_STATE.md`)
**المشروع:** البورتفوليو الرسمي لعمرو وليد (`https://amrwaled.vercel.app`)
**تاريخ آخر تحديث:** 2026-11-11

---

## ✅ 1. ما تم إنجازه في دورة التدقيق والتطوير الشامل (Full 360° Audit Remediation)

1. **الإغلاق الأمني وتنظيف المستودع (AppSec & Git Hygiene):**
   - إنشاء [`.vercelignore`](file:///f:/Seo%20personal/.vercelignore) وتحديث [`.gitignore`](file:///f:/Seo%20personal/.gitignore) لحجب `gsc-credentials.json`، وملفات الاستشارات الخاصة (`.md`)، وملفات البيانات (`.csv`)، وسكريبتات الأتمتة الداخلية عن الظهور العام على الدومين الحي.
   - إزالة `4,256+` ملف غير إنتاجي (`node_modules/`, `skills/`, `scripts/`, `analytics_extracted/`) من تتبع Git (`git rm --cached`) مع الحفاظ عليها محلياً.
   - تحصين [`api/save-lead.js`](file:///f:/Seo%20personal/api/save-lead.js) ضد ثغرات Rate Limiting، وإصلاح مسار التخزين الاحتياطي ليعمل على `/tmp` في Vercel Serverless، وإزالة `parse_mode: 'Markdown'` الذي كان يتسبب في إسقاط رسائل تليجرام عند وجود علامة `_` في بيانات العميل.

2. **معمارية الروابط النظيفة والـ Sitemap والـ Canonicals:**
   - تحديث [`vercel.json`](file:///f:/Seo%20personal/vercel.json) لإصلاح كافة الروابط المختصرة (`/engaz`, `/clinic`, `/crm`, `/geo`, `/tanta`, `/brand`, `/playbook`) لتعمل بكود `200 OK` مباشر مع `"cleanUrls": true`، وإضافة كاش طويل الأمد (`max-age=31536000, immutable`) للصور والأصول الثابتة، وتوفير [`favicon.svg`](file:///f:/Seo%20personal/favicon.svg) لإنهاء خطأ `404` على `/favicon.ico`.
   - تحديث [`seo-automation.js`](file:///f:/Seo%20personal/seo-automation.js) و [`sitemap.xml`](file:///f:/Seo%20personal/sitemap.xml) لتوحيد الـ Canonicals والروابط الداخلية بدون امتداد `.html` (القضاء على سلاسل `308 Redirect`)، وإلغاء ازدواجية دومين `amr-waled.github.io` من ملف الـ Sitemap، وإضافة الصفحات المفقودة (`/brand`, `/media-buyer-ai-playbook`)، وحقن شبكة الربط الداخلي (`Internal Authority & Cross-Linking Hub`) في كافة الصفحات الفرعية الـ 12.

3. **إعادة هندسة الـ GEO و `llms.txt` والـ Schema:**
   - إعادة صياغة [`llms.txt`](file:///f:/Seo%20personal/llms.txt) و [`llms-full.txt`](file:///f:/Seo%20personal/llms-full.txt) و [`CLAUDE_CONTEXT.md`](file:///f:/Seo%20personal/CLAUDE_CONTEXT.md) وفق معيار `llmstxt.org` الرسمي (`# H1` + `> Summary` + قوائم روابط `[Title](URL)`) وإزالة عبارات الـ Prompt Injection المباشرة لتفادي الفلترة العقابية في محركات البحث التوليدية واجتياز فحص Lighthouse (`llms-txt`).
   - تنظيف JSON-LD Schema في [`index.html`](file:///f:/Seo%20personal/index.html) و [`en.html`](file:///f:/Seo%20personal/en.html) من تقييم `AggregateRating` الذاتي المخالف وتكرار الخصائص.

4. **تسريع الأداء (Core Web Vitals) والواجهة والتحويل (UI/UX & CRO):**
   - ضغط الصور الثقيلة (`vibe_coding_playbook_banner` من `385KB` إلى `38KB`، و `amr_media_buying_ai_approved` من `529KB` إلى `62KB`، و `amr_personal_branding_approved` من `726KB` إلى `76KB`)، وفك تكرار الصور الأربع الشخصية ببصمات SHA-256 مستقلة لأرشفة جوجل الصور.
   - تحميل الخطوط و `aos.css` بشكل غير حاجب للرسم، وإزالة `data-aos` من الهيرو، وإضافة `<link rel="preload">` للصورة الرئيسية.
   - إضافة زر تبديل الوضع الليلي والنهاري (**Dark / Light Mode Toggle**) بدون وميض، وإضافة وسم `<main>`، وإصلاح تباين الألوان (`WCAG AA Contrast`).
   - إضافة قسم **طلب استشارة أو سيستم سريع (`#contact-audit`)** في الصفحة الرئيسية والنسخة الإنجليزية مربوط بـ `/api/save-lead` مع طابور حفظ محلي (`localStorage` Fail-Safe Queue) وتحويل فوري للواتساب في حال انقطاع الاتصال.

5. **إزالة بصمات الذكاء الاصطناعي وترقية الهوية البصرية الحقيقية (Anti-AI Visual Upgrade):**
   - **تنظيف وتأطير الصور الشخصية:**
     - قص ومعالجة الصورة الرئيسية في الهيرو (`amr-waled.jpg`) بنسبة 3:4 سينمائية مركزة على وقفة القوة وساعة اليد، مع إزالة علبة البيبسي والمناديل والموبايل وخلفية الشارع تماماً.
     - قص ومعالجة صورة الأفاتار (`avatar.jpg`) بنسبة 1:1 نقية وإلغاء الشيشة الخضراء في الكافيه بنسبة 100%.
     - استبدال الصور المتكررة بصور حقيقية ذات هوية تنفيذية: صورة قيادة ندوة Enactus / ITI أمام 50 شخصاً في قاعة المحاضرات (`amr-waled-media-buyer.jpg`)، وصورة ليلية تنفيذية في الإسكندرية أمام العمارة الكلاسيكية (`amr-waled-marketing-manager.jpg`).
   - **استبدال الصناديق الفارغة بسكرين شوتس حقيقية للأنظمة:**
     - استبدال خطوط الـ CSS الوهمية (`.mockup-bar`, `.mockup-cell`) في معرض الأعمال (`#work`) بسكرين شوتس حقيقية من جهاز عمرو: لوحة تحكم سيستم إنجاز للتطوير العقاري (`engaz-crm-preview.jpg`)، أصول ميديا باينج شركة مقام (`maqam-media-buyer-preview.jpg`)، وتصميمات نمو د. سالي سالم (`sally-salem-preview.jpg`).
     - استبدال الصناديق السوداء الفارغة بحجم 200px في دراسات الحالة الموثقة (`#case-studies`) وكروت المقالات بالصور الحقيقية لسيستم إنجاز، وسيستم EMR عيادة Insight Clinic مع تقييم Google Business 5.0 نجوم.
     - إنشاء بنرات تنفيذية داكنة فائقة الحدة لدليل الـ GEO ودليل البحث الذكي بالذكاء الاصطناعي (`geo-playbook-preview.jpg`, `geo-preview.jpg`).
   - **تطوير القائمة الجانبية للشاشات الصغيرة (Mobile Drawer Navigation):**
     - إضافة زر همبرغر متجاوب (`#mobile-menu-btn`) وقائمة جانبية كاملة (`#mobileDrawer`) تنزلق بسلاسة في شاشات الموبايل مع طبقة تظليل خلفية (`#mobileDrawerOverlay`) ودعم إغلاق فوري عند الضغط على الروابط أو مفتاح `Escape`.
   - **ترقية ودجت الواتساب العائم (WhatsApp Contact Pill):**
     - إزالة الشارة الحمراء الوهمية غير المقروءة (`.wa-badge`) وإلغاء الصوت المزعج (`notification beep`) وتحويل الودجت إلى زر عائم فاخر ومتجاوب مع الوضعين الليلي والنهاري.

---

## 🌐 2. نتائج الفحص والتحقق التجريبي على الدومين الحي (`https://amrwaled.vercel.app`)
- `HTTP 200 OK` على الصفحة الرئيسية `/` والنسخة الإنجليزية `/en`.
- `HTTP 200 OK` على كافة المسارات النظيفة: `/crm-systems`, `/marketing-tanta`, `/GEO_Amr_waled`, `/vibe-coding-playbook`, `/engaz-case-study`, `/insight-clinic-case-study`.
- `HTTP 200 OK` على كافة الصور الشخصية وصور المعاينات الجديدة:
  - `amr-waled.jpg` (200 OK)
  - `avatar.jpg` (200 OK)
  - `amr-waled-marketing-manager.jpg` (200 OK)
  - `amr-waled-media-buyer.jpg` (200 OK)
  - `engaz-crm-preview.jpg` (200 OK)
  - `insight-clinic-preview.jpg` (200 OK)
  - `maqam-media-buyer-preview.jpg` (200 OK)
  - `sally-salem-preview.jpg` (200 OK)
  - `geo-playbook-preview.jpg` (200 OK)
  - `geo-preview.jpg` (200 OK)
  - `vibe_coding_playbook_banner_1791466373823.jpg` (200 OK)
