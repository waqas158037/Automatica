// Static site generator for Automatica. No dependencies: `node scripts/build.mjs`
// Writes the complete site to /public (served by Vercel).
import { mkdirSync, writeFileSync, cpSync, rmSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { site, usp, categories, products, solutions, projects, brands, menu, news } from "./data.mjs";
import { icon, stars } from "./icons.mjs";
import { productSvg, sceneSvg, logoSvg } from "./illustrations.mjs";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const OUT = join(ROOT, "public");
if (existsSync(OUT)) rmSync(OUT, { recursive: true });
mkdirSync(OUT, { recursive: true });
cpSync(join(ROOT, "assets"), join(OUT, "assets"), { recursive: true });
if (existsSync(join(ROOT, "static"))) cpSync(join(ROOT, "static"), OUT, { recursive: true });

const write = (path, html) => {
  const file = join(OUT, path);
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, html);
};

/* ---------------- Images (generated placeholders) ---------------- */
// If a real photo exists in /static/images/<name>.jpg it is used instead (see README).
const realImg = (name) => existsSync(join(ROOT, "static", "images", name + ".jpg")) ? `/images/${name}.jpg` : null;
const img = {
  product(p) { const n = `product-${p.slug}`; if (realImg(n)) return realImg(n); write(`images/${n}.svg`, productSvg(p.art, p.name)); return `/images/${n}.svg`; },
  scene(name, art, label, w, h, align) { if (realImg(name)) return realImg(name); write(`images/${name}.svg`, sceneSvg(art, label, w, h, align)); return `/images/${name}.svg`; },
  logo(name, text) { if (realImg(name)) return realImg(name); write(`images/${name}.svg`, logoSvg(text)); return `/images/${name}.svg`; },
};

const catName = (slug) => categories.find((c) => c.slug === slug)?.name || "";
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/* ---------------- Partials ---------------- */
const logo = (white = false) => `<a class="logo" href="/" aria-label="${site.name} home"><img src="/${white ? "logo-white" : "logo-navy"}.png" alt="${site.name}" width="1026" height="312"></a>`;

function topbar() {
  return `<div class="topbar"><div class="container">
  <ul class="topbar-usp">${usp.map((u, i) => `<li>${icon(["headset", "award", "star"][i])}${u}</li>`).join("")}</ul>
  <div class="topbar-right">
    <nav class="topbar-links"><a href="/support/">Services</a><a href="/faqs/">FAQs</a><a href="/company/careers/">Careers</a><a href="/contact-us/">Affiliate</a></nav>
    <div class="topbar-social">${["facebook", "youtube", "linkedin", "instagram"].map((s) => `<a href="${site.social[s]}" aria-label="${s}">${icon(s)}</a>`).join("")}</div>
  </div></div></div>`;
}

function megaMenu() {
  return `<div class="mega">${categories.slice(0, 9).map((c) => `<div><h6>${c.name}</h6>${c.subs.slice(0, 5).map((s) => `<a href="/products/?category=${c.slug}">${s}</a>`).join("")}</div>`).join("")}</div>`;
}

function header(active) {
  const nav = menu.map((m) => {
    const kids = m.children ? m.children() : null;
    const isActive = active === m.href || (m.href !== "/" && active.startsWith(m.href));
    return `<li class="${isActive ? "active" : ""}"><a href="${m.href}">${m.label}${kids || m.mega ? icon("chev", "chev") : ""}</a>${
      m.mega ? megaMenu() : kids ? `<div class="dropdown">${kids.map((k) => `<a href="${k.href}">${k.label}</a>`).join("")}</div>` : ""}</li>`;
  }).join("");
  return `<header class="site-header">
${topbar()}
<div class="header-main"><div class="container">
  <button class="menu-toggle" data-open-menu aria-label="Open menu">${icon("menu")}</button>
  ${logo()}
  <form class="header-search" action="/products/" role="search">
    <select name="category" aria-label="Category"><option value="">All Categories</option>${categories.map((c) => `<option value="${c.slug}">${c.name}</option>`).join("")}</select>
    <input type="search" name="q" placeholder="Search for products..." data-hints="automatic gates|road barriers|fire rated doors|dock levelers|turnstile gates|RFID readers" aria-label="Search products">
    <button type="submit">${icon("search")}<span class="sr-only">Search</span></button>
  </form>
  <div class="header-actions">
    <div class="header-contact"><span class="ic">${icon("phone")}</span><div><small>Call us 24/7</small><strong><a href="tel:${site.phoneHref}">${site.phone}</a></strong></div></div>
    <a class="hicon" href="/contact-us/" aria-label="Sign in">${icon("user")}<span class="lbl">Sign In</span></a>
    <a class="hicon" href="/get-a-quote/" aria-label="Wishlist">${icon("heart")}<span class="lbl">Wishlist</span></a>
    <a class="hicon" href="/get-a-quote/" aria-label="Quotation list">${icon("file")}<span class="count quote-count">0</span><span class="lbl">Quote</span></a>
  </div>
</div></div>
<div class="header-spacer"></div>
<nav class="header-nav" aria-label="Main"><div class="container">
  <div class="cat-menu">
    <button class="cat-btn">${icon("grid")}Browse Categories${icon("chev", "chev")}</button>
    <ul class="cat-list">${categories.map((c) => `<li><a href="/products/?category=${c.slug}">${icon(c.icon)}${c.name}${icon("chevR", "chev")}</a><div class="sub">${c.subs.map((s) => `<a href="/products/?category=${c.slug}">${s}</a>`).join("")}</div></li>`).join("")}</ul>
  </div>
  <ul class="main-menu">${nav}</ul>
  <div class="nav-right"><a href="mailto:${site.email}">${icon("mail")}${site.email}</a></div>
</div></nav>
</header>`;
}

function offcanvas() {
  const items = menu.map((m) => {
    const kids = m.mega ? categories.map((c) => ({ label: c.name, href: `/products/?category=${c.slug}` })) : m.children ? m.children() : null;
    if (!kids) return `<li><a href="${m.href}">${m.label}</a></li>`;
    return `<li><div class="oc-row"><a href="${m.href}">${m.label}</a><button aria-expanded="false" aria-label="Expand ${m.label}">${icon("chev")}</button></div><div class="oc-sub">${kids.map((k) => `<a href="${k.href}">${k.label}</a>`).join("")}</div></li>`;
  }).join("");
  return `<div class="offcanvas" aria-hidden="true"><div class="offcanvas-backdrop"></div><aside class="offcanvas-panel">
  <div class="oc-head">${logo()}<button class="oc-close" aria-label="Close menu">${icon("x")}</button></div>
  <div class="oc-tabs"><button class="active" data-pane="oc-menu">Menu</button><button data-pane="oc-cats">Categories</button></div>
  <ul class="oc-pane active" id="oc-menu">${items}<li><a href="/get-a-quote/">Quotation List</a></li><li><a href="/faqs/">FAQs</a></li></ul>
  <ul class="oc-pane" id="oc-cats">${categories.map((c) => `<li><a href="/products/?category=${c.slug}">${c.name}</a></li>`).join("")}</ul>
  <div class="oc-contact"><p><strong>Need help?</strong></p><p><a href="tel:${site.phoneHref}">${site.phone}</a></p><p><a href="mailto:${site.email}">${site.email}</a></p><p>${site.city}</p></div>
</aside></div>`;
}

