import json, subprocess, sys

# ── Credentials ──────────────────────────────────────────────
WP_URL  = "https://beachhydrovac.com"
WP_USER = "rdenci_16"
WP_PASS = "0L9x p2O7 tdfs khVJ UFyl 1UZk"
PAGE_ID = 3201

# ── 1. Get current raw content ────────────────────────────────
res = subprocess.run([
    "curl", "-s", "-u", f"{WP_USER}:{WP_PASS}",
    f"{WP_URL}/wp-json/wp/v2/pages/{PAGE_ID}?context=edit&_fields=content"
], capture_output=True, text=True)

data = json.loads(res.stdout)
raw = data["content"]["raw"]

print("Current length:", len(raw))
print("Has LocalBusiness:", "LocalBusiness" in raw)

# ── 2. Build LocalBusiness schema ─────────────────────────────
local_business = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "GeneralContractor"],
    "@id": "https://beachhydrovac.com/#localbusiness",
    "name": "Beach HydroVac",
    "legalName": "Beach HydroVac — An AIM Company",
    "url": "https://beachhydrovac.com/",
    "telephone": "+1-757-510-5220",
    "email": "johne@beachhydrovac.com",
    "description": "Virginia's veteran-owned hydro excavation company. Specializing in potholing, daylighting, slot trenching, SUE Level A verification, and remote excavation. Serving Hampton Roads, Richmond, and surrounding Virginia.",
    "image": "https://beachhydrovac.com/wp-content/uploads/2026/01/cropped-Add-a-heading-1.png",
    "logo": {
        "@type": "ImageObject",
        "url": "https://beachhydrovac.com/wp-content/uploads/2026/01/cropped-Add-a-heading-1.png",
        "width": 500,
        "height": 454
    },
    "address": {
        "@type": "PostalAddress",
        "streetAddress": "Virginia Beach",
        "addressLocality": "Virginia Beach",
        "addressRegion": "VA",
        "postalCode": "23456",
        "addressCountry": "US"
    },
    "geo": {
        "@type": "GeoCoordinates",
        "latitude": 36.8529,
        "longitude": -75.9780
    },
    "openingHoursSpecification": [
        {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            "opens": "07:00",
            "closes": "18:00"
        }
    ],
    "priceRange": "$$",
    "currenciesAccepted": "USD",
    "paymentAccepted": "Cash, Check, Invoice",
    "areaServed": [
        {"@type": "City", "name": "Virginia Beach", "containedInPlace": {"@type": "State", "name": "Virginia"}},
        {"@type": "City", "name": "Norfolk", "containedInPlace": {"@type": "State", "name": "Virginia"}},
        {"@type": "City", "name": "Chesapeake", "containedInPlace": {"@type": "State", "name": "Virginia"}},
        {"@type": "City", "name": "Hampton", "containedInPlace": {"@type": "State", "name": "Virginia"}},
        {"@type": "City", "name": "Newport News", "containedInPlace": {"@type": "State", "name": "Virginia"}},
        {"@type": "City", "name": "Suffolk", "containedInPlace": {"@type": "State", "name": "Virginia"}},
        {"@type": "City", "name": "Portsmouth", "containedInPlace": {"@type": "State", "name": "Virginia"}},
        {"@type": "City", "name": "Richmond", "containedInPlace": {"@type": "State", "name": "Virginia"}},
        {"@type": "State", "name": "Virginia"},
        {"@type": "State", "name": "North Carolina"},
        {"@type": "State", "name": "Maryland"},
        {"@type": "State", "name": "Delaware"}
    ],
    "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Hydro Excavation Services",
        "itemListElement": [
            {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Hydro Excavation", "description": "High-pressure water and vacuum excavation for safe utility exposure."}},
            {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Potholing & Daylighting", "description": "Exposing underground utilities using pressurized water to prevent utility strikes."}},
            {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Slot Trenching", "description": "Precision narrow trenching for cables, pipes, and conduit installation."}},
            {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "SUE Level A Verification", "description": "Subsurface Utility Engineering Level A — exact depth and position of underground utilities."}},
            {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Remote Excavation", "description": "Hydrovac excavation in hard-to-reach locations using mechanical boom extensions."}}
        ]
    },
    "knowsAbout": ["Hydro Excavation", "Vacuum Excavation", "Potholing", "Daylighting", "SUE Level A", "Slot Trenching", "Underground Utility Locating"],
    "slogan": "Map First, Dig Second",
    "foundingDate": "2024",
    "founders": [{"@type": "Person", "name": "Beach HydroVac Owner", "description": "U.S. Military Veteran"}],
    "parentOrganization": {
        "@type": "Organization",
        "name": "Advanced Infrastructure Mapping, LLC",
        "alternateName": "AIM Locating"
    }
}

# ── 3. Build Service schema (standalone, for rich results) ────
service_schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": "https://beachhydrovac.com/#hydro-excavation-service",
    "name": "Hydro Excavation Services Virginia",
    "serviceType": "Hydro Excavation",
    "description": "Professional hydro excavation services including potholing, daylighting, slot trenching, SUE Level A verification, and remote excavation. Serving Virginia Beach, Hampton Roads, Richmond VA.",
    "provider": {
        "@id": "https://beachhydrovac.com/#localbusiness"
    },
    "areaServed": [
        {"@type": "State", "name": "Virginia"},
        {"@type": "City", "name": "Virginia Beach"},
        {"@type": "City", "name": "Norfolk"},
        {"@type": "City", "name": "Chesapeake"},
        {"@type": "City", "name": "Hampton Roads"}
    ],
    "url": "https://beachhydrovac.com/",
    "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Hydro Excavation Services",
        "itemListElement": [
            {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Potholing & Daylighting", "url": "https://beachhydrovac.com/potholing/"}},
            {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Slot Trenching", "url": "https://beachhydrovac.com/slot-trenching/"}},
            {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "SUE Level A Verification", "url": "https://beachhydrovac.com/sue-level-a/"}},
            {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Remote Excavation", "url": "https://beachhydrovac.com/remote-excavation/"}}
        ]
    }
}

# ── 4. Append as wp:html blocks ───────────────────────────────
lb_block = (
    "\n<!-- wp:html -->\n"
    '<script type="application/ld+json">\n' +
    json.dumps(local_business, indent=2) +
    "\n</script>\n"
    "<!-- /wp:html -->"
)

svc_block = (
    "\n<!-- wp:html -->\n"
    '<script type="application/ld+json">\n' +
    json.dumps(service_schema, indent=2) +
    "\n</script>\n"
    "<!-- /wp:html -->"
)

new_content = raw + lb_block + svc_block

print("New content length:", len(new_content))
print("Has LocalBusiness:", "LocalBusiness" in new_content)
print("Has Service schema:", '"@type": "Service"' in new_content)

# ── 5. Push update to WordPress ───────────────────────────────
payload = json.dumps({"content": new_content})

with open("C:/Users/rowel/Downloads/bhv-schema-payload.json", "w") as f:
    f.write(payload)

print("Payload saved. Ready to push.")
