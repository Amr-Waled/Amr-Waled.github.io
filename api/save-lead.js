import fs from 'fs';
import path from 'path';

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

  try {
    const data = req.body || {};
    const timestamp = new Date().toISOString();

    const leadRecord = {
      name: data.name || 'غير محدد',
      age: data.age || 'غير محدد',
      niche: data.niche || 'غير محدد',
      camera_preference: data.camera_preference || 'غير محدد',
      superpower_95: data.superpower_95 || 'غير محدد',
      passionate_topic_45m: data.passionate_topic_45m || '',
      competitors: data.competitors || 'غير محدد',
      market_bs: data.market_bs || 'غير محدد',
      dream_client: data.dream_client || 'غير محدد',
      client_nightmare: data.client_nightmare || 'غير محدد',
      proof_metrics: data.proof_metrics || 'غير محدد',
      weekly_hours: data.weekly_hours || 'غير محدد',
      primary_goal: data.primary_goal || 'غير محدد',
      contact_info: data.contact_info || '',
      summary_cvp: data.summary_cvp || '',
      has_cv: !!(data.cv_text && data.cv_text.trim().length > 20),
      cv_snippet: (data.cv_text || '').slice(0, 400),
      adaptive_rounds: (data.history || []).length,
      history_summary: (data.history || []).map(h => `${h.question}: ${h.answer}`).join(' | ').slice(0, 800),
      created_at: timestamp,
      client_ip: req.headers['x-forwarded-for'] || req.socket?.remoteAddress || 'unknown'
    };

    console.log('[DIAGNOSTIC AUDIT LEAD RECEIVED]', JSON.stringify(leadRecord));

    // 1. Instant Telegram Alert
    const telegramToken = process.env.TELEGRAM_BOT_TOKEN;
    const telegramChatId = process.env.TELEGRAM_CHAT_ID;

    if (telegramToken && telegramChatId) {
      const cameraEmoji = leadRecord.camera_preference.includes('كاميرا') ? '🎥 بيحب الكاميرا' : '✍️ بدون ظهور';
      const tgMsg = `🚨 *تشخيص استراتيجي جديد (Diagnostic Onboarding Audit)!*\n\n` +
        `👤 *الاسم:* ${leadRecord.name} (${leadRecord.age} سنة)\n` +
        `🎯 *النيش:* ${leadRecord.niche}\n` +
        `📹 *الظهور:* ${cameraEmoji} | ⏳ *الوقت:* ${leadRecord.weekly_hours}\n` +
        `⚡ *المهارة الـ 95%:* ${leadRecord.superpower_95}\n` +
        `⚔️ *المنافسين:* ${leadRecord.competitors}\n` +
        `💥 *هبد السوق:* ${leadRecord.market_bs}\n` +
        `👑 *عميل الأحلام:* ${leadRecord.dream_client}\n` +
        `😱 *كابوس العميل:* ${leadRecord.client_nightmare}\n` +
        `📊 *أقوى الأرقام:* ${leadRecord.proof_metrics}\n` +
        `🎯 *الهدف:* ${leadRecord.primary_goal}\n` +
        `📱 *التواصل:* ${leadRecord.contact_info || 'لم يُدخل رقم'}\n` +
        `💡 *التموضع المضاد:* ${leadRecord.summary_cvp}\n\n` +
        `⏰ *التوقيت:* ${timestamp}`;

      try {
        await fetch(`https://api.telegram.org/bot${telegramToken}/sendMessage`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: telegramChatId,
            text: tgMsg,
            parse_mode: 'Markdown'
          })
        });
      } catch (tgErr) {
        console.error('Telegram alert note:', tgErr.message);
      }
    }

    // 2. Supabase Insert
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_ANON_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (supabaseUrl && supabaseKey) {
      try {
        const response = await fetch(`${supabaseUrl.replace(/\/$/, '')}/rest/v1/brand_leads`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'apikey': supabaseKey,
            'Authorization': `Bearer ${supabaseKey}`,
            'Prefer': 'return=minimal'
          },
          body: JSON.stringify(leadRecord)
        });
        if (!response.ok) {
          const errText = await response.text();
          console.error('Supabase insert note:', errText);
        }
      } catch (sbErr) {
        console.error('Supabase note:', sbErr.message);
      }
    }

    // 3. Fallback Local File Storage
    try {
      const logDir = path.join(process.cwd(), 'data');
      if (!fs.existsSync(logDir)) {
        fs.mkdirSync(logDir, { recursive: true });
      }
      const logFile = path.join(logDir, 'leads.jsonl');
      fs.appendFileSync(logFile, JSON.stringify(leadRecord) + '\n', 'utf-8');
    } catch (fsErr) {}

    return res.status(200).json({
      success: true,
      message: 'Diagnostic audit saved successfully',
      id: `lead_${Date.now()}`
    });

  } catch (error) {
    console.error('save-lead error:', error);
    return res.status(500).json({ success: false, error: error.message });
  }
}
