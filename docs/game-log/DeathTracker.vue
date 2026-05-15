<script setup>
import { ref, computed, onMounted, watch } from "vue";

const PLAYERS = ["MIXER", "HE", "鵼kuong"];

const OCCUPATIONS = [
  "失业", "消防员", "警察", "公园管理员", "建筑工", "保安", "木匠",
  "大盗", "厨师", "修理工", "农民", "渔夫", "医生", "退伍兵",
  "护士", "健身教练", "汉堡店员工", "电工", "工程师", "机械师", "金属工",
];

const records = ref([]);
const showForm = ref(false);

const newDeath = ref({
  date: new Date().toISOString().slice(0, 10),
  time: `${String(new Date().getHours()).padStart(2, "0")}:${String(new Date().getMinutes()).padStart(2, "0")}`,
  player: "MIXER",
  character: "",
  occupation: "失业",
  daysSurvived: 1,
  cause: "",
  note: "",
});

const STORAGE_KEY = "pz-death-records";

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
  let worst = PLAYERS[0];
  for (const p of PLAYERS) {
    if (stats.value[p] > stats.value[worst]) worst = p;
  }
  if (stats.value[worst] === 0) return null;
  return worst;
});

const totalDeaths = computed(() => records.value.length);

function addDeath() {
  records.value.push({
    id: Date.now(),
    date: newDeath.value.date,
    time: newDeath.value.time,
    player: newDeath.value.player,
    character: newDeath.value.character || "未命名",
    occupation: newDeath.value.occupation,
    daysSurvived: newDeath.value.daysSurvived,
    cause: newDeath.value.cause || "未知",
    note: newDeath.value.note || "",
  });
  newDeath.value.character = "";
  newDeath.value.cause = "";
  newDeath.value.note = "";
  newDeath.value.daysSurvived = 1;
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
    <!-- Stats Bar -->
    <div class="stats-bar">
      <div class="stat-card" v-for="p in PLAYERS" :key="p"
        :class="{ 'loser-card': loserPlayer === p }">
        <div class="stat-player">{{ p }}</div>
        <div class="stat-count">{{ stats[p] }} 次</div>
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
        <label>角色名</label>
        <input type="text" v-model="newDeath.character" placeholder="游戏内角色名" />
      </div>
      <div class="form-row">
        <label>职业</label>
        <select v-model="newDeath.occupation">
          <option v-for="o in OCCUPATIONS" :key="o" :value="o">{{ o }}</option>
        </select>
      </div>
      <div class="form-row">
        <label>存活天数</label>
        <input type="number" v-model.number="newDeath.daysSurvived" min="0" max="365" />
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
            <th>角色名</th>
            <th>职业</th>
            <th>存活</th>
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
            <td>{{ r.character }}</td>
            <td>{{ r.occupation }}</td>
            <td>{{ r.daysSurvived }} 天</td>
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

/* Stats */
.stats-bar {
  display: flex;
  gap: 1rem;
  margin-bottom: 0.5rem;
  flex-wrap: wrap;
}
.stat-card {
  flex: 1;
  min-width: 140px;
  background: #141414;
  border: 1px solid #222;
  border-radius: 8px;
  padding: 1rem;
  text-align: center;
  transition: all 0.3s;
  position: relative;
}
.stat-player {
  color: #999;
  font-size: 0.9rem;
  margin-bottom: 0.25rem;
}
.stat-count {
  color: #ccc;
  font-size: 1.6rem;
  font-weight: bold;
}
.loser-card {
  border-color: #8b0000;
  background: #1a1414;
}
.loser-card .stat-player {
  color: #8b0000;
  font-weight: bold;
}
.loser-badge {
  margin-top: 0.5rem;
  color: #8b0000;
  font-weight: bold;
  font-size: 0.85rem;
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
  font-style: italic;
  max-width: 150px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.loser-row td {
  background: #1a1414 !important;
}
.loser-name {
  color: #8b0000;
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
  .stats-bar { flex-direction: column; }
  .form-panel { grid-template-columns: 1fr; }
}
</style>
