/* =========================================================
   Portfolio front-end logic
   ========================================================= */

(function () {
  "use strict";

  /* ---------------- Theme ---------------- */
  const root = document.body;
  const stored = localStorage.getItem("theme");
  const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  root.setAttribute("data-theme", stored || (prefersDark ? "dark" : "light"));

  function toggleTheme() {
    const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
  }
  document.getElementById("themeToggle").addEventListener("click", toggleTheme);
  document.getElementById("themeToggleMobile").addEventListener("click", toggleTheme);

  /* ---------------- Nav data ---------------- */
  const navItems = [
    { idx: "00", label: "Home", href: "#hero" },
    { idx: "01", label: "About", href: "#about" },
    { idx: "02", label: "Education", href: "#education" },
    { idx: "03", label: "Career", href: "#career" },
    { idx: "04", label: "Research", href: "#research" },
    { idx: "05", label: "Projects", href: "#projects" },
    { idx: "06", label: "Expertise", href: "#expertise" },
    { idx: "07", label: "Problem Solving", href: "#problem-solving" },
    { idx: "08", label: "Recognition", href: "#recognition" },
    { idx: "09", label: "Growth", href: "#growth" },
    { idx: "10", label: "Hobbies", href: "#hobbies" },
    { idx: "11", label: "Contact", href: "#contact" }
  ];

  function buildNav(container) {
    container.innerHTML = navItems.map(
      (item) => `<li><a href="${item.href}" data-target="${item.href}"><span class="idx">${item.idx}</span>${item.label}</a></li>`
    ).join("");
  }
  buildNav(document.getElementById("navList"));
  buildNav(document.getElementById("mobileNavList"));

  /* ---------------- Socials ---------------- */
  const icons = {
    mail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    github: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.1 2.8 5 3.1 5 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 3.6 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    linkedin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/><path d="M10 9v12M10 13c0-2 2-4 4.5-4S19 11 19 13v8" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    facebook: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M15 8h2V5h-2a4 4 0 0 0-4 4v2H9v3h2v6h3v-6h2.5l.5-3H14V9c0-.6.4-1 1-1z" stroke-linejoin="round"/></svg>',
    instagram: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none"/></svg>'
  };

  const socials = [
    { key: "mail", href: "mailto:mehfujurrahmanjisan@gmail.com", label: "Email" },
    { key: "github", href: "https://github.com/jisan1269", label: "GitHub" },
    { key: "linkedin", href: "https://www.linkedin.com/in/mehfujur-rahman-jisan-b710a03b0", label: "LinkedIn" },
    { key: "facebook", href: "https://www.facebook.com/desoza.chang", label: "Facebook" },
    { key: "instagram", href: "https://www.instagram.com/zeeshan_mehfuz?utm_source=qr&igsh=NGxydTFqNXN3NjZx", label: "Instagram" }
  ];

  function buildSocial(container, mini) {
    container.innerHTML = socials.map(
      (s) => `<a href="${s.href}" target="_blank" rel="noopener" aria-label="${s.label}" title="${s.label}">${icons[s.key]}</a>`
    ).join("");
  }
  buildSocial(document.getElementById("socialRow"));
  buildSocial(document.getElementById("socialMini"), true);
  buildSocial(document.getElementById("socialMiniMobile"), true);

  /* ---------------- Mobile menu ---------------- */
  const mobileMenu = document.getElementById("mobileMenu");
  document.getElementById("burgerBtn").addEventListener("click", () => mobileMenu.classList.add("open"));
  mobileMenu.addEventListener("click", (e) => {
    if (e.target === mobileMenu || e.target.closest("a")) mobileMenu.classList.remove("open");
  });

  /* ---------------- Scroll spy + reveal ---------------- */
  const sections = document.querySelectorAll(".section");
  const navLinks = document.querySelectorAll(".nav-list a");

  const spyObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = "#" + entry.target.id;
          navLinks.forEach((a) => a.classList.toggle("active", a.getAttribute("data-target") === id));
        }
      });
    },
    { rootMargin: "-40% 0px -55% 0px" }
  );
  sections.forEach((s) => spyObserver.observe(s));

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));

  document.getElementById("year").textContent = new Date().getFullYear();

  /* ---------------- Firestore-backed content ---------------- */
  // Guard: if firebase-config.js still has placeholder keys, skip network calls
  // and just show empty states gracefully instead of throwing errors.
  const firebaseReady = !!db && typeof firebaseConfig !== "undefined" && firebaseConfig.apiKey !== "YOUR_API_KEY";

  function escapeHtml(str) {
    return String(str || "").replace(/[&<>"']/g, (c) => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
    }[c]));
  }

  function emptyState(title, body) {
    return `<div class="empty-state"><div class="big">${title}</div>${body}</div>`;
  }

  /* --- Site config (photo, CV, work portfolio link, CP stats) --- */
  function applyConfig(cfg) {
    if (cfg.photoURL) {
      const img = document.getElementById("portraitImg");
      const ph = document.getElementById("portraitPlaceholder");
      img.src = cfg.photoURL;
      img.style.display = "block";
      ph.style.display = "none";
    }
    const cvBtn = document.getElementById("cvBtn");
    if (cfg.cvURL) {
      cvBtn.href = cfg.cvURL;
      cvBtn.classList.remove("is-disabled");
      cvBtn.textContent = "Download CV";
    } else {
      cvBtn.textContent = "CV coming soon";
    }
    const workBtn = document.getElementById("workBtn");
    if (cfg.workPortfolioURL) {
      workBtn.href = cfg.workPortfolioURL;
      workBtn.target = "_blank";
      workBtn.rel = "noopener";
    }

    // Problem solving stats
    const stats = [
      {
        label: "Codeforces",
        value: cfg.codeforcesSolved != null ? cfg.codeforcesSolved : 59,
        unit: "solved",
        href: cfg.codeforcesHandle ? `https://codeforces.com/profile/${cfg.codeforcesHandle}` : null
      },
      {
        label: "CodeChef",
        value: cfg.codechefSolved != null ? cfg.codechefSolved : null,
        unit: "solved",
        href: cfg.codechefHandle ? `https://www.codechef.com/users/${cfg.codechefHandle}` : null
      },
      {
        label: "Total practice",
        value: (cfg.codeforcesSolved != null ? cfg.codeforcesSolved : 59) + (cfg.codechefSolved || 0),
        unit: "problems",
        href: null
      }
    ];
    const statRow = document.getElementById("statRow");
    statRow.innerHTML = stats.map((s) => {
      const inner = `
        <div class="stat-num">${s.value != null ? s.value : "—"}${s.value != null ? ` <span class="unit">${s.unit}</span>` : ""}</div>
        <div class="stat-label">${s.label}${s.value == null ? " · coming soon" : ""}</div>`;
      return s.href
        ? `<a class="card stat-card" href="${s.href}" target="_blank" rel="noopener">${inner}</a>`
        : `<div class="card stat-card">${inner}</div>`;
    }).join("");
  }

  // Sensible defaults so the page looks complete even before Firebase is connected
  applyConfig({ codeforcesSolved: 59, codechefSolved: null });

  if (firebaseReady) {
    db.collection("config").doc("site").get().then((doc) => {
      if (doc.exists) applyConfig(doc.data());
    }).catch((err) => console.warn("Config load failed:", err));
  }

  /* --- Projects --- */
  function renderProjects(items) {
    const el = document.getElementById("projectsList");
    if (!items.length) {
      el.innerHTML = emptyState("Projects coming soon", "I'm adding project write-ups here as I finish polishing them — check back soon, or view my code directly on GitHub.");
      return;
    }
    el.innerHTML = items.map((p) => `
      <div class="card proj-card">
        <h3>${escapeHtml(p.title)}</h3>
        <p>${escapeHtml(p.description)}</p>
        ${p.tags && p.tags.length ? `<div class="tag-row">${p.tags.map((t) => `<span class="tag">${escapeHtml(t)}</span>`).join("")}</div>` : ""}
        <div class="proj-links">
          ${p.github ? `<a href="${escapeHtml(p.github)}" target="_blank" rel="noopener">View code on GitHub →</a>` : ""}
          ${p.link ? `<a href="${escapeHtml(p.link)}" target="_blank" rel="noopener">Live demo →</a>` : ""}
        </div>
      </div>`).join("");
  }
  renderProjects([]);

  /* --- Research --- */
  function renderResearch(items) {
    const el = document.getElementById("researchList");
    if (!items.length) {
      el.innerHTML = emptyState("In progress", "I'm currently working on my first research project. Details, publications, and prototypes will be added here as they take shape.");
      return;
    }
    el.innerHTML = items.map((r) => `
      <div class="card proj-card">
        <h3>${escapeHtml(r.title)}</h3>
        ${r.venue ? `<div class="tl-period">${escapeHtml(r.venue)}</div>` : ""}
        <p>${escapeHtml(r.description)}</p>
        ${r.tags && r.tags.length ? `<div class="tag-row">${r.tags.map((t) => `<span class="tag">${escapeHtml(t)}</span>`).join("")}</div>` : ""}
        ${r.link ? `<div class="proj-links"><a href="${escapeHtml(r.link)}" target="_blank" rel="noopener">Read more →</a></div>` : ""}
      </div>`).join("");
  }
  renderResearch([]);

  /* --- Recognition --- */
  const trophyIcon = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M8 4h8v4a4 4 0 0 1-8 0V4z"/><path d="M8 4H4v1a4 4 0 0 0 4 4M16 4h4v1a4 4 0 0 1-4 4M12 12v4M9 20h6M10 16h4v4h-4z" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  const leadIcon = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="8" r="3.5"/><path d="M5 20c0-3.9 3.1-7 7-7s7 3.1 7 7" stroke-linecap="round"/></svg>';

  function renderRecognition(items) {
    const el = document.getElementById("recognitionList");
    if (!items.length) {
      el.innerHTML = emptyState("Achievements coming soon", "Awards and leadership roles will be listed here as they happen.");
      return;
    }
    el.innerHTML = items.map((r) => `
      <div class="card recog-item">
        <div class="recog-badge">${r.category === "leadership" ? leadIcon : trophyIcon}</div>
        <div>
          <div class="tl-top" style="margin-bottom:2px;">
            <span class="tl-title" style="font-size:1rem;">${escapeHtml(r.title)}</span>
            ${r.year ? `<span class="recog-year">${escapeHtml(r.year)}</span>` : ""}
          </div>
          <p style="margin:0;font-size:.9rem;">${escapeHtml(r.description || "")}</p>
        </div>
      </div>`).join("");
  }
  renderRecognition([]);

  /* --- Certifications --- */
  function renderCertifications(items) {
    const el = document.getElementById("certificationsList");
    if (!items.length) {
      el.innerHTML = emptyState("Certifications coming soon", "Courses and certifications will be listed here as they're completed.");
      return;
    }
    el.innerHTML = items.map((c) => `
      <div class="card">
        <h3 style="font-size:1rem;">${escapeHtml(c.title)}</h3>
        <p style="margin:4px 0;font-size:.9rem;">${escapeHtml(c.issuer || "")}${c.year ? " · " + escapeHtml(c.year) : ""}</p>
        ${c.link ? `<a href="${escapeHtml(c.link)}" target="_blank" rel="noopener" style="font-size:.85rem;font-weight:600;color:var(--accent);text-decoration:none;">View certificate →</a>` : ""}
      </div>`).join("");
  }
  renderCertifications([]);

  if (firebaseReady) {
    db.collection("projects").orderBy("order", "asc").get()
      .then((snap) => renderProjects(snap.docs.map((d) => d.data())))
      .catch(() => renderProjects([]));

    db.collection("research").orderBy("order", "asc").get()
      .then((snap) => renderResearch(snap.docs.map((d) => d.data())))
      .catch(() => renderResearch([]));

    db.collection("recognition").orderBy("order", "asc").get()
      .then((snap) => renderRecognition(snap.docs.map((d) => d.data())))
      .catch(() => renderRecognition([]));

    db.collection("certifications").orderBy("order", "asc").get()
      .then((snap) => renderCertifications(snap.docs.map((d) => d.data())))
      .catch(() => renderCertifications([]));
  }

  /* ---------------- Contact form ---------------- */
  const form = document.getElementById("contactForm");
  const status = document.getElementById("formStatus");
  const sendBtn = document.getElementById("sendBtn");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("cName").value.trim();
    const email = document.getElementById("cEmail").value.trim();
    const message = document.getElementById("cMsg").value.trim();

    if (!name || !email || !message) {
      status.textContent = "Please fill in every field.";
      status.className = "form-status err";
      return;
    }
    if (!firebaseReady) {
      status.textContent = "Messaging isn't connected yet — reach out directly via email for now.";
      status.className = "form-status err";
      return;
    }

    sendBtn.disabled = true;
    sendBtn.textContent = "Sending…";

    db.collection("messages").add({
      name, email, message,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      read: false
    }).then(() => {
      status.textContent = "Message sent — thank you! I'll get back to you soon.";
      status.className = "form-status ok";
      form.reset();
    }).catch((err) => {
      console.error(err);
      status.textContent = "Something went wrong sending your message. Please try again.";
      status.className = "form-status err";
    }).finally(() => {
      sendBtn.disabled = false;
      sendBtn.textContent = "Send message";
    });
  });
})();
