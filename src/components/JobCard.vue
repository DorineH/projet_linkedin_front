<template>
  <article class="p-4 rounded-2xl border bg-white hover:shadow-sm transition">
    <header class="flex items-start justify-between gap-2">
      <div>
        <h3 class="font-semibold text-lg leading-snug">{{ job.title }}</h3>
        <p class="text-sm text-gray-600">
          {{ job.company }} • {{ job.location || "Lieu N/A" }}
        </p>
      </div>
      <a
        v-if="job.url"
        :href="job.url"
        target="_blank"
        class="text-sm text-blue-600"
        >Ouvrir</a
      >
    </header>
    <p class="mt-2 text-sm text-gray-700 line-clamp-3">{{ snippet }}</p>
    <footer class="mt-3 text-xs text-gray-500">
      Publiée: {{ fmt(job.posted_date) || "N/A" }}
    </footer>
  </article>
</template>
<script setup>
import { computed } from "vue";

const props = defineProps({
  job: { type: Object, required: true },
});

const snippet = computed(() => {
  const desc = props.job.description || "";
  return desc.length > 220 ? desc.slice(0, 220) + "…" : desc;
});

function fmt(d) {
  return d ? new Date(d).toLocaleDateString() : "";
}
</script>
