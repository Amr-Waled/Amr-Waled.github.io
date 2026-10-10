import os
import subprocess
from bs4 import BeautifulSoup

# We will checkout the latest index.html from git to reset it before generating again
#subprocess.run(['git', 'checkout', 'HEAD', 'index.html'], cwd=r'F:\Seo personal')

file_path = r"F:\Seo personal\index.html"
output_path = r"F:\Seo personal\en.html"

with open(file_path, 'r', encoding='utf-8') as f:
    original_html = f.read()

soup = BeautifulSoup(original_html, 'html.parser')

# Generate en.html
html_tag = soup.find('html')
if html_tag:
    html_tag['lang'] = 'en'
    html_tag['dir'] = 'ltr'

for tag in soup.find_all(attrs={"data-en": True}):
    tag.string = tag['data-en']

lang_toggle = soup.find(class_='lang-toggle')
if lang_toggle:
    lang_toggle['onclick'] = "window.location.href='index.html'"
    # Make EN active, AR inactive
    btn_ar = lang_toggle.find(id='btn-ar')
    btn_en = lang_toggle.find(id='btn-en')
    if btn_ar and btn_en:
        btn_ar['class'] = ''
        btn_en['class'] = 'active'

head = soup.find('head')
if head:
    en_link = soup.new_tag('link', rel='alternate', hreflang='en', href='https://amrwaled.vercel.app/en.html')
    ar_link = soup.new_tag('link', rel='alternate', hreflang='ar', href='https://amrwaled.vercel.app/')
    head.append(en_link)
    head.append(ar_link)

with open(output_path, 'w', encoding='utf-8') as f:
    f.write(str(soup))
print("en.html generated successfully.")

# Modify index.html
soup_ar = BeautifulSoup(original_html, 'html.parser')
lang_toggle_ar = soup_ar.find(class_='lang-toggle')
if lang_toggle_ar:
    lang_toggle_ar['onclick'] = "window.location.href='en.html'"
    # Keep AR active

head_ar = soup_ar.find('head')
if head_ar:
    en_link = soup_ar.new_tag('link', rel='alternate', hreflang='en', href='https://amrwaled.vercel.app/en.html')
    ar_link = soup_ar.new_tag('link', rel='alternate', hreflang='ar', href='https://amrwaled.vercel.app/')
    head_ar.append(en_link)
    head_ar.append(ar_link)

for script in soup_ar.find_all('script'):
    if script.string and 'function toggleLang()' in script.string:
        script.decompose()
        
for script in soup_ar.find_all('script'):
    if script.string and 'localStorage' in script.string and 'amr-lang' in script.string:
        script.decompose()

# Write updated index.html
with open(file_path, 'w', encoding='utf-8') as f:
    f.write(str(soup_ar))
print("index.html updated successfully.")
