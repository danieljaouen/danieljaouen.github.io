// Lepton OS site interactions. No dependencies.
(() => {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const store = {
    get(k) { try { return localStorage.getItem(k); } catch { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch { /* storage unavailable */ } },
  };

  // Theme -------------------------------------------------------------------
  const root = document.documentElement;
  const saved = store.get("lepton-theme");
  if (saved) root.dataset.theme = saved;
  document.getElementById("theme-toggle").addEventListener("click", () => {
    const current = root.dataset.theme ||
      (window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark");
    const next = current === "light" ? "dark" : "light";
    root.dataset.theme = next;
    store.set("lepton-theme", next);
  });

  // Terminal demo -------------------------------------------------------------
  // Output below is what Lepton actually prints for these commands.
  const prompt = [["g", "root"], ["", " on "], ["b", "lepton"], ["", " at "], ["b", " ~"], ["", "\n"], ["g", "❯ "]];
  const session = [
    { out: [["m", "[lepton] Lepton OS 0.1.0 booting on Linux 6.18.63-0-virt\n[lepton] userland up in 97 ms\n\n"],
            ["", "  "], ["b", "Lepton OS"], ["", " - a Unix-like operating system written in Elixir\n\n"]] },
    { cmd: "uname -a", out: [["", "Linux lepton 6.18.63-0-virt Lepton 0.1.0 (Elixir 1.20.5, OTP 29) aarch64 Lepton\n"]] },
    { cmd: "ip addr | grep inet", out: [["", "    inet 10.0.2.15/24 scope global dynamic eth0\n    inet 127.0.0.1/8 scope host lo\n"]] },
    { cmd: "git --version", out: [["", "git version 2.45.0 (lepton, Elixir 1.20.5)\n"]] },
    { cmd: "lpm list", out: [["", "decimal                  2.4.1\n"]] },
    { cmd: "lepton-test", out: [["", "Lepton self-test: 7 files from /usr/share/lepton/test; excluding []\n"],
                                ["g", "..................................................................................\n\n"],
                                ["", "Finished in 3.9 seconds\n"], ["g", "105 tests, 0 failures\n"]] },
  ];

  const term = document.getElementById("term");
  let timers = [];
  const clear = () => { timers.forEach(clearTimeout); timers = []; term.textContent = ""; };
  const span = (cls, text) => {
    const s = document.createElement("span");
    if (cls) s.className = cls;
    s.textContent = text;
    term.appendChild(s);
    return s;
  };
  const cursor = () => { const c = span("cursor", " "); return c; };

  function renderInstant() {
    clear();
    for (const step of session) {
      if (step.cmd) { prompt.forEach(([c, t]) => span(c, t)); span("", step.cmd + "\n"); }
      step.out.forEach(([c, t]) => span(c, t));
    }
    prompt.forEach(([c, t]) => span(c, t));
    cursor();
  }

  function play() {
    if (reduceMotion) return renderInstant();
    clear();
    let t = 600;
    const at = (ms, fn) => timers.push(setTimeout(fn, ms));
    let cur = null;
    // The boot banner appears at once so the terminal is never empty.
    const [boot, ...commands] = session;
    boot.out.forEach(([c, x]) => span(c, x));

    for (const step of commands) {
      if (step.cmd) {
        at(t, () => { prompt.forEach(([c, x]) => span(c, x)); cur = cursor(); });
        t += 450;
        for (const ch of step.cmd) {
          at(t, () => { cur.before(document.createTextNode(ch)); });
          t += 38 + Math.random() * 45;
        }
        t += 250;
        at(t, () => { cur.remove(); span("", "\n"); });
        t += 120;
      }
      for (const [c, x] of step.out) {
        at(t, () => { span(c, x); term.scrollTop = term.scrollHeight; });
        t += 160;
      }
      t += 500;
    }
    at(t, () => { prompt.forEach(([c, x]) => span(c, x)); cursor(); term.scrollTop = term.scrollHeight; });
  }

  document.getElementById("replay").addEventListener("click", play);
  play();

  // Tabs (WAI-ARIA pattern with arrow keys) --------------------------------------
  document.querySelectorAll("[data-tabs]").forEach((tabs) => {
    const buttons = [...tabs.querySelectorAll('[role="tab"]')];
    const select = (btn) => {
      buttons.forEach((b) => {
        const on = b === btn;
        b.setAttribute("aria-selected", on);
        b.tabIndex = on ? 0 : -1;
        document.getElementById(b.getAttribute("aria-controls")).hidden = !on;
      });
    };
    buttons.forEach((b, i) => {
      b.addEventListener("click", () => select(b));
      b.addEventListener("keydown", (e) => {
        const d = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
        if (!d) return;
        const next = buttons[(i + d + buttons.length) % buttons.length];
        select(next);
        next.focus();
        e.preventDefault();
      });
    });
  });

  // Copy buttons ----------------------------------------------------------------
  document.querySelectorAll(".copy-block").forEach((block) => {
    const btn = block.querySelector(".copy");
    btn.addEventListener("click", async () => {
      const text = block.querySelector("code").innerText;
      try {
        await navigator.clipboard.writeText(text);
        btn.textContent = "Copied";
      } catch {
        btn.textContent = "Select & copy";
      }
      setTimeout(() => (btn.textContent = "Copy"), 1600);
    });
  });

  // Lightbox ---------------------------------------------------------------------
  const box = document.getElementById("lightbox");
  const boxImg = document.getElementById("lightbox-img");
  const boxCap = document.getElementById("lightbox-caption");
  document.querySelectorAll(".shot").forEach((shot) => {
    shot.addEventListener("click", () => {
      boxImg.src = shot.dataset.full;
      boxImg.alt = shot.querySelector("img").alt;
      boxCap.textContent = shot.dataset.caption;
      if (typeof box.showModal === "function") box.showModal();
      else window.open(shot.dataset.full, "_blank");
    });
  });
  box.addEventListener("click", (e) => { if (e.target === box) box.close(); });

  // Scrollspy ------------------------------------------------------------------------
  const links = [...document.querySelectorAll(".nav-links a")];
  const sections = links.map((a) => document.querySelector(a.getAttribute("href")));
  const spy = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (!en.isIntersecting) return;
      links.forEach((a) => a.classList.toggle("active", a.getAttribute("href") === "#" + en.target.id));
    });
  }, { rootMargin: "-45% 0px -50% 0px" });
  sections.forEach((s) => s && spy.observe(s));

  // Reveal on scroll and counting stats -----------------------------------------------
  if (!reduceMotion && "IntersectionObserver" in window) {
    const items = document.querySelectorAll(".card, .step, .rm, .layer, .gallery figure, .timeline li");
    items.forEach((el) => el.classList.add("reveal"));
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } });
    }, { threshold: 0.12 });
    items.forEach((el) => io.observe(el));

    const counters = document.querySelectorAll("[data-count]");
    const cio = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        const el = en.target;
        const end = Number(el.dataset.count);
        const start = performance.now();
        const tick = (now) => {
          const p = Math.min((now - start) / 1100, 1);
          el.textContent = Math.round(end * (1 - Math.pow(1 - p, 3))).toLocaleString("en-US");
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        cio.unobserve(el);
      });
    }, { threshold: 0.6 });
    counters.forEach((el) => cio.observe(el));
  }
})();
