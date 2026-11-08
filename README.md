# 怪物夜未眠 · Monster Sleepless

一切从深夜开始：玩家陪一只睡不着的怪物度过一夜，之后每晚回来。

轻量交互游戏，游戏性第一。失眠与健康科普只是剧情——这里没有检查、没有治疗，也不输出诊断。

> 这是故事，不是诊断；不舒服请找医生。

## 来源

由 [wsemilynss/mad-medicine](https://github.com/wsemilynss/mad-medicine) 的提交 `fc5e3a4` 复制而来（`index.html` 与 `assets/`）。
S0 阶段除 `<title>` 外代码零改动，行为与原版一致；后续按 `docs/audit.md` 中的清单逐步改造。

## 技术约束

- 单文件 `index.html`，无框架、无后端、不上传数据
- localStorage 键使用 `mm_` 前缀；调试参数 `?debugNight=N`（后续任务实现）
- 部署：GitHub Pages

## 本地运行

```
python3 -m http.server 8765
```

然后打开 <http://localhost:8765/>。

## 文档

- [docs/audit.md](docs/audit.md)：基线审计（屏幕流程、state、题库、证型→怪物映射、删/留清单）
