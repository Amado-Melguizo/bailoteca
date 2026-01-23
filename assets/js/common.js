document.addEventListener("DOMContentLoaded", () => {
  /* ===========================================
      HELPERS DE RUTA (root-aware)
    ============================================ */
  function resolveRoot() {
    // Normaliza por si Windows devuelve backslashes y elimina querystring
    const path = location.pathname.split("?")[0].replace(/\\/g, "/");
    return path.includes("/pages/") ? "../" : "./";
  }
  function asset(relPath) {
    return `${resolveRoot()}${relPath}`;
  }

  /* ========== AOS ========== */
  if (window.AOS) {
    AOS.init({ duration: 600, once: true, offset: 80, easing: "ease-out" });
  }

  /* ========== THEME ========== */
  function applyTheme(t) {
    document.documentElement.setAttribute("data-theme", t);
    const icon = t === "dark" ? "☀️" : "🌙";
    const ic = document.querySelector("#themeToggle .theme-icon");
    if (ic) ic.textContent = icon;
  }
  function bindThemeToggle() {
    const themeBtn = document.getElementById("themeToggle");
    if (!themeBtn) return;
    themeBtn.addEventListener("click", () => {
      const next =
        document.documentElement.getAttribute("data-theme") === "dark"
          ? "light"
          : "dark";
      applyTheme(next);
      localStorage.setItem("theme", next);
    });
  }
  // Theme inicial (antes de cargar parciales para evitar "flash")
  const prefersDark = window.matchMedia?.(
    "(prefers-color-scheme: dark)",
  )?.matches;
  const storedTheme = localStorage.getItem("theme");
  applyTheme(storedTheme || (prefersDark ? "dark" : "light"));

  /* ========== I18N (externo por JSON) ========== */
  let I18N = {}; // Diccionario activo
  let currentLang = localStorage.getItem("lang") || "es";

  async function loadI18n(lang) {
    currentLang = lang;
    const url = asset(`assets/i18n/${lang}.json`);
    const res = await fetch(url);
    if (!res.ok) throw new Error(`i18n ${lang} no encontrado en ${url}`);
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

  function bindLangToggles() {
    // Evita duplicar listeners si se reinyecta NAV
    document.querySelectorAll(".langToggle").forEach((btn) => {
      btn.replaceWith(btn.cloneNode(true));
    });
    document.querySelectorAll(".langToggle").forEach((btn) => {
      btn.addEventListener("click", async () => {
        const lang = btn.getAttribute("data-lang") || "es";
        localStorage.setItem("lang", lang);
        await loadI18n(lang);
        applyLanguage();
      });
    });
  }

  /* ========== GENERIC DANCE TREE BUILDER (5 niveles → 3 tiers visuales) ========== */
  async function buildDanceTree({ containerId, dataPath }) {
    const container = document.querySelector(containerId);
    if (!container) return;

    const res = await fetch(asset(dataPath));
    if (!res.ok) throw new Error(`No se pudo cargar ${dataPath}`);
    const data = await res.json();

    container.innerHTML = "";

    // Mapeo semántico (5 niveles) → tier visual (3 niveles)
    const tierOf = (levelKey) => {
      if (levelKey === "foundation" || levelKey === "beginner") return "basic";
      if (levelKey === "improver" || levelKey === "intermediate")
        return "intermediate";
      return "advanced";
    };
    const colorOf = (tier) =>
      tier === "basic"
        ? "success"
        : tier === "intermediate"
          ? "primary"
          : "danger";

    Object.entries(data).forEach(([levelKey, level]) => {
      const tier = tierOf(levelKey);
      const color = colorOf(tier);

      const levelDiv = document.createElement("div");
      levelDiv.className = "tree-level";

      const buttons = (level.items || [])
        .map(
          (item) => `
        <button class="btn btn-outline-${color} btn-sm"
          data-bs-toggle="collapse"
          data-bs-target="#${item.id}"
          data-i18n="${item.name}"></button>
      `,
        )
        .join("");

      const panels = (level.items || [])
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

                        <div class="alert alert-${tier === "advanced" ? "danger" : "primary"} py-2 px-3 mb-0 small">
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
        <div class="tree-node card border-0 shadow-sm hover-lift"data-level="${levelKey}" data-level="${tier}">
          <div class="card-body">
            <h5 class="card-title mb-2" data-i18n="${level.title}"></h5>
            <p class="text-muted small mb-3" data-i18n="${level.description}"></p>
            <div class="d-flex flex-wrap gap-2">${buttons}</div>
            ${panels}
          </div>
        </div>
      `;

      container.appendChild(levelDiv);
      const connector = document.createElement("div");
      connector.className = "tree-connector";
      container.appendChild(connector);
    });

    // Traducciones y previews
    applyLanguage();
    activateVideoPreviews();
  }

  /* ========== WRAPPERS: Bachata / Salsa Cubana / Salsa en Línea ========== */
  async function buildBachata() {
    await buildDanceTree({
      containerId: "#bachata-tree",
      dataPath: "assets/data/bachata.json",
    });
  }
  async function buildSalsaCubana() {
    await buildDanceTree({
      containerId: "#salsa-cubana-tree",
      dataPath: "assets/data/salsa-cubana.json",
    });
  }
  async function buildSalsaLinea() {
    await buildDanceTree({
      containerId: "#salsa-linea-tree",
      dataPath: "assets/data/salsa-linea.json",
    });
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

  /* ===========================================
      LOAD PARTIALS (NAV + FOOTER)
      Funciona en raíz y en /pages/ automáticamente.
    ============================================ */
  async function includePartials() {
    const navMount = document.getElementById("app-nav");
    const footerMount = document.getElementById("app-footer");
    if (!navMount && !footerMount) return;

    const root = resolveRoot();
    const applyRoot = (html) => html.replaceAll("{{root}}", root);

    // NAVBAR
    if (navMount) {
      try {
        const navUrl = `${root}assets/partials/nav.html`;
        const res = await fetch(navUrl);
        if (!res.ok) throw new Error(`No se encontró nav.html en ${navUrl}`);
        const navHtml = applyRoot(await res.text());
        navMount.innerHTML = navHtml;
      } catch (error) {
        console.error("Error cargando NAV:", error);
      }
    }

    // FOOTER
    if (footerMount) {
      try {
        const footerUrl = `${root}assets/partials/footer.html`;
        const res = await fetch(footerUrl);
        if (!res.ok)
          throw new Error(`No se encontró footer.html en ${footerUrl}`);
        const footerHtml = applyRoot(await res.text());
        footerMount.innerHTML = footerHtml;
      } catch (error) {
        console.error("Error cargando FOOTER:", error);
      }
    }

    // Re‑bind de toolbar del NAV recién inyectado
    bindThemeToggle();
    bindLangToggles();

    // Reaplicar idioma y previews y actualizar año
    applyLanguage();
    activateVideoPreviews?.();
    document
      .querySelectorAll("#year")
      .forEach((el) => (el.textContent = new Date().getFullYear()));
  }

  /* Cerrar cualquier otro panel al abrir uno nuevo */
  document.addEventListener("show.bs.collapse", function (e) {
    document.querySelectorAll(".collapse.show").forEach((open) => {
      if (open !== e.target) {
        const collapse = bootstrap.Collapse.getInstance(open);
        collapse?.hide();
      }
    });
  });

  function activarEnlacesLeyenda() {
    document.querySelectorAll(".legend-link").forEach((badge) => {
      badge.addEventListener("click", () => {
        const level = badge.dataset.targetLevel;
        if (!level) return;

        const nodo = document.querySelector(
          `.tree-node[data-level="${level}"]`,
        );
        if (!nodo) return;

        // Calcular posición para dejar el panel centrado
        const rect = nodo.getBoundingClientRect();
        const scrollTop =
          window.scrollY +
          rect.top -
          (window.innerHeight / 2 - rect.height / 2);

        window.scrollTo({
          top: scrollTop,
          behavior: "smooth",
        });
      });
    });
  }

  /* Texto dinámico en el hero (multilenguaje) */

  function initDynamicWords() {
    const el = document.getElementById("dynamicWords");
    if (!el) return;

    // 1) Leer desde el diccionario actual (I18N debe estar cargado ya)
    let words = I18N?.["home.hero.words"];

    // 2) Fallback seguro si no hay array válido
    if (!Array.isArray(words) || words.length === 0) {
      words = ["Falla"];
    }

    // 3) Evitar duplicar intervalos si el usuario cambia de idioma
    if (el._interval) {
      clearInterval(el._interval);
      el._interval = null;
    }

    // 4) Arranque y rotación
    let i = 0;
    const rotate = () => {
      // Defensa por si el array cambia de longitud en runtime
      if (i >= words.length) i = 0;
      el.textContent = words[i];
      i = (i + 1) % words.length;
    };
    rotate(); // pinta la primera palabra inmediatamente
    el._interval = setInterval(rotate, 2000);
  }

function bindLangToggles() {
  document.querySelectorAll(".langToggle").forEach((btn) => {
    btn.replaceWith(btn.cloneNode(true));
  });

  document.querySelectorAll(".langToggle").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const lang = btn.getAttribute("data-lang") || "es";
      localStorage.setItem("lang", lang);

      await loadI18n(lang);   // I18N recargado
      applyLanguage();

      initDynamicWords();     // ⭐ REINICIAR CARRUSEL CON NUEVO IDIOMA
    });
  });
}

  /* ========== INIT (orden correcto) ========== */
  (async function init() {
    try {
      // 1) Inyectar NAV/FOOTER primero (necesario para tener los botones de idioma/tema)
      await includePartials();

      // 2) Cargar i18n según idioma guardado (esto también llama a applyLanguage() en tu código)
      await loadI18n(currentLang); // <-- ahora I18N ya está disponible

      // 3) Texto dinámico del hero (lee I18N ya cargado)
      initDynamicWords();

      // 4) Enlaces de leyenda (no es async, no uses await)
      activarEnlacesLeyenda();

      // 5) Construcciones dinámicas de páginas que existan
      await buildBachata(); // actúa SOLO si existe #bachata-tree

      if (document.querySelector("#salsa-cubana-tree")) {
        await buildSalsaCubana();
      }
      if (document.querySelector("#salsa-linea-tree")) {
        await buildSalsaLinea();
      }

      // 6) (Opcional) Re‑aplicar idioma por seguridad tras construir dinámicos
      applyLanguage();
    } catch (e) {
      console.error(e);
    }
  })();
});
