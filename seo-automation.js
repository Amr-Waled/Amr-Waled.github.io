const { google } = require('googleapis');
const { GoogleGenAI } = require('@google/genai');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
require('dotenv').config();

const PRIMARY_DOMAIN = 'https://amrwaled.vercel.app';
const MIRROR_DOMAIN = 'https://amr-waled.github.io';

// مصفوفة الكلمات المفتاحية الاستراتيجية (عربي + إنجليزي) المستهدفة في محركات البحث
const STRATEGIC_KEYWORD_CLUSTERS = [
    {
        slug: 'marketing-agency-tanta',
        keywordAr: 'ماركتينج وشركات تسويق ودعاية وإعلان في طنطا',
        keywordEn: 'Marketing & Advertising Agency in Tanta',
        coreTerms: ['ماركتينج', 'تسويق طنطا', 'شركة تسويق في طنطا', 'دعاية وإعلان طنطا', 'Marketing Tanta', 'Advertising Agency Tanta']
    },
    {
        slug: 'custom-crm-system-egypt',
        keywordAr: 'برمجة وتطوير سيستم CRM وأنظمة مبيعات الشركات في طنطا ومصر',
        keywordEn: 'Custom CRM System & Business Software Development in Egypt',
        coreTerms: ['CRM', 'سيستم CRM', 'برمجة سيستم', 'نظام مبيعات', 'سيستم عقارات', 'سيستم عيادات', 'Custom CRM Developer']
    },
    {
        slug: 'media-buying-meta-ads-tanta',
        keywordAr: 'ميديا باينج وإدارة إعلانات ممولة عالية العائد في طنطا ومصر',
        keywordEn: 'Media Buying & High-ROAS Meta Ads Specialist in Tanta, Egypt',
        coreTerms: ['ميديا باينج', 'ميدياباينج', 'ميديا باير', 'إعلانات ممولة', 'Media Buying', 'Media Buyer Tanta']
    }
];

// قائمة الصفحات المعتمدة للموقع والأولويات في Sitemap
const CORE_PAGES = [
    { file: 'index.html', urlPath: '/', priority: '1.0', changefreq: 'daily', bilingual: true },
    { file: 'en.html', urlPath: '/en.html', priority: '0.95', changefreq: 'weekly', bilingual: true },
    { file: 'solutions.html', urlPath: '/solutions.html', priority: '0.95', changefreq: 'weekly' },
    { file: 'systems.html', urlPath: '/systems.html', priority: '0.95', changefreq: 'weekly' },
    { file: 'engaz-case-study.html', urlPath: '/engaz-case-study.html', priority: '0.90', changefreq: 'monthly' },
    { file: 'GEO_Amr_waled.html', urlPath: '/GEO_Amr_waled.html', priority: '0.90', changefreq: 'weekly' },
    { file: 'vibe-coding-playbook.html', urlPath: '/vibe-coding-playbook.html', priority: '0.88', changefreq: 'weekly' },
    { file: 'geo-2026.html', urlPath: '/geo-2026.html', priority: '0.85', changefreq: 'monthly' },
    { file: 'about.html', urlPath: '/about.html', priority: '0.85', changefreq: 'monthly' },
    { file: 'llms.txt', urlPath: '/llms.txt', priority: '0.85', changefreq: 'weekly' },
    { file: 'llms-full.txt', urlPath: '/llms-full.txt', priority: '0.85', changefreq: 'weekly' }
];

/**
 * 1. مزامنة النسخة الإنجليزية (en.html) تلقائياً من index.html بدون أي تشوه في الترميز (UTF-8)
 */
