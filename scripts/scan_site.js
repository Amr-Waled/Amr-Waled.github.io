const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');
const lines = html.split('\n');

lines.forEach((l, i) => {
  if (/<h[1-4]/i.test(l) || /class="[^"]*(hero|nav|cta|case|work|service|track|blog|faq|pricing|review)[^"]*"/i.test(l)) {
    console.log(`${i+1}: ${l.trim().substring(0, 110)}`);
  }
});
