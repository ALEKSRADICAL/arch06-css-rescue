const fs = require('fs');
const path = require('path');

const files = {
  'css/tokens.css': `:root {
  --color-canvas: #f3f5fb;
  --color-surface: #ffffff;
  --color-surface-alt: #f8f9ff;
  --color-ink: #18233f;
  --color-muted: #56647d;
  --color-border: #d5dbea;
  --color-accent: #3659d9;
  --color-accent-hover: #2344be;
  --color-accent-ink: #ffffff;
  --color-focus: #e8791a;
  --color-danger: #bb283a;
  --color-danger-bg: #fff0f2;
  --color-danger-hover: #971d2a;
  --color-switch-bg: #adb7c6;
  --color-success: #1b7850;
  --color-success-bg: #e8f9f0;
  --color-warning: #855014;
  --color-warning-bg: #fff5dd;
  --color-info: #1b6094;
  --color-info-bg: #edf6ff;
  --space-1: .25rem; --space-2: .5rem; --space-3: .75rem;
  --space-4: 1rem; --space-5: 1.25rem; --space-6: 1.5rem;
  --space-8: 2rem; --space-10: 2.5rem; --space-12: 3rem;
  --radius-sm: .45rem; --radius-md: .75rem; --radius-lg: 1.1rem;
  --shadow-card: 0 15px 45px rgba(30, 42, 87, .08);
  --control-height: 2.75rem;
  --motion-fast: 160ms;
}
:root[data-theme='dark'] {
  --color-canvas: #10182b;
  --color-surface: #18243d;
  --color-surface-alt: #202e4a;
  --color-ink: #eef3ff;
  --color-muted: #bcc8dc;
  --color-border: #3d4b66;
  --color-accent: #90a6ff;
  --color-accent-hover: #b0befd;
  --color-accent-ink: #0c1834;
  --color-focus: #ffc27c;
  --color-danger: #ff9dab;
  --color-danger-bg: #572635;
  --color-danger-hover: #ffb3c0;
  --color-switch-bg: #4a5a78;
  --color-success: #90e7ba;
  --color-success-bg: #174438;
  --color-warning: #ffe0a3;
  --color-warning-bg: #574223;
  --color-info: #a9d8ff;
  --color-info-bg: #193d5c;
  --shadow-card: 0 15px 45px rgba(0, 0, 0, .18);
}
`,
  'css/components.css': `/* BASE COMPONENT STYLES. */
.ui-button { display: inline-flex; align-items: center; justify-content: center; gap: .4rem; min-height: var(--control-height); padding: .65rem 1.1rem; border: 1px solid transparent; text-decoration: none; font-weight: 700; font-size: .86rem; border-radius: var(--radius-md); transition: background-color var(--motion-fast), transform var(--motion-fast), box-shadow var(--motion-fast); }
.ui-button--primary { background: var(--color-accent); color: var(--color-accent-ink); }
.ui-button--secondary { background: var(--color-surface); color: var(--color-ink); border-color: var(--color-border); }
.ui-button--ghost { background: transparent; color: var(--color-ink); }
.ui-button--danger { background: var(--color-danger); color: var(--color-accent-ink); }
.ui-button--sm { min-height: 2.15rem; padding: .4rem .75rem; font-size: .78rem; }
.ui-button--lg { min-height: 3.25rem; padding: .85rem 1.4rem; font-size: 1rem; }

.ui-field { display: flex; flex-direction: column; gap: .4rem; }
.ui-field label { font-weight: 650; font-size: .88rem; }
.ui-field input, .ui-field textarea { width: 100%; min-width: 0; padding: .7rem .8rem; border: 1px solid var(--color-border); border-radius: var(--radius-sm); background: var(--color-surface); color: var(--color-ink); }
.ui-field__hint { font-size: .75rem; color: var(--color-muted); }
.ui-field__actions { display: flex; align-items: center; gap: .8rem; flex-wrap: wrap; }
.form-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 1rem; }
.ui-field--full, .ui-field__actions { grid-column: 1 / -1; }

.ui-card { display: flex; flex-direction: column; min-width: 0; padding: 1.15rem; border-radius: var(--radius-md); border: 1px solid var(--color-border); background: var(--color-surface); box-shadow: var(--shadow-card); }
.ui-card--featured { border-color: var(--color-accent); }
.ui-card__meta { display: flex; justify-content: space-between; align-items: center; gap: .6rem; margin-bottom: .9rem; color: var(--color-muted); font-size: .7rem; }
.ui-card h3 { font-size: 1rem; line-height: 1.35; overflow-wrap: anywhere; }
.ui-card p { color: var(--color-muted); font-size: .82rem; }
.ui-card > .ui-button { align-self: flex-start; margin-top: auto; }
.card-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 1rem; }

.ui-tag { display: inline-flex; align-items: center; min-height: 1.6rem; border-radius: 50px; font-size: .69rem; line-height: 1.2; font-weight: 750; padding: .25rem .65rem; white-space: nowrap; }
.ui-tag--neutral { background: var(--color-surface-alt); border: 1px solid var(--color-border); color: var(--color-muted); }
.ui-tag--success { background: var(--color-success-bg); color: var(--color-success); }
.ui-tag--warning { background: var(--color-warning-bg); color: var(--color-warning); }
.ui-tag--danger { background: var(--color-danger-bg); color: var(--color-danger); }

.ui-alert { display: flex; justify-content: space-between; gap: 1rem; padding: 1rem; border-radius: var(--radius-md); border: 1px solid; color: var(--color-ink); }
.ui-alert strong { font-size: .9rem; }
.ui-alert p { margin: .25rem 0 0; font-size: .83rem; }
.ui-alert--info { background: var(--color-info-bg); border-color: var(--color-info); }
.ui-alert--success { background: var(--color-success-bg); border-color: var(--color-success); }
.ui-alert--warning { background: var(--color-warning-bg); border-color: var(--color-warning); }
.ui-alert--danger { background: var(--color-danger-bg); border-color: var(--color-danger); }
.alerts-stack { display: grid; gap: .7rem; margin-bottom: 1.1rem; }
.ui-alert__dismiss { align-self: start; border: 0; background: transparent; color: inherit; font-size: 1.4rem; line-height: 1; padding: .2rem; }

.settings-list { display: grid; border: 1px solid var(--color-border); border-radius: var(--radius-md); overflow: hidden; }
.ui-switch { display: flex; justify-content: space-between; align-items: center; gap: 1rem; padding: 1rem; cursor: pointer; }
.ui-switch + .ui-switch { border-top: 1px solid var(--color-border); }
.ui-switch__copy { display: grid; gap: .15rem; }
.ui-switch__copy strong { font-size: .88rem; }
.ui-switch__copy small { color: var(--color-muted); }

/* Скрытие input без display: none */
.ui-switch input {
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

/* Фокус на переключателе */
.ui-switch input:focus-visible + .ui-switch__track {
  outline: 2px solid var(--color-focus);
  outline-offset: 2px;
}

.ui-switch__track { flex: 0 0 2.6rem; width: 2.6rem; height: 1.5rem; background: var(--color-switch-bg); border-radius: 2rem; padding: .2rem; transition: background-color var(--motion-fast); }
.ui-switch__thumb { display: block; width: 1.1rem; height: 1.1rem; background: var(--color-surface); border-radius: 50%; transition: transform var(--motion-fast); }
.ui-switch input:checked + .ui-switch__track { background: var(--color-accent); }
.ui-switch input:checked + .ui-switch__track .ui-switch__thumb { transform: translateX(1.1rem); }
.ui-switch input:disabled + .ui-switch__track { opacity: .4; }

.ui-dialog { width: min(92vw, 30rem); border: 1px solid var(--color-border); border-radius: var(--radius-lg); padding: 1.6rem; background: var(--color-surface); color: var(--color-ink); box-shadow: 0 24px 90px rgba(8, 15, 45, .28); }
.ui-dialog::backdrop { background: rgba(10, 17, 40, .65); backdrop-filter: blur(3px); }
.ui-dialog__head { display: flex; justify-content: space-between; align-items: center; gap: 1rem; }
.ui-dialog h2 { margin: .8rem 0 .5rem; }
.ui-dialog p { color: var(--color-muted); }
.ui-dialog__actions { display: flex; justify-content: flex-end; gap: .5rem; margin-top: 1.6rem; }

.u-visually-hidden { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0, 0, 0, 0); white-space: nowrap; border: 0; }
@media (max-width: 720px) { .card-grid, .form-grid { grid-template-columns: 1fr; } }
@media (max-width: 440px) { .site-header__actions .ui-button { width: 100%; } .hero__actions .ui-button { width: 100%; } }
`,
  'css/states.css': `/* INTERACTION STATES */
.ui-button:hover { transform: translateY(-1px); }
.ui-button--primary:hover { background: var(--color-accent-hover); }
.ui-button--secondary:hover, .ui-button--ghost:hover { background: var(--color-surface-alt); }
.ui-button--danger:hover { background: var(--color-danger-hover); }
.ui-button:focus-visible { outline: 2px solid var(--color-focus); outline-offset: 2px; }
.ui-button:active { transform: translateY(0); }
.ui-button:disabled { opacity: .45; pointer-events: none; }

/* Ошибка по aria-invalid */
.ui-field:has(input[aria-invalid="true"]) input {
  border-color: var(--color-danger);
  background: var(--color-danger-bg);
}
.ui-field:has(input[aria-invalid="true"]) .ui-field__hint {
  color: var(--color-danger);
}

.ui-card .ui-tag { padding-inline: 1rem; }
.ui-alert { transition: background-color 240ms, color 240ms; }

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
`
};

for (const [file, content] of Object.entries(files)) {
  const fullPath = path.join(__dirname, file);
  fs.writeFileSync(fullPath, content, 'utf8');
  console.log(`✅ Обновлён: ${file}`);
}
console.log('\\nВсе файлы исправлены! Теперь запусти: npm test');