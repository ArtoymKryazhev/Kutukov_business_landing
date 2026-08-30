# Current status

**Состояние:** Проект подготовлен к вёрстке. Каркасы страниц, rules, docs — готовы. Блоки не свёрстаны.

**Adaptive:** scroll + scale по ширине (`layout.css` + `design-viewport.js`).

**Следующий шаг:** Header desktop на `pages/index.html` (Figma `Group 23`, node `34:469`).

---

## index.html — главная

### Desktop
- [ ] Header (`Group 23`)
- [ ] Hero (`Frame 1597884518`)
- [ ] Features ×3 (карточки 1/2/3)
- [ ] CTA cabinet («Перейти в личный кабинет»)
- [ ] Warehouse («Создайте свой склад…»)
- [ ] Video (YouTube / RuTube)
- [ ] Footer (`Group 28`)

### Mobile
- [ ] Header
- [ ] Hero
- [ ] Features ×3
- [ ] CTA cabinet
- [ ] Warehouse
- [ ] Video
- [ ] Footer

### Adaptive
- [ ] Проверка scroll + scale по ширине на index

---

## tariffs.html — тарифы

### Desktop
- [ ] Header
- [ ] Pricing ×3 (Plus / Pro / Teams)
- [ ] CEO quote
- [ ] Contact form (визуал)
- [ ] Footer

### Mobile
- [ ] Header
- [ ] Pricing carousel + индикаторы
- [ ] CEO quote
- [ ] Contact form
- [ ] Footer

### Adaptive
- [ ] Проверка scroll + carousel на tariffs

---

## Известные расхождения desktop vs mobile (верстаем как в Figma)

- Mobile Plus CTA: «14 дней бесплатно» vs desktop «90 дней бесплатно»
- Mobile Pro CTA: «Продолжить с Pro» vs desktop «90 дней бесплатно»
- Бургер-меню: отдельного макета overlay нет → stub `pages/stubs/menu.html`

---

## Риски / ограничения

- Размеры в CSS — в rem (1rem = 1px макета); шрифты можно в px/rem по согласованию при первом блоке
- Токены цветов/шрифтов в `css/tokens.css` — placeholder до первого блока из Figma
- Форма на tariffs — только визуал, без отправки
