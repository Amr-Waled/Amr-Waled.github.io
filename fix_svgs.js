const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const icon1 = `<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 3v18h18"/><path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3"/></svg>`; // Trending
const icon2 = `<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>`; // Medical/Calendar

html = html.replace(/<span class="case-emoji">🏗.*?<\/span>/g, `<span class="case-emoji" style="display:flex;align-items:center;justify-content:center;">${icon1}</span>`);
html = html.replace(/<span class="case-emoji">🏥.*?<\/span>/g, `<span class="case-emoji" style="display:flex;align-items:center;justify-content:center;">${icon2}</span>`);

html = html.replace(/<div class="blog-thumb-placeholder"[^>]*>🏗.*?<\/div>/g, `<div class="blog-thumb-placeholder" style="color:#ea580c;">${icon1}</div>`);
html = html.replace(/<div class="blog-thumb-placeholder"[^>]*>🏥.*?<\/div>/g, `<div class="blog-thumb-placeholder" style="color:#3b82f6;">${icon2}</div>`);

// Fire emoji in the nav bar is fine, lightning bolt is fine, star is fine. The user explicitly asked to "Start increasing images instead of the missing symbols/emojis".
fs.writeFileSync('index.html', html, 'utf8');
console.log('Fixed missed SVGs');
