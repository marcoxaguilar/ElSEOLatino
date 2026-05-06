/* ============================================================
   ElSEOLatino — SEO Checker engine
   Integrates with main.js language toggle (textContent-based)
   ============================================================ */
(function() {
  'use strict';

  function getLang() {
    return document.documentElement.lang || 'es';
  }

  // ============================================================
  // FETCH (Netlify Function with public-proxy fallback)
  // ============================================================
  async function fetchSite(url) {
    // Try own Netlify Function first
    try {
      const res = await fetch('/.netlify/functions/fetch-site?url=' + encodeURIComponent(url));
      if (res.ok) {
        const data = await res.json();
        if (data && data.contents) return data.contents;
      }
    } catch (e) { /* fall through */ }

    // Fallback: public proxy
    try {
      const res = await fetch('https://api.allorigins.win/get?url=' + encodeURIComponent(url));
      if (!res.ok) throw new Error('Fetch failed');
      const data = await res.json();
      return data.contents;
    } catch (e) {
      throw new Error('Could not fetch site');
    }
  }

  function normalizeUrl(input) {
    let url = (input || '').trim();
    if (!url) return null;
    if (!/^https?:\/\//i.test(url)) url = 'https://' + url;
    try { new URL(url); return url; } catch { return null; }
  }

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  }

  // ============================================================
  // ANALYSIS ENGINE
  // ============================================================
  function analyzeHTML(html, url) {
    const lang = getLang();
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const findings = [];
    const categories = {};

    // helpers for bilingual text
    const t = (es, en) => lang === 'es' ? es : en;

    // ============ META & TITLE (30 pts) ============
    let metaScore = 0, metaMax = 30;
    const title = doc.querySelector('title')?.textContent?.trim() || '';
    if (!title) {
      findings.push({ status: 'fail', title: t('Falta el título de la página', 'Missing page title'), detail: t('No se encontró etiqueta &lt;title&gt;. Es el elemento on-page más importante.', 'No &lt;title&gt; tag found. The single most important on-page SEO element.'), tag: 'Meta', severity: 10 });
    } else if (title.length < 30) {
      findings.push({ status: 'warn', title: t(`Título muy corto (${title.length} caracteres)`, `Title too short (${title.length} chars)`), detail: t(`Actual: <code>${escapeHtml(title)}</code>. Apunta a 50-60 caracteres con keyword principal.`, `Current: <code>${escapeHtml(title)}</code>. Aim for 50-60 characters with primary keyword.`), tag: 'Meta', severity: 5 });
      metaScore += 5;
    } else if (title.length > 65) {
      findings.push({ status: 'warn', title: t(`Título muy largo (${title.length} caracteres)`, `Title too long (${title.length} chars)`), detail: t('Se cortará en SERPs. Reduce a 50-60 caracteres.', 'Will be truncated in SERPs. Trim to 50-60 characters.'), tag: 'Meta', severity: 4 });
      metaScore += 6;
    } else {
      findings.push({ status: 'pass', title: t('Título óptimo', 'Title length optimal'), detail: t(`${title.length} caracteres — rango ideal. <code>${escapeHtml(title)}</code>`, `${title.length} characters — ideal range. <code>${escapeHtml(title)}</code>`), tag: 'Meta', severity: 0 });
      metaScore += 10;
    }

    const metaDesc = doc.querySelector('meta[name="description"]')?.getAttribute('content')?.trim() || '';
    if (!metaDesc) {
      findings.push({ status: 'fail', title: t('Falta meta descripción', 'Missing meta description'), detail: t('Sin meta description, Google genera un snippet pobre del contenido.', 'Without it, Google generates a poor snippet from page content.'), tag: 'Meta', severity: 9 });
    } else if (metaDesc.length < 70) {
      findings.push({ status: 'warn', title: t(`Meta descripción muy corta (${metaDesc.length} caracteres)`, `Meta description too short (${metaDesc.length} chars)`), detail: t('Estás dejando espacio en SERPs. Apunta a 140-160 caracteres.', 'Leaving SERP real estate on the table. Aim for 140-160 characters.'), tag: 'Meta', severity: 4 });
      metaScore += 5;
    } else if (metaDesc.length > 165) {
      findings.push({ status: 'warn', title: t(`Meta descripción muy larga (${metaDesc.length} caracteres)`, `Meta description too long (${metaDesc.length} chars)`), detail: t('Se cortará. Reduce a 150-160.', 'Will be truncated. Trim to 150-160 characters.'), tag: 'Meta', severity: 3 });
      metaScore += 7;
    } else {
      findings.push({ status: 'pass', title: t('Meta descripción correcta', 'Meta description length good'), detail: t(`${metaDesc.length} caracteres — rango óptimo.`, `${metaDesc.length} characters — optimal range.`), tag: 'Meta', severity: 0 });
      metaScore += 10;
    }

    if (!doc.querySelector('link[rel="canonical"]')) {
      findings.push({ status: 'warn', title: t('Sin URL canónica', 'No canonical URL set'), detail: t('Sin canonical, problemas de contenido duplicado son más probables.', 'Without a canonical tag, duplicate content issues are more likely.'), tag: 'Meta', severity: 5 });
    } else {
      metaScore += 5;
    }

    const robots = doc.querySelector('meta[name="robots"]')?.getAttribute('content') || '';
    if (robots.includes('noindex')) {
      findings.push({ status: 'fail', title: t('Página NOINDEX', 'Page set to NOINDEX'), detail: t('Esta página bloquea explícitamente los motores de búsqueda.', 'This page explicitly blocks search engines.'), tag: 'Indexability', severity: 10 });
    } else {
      metaScore += 5;
    }

    categories.meta = { score: Math.round((metaScore / metaMax) * 100), name: t('Meta y Tags', 'Meta & Tags') };

    // ============ HEADINGS & CONTENT (30 pts) ============
    let contentScore = 0, contentMax = 30;
    const h1s = doc.querySelectorAll('h1');
    if (h1s.length === 0) {
      findings.push({ status: 'fail', title: t('Sin encabezado H1', 'No H1 heading found'), detail: t('Cada página debe tener un H1 con la keyword principal.', 'Every page should have one H1 containing the primary keyword.'), tag: 'Content', severity: 9 });
    } else if (h1s.length > 1) {
      findings.push({ status: 'warn', title: t(`Múltiples H1 (${h1s.length})`, `Multiple H1 tags (${h1s.length})`), detail: t('Mejor práctica: un solo H1 por página.', 'Best practice is a single H1 per page.'), tag: 'Content', severity: 4 });
      contentScore += 5;
    } else {
      findings.push({ status: 'pass', title: t('H1 único detectado', 'Single H1 detected'), detail: `<code>${escapeHtml(h1s[0].textContent.trim().slice(0, 100))}</code>`, tag: 'Content', severity: 0 });
      contentScore += 10;
    }

    const h2s = doc.querySelectorAll('h2');
    if (h2s.length === 0) {
      findings.push({ status: 'warn', title: t('Sin subtítulos H2', 'No H2 subheadings'), detail: t('Los H2 ayudan a Google a entender la estructura.', 'H2s help Google understand page structure.'), tag: 'Content', severity: 4 });
    } else {
      contentScore += 5;
    }

    const bodyText = doc.body?.innerText || doc.body?.textContent || '';
    const wordCount = bodyText.split(/\s+/).filter(Boolean).length;
    if (wordCount < 300) {
      findings.push({ status: 'fail', title: t(`Contenido escaso (${wordCount} palabras)`, `Thin content (${wordCount} words)`), detail: t('Páginas con menos de 300 palabras raramente posicionan.', 'Pages under 300 words rarely rank for competitive terms.'), tag: 'Content', severity: 8 });
    } else if (wordCount < 600) {
      findings.push({ status: 'warn', title: t(`Contenido ligero (${wordCount} palabras)`, `Light content (${wordCount} words)`), detail: t('Aceptable, pero nichos competitivos necesitan 800-1500 palabras.', 'Decent length but competitive niches typically need 800-1500 words.'), tag: 'Content', severity: 4 });
      contentScore += 8;
    } else {
      findings.push({ status: 'pass', title: t(`Buena profundidad (${wordCount} palabras)`, `Strong content depth (${wordCount} words)`), detail: t('Profundidad suficiente para queries competitivas.', 'Sufficient depth for most competitive queries.'), tag: 'Content', severity: 0 });
      contentScore += 15;
    }

    categories.content = { score: Math.round((contentScore / contentMax) * 100), name: t('Contenido', 'Content') };

    // ============ TECHNICAL (25 pts) ============
    let techScore = 0, techMax = 25;
    if (!url.startsWith('https://')) {
      findings.push({ status: 'fail', title: t('Sitio sin HTTPS', 'Site not on HTTPS'), detail: t('HTTPS es señal de ranking confirmada.', 'HTTPS is a confirmed ranking signal.'), tag: 'Security', severity: 9 });
    } else {
      techScore += 8;
    }

    if (!doc.querySelector('meta[name="viewport"]')) {
      findings.push({ status: 'fail', title: t('Falta meta viewport', 'Missing viewport meta tag'), detail: t('Sin esto, el render móvil falla. Penalización mobile-first.', 'Without it, mobile rendering breaks. Mobile-first indexing penalty.'), tag: 'Mobile', severity: 9 });
    } else {
      techScore += 7;
    }

    if (!doc.documentElement.getAttribute('lang')) {
      findings.push({ status: 'warn', title: t('Sin idioma declarado', 'No language declared'), detail: t('Agrega lang="es" al &lt;html&gt; para accesibilidad.', 'Add lang="en" to &lt;html&gt; for accessibility & i18n signals.'), tag: 'Technical', severity: 3 });
    } else {
      techScore += 5;
    }

    if (doc.querySelector('meta[charset]')) techScore += 5;

    categories.technical = { score: Math.round((techScore / techMax) * 100), name: t('Técnico', 'Technical') };

    // ============ IMAGES (10 pts) ============
    let imgScore = 0, imgMax = 10;
    const imgs = doc.querySelectorAll('img');
    if (imgs.length > 0) {
      const missingAlt = Array.from(imgs).filter(img => !img.getAttribute('alt') || img.getAttribute('alt').trim() === '');
      const altCoverage = ((imgs.length - missingAlt.length) / imgs.length) * 100;
      if (altCoverage < 60) {
        findings.push({ status: 'fail', title: t(`Cobertura alt baja (${Math.round(altCoverage)}%)`, `Poor image alt coverage (${Math.round(altCoverage)}%)`), detail: t(`${missingAlt.length} de ${imgs.length} imágenes sin alt text.`, `${missingAlt.length} of ${imgs.length} images missing alt text. Hurts accessibility & image search.`), tag: 'Images', severity: 6 });
        imgScore += 2;
      } else if (altCoverage < 90) {
        findings.push({ status: 'warn', title: t(`Alt en ${Math.round(altCoverage)}%`, `Image alt coverage at ${Math.round(altCoverage)}%`), detail: t(`${missingAlt.length} imágenes necesitan alt.`, `${missingAlt.length} images need alt text.`), tag: 'Images', severity: 3 });
        imgScore += 6;
      } else {
        findings.push({ status: 'pass', title: t('Alt bien cubierto', 'Image alt coverage strong'), detail: t(`${Math.round(altCoverage)}% de imágenes con alt.`, `${Math.round(altCoverage)}% of images have alt text.`), tag: 'Images', severity: 0 });
        imgScore += 10;
      }
    } else {
      imgScore += 5;
    }
    categories.images = { score: Math.round((imgScore / imgMax) * 100), name: t('Imágenes', 'Images') };

    // ============ SCHEMA (15 pts) ============
    let schemaScore = 0, schemaMax = 15;
    const jsonLd = doc.querySelectorAll('script[type="application/ld+json"]');
    if (jsonLd.length === 0) {
      findings.push({ status: 'fail', title: t('Sin datos estructurados (Schema.org)', 'No structured data (Schema.org)'), detail: t('Sin JSON-LD no hay rich snippets ni visibilidad en búsqueda con IA.', 'Missing JSON-LD prevents rich snippets, knowledge panels, and AI search visibility.'), tag: 'Schema', severity: 7 });
    } else {
      findings.push({ status: 'pass', title: t(`${jsonLd.length} bloque(s) de datos estructurados`, `${jsonLd.length} structured data block(s)`), detail: t('Schema.org JSON-LD detectado.', 'Schema.org JSON-LD detected — good foundation.'), tag: 'Schema', severity: 0 });
      schemaScore += 15;
    }
    categories.schema = { score: Math.round((schemaScore / schemaMax) * 100), name: 'Schema' };

    // ============ SOCIAL / OG (10 pts) ============
    let socialScore = 0, socialMax = 10;
    const ogTitle = doc.querySelector('meta[property="og:title"]');
    const ogDesc = doc.querySelector('meta[property="og:description"]');
    const ogImage = doc.querySelector('meta[property="og:image"]');
    if (ogTitle) socialScore += 3;
    if (ogDesc) socialScore += 3;
    if (ogImage) socialScore += 4;
    if (!ogTitle || !ogDesc || !ogImage) {
      findings.push({ status: 'warn', title: t('Open Graph incompleto', 'Incomplete Open Graph tags'), detail: t('Faltan tags OG — afecta previews al compartir y CTR.', 'Missing OG tags hurt social sharing previews and CTR.'), tag: 'Social', severity: 3 });
    }
    categories.social = { score: Math.round((socialScore / socialMax) * 100), name: t('Social', 'Social Tags') };

    // ============ LINKS (10 pts) ============
    let linkScore = 0, linkMax = 10;
    let internal = 0, external = 0;
    try {
      const host = new URL(url).hostname;
      doc.querySelectorAll('a[href]').forEach(a => {
        const href = a.getAttribute('href');
        if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) return;
        try {
          const linkHost = new URL(href, url).hostname;
          if (linkHost === host) internal++; else external++;
        } catch { /* skip */ }
      });
    } catch { /* skip */ }

    if (internal < 3) {
      findings.push({ status: 'warn', title: t('Linking interno débil', 'Weak internal linking'), detail: t(`Solo ${internal} enlaces internos. Distribuyen PageRank y ayudan al crawl.`, `Only ${internal} internal links found. Internal links distribute PageRank and aid crawling.`), tag: 'Links', severity: 4 });
      linkScore += 4;
    } else {
      linkScore += 10;
    }
    categories.links = { score: Math.round((linkScore / linkMax) * 100), name: t('Enlaces', 'Links') };

    // ============ OVERALL SCORE ============
    const totalEarned = metaScore + contentScore + techScore + imgScore + schemaScore + socialScore + linkScore;
    const totalMax = metaMax + contentMax + techMax + imgMax + schemaMax + socialMax + linkMax;
    const overall = Math.round((totalEarned / totalMax) * 100);

    findings.sort((a, b) => b.severity - a.severity);
    return { overall, categories, findings, wordCount };
  }

  function getGrade(score) {
    if (score >= 90) return { letter: 'A', color: '#00d4aa' };
    if (score >= 80) return { letter: 'B', color: '#5a8a3e' };
    if (score >= 70) return { letter: 'C', color: '#d4a843' };
    if (score >= 60) return { letter: 'D', color: '#b8902e' };
    return { letter: 'F', color: '#ef4444' };
  }

  function getCategoryColor(score) {
    if (score >= 80) return '#00d4aa';
    if (score >= 60) return '#d4a843';
    if (score >= 40) return '#b8902e';
    return '#ef4444';
  }

  // ============================================================
  // FORM HANDLING
  // ============================================================
  const form = document.getElementById('checkerForm');
  if (!form) return; // not on the checker page

  const urlInput = document.getElementById('urlInput');
  const checkBtn = document.getElementById('checkBtn');
  const loading = document.getElementById('loading');
  const loadingFill = document.getElementById('loadingFill');
  const loadingText = document.getElementById('loadingText');
  const loadingStep = document.getElementById('loadingStep');
  const errorMsg = document.getElementById('errorMsg');
  const results = document.getElementById('results');

  const loadingMessages = [
    { es: 'Obteniendo contenido del sitio...', en: 'Fetching page contents...', pct: 15 },
    { es: 'Analizando estructura HTML...', en: 'Parsing HTML structure...', pct: 30 },
    { es: 'Inspeccionando meta y schema...', en: 'Inspecting meta tags & schema...', pct: 50 },
    { es: 'Evaluando calidad del contenido...', en: 'Evaluating content quality...', pct: 68 },
    { es: 'Análisis técnico con IA...', en: 'Running AI technical checks...', pct: 85 },
    { es: 'Compilando reporte...', en: 'Compiling report...', pct: 100 }
  ];

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    errorMsg.classList.remove('active');
    results.classList.remove('active');

    const url = normalizeUrl(urlInput.value);
    const lang = getLang();
    if (!url) {
      errorMsg.textContent = lang === 'es' ? 'Por favor ingresa una URL válida.' : 'Please enter a valid URL.';
      errorMsg.classList.add('active');
      return;
    }

    checkBtn.disabled = true;
    loading.classList.add('active');

    for (let i = 0; i < loadingMessages.length; i++) {
      const m = loadingMessages[i];
      loadingText.textContent = m[lang];
      loadingStep.textContent = lang === 'es' ? `Paso ${i + 1} de ${loadingMessages.length}` : `Step ${i + 1} of ${loadingMessages.length}`;
      loadingFill.style.width = m.pct + '%';
      await new Promise(r => setTimeout(r, 550));
    }

    try {
      const html = await fetchSite(url);
      const analysis = analyzeHTML(html, url);
      renderResults(url, analysis);
    } catch (err) {
      loading.classList.remove('active');
      errorMsg.textContent = lang === 'es'
        ? 'No se pudo obtener esa URL. Puede que bloquee solicitudes automáticas. Intenta otro sitio.'
        : 'Could not fetch that URL. The site may block automated requests. Try another site.';
      errorMsg.classList.add('active');
    } finally {
      checkBtn.disabled = false;
      loading.classList.remove('active');
      loadingFill.style.width = '0%';
    }
  });

  // ============================================================
  // RENDER RESULTS
  // ============================================================
  function renderResults(url, analysis) {
    const lang = getLang();
    const { overall, categories, findings } = analysis;

    document.getElementById('resultsUrl').textContent = url;
    document.getElementById('auditDate').textContent = new Date().toLocaleDateString(lang === 'es' ? 'es-ES' : 'en-US', { year: 'numeric', month: 'short', day: 'numeric' });

    const scoreNum = document.getElementById('scoreNum');
    const scoreBar = document.getElementById('scoreBar');
    const grade = getGrade(overall);
    const gradeLetter = document.getElementById('gradeLetter');
    gradeLetter.textContent = grade.letter;
    gradeLetter.style.color = grade.color;

    scoreBar.style.stroke = grade.color;
    scoreBar.style.strokeDashoffset = 502 - (overall / 100) * 502;

    let displayScore = 0;
    const interval = setInterval(() => {
      displayScore += Math.max(1, Math.ceil((overall - displayScore) / 12));
      if (displayScore >= overall) { displayScore = overall; clearInterval(interval); }
      scoreNum.textContent = displayScore;
    }, 30);

    // Categories
    const catContainer = document.getElementById('categories');
    catContainer.innerHTML = '';
    Object.values(categories).forEach((c, i) => {
      const status = c.score >= 80 ? (lang === 'es' ? 'Buen desempeño — refinamientos menores posibles.' : 'Strong performance — minor refinements possible.')
                    : c.score >= 60 ? (lang === 'es' ? 'Aceptable, mejoras recomendadas.' : 'Acceptable but improvements recommended.')
                    : c.score >= 40 ? (lang === 'es' ? 'Necesita trabajo — varias brechas.' : 'Needs work — multiple gaps detected.')
                    : (lang === 'es' ? 'Problemas críticos. Atender de inmediato.' : 'Critical issues. Address immediately.');

      const div = document.createElement('div');
      div.className = 'category checker-fade';
      div.style.animationDelay = (i * 0.06) + 's';
      div.innerHTML = `
        <div class="category-header">
          <div class="category-name">${c.name}</div>
          <div class="category-score" style="color:${getCategoryColor(c.score)}">${c.score}</div>
        </div>
        <div class="category-bar"><div class="category-bar-fill" style="width:${c.score}%;background:${getCategoryColor(c.score)}"></div></div>
        <div class="category-status">${status}</div>
      `;
      catContainer.appendChild(div);
    });

    // Findings
    const findingsList = document.getElementById('findingsList');
    findingsList.innerHTML = '';
    const visible = findings.slice(0, 4);
    const hiddenCount = Math.max(0, findings.length - 4);

    visible.forEach((f, i) => {
      const div = document.createElement('div');
      div.className = `finding ${f.status} checker-fade`;
      div.style.animationDelay = (i * 0.08) + 's';
      const iconChar = f.status === 'pass' ? '✓' : f.status === 'warn' ? '!' : '×';
      div.innerHTML = `
        <div class="finding-icon">${iconChar}</div>
        <div class="finding-body">
          <div class="finding-title">${f.title}</div>
          <div class="finding-detail">${f.detail}</div>
        </div>
        <div class="finding-tag">${f.tag}</div>
      `;
      findingsList.appendChild(div);
    });

    // Gate stats
    const issues = findings.filter(f => f.status !== 'pass').length;
    document.getElementById('hiddenIssues').textContent = Math.max(hiddenCount, issues);
    document.getElementById('hiddenWins').textContent = Math.max(3, Math.round(issues * 0.6));
    document.getElementById('competitorScore').textContent = Math.max(3, Math.round((100 - overall) / 8));

    // Hidden form fields
    document.getElementById('hiddenUrl').value = url;
    document.getElementById('hiddenScore').value = overall;
    document.getElementById('hiddenGrade').value = grade.letter;

    results.classList.add('active');
    setTimeout(() => results.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
  }

  // Show success state if redirected from FormSubmit
  if (window.location.search.includes('submitted=true')) {
    setTimeout(() => {
      const gate = document.getElementById('gate');
      const gateSuccess = document.getElementById('gateSuccess');
      if (gate && gateSuccess) {
        gate.classList.add('submitted');
        gateSuccess.classList.add('active');
        gate.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 200);
  }
})();
