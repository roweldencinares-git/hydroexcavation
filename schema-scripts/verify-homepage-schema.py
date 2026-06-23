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

# Find all wp:html blocks and print their JSON-LD
blocks = re.findall(r'<!-- wp:html -->(.*?)<!-- /wp:html -->', raw, re.DOTALL)
print(f"Total wp:html blocks: {len(blocks)}\n")

for i, block in enumerate(blocks, 1):
    match = re.search(r'<script[^>]*>(.*?)</script>', block, re.DOTALL)
    if match:
        try:
            schema = json.loads(match.group(1))
            print(f"=== Block {i} ===")
            print(f"  @type:    {schema.get('@type', 'N/A')}")
            print(f"  @id:      {schema.get('@id', 'N/A')}")
            if 'provider' in schema:
                print(f"  provider: {schema['provider']}")
            if '@graph' in schema:
                for node in schema['@graph']:
                    print(f"  graph node: @type={node.get('@type')} @id={node.get('@id','none')}")
        except Exception as e:
            print(f"Block {i}: parse error - {e}")

print("\n--- Checking for broken refs ---")
print("Has #localbusiness:", "#localbusiness" in raw)
print("Has #organization:",  "#organization" in raw)
print("Has #hydro-excavation-service:", "#hydro-excavation-service" in raw)
