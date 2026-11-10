import fs from 'fs';
import os from 'os';
import path from 'path';

// Simple per-instance rate limiter (max 15 lead submissions per IP per 10 minutes)
const rateBuckets = new Map();
function isRateLimited(ip) {
  const now = Date.now();
  const windowMs = 10 * 60 * 1000;
  const maxReq = 15;
  const entry = rateBuckets.get(ip) || { count: 0, resetAt: now + windowMs };
  if (now > entry.resetAt) {
    entry.count = 1;
    entry.resetAt = now + windowMs;
  } else {
    entry.count += 1;
  }
  rateBuckets.set(ip, entry);
  return entry.count > maxReq;
}

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
    const clientIp = (req.headers['x-forwarded-for'] || req.socket?.remoteAddress || 'unknown').split(',')[0].trim();
    if (isRateLimited(clientIp)) {
      return res.status(429).json({ error: 'Too many requests, please try again shortly.' });
    }

    const data = req.body || {};
    const timestamp = new Date().toISOString();

    const leadRecord = {
      name: String(data.name || 'غير محدد').slice(0, 200),
      age: String(data.age || 'غير محدد').slice(0, 40),
      niche: String(data.niche || 'غير محدد').slice(0, 250),
      camera_preference: String(data.camera_preference || 'غير محدد').slice(0, 120),
      superpower_95: String(data.superpower_95 || 'غير محدد').slice(0, 400),
      passionate_topic_45m: String(data.passionate_topic_45m || '').slice(0, 400),
      competitors: String(data.competitors || 'غير محدد').slice(0, 400),
      market_bs: String(data.market_bs || 'غير محدد').slice(0, 400),
      dream_client: String(data.dream_client || 'غير محدد').slice(0, 400),
      client_nightmare: String(data.client_nightmare || 'غير محدد').slice(0, 600),
      proof_metrics: String(data.proof_metrics || 'غير محدد').slice(0, 400),
      weekly_hours: String(data.weekly_hours || 'غير محدد').slice(0, 100),
      primary_goal: String(data.primary_goal || 'غير محدد').slice(0, 300),
      contact_info: String(data.contact_info || '').slice(0, 200),
      summary_cvp: String(data.summary_cvp || '').slice(0, 600),
      has_cv: !!(data.cv_text && data.cv_text.trim().length > 20),
      cv_snippet: String(data.cv_text || '').slice(0, 400),
      adaptive_rounds: (data.history || []).length,
      history_summary: (data.history || []).map(h => `${h.question}: ${h.answer}`).join(' | ').slice(0, 800),
      created_at: timestamp,
      client_ip: clientIp
    };

    console.log('[DIAGNOSTIC AUDIT LEAD RECEIVED]', JSON.stringify(leadRecord));

    // 1. Instant Telegram Alert (with HTML/plain fallback so underscores/asterisks never drop leads)
    const telegramToken = process.env.TELEGRAM_BOT_TOKEN;
    const telegramChatId = process.env.TELEGRAM_CHAT_ID;

    if (telegramToken && telegramChatId) {
      const cameraEmoji = leadRecord.camera_preference.includes('كاميرا') ? '🎥 بيحب الكاميرا' : '✍️ بدون ظهور';
      const plainMsg = `🚨 ليد جديد على موقع عمرو وليد!\n\n` +
        `👤 الاسم: ${leadRecord.name} (${leadRecord.age})\n` +
        `📱 التواصل: ${leadRecord.contact_info || 'لم يُدخل رقم'}\n` +
        `🎯 الهدف / الخدمة: ${leadRecord.primary_goal}\n` +
        `💼 النيش: ${leadRecord.niche}\n` +
        `😱 التحدي / الكابوس: ${leadRecord.client_nightmare}\n` +
        `📹 الظهور: ${cameraEmoji} | ⏳ الوقت: ${leadRecord.weekly_hours}\n` +
        `⚡ المهارة الـ 95%: ${leadRecord.superpower_95}\n` +
        `⚔️ المنافسين: ${leadRecord.competitors}\n` +
        `💥 هبد السوق: ${leadRecord.market_bs}\n` +
        `👑 عميل الأحلام: ${leadRecord.dream_client}\n` +
        `📊 الأرقام: ${leadRecord.proof_metrics}\n` +
        `💡 التموضع: ${leadRecord.summary_cvp}\n\n` +
        `⏰ التوقيت: ${timestamp}`;

      try {
        await fetch(`https://api.telegram.org/bot${telegramToken}/sendMessage`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: telegramChatId,
            text: plainMsg
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

    // 3. Fallback Writable Temp File Storage (/tmp on Vercel Serverless)
    try {
      const tmpDir = os.tmpdir();
      const logFile = path.join(tmpDir, 'amr_leads.jsonl');
      fs.appendFileSync(logFile, JSON.stringify(leadRecord) + '\n', 'utf-8');
    } catch (fsErr) {}

    return res.status(200).json({
      success: true,
      message: 'Lead saved successfully',
      id: `lead_${Date.now()}`
    });

  } catch (error) {
    console.error('save-lead error:', error);
    return res.status(500).json({ success: false, error: error.message });
  }
}
