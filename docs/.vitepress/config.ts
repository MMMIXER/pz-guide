import { defineConfig } from "vitepress";

export default defineConfig({
  title: "PZ Survival Guide",
  description: "僵尸毁灭工程 B41 生存指南",
  lang: "zh-CN",
  base: "/pz-guide/",
  ignoreDeadLinks: true,
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
        items: [
          { text: "生存要领", link: "/survival/" },
          { text: "💀 游玩记录", link: "/survival/game-log" },
        ],
      },
    ],
    docFooter: { prev: "上一页", next: "下一页" },
    outline: { label: "本页导航" },
    lastUpdated: { text: "最后更新" },
  },
});
