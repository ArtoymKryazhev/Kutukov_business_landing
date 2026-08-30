# 001 — Project setup

Архив плана подготовки репозитория Kutukov Business Landing.

## Цель

Подготовить `Kutukov_business_landing` к поэтапной вёрстке по компонентам на основе эталона `Lending_comics_Albert`.

## Figma

- fileKey: `ty23DDiiEoIMUmOgJ8paRO`
- index: Desktop `34:468` (1920×2455), Mobile `34:683` (440×3267)
- tariffs: Desktop `34:551` (1920×1549), Mobile `34:767` (440×1701)

## Создано

- Структура папок: `.cursor/`, `pages/`, `css/`, `js/`, `assets/`, `examples/`, `docs/plans/`, `pages/stubs/`
- Rules: `000-project.mdc`, `100-frontend.mdc`, `900-manual-handoff.mdc`
- Commands: `figma-page.md`, `handoff.md`, `review-diff.md`
- Docs: `AGENTS.md`, `README.md`, `current_status.md`
- CSS: reset, tokens (placeholder), layout, index/tariffs stubs
- JS: `design-viewport.js` (layout + scale по ширине), `carousel.js`
- Каркасы: `pages/index.html`, `pages/tariffs.html`, `examples/page-skeleton.html`
- Stubs: cabinet, youtube, rutube, menu

## Adaptive (обновлено)

- **Page scroll** — вертикальный скролл документа
- Scale по ширине через `layout.css` (rem), не letterbox-fit всей страницы
- `design-stage.css` заменён на `layout.css`

## Порядок вёрстки

**index:** Header → Hero → Features → CTA → Warehouse → Video → Footer

**tariffs:** Header → Pricing → CEO quote → Contact form → Footer

## Не входило в setup

- HTML/CSS блоков
- Ассеты из Figma
- Git init / commit
