# BeachHydrovac — Project Baseline & Connection Map
Last updated: 2026-03-20

---

## 🌐 Live Sites

| Site | URL | Purpose |
|------|-----|---------|
| Main website | https://beachhydrovac.com | WordPress (Kadence + child theme) |
| SEO dashboard | https://seo.beachhydrovac.com/dashboard | GSC data, keyword rankings, audits |

---

## 🔑 GSC Connection

**Working auth:** OAuth token stored in the **Vercel deployment** of `seo.beachhydrovac.com`
**GSC property:** `https://beachhydrovac.com/` (URL property, NOT sc-domain)
**Permission level:** siteOwner

**How to get live data:**
```bash
# Via the live API (always works when token is valid)
curl "https://seo.beachhydrovac.com/api/gsc/keywords?limit=50&days=28&site=https://beachhydrovac.com/"
curl "https://seo.beachhydrovac.com/api/gsc/pages?limit=20&days=28&site=https://beachhydrovac.com/"
curl "https://seo.beachhydrovac.com/api/gsc/status"
```

**If token expires:** Go to https://seo.beachhydrovac.com/auth/google and sign in with the beachhydrovac.com Google account.

**What does NOT work locally:**
- `check-gsc-rankings.js` → service account not added to beachhydrovac.com GSC
- `gsc-rankings-api.js` → Supabase OAuth token belongs to spearity.com account, not beachhydrovac.com
- `scrape-rankings.js` → Startpage.com rate-limits after ~4 keywords

---

## 📊 GSC Baseline — 2026-03-20 (Last 28 days)

### Overall
| Metric | Value |
|--------|-------|
| Total Clicks | 21 |
| Total Impressions | 761 |
| Top Pages | 14 |
| Keywords tracked | 50+ |

### Top Pages by Impressions
| Page | Clicks | Impressions | Position | Notes |
|------|--------|-------------|----------|-------|
| `/` (homepage) | 17 | 438 | 14.6 | Most traffic |
| `/virginia-811-miss-utility-guide/` | 1 | 205 | 10.0 | ⚡ Quick win — push to top 5 |
| `/hydro-excavation-virginia-guide/` | 0 | 27 | 20.4 | Page 2 — needs links |
| `/non-destructive-excavation-norfolk-va/` | 0 | 23 | 14.3 | Page 2 |
| `/locations/` | 1 | 7 | 5.3 | |

### Top Keywords (position ≤ 10)
| Keyword | Position | Clicks | Impressions |
|---------|----------|--------|-------------|
| hydro excavation companies near me | 1.0 | 0 | 3 |
| hydro excavation service | 1.0 | 0 | 1 |
| hydrovac near me | 1.0 | 0 | 1 |
| hydrovac service | 4.0 | 1 | 1 |
| hydro excavation near me | 4.0 | 0 | 3 |
| hydro excavation north hampton | 4.0 | 0 | 5 |
| beach hydrovac (brand) | 8.2 | 4 | 15 |
| virginia-811-miss-utility-guide | 10.0 | 1 | 205 |

### Page 2 Quick Wins (positions 11–20)
| Keyword | Position | Impressions |
|---------|----------|-------------|
| hydro excavation services near me | 11.0 | 1 |
| hydrovac services | 11.0 | 4 |
| vacuum excavation companies | 11.3 | 3 |
| vacuum excavation contractors | 12.3 | 6 |
| vacuum excavation services | 13.5 | 8 |

---

## 📁 Local Repo Structure

```
beachhydrovac-website/          ← WordPress deployment scripts
  kadence-child-theme/          ← Child theme (functions.php + style.css)
  wordpress-pages/              ← 9 new keyword-targeted pages (deployed 2026-03-19)
  deploy-pages.js               ← Deploys .txt pages via WP REST API

marketing-seo/                  ← SEO tooling
  scrape-rankings.js            ← Startpage SERP scraper (local use)
  check-gsc-rankings.js         ← Service account GSC (needs manual GSC setup)
  gsc-rankings-api.js           ← OAuth GSC (spearity.com only — won't work for BHV)

seo-repo-temp/                  ← Source code for seo.beachhydrovac.com
  server.js                     ← Main Express server
  public/                       ← Frontend HTML pages
  lib/services/gsc-service.js   ← GSC API queries
```

---

## 🚀 9 New Pages Deployed (2026-03-19)

Pages deployed via WordPress REST API — awaiting Google indexing (7–14 days):

| Slug | Target Keyword |
|------|---------------|
| `/hydro-excavation-north-carolina/` | hydro excavation North Carolina |
| `/hydro-excavation-maryland/` | hydro excavation Maryland |
| `/hydro-excavation-delaware/` | hydro excavation Delaware |
| `/emergency-hydro-excavation-virginia/` | emergency hydro excavation Virginia |
| `/fiber-optic-trenching-virginia/` | fiber optic trenching Virginia |
| `/hydro-excavation-contractors-virginia/` | hydrovac subcontractor Virginia |
| `/sue-level-b-vs-level-a/` | SUE Level B vs Level A |
| `/veteran-owned-hydrovac-virginia/` | veteran owned hydrovac Virginia |
| `/utility-damage-prevention-excavation-virginia/` | utility damage prevention Virginia |

---

## ⚡ Biggest SEO Opportunities Right Now

1. **`/virginia-811-miss-utility-guide/`** — 205 impressions, position 10.0
   → Add internal links from homepage + expand content → push to top 5

2. **Homepage** — position 14.6, 438 impressions
   → Need more Virginia Beach geo-specific content and backlinks

3. **9 new pages** — wait for indexing, then monitor in GSC

4. **Brand query "beach hydrovac"** — position 8.2
   → Should be #1. Add exact-match brand mention more prominently

---

## 🔧 WordPress Credentials
- WP REST API: uses `BEACH_HYDROVAC_WP_USER` + `BEACH_HYDROVAC_WP_PASSWORD` from `.env`
- Child theme deployed at: `/wp-content/themes/beachhydrovac-child/`

---

## 📌 Do NOT confuse with Spearity
- `marketing-seo/gsc-rankings-api.js` — the Supabase OAuth token is for **spearity.com**, NOT beachhydrovac.com
- `seo-repo-temp` (deployed as seo-repo-temp.vercel.app) — token expired, different from seo.beachhydrovac.com
- `seo.beachhydrovac.com` is the correct live dashboard with working beachhydrovac.com GSC auth
