<script setup>
import { ref, computed, onMounted, watch } from "vue";

const PLAYERS = ["MIXER", "HE", "鵼kuong"];

const records = ref([]);
const showForm = ref(false);

const newDeath = ref({
  date: new Date().toISOString().slice(0, 10),
  time: `${String(new Date().getHours()).padStart(2, "0")}:${String(new Date().getMinutes()).padStart(2, "0")}`,
  player: "MIXER",
  cause: "",
  note: "",
});

const STORAGE_KEY = "pz-death-records-v2";

onMounted(() => {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    try { records.value = JSON.parse(saved); } catch {}
  }
});

watch(records, (val) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(val));
}, { deep: true });

const stats = computed(() => {
  const s = {};
  for (const p of PLAYERS) s[p] = 0;
  for (const r of records.value) {
    if (s[r.player] !== undefined) s[r.player]++;
  }
  return s;
});

const maxDeaths = computed(() => Math.max(...Object.values(stats.value), 1));

const loserPlayer = computed(() => {
  if (records.value.length === 0) return null;
  if (maxDeaths.value === 0) return null;
  let worst = PLAYERS[0];
  for (const p of PLAYERS) {
    if (stats.value[p] > stats.value[worst]) worst = p;
  }
  return worst;
});

const totalDeaths = computed(() => records.value.length);

function addDeath() {
  records.value.push({
    id: Date.now(),
    date: newDeath.value.date,
    time: newDeath.value.time,
    player: newDeath.value.player,
    cause: newDeath.value.cause || "未知",
    note: newDeath.value.note || "",
  });
  newDeath.value.cause = "";
  newDeath.value.note = "";
  showForm.value = false;
}

function deleteRecord(id) {
  records.value = records.value.filter((r) => r.id !== id);
}

function clearAll() {
  if (confirm("确定要清除所有死亡记录吗？此操作不可撤销。")) {
    records.value = [];
  }
}
</script>

<template>
  <div class="death-tracker">
    <!-- Player Stat Cards -->
    <div class="stats-bar">
      <div
        class="stat-card"
        v-for="p in PLAYERS"
        :key="p"
        :class="{ 'loser-card': loserPlayer === p }"
        :style="{
          flexGrow: stats[p] || 0.5,
          transform: `scale(${0.85 + (stats[p] / (maxDeaths || 1)) * 0.3})`,
          zIndex: loserPlayer === p ? 2 : 1,
        }"
      >
        <div class="stat-player">{{ p }}</div>
        <div class="stat-count">{{ stats[p] }}</div>
        <div class="stat-label">次死亡</div>
        <div class="loser-badge" v-if="loserPlayer === p">🏆 萝莉</div>
      </div>
    </div>

    <div class="total-line">累计死亡 <strong>{{ totalDeaths }}</strong> 次</div>

    <!-- Actions -->
    <div class="actions">
      <button class="btn-add" @click="showForm = !showForm">
        {{ showForm ? '取消' : '➕ 记录死亡' }}
      </button>
      <button class="btn-clear" @click="clearAll" v-if="records.length > 0">
        清空记录
      </button>
    </div>

    <!-- Add Form -->
    <div class="form-panel" v-if="showForm">
      <div class="form-row">
        <label>日期</label>
        <input type="date" v-model="newDeath.date" />
      </div>
      <div class="form-row">
        <label>时间</label>
        <input type="time" v-model="newDeath.time" />
      </div>
      <div class="form-row">
        <label>玩家</label>
        <select v-model="newDeath.player">
          <option v-for="p in PLAYERS" :key="p" :value="p">{{ p }}</option>
        </select>
      </div>
      <div class="form-row">
        <label>死亡原因</label>
        <input type="text" v-model="newDeath.cause" placeholder="被咬死/摔死/饿死..." />
      </div>
      <div class="form-row">
        <label>备注</label>
        <input type="text" v-model="newDeath.note" placeholder="额外信息（可选）" />
      </div>
      <button class="btn-submit" @click="addDeath">💀 确认死亡</button>
    </div>

    <!-- Death Table -->
    <div class="table-wrap" v-if="records.length > 0">
      <table>
        <thead>
          <tr>
            <th>日期</th>
            <th>时间</th>
            <th>玩家</th>
            <th>死因</th>
            <th>备注</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="r in [...records].reverse()" :key="r.id"
            :class="{ 'loser-row': loserPlayer === r.player }">
            <td>{{ r.date }}</td>
            <td>{{ r.time }}</td>
            <td :class="{ 'loser-name': loserPlayer === r.player }">{{ r.player }}</td>
            <td>{{ r.cause }}</td>
            <td class="note-cell">{{ r.note }}</td>
            <td>
              <button class="btn-del" @click="deleteRecord(r.id)">✕</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="empty-msg" v-else>
      <p>暂无人死亡，或者所有人都还活着（不可能）。</p>
    </div>
  </div>
