import json, subprocess, sys, re
sys.stdout.reconfigure(encoding='utf-8')

WP_URL  = "https://beachhydrovac.com"
WP_USER = "rdenci_16"
WP_PASS = "0L9x p2O7 tdfs khVJ UFyl 1UZk"
PAGE_ID = 3201

res = subprocess.run([
    "curl", "-s", "-u", f"{WP_USER}:{WP_PASS}",
    f"{WP_URL}/wp-json/wp/v2/pages/{PAGE_ID}?context=edit&_fields=content"
], capture_output=True, text=True)

data = json.loads(res.stdout)
raw = data["content"]["raw"]

# Find all wp:html blocks
blocks = re.findall(r'<!-- wp:html -->(.*?)<!-- /wp:html -->', raw, re.DOTALL)
print(f"Found {len(blocks)} wp:html blocks\n")

for i, block in enumerate(blocks, 1):
    # Try to extract JSON-LD
    match = re.search(r'<script[^>]*>(.*?)</script>', block, re.DOTALL)
    if match:
        try:
            schema = json.loads(match.group(1))
            schema_type = schema.get('@type', 'unknown')
            schema_id = schema.get('@id', 'no @id')
            graph_ids = []
            if '@graph' in schema:
                graph_ids = [n.get('@id', '?') for n in schema['@graph'] if '@id' in n]
            print(f"Block {i}: @type={schema_type} @id={schema_id}")
            if graph_ids:
                print(f"  @graph nodes: {graph_ids}")
        except Exception as e:
            print(f"Block {i}: JSON parse error: {e}")
            print(f"  Content: {block[:200]}")
    else:
        print(f"Block {i}: No script tag found")
        print(f"  Content: {block[:200]}")
