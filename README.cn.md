# skillsOS

[English](README.md) | [Русский](README.ru.md) | [Español](README.es.md) | [中文](README.cn.md)

<p align="center">
  <a href="https://github.com/AI-Neighbors/skillsOS">
    <img src="docs/media/linkedin-hero.webp" alt="skillsOS hero" width="800">
  </a>
</p>

<p align="center">
  <em>一个仓库。让隔离 runtimes 复用同一套 packs。</em><br>
  当你把 <strong>Claude Code</strong>、<strong>Codex</strong>、<strong>OpenCode</strong>、<strong>OpenClaw</strong> 和 <strong>Pi</strong> 跑在多台机器上时，手动 copy-paste 很快就会失控。
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

## 这是什么

`skillsOS` 是一个围绕单一操作痛点构建的小型 open source 仓库：

在多台机器和隔离 runtimes 之间同步可复用 workflow assets，而不是长期依赖手动复制。

它不是一个“万能框架”。

它只是一个公开、可运行的小切片，包含：

- 一个可执行的 sync CLI
- 一个公开 pack
- 一个清晰的协作入口

## 为什么要做

当同一个 pack 需要同时存在于 `vps1`、`vps2`、`vps3`、本地机器和隔离 runtimes 时，drift 很快就会出现：

- 有的 runtime 已经更新
- 有的还保留旧副本
- 有的 host 带着没人记得的本地 tweak
- 如果不主动脱敏，公开示例还可能泄露私有 hostname

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

## 它如何工作

```text
一个仓库
   |
   +-- 一个公开 pack
   |      |
   |      +-- README
   |      +-- references
   |      +-- 示例 manifests
   |
   +-- 一个 sync CLI
          |
          +-- 本地 runtimes
          |     +-- ~/.codex/packs-public
          |     +-- ~/.claude/packs-public
          |     +-- ~/.agents/packs-public
          |
          +-- 远程 aliases
                +-- vps1
                +-- vps2
                +-- vps3
```

## 当前 pack

- [`skillsos-ops-multi-machine-sync/`](./skillsos-ops-multi-machine-sync/README.md)

## 免责声明

这个仓库展示的是当前有效的 working pattern，不是最终答案。

如果你有更好的方式：

- star
- fork
- PR
- 提出更强的实现

## License

[MIT License](LICENSE)

## Let's Connect

<p align="center">
  <a href="https://x.com/developerisnow1"><img src="https://img.shields.io/badge/X-@developerisnow1-000000?style=for-the-badge&logo=x&logoColor=white" alt="X"></a>
  <a href="https://www.linkedin.com/company/ai-llm-neighbors/"><img src="https://img.shields.io/badge/LinkedIn-AI_Neighbors-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn"></a>
  <a href="https://useclaw.pro/verified-skills"><img src="https://img.shields.io/badge/Website-Verified_Skills-1F883D?style=for-the-badge&logo=googlechrome&logoColor=white" alt="Website"></a>
  <a href="mailto:info@llmneighbors.com"><img src="https://img.shields.io/badge/Email-info@llmneighbors.com-EA4335?style=for-the-badge&logo=gmail&logoColor=white" alt="Email"></a>
</p>
