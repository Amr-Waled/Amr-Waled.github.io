const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');
const imgs = [...html.matchAll(/<img[^>]*src=["']([^"']+)["']/gi)].map(m => m[1]);
console.log('Images count:', imgs.length);
imgs.forEach(src => {
  if (!src.startsWith('http')) {
    const exists = fs.existsSync(src.split('?')[0]);
    console.log(src, exists ? 'EXISTS' : 'MISSING (404)');
  } else {
    console.log(src, 'REMOTE URL');
  }
});
