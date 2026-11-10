const { google } = require('googleapis');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
require('dotenv').config();

const PRIMARY_DOMAIN = 'https://amrwaled.vercel.app';

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

// قائمة الصفحات المعتمدة للموقع بمسارات نظيفة (Clean URLs بدون .html)
const CORE_PAGES = [
    { file: 'index.html', urlPath: '/', priority: '1.0', changefreq: 'daily', bilingual: true },
    { file: 'en.html', urlPath: '/en', priority: '0.95', changefreq: 'weekly', bilingual: true },
    { file: 'crm-systems.html', urlPath: '/crm-systems', priority: '0.96', changefreq: 'weekly' },
    { file: 'marketing-tanta.html', urlPath: '/marketing-tanta', priority: '0.96', changefreq: 'weekly' },
    { file: 'brand.html', urlPath: '/brand', priority: '0.95', changefreq: 'weekly' },
    { file: 'solutions.html', urlPath: '/solutions', priority: '0.95', changefreq: 'weekly' },
    { file: 'systems.html', urlPath: '/systems', priority: '0.95', changefreq: 'weekly' },
    { file: 'engaz-case-study.html', urlPath: '/engaz-case-study', priority: '0.92', changefreq: 'monthly' },
    { file: 'insight-clinic-case-study.html', urlPath: '/insight-clinic-case-study', priority: '0.92', changefreq: 'monthly' },
    { file: 'GEO_Amr_waled.html', urlPath: '/GEO_Amr_waled', priority: '0.90', changefreq: 'weekly' },
    { file: 'media-buyer-ai-playbook.html', urlPath: '/media-buyer-ai-playbook', priority: '0.90', changefreq: 'weekly' },
    { file: 'vibe-coding-playbook.html', urlPath: '/vibe-coding-playbook', priority: '0.88', changefreq: 'weekly' },
    { file: 'geo-2026.html', urlPath: '/geo-2026', priority: '0.85', changefreq: 'monthly' },
    { file: 'about.html', urlPath: '/about', priority: '0.85', changefreq: 'monthly' },
    { file: 'llms.txt', urlPath: '/llms.txt', priority: '0.85', changefreq: 'weekly' },
    { file: 'llms-full.txt', urlPath: '/llms-full.txt', priority: '0.85', changefreq: 'weekly' }
];

const CLEAN_LINK_MAP = {
    'index.html': '/',
    'en.html': '/en',
    'crm-systems.html': '/crm-systems',
    'marketing-tanta.html': '/marketing-tanta',
    'brand.html': '/brand',
    'solutions.html': '/solutions',
    'systems.html': '/systems',
    'engaz-case-study.html': '/engaz-case-study',
    'insight-clinic-case-study.html': '/insight-clinic-case-study',
    'GEO_Amr_waled.html': '/GEO_Amr_waled',
    'media-buyer-ai-playbook.html': '/media-buyer-ai-playbook',
    'vibe-coding-playbook.html': '/vibe-coding-playbook',
    'geo-2026.html': '/geo-2026',
    'about.html': '/about'
};

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
        '<title>Amr Waled | Marketing Manager, Media Buyer & Custom CRM Developer in Tanta, Egypt</title>'
    );
    html = html.replace(
        /<meta name="description" content="[^"]*">/,
        '<meta name="description" content="Amr Waled (عمرو وليد) — Marketing Manager, Media Buyer (Meta Ads), Advertising Strategist & Custom CRM System Developer in Tanta, Egypt. Turning ad spend into documented revenue with in-house CRM systems and corporate websites.">'
    );
    html = html.replace('<meta property="og:locale" content="ar_EG">', '<meta property="og:locale" content="en_US">');
    html = html.replace('<meta property="og:locale:alternate" content="en_US">', '<meta property="og:locale:alternate" content="ar_EG">');
    html = html.replace('<meta property="og:url" content="https://amrwaled.vercel.app/">', '<meta property="og:url" content="https://amrwaled.vercel.app/en">');
    html = html.replace('<link rel="canonical" href="https://amrwaled.vercel.app/">', '<link rel="canonical" href="https://amrwaled.vercel.app/en">');

    html = html.replace(
        '<button type="button" id="btn-ar" class="active">AR</button>\n                    <button type="button" id="btn-en">EN</button>',
        '<button type="button" id="btn-ar">AR</button>\n                    <button type="button" id="btn-en" class="active">EN</button>'
    );

    html = html.replace(/(<([a-zA-Z0-9]+)[^>]*\bdata-ar="([^"]*)"[^>]*\bdata-en="([^"]*)"[^>]*>)([\s\S]*?)(<\/\2>)/g, (match, openTag, tagName, arVal, enVal, inner, closeTag) => {
        if (!/<(?!br\b)[^>]+>/i.test(inner)) {
            return openTag + enVal + closeTag;
        }
        return match;
    });

    html = html.replace(/(<input[^>]*\bdata-placeholder-ar="([^"]*)"[^>]*\bdata-placeholder-en="([^"]*)"[^>]*>)/g, (match, tag, arPh, enPh) => {
        return tag.replace(/placeholder="[^"]*"/, `placeholder="${enPh}"`);
    });

    fs.writeFileSync(enPath, html, 'utf8');
    console.log('✅ en.html synced and verified (UTF-8 clean).');
}