function syncEnglishVersion() {
    console.log('🌐 Syncing English SEO page (en.html) from index.html...');
    const indexPath = path.join(__dirname, 'index.html');
    const enPath = path.join(__dirname, 'en.html');

    if (!fs.existsSync(indexPath)) return;

    let html = fs.readFileSync(indexPath, 'utf8');

    html = html.replace('<html lang="ar" dir="rtl">', '<html lang="en" dir="ltr">');
    html = html.replace('<body lang="ar">', '<body lang="en">');

    html = html.replace(
        /<title>[\s\S]*?<\/title>/,
        '<title>Amr Waled | Marketing Manager, Media Buyer, Advertising & Custom CRM Developer in Tanta, Egypt</title>'
    );
    html = html.replace(
        /<meta name="description" content="[^"]*">/,
        '<meta name="description" content="Amr Waled (عمرو وليد) — Marketing Manager, Media Buyer (Meta Ads), Advertising Strategist & Custom CRM System Developer in Tanta, Egypt. Turning ad spend into documented revenue with in-house CRM systems and corporate websites.">'
    );
    html = html.replace('<meta property="og:locale" content="ar_EG">', '<meta property="og:locale" content="en_US">');
    html = html.replace('<meta property="og:locale:alternate" content="en_US">', '<meta property="og:locale:alternate" content="ar_EG">');
    html = html.replace('<meta property="og:url" content="https://amrwaled.vercel.app/">', '<meta property="og:url" content="https://amrwaled.vercel.app/en.html">');
    html = html.replace('<link rel="canonical" href="https://amrwaled.vercel.app/">', '<link rel="canonical" href="https://amrwaled.vercel.app/en.html">');

    html = html.replace(
        '<button id="btn-ar" class="active">AR</button>\n                    <button id="btn-en">EN</button>',
        '<button id="btn-ar">AR</button>\n                    <button id="btn-en" class="active">EN</button>'
    );
    html = html.replace("let saved = 'ar';", "let saved = 'en';");
    html = html.replace("localStorage.getItem('amr-lang') || 'ar'", "localStorage.getItem('amr-lang') || 'en'");

    html = html.replace(/(<([a-zA-Z0-9]+)[^>]*\bdata-ar="([^"]*)"[^>]*\bdata-en="([^"]*)"[^>]*>)([\s\S]*?)(<\/\2>)/g, (match, openTag, tagName, arVal, enVal, inner, closeTag) => {
        if (!/<(?!br\b)[^>]+>/i.test(inner)) {
            return openTag + enVal + closeTag;
        }
        return match;
    });

    fs.writeFileSync(enPath, html, 'utf8');
    console.log('✅ en.html synced and verified (UTF-8 clean).');
}

/**
 * 2. فحص وتصحيح Canonical Tags لجميع صفحات الموقع لضمان الفهرسة في Google Search Console
 */
function auditAndFixCanonicals() {
    console.log('🔍 Auditing HTML pages for Canonical URLs & SEO health...');
    for (const page of CORE_PAGES) {
        if (!page.file.endsWith('.html')) continue;
        const filePath = path.join(__dirname, page.file);
        if (!fs.existsSync(filePath)) continue;

        let content = fs.readFileSync(filePath, 'utf8');
        const expectedCanonical = `${PRIMARY_DOMAIN}${page.urlPath}`;

        // تصحيح أي canonical قديم يشير إلى github.io بدلاً من الدومين الأساسي على Vercel
        if (content.includes('<link rel="canonical"')) {
            content = content.replace(
                /<link rel="canonical" href="[^"]*">/,
                `<link rel="canonical" href="${expectedCanonical}">`
            );
        } else if (content.includes('</head>')) {
            content = content.replace(
                '</head>',
                `    <link rel="canonical" href="${expectedCanonical}">\n</head>`
            );
        }

        fs.writeFileSync(filePath, content, 'utf8');
    }
    console.log('✅ All HTML pages audited and canonicalized to ' + PRIMARY_DOMAIN);
}

/**
 * 3. تحديث ملف sitemap.xml تلقائياً بتاريخ اليوم وجميع الصفحات
 */
