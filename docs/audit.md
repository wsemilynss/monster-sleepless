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
