import os
from bs4 import BeautifulSoup

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

lang_switch = soup.find(class_='lang-switch')
if lang_switch:
    lang_switch.string = 'العربية'
    lang_switch['onclick'] = "window.location.href='index.html'"

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
lang_switch_ar = soup_ar.find(class_='lang-switch')
if lang_switch_ar:
    lang_switch_ar['onclick'] = "window.location.href='en.html'"

head_ar = soup_ar.find('head')
if head_ar:
    en_link = soup_ar.new_tag('link', rel='alternate', hreflang='en', href='https://amrwaled.vercel.app/en.html')
    ar_link = soup_ar.new_tag('link', rel='alternate', hreflang='ar', href='https://amrwaled.vercel.app/')
    head_ar.append(en_link)
    head_ar.append(ar_link)

# We should also remove the old toggleLang JS logic from both if possible, but it's not strictly necessary if onclick is overridden.
# Actually, the old script runs on load and checks localStorage to automatically swap.
# Since we have separate pages now, the auto-swap might override the page. We should remove the language JS script.
for script in soup_ar.find_all('script'):
    if script.string and 'localStorage.getItem(\'amr-lang\')' in script.string:
        script.decompose()

for script in soup.find_all('script'):
    if script.string and 'localStorage.getItem(\'amr-lang\')' in script.string:
        script.decompose()

# Write updated index.html
with open(file_path, 'w', encoding='utf-8') as f:
    f.write(str(soup_ar))
print("index.html updated successfully.")

# Wait! The toggle script is an IIFE at the bottom.
