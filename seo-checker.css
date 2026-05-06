/* ============================================================
   ElSEOLatino — SEO Checker styles
   Uses :root tokens from styles.css (--navy-deep, --gold, etc.)
   ============================================================ */

.seo-check-vars { /* anchor */ }

:root {
  --check-pass: #00d4aa;
  --check-warn: #f0c45a;
  --check-fail: #ef4444;
}

.checker-container {
  max-width: 1180px;
  margin: 0 auto;
  padding: 0 24px;
}

/* ========== HERO ========== */
.checker-hero {
  position: relative;
  padding: 140px 0 80px;
  background: var(--navy-deep);
  overflow: hidden;
}
.checker-hero-bg {
  position: absolute;
  inset: 0;
  background-image:
    radial-gradient(ellipse at top right, var(--electric-glow) 0%, transparent 55%),
    radial-gradient(ellipse at bottom left, rgba(212, 168, 67, 0.08) 0%, transparent 55%);
  pointer-events: none;
}
.checker-hero::before {
  content: '';
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(79, 143, 255, 0.04) 1px, transparent 1px),
    linear-gradient(90deg, rgba(79, 143, 255, 0.04) 1px, transparent 1px);
  background-size: 60px 60px;
  pointer-events: none;
  opacity: 0.5;
}
.checker-hero .checker-container { position: relative; z-index: 2; }

.breadcrumb {
  font-family: 'Space Mono', monospace;
  font-size: 12px;
  color: var(--text-lighter);
  margin-bottom: 28px;
  letter-spacing: 0.05em;
}
.breadcrumb a {
  color: var(--text-light);
  text-decoration: none;
  transition: color 0.2s;
}
.breadcrumb a:hover { color: var(--gold); }
.bc-sep { margin: 0 10px; color: var(--text-lighter); }

.checker-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  font-family: 'Space Mono', monospace;
  font-size: 11px;
  letter-spacing: 0.2em;
  color: var(--gold);
  margin-bottom: 24px;
  padding: 8px 16px;
  background: rgba(212, 168, 67, 0.08);
  border: 1px solid rgba(212, 168, 67, 0.25);
  border-radius: 100px;
  text-transform: uppercase;
}
.checker-eyebrow-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--gold);
  box-shadow: 0 0 12px rgba(212, 168, 67, 0.7);
  animation: checker-pulse 2s infinite;
}
@keyframes checker-pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.4; }
}

.checker-h1 {
  font-family: 'Playfair Display', serif;
  font-size: clamp(2.5rem, 6vw, 4.5rem);
  font-weight: 700;
  line-height: 1.05;
  letter-spacing: -0.02em;
  margin-bottom: 24px;
  max-width: 18ch;
  color: var(--white);
}
.checker-h1 em {
  font-style: italic;
  color: var(--gold);
  font-weight: 400;
  position: relative;
}
.checker-h1 em::after {
  content: '';
  position: absolute;
  bottom: 4px;
  left: 0;
  width: 100%;
  height: 3px;
  background: linear-gradient(90deg, var(--gold), transparent);
  opacity: 0.5;
}

.checker-sub {
  font-size: 1.1rem;
  line-height: 1.65;
  max-width: 620px;
  color: var(--text-light);
  margin-bottom: 40px;
}

/* ========== INPUT FORM ========== */
.checker-form {
  display: flex;
  gap: 8px;
  max-width: 720px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 8px;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  box-shadow: var(--shadow-deep);
  transition: border-color 0.2s, box-shadow 0.2s;
}
.checker-form:focus-within {
  border-color: rgba(212, 168, 67, 0.5);
  box-shadow: var(--shadow-deep), 0 0 0 4px rgba(212, 168, 67, 0.1);
}

.url-input {
  flex: 1;
  background: transparent;
  border: none;
  color: var(--white);
  padding: 16px 20px;
  font-family: 'Space Mono', monospace;
  font-size: 0.95rem;
  outline: none;
  letter-spacing: -0.01em;
}
.url-input::placeholder { color: var(--text-lighter); }

