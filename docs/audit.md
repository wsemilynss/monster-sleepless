# 基线审计（S0）

基线：`wsemilynss/mad-medicine@fc5e3a4` 的 `index.html`（5603 行）。行号为基线行号，改动后会漂移，请以函数/常量名为准。

## 1. 屏幕流程

`FLOW`（`show(id)`，约 3074）：`screen-intro → screen-intake → screen-stage → screen-deduce → screen-report`

| 屏幕 | 行 | 作用 | 去留 |
|---|---|---|---|
| `screen-intro` | 1442 | 封面，按钮「挂号」「坐诊手册」 | 改写为夜幕封面 |
| `screen-how` | 1479 | 手册（不在 FLOW 内，由按钮打开） | 改写为玩法说明 |
| `screen-intake` | 1496 | 建档：`caseNo, fName, fAge, fSex, fJob, fH, fW, vSleep/fSleep, vStress/fStress, fEx, fDiet, fStim` | 删除（长建档） |
| `screen-stage` | 1532 | 3D 点云/光点捕捉主玩法，`buildStage()`(3281)、`completeOrb()`(3823)、线索簿、徽章架 | **保留核心** |
| `screen-deduce` | 1613 | 推理动画 `startDeduce()`(4670)，计算证型得分、五行 | 改写为“怪物现身”过场 |
| `screen-report` | 1623 | 11 个 tab 的报告 + 山河志（`buildScript()`(5220)） | 删 tab，保留怪物图鉴/寓言/雷达 |

进度条 `STEP_LABEL`：建档 / 探案 / 推理 / 报告。章节（4177–4250）与 `enterPulse()`(4436) 为切诊环节。

## 2. state 字段

```js
state = { intake:{}, clues:[], weights:{}, pulseTruth:null, pulseAnswered:0,
          scores:{}, dims:[], elements:{}, top:[], caseNo:'' }   // 3036
```

- `weights`：10 个证型键 → 累计权重（`PATTERN_KEYS.forEach(k=>state.weights[k]=0)`）
- `clues`：`{src, txt, w}`，由 `addClue()` 追加并累加权重
- 运行中动态挂载：`state.badges`（`awardBadge()`，4271 起）
- 其余运行期全局：`LANG`（zh/en）、`ORBS / orbDone / orbTotal / curOrb`（3150）、XP（`awardXP`）、`muted`
- 持久化：仅 `localStorage['mm_mute']`（音效开关）。已有 `mm_` 前缀。
- URL 参数：仅 `patrol`（5539，巡检用）；`?debugNight=N` 尚未存在。

## 3. 题库数量

| 题库 | 行 | 题数 | 选项/证词数 |
|---|---|---|---|
| `Q_OBSERVE` 望 | 2098 | 5 | 36 |
| `Q_LISTEN` 闻 | 2123 | 4 | 24 |
| `Q_INQUIRE` 问 | 2143 | 8 组 | 45（寒热5、头面5、胸腹7、饮食5、二便5、睡眠4、精力6、心神8） |
| `Q_FEMALE` 经期 | 2179 | 1 组 | 4 |
| 切诊 | 2044/2059 | 脉象由 `PULSE_OF` 生成，`PULSE_WEIGHTS` 回写权重 | — |

合计：题目 18 组、选项 109 条。另有 `Q_LEAD`（2184）问诊引导语 8 条，`DEGREES`/`DEG5` 程度量表。每个选项形如 `[中文, {证型:权重}, 英文]`，全部中英双语。

## 4. 证型 → 怪物映射

`PATTERN_KEYS`（2039）与 `BEASTS`（5183）、`PATTERNS`（2203）使用同一组键；`ELEMENT_OF`（2042）给出五行。

| 键 | 证型 | 脏腑 | 五行 | 怪物（BEASTS.src / 图片） | 志怪名 |
|---|---|---|---|---|---|
| qi | 气虚 | 脾肺 | 金 | 伦德桑塔纳 / `santana` | 谷风雀 |
| xue | 血虚 | 心肝 | 火 | 爱鱬 Lofii / `lofii` | 赤河鲤 |
| yin | 阴虚 | 肾肺 | 水 | 铂金咪咪莎 / `mimisha` | 露井灵蟾 |
| yang | 阳虚 | 肾脾 | 水 | 肯卡特勋章 / `kenkate` | 暖灶兽 |
| yu | 肝郁气滞 | 肝胆 | 木 | 明娜戈礼拜 / `minago` | 结木精 |
| pi | 脾虚湿盛 | 脾胃 | 土 | 喇嘛菜菜子 / `lama` | 仓廪官 |
| tan | 痰湿 | 脾肺 | 土 | 潮天稳 / `chaowen` | 雾泽鲛 |
| re | 湿热 | 脾胃肝胆 | 土 | 珑怖 Feadro / `feadro` | 蒸岚蟒 |
| yux | 血瘀 | 心肝 | 木 | 黑泪斯基 / `heilei` | 石桥伯 |
| huo | 心火亢盛 | 心 | 火 | 庞妮儿拉灯 / `pangdeng` | 烛宫鸦 |
| （平和） | 无明显偏颇 | — | — | `SHAN_GOD` 合瑞 Pealk / `pealk` | 山神 |

`assets/img/` 中非 BEASTS 的图：封面 `lubu`（1445）、手册 `yuling`（1472）、推理屏 `cuicui`（1614）、CSS 背景 `shanji`（1290）；`bg-vortex.jpg`、`shanjiao.jpg` 在 HTML 中未被引用，可作后续夜晚的素材。

