import json, subprocess, sys
sys.stdout.reconfigure(encoding='utf-8')

WP_URL  = "https://beachhydrovac.com"
WP_USER = "rdenci_16"
WP_PASS = "0L9x p2O7 tdfs khVJ UFyl 1UZk"

res = subprocess.run([
    "curl", "-s", "-u", f"{WP_USER}:{WP_PASS}",
    f"{WP_URL}/wp-json/wp/v2/pages/3201?_fields=yoast_head"
], capture_output=True, text=True)

data = json.loads(res.stdout)
head = data.get("yoast_head", "")
# Print first 1000 chars to see the structure
print(repr(head[:1500]))
