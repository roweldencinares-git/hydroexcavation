import json, subprocess, sys, re
sys.stdout.reconfigure(encoding='utf-8')

WP_URL  = "https://beachhydrovac.com"
WP_USER = "rdenci_16"
WP_PASS = "0L9x p2O7 tdfs khVJ UFyl 1UZk"
PAGE_ID = 3201

# ── 1. Get current raw content ──────────────────────────────────────
res = subprocess.run([
    "curl", "-s", "-u", f"{WP_USER}:{WP_PASS}",
    f"{WP_URL}/wp-json/wp/v2/pages/{PAGE_ID}?context=edit&_fields=content"
], capture_output=True, text=True)

data = json.loads(res.stdout)
raw = data["content"]["raw"]

print("Current length:", len(raw))
print("Has #localbusiness ref:", "#localbusiness" in raw)
print("Has #organization ref:", "#organization" in raw)

# ── 2. Replace broken #localbusiness with correct #organization ref ──
# Only replace the provider @id reference, not any full @id declarations
old_ref = '"@id": "https://beachhydrovac.com/#localbusiness"'
new_ref = '"@id": "https://beachhydrovac.com/#organization"'

if old_ref not in raw:
    print("\nERROR: Could not find the #localbusiness reference to replace!")
    sys.exit(1)

new_raw = raw.replace(old_ref, new_ref)
print("\nReplaced #localbusiness -> #organization in provider ref")
print("Verify - still has #localbusiness:", "#localbusiness" in new_raw)
print("Has #organization:", "#organization" in new_raw)

# ── 3. Save payload and push ─────────────────────────────────────────
payload = json.dumps({"content": new_raw})
payload_file = "C:/Users/rowel/Downloads/fix-provider-id-payload.json"

with open(payload_file, "w", encoding="utf-8") as f:
    f.write(payload)

print("\nPushing to WordPress...")
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
        print(f"SUCCESS: Page {result['id']} updated")
        print(f"Modified: {result.get('modified', 'unknown')}")
    elif "message" in result:
        print(f"ERROR: {result['message']}")
    else:
        print(f"Response: {push_res.stdout[:300]}")
except Exception as e:
    print(f"Parse error: {e}")
    print(push_res.stdout[:300])