.check-btn {
  background: linear-gradient(135deg, var(--gold), var(--gold-bright));
  color: var(--navy-deep);
  border: none;
  padding: 16px 28px;
  font-family: 'DM Sans', sans-serif;
  font-weight: 700;
  font-size: 0.875rem;
  letter-spacing: 0.05em;
  cursor: pointer;
  border-radius: 8px;
  transition: all 0.2s;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  text-transform: uppercase;
  white-space: nowrap;
}
.check-btn:hover {
  transform: translateY(-1px);
  box-shadow: var(--shadow-gold);
}
.check-btn:disabled { opacity: 0.5; cursor: not-allowed; transform: none; }
.check-btn .arrow { transition: transform 0.2s; }
.check-btn:hover .arrow { transform: translateX(3px); }

.error-msg {
  display: none;
  background: rgba(239, 68, 68, 0.1);
  border-left: 3px solid var(--check-fail);
  color: #fecaca;
  padding: 14px 18px;
  margin-top: 16px;
  font-size: 0.9rem;
  border-radius: 6px;
  max-width: 720px;
}
.error-msg.active { display: block; }

.checker-features {
  list-style: none;
  margin: 32px 0 0;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  font-family: 'Space Mono', monospace;
  font-size: 0.75rem;
  color: var(--text-light);
  text-transform: uppercase;
  letter-spacing: 0.1em;
}
.checker-features li {
  display: flex;
  align-items: center;
  gap: 8px;
}
.checker-features li::before {
  content: '✓';
  color: var(--gold);
  font-weight: 700;
  font-size: 1rem;
}

