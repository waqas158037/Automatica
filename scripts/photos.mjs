// Real photographs used on the site.
// Key = image slot name. Value = a file in static/images/, or "pexels:<id>" for a
// Pexels photo (free for commercial use, no attribution needed: https://www.pexels.com/license/).
// To use the client's own photo instead, drop <slot>.jpg into static/images/ (it wins over this list).
export const photos = {
  // Home
  "hero-1": "engineer-installing-door-operator.jpg",
  "hero-2": "pexels:34182544",
  "hero-3": "pexels:27099093",
  "service-team": "engineer-installing-door-operator.jpg",
  "about-service": "pexels:32845660",
  "range-bg": "pexels:34054460",
  "banner-doors": "pexels:19962023",
  "banner-entrances": "pexels:5876475",
  "page-banner": "pexels:39174644",
  "support-demo": "pexels:8961146",

  // Solutions
  "solution-rfid-etag-vehicle-access-control-solution": "pexels:8696219",
  "solution-loading-bay-solution": "pexels:1267327",
  "solution-parking-management-guidance-solution": "pexels:11850871",
  "solution-perimeter-security-solutions": "pexels:19782580",
  "solution-personnel-access-control-solution": "pexels:13657444",
  "solution-visitor-identification-and-management-solution": "pexels:17155842",
  "solution-road-safety-solutions": "pexels:16769736",

  // Projects (order matches projects[] in data.mjs)
  "project-1": "pexels:36162857",
  "project-2": "pexels:12585839",
  "project-3": "pexels:40182762",
  "project-4": "pexels:8696219",
  "project-5": "pexels:38877457",
  "project-6": "pexels:32574417",
  "project-7": "pexels:20522279",
  "project-8": "pexels:27273555",
  "project-9": "pexels:34968619",
  "project-10": "pexels:11666903",
  "project-11": "pexels:11543858",
  "project-12": "pexels:33285745",

  // Products
  "product-fire-rated-doors": "pexels:29029258",
  "product-high-speed-pvc-roll-up-doors": "pexels:19574404",
  "product-automatic-road-barrier": "pexels:34182544",
  "product-hydraulic-road-blocker": "pexels:36591257",
  "product-automatic-roller-shutter": "pexels:11006312",
  "product-automatic-swing-door-system": "pexels:7638806",
  "product-dock-leveler": "pexels:1267325",
  "product-automatic-sliding-door-system": "pexels:6008847",
  "product-swing-gate-operator": "pexels:16580841.png",
  "product-wifi-sliding-gate-operator": "pexels:18143352",
  "product-panic-escape-emergency-exit-doors": "pexels:31168958",
  "product-uhf-rfid-long-range-reader": "pexels:33335255",
  "product-tripod-turnstile-gate": "pexels:35844696",
  "product-tyre-killer-road-spikes": "pexels:15515341",
  "product-under-vehicle-surveillance-system": "pexels:27765780",
  "product-walkthrough-metal-detector": "pexels:12321700",
  "product-dock-shelter-bumpers": "pexels:14868098",
  "product-safety-photocell-sensor": "pexels:1990764",
  "product-industrial-panel-pc": "pexels:34054470",
  "product-stainless-steel-doors": "pexels:19503701",

  // News
  "news-choosing-the-right-automatic-gate": "pexels:13165402",
  "news-why-fire-rated-doors-matter": "pexels:9089389",
  "news-etag-vs-cards-vehicle-access": "pexels:7824263",
  "news-loading-bay-safety-checklist": "pexels:29786116",
};

export function photoUrl(slot, width = 1600) {
  const v = photos[slot];
  if (!v) return null;
  if (!v.startsWith("pexels:")) return `/images/${v}`;
  const [id, ext = "jpeg"] = v.slice(7).split(".");
  // "#slot" lets the page fall back to the generated illustration if the photo fails to load.
  return `https://images.pexels.com/photos/${id}/pexels-photo-${id}.${ext}?auto=compress&cs=tinysrgb&w=${width}#${slot}`;
}
