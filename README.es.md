# skillsOS

[English](README.md) | [Русский](README.ru.md) | [Español](README.es.md) | [中文](README.cn.md)

<p align="center">
  <a href="https://github.com/AI-Neighbors/skillsOS">
    <img src="docs/media/linkedin-hero.webp" alt="skillsOS hero" width="800">
  </a>
</p>

<p align="center">
  <em>Un repo. Packs reutilizables para runtimes aislados.</em><br>
  El copy-paste manual se rompe rápido cuando ejecutas <strong>Claude Code</strong>, <strong>Codex</strong>, <strong>OpenCode</strong>, <strong>OpenClaw</strong> y <strong>Pi</strong> en varias máquinas.
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

## Qué es esto

`skillsOS` es un repo open source pequeño para un problema operativo muy concreto:

mantener assets reutilizables sincronizados entre varias máquinas y runtimes aislados sin depender de copy-paste manual.

No es un framework mágico.

Es un slice público centrado en:

- un sync CLI ejecutable
- un pack público
- una superficie clara para contribuir

## Por qué existe

Cuando el mismo pack debe vivir en `vps1`, `vps2`, `vps3`, máquinas locales y runtimes aislados, el drift aparece rápido:

- un runtime recibe la versión nueva
- otro conserva la copia vieja
- un host tiene un tweak local
- y los ejemplos públicos pueden filtrar hostnames privados si no los anonimiza alguien

## Inicio rápido

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

## Cómo funciona

```text
un repo
   |
   +-- un pack público
   |      |
   |      +-- README
   |      +-- references
   |      +-- manifests de ejemplo
   |
   +-- un sync CLI
          |
          +-- runtimes locales
          |     +-- ~/.codex/packs-public
          |     +-- ~/.claude/packs-public
          |     +-- ~/.agents/packs-public
          |
          +-- aliases remotos
                +-- vps1
                +-- vps2
                +-- vps3
```

## Pack actual

- [`skillsos-ops-multi-machine-sync/`](./skillsos-ops-multi-machine-sync/README.md)

## Descargo

Este repo muestra un patrón que funciona hoy, no una respuesta final.

Si tienes una forma mejor:

- star
- fork
- PR
- comparte una versión más sólida

## License

[MIT License](LICENSE)

## Let's Connect

<p align="center">
  <a href="https://x.com/developerisnow1"><img src="https://img.shields.io/badge/X-@developerisnow1-000000?style=for-the-badge&logo=x&logoColor=white" alt="X"></a>
  <a href="https://www.linkedin.com/company/ai-llm-neighbors/"><img src="https://img.shields.io/badge/LinkedIn-AI_Neighbors-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn"></a>
  <a href="https://useclaw.pro/verified-skills"><img src="https://img.shields.io/badge/Website-Verified_Skills-1F883D?style=for-the-badge&logo=googlechrome&logoColor=white" alt="Website"></a>
  <a href="mailto:info@llmneighbors.com"><img src="https://img.shields.io/badge/Email-info@llmneighbors.com-EA4335?style=for-the-badge&logo=gmail&logoColor=white" alt="Email"></a>
</p>