/* ========== LOADING ========== */
.loading {
  display: none;
  margin-top: 48px;
  padding: 40px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 12px;
  text-align: center;
  max-width: 720px;
}
.loading.active { display: block; }
.loading-text {
  font-family: 'Space Mono', monospace;
  font-size: 0.875rem;
  color: var(--white);
  margin-bottom: 20px;
}
.loading-bar {
  height: 2px;
  background: rgba(255, 255, 255, 0.08);
  border-radius: 2px;
  overflow: hidden;
  max-width: 400px;
  margin: 0 auto 16px;
}
.loading-bar-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--electric), var(--gold));
  width: 0%;
  transition: width 0.4s ease;
}
.loading-step {
  font-family: 'Space Mono', monospace;
  font-size: 0.7rem;
  color: var(--text-lighter);
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

/* ========== RESULTS ========== */
.checker-results {
  display: none;
  padding: 80px 0;
  background: var(--cream);
  color: var(--navy-deep);
}
.checker-results.active { display: block; }

.results-header {
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: 40px;
  align-items: center;
  padding: 32px 0;
  border-top: 2px solid var(--navy-deep);
  border-bottom: 1px solid rgba(10, 14, 39, 0.1);
  margin-bottom: 48px;
}

.score-circle {
  width: 180px;
  height: 180px;
  position: relative;
}
.score-svg { transform: rotate(-90deg); }
.score-track { fill: none; stroke: rgba(10, 14, 39, 0.08); stroke-width: 10; }
.score-bar { fill: none; stroke-width: 10; stroke-linecap: round; transition: stroke-dashoffset 1.5s cubic-bezier(0.4, 0, 0.2, 1); }
.score-number {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.score-number .num {
  font-family: 'Playfair Display', serif;
  font-size: 3.5rem;
  font-weight: 700;
  line-height: 1;
  letter-spacing: -0.02em;
  color: var(--navy-deep);
}
.score-number .lbl {
  font-family: 'Space Mono', monospace;
  font-size: 0.7rem;
  color: rgba(10, 14, 39, 0.5);
  margin-top: 6px;
  letter-spacing: 0.1em;
}

.results-meta {
  font-family: 'Space Mono', monospace;
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  color: rgba(10, 14, 39, 0.5);
  margin-bottom: 10px;
}
.results-url {
  font-family: 'Playfair Display', serif;
  font-size: 1.6rem;
  font-weight: 700;
  word-break: break-all;
  line-height: 1.2;
  color: var(--navy-deep);
}

.score-grade { text-align: center; }
.grade-letter {
  font-family: 'Playfair Display', serif;
  font-size: 6rem;
  font-weight: 700;
  line-height: 1;
  letter-spacing: -0.04em;
}
.grade-label {
  font-family: 'Space Mono', monospace;
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  color: rgba(10, 14, 39, 0.6);
  margin-top: 4px;
}

/* Categories */
.categories {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 1px;
  background: rgba(10, 14, 39, 0.1);
  border: 1px solid rgba(10, 14, 39, 0.1);
  margin-bottom: 60px;
  border-radius: 4px;
  overflow: hidden;
}
.category {
  background: var(--white);
  padding: 24px;
  transition: background 0.2s;
}
.category:hover { background: #fafafa; }
.category-header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 12px;
}
.category-name {
  font-family: 'Space Mono', monospace;
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: rgba(10, 14, 39, 0.6);
}
.category-score {
  font-family: 'Playfair Display', serif;
  font-size: 1.75rem;
  font-weight: 700;
  letter-spacing: -0.02em;
}
.category-bar {
  height: 3px;
  background: rgba(10, 14, 39, 0.08);
  margin: 8px 0 12px;
  overflow: hidden;
  border-radius: 2px;
}
.category-bar-fill {
  height: 100%;
  width: 0%;
  transition: width 1s ease 0.3s;
  border-radius: 2px;
}
.category-status {
  font-size: 0.875rem;
  color: rgba(10, 14, 39, 0.7);
  line-height: 1.45;
}

.section-eyebrow {
  font-family: 'Space Mono', monospace;
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 0.18em;
  color: var(--gold-dark);
  margin-bottom: 12px;
  font-weight: 700;
}

.checker-h2 {
  font-family: 'Playfair Display', serif;
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 700;
  letter-spacing: -0.02em;
  margin-bottom: 32px;
  line-height: 1.1;
  color: var(--navy-deep);
}
.checker-h2 em {
  font-style: italic;
  color: var(--gold-dark);
  font-weight: 400;
}

/* Findings */
.findings-section { margin-bottom: 60px; }
.finding {
  border-bottom: 1px solid rgba(10, 14, 39, 0.1);
  padding: 22px 0;
  display: grid;
  grid-template-columns: 40px 1fr auto;
  gap: 20px;
  align-items: start;
}
.finding:first-child { border-top: 1px solid rgba(10, 14, 39, 0.1); }
.finding-icon {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--white);
  font-weight: 700;
  font-size: 0.875rem;
  flex-shrink: 0;
}
.finding.pass .finding-icon { background: var(--check-pass); }
.finding.warn .finding-icon { background: var(--gold-dark); }
.finding.fail .finding-icon { background: var(--check-fail); }
.finding-title {
  font-family: 'Playfair Display', serif;
  font-size: 1.125rem;
  font-weight: 700;
  margin-bottom: 4px;
  color: var(--navy-deep);
}
.finding-detail {
  font-size: 0.875rem;
  color: rgba(10, 14, 39, 0.7);
  line-height: 1.55;
}
.finding-detail code {
  background: rgba(212, 168, 67, 0.15);
  color: var(--gold-dark);
  padding: 2px 6px;
  border-radius: 3px;
  font-family: 'Space Mono', monospace;
  font-size: 0.8rem;
  word-break: break-all;
}
.finding-tag {
  font-family: 'Space Mono', monospace;
  font-size: 0.65rem;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: rgba(10, 14, 39, 0.45);
  white-space: nowrap;
  align-self: center;
}

/* ========== EMAIL GATE ========== */
.gate {
  background: linear-gradient(135deg, var(--navy-deep) 0%, var(--navy-mid) 100%);
  color: var(--white);
  padding: 64px 56px;
  margin: 60px 0;
  position: relative;
  overflow: hidden;
  border-radius: 16px;
  box-shadow: 0 32px 80px rgba(10, 14, 39, 0.25);
}
.gate::after {
  content: '';
  position: absolute;
  top: -50%;
  right: -20%;
  width: 600px;
  height: 600px;
  background: radial-gradient(circle, rgba(212, 168, 67, 0.15) 0%, transparent 60%);
  pointer-events: none;
}
.gate-badge {
  position: absolute;
  top: 24px;
  right: 32px;
  font-family: 'Space Mono', monospace;
  font-size: 0.7rem;
  color: var(--gold);
  letter-spacing: 0.25em;
  font-weight: 700;
  background: rgba(212, 168, 67, 0.12);
  border: 1px solid rgba(212, 168, 67, 0.3);
  padding: 6px 14px;
  border-radius: 100px;
  z-index: 2;
}
.gate-eyebrow {
  font-family: 'Space Mono', monospace;
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  color: var(--gold);
  margin-bottom: 20px;
  position: relative;
  z-index: 1;
}
.gate-h2 {
  font-family: 'Playfair Display', serif;
  font-size: clamp(1.75rem, 4vw, 2.75rem);
  font-weight: 700;
  line-height: 1.1;
  letter-spacing: -0.02em;
  margin-bottom: 20px;
  max-width: 22ch;
  position: relative;
  z-index: 1;
  color: var(--white);
}
.gate-h2 em {
  font-style: italic;
  color: var(--gold);
  font-weight: 400;
}
.gate-p {
  font-size: 1rem;
  line-height: 1.65;
  max-width: 580px;
  color: var(--text-light);
  margin-bottom: 32px;
  position: relative;
  z-index: 1;
}
.gate-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 32px;
  margin: 32px 0 40px;
  padding: 28px 0;
  border-top: 1px solid rgba(255, 255, 255, 0.12);
  border-bottom: 1px solid rgba(255, 255, 255, 0.12);
  position: relative;
  z-index: 1;
}
.gate-stat-num {
  font-family: 'Playfair Display', serif;
  font-size: 2.4rem;
  font-weight: 700;
  color: var(--gold);
  line-height: 1;
}
.gate-stat-label {
  font-family: 'Space Mono', monospace;
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--text-light);
  margin-top: 8px;
}
.gate-form {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  max-width: 640px;
  position: relative;
  z-index: 1;
}
.gate-input-full { grid-column: span 2; }
.gate-form .gate-submit { grid-column: span 2; }
.gate-input {
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.18);
  color: var(--white);
  padding: 14px 18px;
  font-family: 'DM Sans', sans-serif;
  font-size: 0.9rem;
  outline: none;
  border-radius: 6px;
  transition: border-color 0.2s, background 0.2s;
}
.gate-input:focus {
  border-color: var(--gold);
  background: rgba(255, 255, 255, 0.08);
}
.gate-input::placeholder { color: var(--text-lighter); }
.gate-submit {
  background: linear-gradient(135deg, var(--gold), var(--gold-bright));
  color: var(--navy-deep);
  border: none;
  padding: 16px 32px;
  font-family: 'DM Sans', sans-serif;
  font-weight: 700;
  font-size: 0.875rem;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  cursor: pointer;
  border-radius: 6px;
  transition: all 0.2s;
}
.gate-submit:hover {
  transform: translateY(-1px);
  box-shadow: var(--shadow-gold);
}
.gate-fineprint {
  font-size: 0.75rem;
  color: var(--text-lighter);
  margin-top: 16px;
  font-family: 'Space Mono', monospace;
  letter-spacing: 0.03em;
  position: relative;
  z-index: 1;
}
.gate-success {
  display: none;
  text-align: center;
  padding: 24px 0;
  position: relative;
  z-index: 1;
}
.gate-success.active { display: block; }
.gate.submitted .gate-form,
.gate.submitted .gate-stats,
.gate.submitted .gate-fineprint,
.gate.submitted .gate-p { display: none; }
.check-icon {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: var(--check-pass);
  color: var(--white);
  font-size: 2rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 16px;
}
.gate-success h3 {
  font-family: 'Playfair Display', serif;
  font-size: 1.75rem;
  margin-bottom: 8px;
  color: var(--gold);
}
.gate-success p {
  color: var(--text-light);
  max-width: 420px;
  margin: 0 auto;
}

