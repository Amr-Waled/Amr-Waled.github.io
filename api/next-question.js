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
    profile = {},
    history = [],
    step_count = 1
  } = req.body || {};

  const rawKey = process.env.GEMINI_API_KEY || '';
  const apiKey = rawKey.replace(/^["']|["']$/g, '').trim();

  // If AI Key is available, generate dynamic contextual question
  if (apiKey && apiKey.length > 20) {
    try {
      const prompt = `أنت كبير مستشاري بناء العلامات الشخصية والتموضع الاستراتيجي لعمرو وليد (Senior Personal Branding & Strategic Positioning Consultant).
أنت تجري جلسة تشخيصية حية ومتكيفة (Adaptive Dynamic Brand Diagnostic) مع عميل طموح.
مهمتك: قراءة ملفه وإجاباته السابقة، وهندسة **السؤال الاستراتيجي التالي** المخصص له حصراً بناءً على تفاصيل مجاله الفريدة.

⚠️ معايير صارمة:
- النبرة: مصري عملي واثق ذكي (Street-smart & Senior Consultant mindset) بدون أي رسميات روبوتية أو مقدمات جوفاء.
- لا تسأل أسئلة عامة أو مكررة؛ إذا قال إنه دكتور اسأل عن العمليات والسمعة، إذا قال ميديا باير اسأل عن تسريب الليدات وتكلفة الاستحواذ، إذا قال مهندس برمجيات اسأل عن المعمارية والـ Tech stack وعقود الشركات.
- كل خطوة لازم تثبت أنك فهمت إجابته السابقة من خلال (reflection) ذكي ومركز من جملة واحدة.
- قدم 3 إلى 4 اقتراحات سريعة وذكية للإجابة (suggested_chips) تناسب السؤال.
- قرر ما إذا كنا جمعنا تفاصيل كافية لتوليد الماستربلان الكامل (is_ready_for_plan: true إذا كان عدد الأسئلة السابقة >= 4 وتم استيعاب المهارة والعميل والمنافس).

ملف العميل الحالي:
- الاسم: ${profile.name || 'العميل'} (${profile.age || 'غير محدد'} سنة)
- المجال / النيش: ${profile.niche || 'غير محدد'}
- علاقة الكاميرا: ${profile.camera_preference || 'لم يحدد بعد'}
- مقتطف من السيرة الذاتية (CV): ${(profile.cv_text || 'لا يوجد ملف مرفق').slice(0, 1500)}

تاريخ الإجابات السابقة في الجلسة:
${history.map((h, i) => `[محطة ${i + 1}] س: ${h.question} -> ج: ${h.answer}`).join('\n')}

المحطة الحالية رقم: ${step_count}

المطلوب إخراج رد JSON حصراً بهذا الهيكل:
{
  "reflection": "تعليق ذكي وسريع يثبت استيعابك الدقيق لإجابته السابقة ويربطها بالخطوة القادمة",
  "question_title": "السؤال الاستراتيجي المخصص التالي (مبني بدقة على مجاله وخلفيته)",
  "question_hint": "توجيه استشاري قصير يشرح له كيف يفكر في الإجابة بدون تنظير",
  "placeholder": "مثال توضيحي واقعي يناسب مجاله...",
  "suggested_chips": ["اقتراح سريع 1", "اقتراح سريع 2", "اقتراح سريع 3"],
  "allow_custom_text": true,
  "is_ready_for_plan": ${step_count >= 5},
  "progress_pct": ${Math.min(95, Math.round((step_count / 6) * 100))}
}`;

      const candidateModels = ['gemini-3.1-flash-lite', 'gemini-3.1-flash-lite-preview', 'gemini-3.5-flash'];

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
              return res.status(200).json({ success: true, ai_generated: true, model_used: model, data: parsed });
            }
          }
        } catch (mErr) {
          console.warn(`Next-question model ${model} failed:`, mErr.message);
        }
      }
    } catch (err) {
      console.error('Next-question error:', err.message);
    }
  }

  // Adaptive Fallback Engine if AI is unreachable
  const fallbackData = getAdaptiveFallbackQuestion(profile, history, step_count);
  return res.status(200).json({
    success: true,
    ai_generated: false,
    data: fallbackData
  });
}