</template>

<style scoped>
.death-tracker {
  margin-top: 1rem;
}

/* Stats Cards */
.stats-bar {
  display: flex;
  gap: 1rem;
  margin-bottom: 0.5rem;
  align-items: flex-end;
  min-height: 160px;
}
.stat-card {
  flex: 1;
  min-width: 130px;
  background: #141414;
  border: 2px solid #222;
  border-radius: 10px;
  padding: 1.2rem 1rem;
  text-align: center;
  transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.3rem;
}
.stat-player {
  color: #999;
  font-size: 1rem;
  font-weight: 600;
}
.stat-count {
  color: #ccc;
  font-size: 2.4rem;
  font-weight: bold;
  line-height: 1;
}
.stat-label {
  color: #555;
  font-size: 0.8rem;
}
.loser-card {
  border-color: #8b0000;
  background: #1a1212;
  box-shadow: 0 0 20px rgba(139, 0, 0, 0.25);
}
.loser-card .stat-player {
  color: #c44;
}
.loser-card .stat-count {
  color: #c44;
}
.loser-badge {
  margin-top: 0.3rem;
  font-size: 0.9rem;
  font-weight: bold;
  color: #8b0000;
}
.total-line {
  color: #666;
  font-size: 0.85rem;
  margin-bottom: 1rem;
}

/* Actions */
.actions {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
}
.btn-add {
  background: #8b0000;
  color: #eee;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
}
.btn-add:hover { background: #a01010; }
.btn-clear {
  background: #222;
  color: #888;
  border: 1px solid #333;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.85rem;
}
.btn-clear:hover { color: #c44; border-color: #c44; }

/* Form */
.form-panel {
  background: #141414;
  border: 1px solid #2a1515;
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1.5rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem;
}
.form-row {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}
.form-row label {
  color: #888;
  font-size: 0.8rem;
}
.form-row input,
.form-row select {
  background: #0d0d0d;
  border: 1px solid #222;
  color: #ccc;
  padding: 0.4rem 0.5rem;
  border-radius: 4px;
  font-size: 0.85rem;
}
.form-row input:focus,
.form-row select:focus {
  border-color: #8b0000;
  outline: none;
}
.btn-submit {
  grid-column: 1 / -1;
  background: #8b0000;
  color: #eee;
  border: none;
  padding: 0.6rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.95rem;
  font-weight: bold;
}
.btn-submit:hover { background: #a01010; }

/* Table */
.table-wrap {
  overflow-x: auto;
  border: 1px solid #222;
  border-radius: 6px;
}
table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.85rem;
}
th {
  background: #1a1a1a;
  color: #999;
  padding: 0.5rem 0.6rem;
  text-align: left;
  border-bottom: 1px solid #333;
  white-space: nowrap;
}
td {
  padding: 0.4rem 0.6rem;
  border-bottom: 1px solid #1a1a1a;
  color: #ccc;
}
tr:hover td {
  background: #111;
}
.note-cell {
  color: #666;
  max-width: 150px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.loser-row td {
  background: #1a1414 !important;
}
.loser-name {
  color: #c44;
  font-weight: bold;
}
.btn-del {
  background: none;
  border: none;
  color: #444;
  cursor: pointer;
  font-size: 0.8rem;
  padding: 0 0.25rem;
}
.btn-del:hover { color: #c44; }

.empty-msg {
  text-align: center;
  color: #555;
  padding: 2rem;
}

@media (max-width: 640px) {
  .stats-bar {
    flex-direction: column;
    min-height: auto;
    align-items: stretch;
  }
  .stat-card {
    flex-direction: row;
    justify-content: space-between;
    gap: 0.5rem;
    padding: 0.75rem 1rem;
  }
  .stat-count { font-size: 1.5rem; }
  .form-panel { grid-template-columns: 1fr; }
}
</style>
