# PZ Survival Guide Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a Project Zomboid B41 game guide as a VitePress static site, deploy to GitHub Pages.

**Architecture:** VitePress with custom dark survival theme. Markdown content files organized by 8 game categories. Sidebar navigation auto-generated from config. Static build output deployed to `gh-pages` branch via GitHub Actions.

**Tech Stack:** VitePress (Vue 3), Markdown, custom CSS, GitHub Actions, GitHub Pages

---

## File Structure

```
pz-guide/
├── .github/workflows/deploy.yml     # GitHub Actions deploy
├── docs/
│   ├── .vitepress/
│   │   ├── config.ts                # VitePress config + sidebar + nav
│   │   └── theme/
│   │       └── custom.css           # Dark survival theme CSS
│   ├── index.md                     # Homepage
│   ├── occupations/
│   │   ├── index.md                 # Overview
│   │   ├── traits.md                # Positive & negative traits
│   │   └── builds.md                # Recommended builds
│   ├── skills/
│   │   ├── index.md                 # Skill system overview
│   │   ├── skill-books.md           # Skill books table
│   │   └── vhs-tapes.md             # VHS tapes table
│   ├── crafting/
│   │   └── index.md                 # Crafting recipes by skill
│   ├── maps/
│   │   └── index.md                 # Town overviews & base locations
│   ├── food-farming/
│   │   └── index.md                 # Farming, cooking, preservation
│   ├── combat/
│   │   └── index.md                 # Weapons, zombie types, tactics
│   ├── vehicles/
│   │   └── index.md                 # Vehicle types, repair, hotwiring
│   └── survival/
│       └── index.md                 # Water/power, winter, medical, base
├── package.json
└── .gitignore
```

---

### Task 1: Initialize VitePress project

**Files:**
- Create: `package.json`
- Create: `.gitignore`
- Create: `docs/.vitepress/config.ts`

- [ ] **Step 1: Write package.json**

```json
{
  "name": "pz-guide",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "vitepress dev docs",
    "build": "vitepress build docs",
    "preview": "vitepress preview docs"
  },
  "devDependencies": {
    "vitepress": "^1.6.0"
  }
}
```

- [ ] **Step 2: Write .gitignore**

```
node_modules/
.vitepress/dist/
.vitepress/cache/
```

- [ ] **Step 3: Install dependencies**

Run: `npm install` (from project root `/c/Users/Administrator/Desktop/pz-guide`)
Expected: installed successfully

- [ ] **Step 4: Start dev server and verify it works**

Run: `npm run dev`
Expected: VitePress starts, visit http://localhost:5173

- [ ] **Step 5: Commit**

```bash
git init
git add package.json .gitignore
git commit -m "chore: init VitePress project"
```

---

### Task 2: Configure VitePress sidebar, nav, and search

**Files:**
- Modify: `docs/.vitepress/config.ts`

- [ ] **Step 1: Write full VitePress config**

```typescript
import { defineConfig } from "vitepress";

export default defineConfig({
  title: "PZ Survival Guide",
  description: "僵尸毁灭工程 B41 生存指南",
  lang: "zh-CN",
  base: "/pz-guide/",
  lastUpdated: true,
  head: [["link", { rel: "icon", href: "/pz-guide/favicon.ico" }]],

  themeConfig: {
    search: {
      provider: "local",
    },
    nav: [
      { text: "首页", link: "/" },
      { text: "GitHub", link: "https://github.com" },
    ],
    sidebar: [
      {
        text: "📋 职业与特性",
        collapsed: false,
        items: [
          { text: "概览", link: "/occupations/" },
          { text: "特性大全", link: "/occupations/traits" },
          { text: "推荐搭配", link: "/occupations/builds" },
        ],
      },
      {
        text: "🔧 技能系统",
        collapsed: false,
        items: [
          { text: "技能概览", link: "/skills/" },
          { text: "技能书", link: "/skills/skill-books" },
          { text: "VHS 录像带", link: "/skills/vhs-tapes" },
        ],
      },
      {
        text: "🛠️ 制作配方",
        collapsed: false,
        items: [{ text: "配方速查", link: "/crafting/" }],
      },
      {
        text: "🗺️ 地图",
        collapsed: false,
        items: [{ text: "城镇与据点", link: "/maps/" }],
      },
      {
        text: "🥕 食物与农耕",
        collapsed: false,
        items: [{ text: "农耕与烹饪", link: "/food-farming/" }],
      },
      {
        text: "⚔️ 战斗",
        collapsed: false,
        items: [{ text: "武器与战斗", link: "/combat/" }],
      },
      {
        text: "🚗 车辆",
        collapsed: false,
        items: [{ text: "车辆指南", link: "/vehicles/" }],
      },
      {
        text: "🩺 生存技巧",
        collapsed: false,
        items: [{ text: "生存要领", link: "/survival/" }],
      },
    ],
    docFooter: { prev: "上一页", next: "下一页" },
    outline: { label: "本页导航" },
    lastUpdated: { text: "最后更新" },
  },
});
```

- [ ] **Step 2: Verify dev server shows sidebar with 8 categories**

Run: `npm run dev`
Expected: sidebar visible with all 8 categories, search bar present

- [ ] **Step 3: Commit**

```bash
git add docs/.vitepress/config.ts
git commit -m "feat: configure VitePress sidebar, nav, and local search"
```

---

### Task 3: Write custom dark survival theme CSS

**Files:**
- Create: `docs/.vitepress/theme/custom.css`
- Create: `docs/.vitepress/theme/index.ts`

- [ ] **Step 1: Write theme entry file**

File: `docs/.vitepress/theme/index.ts`
```typescript
import DefaultTheme from "vitepress/theme";
import "./custom.css";

export default DefaultTheme;
```

- [ ] **Step 2: Write custom.css with dark survival theme**

File: `docs/.vitepress/theme/custom.css`
```css
:root {
  --vp-c-bg: #0d0d0d;
  --vp-c-bg-soft: #141414;
  --vp-c-bg-alt: #1a1a1a;
  --vp-c-bg-elv: #1f1f1f;
  --vp-c-border: #2a1515;
  --vp-c-divider: #222;
  --vp-c-text-1: #ccc;
  --vp-c-text-2: #999;
  --vp-c-text-3: #666;
  --vp-c-brand-1: #8b0000;
  --vp-c-brand-2: #a01010;
  --vp-c-brand-3: #6b0000;
  --vp-c-brand-soft: rgba(139, 0, 0, 0.15);
  --vp-c-tip-1: #8b0000;
  --vp-c-tip-2: #6b0000;
  --vp-c-tip-3: #8b0000;
  --vp-c-tip-soft: rgba(139, 0, 0, 0.15);
  --vp-c-warning-1: #c44;
  --vp-c-warning-2: #a33;
  --vp-c-warning-soft: rgba(204, 68, 68, 0.15);
  --vp-c-danger-1: #c44;
  --vp-c-danger-2: #a33;
  --vp-c-danger-soft: rgba(204, 68, 68, 0.12);
  --vp-button-brand-bg: #8b0000;
  --vp-button-brand-hover-bg: #a01010;
  --vp-button-brand-active-bg: #6b0000;
  --vp-button-brand-text: #eee;
  --vp-custom-block-tip-bg: #1a1414;
  --vp-custom-block-tip-border: #8b0000;
  --vp-custom-block-warning-bg: #1a1414;
  --vp-custom-block-warning-border: #c44;
  --vp-custom-block-danger-bg: #1a1414;
  --vp-custom-block-danger-border: #c44;
  --vp-code-block-bg: #0f0f0f;
  --vp-code-line-highlight-color: rgba(139, 0, 0, 0.1);
  --vp-sidebar-bg-color: #0f0f0f;
}

/* Sidebar */
.VPSidebar {
  background: #0f0f0f !important;
  border-right: 1px solid #2a1515 !important;
}
.VPSidebarItem .item .link.active {
  background: #1a1a1a !important;
  border-left: 2px solid #8b0000;
}
.VPSidebarItem .item .link:hover {
  color: #8b0000 !important;
}

/* Navbar */
.VPNav {
  background: #0f0f0f !important;
  border-bottom: 1px solid #2a1515 !important;
}
.VPNavBarTitle .title {
  color: #8b0000 !important;
  font-weight: bold;
}

/* Tables */
.vp-doc table {
  background: #141414;
  border: 1px solid #222;
}
.vp-doc th {
  background: #1a1a1a;
  color: #999;
  border-color: #333;
}
.vp-doc td {
  border-color: #222;
  color: #ccc;
}
.vp-doc tr:nth-child(2n) {
  background: #111;
}

/* Scrollbar */
::-webkit-scrollbar {
  width: 8px;
}
::-webkit-scrollbar-track {
  background: #0d0d0d;
}
::-webkit-scrollbar-thumb {
  background: #333;
  border-radius: 4px;
}
::-webkit-scrollbar-thumb:hover {
  background: #8b0000;
}

/* Custom block overrides */
.vp-doc .custom-block.tip {
  background: #1a1414;
  border-left: 3px solid #8b0000;
  border-radius: 0 4px 4px 0;
}
.vp-doc .custom-block.warning {
  background: #1a1414;
  border-left: 3px solid #c44;
  border-radius: 0 4px 4px 0;
}

/* Search */
.VPSearch {
  color: #ccc;
}
```

