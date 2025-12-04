<template>
  <section class="max-w-3xl mx-auto p-4 space-y-4">
    <!-- Bouton retour -->
    <button class="btn-secondary" @click="goBack">
      ← Retour aux résultats
    </button>

    <div v-if="loading" class="text-gray-500">Chargement…</div>

    <div v-else-if="error" class="text-red-600">
      {{ error }}
    </div>

    <div v-else class="space-y-4">
      <h1 class="text-2xl font-bold">{{ job.title }}</h1>

      <div class="text-gray-700">
        <p><strong>Entreprise :</strong> {{ job.company }}</p>
        <p><strong>Lieu :</strong> {{ job.location }}</p>
        <p><strong>Contrat :</strong> {{ job.contract_type || "N/A" }}</p>
        <p><strong>Publié le :</strong> {{ fmt(job.posted_date) }}</p>
      </div>

      <div>
        <h2 class="font-semibold mb-2">Description</h2>
        <p class="whitespace-pre-line text-gray-800">
          {{ job.description }}
        </p>
      </div>

      <a :href="job.url" target="_blank" class="btn-primary">
        🔗 Voir l'annonce LinkedIn
      </a>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import api from "@/lib/api";

const route = useRoute();
const router = useRouter();

const job = ref(null);
const loading = ref(true);
const error = ref(null);

function fmt(d) {
  return d ? new Date(d).toLocaleDateString() : "";
}

function goBack() {
  // Si on a une page précédente (venant de /search), on y retourne
  if (window.history.length > 1) {
    router.back();
  } else {
    // Sinon on renvoie vers la recherche
    router.push("/search");
  }
}

onMounted(async () => {
  try {
    loading.value = true;
    const id = route.params.id;
    const { data } = await api.get(`/api/jobs/${id}`);
    job.value = data;
  } catch (e) {
    error.value = "Impossible de charger cette offre";
  } finally {
    loading.value = false;
  }
});
</script>

<style scoped>
.btn-primary {
  @apply inline-block px-4 py-2 bg-black text-white rounded-xl hover:opacity-90;
}
.btn-secondary {
  @apply inline-block mb-2 px-3 py-1 rounded-xl border border-gray-300 bg-white text-sm hover:bg-gray-50;
}
</style>
