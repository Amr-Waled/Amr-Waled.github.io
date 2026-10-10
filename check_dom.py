from bs4 import BeautifulSoup
with open('F:\\Seo personal\\index.html', 'r', encoding='utf-8') as f:
    soup = BeautifulSoup(f.read(), 'html.parser')

work = soup.find(id='work')
case_studies = soup.find(id='case-studies')

if case_studies in work.descendants:
    print('YES! case-studies IS inside work!')
else:
    print('NO! case-studies is NOT inside work.')

work_grid = soup.find(class_='work-grid')
if case_studies in work_grid.descendants:
    print('YES! case-studies IS inside work-grid!')
else:
    print('NO! case-studies is NOT inside work-grid.')

case_grid = soup.find(class_='case-grid')
print(f'case_grid parent: {case_grid.parent.get("class")}')
