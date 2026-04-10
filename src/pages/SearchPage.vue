<template>
  <section>
    <div class="flex flex-col md:flex-row flex-wrap gap-3 items-end mb-4">
      <input
        v-model="q"
        type="text"
        placeholder="Rechercher (titre, description, entreprise)"
        class="input"
        @keyup.enter="onSearch"
      />

      <!-- Contrat -->
      <select v-model="contract_type" class="input">
        <option value="">Contrat (tous)</option>
        <option>CDI</option>
        <option>CDD</option>
        <option>Freelance</option>
        <option>Stage</option>
        <option>Alternance</option>
      </select>

      <!-- Dates -->
      <div class="flex gap-2 w-full md:w-auto">
        <div class="flex flex-col text-xs text-gray-600">
          <span>Publié après</span>
          <input v-model="date_from" type="date" class="input" />
        </div>
        <div class="flex flex-col text-xs text-gray-600">
          <span>Publié avant</span>
          <input v-model="date_to" type="date" class="input" />
        </div>
      </div>

      <!-- Tri -->
      <select v-model="sort" class="input">
        <option value="-posted_date">Plus récent d'abord</option>
        <option value="posted_date">Plus ancien d'abord</option>
        <option value="title">Titre (A → Z)</option>
      </select>

      <button @click="onSearch" class="btn">Rechercher</button>
      <button @click="onReset" class="btn-secondary">Réinitialiser</button>
    </div>

    <!-- Liste des offres -->
    <div
      class="mt-4 grid md:grid-cols-2 gap-4"
      v-if="!store.loading && store.items.length"
    >
      <RouterLink
        v-for="j in store.items"
        :key="j.id"
        :to="`/jobs/${j.id}`"
        class="block"
        style="text-decoration: none; color: inherit"
      >
        <JobCard
          :job="j"
          :saved-set="savedSet"
          @toggle-save="handleToggleSave"
        />
      </RouterLink>
</div>

<!-- États vides / chargement / erreur -->
<div v-else-if="store.loading" class="mt-8 text-gray-500 dark:text-gray-400">Chargement…</div>
<div v-else class="mt-8 text-gray-500 dark:text-gray-400">Aucun résultat</div>
    <div v-if="store.error" class="mt-2 text-red-600">
      {{ store.error }}
    </div>

    <!-- Pagination -->
    <Pagination
      class="mt-4"
      :total="store.total"
      v-model:page="store.page"
      :page-size="store.page_size"
      @update:page="onPage"
    />

    <!-- Infos pagination -->
    <div class="meta mt-2 text-sm text-gray-600 dark:text-gray-400" v-if="store.total">
      Affichage {{ from }}–{{ to }} sur {{ store.total }} offres • Page
      {{ store.page }} / {{ totalPages }}
    </div>
  </section>
</template>

<script setup>

import { ref, onMounted, computed, triggerRef } from "vue";
import { useJobsStore } from "@/stores/jobs";
import Pagination from "@/components/Pagination.vue";
import JobCard from "@/components/JobCard.vue";
import { listSavedJobs, saveJob, deleteSavedJob } from "@/api/savedJobs";

const store = useJobsStore();

const q = ref(store.q);
const contract_type = ref(store.contract_type);
const date_from = ref(store.date_from);
const date_to = ref(store.date_to);
const sort = ref(store.sort || "-posted_date");

const savedSet = ref(new Set());
const savedMap = ref({});

async function handleToggleSave(job) {
  const jobId = job.id;

  if (savedSet.value.has(jobId)) {
    savedSet.value.delete(jobId);
    triggerRef(savedSet);

    const savedId = savedMap.value[jobId];

    try {
      if (savedId) {
        await deleteSavedJob(savedId); 
        delete savedMap.value[jobId];
      } else {
        console.warn("Unsaved impossible: savedId manquant, resync...");
        await fetchSavedJobs();
      }
    } catch (e) {
      savedSet.value.add(jobId);
      triggerRef(savedSet);
      console.error(e);
    }
    return;
  }

  savedSet.value.add(jobId);
  triggerRef(savedSet);

  try {
    const res = await saveJob(Number(jobId));

    const savedId =
      res?.id ?? res?.saved_id ?? res?.data?.id ?? res?.data?.saved_id ?? null;

    if (savedId) {
      savedMap.value[jobId] = savedId;
    } else {
      await fetchSavedJobs();
    }
  } catch (e) {
    savedSet.value.delete(jobId);
    triggerRef(savedSet);
    console.error(e);
  }
}

const totalPages = computed(() => {
  const size = store.page_size || 20;
  return Math.max(1, Math.ceil((store.total || 0) / size));
});

const from = computed(() => {
  if (!store.total) return 0;
  const size = store.page_size || 20;
  return (store.page - 1) * size + 1;
});

const to = computed(() => {
  if (!store.total) return 0;
  const size = store.page_size || 20;
  return Math.min(store.page * size, store.total);
});

function syncToStore() {
  store.q = q.value;
  store.contract_type = contract_type.value;
  store.date_from = date_from.value;
  store.date_to = date_to.value;
  store.sort = sort.value;
}

async function onSearch() {
  store.page = 1;
  syncToStore();
  await store.fetch();
}

async function onPage(newPage) {
  store.page = newPage;
  syncToStore();
  await store.fetch();
}

async function onReset() {
  q.value = "";
  contract_type.value = "";
  date_from.value = "";
  date_to.value = "";
  sort.value = "-posted_date";

  store.page = 1;
  syncToStore();
  await store.fetch();
}

async function fetchSavedJobs() {
  const data = await listSavedJobs();
  const jobs = Array.isArray(data)
    ? data
    : data && Array.isArray(data.items)
      ? data.items
      : [];
  savedSet.value = new Set(jobs.map(j => j.job_id));
  savedMap.value = {};
  for (const j of jobs) {
    savedMap.value[j.job_id] = j.id;
  }
}

onMounted(async () => {
  if (store.items.length === 0) {
    syncToStore();
    await store.fetch();
  } else {
    q.value = store.q;
    contract_type.value = store.contract_type;
    date_from.value = store.date_from;
    date_to.value = store.date_to;
    sort.value = store.sort;
  }
  await fetchSavedJobs();
});
</script>

<style scoped>
.input {
  @apply w-full md:w-auto flex-1 px-3 py-2 rounded-xl border 
         border-gray-300 dark:border-gray-600 
         bg-white dark:bg-gray-800 
         text-gray-900 dark:text-gray-100;
}
.btn {
  @apply px-4 py-2 rounded-xl bg-black dark:bg-blue-600 text-white hover:opacity-90;
}
.btn-secondary {
  @apply px-4 py-2 rounded-xl border 
         border-gray-300 dark:border-gray-600 
         bg-white dark:bg-gray-800 
         text-gray-900 dark:text-gray-100 
         text-sm hover:bg-gray-50 dark:hover:bg-gray-700;
}
</style>
