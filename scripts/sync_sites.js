const fs = require('fs');

const indexContent = fs.readFileSync('index.html', 'utf8');

// 1. Sync vercel.html
fs.writeFileSync('vercel.html', indexContent, 'utf8');
console.log('✅ vercel.html synced cleanly from index.html (UTF-8, with sound-effects).');

// 2. Sync github.html
// Fix the Mojibake encoding by replacing with clean indexContent
let githubContent = indexContent;
// In github.html, set canonical and og:url to mirror domain if desired, or keep primary
githubContent = githubContent.replace(
  '<link rel="canonical" href="https://amrwaled.vercel.app/">',
  '<link rel="canonical" href="https://amr-waled.github.io/">'
);
githubContent = githubContent.replace(
  '<meta property="og:url" content="https://amrwaled.vercel.app/">',
  '<meta property="og:url" content="https://amr-waled.github.io/">'
);

fs.writeFileSync('github.html', githubContent, 'utf8');
console.log('✅ github.html repaired from Mojibake and synced cleanly (UTF-8, with sound-effects).');

// 3. Inject sound-effects.js into core subpages
const corePages = [
  'about.html',
  'crm-systems.html',
  'engaz-case-study.html',
  'insight-clinic-case-study.html',
  'marketing-tanta.html',
  'media-buyer-ai-playbook.html',
  'solutions.html',
  'systems.html',
  'vibe-coding-playbook.html',
  'geo-2026.html',
  'GEO_Amr_waled.html'
];

corePages.forEach(file => {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    if (!content.includes('sound-effects.js')) {
      if (content.includes('</body>')) {
        content = content.replace('</body>', '  <script src="sound-effects.js" defer></script>\n</body>');
        fs.writeFileSync(file, content, 'utf8');
        console.log(`✅ Injected sound-effects.js into ${file}`);
      }
    }
  }
});