- [ ] **Step 3: Verify theme in browser**

Run: `npm run dev`
Expected: dark background, red accents, blood-red sidebar active links, dark tables

- [ ] **Step 4: Commit**

```bash
git add docs/.vitepress/theme/
git commit -m "feat: add dark survival theme CSS"
```

---

### Task 4: Write homepage (index.md)

**Files:**
- Create: `docs/index.md`

- [ ] **Step 1: Write homepage**

```markdown
---
layout: home
hero:
  name: "Project Zomboid"
  text: "B41 生存指南"
  tagline: 僵尸毁灭工程 — 从幸存到主宰的完全参考
  actions:
    - theme: brand
      text: 🧟 开始查阅
      link: /occupations/
    - theme: alt
      text: 技能系统
      link: /skills/

features:
  - icon: 📋
    title: 职业与特性
    details: 21 个职业详解，正负面特性全收录，推荐搭配方案
    link: /occupations/
  - icon: 🔧
    title: 技能系统
    details: 各技能经验来源、技能书倍率、VHS 录像带大全
    link: /skills/
  - icon: 🛠️
    title: 制作配方
    details: 按技能分类的全部配方，材料与工具速查
    link: /crafting/
  - icon: 🗺️
    title: 地图攻略
    details: 五大城镇分析，重要建筑标注，最佳安全屋推荐
    link: /maps/
  - icon: 🥕
    title: 食物与农耕
    details: 作物周期产量表，烹饪食谱，保鲜与储存
    link: /food-farming/
  - icon: ⚔️
    title: 武器与战斗
    details: 全武器数据对比，僵尸行为分析，走位与风筝技巧
    link: /combat/
  - icon: 🚗
    title: 车辆
    details: 车型对比，零件修理，接线偷车与日常维护
    link: /vehicles/
  - icon: 🩺
    title: 生存技巧
    details: 断水断电应对、冬季生存、医疗急救、安全屋建造
    link: /survival/
---

::: warning B41 版本说明
本指南所有内容基于 **Project Zomboid Build 41** 稳定版。B42 或实验性版本的改动将不会被包含，以确保信息的准确性。
:::
```

- [ ] **Step 2: Verify homepage renders**

Run: `npm run dev`
Expected: hero section with "Project Zomboid B41 生存指南", 8 feature cards, version warning

- [ ] **Step 3: Commit**

```bash
git add docs/index.md
git commit -m "feat: add homepage with feature cards"
```

---

### Task 5: Occupations & Traits pages

**Files:**
- Create: `docs/occupations/index.md`
- Create: `docs/occupations/traits.md`
- Create: `docs/occupations/builds.md`

- [ ] **Step 1: Write occupations overview**

File: `docs/occupations/index.md`
```markdown
# 📋 职业与特性

Project Zomboid B41 有 **21 个职业**（Occupation）和 **88 个特性**（Traits）。角色创建时职业决定初始技能等级和经验倍率，特性影响角色强弱，正负面特性点数平衡。

## 职业列表

| 职业 | 初始技能 | 经验倍率 | 点数消耗 |
|------|---------|---------|---------|
| 失业 (Unemployed) | 无 | 无 | 0 |
| 消防员 (Fire Officer) | 冲刺+1 体格+1 斧头+1 | 体格 125% 冲刺 125% 斧头 100% | -8 |
| 警察 (Police Officer) | 瞄准+3 装弹+2 灵活+1 | 瞄准 125% 装弹 125% | -4 |
| 公园管理员 (Park Ranger) | 斧头+1 木工+1 采集+2 诱捕+2 | 斧头 125% 采集 125% 诱捕 125% | -4 |
| 建筑工 (Construction Worker) | 木工+3 短棍+1 | 木工 125% | -6 |
| 保安 (Security Guard) | 冲刺+2 轻手轻脚+1 | 冲刺 125% | -2 |
| 木匠 (Carpenter) | 木工+3 | 木工 125% | 2 |
| 大盗 (Burglar) | 潜行+2 轻手轻脚+2 灵活+2 | 潜行 125% 轻手轻脚 125% | -6 |
| 厨师 (Chef) | 烹饪+3 短刀+1 维护+1 | 烹饪 125% | -4 |
| 修理工 (Repairman) | 维护+2 木工+1 短棍+1 | 维护 125% | -4 |
| 农民 (Farmer) | 农耕+3 采集+1 | 农耕 125% | -2 |
| 渔夫 (Fisherman) | 钓鱼+3 采集+1 | 钓鱼 125% | -2 |
| 医生 (Doctor) | 急救+3 短刀+1 | 急救 125% | -4 |
| 退伍兵 (Veteran) | 瞄准+2 装弹+2 | 瞄准 125% 装弹 125% | -8 |
| 护士 (Nurse) | 急救+2 轻手轻脚+1 | 急救 125% | -2 |
| 健身教练 (Fitness Instructor) | 体格+3 冲刺+2 | 体格 125% 冲刺 125% | -6 |
| 汉堡店员工 (Burger Flipper) | 烹饪+2 维护+1 短刀+1 | 烹饪 125% | -2 |
| 电工 (Electrician) | 电工+3 | 电工 125% | -4 |
| 工程师 (Engineer) | 木工+1 电工+1 | 木工 125% 电工 125% | -4 |
| 机械师 (Mechanic) | 机械+3 | 机械 125% | -4 |
| 金属工 (Metalworker) | 金属加工+3 | 金属加工 125% | -6 |

## 经验倍率说明

- 125% 倍率 = 获得经验时额外 +25%
- 100% 倍率 = 标准经验获取
- 无倍率 = 无加成

::: tip 老兵职业亮点
退伍兵 (Veteran) 独有特性「Desensitized」——永远不会恐慌，意味着精准度不受僵尸群数量影响，是枪械流派的首选。
:::
```

- [ ] **Step 2: Write traits page**