function footer() {
  return `<section class="newsletter"><div class="container">
  <div><h3>Subscribe to our Newsletter</h3><p>Get updated about our latest products, offers and projects.</p></div>
  <form class="nl-form" data-mailto="${site.email}" data-subject="Newsletter subscription"><input type="email" name="email" required placeholder="Your email address" aria-label="Email"><button type="submit">Subscribe</button></form>
</div></section>
<footer class="footer">
  <div class="container footer-top">
    <div class="footer-about">${logo(true)}<p>A company constantly on the move, with a vision for the future. Automatica delivers automation, security, access control and industrial solutions across Pakistan.</p>
      <div class="social">${["facebook", "youtube", "linkedin", "instagram"].map((s) => `<a href="${site.social[s]}" aria-label="${s}">${icon(s)}</a>`).join("")}</div></div>
    <div><h5>Quick Links</h5><ul class="footer-links"><li><a href="/">Home</a></li><li><a href="/products/">Products</a></li><li><a href="/solutions/">Solutions</a></li><li><a href="/projects/">Projects</a></li><li><a href="/get-a-quote/">Get a Quote</a></li></ul></div>
    <div><h5>Top Categories</h5><ul class="footer-links"><li><a href="/products/?category=automatic-entry-systems">Automatic Entrances</a></li><li><a href="/products/?category=industrial-doors">Industrial Doors</a></li><li><a href="/products/?category=physical-security-equipment">Physical Security</a></li><li><a href="/products/?category=loading-bay-equipment">Dock Levelers</a></li><li><a href="/products/?category=access-control-systems">Vehicle Access Management</a></li></ul></div>
    <div><h5>About Us</h5><ul class="footer-links"><li><a href="/company/about-us/">Who We Are</a></li><li><a href="/company/company-history/">Company History</a></li><li><a href="/faqs/">FAQs</a></li><li><a href="/support/">Support</a></li><li><a href="/contact-us/">Contact Us</a></li></ul></div>
    <div><h5>Quick Connect</h5><ul class="footer-contact">
      <li>${icon("phone")}<div><strong>Phone</strong><a href="tel:${site.phoneHref}">${site.phone}</a></div></li>
      <li>${icon("mail")}<div><strong>Email</strong><a href="mailto:${site.email}">${site.email}</a></div></li>
      <li>${icon("pin")}<div><strong>Head Office</strong>${site.address}</div></li>
      <li>${icon("clock")}<div><strong>Hours</strong>${site.hours}</div></li></ul></div>
  </div>
  <div class="footer-bottom"><div class="container"><span>Copyright © <span class="yr-now">2026</span> ${site.name}. All rights reserved.</span><div class="pay"><span>VISA</span><span>MASTERCARD</span><span>BANK TRANSFER</span><span>COD</span></div></div></div>
</footer>
<nav class="mobile-bar" aria-label="Mobile toolbar"><ul>
  <li><a href="/">${icon("home")}Home</a></li><li><a href="/products/">${icon("grid")}Products</a></li>
  <li><a href="/get-a-quote/">${icon("file")}Quote</a></li><li><a href="#" data-open-menu>${icon("menu")}Menu</a></li></ul></nav>
<a class="wa-float" href="https://wa.me/${site.whatsapp}" target="_blank" rel="noopener" aria-label="Chat on WhatsApp">${icon("whatsapp")}</a>
<button class="to-top" aria-label="Back to top">${icon("arrowU")}</button>
<div class="toast" role="status">${icon("check")}<span class="toast-msg"></span></div>`;
}

function layout({ title, desc = site.description, path, body }) {
  const full = title ? `${title} | ${site.name}` : `${site.name} :: Automatic Doors, Gates, Access Control & Security Systems in Lahore`;
  return `<!doctype html>
<html lang="en"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(full)}</title>
<meta name="description" content="${esc(desc)}">
<meta property="og:title" content="${esc(full)}"><meta property="og:description" content="${esc(desc)}"><meta property="og:type" content="website">
<meta name="theme-color" content="#0b2a4a">
<link rel="icon" href="/favicon.png" type="image/png"><link rel="apple-touch-icon" href="/apple-touch-icon.png">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Poppins:wght@500;600;700;800&display=swap" rel="stylesheet">
<link rel="stylesheet" href="/assets/css/style.css">
</head><body>
${header(path)}
${offcanvas()}
<main id="main">${body}</main>
${footer()}
<script src="/assets/js/main.js" defer></script>
</body></html>`;
}

const pageHero = (title, crumbs, bg = "page-banner") => {
  const src = img.scene(bg, "factory", title, 1600, 500, "right");
  return `<section class="page-hero" style="background-image:url('${src}')"><div class="container"><h1>${title}</h1>
  <nav class="crumbs" aria-label="Breadcrumb"><a href="/">Home</a>${crumbs.map((c, i) => i === crumbs.length - 1 ? `<span>/</span><span>${c[0]}</span>` : `<span>/</span><a href="${c[1]}">${c[0]}</a>`).join("")}</nav></div></section>`;
};

const productCard = (p, i = 0) => `<article class="product reveal fade-up" data-delay="${(i % 4) * 90}" data-tags="${p.tags} ${p.cat}" data-name="${esc(p.name.toLowerCase())}">
  <div class="product-media">${p.badge ? `<span class="product-badge ${p.badge === "New" ? "new" : ""}">${p.badge}</span>` : ""}
    <a href="/product/${p.slug}/"><img src="${img.product(p)}" alt="${esc(p.name)}" loading="lazy" width="600" height="600"></a>
    <div class="product-actions"><button data-wish aria-label="Add to wishlist">${icon("heart")}</button><a href="/product/${p.slug}/" aria-label="Quick view">${icon("eye")}</a><button data-quote="${esc(p.name)}" aria-label="Add to quote">${icon("compare")}</button></div>
    <div class="product-quote"><button class="btn btn-accent btn-sm" data-quote="${esc(p.name)}">Add to Quote</button></div>
  </div>
  <div class="product-body"><span class="product-cat">${catName(p.cat)}</span><a class="product-title" href="/product/${p.slug}/">${p.name}</a>${stars(p.rating)}
    <div class="product-meta"><span class="in-stock">In stock</span><a href="/product/${p.slug}/">Get Price</a></div></div>
</article>`;

const ctaBand = () => `<section class="section-sm"><div class="container"><div class="cta-band reveal zoom-in">
  <div><h3>Need a custom solution for your site?</h3><p style="margin:0">Tell us what you need and our engineers will design, supply and install it.</p></div>
  <div style="display:flex;gap:12px;flex-wrap:wrap"><a class="btn btn-accent" href="/get-a-quote/">Get a Quote ${icon("arrowR")}</a><a class="btn btn-white" href="tel:${site.phoneHref}">${icon("phone")} Call Us</a></div>
</div></div></section>`;

const featureGrid = (items) => `<div class="feature-grid">${items.map(([ic, t, d], i) => `<div class="feature reveal fade-up" data-delay="${(i % 3) * 120}"><div class="ic">${icon(ic)}</div><h3>${t}</h3><p>${d}</p></div>`).join("")}</div>`;

