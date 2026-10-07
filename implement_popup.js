const fs = require('fs');

let indexHtml = fs.readFileSync('index.html', 'utf8');

// 1. Inject WhatsApp Popup
const WA_POPUP_HTML = `
<!-- WhatsApp Floating Toast -->
<style>
  .wa-toast {
    position: fixed;
    bottom: -100px;
    right: 24px;
    background: white;
    box-shadow: 0 10px 40px rgba(0,0,0,0.15);
    border-radius: 16px;
    display: flex;
    align-items: center;
    padding: 16px;
    gap: 16px;
    z-index: 99999;
    transition: bottom 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
    opacity: 0;
    max-width: 320px;
  }
  .wa-toast.show {
    bottom: 24px;
    opacity: 1;
  }
  .wa-toast-icon {
    width: 48px;
    height: 48px;
    background: #25D366;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
  }
  .wa-toast-icon svg { width: 28px; height: 28px; fill: white; }
  .wa-toast-content h4 { margin: 0; font-size: 15px; color: #111; font-family: var(--font-en); font-weight: 700; }
  .wa-toast-content p { margin: 4px 0 0; font-size: 13px; color: #666; font-family: var(--font-ar); }
  .wa-toast-close {
    position: absolute;
    top: 8px;
    right: 8px;
    background: none;
    border: none;
    font-size: 18px;
    color: #999;
    cursor: pointer;
  }
</style>
<a href="https://wa.me/201091642566" target="_blank" class="wa-toast" id="waToast">
  <button class="wa-toast-close" id="waClose">&times;</button>
  <div class="wa-toast-icon">
    <svg viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12 21.828V21.83h-.002c-1.636 0-3.236-.44-4.636-1.272l-.333-.198-3.447.904.921-3.361-.217-.346C3.41 16.143 2.96 14.103 2.96 12c0-4.962 4.045-9 9.04-9 4.996 0 9.04 4.038 9.04 9s-4.044 9-9.04 9.828zM12 1.045C5.955 1.045 1.04 5.96 1.04 12c0 1.932.505 3.81 1.465 5.467L1 23l5.654-1.482c1.58.88 3.394 1.346 5.346 1.346 6.045 0 10.96-4.915 10.96-10.96S18.045 1.045 12 1.045z"/></svg>
  </div>
  <div class="wa-toast-content">
    <h4 data-en="Need a Marketing Expert?" data-ar="محتاج مساعدة في التسويق؟">Need a Marketing Expert?</h4>
    <p data-en="Let's chat directly on WhatsApp!" data-ar="يلا بينا نتكلم على الواتساب وندردش في البيزنس بتاعك.">يلا بينا نتكلم على الواتساب وندردش في البيزنس بتاعك.</p>
  </div>
</a>
<script>
  setTimeout(() => {
    document.getElementById('waToast').classList.add('show');
  }, 10000);
  document.getElementById('waClose').addEventListener('click', (e) => {
    e.preventDefault();
    document.getElementById('waToast').classList.remove('show');
  });
</script>
`;

if(!indexHtml.includes('waToast')) {
    indexHtml = indexHtml.replace('</body>', WA_POPUP_HTML + '\n</body>');
}

// 2. Replace Emojis in placeholders with solid modern CSS/Images (FontAwesome SVG standard icons basically)
// We will replace <span class="case-emoji">ðŸ —ï¸ </span> with an SVG or high quality image if we had one.
// Let's replace the hardcoded emoji spans with professional SVGs.

const icon1 = `<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 3v18h18"/><path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3"/></svg>`; // Trending up
const icon2 = `<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>`; // Hexagon/System

// I will just use regex to replace `<div class="blog-thumb-placeholder" ...>emoji</div>` with a more professional UI.
// Wait, replacing emojis in HTML via JS string replacement requires matching the exact characters, which might be tricky if the file is correctly UTF-8 now.
// Since the file is properly UTF-8 now, the emoji is actual emojis like 🏗️ and 🏢.
// Let's replace 🏗️ with the SVG.

indexHtml = indexHtml.replace(/>🏗️<\/div>/g, '>' + icon1 + '</div>');
indexHtml = indexHtml.replace(/>🏢<\/div>/g, '>' + icon2 + '</div>');
indexHtml = indexHtml.replace(/>🤖<\/span>/g, '>' + `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="10" rx="2"/><circle cx="12" cy="5" r="2"/><path d="M12 7v4"/><line x1="8" y1="16" x2="8" y2="16"/><line x1="16" y1="16" x2="16" y2="16"/></svg>` + '</span>');


fs.writeFileSync('index.html', indexHtml, 'utf8');
console.log('SUCCESS');