/**
 * 2. فحص وتصحيح Canonical Tags والروابط الداخلية لجميع صفحات الموقع لضمان الفهرسة بدون 308 Redirects
 */
function auditAndFixCanonicals() {
    console.log('🔍 Auditing HTML pages for Clean Canonical URLs & Internal Links...');
    for (const page of CORE_PAGES) {
        if (!page.file.endsWith('.html')) continue;
        const filePath = path.join(__dirname, page.file);
        if (!fs.existsSync(filePath)) continue;

        let content = fs.readFileSync(filePath, 'utf8');
        const expectedCanonical = `${PRIMARY_DOMAIN}${page.urlPath}`;

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

        if (content.includes('<meta property="og:url"')) {
            content = content.replace(
                /<meta property="og:url" content="[^"]*">/,
                `<meta property="og:url" content="${expectedCanonical}">`
            );
        }

        // إضافة favicon.svg إن لم يكن موجوداً لمنع أخطاء 404 في الكونسول
        if (!content.includes('rel="icon"') && content.includes('<meta name="viewport"')) {
            content = content.replace(
                /(<meta name="viewport"[^>]*>)/,
                `$1\n    <link rel="icon" type="image/svg+xml" href="/favicon.svg">`
            );
        }

        // إضافة meta robots القياسي إن لم يكن موجوداً
        if (!/<meta\s+name="robots"/i.test(content) && content.includes('</title>')) {
            content = content.replace(
                /<\/title>/i,
                `</title>\n    <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">`
            );
        }

        // إضافة شبكة الربط الداخلي القياسية (Internal Authority Hub) في الصفحات الفرعية
        if (page.file !== 'index.html' && page.file !== 'en.html' && !content.includes('Internal Authority & Cross-Linking Hub') && content.includes('</body>')) {
            const hubBlock = `\n<!-- Internal Authority & Cross-Linking Hub -->\n<nav aria-label="روابط الموقع الرئيسية" style="max-width:1100px;margin:28px auto 18px;padding:18px 24px;border-top:1px solid rgba(148,163,184,0.2);display:flex;flex-wrap:wrap;gap:14px;justify-content:center;font-size:13px;font-weight:700;">\n  <a href="/" style="color:#ea580c;text-decoration:none;">الرئيسية (Amr Waled)</a>\n  <span style="opacity:0.4;">•</span>\n  <a href="/marketing-tanta" style="color:inherit;text-decoration:none;">تسويق وميديا باينج طنطا</a>\n  <span style="opacity:0.4;">•</span>\n  <a href="/crm-systems" style="color:inherit;text-decoration:none;">برمجة سيستم CRM للشركات</a>\n  <span style="opacity:0.4;">•</span>\n  <a href="/solutions" style="color:inherit;text-decoration:none;">الحلول والخدمات</a>\n  <span style="opacity:0.4;">•</span>\n  <a href="/systems" style="color:inherit;text-decoration:none;">الأنظمة المشحونة</a>\n  <span style="opacity:0.4;">•</span>\n  <a href="/engaz-case-study" style="color:inherit;text-decoration:none;">دراسة حالة إنجاز (+2.5M)</a>\n  <span style="opacity:0.4;">•</span>\n  <a href="/insight-clinic-case-study" style="color:inherit;text-decoration:none;">دراسة عيادة Insight</a>\n  <span style="opacity:0.4;">•</span>\n  <a href="/GEO_Amr_waled" style="color:inherit;text-decoration:none;">دليل الـ GEO 2026</a>\n  <span style="opacity:0.4;">•</span>\n  <a href="/media-buyer-ai-playbook" style="color:inherit;text-decoration:none;">AI Media Buyer Playbook</a>\n  <span style="opacity:0.4;">•</span>\n  <a href="/vibe-coding-playbook" style="color:inherit;text-decoration:none;">Vibe Coding Playbook</a>\n  <span style="opacity:0.4;">•</span>\n  <a href="/brand" style="color:inherit;text-decoration:none;">تشخيص البراند الشخصي AI</a>\n  <span style="opacity:0.4;">•</span>\n  <a href="/about" style="color:inherit;text-decoration:none;">من هو عمرو وليد؟</a>\n</nav>\n`;
            content = content.replace(/<\/body>/i, `${hubBlock}</body>`);
        }

        // تنظيف الروابط الداخلية من امتداد .html لتفادي 308 Redirects
        for (const [htmlFile, cleanPath] of Object.entries(CLEAN_LINK_MAP)) {
            const escaped = htmlFile.replace('.', '\\.');
            content = content.replace(new RegExp(`href="${escaped}"`, 'g'), `href="${cleanPath}"`);
            content = content.replace(new RegExp(`href="https://amrwaled\\.vercel\\.app/${escaped}"`, 'g'), `href="https://amrwaled.vercel.app${cleanPath}"`);
            content = content.replace(new RegExp(`href="https://amr-waled\\.github\\.io/${escaped}"`, 'g'), `href="https://amrwaled.vercel.app${cleanPath}"`);
        }

        fs.writeFileSync(filePath, content, 'utf8');
    }
    console.log('✅ All HTML pages audited and canonicalized to clean URLs on ' + PRIMARY_DOMAIN);
}