/* ---------------- Home ---------------- */
function home() {
  const h1 = img.scene("hero-1", "slidingGate", "Automatic gate", 1920, 900, "right");
  const h2 = img.scene("hero-2", "barrier", "Road barrier", 1920, 900, "right");
  const h3 = img.scene("hero-3", "dock", "Loading bay", 1920, 900, "right");
  const svc = img.scene("service-team", "person", "Service engineer", 1000, 800, "center");
  const range = img.scene("range-bg", "factory", "Factory", 1920, 1000, "center");
  const entr = img.scene("banner-entrances", "dock", "Customized industrial entrances", 1200, 700, "right");
  const doors = img.scene("banner-doors", "steelDoor", "Industrial doors", 900, 700, "right");
  const pick = ["fire-rated-doors", "high-speed-pvc-roll-up-doors", "automatic-road-barrier", "hydraulic-road-blocker", "automatic-roller-shutter", "automatic-sliding-door-system", "dock-leveler", "wifi-sliding-gate-operator"].map((s) => products.find((p) => p.slug === s));
  const doorProducts = products.filter((p) => p.cat === "industrial-doors").slice(0, 3);
  const slides = [
    { bg: h1, k: "Automation · Security · Access", t: "Comprehensive Solutions for <em>Every Sector.</em>", p: "Automatic entrances, physical security, access control, safety and industrial products, designed, supplied and installed by Automatica." , b: ["Discover", "/products/"], tag: "h1" },
    { bg: h2, k: "Access Control Systems", t: "Smart Vehicle <em>Access Management</em>", p: "E-Tag readers, boom barriers and parking systems that keep traffic moving and your site secure.", b: ["Explore Solutions", "/solutions/"], tag: "h2" },
    { bg: h3, k: "Loading Bay Equipment", t: "Dock Levelers Built <em>Up to 12 Tons</em>", p: "Custom manufactured loading bay equipment for warehouses, factories and cold stores.", b: ["Discover Now", "/solutions/loading-bay-solution/"], tag: "h2" },
  ];
  const body = `
<section class="hero" aria-label="Featured">
  <div class="hero-slides">${slides.map((s, i) => `<div class="hero-slide${i ? "" : " active"}"><div class="hero-bg" style="background-image:url('${s.bg}')"></div>
    <div class="container" style="height:100%"><div class="hero-content">
      <span class="hero-kicker">${s.k}</span><${s.tag}>${s.t}</${s.tag}><p>${s.p}</p>
      <div class="rating">${stars(5)}<span><strong>4.9 rated</strong> – over 4,000+ satisfied customers</span></div>
      <div><a class="btn btn-accent" href="${s.b[1]}">${s.b[0]} ${icon("arrowR")}</a></div>
    </div></div></div>`).join("")}</div>
  <div class="hero-nav"><div class="container"><div class="hero-dots">${slides.map((_, i) => `<button aria-label="Slide ${i + 1}"></button>`).join("")}</div>
    <div class="hero-arrows"><button class="hero-prev" aria-label="Previous">${icon("arrowL")}</button><button class="hero-next" aria-label="Next">${icon("arrowR")}</button></div></div></div>
  <div class="hero-progress"></div>
</section>

<section class="trust"><div class="container"><div class="trust-grid">
  ${[["truck", "Super Fast Deliveries", "Quick delivery all over Pakistan"], ["starFill", "Rated Excellent", "4.9 / 5 from our customers"], ["shieldCheck", "Trusted Products", "Direct from the world's top brands"], ["award", "ISO 9001:2015", "Certified quality management"]]
    .map(([ic, t, d], i) => `<div class="trust-item reveal fade-up" data-delay="${i * 100}"><span class="ic">${icon(ic)}</span><div><h4>${t}</h4><p>${d}</p></div></div>`).join("")}
</div></div></section>

<section class="brands"><div class="container brands-row">
  <h3 class="reveal fade-left">We stock<br>best brands</h3>
  <div class="marquee"><div class="marquee-track">${[...brands, ...brands].map((b) => `<div class="brand-logo">${b}</div>`).join("")}</div></div>
</div></section>

<section class="section"><div class="container split">
  <div class="split-media reveal fade-left"><img src="${svc}" alt="Automatica service engineer" loading="lazy">
    <div class="badge-exp"><strong>15+</strong><span>Years of<br>Experience</span></div></div>
  <div class="reveal fade-right"><span class="sec-kicker">Why Automatica</span><h2 class="sec-title">Service is Our Top Priority.</h2>
    <p style="margin-top:18px">At Automatica we believe a product is only as good as the service behind it. From the first site survey to installation, training and after sales maintenance, our trained engineers stay with you so every gate, door and security system keeps working day after day.</p>
    <ul class="checklist" style="margin:24px 0 30px">${["Free site survey and expert consultation", "Professional installation by trained engineers", "Genuine spare parts and fast after sales support", "Annual maintenance contracts available"].map((t) => `<li>${icon("check")}${t}</li>`).join("")}</ul>
    <a class="btn btn-dark" href="/company/about-us/">About Us ${icon("arrowR")}</a></div>
</div></section>

<section class="counters"><div class="container"><div class="counter-grid">
  ${[[1200, "Projects Completed"], [15, "Years of Experience"], [4000, "Happy Clients"], [80, "Team Members"], [35, "Cities Covered"]]
    .map(([n, l]) => `<div class="counter"><div class="num"><b data-count="${n}">0</b><span>+</span></div><p>${l}</p></div>`).join("")}
</div></div></section>

<section class="section range" style="background-image:url('${range}')"><div class="container">
  <div class="sec-head"><div class="reveal fade-up"><span class="sec-kicker">Our Products</span><h2 class="sec-title">A Wide Range of Innovative Products</h2></div>
    <a class="btn btn-accent reveal fade-up" href="/products/">Discover Now ${icon("arrowR")}</a></div>
  <div class="range-grid">${[
    ["door", "Automatic Entrance Systems", ["Automatic Door Openers", "Automatic Gate Openers", "Motorized Shutters", "Hi Speed Doors"], "automatic-entry-systems"],
    ["shield", "Physical Security Systems", ["Tyre Killers", "Hydraulic Road Blockers", "Under Vehicle Surveillance"], "physical-security-equipment"],
    ["lock", "Access Control Systems", ["Vehicle Access Management", "Visitor Access Management", "Turnstile Gates"], "access-control-systems"],
    ["warehouse", "Industrial Doors", ["Fire Rated Doors", "MS Steel Doors", "Stainless Steel Doors", "Louver Doors", "Emergency Exit Doors"], "industrial-doors"],
    ["truck", "Loading Bay Equipment", ["Dock Levelers", "Dock Doors", "Dock Bumpers", "Wheel Stoppers"], "loading-bay-equipment"],
    ["cpu", "Technology Solutions", ["Industrial PCs", "Software Development", "Embedded Systems", "Communication Systems"], "industrial-it-communication"],
  ].map(([ic, t, l, slug], i) => `<div class="range-card reveal fade-up" data-delay="${(i % 3) * 120}"><div class="ic">${icon(ic)}</div><h4>${t}</h4>${l.map((x) => `<a href="/products/?category=${slug}">${x}</a>`).join("")}</div>`).join("")}</div>
</div></section>

<section class="section"><div class="container">
  <div class="sec-head"><div class="reveal fade-up"><span class="sec-kicker">Most Liked Products</span><h2 class="sec-title">Most Sold Products, Fast Delivery</h2></div>
    <div class="tabs reveal fade-up" data-tabs="#home-products"><button class="active" data-filter="all">Top 100 Most Sold</button><button data-filter="entry">Entrances</button><button data-filter="doors">Doors</button><button data-filter="security">Security</button><button data-filter="new">New</button></div></div>
  <div class="product-grid" id="home-products">${pick.map(productCard).join("")}</div>
</div></section>

<section class="section bg-soft"><div class="container">
  <div class="banner-duo">
    <a class="promo reveal fade-left" href="/products/?category=industrial-doors"><img src="${doors}" alt="Industrial doors" loading="lazy">
      <div class="promo-body"><small>Industrial Doors</small><h3>Built Strong for Every Facility</h3><p>A variety of doors designed for industrial and commercial applications.</p><span class="btn btn-accent btn-sm">View All Products ${icon("arrowR")}</span></div></a>
    <div class="product-grid cols-3" style="grid-template-columns:1fr;gap:16px">${doorProducts.map((p) => `<a class="product reveal fade-right" href="/product/${p.slug}/" style="flex-direction:row;align-items:center"><div class="product-media" style="width:120px;flex:none"><img src="${img.product(p)}" alt="${esc(p.name)}" loading="lazy"></div><div class="product-body"><span class="product-cat">${catName(p.cat)}</span><span class="product-title">${p.name}</span>${stars(p.rating)}</div></a>`).join("")}</div>
  </div>
</div></section>

<section class="section"><div class="container">
  <a class="promo reveal zoom-in" href="/solutions/loading-bay-solution/" style="min-height:420px;align-items:center"><img src="${entr}" alt="Customized industrial entrances" loading="lazy">
    <div class="promo-body" style="max-width:620px"><small>Customized Industrial Entrances</small><h3>Dock Levelers Made for Your Exact Needs</h3><p>Custom manufactured dock levelers to meet specific needs, with weight capacities up to 12 tons.</p>
      <span style="display:flex;gap:12px;flex-wrap:wrap;margin-top:10px"><span class="btn btn-accent btn-sm">Explore ${icon("arrowR")}</span><span class="btn btn-white btn-sm">Loading Bay Solutions</span></span></div></a>
</div></section>

<section class="section bg-soft"><div class="container">
  <div class="sec-head"><div class="reveal fade-up"><span class="sec-kicker">We Customize for You</span><h2 class="sec-title">Solutions Built Around Your Site</h2><p class="sec-sub">We offer customized products and solutions to meet your specific needs.</p></div>
    <a class="btn btn-outline reveal fade-up" href="/solutions/">View All Solutions ${icon("arrowR")}</a></div>
  <div class="sol-grid">${["visitor-identification-and-management-solution", "parking-management-guidance-solution", "rfid-etag-vehicle-access-control-solution"].map((s, i) => {
    const sol = solutions.find((x) => x.slug === s);
    return `<article class="sol-card reveal fade-up" data-delay="${i * 120}"><a class="media" href="/solutions/${sol.slug}/"><img src="${img.scene("solution-" + sol.slug, sol.art, sol.name, 800, 500, "center")}" alt="${esc(sol.name)}" loading="lazy"><span class="num">0${i + 1}</span></a>
      <div class="body"><h3><a href="/solutions/${sol.slug}/">${sol.name}</a></h3><p>${sol.intro}</p><a class="link-arrow" href="/solutions/${sol.slug}/">Explore ${icon("arrowR")}</a></div></article>`;
  }).join("")}</div>
</div></section>

<section class="section"><div class="container">
  <div class="sec-head center reveal fade-up"><span class="sec-kicker">Our Clients</span><h2 class="sec-title">Trusted by Leading Organizations</h2></div>
  <div class="client-grid reveal fade-up">${Array.from({ length: 14 }, (_, i) => `<div class="client">CLIENT ${String(i + 1).padStart(2, "0")}</div>`).join("")}</div>
</div></section>

<section class="section bg-soft"><div class="container">
  <div class="sec-head"><div class="reveal fade-up"><span class="sec-kicker">Latest News</span><h2 class="sec-title">Our Latest Blog Posts</h2></div><a class="link-arrow reveal fade-up" style="white-space:nowrap" href="/company/latest-news/">View All Articles ${icon("arrowR")}</a></div>
  <div class="grid-3" style="grid-template-columns:repeat(auto-fit,minmax(260px,1fr))">${news.slice(0, 4).map(newsCard).join("")}</div>
</div></section>`;
  write("index.html", layout({ title: "", path: "/", body }));
}