/* ========== LOCKED PREVIEW ========== */
.locked-section {
  position: relative;
  margin-bottom: 60px;
}
.locked-content {
  filter: blur(6px);
  pointer-events: none;
  user-select: none;
  opacity: 0.55;
}
.lock-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(180deg, transparent 0%, var(--cream) 70%);
  pointer-events: none;
}
.lock-msg {
  font-family: 'Space Mono', monospace;
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.18em;
  color: var(--gold);
  background: var(--navy-deep);
  padding: 14px 28px;
  border: 1px solid rgba(212, 168, 67, 0.4);
  border-radius: 100px;
  font-weight: 700;
}

/* ========== COMPETITOR CARD ========== */
.competitor-card {
  background: linear-gradient(135deg, rgba(212, 168, 67, 0.08) 0%, rgba(79, 143, 255, 0.04) 100%);
  border-left: 4px solid var(--gold);
  padding: 32px 36px;
  border-radius: 8px;
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 24px;
  align-items: center;
}
.competitor-icon {
  font-size: 3rem;
  line-height: 1;
}
.competitor-card h3 {
  font-family: 'Playfair Display', serif;
  font-size: 1.4rem;
  font-weight: 700;
  margin-bottom: 8px;
  color: var(--navy-deep);
}
.competitor-card p {
  font-size: 0.9rem;
  color: rgba(10, 14, 39, 0.75);
  line-height: 1.55;
  margin: 0;
}

