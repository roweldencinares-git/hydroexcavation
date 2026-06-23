import json, subprocess, sys, re
sys.stdout.reconfigure(encoding='utf-8')

WP_URL  = "https://beachhydrovac.com"
WP_USER = "rdenci_16"
WP_PASS = "0L9x p2O7 tdfs khVJ UFyl 1UZk"

# Test with context=edit
res = subprocess.run([
    "curl", "-s", "-u", f"{WP_USER}:{WP_PASS}",
    f"{WP_URL}/wp-json/wp/v2/pages/3201?_fields=content&context=edit"
], capture_output=True, text=True)

data = json.loads(res.stdout)
raw = data.get("content", {}).get("raw", "")
print(f"content.raw length: {len(raw)}")

# Find wp:html blocks
blocks = re.findall(r'<!-- wp:html -->([\s\S]*?)<!-- /wp:html -->', raw)
print(f"wp:html blocks: {len(blocks)}")

for i, blk in enumerate(blocks, 1):
    sm = re.search(r'<script[^>]*>([\s\S]*?)</script>', blk)
    if sm:
        try:
            s = json.loads(sm.group(1))
            print(f"  Block {i}: @type={s.get('@type')}  @id={s.get('@id','N/A')}")
        except: pass
