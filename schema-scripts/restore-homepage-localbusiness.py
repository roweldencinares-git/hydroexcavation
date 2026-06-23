import json, subprocess, sys, re
sys.stdout.reconfigure(encoding='utf-8')

WP_URL  = "https://beachhydrovac.com"
WP_USER = "rdenci_16"
WP_PASS = "0L9x p2O7 tdfs khVJ UFyl 1UZk"
PAGE_ID = 3201

# ── 1. Get current raw content ────────────────────────────────────────
res = subprocess.run([
    "curl", "-s", "-u", f"{WP_USER}:{WP_PASS}",
    f"{WP_URL}/wp-json/wp/v2/pages/{PAGE_ID}?context=edit&_fields=content"
], capture_output=True, text=True)
raw = json.loads(res.stdout)["content"]["raw"]

print(f"Current length: {len(raw)}")
print(f"Has #localbusiness: {'#localbusiness' in raw}")
blocks = re.findall(r'<!-- wp:html -->(.*?)<!-- /wp:html -->', raw, re.DOTALL)
print(f"Current wp:html blocks: {len(blocks)}")

# ── 2. Build LocalBusiness schema ─────────────────────────────────────
# Use unique @id (#localbusiness) separate from Yoast's #organization
local_business = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "GeneralContractor"],
    "@id": "https://beachhydrovac.com/#localbusiness",
    "name": "Beach HydroVac",
    "legalName": "Advanced Infrastructure Mapping, LLC",
    "url": "https://beachhydrovac.com/",
    "telephone": "+1-757-510-5220",
    "email": "johnw@beachhydrovac.com",
    "description": "Virginia's veteran-owned hydro excavation company. Specializing in potholing, daylighting, slot trenching, SUE Level A verification, and remote excavation. Serving Hampton Roads, Richmond, and surrounding Virginia.",
    "image": "https://beachhydrovac.com/wp-content/uploads/2026/01/cropped-Add-a-heading-1.png",
    "logo": {
        "@type": "ImageObject",
        "url": "https://beachhydrovac.com/wp-content/uploads/2026/01/cropped-Add-a-heading-1.png",
        "width": 500,
        "height": 454
    },
    "address": {
        "@type": "PostalAddress",
        "streetAddress": "2216 Mansion Cross Ln",
        "addressLocality": "Virginia Beach",
        "addressRegion": "VA",
        "postalCode": "23456",
        "addressCountry": "US"
    },
    "geo": {
        "@type": "GeoCoordinates",
        "latitude": 36.8529,
        "longitude": -75.9780
    },
    "openingHoursSpecification": [{
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday"],
        "opens": "07:00",
        "closes": "18:00"
    }],
    "priceRange": "$$",
    "areaServed": [
        {"@type": "City", "name": "Virginia Beach", "sameAs": "https://en.wikipedia.org/wiki/Virginia_Beach,_Virginia"},
        {"@type": "City", "name": "Norfolk", "sameAs": "https://en.wikipedia.org/wiki/Norfolk,_Virginia"},
        {"@type": "City", "name": "Chesapeake", "sameAs": "https://en.wikipedia.org/wiki/Chesapeake,_Virginia"},
        {"@type": "City", "name": "Suffolk", "sameAs": "https://en.wikipedia.org/wiki/Suffolk,_Virginia"},
        {"@type": "City", "name": "Portsmouth", "sameAs": "https://en.wikipedia.org/wiki/Portsmouth,_Virginia"},
        {"@type": "City", "name": "Newport News", "sameAs": "https://en.wikipedia.org/wiki/Newport_News,_Virginia"},
        {"@type": "City", "name": "Hampton", "sameAs": "https://en.wikipedia.org/wiki/Hampton,_Virginia"},
        {"@type": "City", "name": "Williamsburg", "sameAs": "https://en.wikipedia.org/wiki/Williamsburg,_Virginia"},
        {"@type": "City", "name": "Eastern Shore", "sameAs": "https://en.wikipedia.org/wiki/Eastern_Shore_of_Virginia"},
        {"@type": "State", "name": "Virginia"},
        {"@type": "State", "name": "North Carolina"},
        {"@type": "State", "name": "Maryland"},
        {"@type": "State", "name": "Delaware"}
    ],
    "sameAs": [
        "https://aimlocatingva.com",
        "https://maps.app.goo.gl/beachhydrovac"
    ],
    "slogan": "Map First, Dig Second",
    "foundingDate": "2024",
    "parentOrganization": {
        "@type": "Organization",
        "@id": "https://aimlocatingva.com/#organization",
        "name": "Advanced Infrastructure Mapping, LLC",
        "url": "https://aimlocatingva.com"
    }
}

lb_block = (
    "\n<!-- wp:html -->\n"
    '<script type="application/ld+json">\n' +
    json.dumps(local_business, indent=2) +
    "\n</script>\n"
    "<!-- /wp:html -->"
)

new_content = raw + lb_block
print(f"New content length: {len(new_content)}")
print(f"Has #localbusiness: {'#localbusiness' in new_content}")

# ── 3. Save and push ──────────────────────────────────────────────────
payload = json.dumps({"content": new_content})
payload_file = "C:/Users/rowel/Downloads/restore-lb-payload.json"
with open(payload_file, "w", encoding="utf-8") as f:
    f.write(payload)

print("Pushing to WordPress...")
push_res = subprocess.run([
    "curl", "-s", "-X", "POST", "-u", f"{WP_USER}:{WP_PASS}",
    "-H", "Content-Type: application/json",
    f"{WP_URL}/wp-json/wp/v2/pages/{PAGE_ID}",
    "--data-binary", f"@{payload_file}"
], capture_output=True, text=True)

result = json.loads(push_res.stdout)
if "id" in result:
    print(f"SUCCESS: Page {result['id']} updated - {result.get('modified', '')}")
else:
    print(f"ERROR: {result.get('message', push_res.stdout[:200])}")
