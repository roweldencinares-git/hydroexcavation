import json, subprocess, sys, re
sys.stdout.reconfigure(encoding='utf-8')

WP_URL  = "https://beachhydrovac.com"
WP_USER = "rdenci_16"
WP_PASS = "0L9x p2O7 tdfs khVJ UFyl 1UZk"

res = subprocess.run([
    "curl", "-s", "-u", f"{WP_USER}:{WP_PASS}",
    f"{WP_URL}/wp-json/wp/v2/pages/3201?_fields=yoast_head"
], capture_output=True, text=True)

data = json.loads(res.stdout)
head_html = data.get("yoast_head", "")

print(f"yoast_head length: {len(head_html)} chars")

# Find JSON-LD scripts
scripts = re.findall(r'<script type="application/ld\+json">(.*?)</script>', head_html, re.DOTALL)
print(f"JSON-LD blocks in yoast_head: {len(scripts)}")

for i, raw in enumerate(scripts, 1):
    try:
        parsed = json.loads(raw.strip())
        if '@graph' in parsed:
            print(f"\nBlock {i}: @graph with {len(parsed['@graph'])} nodes")
            for node in parsed['@graph']:
                ntype = node.get('@type', 'N/A')
                nid = node.get('@id', 'no @id')
                has_addr = 'address' in node
                has_phone = 'telephone' in node
                has_geo = 'geo' in node
                print(f"  - {ntype} | @id={nid} | addr={has_addr} | phone={has_phone} | geo={has_geo}")
        else:
            print(f"\nBlock {i}: @type={parsed.get('@type')} @id={parsed.get('@id','N/A')}")
    except Exception as e:
        print(f"Block {i}: parse error - {e}")