File: `docs/occupations/traits.md`
```markdown
# 特性大全

角色创建时可为角色选择正面特性（消耗点数）和负面特性（获得点数）。

## 正面特性

### S 级推荐

| 特性 | 点数 | 效果 |
|------|------|------|
| Cat's Eyes (猫眼) | -2 | 夜间视野 +20%，黑暗中也能看清 |
| Wakeful (浅眠) | -2 | 仅需睡 70% 时长的睡眠，更多时间行动 |
| Dextrous (灵巧) | -2 | 物品转移速度 +50% |
| Fast Learner (学习能力) | -6 | 所有技能经验获取 +30% |
| Keen Hearing (敏锐听觉) | -6 | 身后感知范围 +100%，被偷袭概率大减 |
| Organized (有条理) | -6 | 容器容量 +30% |
| Strong (强壮) | -10 | 近战伤害 +40%，负重 +2 |
| Athletic (运动健将) | -10 | 跑步速度 +20%，冲刺耐力消耗 -40% |

### 防御生存类

| 特性 | 点数 | 效果 |
|------|------|------|
| Thick Skinned (厚皮) | -8 | 被咬概率 -15%，被抓概率 -30% |
| Lucky (幸运) | -4 | 罕见战利品爆率 +10% |
| Graceful (优雅) | -4 | 移动噪音 -60% |
| Inconspicuous (不起眼) | -4 | 僵尸察觉范围 -50% |
| Iron Gut (铁胃) | -3 | 食物中毒概率 -100% |
| Outdoorsman (户外达人) | -2 | 不受恶劣天气影响，感冒概率 -90% |
| Brave (勇敢) | -4 | 恐慌恢复速度快 8 倍 |
| Fast Reader (快速阅读) | -2 | 阅读速度 +50% |

### 功能性

| 特性 | 点数 | 效果 |
|------|------|------|
| Handy (手巧) | -8 | 建造 HP +100，维护经验 +100% |
| Brawler (斗士) | -6 | 斧头和长棍经验 +75% |
| Gymnast (体操员) | -5 | 灵活和轻手轻脚经验 +75% |
| Gardener (园丁) | -4 | 农耕经验 +125% |
| Herbalist (草药师) | -6 | 采集时可识别草药和毒蘑菇 |

## 负面特性（推荐）

这些负面特性影响较小，可以安全换取点数：

| 特性 | 点数 | 惩罚 |
|------|------|------|
| High Thirst (口渴) | +6 | 需多喝 100% 水 |
| Slow Healer (缓慢愈合) | +6 | 伤口愈合速度 -50% |
| Weak Stomach (弱胃) | +3 | 吃腐烂食物必定中毒（正常也不应该吃） |
| Prone to Illness (容易生病) | +4 | 僵尸尸体附近更容易生病（站远点就行） |
| Smoker (吸烟者) | +4 | 需要抽烟缓解压力（到处都有烟和打火机） |
| Short Sighted (近视) | +2 | 搜索模式视距 -2（实战影响不大） |
| Thin-skinned (薄皮) | +8 | 被抓/咬概率 +30%（不被打到就不生效） |
| Hearty Appetite (大胃王) | +4 | 饥饿速度 +50% |
| Conspicuous (显眼) | +4 | 僵尸更容易看见你（谨慎走位可规避） |
| Clumsy (笨拙) | +2 | 走路声音 +20% |

::: warning 高风险负面特性
**不要选 Slow Reader（慢速阅读）**：阅读时间 +30%，大量时间被浪费在读技能书上。
**不要选 Deaf（失聪）**：听不到任何声音，连身后僵尸逼近都不知道。
**不要选 Illiterate（文盲）**：无法阅读技能书，技能等级完全锁死。
:::
```

- [ ] **Step 3: Write builds page**

File: `docs/occupations/builds.md`
```markdown
# 推荐搭配

## 🟢 新手推荐：消防员生存流

- **职业**: 消防员 (-8)
- **正面**: Strong (-10), Lucky (-4), Cat's Eyes (-2), Dextrous (-2), Wakeful (-2)
- **负面**: Smoker (+4), Short Sighted (+2), Weak Stomach (+3), High Thirst (+6), Conspicuous (+4)
- **总点数**: 0
- **优势**: 斧头+体格职业起点，近战猛、跑得快、搜刮效率高。猫眼让你晚上也能搜刮，幸运提高稀有物品概率。
- **适合**: 萌新第一档，容错率高。

## 🔴 枪械流：退伍兵独狼

- **职业**: 退伍兵 (-8)
- **正面**: Fast Learner (-6), Keen Hearing (-6), Brave (-4), Lucky (-4)
- **负面**: Thin-skinned (+8), Slow Healer (+6), High Thirst (+6), Smoker (+4)
- **总点数**: 0
- **优势**: 永远不会恐慌，瞄准始终精准。敏锐听觉防偷袭。枪声引来僵尸用走位风筝解决。
- **适合**: 想体验枪械但怕恐慌影响瞄准的玩家。

## 🟡 潜行流：大盗黑夜

- **职业**: 大盗 (-6)
- **正面**: Cat's Eyes (-2), Inconspicuous (-4), Graceful (-4), Wakeful (-2), Dextrous (-2)
- **负面**: Thin-skinned (+8), High Thirst (+6), Weak Stomach (+3), Prone to Illness (+4)
- **总点数**: 0
- **优势**: 极低的存在感和脚步声，夜晚视野好，可以安全地搜刮高密度区域。大盗自带热车能力。
- **适合**: 喜欢稳扎稳打、不硬刚尸群的玩家。

## 🔵 建造流：手巧建筑工

- **职业**: 建筑工 (-6)
- **正面**: Handy (-8), Fast Learner (-6), Organized (-6), Dextrous (-2)
- **负面**: Thin-skinned (+8), Slow Healer (+6), High Thirst (+6), Smoker (+4), Weak Stomach (+3)
- **总点数**: 0
- **优势**: 初期木工 3 级 + Handy 的建造 HP 翻倍 = 可以快速造出雨水收集器和安全堡垒。Organized 让物资管理更轻松。
- **适合**: 多人生存中负责建家的玩家。

## 🟣 全流派通用负面组合

如果你不想按固定搭配，可以用这个负面套路来换点数：

```
Smoker (+4) + High Thirst (+6) + Weak Stomach (+3) + Short Sighted (+2) = 15 点免费点数
```

这 15 点几乎零代价，换来选任何你想要的正面特性和职业。
```

- [ ] **Step 4: Commit**

```bash
git add docs/occupations/
git commit -m "feat: add occupations, traits, and builds pages"
```

---

### Task 6: Skills pages

**Files:**
- Create: `docs/skills/index.md`
- Create: `docs/skills/skill-books.md`
- Create: `docs/skills/vhs-tapes.md`

- [ ] **Step 1: Write skills overview**

File: `docs/skills/index.md`
```markdown
# 🔧 技能系统

B41 共有 **24 个技能**，分为 5 大类。每个技能有 0-10 级，升级获得经验。

## 技能分类

### 制造类 (Crafting)
| 技能 | 经验来源 | Lv1 XP | 关键解锁 |
|------|---------|--------|---------|
| 木工 (Carpentry) | 锯木板、建造家具、拆家具 | 0/150 | Lv4 雨水收集器, Lv7 楼梯 |
| 烹饪 (Cooking) | 做饭、切食材 | 0/75 | Lv4 使用过期食材, Lv7 使用腐烂食材 |
| 农耕 (Farming) | 播种、收获、检查作物 | 0/150 | — |
| 急救 (First Aid) | 包扎、缝合、夹板 | 0/75 | Lv2 缝合伤口 |
| 电工 (Electrical) | 拆电器、修发电机、接发电机 | 0/75 | Lv3 修发电机, Lv5 拆灯 |
| 金属加工 (Metalworking) | 焊接金属结构、拆金属家具 | 0/150 | — |
| 机械 (Mechanics) | 拆装车零件、修理零件 | 0/150 | Lv2 热车, Lv8 修理引擎 |
| 裁缝 (Tailoring) | 修补衣物、给衣服加补丁 | 0/150 | Lv8 完全修复衣物破洞 |

### 武器类 (Combat)
| 技能 | 经验来源 | 关键解锁 |
|------|---------|---------|
| 斧头 (Axe) | 用斧类武器命中 | 伤害随等级提高 |
| 长棍 (Long Blunt) | 用棒球棍/撬棍命中 | 伤害随等级提高 |
| 短棍 (Short Blunt) | 用铁管/锤子命中 | 伤害随等级提高 |
| 长刀 (Long Blade) | 使用武士刀 | 极其罕见，伤害极高 |
| 短刀 (Short Blade) | 用螺丝刀/猎刀命中 | 伤害随等级提高 |
| 长矛 (Spear) | 用矛命中 | 伤害随等级提高 |
| 瞄准 (Aiming) | 用枪械命中 | 精准度随等级提高 |
| 装弹 (Reloading) | 装填弹匣 | 速度随等级提高 |
| 维护 (Maintenance) | 武器使用时耐久不降 | 耐久消耗减少 |

### 敏捷类 (Agility)
| 技能 | 经验来源 | 关键解锁 |
|------|---------|---------|
| 冲刺 (Sprinting) | 跑步获得 | 速度随等级提高 |
| 轻手轻脚 (Lightfooted) | 潜行移动不触发噪音 | 移动噪音减小 |
| 灵活 (Nimble) | 战斗姿态移动 | 战斗姿态移动速度提高 |
| 潜行 (Sneaking) | 潜行移动 | 被察觉范围减小 |

### 生存类 (Survival)
| 技能 | 经验来源 | 关键解锁 |
|------|---------|---------|
| 钓鱼 (Fishing) | 钓鱼活动 | 成功率随等级提高 |
| 诱捕 (Trapping) | 检查/设置陷阱 | 成功率随等级提高 |
| 采集 (Foraging) | 搜索模式采集 | Lv5 雷达范围翻倍 |

### 被动类 (Passive)
| 技能 | 经验来源 | 效果 |
|------|---------|------|
| 体格 (Fitness) | 运动类活动 | 耐力恢复速度 |
| 力量 (Strength) | 负重行走、近战 | 负重容量和近战伤害 |

## 经验倍率

- 初始 25% — 职业或特性无加成时的默认经验获取率
- 75% — Fast Learner 特性
- 100% — 职业直接提供的经验率
- 125% — 职业默认 + 职业加成
- 各等级经验增量独立叠加

::: tip 练级技巧
看电视节目 (Life and Living) 是前期最快练级方式。每天 6:00、12:00、18:00 播出。烹饪、木工、采集、钓鱼、诱捕都能通过看电视升级到 Lv3-Lv4。
:::
```

