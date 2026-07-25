/* Geography + policy data for the interactive globe on the sign-in page.
   Country polygons come from Natural Earth (world-atlas, 110m) as TopoJSON;
   we convert to GeoJSON features once at module load. Features carry the
   ISO 3166-1 numeric code as `id` and the English name as `properties.name`. */
import worldTopo from "world-atlas/countries-110m.json";
import { feature } from "topojson-client";

export const COUNTRIES = feature(worldTopo, worldTopo.objects.countries).features;

/* Metric: standard weekly working hours — the threshold beyond which overtime
   applies. Where a country sets that threshold weekly we use it directly; where
   it's set daily we use (daily × 5). Deeper color = more hours.
   ⚠️ DRAFT — needs legal confirmation. Keyed by ISO 3166-1 numeric code (the
   TopoJSON `id`). Lower-confidence entries flagged in the note at the bottom. */
export const WEEKLY = {
  "004": { name: "Afghanistan", hours: 40 },
  "008": { name: "Albania", hours: 40 },
  "012": { name: "Algeria", hours: 40 },
  "024": { name: "Angola", hours: 44 },
  "031": { name: "Azerbaijan", hours: 40 },
  "032": { name: "Argentina", hours: 48 },
  "036": { name: "Australia", hours: 38 },
  "040": { name: "Austria", hours: 40 },
  "044": { name: "Bahamas", hours: 40 },
  "050": { name: "Bangladesh", hours: 48 },
  "051": { name: "Armenia", hours: 40 },
  "056": { name: "Belgium", hours: 38 },
  "064": { name: "Bhutan", hours: 48 },
  "068": { name: "Bolivia", hours: 48 },
  "070": { name: "Bosnia and Herzegovina", hours: 40 },
  "072": { name: "Botswana", hours: 48 },
  "076": { name: "Brazil", hours: 44 },
  "084": { name: "Belize", hours: 45 },
  "090": { name: "Solomon Islands", hours: 45 },
  "096": { name: "Brunei", hours: 44 },
  "100": { name: "Bulgaria", hours: 40 },
  "104": { name: "Myanmar", hours: 44 },
  "108": { name: "Burundi", hours: 40 },
  "112": { name: "Belarus", hours: 40 },
  "116": { name: "Cambodia", hours: 48 },
  "120": { name: "Cameroon", hours: 40 },
  "124": { name: "Canada", hours: 40 },
  "140": { name: "Central African Republic", hours: 40 },
  "144": { name: "Sri Lanka", hours: 45 },
  "148": { name: "Chad", hours: 39 },
  "152": { name: "Chile", hours: 44 },
  "156": { name: "China", hours: 40 },
  "158": { name: "Taiwan", hours: 40 },
  "170": { name: "Colombia", hours: 47 },
  "178": { name: "Congo (Republic)", hours: 40 },
  "180": { name: "Democratic Republic of the Congo", hours: 45 },
  "188": { name: "Costa Rica", hours: 48 },
  "191": { name: "Croatia", hours: 40 },
  "192": { name: "Cuba", hours: 44 },
  "196": { name: "Cyprus", hours: 40 },
  "203": { name: "Czechia", hours: 40 },
  "204": { name: "Benin", hours: 40 },
  "208": { name: "Denmark", hours: 37 },
  "214": { name: "Dominican Republic", hours: 44 },
  "218": { name: "Ecuador", hours: 40 },
  "222": { name: "El Salvador", hours: 44 },
  "226": { name: "Equatorial Guinea", hours: 48 },
  "231": { name: "Ethiopia", hours: 48 },
  "232": { name: "Eritrea", hours: 48 },
  "233": { name: "Estonia", hours: 40 },
  "242": { name: "Fiji", hours: 48 },
  "246": { name: "Finland", hours: 40 },
  "250": { name: "France", hours: 35 },
  "262": { name: "Djibouti", hours: 40 },
  "266": { name: "Gabon", hours: 40 },
  "268": { name: "Georgia", hours: 40 },
  "270": { name: "Gambia", hours: 40 },
  "275": { name: "Palestine", hours: 45 },
  "276": { name: "Germany", hours: 40 },
  "288": { name: "Ghana", hours: 40 },
  "300": { name: "Greece", hours: 40 },
  "304": { name: "Greenland", hours: 40 },
  "320": { name: "Guatemala", hours: 44 },
  "324": { name: "Guinea", hours: 40 },
  "328": { name: "Guyana", hours: 40 },
  "332": { name: "Haiti", hours: 48 },
  "340": { name: "Honduras", hours: 44 },
  "348": { name: "Hungary", hours: 40 },
  "352": { name: "Iceland", hours: 40 },
  "356": { name: "India", hours: 48 },
  "360": { name: "Indonesia", hours: 40 },
  "364": { name: "Iran", hours: 44 },
  "368": { name: "Iraq", hours: 48 },
  "372": { name: "Ireland", hours: 39 },
  "376": { name: "Israel", hours: 42 },
  "380": { name: "Italy", hours: 40 },
  "384": { name: "Cote d'Ivoire", hours: 40 },
  "388": { name: "Jamaica", hours: 40 },
  "392": { name: "Japan", hours: 40 },
  "398": { name: "Kazakhstan", hours: 40 },
  "400": { name: "Jordan", hours: 48 },
  "404": { name: "Kenya", hours: 45 },
  "408": { name: "North Korea", hours: 48 },
  "410": { name: "South Korea", hours: 40 },
  "414": { name: "Kuwait", hours: 48 },
  "417": { name: "Kyrgyzstan", hours: 40 },
  "418": { name: "Laos", hours: 48 },
  "422": { name: "Lebanon", hours: 48 },
  "426": { name: "Lesotho", hours: 45 },
  "428": { name: "Latvia", hours: 40 },
  "430": { name: "Liberia", hours: 48 },
  "434": { name: "Libya", hours: 48 },
  "440": { name: "Lithuania", hours: 40 },
  "442": { name: "Luxembourg", hours: 40 },
  "450": { name: "Madagascar", hours: 40 },
  "454": { name: "Malawi", hours: 48 },
  "458": { name: "Malaysia", hours: 45 },
  "466": { name: "Mali", hours: 40 },
  "478": { name: "Mauritania", hours: 40 },
  "484": { name: "Mexico", hours: 48 },
  "496": { name: "Mongolia", hours: 40 },
  "498": { name: "Moldova", hours: 40 },
  "499": { name: "Montenegro", hours: 40 },
  "504": { name: "Morocco", hours: 44 },
  "508": { name: "Mozambique", hours: 48 },
  "512": { name: "Oman", hours: 40 },
  "516": { name: "Namibia", hours: 45 },
  "524": { name: "Nepal", hours: 48 },
  "528": { name: "Netherlands", hours: 40 },
  "540": { name: "New Caledonia", hours: 39 },
  "548": { name: "Vanuatu", hours: 44 },
  "554": { name: "New Zealand", hours: 40 },
  "558": { name: "Nicaragua", hours: 48 },
  "562": { name: "Niger", hours: 40 },
  "566": { name: "Nigeria", hours: 40 },
  "578": { name: "Norway", hours: 40 },
  "586": { name: "Pakistan", hours: 48 },
  "591": { name: "Panama", hours: 48 },
  "598": { name: "Papua New Guinea", hours: 44 },
  "600": { name: "Paraguay", hours: 48 },
  "604": { name: "Peru", hours: 48 },
  "608": { name: "Philippines", hours: 48 },
  "616": { name: "Poland", hours: 40 },
  "620": { name: "Portugal", hours: 40 },
  "624": { name: "Guinea-Bissau", hours: 40 },
  "626": { name: "Timor-Leste", hours: 44 },
  "630": { name: "Puerto Rico", hours: 40 },
  "634": { name: "Qatar", hours: 48 },
  "642": { name: "Romania", hours: 40 },
  "643": { name: "Russia", hours: 40 },
  "646": { name: "Rwanda", hours: 45 },
  "682": { name: "Saudi Arabia", hours: 48 },
  "686": { name: "Senegal", hours: 40 },
  "688": { name: "Serbia", hours: 40 },
  "694": { name: "Sierra Leone", hours: 40 },
  "703": { name: "Slovakia", hours: 40 },
  "704": { name: "Vietnam", hours: 48 },
  "705": { name: "Slovenia", hours: 40 },
  "706": { name: "Somalia", hours: 48 },
  "710": { name: "South Africa", hours: 45 },
  "716": { name: "Zimbabwe", hours: 45 },
  "724": { name: "Spain", hours: 40 },
  "728": { name: "South Sudan", hours: 40 },
  "729": { name: "Sudan", hours: 48 },
  "732": { name: "Western Sahara", hours: 44 },
  "740": { name: "Suriname", hours: 40 },
  "748": { name: "eSwatini", hours: 48 },
  "752": { name: "Sweden", hours: 40 },
  "756": { name: "Switzerland", hours: 45 },
  "760": { name: "Syria", hours: 48 },
  "762": { name: "Tajikistan", hours: 40 },
  "764": { name: "Thailand", hours: 48 },
  "768": { name: "Togo", hours: 40 },
  "780": { name: "Trinidad and Tobago", hours: 40 },
  "784": { name: "United Arab Emirates", hours: 48 },
  "788": { name: "Tunisia", hours: 48 },
  "792": { name: "Turkey", hours: 45 },
  "795": { name: "Turkmenistan", hours: 40 },
  "800": { name: "Uganda", hours: 48 },
  "804": { name: "Ukraine", hours: 40 },
  "807": { name: "North Macedonia", hours: 40 },
  "818": { name: "Egypt", hours: 48 },
  "826": { name: "United Kingdom", hours: 40 },
  "834": { name: "Tanzania", hours: 45 },
  "840": { name: "United States", hours: 40 },
  "854": { name: "Burkina Faso", hours: 40 },
  "858": { name: "Uruguay", hours: 44 },
  "860": { name: "Uzbekistan", hours: 40 },
  "862": { name: "Venezuela", hours: 40 },
  "887": { name: "Yemen", hours: 48 },
  "894": { name: "Zambia", hours: 48 },
  // lower-confidence entries to double-check: 104, 148, 242, 270, 408, 478, 540,
  // 598, 624, 646, 694, 716, 728, 732, 740, 788
};

