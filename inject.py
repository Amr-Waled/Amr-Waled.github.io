import re

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# 1. Add AOS CSS to head
if 'aos.css' not in html:
    html = html.replace('</head>', '    <link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet">\n</head>')

# 2. Add Preloader CSS & HTML
loader_css_html = '''
    <style>
        /* Sleek Preloader */
        #preloader {
            position: fixed;
            inset: 0;
            background: #0d0f16;
            z-index: 999999;
            display: flex;
            justify-content: center;
            align-items: center;
            transition: opacity 0.6s ease-out, visibility 0.6s ease-out;
        }
        .loader-ring {
            width: 60px;
            height: 60px;
            border: 3px solid rgba(234, 88, 12, 0.2);
            border-top-color: #ea580c;
            border-radius: 50%;
            animation: spin 1s linear infinite;
        }
        @keyframes spin { 100% { transform: rotate(360deg); } }
        .loaded #preloader {
            opacity: 0;
            visibility: hidden;
        }
    </style>
    <div id="preloader"><div class="loader-ring"></div></div>
'''
if 'id="preloader"' not in html:
    html = html.replace('<body>', '<body>\n' + loader_css_html)

# 3. Add data-aos to sections
# We'll just replace '<section class="' with '<section data-aos="fade-up" data-aos-duration="800" class="'
html = re.sub(r'<section\s+class="', '<section data-aos="fade-up" data-aos-duration="800" class="', html)

# 4. Add AOS JS
aos_js = '''
  <script src="https://unpkg.com/aos@2.3.1/dist/aos.js"></script>
  <script>
      AOS.init({ once: true, offset: 50 });
      window.addEventListener('load', () => {
          document.body.classList.add('loaded');
      });
  </script>
'''
if 'aos.js' not in html:
    html = html.replace('</body>', aos_js + '\n</body>')

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)

print("Injected AOS and Preloader!")
