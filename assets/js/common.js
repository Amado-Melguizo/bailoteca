
// assets/js/common.js
document.addEventListener('DOMContentLoaded', () => {
  /* ========== AOS ========== */
  if (window.AOS) {
    AOS.init({ duration: 600, once: true, offset: 80, easing: 'ease-out' });
  }

  /* ========== THEME ========== */
  const prefersDark = window.matchMedia?.('(prefers-color-scheme: dark)').matches;
  const storedTheme = localStorage.getItem('theme');
  applyTheme(storedTheme || (prefersDark ? 'dark' : 'light'));

  const themeBtn = document.getElementById('themeToggle');
  themeBtn?.addEventListener('click', () => {
    const next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    localStorage.setItem('theme', next);
  });

  function applyTheme(t){
    document.documentElement.setAttribute('data-theme', t);
    const icon = (t === 'dark') ? '☀️' : '🌙';
    const ic = document.querySelector('#themeToggle .theme-icon');
    if (ic) ic.textContent = icon;
  }

  /* ========== I18N ========== */
  const i18n = {
    es: {
      /* --- NAV / TOOLBAR --- */
      'nav.home':'Inicio', 'nav.salsa':'Salsa', 'nav.bachata':'Bachata', 'nav.choreos':'Coreografías',
      'theme.toggle':'Cambiar modo', 'lang.es':'Español', 'lang.en':'Inglés',

      /* --- HOME (index) --- */
      'home.h1':'Aprende a Bailar',
      'home.lead':'Explora árboles de figuras con vídeo, desde lo básico hasta lo avanzado.',
      'home.cta.salsa':'Ir a Salsa', 'home.cta.bachata':'Ir a Bachata',
      'home.card.salsa.title':'Salsa', 'home.card.salsa.text':'Árbol de figuras con niveles, variaciones e ideas de combinaciones.',
      'home.card.bachata.title':'Bachata', 'home.card.bachata.text':'Body movement, footwork y figuras listas para social.',
      'footer.home':'Aprende a Bailar – Inicio',

      /* --- LEYENDA GENÉRICA --- */
      'badge.basic':'Básico', 'badge.intermediate':'Intermedio', 'badge.advanced':'Avanzado',

      /* --- COREOGRAFÍAS (GEN) --- */
      'choreos.title':'Coreografías (muestras)',
      'choreos.subtitle':'Secuencias donde verás varias figuras encadenadas.',
      'choreos.salsa.card1.title':'De básico a intermedio',
      'choreos.salsa.card1.text':'Secuencias con enchufla, exhibela y más.',
      'choreos.salsa.card2.title':'Sombrero + Cero + Cruzado',
      'choreos.salsa.card2.text':'Combinación fluida y didáctica.',
      'choreos.salsa.card3.title':'Setenta – combinaciones',
      'choreos.salsa.card3.text':'Varias entradas y salidas con setenta.',
      'choreos.bachata.card1.title':'Básicos encadenados',
      'choreos.bachata.card1.text':'Varias entradas útiles para social.',
      'choreos.bachata.card2.title':'Clase completa',
      'choreos.bachata.card2.text':'Figuras elegantes y fáciles de hilar.',
      'choreos.bachata.card3.title':'Rutina de footwork',
      'choreos.bachata.card3.text':'Sincopaciones y musicalidad.',

      /* --- SALSA TITULARES --- */
      'title.salsa':'Árbol de Figuras: Salsa',
      'subtitle.salsa':'Empieza por lo básico y desbloquea variaciones y combinaciones más complejas.',
      'footer.salsa':'Aprende a Bailar – Salsa',

      /* --- BACHATA TITULARES --- */
      'title.bachata':'Árbol de Figuras: Bachata',
      'subtitle.bachata':'Del básico, a intermedio y avanzado, con ejemplos en vídeo.',
      'footer.bachata':'Aprende a Bailar – Bachata',

      /* --- GENÉRICOS FIGURAS --- */
      'variations.show':'Ver variaciones', 'lbl.technique':'Técnica',
      'lbl.errors':'Errores comunes', 'lbl.tip':'Tip',

      /* --- NOMBRES FIGURAS --- */
      'fig.basic':'Paso básico', 'fig.dilequeno':'Dile que no', 'fig.enchufla':'Enchufla',
      'fig.enchuflaDouble':'Enchufla doble', 'fig.enchuflaTurn':'Enchufla con vuelta',
      'fig.setenta':'Setenta', 'fig.exhibela':'Exhibela', 'fig.sombrero':'Sombrero',
      'fig.copaDouble':'Copa doble',
      'fig.onda':'Onda (Sensual)', 'fig.ochos':'Ochos',
      'fig.footwork':'Footwork avanzado', 'fig.fusion':'Fusión Sensual/Dominicana',

      /* --- DESCRIPCIONES (SALSA) --- */
      'desc.salsa.basic':'Patrón fundamental en dos frases de 4 tiempos (pausas en 4 y 8). Clave para estabilidad y conexión.',
      'desc.salsa.dilequeno':'Cambio de lugar para volver a posición abierta; señal clara y desplazamiento fluido.',
      'desc.salsa.enchufla':'Giro hacia adentro con cambio de lugar; base de muchas combinaciones.',
      'desc.salsa.enchuflaDouble':'Encadena dos enchuflas manteniendo frame y conexión.',
      'desc.salsa.enchuflaTurn':'Tras el enchufla añade un giro interior controlado y ofrece mano clara.',
      'desc.salsa.setenta':'Secuencia con nudos de manos y cambios de posición.',
      'desc.salsa.exhibela':'Giro de exhibición con preparación previa; postura y eje.',
      'desc.salsa.sombrero':'Figura icónica con “sombrero” final y salida a dile que no.',
      'desc.salsa.copaDouble':'Variante encadenada de copa con pausa y re‑dirección.',

      /* TÉCNICA / ERRORES / TIP (SALSA) */
      'tech.salsa.basic':'Marca peso claro en cada paso y controla la pausa; conexión ligera.',
      'err.salsa.basic':'Cadera exagerada antes de dominar el peso; pisadas largas.',
      'tip.salsa.basic':'Practica el conteo (1‑2‑3‑pausa / 5‑6‑7‑pausa).',

      'tech.salsa.dilequeno':'Indica desplazamiento desde el centro; pasos cortos en 5‑6‑7.',
      'err.salsa.dilequeno':'Bloquear el camino; perder el timing en la salida.',
      'tip.salsa.dilequeno':'“Abre y cambia” (1‑2‑3) → “sal y ofrece” (5‑6‑7).',

      'tech.salsa.enchufla':'Prepara en 1; guía entrada 2‑3 y cambio 5‑6‑7; conexión ligera.',
      'err.salsa.enchufla':'Guiar desde el brazo; quedarse corto en 5‑6‑7.',
      'tip.salsa.enchufla':'Piensa “giro + cruce de caminos”.',

      'tech.salsa.enchuflaDouble':'Prepara el segundo giro en 3; cambios de mano sin perder vertical.',
      'err.salsa.enchuflaDouble':'Compensar con brazos; acortar 5‑6‑7.',
      'tip.salsa.enchuflaDouble':'“Giro + traslado”.',

      'tech.salsa.enchuflaTurn':'Eleva la mano en 3 para preparar; guía el eje vertical sin empujar.',
      'err.salsa.enchuflaTurn':'Subir tarde la mano; no dejar espacio al cambiar de lugar.',
      'tip.salsa.enchuflaTurn':'Traza un arco suave.',

      'tech.salsa.setenta':'Señala el cambio de manos antes del nudo; pasos cortos.',
      'err.salsa.setenta':'Alturas inconsistentes; pérdida de línea.',
      'tip.salsa.setenta':'Primero camino, luego giro.',

      'tech.salsa.exhibela':'Abre espacio con torso; ofrece mano clara.',
      'err.salsa.exhibela':'Elevación tardía; agarre rígido.',
      'tip.salsa.exhibela':'Ensaya forma del brazo.',

      'tech.salsa.sombrero':'Altura de brazos constante; cruces con pasos cortos.',
      'err.salsa.sombrero':'Enredos por no soltar a tiempo; brazos demasiado altos.',
      'tip.salsa.sombrero':'Practica manos y trayectorias sin música.',

      'tech.salsa.copaDouble':'Marca parada nítida; re‑orienta en diagonal.',
      'err.salsa.copaDouble':'Soltar conexión en la pausa; exceso de fuerza.',
      'tip.salsa.copaDouble':'Usa la pausa para “dialogar” la intención.',

      /* --- DESCRIPCIONES (BACHATA) --- */
      'desc.bachata.basic':'3 pasos + toque; controla pausas y transferencia de peso.',
      'desc.bachata.turn':'Preparación suave, señal clara y eje estable.',
      'desc.bachata.lateral':'Paso lateral con toque; torso relajado y conexión cómoda.',
      'desc.bachata.onda':'Secuencia pecho → abdomen → cadera → rodillas; disociación.',
      'desc.bachata.ochos':'“∞” de cadera/torso integrados en lateral o en sitio.',
      'desc.bachata.footwork':'Patrones sincopados, control de peso y acentos.',
      'desc.bachata.fusion':'Integra ondas y giros con patrones dominicanos; transiciones suaves.',

      /* TÉCNICA / ERRORES / TIP (BACHATA) */
      'tech.bachata.basic':'Toque sin golpear; cadera desde el peso, no la rodilla.',
      'err.bachata.basic':'Amplitud excesiva; confundir paso y toque.',
      'tip.bachata.basic':'Metrónomo 85–95 BPM.',

      'tech.bachata.turn':'Anticipa el giro en el paso anterior; guía desde el centro.',
      'err.bachata.turn':'Giro sobre planta completa; brazos rígidos.',
      'tip.bachata.turn':'Spotting a un punto fijo.',

      'tech.bachata.lateral':'Conduce desde el peso; evita “rebote” en el toque.',
      'err.bachata.lateral':'Separar demasiado la pareja; toque fuera de tiempo.',
      'tip.bachata.lateral':'Centro alineado con la pareja.',

      'tech.bachata.onda':'Respiración y secuencia descendente; controla amplitud.',
      'err.bachata.onda':'Hacer onda solo con cadera; no volver a neutro.',
      'tip.bachata.onda':'Empieza lento y acelera gradualmente.',

      'tech.bachata.ochos':'Traslado + giro de cadera; hombros neutrales.',
      'err.bachata.ochos':'Romper tiempo por amplitud; subir hombros.',
      'tip.bachata.ochos':'Practica frente a pared.',

      'tech.bachata.footwork':'Divide en bloques de 8; acentos después.',
      'err.bachata.footwork':'Tap donde debe ir paso; perder el 1 al volver a pareja.',
      'tip.bachata.footwork':'Acentos con palmas (contratiempos).',

      'tech.bachata.fusion':'Control de frame; respira la onda antes del giro.',
      'err.bachata.fusion':'Mezcla sin coherencia musical; olvidar reconectar.',
      'tip.bachata.fusion':'Define un “tema”: ondas en A, dominicana en B.'
    },

    en: {
      /* --- NAV / TOOLBAR --- */
      'nav.home':'Home', 'nav.salsa':'Salsa', 'nav.bachata':'Bachata', 'nav.choreos':'Choreographies',
      'theme.toggle':'Toggle theme', 'lang.es':'Spanish', 'lang.en':'English',

      /* --- HOME --- */
      'home.h1':'Learn to Dance',
      'home.lead':'Explore figure trees with video, from basics to advanced.',
      'home.cta.salsa':'Go to Salsa', 'home.cta.bachata':'Go to Bachata',
      'home.card.salsa.title':'Salsa', 'home.card.salsa.text':'Figure tree with levels, variations and combo ideas.',
      'home.card.bachata.title':'Bachata', 'home.card.bachata.text':'Body movement, footwork and social-friendly figures.',
      'footer.home':'Learn to Dance – Home',

      /* --- LEGEND --- */
      'badge.basic':'Beginner', 'badge.intermediate':'Intermediate', 'badge.advanced':'Advanced',

      /* --- CHOREOS (GEN) --- */
      'choreos.title':'Sample Choreographies',
      'choreos.subtitle':'Sequences that chain several figures together.',
      'choreos.salsa.card1.title':'From Beginner to Intermediate',
      'choreos.salsa.card1.text':'Sequences with enchufla, exhibela and more.',
      'choreos.salsa.card2.title':'Sombrero + Cero + Cruzado',
      'choreos.salsa.card2.text':'Fluid and didactic combination.',
      'choreos.salsa.card3.title':'Setenta – combinations',
      'choreos.salsa.card3.text':'Multiple entries and exits with setenta.',
      'choreos.bachata.card1.title':'Chained Basics',
      'choreos.bachata.card1.text':'Several social‑useful entries.',
      'choreos.bachata.card2.title':'Full Class',
      'choreos.bachata.card2.text':'Elegant, easy‑to‑link figures.',
      'choreos.bachata.card3.title':'Footwork Routine',
      'choreos.bachata.card3.text':'Syncopations and musicality.',

      /* --- SALSA HEADERS --- */
      'title.salsa':'Figure Tree: Salsa',
      'subtitle.salsa':'Start from the basics and unlock variations and advanced combinations.',
      'footer.salsa':'Learn to Dance – Salsa',

      /* --- BACHATA HEADERS --- */
      'title.bachata':'Figure Tree: Bachata',
      'subtitle.bachata':'From basic to intermediate and advanced, with video examples.',
      'footer.bachata':'Learn to Dance – Bachata',

      /* --- GENERIC LABELS --- */
      'variations.show':'See variations', 'lbl.technique':'Technique',
      'lbl.errors':'Common mistakes', 'lbl.tip':'Tip',

      /* --- FIGURE NAMES --- */
      'fig.basic':'Basic Step', 'fig.dilequeno':'Dile que no', 'fig.enchufla':'Enchufla',
      'fig.enchuflaDouble':'Double Enchufla', 'fig.enchuflaTurn':'Enchufla with Inside Turn',
      'fig.setenta':'Setenta', 'fig.exhibela':'Exhibela', 'fig.sombrero':'Sombrero',
      'fig.copaDouble':'Double Copa',
      'fig.onda':'Wave (Sensual)', 'fig.ochos':'Ochos',
      'fig.footwork':'Advanced Footwork', 'fig.fusion':'Sensual/Dominican Fusion',

      /* --- SALSA DESCRIPTIONS --- */
      'desc.salsa.basic':'Core two‑phrase pattern (pauses on 4 and 8). Key for stability and connection.',
      'desc.salsa.dilequeno':'Position‑change back to open; clear signal and smooth travel.',
      'desc.salsa.enchufla':'Inside turn with position change; base for many combos.',
      'desc.salsa.enchuflaDouble':'Chain two enchuflas while preserving frame and connection.',
      'desc.salsa.enchuflaTurn':'After enchufla, add a controlled inside turn and offer a clear hand.',
      'desc.salsa.setenta':'Hand‑knot sequence with position changes.',
      'desc.salsa.exhibela':'Showcase turn with preparation; posture and axis.',
      'desc.salsa.sombrero':'Iconic figure with “hat” finish and dile que no exit.',
      'desc.salsa.copaDouble':'Chained copa with pause and redirection.',

      /* SALSA TECH/ERR/TIP */
      'tech.salsa.basic':'Clear weight on each step; manage pauses; light connection.',
      'err.salsa.basic':'Over‑hip before weight control; steps too long.',
      'tip.salsa.basic':'Practice counting (1‑2‑3‑pause / 5‑6‑7‑pause).',

      'tech.salsa.dilequeno':'Lead displacement from the core; short steps on 5‑6‑7.',
      'err.salsa.dilequeno':'Blocking partner’s path; timing loss on exit.',
      'tip.salsa.dilequeno':'“Open and switch” (1‑2‑3) → “exit and offer” (5‑6‑7).',

      'tech.salsa.enchufla':'Prep on 1; lead entry 2‑3 and change 5‑6‑7; light grip.',
      'err.salsa.enchufla':'Leading with the arm; short travel on 5‑6‑7.',
      'tip.salsa.enchufla':'Think “turn + path crossing”.',

      'tech.salsa.enchuflaDouble':'Second turn prep on 3; hand changes while staying vertical.',
      'err.salsa.enchuflaDouble':'Compensating with arms; shortening 5‑6‑7.',
      'tip.salsa.enchuflaDouble':'“Turn + travel”.',

      'tech.salsa.enchuflaTurn':'Lift hand on 3; guide vertical axis without pushing.',
      'err.salsa.enchuflaTurn':'Late hand lift; no space in the path change.',
      'tip.salsa.enchuflaTurn':'Draw a soft arc.',

      'tech.salsa.setenta':'Signal hand change before knot; short steps.',
      'err.salsa.setenta':'Inconsistent arm heights; line loss.',
      'tip.salsa.setenta':'Walk first, then turn.',

      'tech.salsa.exhibela':'Open space with torso; clear hand offer.',
      'err.salsa.exhibela':'Late arm lift; rigid grip.',
      'tip.salsa.exhibela':'Rehearse arm shape.',

      'tech.salsa.sombrero':'Constant arm height; short cross steps.',
      'err.salsa.sombrero':'Tangled hands; arms too high.',
      'tip.salsa.sombrero':'Practice hands and paths without music.',

      'tech.salsa.copaDouble':'Crisp stop; redirect in soft diagonal.',
      'err.salsa.copaDouble':'Losing connection in pause; over‑force on re‑entry.',
      'tip.salsa.copaDouble':'Use the pause to “negotiate” the intent.',

      /* --- BACHATA DESCRIPTIONS --- */
      'desc.bachata.basic':'3 steps + tap; manage pauses and weight transfer.',
      'desc.bachata.turn':'Soft prep, clear signal and stable axis.',
      'desc.bachata.lateral':'Side step with tap; relaxed torso and comfy connection.',
      'desc.bachata.onda':'Chest → abs → hips → knees; dissociation.',
      'desc.bachata.ochos':'“∞” hips/torso integrated in side basic or in place.',
      'desc.bachata.footwork':'Syncopated patterns, weight control and accents.',
      'desc.bachata.fusion':'Blend waves and turns with Dominican patterns; smooth transitions.',

      /* BACHATA TECH/ERR/TIP */
      'tech.bachata.basic':'Tap without stomping; hips from weight, not the knee.',
      'err.bachata.basic':'Too wide steps; mixing step and tap.',
      'tip.bachata.basic':'Metronome 85–95 BPM.',

      'tech.bachata.turn':'Anticipate the turn; lead from the core.',
      'err.bachata.turn':'Flat‑foot turns; rigid arms.',
      'tip.bachata.turn':'Spot a fixed point.',

      'tech.bachata.lateral':'Lead from weight; avoid bouncing on the tap.',
      'err.bachata.lateral':'Excess partner distance; off‑time tap.',
      'tip.bachata.lateral':'Keep centers aligned.',

      'tech.bachata.onda':'Breathing and downward sequence; manage amplitude.',
      'err.bachata.onda':'Only hips; no return to neutral.',
      'tip.bachata.onda':'Start slow, then increase.',

      'tech.bachata.ochos':'Travel + rotate hips; neutral shoulders.',
      'err.bachata.ochos':'Time loss by amplitude; lifted shoulders.',
      'tip.bachata.ochos':'Practice against a wall.',

      'tech.bachata.footwork':'Build 8‑count blocks; add accents later.',
      'err.bachata.footwork':'Tap instead of step; losing the 1 re‑joining partner.',
      'tip.bachata.footwork':'Clap the accents (off‑beats).',

      'tech.bachata.fusion':'Frame control; breathe the wave before turning.',
      'err.bachata.fusion':'Mix styles with no musical logic; forget to reconnect.',
      'tip.bachata.fusion':'Define a “theme”: waves on A, Dominican on B.'
    }
  };

  const storedLang = localStorage.getItem('lang') || 'es';
  applyLanguage(storedLang);

  document.querySelectorAll('.langToggle').forEach(btn => {
    btn.addEventListener('click', () => {
      const lang = btn.getAttribute('data-lang') || 'es';
      applyLanguage(lang);
      localStorage.setItem('lang', lang);
    });
  });

  function applyLanguage(lang){
    document.documentElement.setAttribute('lang', lang);

    // Text nodes
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      const txt = i18n[lang]?.[key];
      if (txt) el.textContent = txt;
    });

    // Attributes: data-i18n-attr="attr:key,attr2:key2"
    document.querySelectorAll('[data-i18n-attr]').forEach(el => {
      const list = (el.getAttribute('data-i18n-attr')||'').split(',');
      list.forEach(pair => {
        const [attr,key] = pair.split(':').map(s=>s.trim());
        const val = i18n[lang]?.[key];
        if (attr && val) el.setAttribute(attr, val);
      });
    });
  }

  /* ========== YEAR ========== */
  document.querySelectorAll('#year').forEach(el => el.textContent = new Date().getFullYear());

  /* ========== PREVIEW -> IFRAME ========== */
  document.querySelectorAll('.video-preview').forEach(preview => {
    const id = preview.getAttribute('data-video-id');
    if (!id) return;

    if (!preview.querySelector('.video-thumb')) {
      const img = document.createElement('img');
      img.className = 'video-thumb';
      img.alt = 'Video preview';
      img.src = `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
      preview.appendChild(img);
    }
    if (!preview.querySelector('.video-play')) {
      const btn = document.createElement('button');
      btn.className = 'video-play';
      btn.setAttribute('aria-label', 'Play');
      btn.textContent = '▶';
      preview.appendChild(btn);
    }

    const play = () => {
      const params = new URLSearchParams({ autoplay:'1', rel:'0', modestbranding:'1' });
      const iframe = document.createElement('iframe');
      iframe.src = `https://www.youtube.com/embed/${id}?${params.toString()}`;
      iframe.title = 'YouTube video';
      iframe.frameBorder = '0';
      iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
      iframe.allowFullscreen = true;
      iframe.loading = 'lazy';
      preview.innerHTML = '';
      preview.appendChild(iframe);
      preview.classList.add('is-playing');
    };

    preview.addEventListener('click', (e)=>{ e.preventDefault(); play(); });
  });

  /* ========== SCROLL TOP ========== */
  const topBtn = document.getElementById('scrollTopBtn');
  if (topBtn) {
    const toggleBtn = () => topBtn.classList.toggle('show', window.scrollY > 300);
    window.addEventListener('scroll', toggleBtn, { passive:true });
    toggleBtn();
    topBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({ top:0, behavior:'smooth' });
    });
  }
});