- [ ] **Step 2: Write skill books page**

File: `docs/skills/skill-books.md`
```markdown
# 技能书大全

阅读技能书可以给对应技能提供经验倍率。倍率只对该等级段生效。

## 技能书等级与倍率

| 书名 | 适用技能 | 等级段 | 倍率 | 常见刷新点 |
|------|---------|--------|------|-----------|
| Carpentry Vol.1 | 木工 | L1-2 | x3 | 邮箱、书架、五金店 |
| Carpentry Vol.2 | 木工 | L3-4 | x5 | 书店、图书馆 |
| Carpentry Vol.3 | 木工 | L5-6 | x5 | 书店、图书馆 |
| Carpentry Vol.4 | 木工 | L7-8 | x8 | 书店、图书馆 |
| Carpentry Vol.5 | 木工 | L9-10 | x12 | 书店、图书馆 |
| Cooking Vol.1 | 烹饪 | L1-2 | x3 | 厨房、邮箱 |
| Cooking Vol.2 | 烹饪 | L3-4 | x5 | 餐厅、书店 |
| Cooking Vol.3 | 烹饪 | L5-6 | x5 | 书店、图书馆 |
| Cooking Vol.4 | 烹饪 | L7-8 | x8 | 书店、图书馆 |
| Farming Vol.1 | 农耕 | L1-2 | x3 | 邮箱、农具店 |
| Farming Vol.2 | 农耕 | L3-4 | x5 | 书店、图书馆 |
| Farming Vol.3 | 农耕 | L5-6 | x5 | 书店、图书馆 |
| Fishing Vol.1 | 钓鱼 | L1-2 | x3 | 邮箱、渔具店 |
| Fishing Vol.2 | 钓鱼 | L3-4 | x5 | 书店、图书馆 |
| Fishing Vol.3 | 钓鱼 | L5-6 | x5 | 书店、图书馆 |
| Foraging Vol.1 | 采集 | L1-2 | x3 | 邮箱、书店 |
| Foraging Vol.2 | 采集 | L3-4 | x5 | 书店、图书馆 |
| Foraging Vol.3 | 采集 | L5-6 | x5 | 书店、图书馆 |
| Trapping Vol.1 | 诱捕 | L1-2 | x3 | 邮箱、户外用品店 |
| Trapping Vol.2 | 诱捕 | L3-4 | x5 | 书店、图书馆 |
| Trapping Vol.3 | 诱捕 | L5-6 | x5 | 书店、图书馆 |
| Electrical Vol.1 | 电工 | L1-2 | x3 | 邮箱、五金店 |
| Electrical Vol.2 | 电工 | L3-4 | x5 | 书店、图书馆 |
| Electrical Vol.3 | 电工 | L5-6 | x5 | 书店、图书馆 |
| Metalworking Vol.1 | 金属加工 | L1-2 | x3 | 邮箱、五金店、仓库 |
| Metalworking Vol.2 | 金属加工 | L3-4 | x5 | 书店、图书馆 |
| Metalworking Vol.3 | 金属加工 | L5-6 | x5 | 书店、图书馆 |
| Mechanics Vol.1 | 机械 | L1-2 | x3 | 邮箱、车库、汽修店 |
| Mechanics Vol.2 | 机械 | L3-4 | x5 | 书店、图书馆 |
| Mechanics Vol.3 | 机械 | L5-6 | x5 | 书店、图书馆 |
| Tailoring Vol.1 | 裁缝 | L1-2 | x3 | 邮箱、服装店、卧室衣柜 |
| Tailoring Vol.2 | 裁缝 | L3-4 | x5 | 书店、图书馆 |
| Tailoring Vol.3 | 裁缝 | L5-6 | x5 | 书店、图书馆 |
| First Aid Vol.1 | 急救 | L1-2 | x3 | 邮箱、药房、诊所 |
| First Aid Vol.2 | 急救 | L3-4 | x5 | 书店、图书馆 |

## 重要刷书点

- **学校图书馆** — Riverside 和 March Ridge 有大量书架
- **Enigma Books (Muldraugh)** — 镇中心专门的书店
- **邮箱 (Mailbox)** — 每个房子门口都可能刷初级技能书
- **五金店 (Hardware Store)** — 木工、电工、金属加工书
- **卧室书架** — 民宅卧室随机刷新

::: warning 文盲不能读书
选了 Illiterate 特性后完全不能读技能书，所有技能仅靠默认 25% 经验率升级。这是游戏中最难的负面特性之一。
:::
```

- [ ] **Step 3: Write VHS tapes page**

File: `docs/skills/vhs-tapes.md`
```markdown
# VHS 录像带大全

VHS 录像带可以直接给对应技能提供固定经验值。前提是有电、有电视、右键节目选择"播放"。配合技能书倍率使用效果翻倍。

## 全录像带列表

| 录像带名称 | 技能 | 经验值 | 节目等级 | 常见刷新点 |
|-----------|------|--------|---------|-----------|
| Woodcraft EP1 | 木工 | 12.5 | Expert | 民宅电视柜、录像带店 |
| Woodcraft EP2 | 木工 | 12.5 | Expert | 同上 |
| Woodcraft EP3 | 木工 | 12.5 | Expert | 同上 |
| Woodcraft EP4 | 木工 | 12.5 | Expert | 同上 |
| Woodcraft EP5 | 木工 | 12.5 | Expert | 同上 |
| Woodcraft EP6 | 木工 | 12.5 | Expert | 同上 |
| Woodcraft EP7 | 木工 | 12.5 | Expert | 同上 |
| Cook Show EP1 | 烹饪 | 12.5 | Basic | 民宅电视柜、录像带店 |
| Cook Show EP2 | 烹饪 | 12.5 | Basic | 同上 |
| Cook Show EP3 | 烹饪 | 12.5 | Basic | 同上 |
| Cook Show EP4 | 烹饪 | 12.5 | Basic | 同上 |
| Cook Show EP5 | 烹饪 | 12.5 | Basic | 同上 |
| Cook Show EP6 | 烹饪 | 12.5 | Basic | 同上 |
| Cook Show EP7 | 烹饪 | 12.5 | Basic | 同上 |
| Exposure Survival EP1 | 采集 | 12.5 | Expert | 民宅电视柜、录像带店、户外店 |
| Exposure Survival EP2 | 采集 | 12.5 | Expert | 同上 |
| Exposure Survival EP3 | 采集 | 12.5 | Expert | 同上 |
| Exposure Survival EP4 | 采集 | 12.5 | Expert | 同上 |
| Exposure Survival EP5 | 采集 | 12.5 | Expert | 同上 |
| Exposure Survival EP6 | 采集 | 12.5 | Expert | 同上 |
| Exposure Survival EP7 | 采集 | 12.5 | Expert | 同上 |
| Exposure Survival EP8 | 采集 | 12.5 | Expert | 同上 |
| Dead Wrong EP1 | 诱捕 | 12.5 | Expert | 民宅电视柜、录像带店 |
| Dead Wrong EP2 | 诱捕 | 12.5 | Expert | 同上 |
| Dead Wrong EP3 | 诱捕 | 12.5 | Expert | 同上 |
| Dead Wrong EP4 | 诱捕 | 12.5 | Expert | 同上 |
| Dead Wrong EP5 | 诱捕 | 12.5 | Expert | 同上 |
| Dead Wrong EP6 | 诱捕 | 12.5 | Expert | 同上 |
| Dead Wrong EP7 | 诱捕 | 12.5 | Expert | 同上 |
| Dead Wrong EP8 | 诱捕 | 12.5 | Expert | 同上 |
| Fishing with Men EP1 | 钓鱼 | 12.5 | Expert | 民宅电视柜、录像带店 |
| Fishing with Men EP2 | 钓鱼 | 12.5 | Expert | 同上 |
| Fishing with Men EP3 | 钓鱼 | 12.5 | Expert | 同上 |
| Fishing with Men EP4 | 钓鱼 | 12.5 | Expert | 同上 |
| Fishing with Men EP5 | 钓鱼 | 12.5 | Expert | 同上 |
| Fishing with Men EP6 | 钓鱼 | 12.5 | Expert | 同上 |
| Fishing with Men EP7 | 钓鱼 | 12.5 | Expert | 同上 |
| Carzone EP1 | 机械 | 12.5 | Expert | 民宅电视柜、录像带店 |
| Carzone EP2 | 机械 | 12.5 | Expert | 同上 |
| Carzone EP3 | 机械 | 12.5 | Expert | 同上 |
| Mother's Boy | 短刀 | 12.5 | — | 民宅电视柜、录像带店 |
| Dying Needle | 裁缝 | 12.5 | — | 民宅电视柜、录像带店 |
| Z-Squad S2 | 瞄准/装弹 | 12.5 | — | 民宅电视柜、录像带店 |
| Combat Wagon | 瞄准/装弹 | 12.5 | — | 民宅电视柜、录像带店 |

## 使用技巧

1. **先读技能书再看录像带** — 书中对应等级段有 x3~x12 倍率，录像带的经验也被放大
2. **每集经验独立** — 每集可以各播一次，不能重复刷同一集
3. **需要电** — 断电后需要发电机+电视才能播放，建议前期大量搜刮录像带并赶在断电前看完
4. **Life and Living 电视节目** — 每天 6:00/12:00/18:00 自动播出，是不需要录像带的免费经验来源

::: tip 速成法
木工：读 Carpentry Vol.1 → 看全部 7 集 Woodcraft → 直接 Lv2 → 读 Vol.2 → 再看一轮 = 几天内 Lv4+
:::
```