/**
 * 3. تحديث ملف sitemap.xml تلقائياً بتاريخ اليوم وجميع الصفحات (بدون ازدواجية دومين github.io)
 */
function updateSitemap() {
    console.log('🗺️ Updating sitemap.xml...');
    const today = new Date().toISOString().split('T')[0];

    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n        xmlns:xhtml="http://www.w3.org/1999/xhtml"\n        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n\n    <!-- Canonical Domain: Vercel (${PRIMARY_DOMAIN}) -->\n`;

    for (const page of CORE_PAGES) {
        xml += `    <url>\n        <loc>${PRIMARY_DOMAIN}${page.urlPath}</loc>\n`;
        if (page.bilingual) {
            xml += `        <xhtml:link rel="alternate" hreflang="ar" href="${PRIMARY_DOMAIN}/"/>\n`;
            xml += `        <xhtml:link rel="alternate" hreflang="ar-EG" href="${PRIMARY_DOMAIN}/"/>\n`;
            xml += `        <xhtml:link rel="alternate" hreflang="en" href="${PRIMARY_DOMAIN}/en"/>\n`;
            xml += `        <xhtml:link rel="alternate" hreflang="x-default" href="${PRIMARY_DOMAIN}/"/>\n`;
        }
        if (page.urlPath === '/' || page.urlPath === '/en') {
            xml += `        <image:image>\n            <image:loc>${PRIMARY_DOMAIN}/amr-waled.jpg</image:loc>\n            <image:title>عمرو وليد Amr Waled</image:title>\n            <image:caption>عمرو وليد Amr Waled — مدير تسويق ومطور سيستم CRM وأنظمة مبيعات الشركات في طنطا ومصر</image:caption>\n        </image:image>\n`;
            xml += `        <image:image>\n            <image:loc>${PRIMARY_DOMAIN}/amr-waled-crm-developer.jpg</image:loc>\n            <image:title>عمرو وليد — مطور سيستم CRM</image:title>\n            <image:caption>عمرو وليد Amr Waled — Custom CRM Developer in Tanta</image:caption>\n        </image:image>\n`;
            xml += `        <image:image>\n            <image:loc>${PRIMARY_DOMAIN}/amr-waled-marketing-manager.jpg</image:loc>\n            <image:title>عمرو وليد — مدير تسويق طنطا</image:title>\n            <image:caption>عمرو وليد Amr Waled — Marketing Manager &amp; Digital Marketing in Tanta</image:caption>\n        </image:image>\n`;
            xml += `        <image:image>\n            <image:loc>${PRIMARY_DOMAIN}/amr-waled-media-buyer.jpg</image:loc>\n            <image:title>عمرو وليد — خبير ميديا باينج ودعاية وإعلان</image:title>\n            <image:caption>عمرو وليد Amr Waled — Media Buyer &amp; Meta Ads Specialist in Tanta</image:caption>\n        </image:image>\n`;
        }
        if (page.urlPath === '/marketing-tanta') {
            xml += `        <image:image>\n            <image:loc>${PRIMARY_DOMAIN}/amr-waled-media-buyer.jpg</image:loc>\n            <image:title>عمرو وليد — خبير ميديا باينج في طنطا</image:title>\n            <image:caption>عمرو وليد Amr Waled — خبير ميديا باينج وإعلانات ممولة وتسويق في طنطا ومحافظة الغربية</image:caption>\n        </image:image>\n`;
            xml += `        <image:image>\n            <image:loc>${PRIMARY_DOMAIN}/amr_media_buying_ai_approved.jpg</image:loc>\n            <image:title>ميديا باينج في طنطا والدلتا — عمرو وليد</image:title>\n            <image:caption>إدارة حملات ميديا باينج وإعلانات ميتا الممولة عالية العائد في طنطا ومصر</image:caption>\n        </image:image>\n`;
        }
        xml += `        <lastmod>${today}</lastmod>\n        <changefreq>${page.changefreq}</changefreq>\n        <priority>${page.priority}</priority>\n    </url>\n`;
    }

    xml += `\n</urlset>\n`;
    fs.writeFileSync(path.join(__dirname, 'sitemap.xml'), xml, 'utf8');
    console.log('✅ sitemap.xml updated with ' + CORE_PAGES.length + ' clean canonical URLs (lastmod=' + today + ')');
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
            'sc-domain:amrwaled.vercel.app'
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
    }
    return null;
}

async function runSeoAutomation() {
    console.log('🚀 Starting Amr Waled SEO & GEO Automation Engine...');
    syncEnglishVersion();
    auditAndFixCanonicals();
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
    console.log('🎉 Local SEO synchronization complete!');
}

runSeoAutomation();
