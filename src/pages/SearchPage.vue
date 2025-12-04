<template>
  <section>
    <!-- Filtres de recherche -->
    <div class="flex flex-col md:flex-row flex-wrap gap-3 items-end mb-4">
      <!-- Texte libre -->
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
      <RouterLink :to="`/jobs/${j.id}`" v-for="j in store.items" :key="j.id">
        <JobCard :job="j" />
      </RouterLink>
    </div>

    <!-- États vides / chargement / erreur -->
    <div v-else-if="store.loading" class="mt-8 text-gray-500">Chargement…</div>

    <div v-else class="mt-8 text-gray-500">Aucun résultat</div>

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
  </section>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useJobsStore } from "@/stores/jobs";
import Pagination from "@/components/Pagination.vue";
import JobCard from "@/components/JobCard.vue";

const store = useJobsStore();

// Champs liés aux inputs
const q = ref(store.q);
const contract_type = ref(store.contract_type);
const date_from = ref(store.date_from);
const date_to = ref(store.date_to);
const sort = ref(store.sort || "-posted_date");

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
  // Réinitialiser les champs locaux
  q.value = "";
  contract_type.value = "";
  date_from.value = "";
  date_to.value = "";
  sort.value = "-posted_date";

  // Réinitialiser la pagination
  store.page = 1;

  // Synchroniser avec le store et recharger
  syncToStore();
  await store.fetch();
}

onMounted(async () => {
  if (store.items.length === 0) {
    syncToStore();
    await store.fetch();
  } else {
    // On remet juste les inputs à jour avec le store
    q.value = store.q;
    contract_type.value = store.contract_type;
    date_from.value = store.date_from;
    date_to.value = store.date_to;
    sort.value = store.sort;
  }
});
</script>

<style scoped>
.input {
  @apply w-full md:w-auto flex-1 px-3 py-2 rounded-xl border border-gray-300 bg-white;
}
.btn {
  @apply px-4 py-2 rounded-xl bg-black text-white hover:opacity-90;
}
.btn-secondary {
  @apply px-4 py-2 rounded-xl border border-gray-300 bg-white text-sm hover:bg-gray-50;
}
</style>
