import json, subprocess, sys
sys.stdout.reconfigure(encoding='utf-8')

WP_URL  = "https://beachhydrovac.com"
WP_USER = "rdenci_16"
WP_PASS = "0L9x p2O7 tdfs khVJ UFyl 1UZk"

# Search for the FAQ page by slug
res = subprocess.run([
    "curl", "-s", "-u", f"{WP_USER}:{WP_PASS}",
    f"{WP_URL}/wp-json/wp/v2/pages?slug=faq&context=edit&_fields=id,title,status,content,link"
], capture_output=True, text=True)

pages = json.loads(res.stdout)
if not pages:
    print("No page found with slug 'faq'")
else:
    for p in pages:
        print(f"ID: {p['id']}")
        print(f"Title: {p['title']['rendered']}")
        print(f"Status: {p['status']}")
        print(f"Link: {p['link']}")
        raw = p['content']['raw']
        print(f"Content length: {len(raw)}")
        # Show first 1000 chars to understand the structure
        print(f"\nContent preview:\n{raw[:2000]}")
