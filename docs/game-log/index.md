---
head:
  - - meta
    - name: robots
      content: noindex
---

<script setup>
import DeathTracker from "./DeathTracker.vue";
</script>

# 💀 游玩记录

> 每一次死亡都值得铭记 —— 尤其是某个人的。

<DeathTracker />

::: tip 数据存储说明
死亡记录保存在浏览器本地存储（localStorage）中，不同设备/浏览器的记录互相独立。清除浏览器数据会导致记录丢失。
:::
