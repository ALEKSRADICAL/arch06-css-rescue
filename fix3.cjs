const fs = require('fs');
const path = require('path');

// 1. Принудительно заменяем js/app.js
const appJs = [
  "const root = document.documentElement;",
  "const themeToggle = document.querySelector('#theme-toggle');",
  "const dialog = document.querySelector('#settings-dialog');",
  "",
  "function toggleTheme() {",
  "  const next = root.dataset.theme === 'dark' ? 'light' : 'dark';",
  "  root.dataset.theme = next;",
  "  themeToggle.setAttribute('aria-pressed', String(next === 'dark'));",
  "  themeToggle.textContent = next === 'dark' ? '☀️ Светлая тема' : '🌙 Сменить тему';",
  "}",
  "themeToggle.addEventListener('click', toggleTheme);",
  "",
  "// ИСПРАВЛЕНО: showModal() вместо show()",
  "for (const trigger of document.querySelectorAll('#open-dialog, [data-open-dialog]')) {",
  "  trigger.addEventListener('click', () => dialog.showModal());",
  "}",
  "",
  "const form = document.querySelector('#demo-form');",
  "for (const input of form.querySelectorAll('input[required]')) {",
  "  input.addEventListener('blur', () => input.setAttribute('aria-invalid', String(!input.checkValidity())));",
  "  input.addEventListener('input', () => {",
  "    if (input.hasAttribute('aria-invalid')) input.setAttribute('aria-invalid', String(!input.checkValidity()));",
  "  });",
  "}",
  "form.addEventListener('submit', (event) => {",
  "  event.preventDefault();",
  "  let hasErrors = false;",
  "  for (const input of form.querySelectorAll('input[required]')) {",
  "    const invalid = !input.checkValidity();",
  "    input.setAttribute('aria-invalid', String(invalid));",
  "    if (invalid) hasErrors = true;",
  "  }",
  "  document.querySelector('#form-feedback').textContent = hasErrors ? 'Исправьте поля формы.' : 'Данные прошли проверку.';",
  "});",
  "",
  "const alerts = document.querySelector('.alerts-stack');",
  "const initialAlerts = alerts.innerHTML;",
  "alerts.addEventListener('click', (event) => {",
  "  const dismiss = event.target.closest('.ui-alert__dismiss');",
  "  if (dismiss) dismiss.closest('.ui-alert')?.remove();",
  "});",
  "document.querySelector('#restore-alerts').addEventListener('click', () => { alerts.innerHTML = initialAlerts; });",
  "for (const input of document.querySelectorAll('.ui-switch input')) {",
  "  input.addEventListener('change', () => {",
  "    const strong = input.closest('.ui-switch').querySelector('strong').textContent;",
  "    const state = input.checked ? 'включено' : 'выключено';",
  "    document.querySelector('#switch-feedback').textContent = strong + ': ' + state;",
  "  });",
  "}"
].join('\n');

fs.writeFileSync(path.join(__dirname, 'js/app.js'), appJs, 'utf8');
console.log('✅ Обновлён: js/app.js (showModal)');

// 2. Ищем !important во всех css-файлах
const cssDir = path.join(__dirname, 'css');
const files = fs.readdirSync(cssDir);

for (const file of files) {
  if (file.endsWith('.css')) {
    const filePath = path.join(cssDir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    if (content.includes('!important')) {
      console.log('⚠️ Найден !important в: css/' + file);
      content = content.replace(/!important/g, '');
      fs.writeFileSync(filePath, content, 'utf8');
      console.log('✅ Удалён !important из: css/' + file);
    }
  }
}

console.log('\nГотово! Теперь запусти: npm test');