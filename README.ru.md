# skillsOS

[English](README.md) | [Русский](README.ru.md) | [Español](README.es.md) | [中文](README.cn.md)

<p align="center">
  <a href="https://github.com/AI-Neighbors/skillsOS">
    <img src="docs/media/linkedin-hero.webp" alt="skillsOS hero" width="800">
  </a>
</p>

<p align="center">
  <em>Один repo. Переиспользуемые packs для изолированных runtimes.</em><br>
  Ручной copy-paste быстро ломается, когда у тебя одновременно живут <strong>Claude Code</strong>, <strong>Codex</strong>, <strong>OpenCode</strong>, <strong>OpenClaw</strong> и <strong>Pi</strong> на нескольких машинах.
</p>

<p align="center">
  <a href="README.md"><img src="https://img.shields.io/badge/EN-blue?style=flat" alt="EN"></a>
  <a href="README.ru.md"><img src="https://img.shields.io/badge/RU-6B7280?style=flat" alt="RU"></a>
  <a href="README.es.md"><img src="https://img.shields.io/badge/ES-red?style=flat" alt="ES"></a>
  <a href="README.cn.md"><img src="https://img.shields.io/badge/CN-green?style=flat" alt="CN"></a>
</p>

<table>
  <tr>
    <td width="50%">
      <img src="docs/media/linkedin-hero.webp" width="640" height="360" alt="skillsOS sync hero" />
    </td>
    <td width="50%">
      <a href="docs/media/twitter-loop.mp4">
        <img src="docs/media/twitter-loop-preview.gif" width="640" height="360" alt="skillsOS sync loop preview" />
      </a>
    </td>
  </tr>
</table>

## Что это

`skillsOS` — это небольшой open-source repo про одну boring operator pain:

как держать переиспользуемые workflow assets синхронизированными между несколькими машинами и изолированными рантаймами без бесконечного ручного копирования.

Это не “магический framework”.

Это узкий public slice вокруг:

- одного runnable sync CLI
- одного public pack
- одной понятной contribution surface

## Зачем это

Когда один и тот же pack должен жить на `vps1`, `vps2`, `vps3`, локальных машинах и в изолированных runtimes, drift начинается очень быстро:

- где-то уже новая версия
- где-то осталась старая копия
- где-то появился локальный tweak
- а public examples легко протекают приватными hostname, если их не обезличивать

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

## Как это работает

```text
один repo
   |
   +-- один public pack
   |      |
   |      +-- README
   |      +-- references
   |      +-- example manifests
   |
   +-- один sync CLI
          |
          +-- local runtimes
          |     +-- ~/.codex/packs-public
          |     +-- ~/.claude/packs-public
          |     +-- ~/.agents/packs-public
          |
          +-- remote aliases
                +-- vps1
                +-- vps2
                +-- vps3
```

## Текущий pack

- [`skillsos-ops-multi-machine-sync/`](./skillsos-ops-multi-machine-sync/README.md)

## Дисклеймер

Это текущий working pattern, а не финальная истина.

Если у тебя есть вариант лучше:

- star
- fork
- PR
- покажи более сильный подход

## License

[MIT License](LICENSE)

## Let's Connect

<p align="center">
  <a href="https://x.com/developerisnow1"><img src="https://img.shields.io/badge/X-@developerisnow1-000000?style=for-the-badge&logo=x&logoColor=white" alt="X"></a>
  <a href="https://www.linkedin.com/company/ai-llm-neighbors/"><img src="https://img.shields.io/badge/LinkedIn-AI_Neighbors-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn"></a>
  <a href="https://useclaw.pro/verified-skills"><img src="https://img.shields.io/badge/Website-Verified_Skills-1F883D?style=for-the-badge&logo=googlechrome&logoColor=white" alt="Website"></a>
  <a href="mailto:info@llmneighbors.com"><img src="https://img.shields.io/badge/Email-info@llmneighbors.com-EA4335?style=for-the-badge&logo=gmail&logoColor=white" alt="Email"></a>
</p>
