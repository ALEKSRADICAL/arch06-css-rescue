# 01. Аудит CSS-архитектуры

Автор / группа: Копичай А.А. · Репозиторий: https://github.com/ALEKSRADICAL/arch06-css-rescue · Commit до правок: baseline

## Гипотеза о причине (до изменения кода)

После интеграции `vendor.css` стили компонентов перестали работать, потому что vendor-файл был подключён **без слоя** (`@import url('./legacy.css')`). Unlayered-правила имеют приоритет выше любого `@layer`, поэтому селекторы `#workbench .ui-button` и `button` перебивали все компоненты Atlas UI, независимо от их специфичности внутри слоёв.

`@layer` решает проблему **порядка каскада**: внутри слоёв можно предсказуемо управлять приоритетом. Но `@layer` **не решает** проблему `!important` — для `important` порядок слоёв обратный, и unlayered-правила с `!important` всё равно побеждают. Поэтому одного `@layer` недостаточно: нужно дополнительно изолировать legacy и удалить `!important`.

## Инвентаризация дефектов (минимум 12 доказанных причин)

| ID | Симптом и шаги воспроизведения | Файл:строка | Применённое правило и выигравший каскад | Первопричина | Минимальное исправление | Регрессионный тест |
|---|---|---|---|---|---|---|
| A-01 | Кнопка danger перезаписывает цвет тега | `states.css` / `components.css` | `.is-danger { background: #c12236 }` (0-1-0, unlayered) перебивает `.ui-tag--danger` (0-1-0, layer components) | Глобальный класс `.is-danger` применяется ко всем компонентам одновременно | Удалён `.is-danger` из HTML, заменён на модификаторы `.ui-button--danger` / `.ui-tag--danger` / `.ui-alert--danger` | тест 08 |
| A-02 | Кнопка primary в workbench меняет фон на `#2939a8` | `legacy.css` / `app.css` | `#workbench .ui-button { background: #2939a8 }` (1-1-0, unlayered) перебивает `.ui-button--primary` (0-1-0) | ID + unlayered = высший приоритет | Legacy обёрнут в `@layer legacy`, ограничен `.legacy-widget` | тест 18 |
| A-03 | Переключатель не доступен с клавиатуры | `components.css` | `.ui-switch input { display: none }` | `display: none` убирает input из порядка табуляции и дерева доступности | Заменено на визуальное скрытие (`position: absolute; clip; 1px`) | тест 06 |
| A-04 | При Tab фокус на кнопке не виден | `states.css` | `.ui-button:focus { outline: none }` | Убран стандартный outline без замены | Заменено на `:focus-visible` с `outline: 2px solid var(--color-focus)` | тест 05 |
| A-05 | Ошибка поля появляется до ввода | `states.css` | `.ui-field:has(input:invalid) input` (0-2-1) | `:invalid` срабатывает на пустом `required`-поле | Заменено на `[aria-invalid="true"]`, управляемое через JS после `blur` / `submit` | тест 09 |
| A-06 | `!important` в vendor-правиле блокирует любые правки | `legacy.css` | `#workbench .ui-button.is-danger { background: #a41e24 !important }` | `!important` перебивает все слои и специфичность | Удалён `!important`, legacy обёрнут в `@layer legacy` | тест 03 |
| A-07 | Горизонтальный скролл на 320px из-за карточек | `components.css` | `.ui-card { min-width: 22rem }` | Фиксированная ширина больше ширины экрана | Заменено на `min-width: 0` | тест 10 |
| A-08 | Горизонтальный скролл на 320px из-за полей | `components.css` | `.ui-field input { min-width: 20rem }` | То же | Заменено на `min-width: 0` | тест 10 |
| A-09 | Тег выглядит кликабельным, но не кликается | `states.css` | `.ui-tag:hover { cursor: pointer }` | Ховер-эффект у неинтерактивного элемента | Удалён `.ui-tag:hover` | тест 08 |
| A-10 | Тег внутри карточки получает лишний padding | `states.css` | `:is(.ui-card, #workbench) .ui-tag { padding-inline: 1rem }` (1-1-0) | `:is()` берёт максимальную специфичность аргументов, включая ID | Заменено на `.ui-card .ui-tag` (0-2-0) | тест 13 |
| A-11 | Два правила `.ui-button` конфликтуют | `components.css` | `.ui-button` дублируется, второе перебивает первое | Дублирование правила | Объединено в одно правило | тест 11 |
| A-12 | Диалог не модальный: фон прокручивается, фокус уходит | `js/app.js` | `dialog.show()` | `show()` не изолирует фон и не блокирует фокус | Заменено на `dialog.showModal()` | тест 04 |

## Три трассировки каскада

### 1. Primary button в legacy workbench
- **Элемент:** `<button class="ui-button ui-button--primary">` внутри `#workbench`
- **Свойство:** `background`
- **Кандидаты:**
  - `.ui-button--primary` (0-1-0) — слой `components`
  - `#workbench .ui-button` (1-1-0) — unlayered
- **Победившее правило:** `#workbench .ui-button` (unlayered, ID)
- **Причина:** unlayered-правила выше любого слоя; ID даёт специфичность 1-1-0. Исправлено изоляцией legacy в `.legacy-widget` и `@layer legacy`.

### 2. Danger tag во вложенной карточке
- **Элемент:** `<span class="ui-tag ui-tag--danger">` внутри `.ui-card`
- **Свойство:** `background`
- **Кандидаты:**
  - `.ui-tag--danger` (0-1-0) — слой `components`
  - `.is-danger` (0-1-0) — слой `states` (unlayered)
  - `#workbench .ui-button.is-danger` (1-2-0) — unlayered
- **Победившее правило:** `#workbench .ui-button.is-danger` (unlayered, ID + `!important`)
- **Причина:** `!important` + unlayered + ID = максимальный приоритет. Исправлено удалением `.is-danger`, `#workbench` и `!important`.

### 3. Input с required до взаимодействия
- **Элемент:** `<input required>`
- **Свойство:** `border-color`
- **Кандидаты:**
  - `.ui-field input` (0-1-1) — слой `components`
  - `.ui-field:has(input:invalid) input` (0-2-1) — слой `states`
- **Победившее правило:** `.ui-field:has(input:invalid) input` (0-2-1)
- **Причина:** `:invalid` срабатывает сразу. Исправлено заменой на `[aria-invalid="true"]`, которое JS ставит только после `blur`/`submit`.

## Вывод

Проблема была **архитектурной**: unlayered legacy-стили и глобальные классы (`is-danger`) перебивали компоненты независимо от их специфичности. `@layer` решил порядок каскада, но потребовалась дополнительная изоляция legacy и удаление `!important`.

Проблемы JS/семантики (не архитектуры):
- `dialog.show()` — нужен `showModal()` для модальности.
- `aria-invalid` — управление состоянием ошибки должно быть в JS, а не через `:invalid`.