/* Hours a country's value is clamped into for the color ramp. */
export const HOURS_DOMAIN = [35, 48];

/* Land fills. */
export const LAND = "#2c3c66"; // default land — every country until it's pressed
export const NO_DATA = "#3a4a72"; // pressed country we have no hours for (lifted neutral)
export const OCEAN = ["#1b2f66", "#121e46", "#0a1330"]; // radial stops

/* Sequential ramp: fewer hours = light, more hours = deep/dark. */
const RAMP = [
  [0.0, [165, 224, 255]], // ~35h  light sky
  [0.4, [74, 163, 240]],  //       brand blue
  [0.72, [52, 85, 196]],  //       deep blue
  [1.0, [36, 27, 107]],   // ~48h  deep indigo
];

function lerp(a, b, t) {
  return Math.round(a + (b - a) * t);
}

/* Color for a weekly-hours value, following the RAMP (darker = more hours). */
export function hoursColor(hours) {
  const [lo, hi] = HOURS_DOMAIN;
  const t = Math.max(0, Math.min(1, (hours - lo) / (hi - lo)));
  for (let i = 1; i < RAMP.length; i++) {
    const [t0, c0] = RAMP[i - 1];
    const [t1, c1] = RAMP[i];
    if (t <= t1) {
      const k = (t - t0) / (t1 - t0);
      return `rgb(${lerp(c0[0], c1[0], k)}, ${lerp(c0[1], c1[1], k)}, ${lerp(c0[2], c1[2], k)})`;
    }
  }
  const last = RAMP[RAMP.length - 1][1];
  return `rgb(${last[0]}, ${last[1]}, ${last[2]})`;
}

/* Weekly-hours entry for a country id, or null when we have no data. */
export function weeklyFor(id) {
  return WEEKLY[id] || null;
}