function getAdaptiveFallbackQuestion(profile, history, stepCount) {
  const niche = profile.niche || '';
  const isTech = new RegExp('برمج|كود|أنظمة|tech|software|developer', 'i').test(niche);
  const isRealEstate = new RegExp('عقار|تطوير|مقاولات|broker|real estate', 'i').test(niche);
  const isDoctor = new RegExp('طبيب|دكتور|عيادة|طبي|clinic|doctor', 'i').test(niche);
  const isMarketing = new RegExp('تسويق|ميديا|إعلانات|marketing|media', 'i').test(niche);

  if (stepCount === 2) {
    if (isDoctor) {
      return {
        reflection: `طبيب في ${niche}، دي منطقة محتاجة بناء هيبة وثقة لا تتزعزع لأن المريض بيسلمك صحته.`,
        question_title: `إيه أكتر عملية أو حالة معقدة بتعملها بنتائج مذهلة ونادراً ما تلاقي دكتور بيعملها بنفس الدقة؟`,
        question_hint: `عايزين نحدد مهارة الـ 95% الجراحية أو العلاجية اللي تبرزك فوق كل العيادات التقليدية.`,
        placeholder: `مثال: جراحات بدون ألم، تقويم الحالات المستعصية، تشخيص الأمراض المنافية النادرة...`,
        suggested_chips: ['جراحات دقيقة بأقل فترة تعافي', 'تشخيص الحالات المعقدة التي فشل علاجها سابقاً', 'استخدام أحدث أجهزة وتقنيات الليزر في طنطا'],
        is_ready_for_plan: false,
        progress_pct: 35
      };
    } else if (isRealEstate) {
      return {
        reflection: `سوق العقارات والوساطة في مصر والخليج مليان زحمة وسطحية، التموضع الحاد هنا هو منجم دهب.`,
        question_title: `إيه الشريحة العقارية الأكثر ربحية ليك؟ ومين أتقل 1-2 منافسين بيضايقوك في السوق؟`,
        question_hint: `حدد المستثمرين وصناع القرار اللي لو قفلت معاهم 3 صفقات شهرياً هتكون في قمة الربحية.`,
        placeholder: `مثال: مطوري التجمع وزايد، مستثمري العاصمة الإدارية، المشترين التجاريين والإداريين...`,
        suggested_chips: ['مستثمري الوحدات التجارية والإدارية الكبرى', 'مشتري السكني الفاخر في زايد والتجمع', 'شركات التطوير العقاري الباحثة عن إغلاق مبيعات سريعة'],
        is_ready_for_plan: false,
        progress_pct: 35
      };
    } else if (isTech) {
      return {
        reflection: `مجال التكنولوجيا والبرمجيات؛ التحدي الأكبر إن العميل دايماً مش فاهم الفرق بين كود هاوي ونظام enterprise.`,
        question_title: `إيه الـ Architecture أو الأنظمة المعقدة اللي بتصممها وتضمن استقرارها تحت ضغط عالي؟`,
        question_hint: `عايزين نثبت تموضعك كمهندس أنظمة استراتيجي مش مجرد مبرمج بينفذ طلبات رخيصة.`,
        placeholder: `مثال: أتمتة الـ CRM السحابي، قواعد بيانات serverless سريعة، ربط بوابات دفع وأنظمة مالية...`,
        suggested_chips: ['بناء أنظمة CRM سحابية مخصصة للشركات', 'معمارية قواعد بيانات تتحمل ملايين العمليات', 'ربط وأتمتة العمليات المعقدة بالذكاء الاصطناعي'],
        is_ready_for_plan: false,
        progress_pct: 35
      };
    } else {
      return {
        reflection: `استوعبت مجالك (${niche})؛ الخطوة دي محتاجين نحفر في السلاح السري اللي بيميزك.`,
        question_title: `لو جردناك من مسمياتك.. إيه المهارة الحصرية اللي بتعملها أفضل من 95% من زمايلك؟`,
        question_hint: `المهارة اللي العميل لو جربها معاك مش هيعرف يستبدلك بأي منافس تاني.`,
        placeholder: `مثال: تحويل الميزانيات لمبيعات، تقليل الهدر التشغيلي، التفاوض الصعب...`,
        suggested_chips: ['سرعة ودقة التنفيذ مقارنة ببطء المنافسين', 'القدرة على تحقيق عائد استثماري مباشر قابل للقياس', 'حل المشاكل المعقدة التي استسلم فيها الآخرون'],
        is_ready_for_plan: false,
        progress_pct: 35
      };
    }
  }

  if (stepCount === 3) {
    return {
      reflection: `نقطة قوة ممتازة؛ الآن لازم نعرف مين العميل اللي هيدفعلك أعلى سعر بدون فصال.`,
      question_title: `مين صانع القرار (عميل أحلامك)؟ وإيه أكبر كابوس مخليه خايف يدفعلك أو يتعاقد معاك؟`,
      question_hint: `الخوف الأكبر هو المدخل السري لأي عرض استراتيجي ينسف التردد.`,
      placeholder: `مثال: خايف ميزانيته تضيع، خايف يسلم المشروع لحد يتأخر عليه، خايف من الجودة الرديئة...`,
      suggested_chips: ['خايف من حرق الميزانية بدون نتائج ملموسة', 'خايف من عدم الالتزام بالمواعيد والتسليم', 'خايف يدفع لخدمة معلبة مفيهاش متابعة واهتمام حقيقي'],
      is_ready_for_plan: false,
      progress_pct: 55
    };
  }

  if (stepCount === 4) {
    return {
      reflection: `كابوس العميل ده هو السلاح اللي هنصمم عليه عرضك الحصري ونهجم بيه على عيوب المنافسين.`,
      question_title: `إيه أكتر "هبدة أو كلام نظري فاشل" بتشوف منافسينك بيعملوه في مجالك وعايز تعارضه علناً؟`,
      question_hint: `التموضع المضاد (Contrarian Stance) هو اللي بيخليك صوت الحق الوحيد في السوق.`,
      placeholder: `مثال: حرق الأسعار وجودة رديئة، وعود خيالية وريتش كاذب، باقات سوشيال ميديا معلبة...`,
      suggested_chips: ['حرق الأسعار وتقديم جودة هشة لا تعيش', 'الوعود الخيالية التي لا تترجم لأرقام في الخزينة', 'بيع قوالب مكررة لكل العملاء بدون دراسة حقيقية لمشاكلهم'],
      is_ready_for_plan: false,
      progress_pct: 75
    };
  }

  // Final Step: Proof & Commitment
  return {
    reflection: `رائع! جمعنا جوهر تموضعك؛ خطوة أخيرة لحسم أرقامك وساعات التزامك الأسبوعية.`,
    question_title: `إيه أقوى رقم أو دراسة حالة حقيقية عملتها؟ ومستعد تخصص كام ساعة أسبوعياً لبراندك؟`,
    question_hint: `أرقامك الحقيقية وسيلة الاتصال لحفظ الماستربلان وإطلاقه فوراً.`,
    placeholder: `مثال: حققت 3 مليون مبيعات، وفرت 40 ساعة شهرياً، مستعد لـ 5 ساعات أسبوعياً...`,
    suggested_chips: ['4-6 ساعات أسبوعياً مع سوابق أعمال موثقة', '2-3 ساعات أسبوعياً مع التركيز على المحتوى المركز', '+10 ساعات أسبوعياً للانطلاق السريع في السوق'],
    is_ready_for_plan: true,
    progress_pct: 95
  };
}
