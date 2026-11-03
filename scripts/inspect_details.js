const fs = require('fs');

const html = fs.readFileSync('index.html', 'utf8');

// Find all elements with id
const idMatches = [...html.matchAll(/id=["']([^"']+)["']/gi)].map(m => m[1]);
console.log('Unique IDs:', [...new Set(idMatches)]);

// Find all buttons
const buttons = [...html.matchAll(/<button[^>]*>([\s\S]*?)<\/button>/gi)].map(m => m[1].replace(/<[^>]+>/g, '').trim());
console.log('\nButtons count:', buttons.length);
console.log('Sample buttons:', buttons.slice(0, 10));

// Find all classes on interactive elements
const interactiveClasses = [...html.matchAll(/class=["']([^"']*(?:btn|button|card|cta|link|interactive)[^"']*)["']/gi)].map(m => m[1]);
console.log('\nInteractive classes count:', interactiveClasses.length);

// Check current script tags
const scripts = [...html.matchAll(/<script[\s\S]*?>([\s\S]*?)<\/script>/gi)].map(m => m[1].length);
console.log('\nScripts count:', scripts.length);
