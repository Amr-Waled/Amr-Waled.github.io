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
    contact_info
  } = req.body || {};

  const apiKey = process.env.GEMINI_API_KEY;

  if (apiKey && apiKey.startsWith('AIzaSy')) {
    try {
      const prompt = `أنت كبير مهندسي التسويق والتموضع الاستراتيجي وبناء العلامات الشخصية (Senior Strategic Positioning & Personal Branding Architect).
مهمتك: قراءة استبيان التشخيص وحفر القيمة (Diagnostic Audit) لشخص طموح، وهندسة الركائز التسويقية (Marketing Pillars) والتموضع المنفرد (Category of One) له.

⚠️ معايير صارمة:
- تحدث بلهجة مصرية عملية ذكية تجمع بين عقلية المهندس ونباهة مدير التسويق (Street-smart & Engineering mindset).
- ممنوع تماماً الكلام المعلب أو جداول المحتوى الروتينية (Zero AI Fluff / No Generic Advice).
- وظّف عميل أحلامه (${dream_client})، وكابوس العميل (${client_nightmare})، والمهارة اللي أفضل من 95% (${superpower_95})، ومنافسيه (${competitors}) لإنشاء استراتيجية فتاكة.

بيانات تشخيص العميل:
- الاسم والسن: ${name} (${age} سنة)
- المجال / النيش: ${niche}
- علاقة الكاميرا والظهور: ${camera_preference}
- المهارة التي يتقنها أفضل من 95% من أقرانه: ${superpower_95}
- الموضوع الذي يتحدث فيه 45 دقيقة بدون تحضير: ${passionate_topic_45m || 'مجاله وتجاربه العملية'}
- أثقل المنافسين في السوق: ${competitors}
- الهبد وأخطاء السوق التي يعارضها: ${market_bs}
- عميل أحلامه (صانع القرار المستهدف): ${dream_client}
- كابوس العميل وخوفه الأكبر قبل الدفع: ${client_nightmare}
- أقوى أرقام وسوابق أعمال حقيقية يمتلكها: ${proof_metrics || 'تجارب تنفيذية سابقة ونتائج عملية'}
- الساعات المتاحة أسبوعياً: ${weekly_hours || '3-5 ساعات'}
- الهدف التجاري المباشر: ${primary_goal}

المطلوب إخراج رد JSON حصراً بهذا الهيكل:
{
  "counter_positioning_cvp": "صياغة التموضع المضاد الحاد: كيف يخدم (${dream_client}) بحل كابوس (${client_nightmare}) عبر (${superpower_95}) كبديل قطعي لـ (${competitors})",
  "pillar_1_moat": {
    "title": "ركيزة الحصن التنافسي (Your 95% Superpower Moat)",
    "thesis": "كيف يسلح مهارته (${superpower_95}) كحاجز دخول يستحيل على (${competitors}) منافسته فيه",
    "actionable_angles": ["زاوية إثبات وتطبيق 1", "زاوية إثبات وتطبيق 2"]
  },
  "pillar_2_anti_competitor": {
    "title": "ركيزة معارضة هبد السوق (Anti-BS & Flaws Pillar)",
    "thesis": "كيف يهاجم خطأ السوق (${market_bs}) ليظهر كصوت الحق الوحيد في عيون (${dream_client})",
    "contrarian_topics": ["موضوع خلافي قوي يضرب في الخطأ", "تحليل منطقي لسبب فشل الطرق القديمة"]
  },
  "pillar_3_proof_of_work": {
    "title": "ركيزة سلطة الإثبات وتفكيك كابوس العميل (Proof & Nightmare Buster)",
    "thesis": "كيف يستغل نتائجه (${proof_metrics}) لنسف مخاوف العميل من (${client_nightmare}) قبل الجلسة البيعية",
    "proof_assets": ["طريقة صياغة دراسة الحالة الأولى", "المؤشر المالي أو الرقمي الحاسم"]
  },
  "pillar_4_offer_architecture": {
    "title": "ركيزة العرض الذي لا يُقاوم لعميل أحلامك (Grand Slam Offer)",
    "thesis": "كيف يحزم خدماته في باقة حل متكامل تضمن إزالة (${client_nightmare}) لـ (${dream_client})",
    "core_offer_idea": "فكرة العرض والضمان الاستراتيجي المقترح"
  },
  "pillar_5_distribution_matrix": {
    "title": "ركيزة الانتشار المتوافقة مع طبيعة ظهوره والوقت المتاح",
    "format_direction": "استراتيجية تنفيذية تتطابق 100% مع (${camera_preference}) ووقت (${weekly_hours})",
    "primary_channels": ["منصة 1", "منصة 2"],
    "execution_framework": "روتين النشر الواقعي أسبوعياً بدون إرهاق"
  },
  "killer_hooks": [
    "خطاف تسويقي شرس يستهدف (${dream_client}) مباشرة",
    "خطاف يهاجم خطأ (${market_bs}) بجرأة",
    "خطاف يفكك خوف (${client_nightmare}) بالدليل"
  ],
  "strategic_verdict": "حكم استراتيجي وخلاصة حاسمة من سطرين ترسم خطته لمعركة السوق"
}`;

      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;
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
        const text = result.candidates?.[0]?.content?.parts?.[0]?.text;
        if (text) {
          const parsed = JSON.parse(text);
          return res.status(200).json({ success: true, ai_generated: true, plan: parsed });
        }
      } else {
        const errorText = await response.text();
        console.error('Gemini REST API error:', response.status, errorText);
      }
    } catch (err) {
      console.error('Gemini generate error:', err.message);
    }
  }

  // Graceful fallback to client-side dynamic semantic engine
  return res.status(200).json({
    success: true,
    ai_generated: false,
    message: 'Using client-side dynamic semantic engine'
  });
}
