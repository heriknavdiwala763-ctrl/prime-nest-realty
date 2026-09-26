import urllib.request
import os

images_dir = r"c:\Users\Admin\OneDrive\Desktop\brooker-website demo\broker-demo\images"

targets = {
    "orchid_gardenia_1.jpg": "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1920&q=90",
    "orchid_gardenia_2.jpg": "https://images.unsplash.com/photo-1574362848149-11496d93a7c7?auto=format&fit=crop&w=1920&q=90",
    "orchid_gardenia_3.jpg": "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&q=90",
}

headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}

for fname, url in targets.items():
    fpath = os.path.join(images_dir, fname)
    print(f"Downloading {fname}...")
    req = urllib.request.Request(url, headers=headers)
    with urllib.request.urlopen(req) as resp, open(fpath, 'wb') as f:
        f.write(resp.read())
    print(f"Saved {fname}, size: {os.path.getsize(fpath)} bytes")

print("Done!")