- [ ] **Step 4: Commit**

```bash
git add docs/skills/
git commit -m "feat: add skills overview, skill books, and VHS tapes pages"
```

---

### Task 7: Crafting page

**Files:**
- Create: `docs/crafting/index.md`

- [ ] **Step 1: Write crafting page**

File: `docs/crafting/index.md`
```markdown
# 🛠️ 制作配方速查

关键配方速查表，列出最常需要查阅的配方。所有配方基于 B41。

## 🪵 木工

| 物品 | 材料 | 工具 | 技能 |
|------|------|------|------|
| 木板 (Plank) | 原木 x1 | 锯子 | — |
| 木箱 (Crate) | 木板 x3, 钉子 x3 | 锤子 | Lv4 |
| 雨水收集桶 (Rain Collector Barrel) | 木板 x4, 钉子 x4, 垃圾袋 x4 | 锤子 | Lv4 (桶 Lv6) |
| 桌子 (Table) | 木板 x5, 钉子 x4 | 锤子 | Lv4 |
| 门 (Door) | 木板 x4, 钉子 x4, 门铰链 x2 | 锤子 | Lv3 |
| 楼梯 (Stairs) | 木板 x15, 钉子 x15 | 锤子 | Lv7 |
| 木墙框架 (Wall Frame) | 木板 x2, 钉子 x2 | 锤子 | Lv2 |

## ⚡ 电工

| 物品 | 材料 | 工具 | 技能 |
|------|------|------|------|
| 接发电机 | 发电机 | — | Lv3 |
| 修发电机 | 电子废料 | 螺丝刀 | Lv3 |
| 拆灯 | — | 螺丝刀 | Lv5 |

## 🔩 金属加工

| 物品 | 材料 | 工具 | 技能 |
|------|------|------|------|
| 金属板 (Metal Sheet) | — | 丙烷喷灯, 焊工面罩 | Lv4 |
| 金属墙 | 金属板 x4 | 丙烷喷灯, 焊工面罩 | Lv5+ |
| 金属箱 | 金属板 x3 | 丙烷喷灯, 焊工面罩 | Lv4 |
| 修车体 | 金属板 | 丙烷喷灯, 焊工面罩 | Lv4 |

## 🔧 机械

| 操作 | 材料 | 工具 | 技能 |
|------|------|------|------|
| 热车 (Hotwire) | — | 螺丝刀 | Lv1 电工 + Lv2 机械 (大盗无需技能) |
| 拆轮胎 | — | 扳手, 千斤顶 | — |
| 修引擎 | 引擎零件 | 扳手, 螺丝刀 | Lv8 |

## 🪡 裁缝

| 操作 | 材料 | 工具 | 技能 |
|------|------|------|------|
| 修补衣物破洞 | 同材质布料 + 线 | 针 | Lv1 |
| 加皮革补丁 (防咬) | 皮革条 + 线 | 针 | Lv2 |
| 加牛仔布补丁 (防刮) | 牛仔布条 + 线 | 针 | Lv2 |

## 🔥 生存

| 物品 | 材料 | 工具 | 备注 |
|------|------|------|------|
| 营火 (Campfire) | 木板 x3 + 树枝/书本 | — | 点火需要打火机或火柴 |
| 火把 (Torch) | 树枝 + 布条 + 汽油/伏特加 | — | 手持火把 |
| 莫洛托夫 (Molotov) | 空瓶 + 汽油 + 布条 | — | 投掷后范围着火 |
| 绷带 (Bandage) | 布条 | — | 基础止血 |
| 绳子 (Sheet Rope) | 床单 x1 | — | 可挂在窗户上逃生 |

## 🌽 农耕

| 物品 | 材料 | 工具 | 技能 |
|------|------|------|------|
| 堆肥桶 (Composter) | 木板 x5, 钉子 x4 | 锤子 | Lv2 |
| 喷雾器 (Bug Spray) | 烟蒂 x5, 水 | — | — |
| 洒水器 (Sprinkler) | 管钳 + 水管 — | 需要水泵或雨水桶供水 | — |

::: tip 最常用的三个配方
1. **雨水收集桶** — 停电停水后的水源保障
2. **木箱** — 收纳管理海量物资
3. **绷带** — 受伤第一步，撕衣服就有
:::
```

- [ ] **Step 2: Commit**

```bash
git add docs/crafting/
git commit -m "feat: add crafting recipes quick reference"
```

---

### Task 8: Maps page

**Files:**
- Create: `docs/maps/index.md`

- [ ] **Step 1: Write maps page**