/* ========== BOTTOM CTA SECTION ========== */
.checker-cta-section {
  background: var(--navy-deep);
  padding: 60px 0 80px;
}
.checker-cta-section .service-cta-box {
  margin-top: 0;
}

/* ========== ANIMATIONS ========== */
@keyframes checker-fadeUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
.checker-fade { animation: checker-fadeUp 0.6s ease both; }

/* ========== RESPONSIVE ========== */
@media (max-width: 900px) {
  .results-header {
    grid-template-columns: 1fr;
    text-align: center;
    gap: 24px;
  }
  .score-circle { margin: 0 auto; }
  .results-url { text-align: center; }
}

@media (max-width: 768px) {
  .checker-hero { padding: 120px 0 60px; }
  .checker-form { flex-direction: column; padding: 12px; gap: 12px; }
  .url-input { padding: 14px 16px; }
  .check-btn { width: 100%; justify-content: center; padding: 14px 24px; }
  .gate { padding: 48px 28px; }
  .gate-form { grid-template-columns: 1fr; }
  .gate-input-full,
  .gate-form .gate-submit { grid-column: span 1; }
  .competitor-card {
    grid-template-columns: 1fr;
    text-align: center;
    padding: 28px 24px;
  }
  .finding {
    grid-template-columns: 32px 1fr;
    gap: 16px;
  }
  .finding-tag { grid-column: 2; margin-top: 4px; }
  .checker-features { gap: 16px; }
}

@media (max-width: 480px) {
  .checker-hero { padding: 100px 0 50px; }
  .gate { padding: 36px 20px; }
  .gate-badge { top: 16px; right: 16px; font-size: 0.65rem; padding: 4px 10px; }
  .gate-stats { gap: 20px; }
  .gate-stat-num { font-size: 1.8rem; }
  .checker-cta-section { padding: 40px 0 60px; }
}