function newsCard(n, i) {
  return `<article class="post-card reveal fade-up" data-delay="${(i % 4) * 100}"><a class="media" href="/company/latest-news/${n.slug}/"><img src="${img.scene("news-" + n.slug, n.art, n.title, 800, 500, "center")}" alt="${esc(n.title)}" loading="lazy"><span class="post-date"><strong>${n.d}</strong><span>${n.m}</span></span></a>
  <div class="body"><div class="meta">${n.cat}</div><h3><a href="/company/latest-news/${n.slug}/">${n.title}</a></h3><p>${n.excerpt}</p><a class="link-arrow" href="/company/latest-news/${n.slug}/">Read More ${icon("arrowR")}</a></div></article>`;
}

/* ---------------- Products ---------------- */
function productsPage() {
  const body = `${pageHero("Products", [["Products"]])}
<section class="section"><div class="container content-grid">
  <aside class="sidebar">
    <div class="widget"><h4>Product Categories</h4><a href="/products/" data-cat="">All Products <span>${products.length}</span></a>${categories.map((c) => `<a href="/products/?category=${c.slug}" data-cat="${c.slug}">${c.name}<span>${products.filter((p) => p.cat === c.slug).length}</span></a>`).join("")}</div>
    <div class="widget"><h4>Availability</h4><a href="#">In stock</a><a href="#">On order</a><a href="#">On sale</a></div>
    <div class="widget widget-cta"><h4>Need Help?</h4><p>Not sure which product fits your site? Our team will guide you.</p><a class="btn btn-accent btn-sm" href="/contact-us/">Contact Us</a></div>
  </aside>
  <div>
    <div class="toolbar"><span id="result-count">Showing all ${products.length} results</span>
      <select id="sort" aria-label="Sort"><option value="default">Default sorting</option><option value="popular">Sort by popularity</option><option value="rating">Sort by average rating</option><option value="latest">Sort by latest</option><option value="az">Name: A to Z</option></select></div>
    <div class="product-grid cols-3" id="shop-grid">${products.map(productCard).join("")}</div>
    <p id="no-results" style="display:none;text-align:center;padding:40px 0">No products found. <a href="/products/" style="color:var(--accent)">View all products</a></p>
  </div>
</div></section>
<script>
(function(){
  var q=new URLSearchParams(location.search), cat=q.get("category")||"", term=(q.get("q")||"").toLowerCase().trim();
  var grid=document.getElementById("shop-grid"), cards=[].slice.call(grid.children), n=0;
  cards.forEach(function(c){var ok=(!cat||c.dataset.tags.indexOf(cat)>-1)&&(!term||c.dataset.name.indexOf(term)>-1);c.style.display=ok?"":"none";if(ok)n++;});
  document.querySelectorAll("[data-cat]").forEach(function(a){if(a.dataset.cat===cat)a.classList.add("active");});
  var label=cat?document.querySelector('[data-cat="'+cat+'"]'):null;
  document.getElementById("result-count").textContent="Showing "+n+" result"+(n===1?"":"s")+(term?' for "'+term+'"':"")+(label?" in "+label.firstChild.textContent:"");
  if(!n)document.getElementById("no-results").style.display="";
  var orig=cards.slice();
  document.getElementById("sort").addEventListener("change",function(e){
    var v=e.target.value,list=orig.slice();
    if(v==="az")list.sort(function(a,b){return a.dataset.name.localeCompare(b.dataset.name)});
    if(v==="latest")list.reverse();
    if(v==="popular")list.sort(function(a,b){return (b.dataset.tags.indexOf("popular")>-1)-(a.dataset.tags.indexOf("popular")>-1)});
    if(v==="rating")list.sort(function(a,b){return b.querySelectorAll(".stars path[fill]").length-a.querySelectorAll(".stars path[fill]").length});
    list.forEach(function(c){grid.appendChild(c)});
  });
})();
</script>`;
  write("products/index.html", layout({ title: "Products", path: "/products/", body }));

  for (const p of products) {
    const related = products.filter((x) => x.cat === p.cat && x.slug !== p.slug).concat(products.filter((x) => x.cat !== p.cat)).slice(0, 4);
    const body = `${pageHero(p.name, [["Products", "/products/"], [catName(p.cat), `/products/?category=${p.cat}`], [p.name]])}
<section class="section"><div class="container pd">
  <div class="pd-media reveal fade-left"><img src="${img.product(p)}" alt="${esc(p.name)}"></div>
  <div class="reveal fade-right"><span class="product-cat">${catName(p.cat)}</span><h2 class="sec-title" style="margin:8px 0 12px">${p.name}</h2>
    <div style="display:flex;align-items:center;gap:12px;margin-bottom:16px">${stars(p.rating)}<span class="in-stock">In stock</span></div>
    <p>${p.short}</p>
    <table class="spec">${Object.entries(p.specs).map(([k, v]) => `<tr><td>${k}</td><td>${v}</td></tr>`).join("")}</table>
    <div style="display:flex;gap:12px;flex-wrap:wrap"><button class="btn btn-accent" data-quote="${esc(p.name)}">Add to Quote ${icon("file")}</button><a class="btn btn-outline" href="https://wa.me/${site.whatsapp}?text=${encodeURIComponent("Hi, I'd like a price for " + p.name)}" target="_blank" rel="noopener">${icon("whatsapp")} WhatsApp</a></div>
    <ul class="checklist" style="margin-top:26px">${["Free site survey and consultation", "Installation by trained engineers", "Warranty and after sales support"].map((t) => `<li>${icon("check")}${t}</li>`).join("")}</ul>
  </div>
</div></section>
<section class="section bg-soft"><div class="container"><div class="sec-head"><div><span class="sec-kicker">You may also like</span><h2 class="sec-title">Related Products</h2></div></div>
  <div class="product-grid">${related.map(productCard).join("")}</div></div></section>`;
    write(`product/${p.slug}/index.html`, layout({ title: p.name, desc: p.short, path: "/products/", body }));
  }
}

