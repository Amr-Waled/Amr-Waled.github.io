import csv

CSV_FILE = r"f:\Seo personal\صناع_القرار_مطاعم_السعودية.csv"

decision_makers = [
    # 1. Hamburgini
    ["همبرغيني (Hamburgini)", "الرياض", "برجر وسريع", "نواف الفوزان (Nawaf Al-Fawzan)", "المؤسس والرئيس التنفيذي (Founder & CEO)", 
     "https://www.linkedin.com/in/nawaf-alfawzan", "@hamburgini", 
     "تحسين معدل إعادة الطلب للعميل عبر التطبيق وتقليل تكلفة اكتساب العميل في إعلانات سناب وتيك توك."],

    # 2. Shawarmer
    ["شاورمر (Shawarmer)", "الرياض", "شاورما مبتكرة", "أحمد الرشيد / عبدالمحسن الربيعة", "المؤسسون والمدير العام (Co-Founders)", 
     "https://www.linkedin.com/company/shawarmer", "@shawarmerksa", 
     "أتمتة العروض اللحظية لأوقات ركود ما بعد الظهر وبناء مسار إعادة استهداف للزبائن الدائمين."],

    # 3. Maestro Pizza
    ["مايسترو بيتزا (Maestro Pizza)", "الرياض", "بيتزا وتوصيل", "خالد العمران (Khalid Al-Omran)", "المؤسس ورئيس مجلس الإدارة (Founder & Chairman)", 
     "https://www.linkedin.com/in/khalid-alomran", "@maestropizza", 
     "تقليل الاعتماد على حرق الأسعار وبناء نظام ولاء يركز على زيادة متوسط قيمة الفاتورة (AOV)."],

    # 4. Section-B
    ["سكشن بي (Section-B)", "جدة / الرياض", "برجر فاخر (Gourmet)", "فواز سندي / مصطفى طاشكندي (Fawaz Sindi)", "الشريك المؤسس والمدير الإداري (Co-Founder)", 
     "https://www.linkedin.com/search/results/all/?keywords=Section-B%20Burger", "@sectionb_sa", 
     "استغلال التفاعل الهائل على إنستجرام لتحويل المتابعين لعملاء مسجلين بنظام VIP بدلاً من إهدار الترافيك."],

    # 5. Century Burger
    ["سنشري برجر (Century Burger)", "جدة / الرياض", "برجر عصري", "عبدالله سندي / ناصر سندي (Nasser Sindi)", "المؤسس ومدير العمليات (Co-Founder & COO)", 
     "https://www.linkedin.com/search/results/all/?keywords=Century%20Burger%20Saudi", "@centuryburger", 
     "ربط منيو الأونلاين بسيستم متابعة ترويجية يرسل عروض حصرية بعد أول زيارة للفرع."],

    # 6. Chef's Burger
    ["شيفز برجر (Chef's)", "جدة", "برجر وتدخين لحوم", "شيف معاذ ومؤسسو شيفز (Chef Moaaz)", "الشريك المؤسس ورئيس الطهاة", 
     "https://www.linkedin.com/search/results/all/?keywords=Chef%27s%20Burger%20Jeddah", "@chefs_burger", 
     "بناء صفحة هبوط سريعة وحملة إعلانات لحجز بوكسات الحفلات والباربكيو المنزلي في الويك إند."],

    # 7. Smokey Beards Q
    ["سموكي بيردز كيو (Smokey Beards Q)", "الرياض", "لحوم تكساس مدخنة", "مطاع بيل / نابليون (Mutah Beale)", "المؤسس وصاحب البراند (Founder)", 
     "https://www.linkedin.com/search/results/all/?keywords=Smokey%20Beards%20Q%20Riyadh", "@smokeybeardsq", 
     "نظام حجز مسبق إلكتروني يدفع العميل عربوناً لحجز كميات اللحم المدخن قبل نفادها يومياً."],

    # 8. Marble Cuisine
    ["ماربل (Marble Cuisine)", "الرياض", "لحوم وبرجر ستيك", "عبدالرحمن القاسم (Abdulrahman Alkasim)", "المؤسس والمدير العام (Founder)", 
     "https://www.linkedin.com/search/results/all/?keywords=Marble%20Cuisine%20Riyadh", "@marblecuisine", 
     "تسويق تجربة العشاء الحصرية لمجموعات الشركات والـ Private Dining بحملات موجهة."],

    # 9. Camel Step
    ["خطوة جمل (Camel Step)", "الرياض", "قهوة مختصة ومحمصة", "خالد الموسى (Khalid Almousa)", "الشريك المؤسس والرئيس التنفيذي (Co-Founder & CEO)", 
     "https://www.linkedin.com/in/khalid-almousa", "@camelstep", 
     "بناء مسار مبيعات B2B CRM لأتمتة توريد القهوة للمكاتب والشركات الكبرى والجهات الحكومية."],

    # 10. Half Million
    ["هاف مليون (Half Million)", "الرياض", "سلسلة كافيهات", "صهيب البلوشي / عبدالله الراجحي", "الشريك المؤسس ومدير التوسع (Co-Founder)", 
     "https://www.linkedin.com/search/results/all/?keywords=Half%20Million%20Coffee", "@halfmillion_sa", 
     "إطلاق اشتراكات القهوة الشهرية للموظفين في أبراج ومجمعات الأعمال في الرياض."],

    # 11. Barn's
    ["بارنز كافيه (Barn's)", "جدة", "درايف ثرو وطني", "المهندس محمد الزين (Mohamed Al-Zain)", "الرئيس التنفيذي (CEO)", 
     "https://www.linkedin.com/in/eng-mohamed-al-zain", "@barnscoffee", 
     "إعلانات الاستهداف الجيومكاني المباشر حول محطات الوقود لتنبيه السائقين بالفرع الأقرب."],

    # 12. Overdose Coffee
    ["أوفردوز (Overdose Coffee)", "جدة / الرياض", "درايف ثرو وقهوة", "مجموعة مستثمري أوفردوز والمدير التنفيذي", "الرئيس التنفيذي للضيافة (CEO)", 
     "https://www.linkedin.com/search/results/all/?keywords=Overdose%20Coffee%20Saudi", "@overdosecoffeeksa", 
     "تطبيق نظام الطلب السريع والدفع المسبق لتقليل وقت انتظار السيارات عند الشباك."],

    # 13. Hashi Basha
    ["حاشي باشا (Hashi Basha)", "الرياض", "مضغوط وشعبي", "سعد الغامدي (Saad Al-Ghamdi)", "رئيس مجلس الإدارة والمؤسس", 
     "https://www.linkedin.com/company/hashibasha", "@hashibasha", 
     "توحيد داتا العملاء عبر 100+ فرع في نظام CRM واحد لمكافأة العميل المتردد بين المدن."],

    # 14. Al Romansiah
    ["الرومانسية (Al Romansiah)", "الرياض", "ولائم ومأكولات سعودية", "يحيى المعلم / رئيس قطاع التسويق", "رئيس قطاع التسويق والاتصال (CMO)", 
     "https://www.linkedin.com/search/results/all/?keywords=Al%20Romansiah%20Marketing", "@alromansiahksa", 
     "أتمتة حجوزات الولائم والذبائح الكبرى على واتساب لتقليل نسبة تسريب الليدات من الكول سنتر."],

    # 15. Meez
    ["مطعم ميز (Meez)", "جدة", "حجازي عصري", "إدارة مجموعة ميز والشركاء المؤسسين", "المؤسس والمدير الإداري (Managing Director)", 
     "https://www.linkedin.com/search/results/all/?keywords=Meez%20Restaurant%20Jeddah", "@meezksa", 
     "حملات استهداف لزوار موسم جدة والسياح لتعريفهم بالمطبخ الحجازي المطور."],

    # 16. Lusin (Leylaty Group)
    ["مطاعم لوسين (Lusin)", "الرياض / جدة", "فاين داينينج أرميني", "مجموعة ليلتي / هاني العطاس (Hani Al-Attas)", "الرئيس التنفيذي للمجموعة (Group CEO)", 
     "https://www.linkedin.com/search/results/all/?keywords=Lusin%20Restaurant%20Leylaty", "@lusin_ksa", 
     "بناء قاعدة بيانات لعملاء الـ VIP للتذكير بالمناسبات الخاصة وأعياد الميلاد برسائل شخصية."],

    # 17. Chapter
    ["شابتر (Chapter)", "الرياض", "فطور وبرانش راقي", "مؤسسو شابتر ومدير العمليات", "الشريك المؤسس (Co-Founder)", 
     "https://www.linkedin.com/search/results/all/?keywords=Chapter%20Riyadh%20Restaurant", "@chapter.sa", 
     "نظام قائمة انتظار ذكية بالواتساب (Smart Waitlist) لحل أزمة طوابير صباح الجمعة والسبت."],

    # 18. Coyard Coffee Roasters
    ["كويارد (Coyard)", "الرياض", "قهوة مختصة ومحمصة", "مؤسسو كويارد وفريق التسويق", "المؤسس ومدير العمليات", 
     "https://www.linkedin.com/search/results/all/?keywords=Coyard%20Coffee%20Roasters", "@coyardcoffeeroasters", 
     "تسويق جلسات العمل الهادئة للشركات الناشئة والمستشارين المستقلين بباقات عمل شهرية."],

    # 19. Myazu
    ["ميازو (Myazu)", "الرياض / جدة", "ياباني معاصر فاخر", "إدارة الأغذية الفاخرة (MFC Group)", "مدير التسويق الإقليمي (Regional Marketing Director)", 
     "https://www.linkedin.com/search/results/all/?keywords=Myazu%20Restaurant%20Riyadh", "@myazusaudi", 
     "حملات إعادة استهداف رقمية (Retargeting) لزوار موقع الحجوزات لرفع نسبة تأكيد الحضور."],

    # 20. Bateel
    ["كافيه بتيل (Café Bateel)", "الرياض", "ضيافة وتمور فاخرة", "د. عطا أتمار (Dr. Ata Atmar)", "الرئيس التنفيذي لبتيل العالمية (CEO)", 
     "https://www.linkedin.com/in/dr-ata-atmar-963a75b", "@bateelgourmet", 
     "حملات مبيعات B2B موجهة لمديري الموارد البشرية والبروتوكول لهدايا المناسبات الرسمية."],

    # 21. Harat
    ["مطعم حارات (Harat)", "الرياض", "شرقي وتراثي", "إدارة مجموعة الفالح للضيافة", "مدير العمليات والتسويق", 
     "https://www.linkedin.com/search/results/all/?keywords=Harat%20Restaurant%20Riyadh", "@harat_ksa", 
     "نظام تنبيهات الطاولات لتقليل وقت جلوس الزبائن في منطقة الانتظار واستغلال المساحة."],

    # 22. Fairouz Garden
    ["فيروز جاردن (Fairouz Garden)", "الرياض", "لبناني وجلسات خارجية", "إدارة الضيافة والمطاعم", "مدير التسويق والحفلات", 
     "https://www.linkedin.com/search/results/all/?keywords=Fairouz%20Garden%20Riyadh", "@fairouzgarden", 
     "تسويق باقات أعياد الميلاد وعقود القران في الجلسات الخارجية بحملات ليدز مباشرة."],

    # 23. Operation Falafel KSA
    ["أوبريشن فلافل السعودية", "الرياض", "شعبي عصري", "إدارة الامتياز الإقليمية", "مدير التسويق (Marketing Manager)", 
     "https://www.linkedin.com/search/results/all/?keywords=Operation%20Falafel%20Saudi", "@operationfalafel", 
     "بناء منيو مخصص لطلبات إفطار الشركات الصباحية مع سيستم دفع فواتير شهرية مجمعة."],

    # 24. Papa Knafeh
    ["بابا كنافة (Papa Knafeh)", "الرياض", "حلويات شرقية", "مؤسسو بابا كنافة", "مدير المبيعات والتوسع", 
     "https://www.linkedin.com/search/results/all/?keywords=Papa%20Knafeh%20Saudi", "@papaknafeh", 
     "حملات مواسم الصيف للمثلجات والحلويات الباردة لتعويض هبوط مبيعات الكنافة الساخنة."],

    # 25. IL Baretto KAFD
    ["إل باريتو (Il Baretto KAFD)", "الرياض", "إيطالي في مركز كافد", "إدارة مطاعم KAFD / فريق التشغيل", "مدير العمليات والشراكات", 
     "https://www.linkedin.com/search/results/all/?keywords=Il%20Baretto%20Riyadh%20KAFD", "@ilbarettosa", 
     "استهداف موظفي البنوك العالمية وصناديق الاستثمار في KAFD بوجبات غداء العمل السريعة."]
]

header = [
    "اسم البراند / المطعم",
    "المدينة / المقر",
    "التصنيف",
    "اسم المؤسس / متخذ القرار",
    "المنصب (Role)",
    "رابط لينكد إن المباشر للبحث والتواصل",
    "حساب إنستجرام",
    "المدخل البيعي المخصص (The Custom Pitch Hook)"
]

with open(CSV_FILE, mode="w", encoding="utf-8-sig", newline="") as f:
    writer = csv.writer(f)
    writer.writerow(header)
    for row in decision_makers:
        writer.writerow(row)

print("SUCCESS: Decision Makers CSV created!")
