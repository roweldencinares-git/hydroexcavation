/**
 * BeachHydroVac — Fix All SEO Titles
 * - Switch | to -
 * - Fix Beach Hydrovac → Beach HydroVac
 * - Trim titles over 60 characters
 * - Remove double-pipe titles
 * Run: node fix-titles.js
 */
import fetch from 'node-fetch';

const WP_BASE = 'https://beachhydrovac.com/wp-json/wp/v2';
const AUTH    = 'Basic ' + Buffer.from('rdenci_16:0L9x p2O7 tdfs khVJ UFyl 1UZk').toString('base64');
const HEADERS = { Authorization: AUTH, 'Content-Type': 'application/json' };

async function getAll(type) {
    const r = await fetch(`${WP_BASE}/${type}?per_page=100&context=edit&status=publish`, { headers: HEADERS });
    return r.json();
}

const NEW_TITLES = {
    // ── Service pages ────────────────────────────────────────────────────────
    'home':                                         'Beach HydroVac - Hydro Excavation Virginia Beach VA',
    'about':                                        'About Beach HydroVac - Veteran-Owned Hydro Excavation VA',
    'contact':                                      'Contact Beach HydroVac - Free Hydro Excavation Quote',
    'faq':                                          'Hydrovac FAQ Virginia Beach - Beach HydroVac',
    'services':                                     'Hydrovac Services Virginia Beach VA - Beach HydroVac',
    'hydro-excavation':                             'Hydro Excavation Virginia Beach VA - Beach HydroVac',
    'daylighting':                                  'Daylighting Services Virginia Beach VA - Beach HydroVac',
    'potholing':                                    'Potholing Contractor Virginia Beach VA - Beach HydroVac',
    'slot-trenching':                               'Slot Trenching Virginia Beach VA - Beach HydroVac',
    'remote-excavation':                            'Remote Excavation Virginia Beach VA - Beach HydroVac',
    'sue-level-a':                                  'SUE Level A Verification Virginia - Beach HydroVac',
    'vacuum-excavation':                            'Vacuum Excavation Virginia Beach VA - Beach HydroVac',
    'vactor-truck-services':                        'Vactor Truck Services Virginia Beach VA - Beach HydroVac',
    'service-areas':                                'Hydrovac Service Areas Virginia - Beach HydroVac',
    'locations':                                    'Hydrovac Service Locations Virginia - Beach HydroVac',
    // ── Statewide pages ──────────────────────────────────────────────────────
    'hydro-excavation-contractors-virginia':        'Hydro Excavation Contractors Virginia - Beach HydroVac',
    'fiber-optic-trenching-virginia':               'Fiber Optic Trenching Virginia - Beach HydroVac',
    'emergency-hydro-excavation-virginia':          'Emergency Hydro Excavation Virginia - 24/7 Response',
    'hydro-excavation-virginia-guide':              'Hydro Excavation Virginia Guide - Beach HydroVac',
    'hydro-excavation-vs-traditional-excavation':   'Hydro Excavation vs Traditional Excavation Virginia',
    // ── Out of state ─────────────────────────────────────────────────────────
    'hydro-excavation-delaware':                    'Hydro Excavation Delaware - Beach HydroVac',
    'hydro-excavation-maryland':                    'Hydro Excavation Maryland - Beach HydroVac',
    'hydro-excavation-north-carolina':              'Hydro Excavation North Carolina - Beach HydroVac',
    // ── Hampton Roads location pages ─────────────────────────────────────────
    'virginia-beach':                               'Hydrovac Virginia Beach VA - Veteran-Owned Beach HydroVac',
    'norfolk':                                      'Hydro Excavation Norfolk VA - Beach HydroVac',
    'chesapeake':                                   'Hydrovac Chesapeake VA - Beach HydroVac',
    'hampton':                                      'Hydro Excavation Hampton VA - Beach HydroVac',
    'newport-news':                                 'Hydrovac Newport News VA - Beach HydroVac',
    'suffolk':                                      'Hydro Excavation Suffolk VA - Beach HydroVac',
    'portsmouth':                                   'Hydrovac Portsmouth VA - Beach HydroVac',
    'williamsburg':                                 'Hydrovac Williamsburg VA - Beach HydroVac',
    'eastern-shore':                                'Hydro Excavation Eastern Shore VA - Beach HydroVac',
    // ── Greater Virginia location pages ─────────────────────────────────────
    'richmond':                                     'Hydro Excavation Richmond VA - Beach HydroVac',
    'fredericksburg':                               'Hydro Excavation Fredericksburg VA - Beach HydroVac',
    'alexandria':                                   'Hydrovac Alexandria VA - Beach HydroVac',
    'arlington':                                    'Hydrovac Arlington VA - Beach HydroVac',
    'henrico':                                      'Hydro Excavation Henrico County VA - Beach HydroVac',
    'chesterfield':                                 'Hydrovac Chesterfield VA - Beach HydroVac',
    'fairfax':                                      'Hydro Excavation Fairfax VA - Beach HydroVac',
    'roanoke':                                      'Hydrovac Roanoke VA - Beach HydroVac',
    'lynchburg':                                    'Hydrovac Lynchburg VA - Beach HydroVac',
    // ── Blog posts ───────────────────────────────────────────────────────────
    'what-is-hydro-excavation':                     'What Is Hydro Excavation? Complete Guide - Beach HydroVac',
    'hydro-excavation-cost-guide-virginia-2026':    'Hydro Excavation Cost Guide Virginia 2026 - Beach HydroVac',
    'hydro-excavation-safety-best-practices':       'Hydro Excavation Safety Guide - OSHA Best Practices VA',
    'hydro-excavation-vs-traditional-excavation':   'Hydro Excavation vs Mechanical Digging - Beach HydroVac',
    'vdot-sue-requirements-contractors-guide':      'VDOT SUE Requirements 2026 - Virginia Contractor Guide',
    'sue-level-b-vs-level-a':                       'SUE Level B vs Level A - Key Differences - Beach HydroVac',
    'virginia-811-miss-utility-guide':              'Virginia 811 Miss Utility Guide - Beach HydroVac',
    'common-utility-strike-mistakes-how-to-avoid':  '5 Utility Strike Mistakes Virginia Contractors Make',
    'utility-damage-prevention-excavation-virginia':'Utility Damage Prevention During Excavation Virginia',
    'fiber-optic-installation-hydro-excavation':    'Fiber Optic Installation with Hydro Excavation Virginia',
    'veteran-owned-hydrovac-virginia':              'Veteran-Owned Hydrovac Company Virginia - Beach HydroVac',
    // ── Local service posts ──────────────────────────────────────────────────
    'vacuum-excavation-chesapeake-va':              'Vacuum Excavation Chesapeake VA - Beach HydroVac',
    'daylighting-services-hampton-va':              'Daylighting Services Hampton VA - Beach HydroVac',
    'slot-trenching-portsmouth-va':                 'Slot Trenching Portsmouth VA - Beach HydroVac',
    'non-destructive-excavation-hampton-roads':     'Non-Destructive Excavation Hampton Roads VA - Beach HydroVac',
    'hydro-excavation-eastern-shore-virginia':      'Hydro Excavation Eastern Shore VA - Beach HydroVac',
    'hydrovac-williamsburg-va':                     'Hydrovac Williamsburg VA - Beach HydroVac',
    'potholing-contractor-newport-news-va':         'Potholing Contractor Newport News VA - Beach HydroVac',
    'non-destructive-excavation-norfolk-va':        'Non-Destructive Excavation Norfolk VA - Beach HydroVac',
    'hydro-excavation-suffolk-va':                  'Hydro Excavation Suffolk VA - Beach HydroVac',
    'vacuum-excavation-virginia-beach':             'Vacuum Excavation Virginia Beach VA - Beach HydroVac',
};

async function main() {
    const [pages, posts] = await Promise.all([getAll('pages'), getAll('posts')]);
    const all = [...pages.map(p => ({...p, type:'pages'})), ...posts.map(p => ({...p, type:'posts'}))];

    let updated = 0, skipped = 0;

    for (const item of all) {
        const newTitle = NEW_TITLES[item.slug];
        if (!newTitle) { skipped++; continue; }

        const r = await fetch(`${WP_BASE}/${item.type}/${item.id}`, {
            method: 'POST', headers: HEADERS,
            body: JSON.stringify({ meta: { _yoast_wpseo_title: newTitle } })
        });

        if (r.ok) updated++;
        const len = newTitle.length;
        const sym = !r.ok ? '❌' : len <= 60 ? '✅' : '⚠️';
        console.log(`${sym} ${String(len).padStart(2)}ch  ${newTitle}`);
        await new Promise(res => setTimeout(res, 250));
    }

    console.log(`\nUpdated: ${updated} | Skipped: ${skipped}`);
}

main();
