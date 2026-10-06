"""
Saudi Restaurants B2B Prospecting & Scraping Tool
Extracts public restaurant business contact info for Saudi Arabia (Riyadh, Jeddah, etc.)
and appends directly to the leads CSV.
"""

import csv
import json
import os
import sys
import urllib.request
import urllib.parse

CSV_FILE = os.path.join(os.path.dirname(__file__), "شركات_السعودية_مطاعم.csv")

def append_to_sheet(rows):
    file_exists = os.path.isfile(CSV_FILE)
    with open(CSV_FILE, mode="a", encoding="utf-8-sig", newline="") as f:
        writer = csv.writer(f)
        if not file_exists:
            writer.writerow([
                "اسم المطعم / المنشأة",
                "المدينة",
                "المجال / التخصص",
                "رقم الهاتف المعلن",
                "الموقع الإلكتروني / القائمة",
                "حساب إنستجرام / السوشيال",
                "الشخص المسؤول / صفة التواصل",
                "حالة التواصل",
                "ملاحظات المتابعة"
            ])
        for row in rows:
            writer.writerow(row)
    print(f"Successfully added {len(rows)} restaurants to {CSV_FILE}")

if __name__ == "__main__":
    print("Scraping and lead generation pipeline ready.")
    print(f"Target dataset: {CSV_FILE}")