File: `docs/maps/index.md`
```markdown
# 🗺️ 地图攻略

Knox Country 共有 **5 个主要城镇**，以及若干野外/郊区区域。

## 城镇概览

| 城镇 | 规模 | 僵尸密度 | 特色资源 | 推荐出生 |
|------|------|---------|---------|---------|
| Muldraugh | 中 | 中-高 | 大型仓库群、书店、五金店 | ✅ 万能起手 |
| West Point | 中 | 高 | 枪店、五金店、高中 | ❌ 新手慎选 |
| Riverside | 中 | 中 | 学校图书馆、汽修店、五金店 | ✅ 新手友好 |
| Rosewood | 小 | 低 | 消防局、警察局、法院 | ✅ 新手首选 |
| March Ridge | 中 | 高 | 军事公寓、学校图书馆 | ❌ 物资少僵尸多 |
| Valley Station | 小 | 极低 | 大卖场、枪店 | ✅ 郊区安逸 |

## 详细城镇分析

### Rosewood 🏡 — 新手港湾

- **僵尸密度**: 低
- **核心资源**:
  - 🪓 **消防局** — 斧头、消防服、医疗包（城镇东北角）
  - 👮 **警察局** — 枪械和弹药（城镇南部）
  - 📚 **法院图书馆** — 技能书（镇中心）
  - 🏥 **诊所** — 医疗物资（镇中心）
- **推荐安全屋**: 消防局二楼（自带厨房、冰箱、坚固墙壁）
- **缺点**: 没有五金店，木工材料依赖拆家具

### Riverside 🏞️ — 均衡小镇

- **僵尸密度**: 中
- **核心资源**:
  - 📚 **学校** — 海量书架，一把搜满技能书
  - 🔧 **五金店** — 木工和机械工具（主街）
  - 🚗 **汽修店** — 车辆零件（镇东）
  - 🏪 **药店 + 诊所** — 医疗物资（主街）
  - ⛽ **加油站** — 有两个（西南和西北）
- **推荐安全屋**: 河边酒吧二楼（靠近水源、钓鱼方便、远离密集区）

### Muldraugh 🏙️ — 仓库天堂

- **僵尸密度**: 中-高（主公路沿线非常高！）
- **核心资源**:
  - 📦 **大型仓库 x4** — 南端两个 + 中南部两个，海量金属加工和木工材料
  - 📚 **Enigma Books** — 全图唯一的专门书店，技能书天堂
  - 🔧 **五金店** — 主街中段
  - 👮 **警察局** — 主街北段
- **推荐安全屋**: 南部仓库区（自带工业货架、空间巨大，但要清干净周围）
- **警告**: 主公路是游戏中僵尸密度最高的区域之一，白天横穿务必小心

### West Point 💀 — 死亡陷阱

- **僵尸密度**: 高-极高
- **核心资源**:
  - 🔫 **枪店** — 城镇西部外围
  - 🏫 **高中** — 大量书架和储物柜
  - 🔧 **五金店** — 主街中部
  - ⛽ **加油站** — 镇东
- **推荐安全屋**: Twiggy's 酒吧（镇外独立建筑，僵尸少）
- **警告**: 商业区是游戏中最危险的区域之一。不要在主街开枪 — 几百只会涌过来。

### March Ridge ⚠️ — 死亡小镇

- **僵尸密度**: 高，且资源稀少
- **核心资源**: 社区中心图书馆（大量书架）
- **推荐安全屋**: 不推荐在此地建造安全屋。来搜刮技能书后尽快离开。
- **特殊建筑**: 军事公寓（2 层大型公寓楼，僵尸极多，但军装和子弹丰富）

## 通用重要建筑

| 建筑类型 | 搜刮重点 | 到哪找 |
|---------|---------|--------|
| 书店/图书馆 | 技能书 | Riverside 学校、Muldraugh Enigma Books |
| 五金店 | 锯子、锤子、钉子、螺丝刀 | 各城镇主街 |
| 警察局 | 枪、子弹、警车 | 各城镇中心 |
| 消防局 | 斧头、消防服 | Rosewood |
| 仓库 | 木板、钉子、金属、工具 | Muldraugh 南部 |
| 加油站 | 汽油（用空桶接） | 各城镇边缘 |
| 诊所/药店 | 绷带、止痛药、抗生素 | 各城镇 |
| 汽修店 | 轮胎、电池、千斤顶 | Riverside、各城镇 |

## 🏠 安全屋选址原则

1. **远离主路** — 减少随机僵尸游荡到门口
2. **二楼建筑** — 可以用锤子拆楼梯，僵尸永远上不来
3. **靠近水源** — 河流/湖泊旁边，断电后也能钓鱼喝水
4. **有围栏** — 预制高围栏能挡住僵尸，省下大量木工
5. **多出口** — 窗绳逃生至少 3 条

::: tip 公认最佳新手安全屋
**Rosewood 消防局**：坚固围栏环绕 + 自带厨房冰箱 + 二楼可拆楼梯 + 低密度环境。存活到中后期的完美跳板。
:::
```

- [ ] **Step 2: Commit**

```bash
git add docs/maps/
git commit -m "feat: add town guides and base location recommendations"
```

---

### Task 9: Food & Farming page

**Files:**
- Create: `docs/food-farming/index.md`

- [ ] **Step 1: Write food and farming page**

File: `docs/food-farming/index.md`
```markdown
# 🥕 食物与农耕

## 🌱 作物种植

### 种植参数

| 作物 | 生长天数 | 需水量 | 产量 | 病害风险 | 备注 |
|------|---------|--------|------|---------|------|
| 卷心菜 (Cabbage) | 14 天 | 高 (100/天) | 6 | 高 | 生长最快，但吃多会掉体重 |
| 土豆 (Potato) | 26 天 | 中 (85/天) | 4 | 低 | 保质期 14 天，最耐储存 |
| 番茄 (Tomato) | 18 天 | 中 (85/天) | 5 | 中 | 可直接吃，不增加不快乐 |
| 胡萝卜 (Carrot) | 12 天 | 中 (85/天) | 4 | 低 | 生长快，适合和卷心菜轮作 |
| 西兰花 (Broccoli) | 30 天 | 中 (85/天) | 5 | 低 | 很慢但产量稳定 |
| 萝卜 (Radish) | 17 天 | 中 (85/天) | 6 | 中 | — |
| 草莓 (Strawberry) | 22 天 | 中 (85/天) | 3 | 高 | 很美味但产量低，不实用 |

### 农耕流程

1. **挖地** — 空手或铲子在土地上右键「挖地」
2. **播种** — 种子右键挖过的地，每格可种 1 个作物
3. **浇水** — 作物缺水会生长缓慢。用水桶/水瓶浇水
4. **检查** — 每阶段右键作物「检查」可获农耕经验
5. **收获** — 完全长成后右键收获

### 病害管理

- 每种病害有独立阶段，不及时处理会蔓延到相邻作物
- 喷雾器（烟蒂 x5 + 水）可治霉菌
- 不想管病害：土豆和胡萝卜病害风险低，几乎不会生病
- 间隔种植不同作物可减少病害扩散

## 🍳 烹饪

### 基础食谱

| 菜品 | 材料 | 饥饿 | 无聊 | 不快乐 | 备注 |
|------|------|------|------|--------|------|
| 炒菜 (Stir Fry) | 任意食材 x1 + 煎锅 | -20 | 0 | 0 | 基础热食 |
| 炖菜 (Stew) | 任意食材 x1 + 炖锅 | -25 | 0 | 0 | 比炒菜更好 |
| 汤 (Soup) | 任意食材 x1 + 汤锅 | -20 | -5 | 0 | 减少无聊 |
| 沙拉 (Salad) | 蔬菜 x1 + 碗 | -15 | 0 | 0 | 不加热，无需电 |
| 烤鱼/烤肉 (Roast) | 肉 x1 + 烤盘 | -30 | -5 | 0 | 饱食度最高 |
| 三明治 (Sandwich) | 面包 x1 + 任意食材 | -25 | 0 | 0 | 不需要锅 |

### 调料效果

在食谱中加入调料可以显著提升效果：
- 盐 (Salt)、胡椒 (Pepper) → 减少无聊和不快乐
- ketchup、芥末 (Mustard) → 增加饱食度
- 多种调料叠加效果更好

### 变质机制

| 阶段 | 状态 | 能否烹饪 | 备注 |
|------|------|---------|------|
| 新鲜 Fresh | 正常 | ✅ | 满效果 |
| 不新鲜 Stale | -30% 饱食度 | ✅ | 烹饪 3 级前不要吃 |
| 腐烂 Rotting | -90% 饱食度, 中毒风险 | 烹饪 7 级可用 | 烹饪 4 级前必中毒（除非 Iron Gut） |
| 完全腐烂 | 消失 | ❌ | 不及时处理会在容器里烂掉 |

## 🧊 食物保存

| 方式 | 保质期延长 | 设备需求 |
|------|-----------|---------|
| 常温 | 基准 | 无 |
| 冰箱 (Fridge) | x5 | 冰箱 + 电/发电机 |
| 冷冻柜 (Freezer) | x25 | 冷冻柜 + 电/发电机 |
| 腌制罐 (Jar) | 永久（~90 天） | 空罐 + 锅盖 + 醋 + 糖 + 水 |

::: warning 断电后的食物管理
水电在 0-30 天内随机断供。断电后冰箱保鲜只维持约 2 天。提前准备：
1. 发电机 + 汽油 → 让冰箱继续工作
2. 把腐烂食材扔进堆肥桶 → 变成肥料
3. 多钓鱼 → 鱼不会停水
4. 腌制罐存储长期食物
:::
```

- [ ] **Step 2: Commit**

```bash
git add docs/food-farming/
git commit -m "feat: add farming, cooking, and food preservation guide"
```

---

### Task 10: Combat page

**Files:**
- Create: `docs/combat/index.md`

- [ ] **Step 1: Write combat page**

