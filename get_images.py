import urllib.request
import re
import os

headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'}

urls_to_check = [
    'https://housing.com/in/buy/projects/page/277085-orchid-gardenia-by-orchid-corp-in-palanpur',
    'https://www.magicbricks.com/orchid-gardenia-palanpur-surat-pdpid-4v40715325423'
]

found_images = []

for page_url in urls_to_check:
    print(f"Checking {page_url}...")
    try:
        req = urllib.request.Request(page_url, headers=headers)
        html = urllib.request.urlopen(req, timeout=10).read().decode('utf-8', errors='ignore')
        matches = re.findall(r'https://[^\s"\'\\]+\.(?:jpg|png|webp|jpeg)', html, re.I)
        print(f"Found {len(matches)} raw matches.")
        for m in matches:
            if ('housing' in m or 'magicbricks' in m or 'staticmb' in m or 'n7net' in m) and ('icon' not in m and 'logo' not in m):
                found_images.append(m)
    except Exception as e:
        print(f"Error checking {page_url}: {e}")

found_images = list(dict.fromkeys(found_images))
print(f"\nTotal unique valid image URLs found: {len(found_images)}")
for i, img in enumerate(found_images[:15]):
    print(f"{i+1}: {img}")
