import subprocess, sys, re, json
sys.stdout.reconfigure(encoding='utf-8')

res = subprocess.run([
    "curl", "-s", "-A", "Mozilla/5.0", "https://beachhydrovac.com/"
], capture_output=True, text=True, timeout=30)

html = res.stdout
scripts = re.findall(r'<script type="application/ld\+json">(.*?)</script>', html, re.DOTALL)

for i, raw in enumerate(scripts, 1):
    try:
        parsed = json.loads(raw.strip())
        if '@graph' in parsed:
            print(f"=== Yoast @graph (Block {i}) ===")
            print(json.dumps(parsed, indent=2))
    except Exception as e:
        print(f"Block {i} parse error: {e}")
