# skillsOS

[![EN](https://img.shields.io/badge/EN-read-green?style=flat)](./README.md)
[![RU](https://img.shields.io/badge/RU-read-blue?style=flat)](./README.ru.md)
[![ES](https://img.shields.io/badge/ES-read-orange?style=flat)](./README.es.md)
[![CN](https://img.shields.io/badge/CN-read-red?style=flat)](./README.cn.md)

> Copy-paste does not survive multi-machine agent workflows for long.

![Claude Code](https://img.shields.io/badge/Claude_Code-D97757?style=flat&logo=anthropic&logoColor=white)
![Codex](https://img.shields.io/badge/Codex-111111?style=flat&logo=openai&logoColor=white)
![OpenCode](https://img.shields.io/badge/OpenCode-222222?style=flat)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=node.js&logoColor=white)
![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)

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

## What Is This

`skillsOS` is a small open repo for one practical operator problem:

keeping reusable workflow assets in sync across several machines and isolated runtimes without endless manual copy-paste.

This repo is not trying to be a giant framework.

It is a focused public slice around:

- one runnable sync CLI
- one public pack
- one clean contribution surface

If you work across `Codex`, `Claude Code`, `OpenCode`, `OpenClaw`, `Pi`, or similar isolated runtimes, this is the kind of problem it addresses.

## Features

| Feature | What it does |
| --- | --- |
| `skillsos-sync` CLI | Plans, syncs, verifies, and snapshots one pack across multiple targets |
| Public-safe manifests | Example local and remote alias manifests without leaking private hostnames |
| Pack vs runtime split | Keeps reusable packs separate from runtime-specific skill rails |
| Side-by-side media | One image and one loop preview for social and README reuse |
| X stubs | Lightweight post drafts for `EN`, `RU`, `ES`, and `CN` |
| Contribution-first framing | Clear `Star / Fork / PR / Contribute` entrypoint |

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
| Inspect what will happen | `npm run sync:plan -- --manifest skillsos-ops-multi-machine-sync/references/skillsos-sync.example.json --all-hosts` |
| Install the pack locally | `npm run sync:apply -- --manifest skillsos-ops-multi-machine-sync/references/skillsos-sync.example.json --all-hosts` |
| Verify installed targets | `npm run sync:verify -- --manifest skillsos-ops-multi-machine-sync/references/skillsos-sync.example.json --all-hosts` |
| Inspect remote alias fan-out | `npm run sync:plan -- --manifest skillsos-ops-multi-machine-sync/references/skillsos-sync.remote-aliases.example.json --all-hosts` |

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

The main point is simple:

- keep the pack as the source
- keep installation repeatable
- keep examples generic and public-safe

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
├── posts/
│   └── x/
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

## Disclaimer

This repo is intentionally modest.

It is a current working pattern, not a universal secret playbook.

If you have a cleaner setup, a stronger install model, or a better pack structure:

- fork it
- open a PR
- show a better way

## Star History

[![Star History Chart](https://api.star-history.com/svg?repos=AI-Neighbors/skillsOS&type=Date)](https://star-history.com/#AI-Neighbors/skillsOS&Date)

## License

MIT

## Let's Connect

- X: https://x.com/developerisnow1
- LinkedIn: https://www.linkedin.com/company/ai-llm-neighbors/
- Website: https://useclaw.pro/verified-skills
- Email: info@llmneighbors.com
