# skillsOS

[EN](./README.md) | [RU](./README.ru.md) | [ES](./README.es.md) | [CN](./README.cn.md)

> 在多机与隔离运行时的 agent workflow 里，手动 copy-paste 很快就会失效。

## 这是什么

`skillsOS` 是一个围绕单一痛点构建的小型开源仓库：

如何在多台机器和隔离运行时之间同步可复用的 workflow 资产，而不是一直靠手动复制。

它不是一个“万能框架”。

它只是一个小而真实的公开切片，包括：

- 一个可运行的 sync CLI
- 一个公开 pack
- 一个清晰的协作入口

## 快速开始

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

## 仓库内容

- `bin/skillsos-sync.mjs`
- `skillsos-ops-multi-machine-sync/`
- `posts/x/`
- `docs/media/`

## 说明

这只是当前有效的 working pattern，不是通用秘诀。

如果你有更好的做法：

- star
- fork
- 提 PR

## 联系方式

- X: https://x.com/developerisnow1
- LinkedIn: https://www.linkedin.com/company/ai-llm-neighbors/
- Website: https://useclaw.pro/verified-skills
- Email: info@llmneighbors.com
