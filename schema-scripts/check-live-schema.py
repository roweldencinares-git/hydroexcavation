import subprocess, sys, re, json
sys.stdout.reconfigure(encoding='utf-8')

# Fetch live homepage HTML
res = subprocess.run([
    "curl", "-s", "-A", "Mozilla/5.0", "https://beachhydrovac.com/"
], capture_output=True, text=True, timeout=30)

html = res.stdout
scripts = re.findall(r'<script type="application/ld\+json">(.*?)</script>', html, re.DOTALL)
print(f"Found {len(scripts)} JSON-LD script tag(s) on live homepage\n")

all_ids = {}
for i, raw in enumerate(scripts, 1):
    try:
        parsed = json.loads(raw.strip())
        print(f"=== Block {i} ===")
        if '@graph' in parsed:
            print(f"  @graph with {len(parsed['@graph'])} nodes:")
            for node in parsed['@graph']:
                ntype = node.get('@type', 'N/A')
                nid = node.get('@id', 'no @id')
                print(f"    - @type={ntype}  @id={nid}")
                if nid and nid != 'no @id':
                    if nid in all_ids:
                        print(f"      !! DUPLICATE @id detected !!")
                    else:
                        all_ids[nid] = ntype
        else:
            ntype = parsed.get('@type', 'N/A')
            nid = parsed.get('@id', 'no @id')
            print(f"  @type={ntype}  @id={nid}")
            if nid and nid != 'no @id':
                if nid in all_ids:
                    print(f"  !! DUPLICATE @id detected !!")
                else:
                    all_ids[nid] = ntype
    except Exception as e:
        print(f"Block {i}: JSON parse error - {e}")

print(f"\nTotal unique @ids registered: {len(all_ids)}")
print("\nAll registered @ids:")
for id_val, id_type in all_ids.items():
    print(f"  {id_val}  ({id_type})")
