import requests
import csv
import time
import os

# ==========================================
# AMR WALED - ELITE LEAD GENERATION ENGINE
# ==========================================
# This script extracts high-ticket leads using Google Places API 
# and prepares a CSV with specialized columns for Growth Engineering.

API_KEY = "ضع_مفتاح_جوجل_هنا" # Get from Google Cloud Console
MARKETS = [
    {"city": "Riyadh", "query": "Restaurants in Riyadh", "filename": "Riyadh_Leads.csv"},
    {"city": "Kuwait", "query": "Real Estate companies in Kuwait", "filename": "Kuwait_Leads.csv"},
    {"city": "Tanta", "query": "Restaurants in Tanta Egypt", "filename": "Tanta_Leads.csv"}
]

def search_places(query):
    url = f"https://maps.googleapis.com/maps/api/place/textsearch/json?query={query}&key={API_KEY}"
    response = requests.get(url).json()
    return response.get('results', [])

def get_place_details(place_id):
    url = f"https://maps.googleapis.com/maps/api/place/details/json?place_id={place_id}&fields=name,formatted_phone_number,website,url,rating&key={API_KEY}"
    response = requests.get(url).json()
    return response.get('result', {})

def generate_leads():
    for market in MARKETS:
        print(f"[*] Starting extraction for: {market['city']}...")
        places = search_places(market['query'])
        
        filepath = os.path.join(os.path.dirname(__file__), market['filename'])
        
        with open(filepath, mode='w', encoding='utf-8-sig', newline='') as file:
            writer = csv.writer(file)
            writer.writerow(["اسم العميل", "رقم الهاتف", "الموقع الإلكتروني", "التقييم", "المشكلة المتوقعة (للتشخيص)", "الحل المقترح (الـ Pitch)"])
            
            count = 0
            for place in places[:100]: # Limit to what the API returns per page/token
                time.sleep(1) # Prevent API rate limits
                details = get_place_details(place['place_id'])
                
                name = details.get('name', 'N/A')
                phone = details.get('formatted_phone_number', 'N/A')
                website = details.get('website', 'N/A')
                rating = details.get('rating', 'N/A')
                
                # AI Logic Placeholder for analysis
                problem = "غياب نظام الطلب المباشر / الاعتماد على تطبيقات التوصيل" if "restaurant" in market['query'].lower() else "تسرب العملاء المحتملين لعدم وجود CRM"
                solution = "بناء Custom CRM لربط الطلبات بحملات إعلانية مباشرة"
                
                writer.writerow([name, phone, website, rating, problem, solution])
                count += 1
                
        print(f"[+] Saved {count} leads for {market['city']} to {market['filename']}.")

if __name__ == "__main__":
    print("Welcome to Amr Waled's Acquisition Engine")
    # generate_leads() # Uncomment after adding API Key
