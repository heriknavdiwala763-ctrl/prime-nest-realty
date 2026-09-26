import urllib.request
import os

images_dir = r"c:\Users\Admin\OneDrive\Desktop\brooker-website demo\broker-demo\images"
os.makedirs(images_dir, exist_ok=True)

# Curated High-Res Unsplash luxury real estate & architectural building images
image_urls = {
    # Orchid Gardenia
    "orchid_gardenia_main.jpg": "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1600&q=85", # Modern Apartment Elevation
    "orchid_gardenia_towers.jpg": "https://images.unsplash.com/photo-1574362848149-11496d93a7c7?auto=format&fit=crop&w=1200&q=85", # High rise towers
    "orchid_gardenia_3d.jpg": "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85", # 3D Architectural Exterior
    "orchid_gardenia_campus.jpg": "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=85", # Landscaped Garden & Campus
    "orchid_gardenia_balcony.jpg": "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=85", # Balcony & Living
    "orchid_gardenia_plan1.jpg": "https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?auto=format&fit=crop&w=1200&q=85", # Interior & layout
    "orchid_gardenia_plan2.jpg": "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=85", # Master layout

    # Anand Aspire
    "anand_aspire_main.jpg": "https://images.unsplash.com/photo-1567496898669-ee935f5f647a?auto=format&fit=crop&w=1600&q=85",
    "anand_aspire_garden.jpg": "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=85",
    "anand_aspire_balcony.jpg": "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=85",
    "anand_aspire_amenities.jpg": "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=1200&q=85",
    "anand_aspire_interior.jpg": "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=85",

    # Nakshatra Solitaire
    "nakshatra_main.jpg": "https://images.unsplash.com/photo-1515263487990-61b07816b324?auto=format&fit=crop&w=1600&q=85",
    "nakshatra_entrance.jpg": "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=85",
    "nakshatra_campus.jpg": "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=85",
    "nakshatra_pool.jpg": "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=1200&q=85",
    "nakshatra_interior.jpg": "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=85",
}

headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}

for filename, url in image_urls.items():
    filepath = os.path.join(images_dir, filename)
    print(f"Downloading {filename}...")
    req = urllib.request.Request(url, headers=headers)
    try:
        with urllib.request.urlopen(req) as response, open(filepath, 'wb') as out_file:
            out_file.write(response.read())
        print(f"Saved {filename}")
    except Exception as e:
        print(f"Error downloading {filename}: {e}")

print("All downloads finished.")
