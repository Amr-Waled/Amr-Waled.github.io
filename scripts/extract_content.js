const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

function extractBetween(startPattern, endPattern) {
  const start = html.indexOf(startPattern);
  if (start === -1) return '';
  const end = html.indexOf(endPattern, start);
  if (end === -1) return html.substring(start, start + 1000);
  return html.substring(start, end);
}

console.log('=== HERO SECTION ===');
console.log(extractBetween('<div class="hero-bottom">', '<div class="work-grid">').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim());

console.log('\n=== CASE STUDY STATS ===');
const caseCards = [...html.matchAll(/class="case-card"[\s\S]*?class="case-title"[^>]*>([\s\S]*?)<\/h3>[\s\S]*?class="case-stats">([\s\S]*?)<\/div>\s*<a/gi)];
caseCards.forEach(m => {
  console.log('---');
  console.log('Title:', m[1].replace(/<[^>]+>/g, '').trim());
  console.log('Stats:', m[2].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim());
});

console.log('\n=== SERVICES SECTION ===');
const services = [...html.matchAll(/class="service-card"[\s\S]*?class="service-name"[^>]*>([\s\S]*?)<\/h3>[\s\S]*?class="service-desc"[^>]*>([\s\S]*?)<\/p>/gi)];
services.forEach(s => {
  console.log('Service:', s[1].replace(/<[^>]+>/g, '').trim());
  console.log('Desc:', s[2].replace(/<[^>]+>/g, '').trim().substring(0, 100));
});
