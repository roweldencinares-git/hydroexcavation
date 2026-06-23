import json, subprocess, sys, re
sys.stdout.reconfigure(encoding='utf-8')

WP_URL  = "https://beachhydrovac.com"
WP_USER = "rdenci_16"
WP_PASS = "0L9x p2O7 tdfs khVJ UFyl 1UZk"
PAGE_ID = 3454

res = subprocess.run([
    "curl", "-s", "-u", f"{WP_USER}:{WP_PASS}",
    f"{WP_URL}/wp-json/wp/v2/pages/{PAGE_ID}?context=edit&_fields=content"
], capture_output=True, text=True)

data = json.loads(res.stdout)
raw = data["content"]["raw"]

# Extract Q&A pairs from <details>/<summary> blocks
# Pattern: <details...><summary><strong>QUESTION</strong></summary><p...>ANSWER</p></details>
pairs = re.findall(
    r'<details[^>]*>.*?<summary><strong>(.*?)</strong></summary>\s*<p[^>]*>(.*?)</p>',
    raw, re.DOTALL
)

print(f"Found {len(pairs)} Q&A pairs:\n")
for i, (q, a) in enumerate(pairs, 1):
    # Clean HTML tags from answer
    a_clean = re.sub(r'<[^>]+>', '', a).strip()
    print(f"Q{i}: {q}")
    print(f"A{i}: {a_clean[:150]}...")
    print()
