<template>
  <article class="p-4 rounded-2xl border bg-white hover:shadow-sm transition relative">
    <header class="flex items-start justify-between gap-2">
      <div>
        <h3 class="font-semibold text-lg leading-snug">{{ job.title }}</h3>
        <p class="text-sm text-gray-600">
          {{ job.company }} • {{ job.location || 'Lieu N/A' }}
        </p>
      </div>
      <div class="flex flex-col items-end gap-1 min-w-[60px]">
        <button
          class="text-xl focus:outline-none mt-1"
          :aria-label="isSaved ? 'Retirer des favoris' : 'Ajouter aux favoris'"
          @click.stop.prevent="$emit('toggle-save', job)"
          :title="isSaved ? 'Retirer des favoris' : 'Ajouter aux favoris'"
        >
          <span :style="isSaved ? 'color: #FFD600' : 'color: #bbb'">
            <span v-if="isSaved">★</span>
            <span v-else>☆</span>
          </span>
        </button>
        <a
          v-if="job.url"
          :href="job.url"
          target="_blank"
          class="text-sm text-blue-600"
        >Ouvrir</a>
      </div>
    </header>
    <p class="mt-2 text-sm text-gray-700 line-clamp-3">{{ snippet }}</p>
    <footer class="mt-3 text-xs text-gray-500">
      Publiée: {{ fmt(job.posted_date) || 'N/A' }}
    </footer>
  </article>
</template>

<script setup>

import { computed } from 'vue';

const props = defineProps({
  job: { type: Object, required: true },
  savedSet: { type: Object, required: true },
});

const isSaved = computed(() => props.savedSet.has(props.job.id));
console.log('JobCard.vue: job.id', props.job.id, 'savedSet', props.savedSet, 'isSaved', isSaved.value);

const snippet = computed(() => {
  const desc = props.job.description || "";
  return desc.length > 220 ? desc.slice(0, 220) + "…" : desc;
});

function fmt(d) {
  return d ? new Date(d).toLocaleDateString() : "";
}
</script>::
