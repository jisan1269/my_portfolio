/* =========================================================
   Admin dashboard logic
   ========================================================= */
(function () {
  "use strict";

  const root = document.body;
  const stored = localStorage.getItem("theme");
  root.setAttribute("data-theme", stored || "dark");
  document.getElementById("themeToggle").addEventListener("click", () => {
    const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
  });

  const firebaseReady = !!db && typeof firebaseConfig !== "undefined" && firebaseConfig.apiKey !== "YOUR_API_KEY";
  const loginView = document.getElementById("loginView");
  const dashView = document.getElementById("dashView");
  const loginNote = document.getElementById("loginNote");

  if (!firebaseReady) {
    loginNote.textContent = "Firebase isn't configured yet — fill in firebase-config.js first (see README.md).";
    loginNote.className = "save-note err";
  }

  const auth = firebaseReady ? firebase.auth() : null;

  if (auth) {
    auth.onAuthStateChanged((user) => {
      if (user) {
        loginView.style.display = "none";
        dashView.style.display = "block";
        loadAll();
      } else {
        loginView.style.display = "block";
        dashView.style.display = "none";
      }
    });
  }

  document.getElementById("loginBtn").addEventListener("click", () => {
    if (!auth) return;
    const email = document.getElementById("loginEmail").value.trim();
    const pass = document.getElementById("loginPass").value;
    loginNote.textContent = "Signing in…";
    loginNote.className = "save-note";
    auth.signInWithEmailAndPassword(email, pass).catch((err) => {
      loginNote.textContent = err.message;
      loginNote.className = "save-note err";
    });
  });

  document.getElementById("logoutBtn").addEventListener("click", () => auth && auth.signOut());

  /* ---------------- Tabs ---------------- */
  document.querySelectorAll(".tab-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".tab-btn").forEach((b) => b.classList.remove("active"));
      document.querySelectorAll(".tab-panel").forEach((p) => p.classList.remove("active"));
      btn.classList.add("active");
      document.getElementById("tab-" + btn.dataset.tab).classList.add("active");
    });
  });

  function note(id, text, ok) {
    const el = document.getElementById(id);
    el.textContent = text;
    el.className = "save-note " + (ok ? "ok" : "err");
  }
  function tagsToArray(str) {
    return String(str || "").split(",").map((s) => s.trim()).filter(Boolean);
  }
  const deleteIcon = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M3 6h18M8 6V4h8v2M6 6l1 14h10l1-14" stroke-linecap="round" stroke-linejoin="round"/></svg>';

  function loadAll() {
    loadConfig();
    loadCollection("projects", "projectsAdminList", renderProjectItem);
    loadCollection("research", "researchAdminList", renderResearchItem);
    loadCollection("recognition", "recognitionAdminList", renderRecognitionItem);
    loadCollection("certifications", "certAdminList", renderCertItem);
    loadMessages();
  }

  /* ---------------- Site config ---------------- */
  function loadConfig() {
    db.collection("config").doc("site").get().then((doc) => {
      const cfg = doc.exists ? doc.data() : {};
      document.getElementById("cfgPhoto").value = cfg.photoURL || "";
      document.getElementById("cfgCV").value = cfg.cvURL || "";
      document.getElementById("cfgWork").value = cfg.workPortfolioURL || "";
      document.getElementById("cfgCFHandle").value = cfg.codeforcesHandle || "";
      document.getElementById("cfgCFSolved").value = cfg.codeforcesSolved != null ? cfg.codeforcesSolved : 59;
      document.getElementById("cfgCCHandle").value = cfg.codechefHandle || "";
      document.getElementById("cfgCCSolved").value = cfg.codechefSolved != null ? cfg.codechefSolved : "";
    });
  }

  document.getElementById("saveConfigBtn").addEventListener("click", () => {
    const data = {
      photoURL: document.getElementById("cfgPhoto").value.trim(),
      cvURL: document.getElementById("cfgCV").value.trim(),
      workPortfolioURL: document.getElementById("cfgWork").value.trim(),
      codeforcesHandle: document.getElementById("cfgCFHandle").value.trim(),
      codeforcesSolved: Number(document.getElementById("cfgCFSolved").value) || 0,
      codechefHandle: document.getElementById("cfgCCHandle").value.trim(),
      codechefSolved: document.getElementById("cfgCCSolved").value ? Number(document.getElementById("cfgCCSolved").value) : null
    };
    db.collection("config").doc("site").set(data, { merge: true })
      .then(() => note("configNote", "Saved.", true))
      .catch((err) => note("configNote", err.message, false));
  });

  /* ---------------- Generic collection loader ---------------- */
  function loadCollection(name, listId, renderFn) {
    db.collection(name).orderBy("order", "asc").get().then((snap) => {
      const el = document.getElementById(listId);
      if (snap.empty) {
        el.innerHTML = '<div class="empty-state">Nothing added yet.</div>';
        return;
      }
      el.innerHTML = snap.docs.map((d) => renderFn(d.id, d.data())).join("");
      snap.docs.forEach((d) => {
        const btn = document.getElementById("del-" + name + "-" + d.id);
        if (btn) btn.addEventListener("click", () => {
          if (confirm("Delete this entry?")) {
            db.collection(name).doc(d.id).delete().then(() => loadCollection(name, listId, renderFn));
          }
        });
      });
    });
  }

  function renderProjectItem(id, p) {
    return `<div class="card admin-item">
      <div class="admin-item-body">
        <h4>${p.title || ""} <span style="font-family:var(--font-mono);font-size:.72rem;color:var(--text-muted);">#${p.order}</span></h4>
        <p>${p.description || ""}</p>
        <div class="tag-row" style="margin-top:6px;">${(p.tags || []).map((t) => `<span class="tag">${t}</span>`).join("")}</div>
      </div>
      <div class="admin-item-actions"><button class="icon-btn" id="del-projects-${id}" title="Delete">${deleteIcon}</button></div>
    </div>`;
  }
  function renderResearchItem(id, r) {
    return `<div class="card admin-item">
      <div class="admin-item-body">
        <h4>${r.title || ""}</h4>
        <p>${r.venue ? r.venue + " — " : ""}${r.description || ""}</p>
      </div>
      <div class="admin-item-actions"><button class="icon-btn" id="del-research-${id}" title="Delete">${deleteIcon}</button></div>
    </div>`;
  }
  function renderRecognitionItem(id, g) {
    return `<div class="card admin-item">
      <div class="admin-item-body">
        <h4>${g.title || ""} <span style="font-family:var(--font-mono);font-size:.72rem;color:var(--accent);">${g.category || ""}${g.year ? " · " + g.year : ""}</span></h4>
        <p>${g.description || ""}</p>
      </div>
      <div class="admin-item-actions"><button class="icon-btn" id="del-recognition-${id}" title="Delete">${deleteIcon}</button></div>
    </div>`;
  }
  function renderCertItem(id, c) {
    return `<div class="card admin-item">
      <div class="admin-item-body">
        <h4>${c.title || ""}</h4>
        <p>${c.issuer || ""}${c.year ? " · " + c.year : ""}</p>
      </div>
      <div class="admin-item-actions"><button class="icon-btn" id="del-certifications-${id}" title="Delete">${deleteIcon}</button></div>
    </div>`;
  }

  /* ---------------- Add handlers ---------------- */
  document.getElementById("addProjectBtn").addEventListener("click", () => {
    const data = {
      title: document.getElementById("pTitle").value.trim(),
      description: document.getElementById("pDesc").value.trim(),
      tags: tagsToArray(document.getElementById("pTags").value),
      order: Number(document.getElementById("pOrder").value) || 0,
      github: document.getElementById("pGithub").value.trim(),
      link: document.getElementById("pLink").value.trim()
    };
    if (!data.title) return note("projectNote", "Title is required.", false);
    db.collection("projects").add(data).then(() => {
      note("projectNote", "Project added.", true);
      ["pTitle", "pDesc", "pTags", "pGithub", "pLink"].forEach((id) => document.getElementById(id).value = "");
      loadCollection("projects", "projectsAdminList", renderProjectItem);
    }).catch((err) => note("projectNote", err.message, false));
  });

  document.getElementById("addResearchBtn").addEventListener("click", () => {
    const data = {
      title: document.getElementById("rTitle").value.trim(),
      venue: document.getElementById("rVenue").value.trim(),
      description: document.getElementById("rDesc").value.trim(),
      tags: tagsToArray(document.getElementById("rTags").value),
      link: document.getElementById("rLink").value.trim(),
      order: Number(document.getElementById("rOrder").value) || 0
    };
    if (!data.title) return note("researchNote", "Title is required.", false);
    db.collection("research").add(data).then(() => {
      note("researchNote", "Research entry added.", true);
      ["rTitle", "rVenue", "rDesc", "rTags", "rLink"].forEach((id) => document.getElementById(id).value = "");
      loadCollection("research", "researchAdminList", renderResearchItem);
    }).catch((err) => note("researchNote", err.message, false));
  });

  document.getElementById("addRecognitionBtn").addEventListener("click", () => {
    const data = {
      category: document.getElementById("gCategory").value,
      year: document.getElementById("gYear").value.trim(),
      title: document.getElementById("gTitle").value.trim(),
      description: document.getElementById("gDesc").value.trim(),
      order: Number(document.getElementById("gOrder").value) || 0
    };
    if (!data.title) return note("recognitionNote", "Title is required.", false);
    db.collection("recognition").add(data).then(() => {
      note("recognitionNote", "Added.", true);
      ["gYear", "gTitle", "gDesc"].forEach((id) => document.getElementById(id).value = "");
      loadCollection("recognition", "recognitionAdminList", renderRecognitionItem);
    }).catch((err) => note("recognitionNote", err.message, false));
  });

  document.getElementById("addCertBtn").addEventListener("click", () => {
    const data = {
      title: document.getElementById("tTitle").value.trim(),
      issuer: document.getElementById("tIssuer").value.trim(),
      year: document.getElementById("tYear").value.trim(),
      link: document.getElementById("tLink").value.trim(),
      order: Number(document.getElementById("tOrder").value) || 0
    };
    if (!data.title) return note("certNote", "Title is required.", false);
    db.collection("certifications").add(data).then(() => {
      note("certNote", "Added.", true);
      ["tTitle", "tIssuer", "tYear", "tLink"].forEach((id) => document.getElementById(id).value = "");
      loadCollection("certifications", "certAdminList", renderCertItem);
    }).catch((err) => note("certNote", err.message, false));
  });

  /* ---------------- Messages ---------------- */
  function loadMessages() {
    db.collection("messages").orderBy("createdAt", "desc").get().then((snap) => {
      const el = document.getElementById("messagesList");
      if (snap.empty) {
        el.innerHTML = '<div class="empty-state">No messages yet.</div>';
        return;
      }
      el.innerHTML = snap.docs.map((d) => {
        const m = d.data();
        const when = m.createdAt && m.createdAt.toDate ? m.createdAt.toDate().toLocaleString() : "";
        return `<div class="card admin-item msg-item ${m.read ? "is-read" : ""}">
          <div class="admin-item-body">
            <div class="msg-meta">${m.name || ""} · ${m.email || ""} ${when ? "· " + when : ""}</div>
            <p>${m.message || ""}</p>
          </div>
          <div class="admin-item-actions">
            ${!m.read ? `<button class="icon-btn" id="read-${d.id}" title="Mark as read">✓</button>` : ""}
            <button class="icon-btn" id="delmsg-${d.id}" title="Delete">${deleteIcon}</button>
          </div>
        </div>`;
      }).join("");
      snap.docs.forEach((d) => {
        const readBtn = document.getElementById("read-" + d.id);
        if (readBtn) readBtn.addEventListener("click", () => {
          db.collection("messages").doc(d.id).update({ read: true }).then(loadMessages);
        });
        document.getElementById("delmsg-" + d.id).addEventListener("click", () => {
          if (confirm("Delete this message?")) {
            db.collection("messages").doc(d.id).delete().then(loadMessages);
          }
        });
      });
    });
  }
})();
