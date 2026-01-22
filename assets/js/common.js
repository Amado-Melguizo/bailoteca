document.addEventListener("DOMContentLoaded", () => {
  /* ========== AOS ========== */
  if (window.AOS) {
    AOS.init({ duration: 600, once: true, offset: 80, easing: "ease-out" });
  }

  /* ========== THEME ========== */
  const prefersDark = window.matchMedia?.(
    "(prefers-color-scheme: dark)",
  ).matches;
  const storedTheme = localStorage.getItem("theme");
  applyTheme(storedTheme || (prefersDark ? "dark" : "light"));

  const themeBtn = document.getElementById("themeToggle");
  themeBtn?.addEventListener("click", () => {
    const next =
      document.documentElement.getAttribute("data-theme") === "dark"
        ? "light"
        : "dark";
    applyTheme(next);
    localStorage.setItem("theme", next);
  });

  function applyTheme(t) {
    document.documentElement.setAttribute("data-theme", t);
    const icon = t === "dark" ? "☀️" : "🌙";
    const ic = document.querySelector("#themeToggle .theme-icon");
    if (ic) ic.textContent = icon;
  }

  /* ========== I18N (externo por JSON) ========== */
  let I18N = {}; // Diccionario activo
  let currentLang = localStorage.getItem("lang") || "es";

  async function loadI18n(lang) {
    currentLang = lang;
    const res = await fetch(`../assets/i18n/${lang}.json`);
    if (!res.ok) throw new Error(`i18n ${lang} no encontrado`);
    I18N = await res.json();
    applyLanguage();
  }

  function applyLanguage() {
    document.documentElement.setAttribute("lang", currentLang);

    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      const txt = I18N[key];
      if (typeof txt === "string") el.textContent = txt;
    });

    // data-i18n-attr="attr:key,attr2:key2"
    document.querySelectorAll("[data-i18n-attr]").forEach((el) => {
      const list = (el.getAttribute("data-i18n-attr") || "").split(",");
      list.forEach((pair) => {
        const [attr, key] = pair.split(":").map((s) => s.trim());
        const val = I18N[key];
        if (attr && typeof val === "string") el.setAttribute(attr, val);
      });
    });
  }

  document.querySelectorAll(".langToggle").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const lang = btn.getAttribute("data-lang") || "es";
      localStorage.setItem("lang", lang);
      await loadI18n(lang);
      // Al cambiar idioma, re‑aplicar también en contenido dinámico
      applyLanguage();
    });
  });

  /* ========== BACHATA: Generador dinámico con variaciones ========== */
  async function buildBachata() {
    const tree = document.querySelector("#bachata-tree");
    if (!tree) return;

    // Carga datos
    const res = await fetch("../assets/data/bachata.json");
    if (!res.ok) throw new Error("No se pudo cargar bachata.json");
    const data = await res.json();

    // Limpia y renderiza
    tree.innerHTML = "";

    Object.entries(data).forEach(([levelKey, level]) => {
      const levelDiv = document.createElement("div");
      levelDiv.className = "tree-level";

      const color =
        levelKey === "basic"
          ? "success"
          : levelKey === "intermediate"
            ? "primary"
            : "danger";

      const buttons = level.items
        .map(
          (item) => `
        <button class="btn btn-outline-${color} btn-sm"
          data-bs-toggle="collapse"
          data-bs-target="#${item.id}"
          data-i18n="${item.name}"></button>
      `,
        )
        .join("");

      const panels = level.items
        .map(
          (item) => `
        <div class="collapse mt-3" id="${item.id}">
          <div class="variation-head">
            <h6 class="mb-1" data-i18n="${item.name}"></h6>
            <div class="variation-meta">
              <span class="badge rounded-pill text-bg-secondary">1‑8</span>
              <span class="badge rounded-pill text-bg-light" data-i18n="${level.title}"></span>
            </div>
          </div>

          <p class="variation-desc mt-2 mb-2" data-i18n="${item.desc}"></p>

          <div class="variation-grid">
            <div class="ratio ratio-16x9 video-preview" data-video-id="${item.video || ""}"></div>

            <div class="variation-notes">
              <div class="small text-muted fw-semibold mb-1" data-i18n="lbl.technique"></div>
              <ul class="small mb-2">
                <li data-i18n="${item.tech}"></li>
              </ul>

              <div class="small text-muted fw-semibold mb-1" data-i18n="lbl.errors"></div>
              <ul class="small mb-2">
                <li data-i18n="${item.err}"></li>
              </ul>

              <div class="alert alert-${color} py-2 px-3 mb-0 small">
                <strong data-i18n="lbl.tip"></strong>:
                <span data-i18n="${item.tip}"></span>
              </div>
            </div>
          </div>

          ${
            item.variations && item.variations.length
              ? `
            <div class="d-flex flex-wrap gap-2 align-items-center mb-2 mt-3">
              <span class="badge text-bg-light" data-i18n="variations.show"></span>
              <button class="btn btn-outline-secondary btn-sm"
                data-bs-toggle="collapse"
                data-bs-target="#${item.id}-variaciones"
                data-i18n="variations.button"></button>
            </div>

            <div class="collapse" id="${item.id}-variaciones">
              <ul class="list-group list-group-flush variation-list">
                ${item.variations
                  .map(
                    (v) => `
                  <li class="list-group-item variation-item">
                    <div class="variation-head">
                      <h6 class="mb-1" data-i18n="${v.name}"></h6>
                      <div class="variation-meta">
                        <span class="badge rounded-pill text-bg-secondary">1‑8</span>
                        <span class="badge rounded-pill text-bg-light" data-i18n="${level.title}"></span>
                      </div>
                    </div>

                    <p class="variation-desc mt-2 mb-2" data-i18n="${v.desc}"></p>

                    <div class="variation-grid">
                      <div class="ratio ratio-16x9 video-preview" data-video-id="${v.video || ""}"></div>

                      <div class="variation-notes">
                        <div class="small text-muted fw-semibold mb-1" data-i18n="lbl.technique"></div>
                        <ul class="small mb-2">
                          <li data-i18n="${v.tech}"></li>
                        </ul>

                        <div class="small text-muted fw-semibold mb-1" data-i18n="lbl.errors"></div>
                        <ul class="small mb-2">
                          <li data-i18n="${v.err}"></li>
                        </ul>

                        <div class="alert alert-${levelKey === "advanced" ? "danger" : "primary"} py-2 px-3 mb-0 small">
                          <strong data-i18n="lbl.tip"></strong>:
                          <span data-i18n="${v.tip}"></span>
                        </div>
                      </div>
                    </div>
                  </li>
                `,
                  )
                  .join("")}
              </ul>
            </div>
          `
              : ""
          }

        </div>
      `,
        )
        .join("");

      levelDiv.innerHTML = `
        <div class="tree-node card border-0 shadow-sm hover-lift" data-level="${levelKey}">
          <div class="card-body">
            <h5 class="card-title mb-2" data-i18n="${level.title}"></h5>
            <p class="text-muted small mb-3" data-i18n="${level.description}"></p>
            <div class="d-flex flex-wrap gap-2">${buttons}</div>
            ${panels}
          </div>
        </div>
      `;

      tree.appendChild(levelDiv);
      const connector = document.createElement("div");
      connector.className = "tree-connector";
      tree.appendChild(connector);
    });

    // Traducción y previews
    applyLanguage();
    activateVideoPreviews();
  }

  /* ========== VIDEO PREVIEW ========== */
  function activateVideoPreviews() {
    document.querySelectorAll(".video-preview").forEach((preview) => {
      const id = preview.getAttribute("data-video-id");
      preview.innerHTML = "";
      if (!id) return;

      const img = document.createElement("img");
      img.className = "video-thumb";
      img.alt = "Video preview";
      img.src = `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
      preview.appendChild(img);

      const btn = document.createElement("button");
      btn.className = "video-play";
      btn.setAttribute("aria-label", "Play");
      btn.textContent = "▶";
      preview.appendChild(btn);

      preview.addEventListener(
        "click",
        (e) => {
          e.preventDefault();
          const params = new URLSearchParams({
            autoplay: "1",
            rel: "0",
            modestbranding: "1",
          });
          const iframe = document.createElement("iframe");
          iframe.src = `https://www.youtube.com/embed/${id}?${params.toString()}`;
          iframe.title = "YouTube video";
          iframe.frameBorder = "0";
          iframe.allow =
            "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
          iframe.allowFullscreen = true;
          iframe.loading = "lazy";
          preview.innerHTML = "";
          preview.appendChild(iframe);
          preview.classList.add("is-playing");
        },
        { once: true },
      );
    });
  }

  /* ========== YEAR ========== */
  document
    .querySelectorAll("#year")
    .forEach((el) => (el.textContent = new Date().getFullYear()));

  /* ========== SCROLL TOP ========== */
  const topBtn = document.getElementById("scrollTopBtn");
  if (topBtn) {
    const toggleBtn = () =>
      topBtn.classList.toggle("show", window.scrollY > 300);
    window.addEventListener("scroll", toggleBtn, { passive: true });
    toggleBtn();
    topBtn.addEventListener("click", (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* ========== INIT: carga i18n y construye Bachata ========== */
  (async function init() {
    try {
      await loadI18n(currentLang); // Carga ES/EN externo
      await buildBachata(); // Construye árbol dinámico (con variaciones)
    } catch (e) {
      console.error(e);
    }
  })();
});
``;
