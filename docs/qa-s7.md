# S7 检查清单与结果

## 改动摘要
- 死代码清理：删除未使用的 `buildFigure / decorate`（旧点云人形）、`Q_LEAD`（旧“你”式引导语表）、`PATTERNS / PATTERNS_EN`（旧医学知识表，已由 `VISITOR_CARDS / PATTERN_ACTS` 取代）、`renderOptsSingle/Multi`、`collectSingle/Multi`、`topPatterns`、`drawWheel`、`openDock`、`pName`。文件 455,447 B（S0）→ 352,094 B（约 344 KB）。
- 背景漂浮字 `WORDS` 由脏象/体征读数（`HR 72`、`36.5°C`、`SpO₂ 98`…）换成更名/钟点/星月，页面上不再出现类似健康读数的文字。
- 开场页四个步骤的印章由“挂寻收鉴”改为“子丑寅卯”；手机上步骤收成一行 4 格，“开门让它进来”在 360×740 内可见（按钮底边 631px）。
- 无障碍：顶栏「动效 ON/OFF」（`mm_motion`，默认跟随系统 `prefers-reduced-motion`；关闭后光点不漂移、镜头不自转、不震动）；音效按钮 `aria-pressed`；光点 `role=button` + 键盘 Enter/空格；`:focus-visible` 焦点环；「跳到内容」链接；`role=main`；心跳按钮 `aria-label`；`--ink-dim` 提亮。
- 性能：`window.setLite()`——`?lite=1` 或运行中持续掉帧（>34ms 的帧累计超过 45）自动进入：DPR 1、暂停并隐藏多余颗粒视频、关闭扫描线/云/极光/颗粒与 backdrop-filter。
- 文档：README 重写（玩法、存档、调试参数、无障碍、免责声明）；本文件。
- 发布：`怪物夜未眠.html` 为 `index.html` 的命名副本。

## 检查结果（桌面 1366×820 与 360×740，控制台均无报错）
| 项 | 结果 |
|---|---|
| 首夜全流程（建档→15 光点→心跳→日出→日记） | 通过；`mm_save` 写入 `nights=1`，`sunrise1` 徽章 |
| 再次打开 → 今晚继续 → 5 光点 → 哄睡 → 日记 | 通过；`nights=2`，`visitors.heat=2` |
| 图鉴（单页、剪影/解锁） | 通过 |
| 减少动效 | 开启后光点位置 1.5s 内不变，关闭后移动 |
| lite 模式 | `body.lite`、DPR=1、多余颗粒视频隐藏 |
| 顶栏 360px | 4 个按钮不溢出（右边界 350px） |
| 图片 alt / 按钮名称 / 重复 id | 0 / 0（心跳按钮已补）/ 0 |
| 文案检索 | “诊断/确诊/概率/剂量/治疗”只出现在免责声明与 meta 描述的“这是故事，不是诊断” |

## Lighthouse
当前环境没有 Node 和 Chrome 命令行，无法运行 Lighthouse，上表用等价的人工检查代替（viewport、`lang`、`title`、`alt`、按钮可访问名称、重复 id、触控区、键盘焦点、减少动效）。建议在 Chrome DevTools → Lighthouse（移动端）对发布页再跑一次。

## 已知
- 英文模式、真机性能未测。
- 光点的 `aria-label` 在切换语言后不会更新（下次捕捉前仍是旧语言）。