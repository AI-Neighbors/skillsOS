# skillsOS

[English](README.md) | [Русский](README.ru.md) | [Español](README.es.md) | [中文](README.cn.md)

Public directory of reusable operator skills and playbooks.

<p align="center">
  <a href="https://github.com/AI-Neighbors/skillsOS">
    <img src="docs/media/linkedin-hero.webp" alt="skillsOS hero" width="800">
  </a>
</p>

<p align="center">
  <em>One repo. One public directory. Reusable packs across isolated runtimes.</em><br>
  Manual copy-paste breaks fast once you run <strong>Claude Code</strong>, <strong>Codex</strong>, <strong>OpenCode</strong>, <strong>OpenClaw</strong>, and <strong>Pi</strong> across several machines.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Claude_Code-D97757?style=flat&logo=anthropic&logoColor=white" alt="Claude Code">
  <img src="https://img.shields.io/badge/Codex-111111?style=flat&logo=openai&logoColor=white" alt="Codex">
  <img src="https://img.shields.io/badge/OpenCode-222222?style=flat" alt="OpenCode">
  <img src="https://img.shields.io/badge/Node.js-339933?style=flat&logo=node.js&logoColor=white" alt="Node.js">
  <a href="LICENSE"><img src="https://img.shields.io/badge/License-MIT-blue.svg" alt="License MIT"></a>
  <br>
  <a href="README.md"><img src="https://img.shields.io/badge/EN-blue?style=flat" alt="EN"></a>
  <a href="README.ru.md"><img src="https://img.shields.io/badge/RU-6B7280?style=flat" alt="RU"></a>
  <a href="README.es.md"><img src="https://img.shields.io/badge/ES-red?style=flat" alt="ES"></a>
  <a href="README.cn.md"><img src="https://img.shields.io/badge/CN-green?style=flat" alt="CN"></a>
</p>

---

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

<p align="center"><strong>One public pack · one sync CLI · one contribution surface</strong></p>

<p align="center">
  <a href="https://github.com/AI-Neighbors/skillsOS/stargazers"><img src="https://img.shields.io/badge/Star-Repository-black?style=for-the-badge&logo=github" alt="Star Repository"></a>
  <a href="https://github.com/AI-Neighbors/skillsOS/fork"><img src="https://img.shields.io/badge/Fork-Repository-24292F?style=for-the-badge&logo=github" alt="Fork Repository"></a>
  <a href="https://github.com/AI-Neighbors/skillsOS/pulls"><img src="https://img.shields.io/badge/Send-PR-2EA043?style=for-the-badge&logo=github" alt="Send PR"></a>
</p>

## What Is This

`skillsOS` is a public-safe directory of reusable operator skills and playbooks built from real work.

The current public-facing direction is the directory surface itself: clear categories and shipped entries.

It exists to solve one operator problem:

keeping reusable workflow assets in sync across several machines and isolated runtimes without endless manual copy-paste.

This repo is intentionally narrow and stays focused on one public pack, one sync CLI, and one clear contribution surface.

It is not trying to be a giant framework or a universal secret playbook.

It is a public working slice built around:

- one runnable sync CLI
- one public pack
- one clear contribution surface

## Who This Helps

- people who need reusable workflow assets across several machines
- operators who want one clear public pack instead of scattered notes
- contributors who need a readable install-and-PR path

## Why This Exists

When the same pack needs to live across `vps1`, `vps2`, `vps3`, local machines, and isolated runtimes, drift starts fast:

- one runtime gets the new pack
- another keeps the old copy
- one host has a local tweak nobody remembers
- examples leak private hostnames unless you clean them up on purpose

`skillsOS` exists to keep that boring operator problem explicit and reproducible.

It is not auth, SSO, or product-platform work.

## Quick Start

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

## Usage

| Need | Command |
| --- | --- |
| See what will change | `npm run sync:plan -- --manifest skillsos-ops-multi-machine-sync/references/skillsos-sync.example.json --all-hosts` |
| Install the public pack | `npm run sync:apply -- --manifest skillsos-ops-multi-machine-sync/references/skillsos-sync.example.json --all-hosts` |
| Verify targets after sync | `npm run sync:verify -- --manifest skillsos-ops-multi-machine-sync/references/skillsos-sync.example.json --all-hosts` |
| Preview remote alias fan-out | `npm run sync:plan -- --manifest skillsos-ops-multi-machine-sync/references/skillsos-sync.remote-aliases.example.json --all-hosts` |

## How It Works

```text
one repo
   |
   +-- one public pack
   |      |
   |      +-- README
   |      +-- references
   |      +-- example manifests
   |
   +-- one sync CLI
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

The model is simple:

- keep the pack as the source
- keep installation repeatable
- keep public examples anonymous and safe

## Project Structure

```text
skillsOS/
├── README.md
├── README.ru.md
├── README.es.md
├── README.cn.md
├── package.json
├── bin/
│   └── skillsos-sync.mjs
├── docs/
│   └── media/
└── skillsos-ops-multi-machine-sync/
    ├── README.md
    └── references/
        ├── architecture.md
        ├── roadmap.md
        ├── ssh-config.example
        ├── skillsos-sync.example.json
        └── skillsos-sync.remote-aliases.example.json
```

## Current Pack

- [`skillsos-ops-multi-machine-sync/`](./skillsos-ops-multi-machine-sync/README.md)

## Browse the Directory

This public directory currently has one shipped entry and one first category:

- `Category`: `Multi-machine sync`
- `Entry`: [`skillsos-ops-multi-machine-sync/`](./skillsos-ops-multi-machine-sync/README.md)

## First Entry

If you are here to understand the current public slice, start with:

- [`skillsos-ops-multi-machine-sync/README.md`](./skillsos-ops-multi-machine-sync/README.md)

That pack is the current bounded delivery base for the public directory rail.

## Disclaimer

This repo shows a current working pattern, not the final answer.

If you have a cleaner setup, a stronger install model, or a better structure:

- star it
- fork it
- open a PR
- show a better way

## Star History

<a href="https://www.star-history.com/?repos=AI-Neighbors%2FskillsOS&type=timeline&legend=top-left">
 <picture>
   <source media="(prefers-color-scheme: dark)" srcset="https://api.star-history.com/chart?repos=AI-Neighbors/skillsOS&type=timeline&theme=dark&legend=top-left" />
   <source media="(prefers-color-scheme: light)" srcset="https://api.star-history.com/chart?repos=AI-Neighbors/skillsOS&type=timeline&legend=top-left" />
   <img alt="Star History Chart" src="https://api.star-history.com/chart?repos=AI-Neighbors/skillsOS&type=timeline&legend=top-left" />
 </picture>
</a>

## License

This project is released under the [MIT License](LICENSE).

## Let's Connect

<p align="center">
  <a href="https://x.com/developerisnow1"><img src="https://img.shields.io/badge/X-@developerisnow1-000000?style=for-the-badge&logo=x&logoColor=white" alt="X"></a>
  <a href="https://www.linkedin.com/company/ai-llm-neighbors/"><img src="https://img.shields.io/badge/LinkedIn-AI_Neighbors-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn"></a>
  <a href="https://useclaw.pro/verified-skills"><img src="https://img.shields.io/badge/Website-Verified_Skills-1F883D?style=for-the-badge&logo=googlechrome&logoColor=white" alt="Website"></a>
  <a href="mailto:info@llmneighbors.com"><img src="https://img.shields.io/badge/Email-info@llmneighbors.com-EA4335?style=for-the-badge&logo=gmail&logoColor=white" alt="Email"></a>
</p>
