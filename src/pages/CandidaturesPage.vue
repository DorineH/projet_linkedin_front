<template>
  <section>
    <h1 class="text-2xl font-bold mb-4">Mes candidatures sauvegardées</h1>
    <div class="flex gap-4 mb-4">
      <select v-model="filterStatus" class="input">
        <option value="">Tous statuts</option>
        <option v-for="s in statusList" :key="s" :value="s">{{ s }}</option>
      </select>
    </div>
    <div v-if="loading" class="text-gray-500">Chargement…</div>
    <div v-else-if="filtered.length === 0" class="text-gray-500">Aucune candidature sauvegardée</div>
    <div v-else class="space-y-4">
      <div v-for="item in filtered" :key="item.id" class="p-4 rounded-xl border bg-white flex flex-col gap-2">
        <div class="flex justify-between items-center">
          <div>
            <div class="font-semibold text-lg">{{ item.job?.title }}</div>
            <div class="text-sm text-gray-600">{{ item.job?.company }} • {{ item.job?.location }}</div>
          </div>
          <a :href="item.job?.url" target="_blank" class="btn-primary">Ouvrir LinkedIn</a>
        </div>
        <div class="flex gap-2 items-center">
          <select v-model="item.status" @change="updateStatus(item)" class="input">
            <option v-for="s in statusList" :key="s" :value="s">{{ s }}</option>
          </select>
          <button @click="remove(item)" class="btn-secondary">Retirer</button>
        </div>
        <textarea v-model="item.note" @input="debouncedUpdateNote(item)" class="input w-full" rows="2" placeholder="Note personnelle…"></textarea>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { listSavedJobs, updateSavedJob, deleteSavedJob } from '@/api/savedJobs';

const items = ref([]);
const loading = ref(true);
const filterStatus = ref('');
const statusList = ['En attente', 'Entretien', 'Refusé', 'Accepté'];

onMounted(async () => {
  loading.value = true;
  const res = await listSavedJobs();
  items.value = res.items || [];
  loading.value = false;
});

const filtered = computed(() => {
  if (!filterStatus.value) return items.value;
  return items.value.filter(i => i.status === filterStatus.value);
});

function updateStatus(item) {
  updateSavedJob(item.id, { status: item.status });
}

let noteTimeout = null;
function debouncedUpdateNote(item) {
  if (noteTimeout) clearTimeout(noteTimeout);
  noteTimeout = setTimeout(() => {
    updateSavedJob(item.id, { note: item.note });
  }, 500);
}

function remove(item) {
  deleteSavedJob(item.id);
  items.value = items.value.filter(i => i.id !== item.id);
}
</script>

<style scoped>
.input {
  @apply px-3 py-2 rounded-xl border border-gray-300 bg-white;
}
.btn-primary {
  @apply px-3 py-2 rounded-xl bg-black text-white hover:opacity-90;
}
.btn-secondary {
  @apply px-3 py-2 rounded-xl border border-gray-300 bg-white text-sm hover:bg-gray-50;
}
</style>
