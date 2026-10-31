export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const {
    name,
    age,
    niche,
    camera_preference,
    superpower_95,
    passionate_topic_45m,
    competitors,
    market_bs,
    dream_client,
    client_nightmare,
    proof_metrics,
    weekly_hours,
    primary_goal,
    contact_info,
    cv_text,
    history = []
  } = req.body || {};

  const rawKey = process.env.GEMINI_API_KEY || '';
  const apiKey = rawKey.replace(/^["']|["']$/g, '').trim();
  let lastError = null;

  if (apiKey && apiKey.length > 20) {
    try {
      const prompt = `أنت كبير مهندسي واستشاريي بناء البراند الشخصي والتموضع الاستراتيجي العالمي (Senior Executive Personal Branding & Positioning Architect).
مهمتك: قراءة استبيان التشخيص وحفر القيمة، وتحليل السيرة الذاتية (CV / Portfolio) للشخص، وهندسة خطة براندينج شخصي شاملة ومتكاملة من الصفر (Complete Personal Brand Masterplan) بدون أي كلام معلب أو قوالب مكررة (Zero AI Fluff / 100% Tailored & Bespoke).

⚠️ معايير حاسمة وصارمة للمصداقية والنزاهة المهنية:
- تحدث بلهجة مصرية عملية ذكية تجمع بين دقة المهندس ونباهة مدير التسويق (Street-smart & Senior Engineering mindset).
- إذا كان هناك نص سيرة ذاتية (CV)، قم باستخراج إنجازاته وخبراته الحقيقية ووظفها في الخطة.
- 🚨 منع اختراع أرقام أو نتائج وهمية (Anti-Hallucination & Honesty Rule): إذا ذكر العميل أنه لا يملك سوابق أعمال موثقة أو نتائج رقمية، أو أنه ما زال في البداية:
  * ممنوع منعاً باتاً اختراع أرقام أو نسب مئوية أو قصص نجاح وهمية وتنسيبها إليه (مثل: "رفعت مبيعات 30%" أو "أنقذت 10 حجوزات")!
  * حوّل ركيزة الإثبات وسجل الإنجازات فوراً إلى: "خطة بناء واكتساب أول إثبات حقيقي (Proof-Building Sprint)": (كيف يجري أول تدقيق تجريبي، كيف يحلل مشكلة شائعة في السوق، أو كيف يوثق مشاريعه الخاصة كدليل كفاءة).
- التزم التزاماً دقيقاً بعدد الساعات المتاحة أسبوعياً (${weekly_hours})؛ لا تضع روتين نشر يتطلب 5 ساعات لشخص متاح لساعتين فقط.
- ابنِ له تموضعاً منفرداً (Category of One) يخرجه من منافسة ومقارنة الأسعار تماماً بما يناسب حجم إمكانياته الحقيقية.
- وظف كابوس عميل أحلامه (${client_nightmare}) ومنافسيه (${competitors}) وأخطاء السوق (${market_bs}).

بيانات العميل وسيرته الذاتية:
- الاسم والسن: ${name} (${age} سنة)
- المجال / النيش: ${niche}
- علاقة الكاميرا والظهور: ${camera_preference}
- مهارة الـ 95% الحصرية: ${superpower_95}
- موضوع الشغف والارتجال (45 دقيقة): ${passionate_topic_45m || 'مجاله وتجاربه الميدانية'}
- أثقل المنافسين في السوق: ${competitors}
- الهبد وأخطاء السوق الشائعة: ${market_bs}
- عميل أحلامه (صانع القرار المستهدف): ${dream_client}
- كابوس العميل وخوفه الأكبر قبل الدفع: ${client_nightmare}
- سوابق الأعمال والأرقام الحقيقية المذكورة: ${proof_metrics}
- الساعات المتاحة أسبوعياً: ${weekly_hours || '4-6 ساعات'}
- الهدف التجاري الأساسي: ${primary_goal}
- نص السيرة الذاتية وخلفيته المهنية (CV/Portfolio):
"""
${(cv_text || 'لم يتم رفع ملف سيرة ذاتية - الاعتماد على إجابات الاستبيان المباشرة').slice(0, 4000)}
"""

جلسة التشخيص الاستراتيجي الحية وتفاصيل الحوار مع الذكاء الاصطناعي (Adaptive Interview Transcript):
${history && history.length > 0 ? history.map((h, i) => `[المحطة ${i + 1}] س: ${h.question}\nج: ${h.answer}`).join('\n\n') : 'لا يوجد تاريخ محادثة إضافي'}

المطلوب إخراج رد JSON حصراً وصارماً بهذا الهيكل الدقيق:
{
  "brand_identity": {
    "linkedin_headline": "هيدلاين احترافي مقترح لـ LinkedIn بالصيغة العالمية الحادة التي تبرز التموضع",
    "contrarian_cvp": "صياغة التموضع المنفرد الحاد (Category of One Narrative): كيف يخدم (${dream_client}) بحل كابوس (${client_nightmare}) عبر مهارة (${superpower_95}) كبديل قطعي لـ (${competitors})",
    "origin_story": "قصة البداية والتحول (Origin Story) من 3-4 أسطر ترسم سلطته وخبرته الواقعية بدون ادعاءات غير مثبتة"
  },
  "cv_audit_moat": {
    "unfair_advantage": "الميزة التنافسية الحقيقية المستخلصة من خبرته أو أدواته",
    "featured_proof_stack": [
      "إثبات حقيقي أو خطوة بناء أول إثبات عملي 1",
      "إثبات حقيقي أو خطوة بناء أول إثبات عملي 2"
    ]
  },
  "pillar_1_moat": {
    "title": "ركيزة الحصن التنافسي (Your 95% Superpower Moat)",
    "thesis": "كيف يسلح مهارته (${superpower_95}) كحاجز دخول يستحيل على (${competitors}) منافسته فيه",
    "actionable_angles": ["زاوية تطبيق عملية 1", "زاوية تطبيق عملية 2"]
  },
  "pillar_2_anti_competitor": {
    "title": "ركيزة معارضة هبد السوق (Anti-BS & Industry Flaws)",
    "thesis": "كيف يهاجم خطأ السوق (${market_bs}) ليظهر كصوت الحق في عيون (${dream_client})",
    "contrarian_topics": ["موضوع خلافي قوي يضرب في ممارسات المنافسين", "تحليل منطقي لسبب فشل الطرق التقليدية"]
  },
  "pillar_3_proof_of_work": {
    "title": "ركيزة سلطة الإثبات وتفكيك كابوس العميل (Nightmare Buster)",
    "thesis": "كيف ينسف مخاوف (${client_nightmare}) بالأدلة الواقعية أو عبر خطة بناء أول حالة نجاح عملية",
    "proof_assets": ["طريقة صياغة دراسة الحالة أو مشروع التدقيق الأولي", "المؤشر الرقمي الحقيقي المستهدف تحقيقه"]
  },
  "pillar_4_offer_architecture": {
    "title": "ركيزة العرض وتسعير الخدمات (Grand Slam Offer)",
    "thesis": "كيف يحزم خدماته في باقة حل متكامل تضمن إزالة (${client_nightmare}) لـ (${dream_client})",
    "core_offer_idea": "فكرة العرض والضمان الاستراتيجي المقترح",
    "pricing_recommendation": "توجيه التسعير المقترح ومستويات الباقات (Tiered Pricing)"
  },
  "pillar_5_distribution_matrix": {
    "title": "ركيزة الانتشار المتوافقة مع طبيعة ظهوره والوقت المتاح",
    "format_direction": "استراتيجية تنفيذية تتطابق 100% مع اختياره (${camera_preference}) ووقت (${weekly_hours})",
    "primary_channels": ["منصة 1", "منصة 2"],
    "execution_framework": "روتين النشر الواقعي أسبوعياً بما لا يتجاوز الوقت المحدد"
  },
  "killer_hooks": [
    "خطاف تسويقي شرس يستهدف (${dream_client}) مباشرة",
    "خطاف يهاجم خطأ (${market_bs}) بجرأة",
    "خطاف يفكك خوف (${client_nightmare}) بالدليل",
    "خطاف مبني على قصة وتجربة حقيقية من سيرته الذاتية",
    "خطاف يغير طريقة تفكير القارئ في مجاله"
  ],
  "roadmap_90_days": {
    "month_1": {
      "focus": "الشهر الأول: ضبط الأساسات وهندسة البروفايل (Foundation & Profile Makeover)",
      "milestones": [
        "إعادة صياغة الهيدلاين والـ About section ونشر دراسة الحالة الأولى",
        "نشر أول 4 قطع محتوى تأسيسية تركز على مهارة الـ 95% وتنسف خطأ السوق"
      ]
    },
    "month_2": {
      "focus": "الشهر الثاني: بناء الهيمنة وبسط السلطة (Authority & Social Proof)",
      "milestones": [
        "إطلاق سلاسل تفكيك الأنظمة ومقارنة الحلول الاحترافية بالحلول الهشة",
        "توسيع شبكة العلاقات مع 50 من صناع القرار المستهدفين"
      ]
    },
    "month_3": {
      "focus": "الشهر الثالث: تفعيل العرض وجلب الصفقات (Conversion & Inbound Sales)",
      "milestones": [
        "إطلاق العرض الرئيسي وجلسات الاستشارة التشخيصية",
        "إغلاق أول 3 صفقات تعاقدية بدون أي حرق للأسعار"
      ]
    }
  },
  "strategic_verdict": "حكم استراتيجي وخلاصة حاسمة من سطرين ترسم خطته لمعركة السوق الشخصية"
}`;

      // Cascade of models: gemini-3.1-flash-lite is lightning fast and 100% available
      const candidateModels = ['gemini-3.1-flash-lite', 'gemini-3.1-flash-lite-preview', 'gemini-3.5-flash', 'gemini-3.8-flash'];

      for (const model of candidateModels) {
        try {
          const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
          const response = await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [{ parts: [{ text: prompt }] }],
              generationConfig: {
                responseMimeType: 'application/json'
              }
            })
          });

          if (response.ok) {
            const result = await response.json();
            const text = result.candidates?.[0]?.content?.parts?.find(p => !p.thought)?.text || result.candidates?.[0]?.content?.parts?.[0]?.text;
            if (text) {
              const cleanText = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
              const parsed = JSON.parse(cleanText);
              return res.status(200).json({ success: true, ai_generated: true, model_used: model, plan: parsed });
            }
          } else {
            const errBody = await response.text();
            lastError = `Model ${model} returned ${response.status}: ${errBody.slice(0, 150)}`;
            console.warn(lastError);
          }
        } catch (mErr) {
          lastError = `Model ${model} exception: ${mErr.message}`;
          console.warn(lastError);
        }
      }
    } catch (err) {
      lastError = `Gemini generate error: ${err.message}`;
      console.error(lastError);
    }
  }

  // Graceful fallback to client-side dynamic semantic engine
  return res.status(200).json({
    success: true,
    ai_generated: false,
    debug: {
      has_key: !!apiKey,
      key_len: apiKey ? apiKey.length : 0,
      last_error: lastError
    },
    message: 'Using client-side dynamic semantic engine'
  });
}
