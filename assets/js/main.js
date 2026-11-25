/* Automatica — site interactions (vanilla JS, no dependencies) */
(function () {
  "use strict";
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));

  /* ---- Sticky header ---- */
  const header = $(".site-header");
  const spacer = $(".header-spacer");
  let stickAt = 0;
  function calcStick() {
    if (!header) return;
    stickAt = header.offsetTop + header.offsetHeight + 60;
  }
  function onScroll() {
    const y = window.scrollY;
    if (header) {
      const stuck = y > stickAt;
      if (stuck !== header.classList.contains("is-sticky")) {
        header.classList.toggle("is-sticky", stuck);
        const nav = window.innerWidth > 1024 ? $(".header-nav") : $(".header-main");
        if (spacer) spacer.style.height = stuck && nav ? nav.offsetHeight + "px" : "0";
      }
    }
    const tt = $(".to-top");
    if (tt) tt.classList.toggle("show", y > 600);
  }
  calcStick();
  window.addEventListener("resize", calcStick);
  window.addEventListener("scroll", onScroll, { passive: true });
  $(".to-top")?.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

  /* ---- Off-canvas mobile menu ---- */
  const oc = $(".offcanvas");
  const openOc = () => { oc?.classList.add("open"); document.body.style.overflow = "hidden"; };
  const closeOc = () => { oc?.classList.remove("open"); document.body.style.overflow = ""; };
  $$("[data-open-menu]").forEach((b) => b.addEventListener("click", (e) => { e.preventDefault(); openOc(); }));
  $$(".oc-close, .offcanvas-backdrop").forEach((b) => b.addEventListener("click", closeOc));
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeOc(); });
  $$(".oc-tabs button").forEach((btn) =>
    btn.addEventListener("click", () => {
      $$(".oc-tabs button").forEach((b) => b.classList.toggle("active", b === btn));
      $$(".oc-pane").forEach((p) => p.classList.toggle("active", p.id === btn.dataset.pane));
    })
  );
  $$(".oc-row button").forEach((btn) =>
    btn.addEventListener("click", () => {
      const sub = btn.parentElement.nextElementSibling;
      const open = btn.getAttribute("aria-expanded") === "true";
      btn.setAttribute("aria-expanded", String(!open));
      sub.style.maxHeight = open ? "0" : sub.scrollHeight + "px";
    })
  );

  /* ---- Rotating search placeholder ---- */
  const search = $(".header-search input");
  if (search) {
    const words = (search.dataset.hints || "").split("|").filter(Boolean);
    let i = 0;
    if (words.length) setInterval(() => { i = (i + 1) % words.length; search.placeholder = "Search for " + words[i] + "..."; }, 2600);
  }

  /* ---- Hero slider ---- */
  const hero = $(".hero");
  if (hero) {
    const slides = $$(".hero-slide", hero);
    const dots = $$(".hero-dots button, .hero-tabs button", hero);
    const prog = $(".hero-progress", hero);
    let idx = 0, timer;
    const go = (n) => {
      idx = (n + slides.length) % slides.length;
      slides.forEach((s, k) => s.classList.toggle("active", k === idx));
      dots.forEach((d, k) => d.classList.toggle("active", k === idx));
      if (prog) { prog.classList.remove("run"); void prog.offsetWidth; prog.classList.add("run"); }
      clearTimeout(timer);
      timer = setTimeout(() => go(idx + 1), 6000);
    };
    dots.forEach((d, k) => d.addEventListener("click", () => go(k)));
    $(".hero-prev", hero)?.addEventListener("click", () => go(idx - 1));
    $(".hero-next", hero)?.addEventListener("click", () => go(idx + 1));
    let sx = 0;
    hero.addEventListener("touchstart", (e) => (sx = e.touches[0].clientX), { passive: true });
    hero.addEventListener("touchend", (e) => {
      const dx = e.changedTouches[0].clientX - sx;
      if (Math.abs(dx) > 50) go(idx + (dx < 0 ? 1 : -1));
    });
    go(0);
  }

  /* ---- Scroll reveal ---- */
  const io = "IntersectionObserver" in window
    ? new IntersectionObserver((entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) {
            const el = en.target;
            setTimeout(() => el.classList.add("in"), Number(el.dataset.delay || 0));
            io.unobserve(el);
          }
        });
      }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" })
    : null;
  $$(".reveal").forEach((el) => (io ? io.observe(el) : el.classList.add("in")));

  /* ---- Counters ---- */
  const cio = "IntersectionObserver" in window
    ? new IntersectionObserver((entries) => {
        entries.forEach((en) => {
          if (!en.isIntersecting) return;
          const el = en.target, end = Number(el.dataset.count), dur = 1800, t0 = performance.now();
          const step = (t) => {
            const p = Math.min((t - t0) / dur, 1), e = 1 - Math.pow(1 - p, 3);
            el.textContent = Math.round(end * e).toLocaleString();
            if (p < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
          cio.unobserve(el);
        });
      }, { threshold: 0.4 })
    : null;
  $$("[data-count]").forEach((el) => (cio ? cio.observe(el) : (el.textContent = el.dataset.count)));

  /* ---- Product tabs / filters ---- */
  $$("[data-tabs]").forEach((wrap) => {
    const grid = $(wrap.dataset.tabs);
    $$("button", wrap).forEach((btn) =>
      btn.addEventListener("click", () => {
        $$("button", wrap).forEach((b) => b.classList.toggle("active", b === btn));
        const f = btn.dataset.filter;
        $$(".product", grid).forEach((p, k) => {
          const show = f === "all" || (p.dataset.tags || "").includes(f);
          p.style.display = show ? "" : "none";
          if (show) { p.classList.remove("in"); setTimeout(() => p.classList.add("in"), 40 + k * 40); }
        });
      })
    );
  });

  /* ---- Load more ---- */
  $$("[data-load-more]").forEach((btn) => {
    const grid = $(btn.dataset.loadMore);
    const step = Number(btn.dataset.step || 6);
    const items = $$(":scope > *", grid);
    let shown = step;
    const apply = () => items.forEach((it, k) => (it.style.display = k < shown ? "" : "none"));
    apply();
    if (items.length <= shown) btn.style.display = "none";
    btn.addEventListener("click", () => {
      shown += step; apply();
      items.slice(shown - step, shown).forEach((it) => it.classList.add("in"));
      if (shown >= items.length) btn.style.display = "none";
    });
  });

  /* ---- Quote list (localStorage, per-visitor) ---- */
  const KEY = "automatica-quote";
  const read = () => { try { return JSON.parse(localStorage.getItem(KEY) || "[]"); } catch { return []; } };
  const write = (v) => { try { localStorage.setItem(KEY, JSON.stringify(v)); } catch {} };
  const paint = () => $$(".quote-count").forEach((c) => (c.textContent = read().length));
  const toast = $(".toast");
  const showToast = (msg) => {
    if (!toast) return;
    $(".toast-msg", toast).textContent = msg;
    toast.classList.add("show");
    clearTimeout(showToast.t);
    showToast.t = setTimeout(() => toast.classList.remove("show"), 2600);
  };
  $$("[data-quote]").forEach((b) =>
    b.addEventListener("click", (e) => {
      e.preventDefault();
      const list = read();
      if (!list.includes(b.dataset.quote)) list.push(b.dataset.quote);
      write(list); paint();
      showToast(b.dataset.quote + " added to your quotation list");
    })
  );
  $$("[data-wish]").forEach((b) =>
    b.addEventListener("click", (e) => { e.preventDefault(); b.classList.toggle("on"); showToast("Saved to wishlist"); })
  );
  paint();
  const ql = $("#quote-items");
  if (ql) {
    const list = read();
    ql.value = list.length ? "Quotation request for:\n- " + list.join("\n- ") + "\n\n" : "";
  }

  /* ---- Forms: send to WhatsApp ---- */
  $$("form[data-whatsapp]").forEach((f) =>
    f.addEventListener("submit", (e) => {
      e.preventDefault();
      const lines = ["*" + (f.dataset.subject || "Website enquiry") + "*"];
      new FormData(f).forEach((v, k) => { if (String(v).trim()) lines.push(k + ": " + v); });
      window.open("https://wa.me/" + f.dataset.whatsapp + "?text=" + encodeURIComponent(lines.join("\n")), "_blank", "noopener");
      const note = $(".form-note", f);
      if (note) note.classList.add("show");
      if (f.dataset.clearQuote) { write([]); paint(); }
    })
  );

  /* ---- Forms (mail fallback) ---- */
  $$("form[data-mailto]").forEach((f) =>
    f.addEventListener("submit", (e) => {
      e.preventDefault();
      const data = new FormData(f);
      const lines = [];
      data.forEach((v, k) => lines.push(k + ": " + v));
      const subject = encodeURIComponent(f.dataset.subject || "Website enquiry");
      window.location.href = "mailto:" + f.dataset.mailto + "?subject=" + subject + "&body=" + encodeURIComponent(lines.join("\n"));
      const note = $(".form-note", f);
      if (note) note.classList.add("show");
      if (f.dataset.clearQuote) { write([]); paint(); }
    })
  );

  /* ---- Cursor glow on cards ---- */
  if (window.matchMedia("(hover:hover)").matches) {
    $$(".feature, .range-card, .contact-card, .trust-item, .office").forEach((el) => {
      el.classList.add("glow");
      el.addEventListener("mousemove", (e) => {
        const r = el.getBoundingClientRect();
        el.style.setProperty("--mx", e.clientX - r.left + "px");
        el.style.setProperty("--my", e.clientY - r.top + "px");
      });
    });
  }

  /* ---- Year ---- */
  $$(".yr-now").forEach((y) => (y.textContent = new Date().getFullYear()));
})();
