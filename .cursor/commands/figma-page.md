Вёрстка одного блока страницы из Figma. Plan mode сначала, код — после подтверждения.

1. Уточни страницу: `index` (`34:468` / `34:683`) / `tariffs` (`34:551` / `34:767`).
2. Уточни компонент (Header, Hero, Features, …) — см. `current_status.md`.
3. Вызови `get_design_context` + скриншот для node-id (fileKey `ty23DDiiEoIMUmOgJ8paRO`). Skill: figma-design-to-code.
4. Скачай ассеты в `assets/<page>/`, подключи локальные пути.
5. Верстай пиксель-в-пиксель Desktop в `pages/*.html` + `css/<page>.css`.
6. Затем Mobile (`html[data-layout="mobile"]`), затем проверка adaptive.
7. Не добавляй лишнюю JS-логику и бизнес-функции.
8. Сверь результат со скриншотом Figma; перечисли отличия, если остались.
