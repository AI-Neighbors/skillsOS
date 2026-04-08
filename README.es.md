# skillsOS

[EN](./README.md) | [RU](./README.ru.md) | [ES](./README.es.md) | [CN](./README.cn.md)

> El copy-paste no sobrevive por mucho tiempo en workflows agentic distribuidos.

## Qué es esto

`skillsOS` es un repositorio abierto pequeño para un problema muy concreto:

mantener assets reutilizables de workflow sincronizados entre varias máquinas y runtimes aislados sin depender de copy-paste manual.

No intenta vender un “framework definitivo”.

Es un slice público pequeño alrededor de:

- un CLI de sync funcional
- un pack público
- una superficie clara para contribuir

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

## Qué incluye

- `bin/skillsos-sync.mjs`
- `skillsos-ops-multi-machine-sync/`
- `posts/x/`
- `docs/media/`

## Descargo

Esto es un patrón actual que funciona, no una fórmula universal.

Si tienes una forma mejor:

- haz fork
- abre un PR
- comparte un enfoque más limpio

## Contacto

- X: https://x.com/developerisnow1
- LinkedIn: https://www.linkedin.com/company/ai-llm-neighbors/
- Website: https://useclaw.pro/verified-skills
- Email: info@llmneighbors.com