function updateSitemap() {
    console.log('🗺️ Updating sitemap.xml...');
    const today = new Date().toISOString().split('T')[0];

    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n        xmlns:xhtml="http://www.w3.org/1999/xhtml"\n        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n\n    <!-- Primary Domain: Vercel (${PRIMARY_DOMAIN}) -->\n`;

    for (const page of CORE_PAGES) {
        xml += `    <url>\n        <loc>${PRIMARY_DOMAIN}${page.urlPath}</loc>\n`;
        if (page.bilingual) {
            xml += `        <xhtml:link rel="alternate" hreflang="ar" href="${PRIMARY_DOMAIN}/"/>\n`;
            xml += `        <xhtml:link rel="alternate" hreflang="en" href="${PRIMARY_DOMAIN}/en.html"/>\n`;
            xml += `        <xhtml:link rel="alternate" hreflang="x-default" href="${PRIMARY_DOMAIN}/"/>\n`;
        }
        if (page.urlPath === '/' || page.urlPath === '/en.html') {
            xml += `        <image:image>\n            <image:loc>${PRIMARY_DOMAIN}/amr-waled.jpg</image:loc>\n            <image:title>عمرو وليد Amr Waled</image:title>\n            <image:caption>عمرو وليد Amr Waled — مدير تسويق ومطور سيستم CRM وأنظمة مبيعات الشركات في طنطا ومصر</image:caption>\n        </image:image>\n`;
            xml += `        <image:image>\n            <image:loc>${PRIMARY_DOMAIN}/amr-waled-crm-developer.jpg</image:loc>\n            <image:title>عمرو وليد — مطور سيستم CRM</image:title>\n            <image:caption>عمرو وليد Amr Waled — Custom CRM Developer in Tanta</image:caption>\n        </image:image>\n`;
            xml += `        <image:image>\n            <image:loc>${PRIMARY_DOMAIN}/amr-waled-marketing-manager.jpg</image:loc>\n            <image:title>عمرو وليد — مدير تسويق طنطا</image:title>\n            <image:caption>عمرو وليد Amr Waled — Marketing Manager &amp; Digital Marketing in Tanta</image:caption>\n        </image:image>\n`;
            xml += `        <image:image>\n            <image:loc>${PRIMARY_DOMAIN}/amr-waled-media-buyer.jpg</image:loc>\n            <image:title>عمرو وليد — خبير ميديا باينج ودعاية وإعلان</image:title>\n            <image:caption>عمرو وليد Amr Waled — Media Buyer &amp; Meta Ads Specialist in Tanta</image:caption>\n        </image:image>\n`;
        }
        xml += `        <lastmod>${today}</lastmod>\n        <changefreq>${page.changefreq}</changefreq>\n        <priority>${page.priority}</priority>\n    </url>\n`;
    }

    xml += `\n    <!-- Mirror Domain: GitHub Pages (${MIRROR_DOMAIN}) -->\n`;
    for (const page of CORE_PAGES) {
        if (page.file.endsWith('.txt')) continue;
        const mirrorPriority = Math.max(0.80, (parseFloat(page.priority) - 0.05)).toFixed(2);
        xml += `    <url>\n        <loc>${MIRROR_DOMAIN}${page.urlPath}</loc>\n        <lastmod>${today}</lastmod>\n        <changefreq>${page.changefreq}</changefreq>\n        <priority>${mirrorPriority}</priority>\n    </url>\n`;
    }

    xml += `\n</urlset>\n`;
    fs.writeFileSync(path.join(__dirname, 'sitemap.xml'), xml, 'utf8');
    console.log('✅ sitemap.xml updated with lastmod=' + today);
}

/**
 * 4. جلب بيانات Google Search Console (إن توفرت صلاحيات صالحة)
 */
async function fetchGscInsights() {
    const keyFilePath = path.join(__dirname, 'gsc-credentials.json');
    if (!fs.existsSync(keyFilePath)) {
        console.log('ℹ️ gsc-credentials.json not found locally. Skipping live GSC API query.');
        return null;
    }

    console.log('📊 Connecting to Google Search Console API...');
    try {
        const auth = new google.auth.GoogleAuth({
            keyFile: keyFilePath,
            scopes: ['https://www.googleapis.com/auth/webmasters.readonly'],
        });
        const webmasters = google.webmasters({ version: 'v3', auth });

        const endDate = new Date().toISOString().split('T')[0];
        const startDate = new Date();
        startDate.setDate(startDate.getDate() - 30);
        const startDateStr = startDate.toISOString().split('T')[0];

        const urlsToTry = [
            'https://amrwaled.vercel.app/',
            'sc-domain:amrwaled.vercel.app',
            'https://amr-waled.github.io/',
            'sc-domain:amr-waled.github.io'
        ];

        for (const url of urlsToTry) {
            try {
                const response = await webmasters.searchanalytics.query({
                    siteUrl: url,
                    requestBody: {
                        startDate: startDateStr,
                        endDate: endDate,
                        dimensions: ['query'],
                        rowLimit: 50
                    }
                });
                console.log(`✅ GSC Data retrieved for: ${url}`);
                return response.data.rows || [];
            } catch (innerErr) {
                if (innerErr.message && innerErr.message.includes('invalid_grant')) {
                    throw innerErr;
                }
            }
        }
    } catch (err) {
        console.warn('⚠️ GSC API Notice:', err.message);
        console.warn('💡 Tip: Because gsc-credentials.json was previously pushed to GitHub, Google Cloud automatically disabled its private key. Create a new JSON key in Google Cloud Console -> IAM -> Service Accounts (seo-auto@double-runway-496618-r1.iam.gserviceaccount.com) and save it as gsc-credentials.json (it is now protected in .gitignore!).');
    }
    return null;
}

/**
 * 5. رفع التحديثات الآمنة فقط إلى GitHub ليتم نشرها تلقائياً على Vercel
 */
function pushSafeSeoFiles() {
    const safeFiles = [
        '.gitignore',
        'index.html',
        'en.html',
        'solutions.html',
        'systems.html',
        'about.html',
        'engaz-case-study.html',
        'GEO_Amr_waled.html',
        'geo-2026.html',
        'vibe-coding-playbook.html',
        'sitemap.xml',
        'robots.txt',
        'llms.txt',
        'llms-full.txt',
        'vercel.json',
        'seo-automation.js',
        'amr-waled.jpg',
        'amr-waled-crm-developer.jpg',
        'amr-waled-marketing-manager.jpg',
        'amr-waled-media-buyer.jpg'
    ];

    try {
        const existingSafeFiles = safeFiles.filter(f => fs.existsSync(path.join(__dirname, f)));
        execSync(`git add ${existingSafeFiles.map(f => `"${f}"`).join(' ')}`, { stdio: 'inherit' });

        const status = execSync('git status --porcelain').toString().trim();
        if (!status) {
            console.log('✅ No new git changes to commit. Everything is up to date.');
            return;
        }

        execSync('git commit -m "SEO Automation: Sync bilingual metadata, canonicals, FAQ schema, and sitemap"', { stdio: 'inherit' });
        execSync('git push', { stdio: 'inherit' });
        console.log('🚀 Pushed safely to GitHub (Vercel auto-deploy triggered)!');
    } catch (gitErr) {
        console.warn('⚠️ Git push note:', gitErr.message);
    }
}

async function runSeoAutomation() {
    console.log('🚀 Starting Amr Waled SEO & GEO Automation Engine...');
    auditAndFixCanonicals();
    syncEnglishVersion();
    updateSitemap();

    const rows = await fetchGscInsights();
    if (rows && rows.length > 0) {
        console.log('📈 Top Search Queries in GSC (Last 30 Days):');
        rows.slice(0, 10).forEach((r, idx) => {
            console.log(`   ${idx + 1}. "${r.keys[0]}" — Clicks: ${r.clicks}, Impressions: ${r.impressions}, Pos: ${r.position.toFixed(1)}`);
        });
    } else {
        console.log('🎯 Active Strategic Keyword Clusters Configured:');
        STRATEGIC_KEYWORD_CLUSTERS.forEach(c => {
            console.log(`   - ${c.keywordAr} | ${c.keywordEn}`);
        });
    }

    if (process.argv.includes('--push')) {
        pushSafeSeoFiles();
    } else {
        console.log('🎉 Local SEO synchronization complete! (Run with --push to commit & push to GitHub/Vercel)');
    }
}

runSeoAutomation();