`FABLES`（5097，另有 `FABLES_EN` 5139）为每证型的寓言；`PATTERNS_EN`（2425）为英文版。

## 5. 后续删除清单

- 长建档：`screen-intake` 及 `state.intake`、`caseNo` 相关逻辑
- 11 个报告 tab（`TAB_NAMES`，4848）：中医病机、理论依据、西医关联、心理侧写、心理深探、营养处方、药茶调理、运动康复、生活调整、疗养方式、循证交叉
- 药茶、艾灸、量表内容：`PATTERNS` 中的 `nutri / move / life`，`DEGREES / DEG5` 程度量表
- 吻合度百分比、任何健康分数/百分比显示
- 脉诊权重回写：`PULSE_WEIGHTS` 对 `state.weights` 的写入
- 文案中的“诊断/确诊/概率/剂量/治疗”及任何药物、保健品建议
- 打印/导出报告文档（`buildScript` 与 5074 附近的 `doc` 模板中含医学报告内容的部分）

## 6. 后续保留清单

- 3D 点云/光点捕捉主玩法（`buildStage`、`completeOrb`）、线索簿
- `FX` 音效、`burst` 粒子、触感 `buzz`
- `BEASTS` / `FABLES` 插画与寓言、`SHAN_GOD`
- `BADGES` / XP（`awardBadge`、`awardXP`；徽章名需改为志怪口吻）
- 五行雷达（`ELEMENT_OF`、`dims/elements`）
- `PATTERNS` 的知识字段（`name / eng / organ / one / tcm / west / psy`），改写为志怪口吻后复用
- 中英双语机制（`LANG`、`L()`、`data-zh/data-en`）
- 音效开关 `mm_mute`
- 免责声明：“这是故事，不是诊断；不舒服请找医生。”（S0 不改动代码，后续 PR 加入）

## 7. 进度

行号以上文基线为准；改动后以函数名定位。

### S1 · 瘦身（`chore/slim`）

`index.html`：455,447 B / 5,603 行 → 约 299 KB / 4,258 行。

- **入夜（原建档）**：只问怪物名字 + 1 个“它怕什么”（太亮/太吵/太冷/太热/太静）。`state.intake = {name, fear}`；`applyIntakeWeights()` 只读 `fear`（`FEARS` 表映射到初始权重），其他字段缺失也不受影响。删除 `bmi()`、`showIntakeProfile()`、`caseNo`、`Q_FEMALE`（及其引导语、图示）。
- **报告 → 日记占位**：`renderDiary()` 只渲染证型名、3 条小行动（`ACTS`，怪物口吻）和免责声明，并复用 `BEASTS` 插画与 `.beastCard` 宣纸卡。删除 11 个 tab（`tabHTML`、`TAB_NAMES`）、心理侧写、推理路径图、六维读数、导出/打印与寓言剧场生成（`buildScript*`）。`FABLES`、`BEASTS`、`SHAN_GOD` 数据保留。
- **删除内容**：`TEA`、`HABIT`、`HEAL`、`THEORY*`、`PSYDEEP*`、`TEA_NOTE*`、`LIFE_EN`、`EVIDENCE`/`EV_*`、`evHTML`、`rankOf`、`PATTERNS(_EN)` 的 `nutri/move/life/tea/habit/heal` 字段，以及对应 CSS。推理页去掉吻合度百分比和权重数字。
- **切诊 → 心跳节拍**：`enterPulse()` 只用 `PULSE_OF` 决定起始节奏和波形。`startBeatGame()`、`beatTap()`、`finishBeat()` 实现 16 拍跟拍：合拍或接近会让心跳变慢，没跟上不扣分。整个小游戏不回写 `state.weights`。删除 `PULSE_WEIGHTS`、`SHAPE_NAME*`、`PULSE_ART`、寸关尺教学、辨脉四问和自测心率。
- **题目默认单选**：`DEG5` 程度条、`CONTEXTS` 情境交叉、自述补充和“可多选”开关都收进「＋ 更多细节」折叠（`#qPanel.more`）。
- 删除巡夜模式（`?patrol`，只服务旧仓库的录屏页）。
- 补回 S0 漏拷的 `reference-figures.mp4`（`index.html` 背景人物视频引用它，否则 Pages 上 404）。

**尚未处理，留给后续任务**：`PATTERNS` 的 `tcm/west/psy` 文案、线索簿与 HUD 中的权重数字、各处“诊所/四诊”口吻、`drawWheel`（五行轮，暂未挂到日记页）。

### S2 · 光点手感（`fix/orb-feel`，叠在 S1 之上）

- `.orb` 命中框 76px（移动端同）；`stageTap()`/`nearestOrb()` 放大判定半径（鼠标 44px、手指 60px，重叠区取最近）。
- `orbSlowFactor()`：指针靠近光点时，`stageTick` 的轨道漂移与背景 `frame()` 的镜头自转、视差一起降到约 8%。
- 每章最多 `CHAPTER_MAX = 5` 个光点；问诊取 `INQ_CORE` 5 组（总数 18 → 15）。
- `skipChapter(cat)` + 线索板「跳过本章」按钮；`skipRest()` 保留。
- 点击成功率测试方法与结果见 [s2-click-test.md](s2-click-test.md)。