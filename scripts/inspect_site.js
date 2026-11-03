const fs = require('fs');

const html = fs.readFileSync('index.html', 'utf8');

// Find headings
const h1s = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/gi) || [];
const h2s = html.match(/<h2[^>]*>([\s\S]*?)<\/h2>/gi) || [];
const sectionIds = [...html.matchAll(/<section[^>]*id=["']([^"']+)["']/gi)].map(m => m[1]);

console.log('--- SECTION IDS ---');
console.log(sectionIds);

console.log('\n--- H1 HEADINGS ---');
h1s.forEach(h => console.log(h.replace(/<[^>]+>/g, '').trim()));

console.log('\n--- H2 HEADINGS ---');
h2s.forEach(h => console.log(h.replace(/<[^>]+>/g, '').trim()));
