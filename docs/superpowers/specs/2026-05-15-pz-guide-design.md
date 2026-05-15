# Project Zomboid B41 Survival Guide — Design Spec

## Overview

A static web-based game guide/wiki for Project Zomboid Build 41, built with VitePress and deployed to GitHub Pages. Accessible from mainland China without VPN. Responsive for both desktop (sidebar) and mobile (hamburger menu).

## Constraints

- B41 version content only
- Must deploy to GitHub Pages (free, accessible in China)
- Must be responsive (mobile + desktop)
- Chinese UI text, game terms in English where appropriate

## Tech Stack

- **Framework**: VitePress (Vue-based static site generator)
- **Content**: Markdown
- **Theme**: Custom dark survival-horror theme
- **Deploy**: GitHub Pages via `gh-pages` branch

## Visual Design

### Theme — Dark Survival

- Background: #0d0d0d / #141414
- Accent: #8b0000 (dark red, blood-like)
- Text: #ccc / #999
- Warning/callout: left red border highlight
- Tables: dark with subtle grid lines
- Overall vibe: grim, survival horror, matching game atmosphere

### Layout

- Desktop: fixed left sidebar (180-200px) + main content area
- Mobile: top navbar with hamburger menu toggle, full-width content

### Navigation Structure

Sidebar with 8 top-level categories:

1. 职业与特性 (Occupations & Traits)
2. 技能系统 (Skills)
3. 制作配方 (Crafting)
4. 地图 (Maps)
5. 食物与农耕 (Food & Farming)
6. 战斗 (Combat)
7. 车辆 (Vehicles)
8. 生存技巧 (Survival Tips)

Each with sub-pages for detailed content.

## Content Structure

### 1. 职业与特性

- 21 occupations table (name, bonuses, starting skills, cost)
- Positive traits list (cost, effects, notes)
- Negative traits list (reward, penalties, notes)
- Recommended builds for solo/multiplayer/beginner

### 2. 技能系统

- Per-skill breakdown: XP sources, level XP requirements
- Skill books table (skill, book tier, multiplier, common spawns)
- VHS tapes table (skill, tape name, XP granted)
- Level-gated crafting unlocks per skill

### 3. 制作配方

- Organized by skill category
- Each recipe: required materials, required tools, skill level requirement
- Quick-reference for essential items (rain collector, generator, molotov, etc.)

### 4. 地图

- Town overview (Muldraugh, West Point, Riverside, Rosewood, March Ridge)
- Key building types and notable locations
- Base location recommendations with pros/cons

### 5. 食物与农耕

- Crop growth table (water, days to harvest, yield, disease risk)
- Cooking recipes with ingredient → hunger/boredom/unhappiness effects
- Food preservation: fridge, freezer, jarring, pickling

### 6. 战斗

- Weapon comparison table (damage, range, durability, crit, attack speed)
- Zombie types and behavior patterns
- Combat positioning and kiting tips

### 7. 车辆

- Vehicle types comparison
- Part conditions and repair guide
- Hotwiring requirements, maintenance tips

### 8. 生存技巧

- Water/electricity shutdown strategies
- Winter survival (clothing, heat sources)
- Medical: fractures, bites, infections, first aid
- Base building fundamentals

## Content Sources

- pzwiki.net (official wiki)
- Game data extracted from B41
- Community-verified information

## Content Accuracy

All content must cite B41 specifically. B42/experimental changes will be excluded. Skill XP values, recipe requirements, and game mechanics verified against B41 stable build.

## Implementation Phases

### Phase 1: Scaffold
- Initialize VitePress project
- Configure custom dark theme CSS
- Set up sidebar navigation
- Configure GitHub Pages deployment

### Phase 2: Content — Core Reference
- Occupations & Traits pages
- Skills pages
- Crafting quick reference

### Phase 3: Content — Strategy
- Maps & locations
- Food & farming
- Combat & weapons

### Phase 4: Content — Systems
- Vehicles
- Survival tips
- Polish and cross-linking

## File Structure

```
pz-guide/
├── .github/workflows/deploy.yml
├── docs/
│   ├── .vitepress/
│   │   ├── config.ts
│   │   └── theme/
│   │       └── custom.css
│   ├── index.md
│   ├── occupations/
│   ├── skills/
│   ├── crafting/
│   ├── maps/
│   ├── food-farming/
│   ├── combat/
│   ├── vehicles/
│   └── survival/
├── package.json
└── README.md
```
