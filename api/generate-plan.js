import { GoogleGenAI } from '@google/genai';

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
    competitors,
    unique_skills,
    competitor_flaws,
    primary_goal,
    contact_info
  } = req.body || {};

  const apiKey = process.env.GEMINI_API_KEY;

  // If apiKey is a valid Google AI Studio key (starts with AIzaSy)
  if (apiKey && apiKey.startsWith('AIzaSy')) {
    try {
      const ai = new GoogleGenAI({ apiKey });
      const prompt = `أنت كبير مهندسي التسويق وبناء النفوذ الشخصي (Strategic Personal Branding & Positioning Architect).
مهمتك: هندسة الركائز التسويقية (Marketing Pillars) والتموضع الاستراتيجي المضاد (Counter-Positioning) لشخص محدد، بحيث تخرجه تماماً من فخ المقارنات وحرق الأسعار وتضعه في فئة منفردة (Category of One).

⚠️ تحذير صارم:
- ممنوع منعاً باتاً كتابة "جدول محتوى روتيني" أو كلام إنشائي عام ينفع لأي شخص (Zero Fluff).
- يجب تحليل ومهاجمة نقاط ضعف المنافسين المذكورين بالاسم واستغلال المهارات الحصرية المذكورة لصناعة خندق تنافسي (Competitive Moat).
- صمم الاستراتيجية بدقة وفقاً لتفضيله للكاميرا (سواء كان يرفض الكاميرا أو يحبها).

البيانات التشخيصية للمستخدم:
- الاسم: ${name} (${age} سنة)
- المجال / النيش: ${niche}
- أثقل المنافسين في مجاله: ${competitors || 'المنافسين التقليديين في السوق'}
- المهارات الحصرية التي يمتلكها وتنقص منافسيه: ${unique_skills || 'غير محدد'}
- العيوب وأخطاء السوق التي يراها عند منافسيه ويريد معارضتها: ${competitor_flaws || 'حرق الأسعار والوعود النظرية'}
- علاقة المستخدم بالكاميرا والظهور: ${camera_preference}
- الهدف التجاري المباشر: ${primary_goal}

المطلوب: توليد رد JSON حصراً بنفس الهيكل التالي:
{
  "counter_positioning_cvp": "صياغة التموضع المضاد المباشر: كيف يعلن تفوقه على أسلوب (${competitors}) دون تجريح، ويقدم نفسه كبديل هندسي حتمي",
  "pillar_1_moat": {
    "title": "ركيزة الحصن التنافسي (Your Unfair Advantage Moat)",
    "thesis": "كيف يدمج مهارته (${unique_skills}) ليجعل تقليده مستحيلاً على منافسيه",
    "actionable_angles": ["زاوية إثبات 1", "زاوية إثبات 2"]
  },
  "pillar_2_anti_competitor": {
    "title": "ركيزة معارضة أخطاء السوق (Anti-BS & Industry Flaws)",
    "thesis": "كيف يستغل خطأ المنافسين (${competitor_flaws}) لبناء ثقة حديدية لدى العميل المتردد",
    "contrarian_topics": ["موضوع خلافي قوي 1", "موضوع خلافي قوي 2"]
  },
  "pillar_3_proof_of_work": {
    "title": "ركيزة سلطة الإثبات وتفكيك مخاوف العميل (Proof & Friction Buster)",
    "thesis": "ما هي الأدلة والأرقام وطريقة الشرح التي تثبت كفاءته وتقطع شك العميل",
    "proof_assets": ["أصل إثبات 1", "أصل إثبات 2"]
  },
  "pillar_4_offer_architecture": {
    "title": "ركيزة هندسة العرض والتسعير عالي القيمة (Grand Slam Offer)",
    "thesis": "كيف يحزم خدماته كمنتج أو نظام متكامل (Productized Ecosystem) بدل بيع الوقت بالساعة",
    "core_offer_idea": "فكرة العرض الأساسي المقترح"
  },
  "pillar_5_distribution_matrix": {
    "title": "ركيزة الانتشار المتطابقة مع طبيعة ظهوره",
    "format_direction": "التوجيه الصارم بناءً على (${camera_preference})",
    "primary_channels": ["منصة 1", "منصة 2"],
    "execution_framework": "كيف ينفذ وينشر أسبوعياً دون حرق طاقته أو الضغط على نفسه بما يكره"
  },
  "killer_hooks": [
    "خطاف تسويقي شرس يستهدف مشكلة السوق المذكورة",
    "خطاف تسويقي يبرز المهارة التي تنقص المنافسين",
    "خطاف يفكك خوف العميل الأكبر"
  ],
  "strategic_verdict": "حكم استراتيجي وخلاصة قاطعة من سطرين تلخص معركته القادمة في السوق"
}`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json'
        }
      });

      const parsed = JSON.parse(response.text);
      return res.status(200).json({ success: true, ai_generated: true, plan: parsed });
    } catch (err) {
      console.error('Gemini generate error:', err.message);
    }
  }

  // Graceful fallback response: signal client to use its built-in deep semantic engine
  return res.status(200).json({
    success: true,
    ai_generated: false,
    message: 'Using client-side dynamic semantic engine'
  });
}
