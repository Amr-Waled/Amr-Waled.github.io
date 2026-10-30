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

  const { name, age, niche, camera_preference, experience_level, primary_goal, unfair_advantage } = req.body || {};

  const apiKey = process.env.GEMINI_API_KEY;

  // If apiKey is valid AI Studio key (starts with AIzaSy)
  if (apiKey && apiKey.startsWith('AIzaSy')) {
    try {
      const ai = new GoogleGenAI({ apiKey });
      const prompt = `أنت خبير استراتيجي في بناء العلامات الشخصية (Personal Branding) تعمل بمدرسة كبار المفكرين:
(Daniel Priestley - Key Person of Influence, Mark Schaefer - KNOWN, Austin Kleon - Show Your Work, Donald Miller - StoryBrand, Naval Ravikant).

المطلوب: توليد خطة استراتيجية شديدة العمق والذكاء بصيغة JSON للشخص التالي:
- الاسم: ${name}
- السن: ${age}
- النيش / التخصص: ${niche}
- تفضيل الكاميرا والظهور: ${camera_preference}
- مستوى الخبرة وسوابق الأعمال: ${experience_level}
- الهدف الأساسي: ${primary_goal}
- الميزة التنافسية الإضافية (Unfair Advantage): ${unfair_advantage || 'لا يوجد'}

يرجى الرد بصيغة JSON حصراً بالشكل التالي:
{
  "cvp": "صياغة الـ Category of One المباشرة (أنا أساعد فئة كذا لتحقيق كذا عبر كذا بدون كذا)",
  "brand_archetype": "الممارس الباني / المرشد الاستراتيجي / المحلل والباحث",
  "content_strategy": {
    "format_direction": "توجيه نوع المحتوى بناءً على تفضيل الكاميرا",
    "distribution_ratio": "70% قيمة تقنية، 20% كواليس وتجارب، 10% آراء حاسمة وتريندات",
    "primary_channels": ["المنصة 1", "المنصة 2"]
  },
  "hooks": [
    "خطاف قوي رقم 1",
    "خطاف قوي رقم 2",
    "خطاف قوي رقم 3"
  ],
  "roadmap_90_days": {
    "month_1": "مهام الشهر الأول في التأسيس والبنية",
    "month_2": "مهام الشهر الثاني في ماكينة المحتوى والأصل الرئيسي",
    "month_3": "مهام الشهر الثالث في التحويل والاستشارات والصفقات"
  },
  "golden_advice": "نصيحة ذهبية واحدة قاطعة مبنية على سنه ونشاطه وتفضيله للكاميرا"
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
      console.error('Gemini generate error, falling back to deterministic:', err.message);
    }
  }

  // Graceful fallback status: tell client to use its rich built-in decision engine
  return res.status(200).json({
    success: true,
    ai_generated: false,
    message: 'Using deterministic expert engine'
  });
}
