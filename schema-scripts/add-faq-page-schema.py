import json, subprocess, sys, re
sys.stdout.reconfigure(encoding='utf-8')

WP_URL  = "https://beachhydrovac.com"
WP_USER = "rdenci_16"
WP_PASS = "0L9x p2O7 tdfs khVJ UFyl 1UZk"
PAGE_ID = 3454

# ── 1. Get current raw content ────────────────────────────────────────
res = subprocess.run([
    "curl", "-s", "-u", f"{WP_USER}:{WP_PASS}",
    f"{WP_URL}/wp-json/wp/v2/pages/{PAGE_ID}?context=edit&_fields=content"
], capture_output=True, text=True)

data = json.loads(res.stdout)
raw = data["content"]["raw"]

print("Current length:", len(raw))
print("Has FAQPage:", "FAQPage" in raw)

# Check if already has FAQPage schema
if "FAQPage" in raw:
    print("FAQPage schema already present! Skipping.")
    sys.exit(0)

# ── 2. Extract full Q&A pairs from <details>/<summary> blocks ────────
pairs = re.findall(
    r'<details[^>]*>.*?<summary><strong>(.*?)</strong></summary>\s*<p[^>]*>(.*?)</p>',
    raw, re.DOTALL
)
print(f"\nExtracted {len(pairs)} Q&A pairs")

def strip_tags(html):
    return re.sub(r'<[^>]+>', '', html).strip()

# ── 3. Build FAQPage schema ────────────────────────────────────────────
faq_schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": "https://beachhydrovac.com/faq/#faqpage",
    "url": "https://beachhydrovac.com/faq/",
    "mainEntity": [
        {
            "@type": "Question",
            "name": strip_tags(q),
            "acceptedAnswer": {
                "@type": "Answer",
                "text": strip_tags(a)
            }
        }
        for q, a in pairs
    ]
}

print(f"FAQPage schema with {len(faq_schema['mainEntity'])} questions")
for i, q in enumerate(faq_schema['mainEntity'], 1):
    print(f"  Q{i}: {q['name'][:70]}")

# ── 4. Append as wp:html block ─────────────────────────────────────────
faq_block = (
    "\n<!-- wp:html -->\n"
    '<script type="application/ld+json">\n' +
    json.dumps(faq_schema, indent=2) +
    "\n</script>\n"
    "<!-- /wp:html -->"
)

new_content = raw + faq_block
print(f"\nNew content length: {len(new_content)}")

# ── 5. Save and push ───────────────────────────────────────────────────
payload = json.dumps({"content": new_content})
payload_file = "C:/Users/rowel/Downloads/faq-page-schema-payload.json"

with open(payload_file, "w", encoding="utf-8") as f:
    f.write(payload)

print("Pushing to WordPress...")
push_res = subprocess.run([
    "curl", "-s", "-X", "POST",
    "-u", f"{WP_USER}:{WP_PASS}",
    "-H", "Content-Type: application/json",
    f"{WP_URL}/wp-json/wp/v2/pages/{PAGE_ID}",
    "--data-binary", f"@{payload_file}"
], capture_output=True, text=True)

try:
    result = json.loads(push_res.stdout)
    if "id" in result:
        print(f"SUCCESS: Page {result['id']} updated - {result.get('modified', '')}")
    elif "message" in result:
        print(f"ERROR: {result['message']}")
    else:
        print(f"Response: {push_res.stdout[:300]}")
except Exception as e:
    print(f"Parse error: {e}\n{push_res.stdout[:300]}")
