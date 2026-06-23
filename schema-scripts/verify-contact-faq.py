import json, subprocess, sys, re
sys.stdout.reconfigure(encoding='utf-8')

WP_URL  = "https://beachhydrovac.com"
WP_USER = "rdenci_16"
WP_PASS = "0L9x p2O7 tdfs khVJ UFyl 1UZk"

# Check contact (3434) and faq (3454) pages
for page_id, name in [(3434, "Contact"), (3454, "FAQ")]:
    res = subprocess.run([
        "curl", "-s", "-u", f"{WP_USER}:{WP_PASS}",
        f"{WP_URL}/wp-json/wp/v2/pages/{page_id}?context=edit&_fields=content"
    ], capture_output=True, text=True)

    data = json.loads(res.stdout)
    raw = data["content"]["raw"]

    blocks = re.findall(r'<!-- wp:html -->(.*?)<!-- /wp:html -->', raw, re.DOTALL)
    has_faq = "FAQPage" in raw
    has_lb = "LocalBusiness" in raw

    print(f"=== {name} (ID {page_id}) ===")
    print(f"  wp:html blocks: {len(blocks)}")
    print(f"  Has FAQPage: {has_faq}")
    print(f"  Has LocalBusiness: {has_lb}")

    for i, block in enumerate(blocks, 1):
        match = re.search(r'<script[^>]*>(.*?)</script>', block, re.DOTALL)
        if match:
            try:
                schema = json.loads(match.group(1))
                q_count = len(schema.get('mainEntity', []))
                print(f"  Block {i}: @type={schema.get('@type')}  @id={schema.get('@id','N/A')}  questions={q_count if q_count else 'N/A'}")
            except:
                pass
    print()
