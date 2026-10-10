const { google } = require('googleapis');
const { GoogleGenAI } = require('@google/genai');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
require('dotenv').config();

// الرابط الخاص بك كما هو مسجل في Google Search Console
const SITE_URL = 'https://amrwaled.vercel.app/'; 

async function runSeoAutomation() {
    console.log('🚀 Starting SEO Automation...');
    
    // 1. الاتصال بـ Google Search Console
    const auth = new google.auth.GoogleAuth({
        keyFile: path.join(__dirname, 'gsc-credentials.json'),
        scopes: ['https://www.googleapis.com/auth/webmasters.readonly'],
    });
    const webmasters = google.webmasters({ version: 'v3', auth });

    // 2. جلب بيانات آخر 30 يوم
    console.log('📊 Fetching Google Search Console data...');
    const endDate = new Date().toISOString().split('T')[0];
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 30);
    const startDateStr = startDate.toISOString().split('T')[0];

    try {
        const urlsToTry = [
        'https://amrwaled.vercel.app/',
        'https://amr-waled.github.io/',
        'sc-domain:amrwaled.vercel.app',
        'sc-domain:amr-waled.github.io'
    ];

    let response = null;
    let successfulUrl = '';

    for (const url of urlsToTry) {
        try {
            console.log(`Trying to fetch data for: ${url}`);
            response = await webmasters.searchanalytics.query({
                siteUrl: url,
                requestBody: {
                    startDate: startDateStr,
                    endDate: endDate,
                    dimensions: ['query'],
                    rowLimit: 100
                }
            });
            successfulUrl = url;
            console.log(`✅ Success with URL: ${url}`);
            break; // Stop loop if successful
        } catch (e) {
            console.log(`❌ Failed for ${url}`);
        }
    }

    if (!response) {
        throw new Error("Could not fetch data for any of the URLs. Please verify the exact Property Name in GSC.");
    }

    const rows = response.data.rows || [];
        
        // البحث عن الكلمات التي فيها فرصة: الترتيب بعد الـ 10 وظهورها أكثر من 10 مرات
        const opportunities = rows.filter(row => row.position > 10 && row.impressions > 10);
        
        let targetKeyword = '';
        if (opportunities.length > 0) {
            targetKeyword = opportunities[0].keys[0]; 
            console.log(`✅ Found Opportunity Keyword: ${targetKeyword}`);
        } else {
            console.log('⚠️ No specific opportunities found. Picking the top keyword.');
            if (rows.length > 0) {
                targetKeyword = rows[0].keys[0];
            } else {
                targetKeyword = 'التسويق وتطوير الأعمال'; // بديل احتياطي
            }
        }

        // 3. إنشاء المقال باستخدام Gemini AI
        console.log(`🤖 Generating article for keyword: "${targetKeyword}" using Gemini...`);
        const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
        
        const prompt = `أنت خبير SEO وكاتب محتوى احترافي. 
اكتب مقالاً حصرياً ومفيداً باللغة العربية حول "${targetKeyword}". 
المقال يجب أن يكون كصفحة HTML كاملة ومرتبة. استخدم وسوم <head> و <body> و <title> تحتوي على الكلمة المفتاحية.
استخدم وسوم <h1>, <h2>, <p>, <ul>. 
اجعل المحتوى مباشراً، مفيداً، ومهيكلاً بطريقة ممتازة تناسب محركات بحث الذكاء الاصطناعي (AIO).
قم بإرجاع كود الـ HTML فقط بدون أي مقدمات أو شروحات إضافية.`;

        const aiResponse = await ai.models.generateContent({
            model: 'gemini-3.1-pro-preview',
            contents: prompt,
        });

        let htmlContent = aiResponse.text;
        // تنظيف مخرجات الذكاء الاصطناعي من أي علامات Markdown
        htmlContent = htmlContent.replace(/```html/g, '').replace(/```/g, '').trim();

        // 4. حفظ المقال كملف جديد
        // تحويل المسافات إلى شُرط ليكون اسم الملف متوافقاً مع الروابط
        const fileName = targetKeyword.replace(/\s+/g, '-').toLowerCase() + '.html';
        const filePath = path.join(__dirname, fileName);
        fs.writeFileSync(filePath, htmlContent, 'utf8');
        console.log(`💾 Saved article to ${fileName}`);

        // 5. رفع الملف إلى GitHub لينتشر على Vercel
        console.log('🚀 Pushing to GitHub (Vercel will auto-deploy)...');
        execSync('git add .', { stdio: 'inherit' });
        execSync(`git commit -m "Auto SEO: Added new article about ${targetKeyword}"`, { stdio: 'inherit' });
        execSync('git push', { stdio: 'inherit' });

        console.log('🎉 Automation finished successfully!');
        
    } catch (error) {
        console.error('❌ Error during automation:', error.message);
    }
}

runSeoAutomation();