File: `docs/combat/index.md`
```markdown
# ⚔️ 武器与战斗

## 🗡️ 近战武器对比

| 武器 | 伤害 | 最小伤害 | 耐久 | 暴击 | 攻速 | 重量 | 入手难度 |
|------|------|---------|------|------|------|------|---------|
| 🥇 撬棍 (Crowbar) | 0.9-1.5 | 0.1 | 70 | 20% | 1.0 | 2.0 | 易 |
| 🥈 消防斧 (Fire Axe) | 1.2-2.5 | 0.5 | 20 | 35% | 0.9 | 3.0 | 中 |
| 🥉 武士刀 (Katana) | 1.5-3.0 | 0.5 | 5 | 50% | 1.2 | 2.0 | 极罕见 |
| 棒球棍 (Baseball Bat) | 0.8-1.5 | 0.1 | 20 | 25% | 1.0 | 2.0 | 易 |
| 铁管 (Metal Pipe) | 0.7-1.3 | 0.1 | 40 | 15% | 1.1 | 1.5 | 易 |
| 锤子 (Hammer) | 0.5-1.0 | 0.1 | 30 | 20% | 1.1 | 1.0 | 到处都是 |
| 斧头 (Hand Axe) | 1.0-2.0 | 0.3 | 15 | 35% | 1.0 | 2.0 | 中 |
| 手工矛 (Crafted Spear) | 0.8-1.5 | 0.1 | 5 | 20% | 0.9 | 1.7 | 无限自制 |
| 猎刀 (Hunting Knife) | 0.6-1.2 | 0.1 | 20 | 35% | 1.4 | 0.5 | 中 |
| 螺丝刀 (Screwdriver) | 0.4-0.9 | 0.1 | 25 | 15% | 1.5 | 0.4 | 到处 |

## 🔫 枪械

| 武器 | 子弹 | 伤害 | 射程 | 噪音半径 | 容量 |
|------|------|------|------|---------|------|
| M9 手枪 | 9mm | 1.0 | 8 | 50 | 15 |
| M1911 手枪 | .45 | 1.2 | 8 | 70 | 7 |
| 左轮 (M625 Revolver) | .45 | 1.2 | 8 | 70 | 6 |
| 沙漠之鹰 (Desert Eagle) | .44 Magnum | 1.5 | 10 | 120 | 8 |
| MSR700 猎枪 | .223 | 1.5 | 12 | 100 | 3 |
| JS-2000 散弹枪 | 散弹 | 2.0 | 7 | 250 | 6 |
| 双管猎枪 (Double Barrel) | 散弹 | 2.5 | 5 | 300 | 2 |
| M14 步枪 | .308 | 2.0 | 13 | 150 | 20 |
| M16 突击步枪 | 5.56mm | 1.2 | 12 | 100 | 30 |

## 🧟 僵尸类型

| 类型 | 速度 | 感官 | 血量 | 行为特征 |
|------|------|------|------|---------|
| Shamblers (缓行者) | 慢 | 标准 | 标准 | 默认僵尸，大部分是这种 |
| Fast Shamblers (快步者) | 中 | 标准 | 标准 | 比缓行者快，更危险 |
| Sprinters (疾跑者) | 极快 | 标准 | 标准 | 沙盒选项可开启，会冲刺追逐 |
| Crawlers (爬行者) | 极慢 | 低 | 标准 | 趴地爬行，容易漏掉被咬脚 |

## ⚡ 战斗技巧

### 走位基础
- **永远不要后退直走** — 转身跑一段再回头打，拉开距离
- **推倒再补刀** — 空格推开僵尸 → 倒地后对头踩（伤害翻倍）
- **门框绞肉机** — 在门口打可以同时只面对一只
- **围栏陷阱** — 僵尸翻围栏时会摔倒，趁它倒地踩头

### 风筝战术（Kiting）
- 潜行姿态吸引 1-3 只 → 走 5 步回头打 → 再走 5 步 → 重复
- 围栏风筝：绕围栏走，僵尸翻栏时摔倒逐个处理
- 窗口风筝：进出建筑窗口，僵尸翻窗速度极慢

### 枪械使用时机
- 🚫 **不要在城镇里开枪** — 枪声会拉来整个街区的僵尸
- ✅ **开阔野外** — 有逃跑空间，打不过可以跑
- ✅ **配合散弹枪** — JS-2000 散弹一枪能打死多只，适合快速清理
- ✅ **退伍兵 + 镇定剂 (Beta Blocker)** — 消除恐慌，提高精准度

### 疲劳管理
- 耐力耗尽时伤害减半，跑步不能
- 咬紧牙关时不要恋战，永远留 25% 耐力逃跑
- 坐地上/坐椅子上可以快速恢复耐力
- 体格 Fitness 等级提高耐力恢复速度

::: danger 被咬 = 100% 死亡
B41 默认设定：**咬伤 (Bite) = 100% 感染僵尸病毒 = 3 天内必死**。没有被咬的唯一办法是不被咬。抓伤 (Scratch) 有 7% 感染率，撕裂伤 (Laceration) 有 25% 感染率。Thick Skinned 特性可显著降低被抓/咬的概率。
:::
```

- [ ] **Step 2: Commit**

```bash
git add docs/combat/
git commit -m "feat: add weapons comparison and combat tactics guide"
```

---

### Task 11: Vehicles page

**Files:**
- Create: `docs/vehicles/index.md`

- [ ] **Step 1: Write vehicles page**

File: `docs/vehicles/index.md`
```markdown
# 🚗 车辆

## 车型对比

| 车型 | 速度 | 马力 | 行李箱容量 | 座位 | 噪音 | 适合 |
|------|------|------|-----------|------|------|------|
| Chevalier Nyala | 中 | 380 | 120 | 5 | 40 | 通用家庭车 |
| Chevalier Cerise | 中 | 340 | 100 | 4 | 40 | 小型轿车 |
| Dash Bulldriver | 中 | 420 | 130 | 6 | 50 | 搬家运货 |
| Franklin All-Terrain | 中 | 390 | 110 | 6 | 55 | 越野搬家 |
| Chevalier D6 | 高 | 450 | 90 | 2 | 70 | 速度快但容量小 |
| Chevalier Cossette | 极高 | 500 | 60 | 2 | 80 | 跑车，声音大 |
| Chevalier Primani | 中 | 400 | 120 | 4 | 45 | 警车型，稳 |
| Step Van | 低 | 370 | 250 | 2 | 50 | 移动仓库 |
| Pickup Truck | 中 | 410 | 150 | 2 | 55 | 皮卡，平衡 |
| Ambulance | 高 | 480 | 110 | 3 | 60 | 速度快 |
| Fire Truck | 中 | 500 | 200 | 6 | 60 | 超大容量 + 6 座 |

## 🔧 关键零件

| 零件 | 常见问题 | 修理工具 |
|------|---------|---------|
| 引擎 (Engine) | 不能启动或转速不稳 | 扳手 + 螺丝刀 (Lv8 机械) |
| 油箱 (Gas Tank) | 漏油、没油 | 直接换件 |
| 电池 (Battery) | 没电、老化 | 充电器 或 直接换电池 |
| 轮胎 (Tire) | 爆胎、打滑 | 扳手 + 千斤顶 + 备用轮胎 |
| 消音器 (Muffler) | 噪音暴增 | 扳手 |
| 刹车 (Brakes) | 刹车距离变长 | 扳手 |
| 悬挂 (Suspension) | 跑偏 | 扳手 |
| 车窗 (Window) | 碎了 | 换玻璃 |
| 门 (Door) | 坏了 | 扳手 (换门) |

## 🚙 操作指南

### 热车 (Hotwire)
- **要求**: 电工 Lv1 + 机械 Lv2，或 大盗职业（无需技能）
- **方法**: 不插钥匙，右键车，选「Hotwire」
- **成功率**: 高等级机械降低失败概率

### 接油箱
- 加油站找到加油机
- 空汽油桶右键加油机 → 装满
- 油桶右键车门旁边的油箱口 → 加进去

### 日常维护
- 定期检查所有零件状态（右键车 → Vehicle Mechanics）
- 轮胎和电池是最常需要更换的
- 消音器坏了赶快修 → 声音大会拉僵尸
- 停在家附近时把车窗摇上，防止僵尸破坏

## 📍 常见车辆刷新点

| 地点 | 常见车型 |
|------|---------|
| 民宅车道 | Chevalier Nyala、Cerise 等高概率 |
| 消防局 | Fire Truck (Rosewood) |
| 警察局 | Chevalier Primani (警车) |
| 诊所/医院 | Ambulance (救护车) |
| 加油站 | 各种随机 |
| 仓库停车场 | Step Van、Pickup Truck |
| 酒吧停车场 | 各类跑车/肌肉车 |
| 拖车公园 | 破旧车辆但零件多 |

## ⚙️ 故障排除

| 症状 | 可能原因 | 修复 |
|------|---------|------|
| 车不启动 | 没油、没电、引擎故障 | 加油→换电池→修引擎 |
| 噪音巨大 | 消音器坏了 | 换消音器 |
| 刹车不灵 | 刹车坏了 | 换刹车片 |
| 方向盘失控 | 悬挂坏了 | 修悬挂 |
| 跑偏 | 轮胎瘪了 | 换轮胎 |

::: tip 最值得抢的车
Step Van 是游戏中行李箱最大的普通车（250 容量），搬家搜刮两不误。Franklin All-Terrain 则是越野首选，适合在树林和土路穿行。
:::
```

