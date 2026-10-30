import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
  // Set CORS headers
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
      experience_level: data.experience_level || 'غير محدد',
      primary_goal: data.primary_goal || 'غير محدد',
      unfair_advantage: data.unfair_advantage || '',
      contact_info: data.contact_info || '',
      summary_cvp: data.summary_cvp || '',
      created_at: timestamp,
      client_ip: req.headers['x-forwarded-for'] || req.socket?.remoteAddress || 'unknown'
    };

    console.log('[LEAD RECEIVED]', JSON.stringify(leadRecord));

    // 1. Send Instant Telegram Alert if configured
    const telegramToken = process.env.TELEGRAM_BOT_TOKEN;
    const telegramChatId = process.env.TELEGRAM_CHAT_ID;

    if (telegramToken && telegramChatId) {
      const cameraEmoji = leadRecord.camera_preference.includes('كاميرا') ? '🎥 بيحب الكاميرا' : '✍️ بدون ظهور';
      const tgMsg = `🚨 *ليد جديد في أداة الـ Personal Branding!*\n\n` +
        `👤 *الاسم:* ${leadRecord.name}\n` +
        `🎂 *السن:* ${leadRecord.age} سنة\n` +
        `🎯 *النيش / المجال:* ${leadRecord.niche}\n` +
        `📹 *الظهور:* ${cameraEmoji}\n` +
        `💼 *الخبرة:* ${leadRecord.experience_level}\n` +
        `🎯 *الهدف:* ${leadRecord.primary_goal}\n` +
        `📱 *التواصل:* ${leadRecord.contact_info || 'لم يُدخل رقم'}\n` +
        `💡 *الـ CVP المقترح:* ${leadRecord.summary_cvp || 'تم التوليد'}\n\n` +
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
        console.error('Telegram notification error:', tgErr.message);
      }
    }

    // 2. Insert into Supabase if configured
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
          console.error('Supabase insert failed:', errText);
        } else {
          console.log('Successfully saved to Supabase table brand_leads');
        }
      } catch (sbErr) {
        console.error('Supabase error:', sbErr.message);
      }
    }

    // 3. Fallback Local File Storage (for local testing & dev)
    try {
      const logDir = path.join(process.cwd(), 'data');
      if (!fs.existsSync(logDir)) {
        fs.mkdirSync(logDir, { recursive: true });
      }
      const logFile = path.join(logDir, 'leads.jsonl');
      fs.appendFileSync(logFile, JSON.stringify(leadRecord) + '\n', 'utf-8');
    } catch (fsErr) {
      // Vercel serverless is read-only at runtime outside /tmp, ignore gracefully
    }

    return res.status(200).json({
      success: true,
      message: 'Lead saved successfully',
      id: `lead_${Date.now()}`
    });

  } catch (error) {
    console.error('save-lead handler error:', error);
    return res.status(500).json({ success: false, error: error.message });
  }
}
