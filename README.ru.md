# skillsOS

[EN](./README.md) | [RU](./README.ru.md) | [ES](./README.es.md) | [CN](./README.cn.md)

> Копипаст не выдерживает multi-machine agent workflows слишком долго.

## Что это

`skillsOS` — это небольшой open repo про одну практическую боль:

как держать переиспользуемые workflow assets синхронизированными между несколькими машинами и изолированными рантаймами без вечного ручного копирования.

Это не попытка продать “магический фреймворк”.

Это маленький public slice вокруг:

- одного runnable sync CLI
- одного public pack
- одной понятной contribution surface

## Быстрый старт

```bash
git clone https://github.com/AI-Neighbors/skillsOS.git
cd skillsOS
npm install
```

```bash
npm run sync:plan -- \
  --manifest skillsos-ops-multi-machine-sync/references/skillsos-sync.example.json \
  --all-hosts
```

```bash
npm run sync:apply -- \
  --manifest skillsos-ops-multi-machine-sync/references/skillsos-sync.example.json \
  --all-hosts
```

```bash
npm run sync:verify -- \
  --manifest skillsos-ops-multi-machine-sync/references/skillsos-sync.example.json \
  --all-hosts
```

## Что внутри

- `bin/skillsos-sync.mjs`
- `skillsos-ops-multi-machine-sync/`
- `posts/x/`
- `docs/media/`

## Дисклеймер

Это текущий working pattern, а не универсальное ноу-хау.

Если у тебя есть более чистый способ:

- форкай
- открывай PR
- показывай лучший вариант

## Контакты

- X: https://x.com/developerisnow1
- LinkedIn: https://www.linkedin.com/company/ai-llm-neighbors/
- Website: https://useclaw.pro/verified-skills
- Email: info@llmneighbors.com
