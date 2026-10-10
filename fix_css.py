import os

file_path = r"F:\Seo personal\index.html"

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Make the cards less tall / more squared
replacements = {
    "width: 170px;\n            height: 230px;": "width: 190px;\n            height: 200px;",
    "width: 160px;\n            height: 220px;": "width: 180px;\n            height: 190px;",
    "width: 210px;\n            height: 270px;": "width: 230px;\n            height: 240px;",
    "width: 110px; height: 150px;": "width: 130px; height: 140px;", # Mobile p-left
    "width: 100px; height: 140px;": "width: 120px; height: 130px;", # Mobile p-right
    "width: 140px; height: 190px;": "width: 160px; height: 170px;"  # Mobile p-main
}

for old, new in replacements.items():
    content = content.replace(old, new)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)
print("CSS dimensions updated.")
