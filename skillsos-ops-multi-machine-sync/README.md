# SkillsOS Ops - Multi-Machine Sync

This pack is about one practical problem:

keeping reusable workflow assets in sync across several machines and isolated runtimes without endless manual copy-paste.

Typical surfaces in that setup:

- `Codex`
- `Claude Code`
- `OpenCode`
- `OpenClaw`
- `Pi`

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

## Pack layout

- `references/architecture.md` = why this exists and how the parts fit together
- `references/roadmap.md` = near-term improvements without pretending they are shipped
- `references/skillsos-sync.example.json` = safe local example
- `references/skillsos-sync.remote-aliases.example.json` = public-safe remote alias example
- `references/ssh-config.example` = generic SSH alias template

## Contribution

This pack is intentionally small.

If you want to improve it:

- open an issue
- fork the repo
- send a PR
- show a cleaner sync pattern
