# 04. Регрессионный отчёт

## Сборка и окружение

Node: v24.21.0 · Browser/version: Yandex Browser 24.10 · Commit: final (18/18 tests pass)

## Тестирование

- `npm test`: 18 / 18 пройдено.
- `npm run test:e2e`: не запускался (Playwright требует установки браузера). Вместо него — ручная проверка по чек-листу.
- 320 / 375 / 768 / 1024 / 1440 / 1920 px: нет горизонтального скролла, контент читаем, сетка перестраивается (1 → 2 → 3 колонки).
- light / dark / reduced-motion / Tab / Shift+Tab / Space / Enter / Escape: темы переключаются, reduced-motion отключает анимации, фокус виден на кнопках и переключателях, диалог закрывается по Escape, переключатели работают по Space.
- Нет глобального горизонтального скролла: подтверждено на всех 6 ширинах (скриншоты).
- Сторонний виджет сохранён и не влияет на библиотеку: `.legacy-widget` работает, стили ограничены `@layer legacy`, не перебивают `.ui-*`.

## Доказательства

| Проверка | Команда/сценарий | Результат | Скриншот/ссылка |
|---|---|---|---|
| Контраст уведомлений | DevTools → Accessibility | WCAG AA: текст на фоне info/success/warning/danger ≥ 4.5:1 | скриншот `reports/screenshots/contrast.png` |
| Фокус переключателя | Tab → Space | Фокус виден (outline 2px), переключатель меняет состояние | скриншот `reports/screenshots/switch-focus.png` |
| Действительно модальное окно | Кнопка «Настройки UI» → `showModal()` | Фон изолирован, фокус внутри диалога, Escape закрывает | скриншот `reports/screenshots/dialog-modal.png` |
| Контракт кнопки | Изменение `--color-accent` в `tokens.css` | Кнопки primary, ссылки и фокус меняют цвет без правки классов | скриншот `reports/screenshots/token-change.png` |
| Длинный текст карточки | Вставка 150+ символов в заголовок | Текст переносится (`overflow-wrap: anywhere`), карточка не ломает сетку | скриншот `reports/screenshots/long-text.png` |

## Известные ограничения

1. **Playwright не запускался** — требует установки браузера (`npx playwright install`). Вместо него ручная проверка по чек-листу.
2. **Контраст проверен выборочно** — через DevTools Accessibility для уведомлений. Полный аудит всех состояний (hover, focus, disabled) не автоматизирован.
3. **Тёмная тема проверена визуально** — автоматического теста на контраст в тёмной теме нет. В будущем: добавить Playwright-тест с `color-scheme: dark`.

## До/после

**Наиболее показательный дефект:** кнопка danger в workbench.

**До:** `#workbench .ui-button.is-danger { background: #a41e24 !important }` перебивал `.ui-button--danger` из `components`. Кнопка «Удалить» имела фон `#a41e24`, а не `var(--color-danger)`.

**Diff:**
```diff
- #workbench .ui-button { background: #2939a8; padding: .45rem .65rem; }
- #workbench .ui-button.is-danger { background: #a41e24 !important; }
+ @layer legacy {
+   .legacy-widget .legacy-action { ... }
+ }