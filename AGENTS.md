# Kutukov Business Landing

Статическая вёрстка двух страниц лендинга A-Warehouse по макетам Figma. Без бэка, без фреймворков.

## Стек
HTML + CSS + vanilla JS.

## Артборды
- Desktop: **1920px** ширина (index ~2455, tariffs ~1549 высота в Figma)
- Mobile: **440px** ширина — `html[data-layout="mobile"]`
- Страница **скроллится** по вертикали

## Adaptive
- `js/design-viewport.js` + `css/layout.css`
- Layout: portrait → mobile; landscape &lt;1024 → mobile; landscape ≥1024 → desktop
- Scale по ширине (rem); page scroll
- Gate: ширина &lt;320px
- Stubs без layout-обёртки

## Страницы

| Файл | Назначение | Desktop | Mobile |
| --- | --- | --- | --- |
| [pages/index.html](pages/index.html) | Главная | [`34:468`](https://www.figma.com/design/ty23DDiiEoIMUmOgJ8paRO/Kutukov-Business-Ru?node-id=34-468) | [`34:683`](https://www.figma.com/design/ty23DDiiEoIMUmOgJ8paRO/Kutukov-Business-Ru?node-id=34-683) |
| [pages/tariffs.html](pages/tariffs.html) | Тарифы | [`34:551`](https://www.figma.com/design/ty23DDiiEoIMUmOgJ8paRO/Kutukov-Business-Ru?node-id=34-551) | [`34:767`](https://www.figma.com/design/ty23DDiiEoIMUmOgJ8paRO/Kutukov-Business-Ru?node-id=34-767) |

Figma fileKey: `ty23DDiiEoIMUmOgJ8paRO`

## Структура
- `css/` — reset, tokens, layout, стили страниц
- `js/design-viewport.js` — layout + scale по ширине
- `js/carousel.js` — карусель тарифов (mobile layout, tariffs)
- `assets/index/`, `assets/tariffs/` — экспорты из Figma
- `examples/page-skeleton.html` — эталон каркаса
- `docs/plans/` — сохранённые планы
- `current_status.md` — живой статус

## Нельзя без запроса
- Фреймворки, сборщики, бизнес-логика форм, новые верхнеуровневые папки, отключение page scroll.

## Статус
См. [current_status.md](current_status.md).