/* ---------------- Solutions ---------------- */
function solutionsPages() {
  const body = `${pageHero("Solutions", [["Solutions"]])}
<section class="section"><div class="container">
  <div class="sec-head center reveal fade-up"><span class="sec-kicker">What We Do</span><h2 class="sec-title">Complete Solutions, Designed for You</h2><p class="sec-sub">From one gate to a full campus, we design, supply, install and support the whole system.</p></div>
  <div class="sol-grid">${solutions.map((s, i) => `<article class="sol-card reveal fade-up" data-delay="${(i % 3) * 120}"><a class="media" href="/solutions/${s.slug}/"><img src="${img.scene("solution-" + s.slug, s.art, s.name, 800, 500, "center")}" alt="${esc(s.name)}" loading="lazy"><span class="num">${String(i + 1).padStart(2, "0")}</span></a>
    <div class="body"><h3><a href="/solutions/${s.slug}/">${s.name}</a></h3><p>${s.intro}</p><a class="link-arrow" href="/solutions/${s.slug}/">Explore ${icon("arrowR")}</a></div></article>`).join("")}</div>
</div></section>${ctaBand()}`;
  write("solutions/index.html", layout({ title: "Solutions", path: "/solutions/", body }));

  for (const s of solutions) {
    const body = `${pageHero(s.name, [["Solutions", "/solutions/"], [s.name]])}
<section class="section"><div class="container content-grid">
  <aside class="sidebar"><div class="widget"><h4>All Solutions</h4>${solutions.map((x) => `<a class="${x.slug === s.slug ? "active" : ""}" href="/solutions/${x.slug}/">${x.name}</a>`).join("")}</div>
    <div class="widget widget-cta"><h4>Talk to an Expert</h4><p>${site.phone}<br>${site.email}</p><a class="btn btn-accent btn-sm" href="/get-a-quote/">Get a Quote</a></div></aside>
  <div class="prose">
    <img class="reveal zoom-in" src="${img.scene("solution-" + s.slug, s.art, s.name, 800, 500, "center")}" alt="${esc(s.name)}" style="border-radius:var(--radius-lg);width:100%;margin-bottom:30px">
    <h2 class="reveal fade-up">${s.name}</h2><p class="reveal fade-up">${s.intro}</p>
    <h3 class="reveal fade-up">What's included</h3><ul class="reveal fade-up">${s.points.map((x) => `<li>${x}</li>`).join("")}</ul>
    <h3 class="reveal fade-up">How we work</h3>
    ${featureGrid([["search", "1. Site Survey", "Our engineers visit your site and understand your traffic, users and security needs."], ["bulb", "2. Design", "We design the right system and share a clear proposal with drawings and pricing."], ["tool", "3. Install & Support", "Professional installation, training for your staff and dependable after sales service."]])}
  </div>
</div></section>${ctaBand()}`;
    write(`solutions/${s.slug}/index.html`, layout({ title: s.name, desc: s.intro, path: "/solutions/", body }));
  }
}

/* ---------------- Projects ---------------- */
function projectsPage() {
  const body = `${pageHero("Our Projects", [["Projects"]])}
<section class="section"><div class="container">
  <div class="sec-head center reveal fade-up"><span class="sec-kicker">Portfolio</span><h2 class="sec-title">Recent Work Across Pakistan</h2></div>
  <div class="grid-3" id="projects-grid">${projects.map((p, i) => `<a class="project-card reveal fade-up" data-delay="${(i % 3) * 120}" href="/contact-us/"><img src="${img.scene("project-" + (i + 1), p.art, p.title, 800, 600, "center")}" alt="${esc(p.title)}" loading="lazy"><div class="pc-body"><small>${p.type}</small><h3>${p.title}</h3><span class="more">Details »</span></div></a>`).join("")}</div>
  <div class="load-more"><button class="btn btn-dark" data-load-more="#projects-grid" data-step="6">Load More</button></div>
</div></section>${ctaBand()}`;
  write("projects/index.html", layout({ title: "Our Projects", path: "/projects/", body }));
}

