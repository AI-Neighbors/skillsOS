# skillsOS

Reusable agent workflow packs for multi-machine and isolated-runtime setups.

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

## Why this repo exists

One operator pain keeps showing up in AI engineering:

- the same useful rules and workflow pieces need to exist across several machines
- some runtimes must stay isolated
- manual copy-paste drifts fast

This repo is a small public slice around one current answer:

- one runnable sync CLI
- one public pack
- one place to improve the pattern together

## Current pack

- [`skillsos-ops-multi-machine-sync/`](./skillsos-ops-multi-machine-sync/README.md)

## Quick start

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

## What is included

- `bin/skillsos-sync.mjs` = thin CLI
- `skillsos-ops-multi-machine-sync/` = public pack
- `posts/x/` = lightweight X stubs for publishing
- `docs/media/` = reusable social assets

## Contribution

If this pain looks familiar:

- star the repo
- fork it
- open a PR
- show a better pattern

The goal is not to pretend this is a finished framework.
The goal is to make one useful operator pattern easier to reuse and improve together.
