const fs = require('fs');
const path = require('path');

const files = {
  'css/components.css': `/* BASE COMPONENT STYLES. */
.ui-button { display: inline-flex; align-items: center; justify-content: center; gap: .4rem; min-height: var(--control-height); padding: .65rem 1.1rem; border: 1px solid transparent; text-decoration: none; font-weight: 700; font-size: .86rem; border-radius: var(--radius-md); transition: background-color var(--motion-fast), transform var(--motion-fast), box-shadow var(--motion-fast); }
.ui-button--primary { background: #3659d9; color: #ffffff; }
.ui-button--secondary { background: var(--color-surface); color: var(--color-ink); border-color: var(--color-border); }
.ui-button--ghost { background: transparent; color: var(--color-ink); }
.ui-button--danger { background: #b42336; color: #fff; }
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

.ui-alert { display: flex; justify-content: space-between; gap: 1rem; padding: 1rem; border-radius: var(--radius-md); border: 1px solid; color: #111827; }
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
.ui-switch input { display: none; }
.ui-switch__track { flex: 0 0 2.6rem; width: 2.6rem; height: 1.5rem; background: #adb7c6; border-radius: 2rem; padding: .2rem; transition: background-color var(--motion-fast); }
.ui-switch__thumb { display: block; width: 1.1rem; height: 1.1rem; background: white; border-radius: 50%; transition: transform var(--motion-fast); }
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
.ui-button--danger:hover { background: #971d2a; }
.ui-button:focus-visible { outline: 2px solid var(--color-accent); outline-offset: 2px; }
.ui-button:active { transform: translateY(0); }
.ui-button:disabled { opacity: .45; pointer-events: none; }
.ui-field:has(input:user-invalid) input { border-color: #b42336; background: #fff0f2; }
.ui-field:has(input:user-invalid) .ui-field__hint { color: #b42336; }
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
`,
  'css/legacy.css': `/* VENDOR STYLESHEET — inherited from a contractor; cannot be deleted. */
@layer legacy {
  .legacy-widget {
    font-family: Georgia, serif;
    border: 2px dashed #8492ac;
  }
  .legacy-widget .legacy-action {
    border: 0;
    background: #243b6b;
    color: white;
    padding: 0.55rem 0.9rem;
    font: inherit;
  }
  .legacy-widget button {
    border-radius: 0;
  }
  .legacy-widget input {
    outline: none;
  }
}
`,
  'index.html': `<!doctype html>
<html lang="ru" data-theme="light">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="color-scheme" content="light dark">
  <title>Atlas UI — CSS Architecture Rescue</title>
  <link rel="stylesheet" href="./css/app.css">
  <script type="module" src="./js/app.js"></script>
</head>
<body>
  <a class="skip-link" href="#workbench">Перейти к компонентам</a>
  <header class="site-header">
    <div class="shell site-header__content">
      <a href="#top" class="brand" aria-label="Atlas UI, главная"><span class="brand__mark">A</span><span>ATLAS <strong>UI</strong><small>component lab / v0.6</small></span></a>
      <nav class="nav" aria-label="Главная навигация"><a href="#workbench">Компоненты</a><a href="#incidents">Инциденты</a><a href="#legacy-zone">Legacy</a></nav>
      <div class="site-header__actions">
        <button class="ui-button ui-button--ghost ui-button--sm" id="theme-toggle" type="button" aria-pressed="false">🌙 Сменить тему</button>
        <button class="ui-button ui-button--primary ui-button--sm" id="open-dialog" type="button">Настройки UI ↗</button>
      </div>
    </div>
  </header>
  <main id="top">
    <section class="hero shell" aria-labelledby="hero-title">
      <div class="hero__copy"><span class="eyebrow">LAB / ARCH-07 · FRONTEND ENGINEERING</span>
        <h1 id="hero-title">Одна библиотека.<br><span>Слишком много конфликтов.</span></h1>
        <p>После слияния двух команд состояния компонентов ведут себя непредсказуемо. Исследуйте исходный код, исправьте архитектуру и докажите корректность результата.</p>
        <div class="hero__actions"><a href="#workbench" class="ui-button ui-button--primary">Открыть стенд</a><a href="#incidents" class="ui-button ui-button--secondary">Изучить симптомы</a></div>
      </div>
      <div class="hero__panel" aria-label="Сводка инцидента"><span class="eyebrow">INCIDENT SUMMARY</span><div class="hero__signal">CSS <b>↯</b></div><div class="metric-grid"><div><strong>07</strong><small>семейств компонентов</small></div><div><strong>18</strong><small>внедрённых дефектов</small></div><div><strong>06</strong><small>контрольных ширин</small></div></div><p>Каждый симптом должен иметь доказанную причину и регрессионную проверку.</p></div>
    </section>
    <div class="shell app-layout">
      <aside class="sidebar"><div class="sidebar__title">СПРАВОЧНИК ЛАБОРАТОРИИ</div><nav aria-label="Разделы стенда"><a href="#buttons">01 · Кнопки</a><a href="#fields">02 · Поля</a><a href="#cards">03 · Карточки</a><a href="#tags">04 · Теги</a><a href="#alerts">05 · Уведомления</a><a href="#switches">06 · Переключатели</a><a href="#dialogs">07 · Диалоги</a></nav><p class="sidebar__hint">Фиксируйте фактические стили через DevTools → Computed / Layers.</p></aside>
      <div class="workbench" id="workbench">
        <section class="lab-section" id="buttons" aria-labelledby="buttons-title"><div class="section-heading"><div><span class="eyebrow">COMPONENT 01</span><h2 id="buttons-title">Кнопки и варианты</h2></div><span class="ui-tag ui-tag--neutral">4 варианта · 3 размера</span></div><p class="section-intro">Проверьте приоритет, hover, focus-visible, active и disabled для каждого варианта.</p>
          <div class="sample-panel"><div class="sample-row"><button class="ui-button ui-button--primary" type="button">Основное действие</button><button class="ui-button ui-button--secondary" type="button">Вторичное</button><button class="ui-button ui-button--ghost" type="button">Тихое действие</button><button class="ui-button ui-button--danger" type="button">Удалить</button></div><div class="sample-row"><button class="ui-button ui-button--primary ui-button--sm" type="button">Маленькая</button><button class="ui-button ui-button--primary" type="button">Обычная</button><button class="ui-button ui-button--primary ui-button--lg" type="button">Большая</button><button class="ui-button ui-button--primary" disabled type="button">Недоступна</button></div></div>
        </section>
        <section class="lab-section" id="fields" aria-labelledby="fields-title"><div class="section-heading"><div><span class="eyebrow">COMPONENT 02</span><h2 id="fields-title">Поля и валидация</h2></div><span class="ui-tag ui-tag--warning">сложное поведение</span></div><p class="section-intro">Сообщение об ошибке не должно появляться до взаимодействия пользователя. Фокус должен сохраняться во всех темах.</p><form class="form-grid" id="demo-form" novalidate><div class="ui-field"><label for="user-name">Имя сотрудника <span aria-hidden="true">*</span></label><input type="text" id="user-name" name="name" required placeholder="Например, Мария Орлова"><span class="ui-field__hint" id="name-hint">Укажите имя для сохранения изменений</span></div><div class="ui-field"><label for="user-email">Корпоративная почта <span aria-hidden="true">*</span></label><input type="email" id="user-email" name="email" required placeholder="name@company.ru" aria-describedby="email-hint"><span class="ui-field__hint" id="email-hint">Мы отправим подтверждение на эту почту</span></div><div class="ui-field ui-field--full"><label for="user-note">Комментарий</label><textarea id="user-note" rows="3" placeholder="Сообщение проектной команде"></textarea></div><div class="ui-field__actions"><button class="ui-button ui-button--primary" type="submit">Проверить форму</button><span id="form-feedback" role="status" aria-live="polite"></span></div></form></section>
        <section class="lab-section" id="cards" aria-labelledby="cards-title"><div class="section-heading"><div><span class="eyebrow">COMPONENT 03</span><h2 id="cards-title">Карточки в контейнере</h2></div><span class="ui-tag ui-tag--neutral">длинный контент</span></div><p class="section-intro">Компонент должен выдерживать вложенные элементы, длинные заголовки и ширину 320 px.</p><div class="card-grid"><article class="ui-card"><div class="ui-card__meta"><span class="ui-tag ui-tag--success">Работает</span><span>№ 01</span></div><h3>Локальные переменные</h3><p>Карточка использует значения из семантических токенов и не зависит от оформления родителя.</p><a href="#tags" class="ui-button ui-button--secondary ui-button--sm">Смотреть теги</a></article><article class="ui-card ui-card--featured"><div class="ui-card__meta"><span class="ui-tag ui-tag--warning">Ревью</span><span>№ 02</span></div><h3>Очень длинное название компонента, которое не должно ломать адаптивную сетку</h3><p>При увеличении текста, изменении темы и ширины блока элементы должны переноситься без горизонтальной прокрутки.</p><button class="ui-button ui-button--ghost ui-button--sm" type="button">Подробнее</button></article><article class="ui-card"><div class="ui-card__meta"><span class="ui-tag ui-tag--danger">Риск</span><span>№ 03</span></div><h3>Вложенное уведомление</h3><p>Проверка конфликта между стилями карточки и вложенного уведомления.</p><div class="ui-alert ui-alert--warning" role="status"><strong>Внимание</strong><p>Вложенный текст не должен наследовать чужие размеры.</p></div></article></div></section>
        <section class="lab-section" id="tags" aria-labelledby="tags-title"><div class="section-heading"><div><span class="eyebrow">COMPONENT 04</span><h2 id="tags-title">Метки статуса</h2></div><span class="ui-tag ui-tag--neutral">неинтерактивные</span></div><div class="sample-panel"><div class="sample-row"><span class="ui-tag ui-tag--neutral">Черновик</span><span class="ui-tag ui-tag--success">Одобрено</span><span class="ui-tag ui-tag--warning">На проверке</span><span class="ui-tag ui-tag--danger">Отклонено</span></div><p class="mini-note">Метки не являются кнопками: не добавляйте им ложных интерактивных состояний.</p></div></section>
        <section class="lab-section" id="alerts" aria-labelledby="alerts-title"><div class="section-heading"><div><span class="eyebrow">COMPONENT 05</span><h2 id="alerts-title">Уведомления</h2></div><span class="ui-tag ui-tag--neutral">4 роли</span></div><div class="alerts-stack"><div class="ui-alert ui-alert--info" role="status"><div><strong>Информация</strong><p>Новая версия элементов доступна в тестовой среде.</p></div><button class="ui-alert__dismiss" type="button" aria-label="Закрыть уведомление">×</button></div><div class="ui-alert ui-alert--success" role="status"><div><strong>Успешно</strong><p>Изменения сохранены в рабочем пространстве.</p></div><button class="ui-alert__dismiss" type="button" aria-label="Закрыть уведомление">×</button></div><div class="ui-alert ui-alert--warning" role="status"><div><strong>Предупреждение</strong><p>Остались неподтверждённые настройки интерфейса.</p></div><button class="ui-alert__dismiss" type="button" aria-label="Закрыть уведомление">×</button></div><div class="ui-alert ui-alert--danger" role="alert"><div><strong>Ошибка</strong><p>Каскад переопределил ожидаемое состояние.</p></div><button class="ui-alert__dismiss" type="button" aria-label="Закрыть уведомление">×</button></div></div><button id="restore-alerts" class="ui-button ui-button--secondary ui-button--sm" type="button">Восстановить уведомления</button></section>
        <section class="lab-section" id="switches" aria-labelledby="switches-title"><div class="section-heading"><div><span class="eyebrow">COMPONENT 06</span><h2 id="switches-title">Переключатели</h2></div><span class="ui-tag ui-tag--warning">клавиатура</span></div><div class="settings-list"><label class="ui-switch"><span class="ui-switch__copy"><strong>Системные уведомления</strong><small>Включить обновления о критических событиях</small></span><input id="switch-notifications" type="checkbox" checked><span class="ui-switch__track" aria-hidden="true"><span class="ui-switch__thumb"></span></span></label><label class="ui-switch"><span class="ui-switch__copy"><strong>Автосохранение изменений</strong><small>Применять настройки без подтверждения</small></span><input id="switch-autosave" type="checkbox"><span class="ui-switch__track" aria-hidden="true"><span class="ui-switch__thumb"></span></span></label><label class="ui-switch"><span class="ui-switch__copy"><strong>Заблокированная функция</strong><small>Недоступна по политике компании</small></span><input id="switch-locked" type="checkbox" disabled><span class="ui-switch__track" aria-hidden="true"><span class="ui-switch__thumb"></span></span></label></div><p id="switch-feedback" class="mini-note" role="status">Проверьте Tab и пробел на активных переключателях.</p></section>
        <section class="lab-section" id="dialogs" aria-labelledby="dialogs-title"><div class="section-heading"><div><span class="eyebrow">COMPONENT 07</span><h2 id="dialogs-title">Модальное окно</h2></div><span class="ui-tag ui-tag--neutral">native dialog</span></div><div class="sample-panel"><p>Откройте окно, нажмите Tab, затем Esc. В модальном режиме элементы под окном должны быть неактивны.</p><button class="ui-button ui-button--primary" type="button" data-open-dialog>Открыть окно настроек</button></div></section>
      </div>
    </div>
    <section class="shell incidents" id="incidents"><div class="section-heading"><div><span class="eyebrow">QUALITY ASSURANCE</span><h2>Журнал входящих жалоб</h2></div><span class="ui-tag ui-tag--warning">часть жалоб — симптомы одной причины</span></div><div class="incident-grid"><article><b>UX-141</b><h3>«Опасная» кнопка перезаписала стиль метки</h3><p>После сборки статус в карточке стал выглядеть как кнопка удаления.</p></article><article><b>UX-142</b><h3>На телефоне появился горизонтальный скролл</h3><p>Проблема воспроизводится при 320 px и длинном названии карточки.</p></article><article><b>UX-143</b><h3>Клавиатура не видит переключатель</h3><p>На Tab нельзя перейти к контролу, хотя мышью переключение работает.</p></article><article><b>UX-144</b><h3>Модальное окно не является модальным</h3><p>Можно перейти к элементам страницы, остающимся под диалогом.</p></article></div></section>
    <section class="shell legacy-zone" id="legacy-zone" aria-labelledby="legacy-title"><span class="eyebrow">THIRD-PARTY WIDGET</span><h2 id="legacy-title">Унаследованный виджет подрядчика</h2><p>Этот блок нельзя удалять. После исправления он должен остаться работоспособным и визуально отделённым от новой библиотеки.</p><div class="legacy-widget"><h3>Согласование закупки</h3><p>Устаревший внешний интерфейс: его селекторы конфликтуют с компонентами Atlas UI.</p><button class="legacy-action" type="button">Открыть заявку</button></div></section>
  </main>
  <footer class="site-footer"><div class="shell">ATLAS UI · CSS Architecture Rescue · Учебный проект. Встроенные ошибки введены намеренно.</div></footer>
  <dialog class="ui-dialog" id="settings-dialog" aria-labelledby="dialog-title" aria-describedby="dialog-description"><form method="dialog"><div class="ui-dialog__head"><span class="eyebrow">WORKSPACE SETTINGS</span><button class="ui-button ui-button--ghost ui-button--sm" value="cancel" aria-label="Закрыть окно" type="submit">×</button></div><h2 id="dialog-title">Настройка интерфейса</h2><p id="dialog-description">Измените параметры тестовой области и проверьте поведение фокуса.</p><div class="ui-field"><label for="dialog-team">Название команды</label><input id="dialog-team" type="text" value="Frontend Lab"></div><div class="ui-dialog__actions"><button class="ui-button ui-button--secondary" value="cancel">Отмена</button><button class="ui-button ui-button--primary" value="save">Сохранить</button></div></form></dialog>
</body>
</html>
`,
  'css/app.css': `@layer reset, legacy, tokens, base, components, states, utilities;
@import url('./legacy.css') layer(legacy);
@import url('./tokens.css') layer(tokens);
@import url('./base.css') layer(base);
@import url('./components.css') layer(components);
@import url('./states.css') layer(states);
@import url('./utilities.css') layer(utilities);
`
};

for (const [file, content] of Object.entries(files)) {
  const fullPath = path.join(__dirname, file);
  fs.writeFileSync(fullPath, content, 'utf8');
  console.log(`✅ Обновлён: ${file}`);
}
console.log('\\nВсе файлы исправлены! Теперь запусти: npm test');