/* ---------------- Company ---------------- */
function companyPages() {
  const sub = (slug, title, inner, desc) => write(`company/${slug}/index.html`, layout({ title, desc, path: "/company/", body: `${pageHero(title, [["Company", "/company/"], [title]])}${inner}` }));
  const companyLinks = menu.find((m) => m.label === "Company").children();

  write("company/index.html", layout({ title: "Company", path: "/company/", body: `${pageHero("Company", [["Company"]])}
<section class="section"><div class="container"><div class="feature-grid">${companyLinks.map((l, i) => `<a class="feature reveal fade-up" data-delay="${(i % 3) * 120}" href="${l.href}"><div class="ic">${icon(["user", "clock", "target", "users", "globe", "award", "briefcase", "shieldCheck", "file"][i] || "star")}</div><h3>${l.label}</h3><p>Learn more about ${l.label.toLowerCase()} at ${site.name}.</p></a>`).join("")}</div></div></section>${ctaBand()}` }));

  const aboutImg = img.scene("about-service", "person", "Automatica engineer", 1000, 800, "center");
  sub("about-us", "About Us", `
<section class="section"><div class="container split">
  <div class="split-media reveal fade-left"><img src="${aboutImg}" alt="Automatica team at work" loading="lazy"><div class="badge-exp"><strong>95%</strong><span>Satisfied<br>Customers</span></div></div>
  <div class="reveal fade-right"><span class="sec-kicker">Who We Are</span><h2 class="sec-title">A Journey of Passion, Purpose.</h2>
    <p style="margin-top:18px">Automatica started out as a service provider and grew, step by step, into one of the leading names in automatic entry systems, physical security and access control. Along the way we partnered with international brands and set up our own manufacturing and fabrication facility, so we can build products to fit each customer's site.</p>
    <p>Today, from our head office in Lahore, our engineers design, supply, install and maintain systems for factories, housing societies, hospitals, banks, universities and government organizations across Pakistan.</p>
    <a class="btn btn-dark" href="/contact-us/" style="margin-top:10px">Contact Us ${icon("arrowR")}</a></div>
</div></section>
<section class="section bg-soft"><div class="container"><div class="sec-head center reveal fade-up"><span class="sec-kicker">What drives us</span><h2 class="sec-title">Serving People for More Than 15 Years</h2></div>
  ${featureGrid([["target", "Our Vision", `${site.name}'s ultimate goal is to provide innovative technological solutions for everyday life.`], ["flag", "Our Mission", "To make modern automation and security technology accessible, reliable and affordable for every business and home."], ["award", "Our Goal", "To promote excellence and innovation in everything we do, and to earn customers for life through outstanding service."]])}
</div></section>
<section class="counters"><div class="container"><div class="counter-grid">${[[1200, "Projects Completed"], [15, "Years of Experience"], [4000, "Happy Clients"], [80, "Team Members"], [35, "Cities Covered"]].map(([n, l]) => `<div class="counter"><div class="num"><b data-count="${n}">0</b><span>+</span></div><p>${l}</p></div>`).join("")}</div></div></section>
${ctaBand()}`);

  sub("company-history", "Company History", `<section class="section"><div class="container grid-2">
  <div class="reveal fade-left"><span class="sec-kicker">Our Story</span><h2 class="sec-title">From a Small Service Team to a Trusted Brand</h2><p style="margin-top:16px">Every year we have grown by listening to our customers and solving real problems at their sites. Here are some of the milestones on our journey.</p></div>
  <div class="timeline reveal fade-right">${[["2010", "Founded as a service provider", "Started with a small team servicing automatic gates and doors in Lahore."], ["2013", "International partnerships", "Began working directly with international brands for entrance automation and access control."], ["2015", "Own manufacturing facility", "Set up our own fabrication and manufacturing unit for doors, gates and loading bay equipment."], ["2019", "Security & access control", "Expanded into physical security, road blockers, UVSS and vehicle access solutions."], ["Today", "Nationwide solutions", "Serving clients in cities across Pakistan with design, supply, installation and support."]].map(([y, t, d]) => `<div class="tl-item"><div class="yr">${y}</div><h4>${t}</h4><p>${d}</p></div>`).join("")}</div>
</div></section>${ctaBand()}`);

  sub("core-values", "Core Values", `<section class="section"><div class="container"><div class="sec-head center reveal fade-up"><span class="sec-kicker">What we stand for</span><h2 class="sec-title">Our Core Values</h2></div>
  ${featureGrid([["shieldCheck", "Integrity", "We are honest with our customers about what they need and what it will cost."], ["star", "Quality", "We only supply and build products we would trust at our own sites."], ["headset", "Service First", "Service is our top priority, before, during and long after installation."], ["bulb", "Innovation", "We keep learning and bring the latest technology to our customers."], ["users", "Teamwork", "Our engineers, fabricators and sales team work as one to deliver."], ["clock", "Reliability", "We deliver on time and keep systems running with fast support."]])}</div></section>${ctaBand()}`);

  sub("our-team", "Our Team", `<section class="section"><div class="container"><div class="sec-head center reveal fade-up"><span class="sec-kicker">The people behind Automatica</span><h2 class="sec-title">Meet Our Team</h2></div>
  <div class="team-grid">${[["Team Member", "Chief Executive Officer"], ["Team Member", "Director Operations"], ["Team Member", "Head of Sales"], ["Team Member", "Lead Engineer"], ["Team Member", "Project Manager"], ["Team Member", "Service Manager"], ["Team Member", "Fabrication Head"], ["Team Member", "Customer Support"]].map(([n, r], i) => `<div class="member reveal fade-up" data-delay="${(i % 4) * 100}"><div class="media"><img src="${img.scene("team-" + (i + 1), "person", r, 600, 750, "center")}" alt="${r}" loading="lazy"></div><h4>${n}</h4><p>${r}</p></div>`).join("")}</div></div></section>${ctaBand()}`);

  sub("brand-partners", "Brand Partners", `<section class="section"><div class="container"><div class="sec-head center reveal fade-up"><span class="sec-kicker">Partners</span><h2 class="sec-title">Our Brand Partners</h2><p class="sec-sub">We work with trusted manufacturers from around the world to bring you proven products.</p></div>
  <div class="client-grid reveal fade-up" style="grid-template-columns:repeat(auto-fill,minmax(160px,1fr))">${brands.map((b) => `<div class="client">${b}</div>`).join("")}</div></div></section>${ctaBand()}`);

  sub("our-brands", "Our Brands", `<section class="section"><div class="container"><div class="sec-head center reveal fade-up"><span class="sec-kicker">Made by Automatica</span><h2 class="sec-title">Our Own Brands</h2></div>
  ${featureGrid([["door", "Automatica Entry", "Automatic gates, doors and shutters built and tested in-house."], ["shield", "Automatica Defend", "Road blockers, tyre killers and perimeter protection products."], ["truck", "Automatica Dock", "Dock levelers, shelters and loading bay equipment up to 12 tons."]])}</div></section>${ctaBand()}`);

  sub("careers", "Careers", `<section class="section"><div class="container"><div class="sec-head reveal fade-up"><div><span class="sec-kicker">Join us</span><h2 class="sec-title">Build Your Career at Automatica</h2><p class="sec-sub">Send your CV to <a href="mailto:${site.email}" style="color:var(--accent)">${site.email}</a> with the job title in the subject.</p></div></div>
  ${[["Field Service Engineer", ["Lahore", "Full time", "Electrical / Mechatronics"]], ["Sales Executive – Security Solutions", ["Lahore", "Full time", "B2B sales"]], ["Fabrication Supervisor", ["Lahore", "Full time", "Steel fabrication"]], ["Project Coordinator", ["Lahore", "Full time", "Project management"]]].map(([t, tags]) => `<div class="job reveal fade-up"><div><h4>${t}</h4><div class="tags">${tags.map((x) => `<span>${x}</span>`).join("")}</div></div><a class="btn btn-accent btn-sm" href="mailto:${site.email}?subject=${encodeURIComponent("Application: " + t)}">Apply Now</a></div>`).join("")}
</div></section>`);

  sub("certifications", "Certifications", `<section class="section"><div class="container"><div class="sec-head center reveal fade-up"><span class="sec-kicker">Quality</span><h2 class="sec-title">Certifications & Standards</h2></div>
  <div class="grid-2" style="gap:24px">${[["ISO 9001:2015", "Quality management system for design, supply, installation and service."], ["CE Marked Products", "Products we supply meet European safety and performance standards."], ["Fire Rated Testing", "Fire rated doors tested to recognised international fire standards."], ["Trained Engineers", "Our technicians are trained and certified by our brand partners."]].map(([t, d], i) => `<div class="cert reveal fade-up" data-delay="${(i % 2) * 120}"><div class="ic">${icon("award")}</div><div><h4>${t}</h4><p style="margin:0">${d}</p></div></div>`).join("")}</div></div></section>${ctaBand()}`);

  sub("latest-news", "Latest News", `<section class="section"><div class="container"><div class="grid-3">${news.map(newsCard).join("")}</div></div></section>`);
  for (const n of news) {
    write(`company/latest-news/${n.slug}/index.html`, layout({ title: n.title, desc: n.excerpt, path: "/company/", body: `${pageHero(n.title, [["Latest News", "/company/latest-news/"], [n.cat]])}
<section class="section"><div class="container" style="max-width:860px"><div class="prose">
  <img class="reveal zoom-in" src="${img.scene("news-" + n.slug, n.art, n.title, 800, 500, "center")}" alt="${esc(n.title)}" style="border-radius:var(--radius-lg);width:100%;margin-bottom:26px">
  <p class="product-cat">${n.d} ${n.m} · ${n.cat}</p><p style="font-size:18px;color:var(--ink)">${n.excerpt}</p>
  <p>Every site is different, so the best place to start is a conversation with our team. We visit your site, understand how it is used and recommend the right product for your traffic, budget and security level.</p>
  <h3>Talk to us</h3><p>Call <a href="tel:${site.phoneHref}">${site.phone}</a> or email <a href="mailto:${site.email}">${site.email}</a> and our engineers will guide you.</p>
</div></div></section>` }));
  }
}

/* ---------------- Support ---------------- */
function supportPages() {
  const links = menu.find((m) => m.label === "Support").children();
  write("support/index.html", layout({ title: "Support", path: "/support/", body: `${pageHero("Support", [["Support"]])}
<section class="section"><div class="container"><div class="sec-head center reveal fade-up"><span class="sec-kicker">We're here to help</span><h2 class="sec-title">Customer Support</h2></div>
<div class="feature-grid">${links.map((l, i) => `<a class="feature reveal fade-up" data-delay="${i * 120}" href="${l.href}"><div class="ic">${icon(["play", "headset", "shieldCheck"][i])}</div><h3>${l.label}</h3><p>${["See our products working before you buy, at our display center or at your site.", "Fast help from trained engineers by phone, WhatsApp or a site visit.", "Clear warranty terms and genuine spare parts for every product we supply."][i]}</p></a>`).join("")}</div></div></section>${ctaBand()}` }));

  const sub = (slug, title, inner) => write(`support/${slug}/index.html`, layout({ title, path: "/support/", body: `${pageHero(title, [["Support", "/support/"], [title]])}${inner}${ctaBand()}` }));
  sub("product-demonstration", "Product Demonstration", `<section class="section"><div class="container split">
  <div class="split-media reveal fade-left"><img src="${img.scene("support-demo", "demo", "Product demonstration", 1000, 800, "center")}" alt="Product demonstration" loading="lazy"></div>
  <div class="reveal fade-right"><span class="sec-kicker">See it in action</span><h2 class="sec-title">Book a Product Demonstration</h2><p style="margin-top:16px">Visit our display center in Lahore to see automatic doors, gates, barriers and access control systems working live, or ask our team for an on-site demonstration.</p>
  <ul class="checklist" style="margin:20px 0 26px">${["Live demo of doors, gates and barriers", "Hands-on with access control and E-Tag readers", "Expert advice for your project"].map((t) => `<li>${icon("check")}${t}</li>`).join("")}</ul><a class="btn btn-accent" href="/contact-us/">Book a Demo ${icon("arrowR")}</a></div></div></section>`);
  sub("technical-support", "Technical Support", `<section class="section"><div class="container"><div class="contact-cards">
  ${[["phone", "Call Support", `Speak to an engineer: <a href="tel:${site.phoneHref}">${site.phone}</a>`, ["Call Us", `tel:${site.phoneHref}`]], ["whatsapp", "WhatsApp", "Send photos or videos of the issue for quick help.", ["Chat on WhatsApp", `https://wa.me/${site.whatsapp}`]], ["mail", "Email", `Write to <a href="mailto:${site.email}">${site.email}</a>`, ["Email Us", `mailto:${site.email}`]]].map(([ic, t, d, b], i) => `<div class="contact-card reveal fade-up" data-delay="${i * 120}"><div class="ic">${icon(ic)}</div><h3>${t}</h3><p>${d}</p><a class="btn btn-dark btn-sm" href="${b[1]}">${b[0]}</a></div>`).join("")}
  </div><div class="accordion" style="margin-top:50px;max-width:860px;margin-left:auto;margin-right:auto">${faqItems().slice(0, 4).map(faqHtml).join("")}</div></div></section>`);
  sub("warranty", "Warranty", `<section class="section"><div class="container" style="max-width:900px"><div class="prose reveal fade-up">
  <h2>Our Warranty Promise</h2><p>All products supplied and installed by ${site.name} come with a manufacturer's warranty against defects in materials and workmanship. Warranty periods depend on the product and are stated on your quotation and invoice.</p>
  <h3>What is covered</h3><ul><li>Manufacturing defects in motors, control boards and mechanical parts</li><li>Replacement or repair of faulty parts with genuine spares</li><li>Labour for warranty repairs within city limits</li></ul>
  <h3>What is not covered</h3><ul><li>Damage from accidents, misuse, voltage fluctuation or natural disasters</li><li>Repairs or changes made by anyone other than our engineers</li><li>Consumables such as batteries, remotes and bulbs</li></ul>
  <h3>How to claim</h3><p>Contact our support team with your invoice number at <a href="mailto:${site.email}">${site.email}</a> or call <a href="tel:${site.phoneHref}">${site.phone}</a>.</p></div></div></section>`);
}

const faqItems = () => [
  ["Do you offer a free site survey?", "Yes. Our engineers visit your site in Lahore and nearby cities to understand your requirement and recommend the right solution."],
  ["Which cities do you work in?", "Our head office is in Lahore and we deliver and install projects across Pakistan."],
  ["How do I get a price?", "Add products to your quotation list and send a quote request, or call or WhatsApp us. We usually reply within one working day."],
  ["Do your products come with a warranty?", "Yes. Every product comes with a manufacturer's warranty, and we offer annual maintenance contracts."],
  ["Can you customize doors, gates and dock levelers?", "Yes. We manufacture to your sizes and needs, including dock levelers up to 12 tons."],
  ["Do automatic gates work during power outages?", "Most of our operators support battery backup or UPS, and all have a manual release."],
];
const faqHtml = ([q, a], i) => `<details class="reveal fade-up" ${i === 0 ? "open" : ""}><summary>${q}</summary><div class="acc-body"><p>${a}</p></div></details>`;

/* ---------------- Contact, quote, FAQ, 404 ---------------- */
function contactPage() {
  const form = (quote = false) => `<form class="form" data-mailto="${site.email}" data-subject="${quote ? "Quotation request" : "Website enquiry"}" ${quote ? "data-clear-quote" : ""}>
    <div><label for="f-name">Your Name *</label><input id="f-name" name="Name" required></div>
    <div><label for="f-phone">Phone *</label><input id="f-phone" name="Phone" type="tel" required></div>
    <div><label for="f-email">Email *</label><input id="f-email" name="Email" type="email" required></div>
    <div><label for="f-act">Activity</label><select id="f-act" name="Activity">${["Architect", "Builder", "Contractor", "Residential", "Distributor", "Reseller", "Other"].map((o) => `<option>${o}</option>`).join("")}</select></div>
    <div class="full"><label for="f-city">City</label><input id="f-city" name="City" value="Lahore"></div>
    <div class="full"><label for="${quote ? "quote-items" : "f-msg"}">${quote ? "Products & details" : "Message"} *</label><textarea id="${quote ? "quote-items" : "f-msg"}" name="Message" required></textarea></div>
    <div class="full"><button class="btn btn-accent" type="submit">${quote ? "Send Quote Request" : "Send Message"} ${icon("arrowR")}</button><p class="form-note">Thank you! Your email app has opened with your message. Press send and our team will reply soon.</p></div>
  </form>`;

  write("contact-us/index.html", layout({ title: "Contact Us", path: "/contact-us/", body: `${pageHero("Contact Us", [["Contact Us"]])}
<section class="section"><div class="container"><div class="contact-cards">
  ${[["phone", "Sales Team", "Want to learn about the services that we offer? Reach out right now!", ["Call Us", `tel:${site.phoneHref}`]], ["whatsapp", "Online Support", "Talk to us today if you have any questions about our services!", ["Chat on WhatsApp", `https://wa.me/${site.whatsapp}`]], ["chat", "General Inquiries", "Have a question about your next business venture? Let's get started!", ["Chat With Us", `mailto:${site.email}`]]]
    .map(([ic, t, d, b], i) => `<div class="contact-card reveal fade-up" data-delay="${i * 120}"><div class="ic">${icon(ic)}</div><h3>${t}</h3><p>${d}</p><a class="btn btn-dark btn-sm" href="${b[1]}" ${b[1].startsWith("http") ? 'target="_blank" rel="noopener"' : ""}>${b[0]}</a></div>`).join("")}
</div></div></section>
<section class="section bg-soft"><div class="container grid-2">
  <div class="reveal fade-left"><span class="sec-kicker">Get in touch</span><h2 class="sec-title" style="margin-bottom:24px">Send Us a Message</h2>${form()}</div>
  <div class="reveal fade-right"><div class="office"><h4>Head Office & Display Center</h4><ul>
    <li>${icon("pin")}${site.address}</li><li>${icon("phone")}<a href="tel:${site.phoneHref}">${site.phone}</a></li>
    <li>${icon("mail")}<a href="mailto:${site.email}">${site.email}</a></li><li>${icon("clock")}${site.hours}</li></ul></div>
    <iframe class="map" style="margin-top:24px" title="Automatica location map" loading="lazy" referrerpolicy="no-referrer-when-downgrade" src="https://www.google.com/maps?q=Lahore,Pakistan&output=embed"></iframe></div>
</div></section>` }));

  write("get-a-quote/index.html", layout({ title: "Get a Quote", path: "/get-a-quote/", body: `${pageHero("Quotation Request", [["Get a Quote"]])}
<section class="section"><div class="container grid-2">
  <div class="reveal fade-left"><span class="sec-kicker">Request a price</span><h2 class="sec-title">Tell Us What You Need</h2><p style="margin:14px 0 26px">Products you added with "Add to Quote" are listed below. Add sizes, quantities and your site location, and we will send you a detailed quotation.</p>${form(true)}</div>
  <div class="reveal fade-right"><div class="office"><h4>Why request a quote from us?</h4><ul class="checklist" style="margin-top:14px">${["Free site survey in Lahore", "Competitive pricing on premium brands", "Installation and after sales support included", "Reply within one working day"].map((t) => `<li>${icon("check")}${t}</li>`).join("")}</ul></div>
    <div class="cta-band" style="margin-top:24px;padding:34px"><div><h3>Prefer to talk?</h3><p style="margin:0">${site.phone}</p></div><a class="btn btn-accent" href="tel:${site.phoneHref}">Call Now</a></div></div>
</div></section>` }));

  write("faqs/index.html", layout({ title: "FAQs", path: "/faqs/", body: `${pageHero("FAQs", [["FAQs"]])}
<section class="section"><div class="container" style="max-width:900px"><div class="sec-head center reveal fade-up"><span class="sec-kicker">Questions</span><h2 class="sec-title">Frequently Asked Questions</h2></div>
<div class="accordion">${faqItems().map(faqHtml).join("")}</div></div></section>${ctaBand()}` }));

  write("404.html", layout({ title: "Page Not Found", path: "", body: `<section class="section" style="text-align:center"><div class="container"><h1 style="font-size:110px;color:var(--accent);margin:0">404</h1><h2>Page not found</h2><p>The page you are looking for does not exist or has moved.</p><a class="btn btn-accent" href="/">Back to Home ${icon("arrowR")}</a></div></section>` }));
}

/* ---------------- Misc ---------------- */
// favicon.png lives in /static
if (0) write("favicon.svg", `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="14" fill="#ff7a00"/><text x="32" y="45" font-family="Arial" font-size="38" font-weight="800" fill="#fff" text-anchor="middle">A</text></svg>`);
write("robots.txt", "User-agent: *\nAllow: /\n");

home();
productsPage();
solutionsPages();
projectsPage();
companyPages();
supportPages();
contactPage();
console.log("Built site into /public");
