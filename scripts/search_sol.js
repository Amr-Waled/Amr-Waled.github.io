const fs = require('fs');
const content = fs.readFileSync('SOL_6.1_MASTER_CONSULTATION.md', 'utf8');

const lines = content.split('\n');
const keywords = ['موقع', 'بورتفوليو', 'Engaz', 'Sally', 'Maqam', 'Insight', 'Vibe Coder', 'تسعير', 'عرض', 'اعتراض', 'CPL', '2.5M'];

lines.forEach((line, idx) => {
  for (const kw of keywords) {
    if (line.includes(kw)) {
      console.log(`[L${idx+1}] ${line.substring(0, 120)}`);
      break;
    }
  }
});