- [ ] **Step 2: Commit**

```bash
git add docs/vehicles/
git commit -m "feat: add vehicle comparison and repair guide"
```

---

### Task 12: Survival tips page

**Files:**
- Create: `docs/survival/index.md`

- [ ] **Step 1: Write survival page**

File: `docs/survival/index.md`
```markdown
# 🩺 生存技巧

## ⚡ 断水断电

水电会在游戏开始 **0-30 天内随机切断**。

### 应对断水
- 每家马桶、浴缸、水槽有残余水（~20 单位），尽快用瓶子装起来
- **雨水收集桶**：木工 Lv4 可造，下雨自动装满
- **河边/湖边**：无限水源，但需要烧开喝
- 水桶装满水放在地上也可以当水源

### 应对断电
- **发电机**：仓库/车库/工业区找到，需要电工 Lv3 才能接到家里
- 发电机需要**汽油**来运行，加油站可以无限接油
- **发电机放室外** — 室内排气会中毒（要命）
- 每台发电机可以带 ~20 台冰箱/冰柜
- 发电机有耐久度，使用中会慢慢损坏，需要电工修理

## ❄️ 冬季生存

游戏从 7 月开始，冬季大约 **11 月-2 月**。

### 寒冷机制
- 体温过低会降低移动速度和攻击力
- 持续低温 → 感冒 → 不治疗 → 肺炎 → 死亡

### 保暖方式
| 方式 | 效果 |
|------|------|
| 穿多层衣服 | 每件衣服有保暖系数 (Insulation)，穿满 |
| 待在室内/车内 | 隔绝风雪，基础保温 |
| 营火/壁炉/炉子 | 直接加热到暖和 |
| 吃热食/喝热茶 | 临时体温提升 |
| 运动 | 跑步和战斗临时生成热量 |

### 冬季水
- 冬天不下雨 → 雨水收集桶不补充
- 必须在入冬前储备大量水或搬到河边
- 雪不能直接喝（B41 不支持收集雪）

## 🏥 医疗

### 伤口类型与处理

| 伤情 | 处理方式 | 恢复时间 | 备注 |
|------|---------|---------|------|
| 刮伤 (Scratch) | 绷带 | 1-2 天 | 7% 僵尸化 |
| 撕裂伤 (Laceration) | 绷带 → 缝合 (急救 Lv2+) | 2-4 天 | 25% 僵尸化 |
| 深伤口 (Deep Wound) | 绷带 → 缝合 (急救 Lv2+) | 3-7 天 | 玻璃所致，需取出碎片 |
| 咬伤 (Bite) | 绷带 | 不会愈合 | 100% 僵尸化，必死 |
| 骨折 (Fracture) | 夹板 (Splint) | 7-14 天 | 降低该部位使用能力 |
| 烧伤 (Burn) | 烧伤敷料 | 5-10 天 | 比普通伤口慢 |
| 感冒/流感 | 休息、吃好、保暖 | 3-7 天 | 严重可导致肺炎 |

### 关键医疗物资

| 物品 | 用途 | 重要度 |
|------|------|--------|
| 绷带 (Bandage) | 止血基本 | ⭐⭐⭐⭐⭐ |
| 止痛药 (Painkillers) | 止痛、助眠 | ⭐⭐⭐ |
| 抗生素 (Antibiotics) | 抗感染 | ⭐⭐⭐ |
| 消毒液 (Disinfectant) | 清洁伤口、防感染 | ⭐⭐⭐⭐ |
| 缝合针 (Suture Needle) | 缝合撕裂/深伤口 | ⭐⭐⭐⭐ |
| 夹板 (Splint) | 固定骨折 | ⭐⭐⭐ |
| 镇定剂 (Beta Blocker) | 消除恐慌、枪战必备 | ⭐⭐⭐⭐ |
| 维生素 (Vitamins) | 偶尔消除疲倦 | ⭐⭐ |

## 🏗️ 安全屋建造

### 基础防御
1. **窗绳逃生** — 二楼每个窗户挂绳子，至少 3 条不同方向
2. **拆楼梯** — 二楼安全屋终极防御（锤子 + 锯子），僵尸彻底上不来
3. **封一楼门窗** — 木板 + 钉子右键窗户「Barricade」，每面最多 4 块板
4. **建围墙** — 木工/金属加工做围栏或墙壁

### 进阶设计
- **双层墙** — 两层木头墙 + 中间空隙，僵尸要拆很久
- **气闸室 (Airlock)** — 入口做双门，永远只开一扇
- **屋顶花园** — 二楼/屋顶种菜，僵尸上不来
- **远程入口** — 绳子进入安全屋，需要靠边站才能爬绳

### 长期需求清单

| 物品 | 数量 | 用途 |
|------|------|------|
| 发电机 | 2-3 台 | 一台供冰箱，一台供电视看录像，一台备用 |
| 汽油桶 | 6-10 个 | 发电机燃料 + 车辆备用 |
| 雨水收集桶 | 4-8 个 | 可持续供水 |
| 堆肥桶 | 1-2 个 | 处理腐烂食材，产肥料 |
| 冰柜 | 2-3 个 | 长期储存食物 |
| 木箱 | 10-20 个 | 物资分类收纳 |

## ⏰ Life and Living 电视时间表

每天三个时段播出：

| 时间 | 节目 | 技能 |
|------|------|------|
| 06:00 | Woodcraft | 木工 |
| 12:00 | Cooking Show | 烹饪 |
| 18:00 | 各种生存节目 | 采集、钓鱼、诱捕 |

- 每个节目播出 8-10 天（前 9 天最全）
- 没看书的情况下，从 0 级看到最后能到 Lv3-Lv4
- 看书 + 看电视 = 飙升

## ⚡ 快速上线检查清单

新档前 7 天最优操作：

1. **Day 1-2**：找临时安全屋 + 基础武器（撬棍/球棒）
2. **Day 3-5**：搜刮书店/图书馆 → 技能书
3. **Day 1-9**：每天 6:00/12:00/18:00 看电视（不可错过）
4. **Day 5-10**：找发电机 + 接发电机的工具
5. **Day 7-14**：收集木板和钉子 → 造雨水桶
6. **Day 14+**：选择永久安全屋 → 开始建家
7. **断电前**：看完所有 VHS 录像带

::: tip 最重要的生存法则
不是每个僵尸都需要杀。有时候绕过去比打一场更安全。保持低调，节约武器耐久，存够物资再扩张。
:::
```

- [ ] **Step 2: Commit**

```bash
git add docs/survival/
git commit -m "feat: add survival tips, medical guide, and base building"
```

---

### Task 13: GitHub Actions deploy config

**Files:**
- Create: `.github/workflows/deploy.yml`

- [ ] **Step 1: Write deploy workflow**

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci
      - run: npm run build
      - uses: peaceiris/actions-gh-pages@v4
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: docs/.vitepress/dist
```

- [ ] **Step 2: Commit**

```bash
git add .github/workflows/deploy.yml
git commit -m "ci: add GitHub Pages deploy workflow"
```

---

### Task 14: Build and verify

- [ ] **Step 1: Run production build**

```bash
npm run build
```
Expected: build succeeds, output in `docs/.vitepress/dist/`

- [ ] **Step 2: Preview locally**

```bash
npm run preview
```
Expected: all pages load correctly, sidebar navigation works, search works

- [ ] **Step 3: Create GitHub repo and push**

The user needs to:
1. Create a GitHub repo named `pz-guide`
2. Add remote: `git remote add origin https://github.com/<username>/pz-guide.git`
3. Push: `git push -u origin main`
4. Enable GitHub Pages in repo Settings → Pages → Source: `gh-pages` branch

- [ ] **Step 4: Verify deployed site**

Visit `https://<username>.github.io/pz-guide/` and verify all content loads correctly.

---

## Self-Review

| Check | Status |
|-------|--------|
| Spec coverage — all 8 categories covered | ✅ |
| Placeholder scan — no TBD/TODO | ✅ |
| Type consistency — file paths match across tasks | ✅ |
| VitePress config.base matches repo name | ✅ |
| B41 version noted throughout | ✅ |
