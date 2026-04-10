<template>
<div class="flex items-center justify-between mt-4">
    <div class="text-sm text-gray-600 dark:text-gray-400">Total: {{ total }}</div>
    <div class="flex items-center gap-2">
      <button class="btn" :disabled="page <= 1" @click="$emit('update:page', page - 1)">Précédent</button>
      <span class="px-2 text-gray-900 dark:text-gray-100">Page {{ page }}</span>
      <button class="btn" :disabled="page >= maxPage" @click="$emit('update:page', page + 1)">Suivant</button>
    </div>
  </div>
</template>
<script setup>

import { computed } from "vue";

const props = defineProps({
  total: Number,
  page: Number,
  pageSize: Number,
});

const maxPage = computed(() =>
  Math.max(1, Math.ceil((props.total || 0) / (props.pageSize || 20)))
);
</script>
<style scoped>
.btn {
  @apply px-3 py-2 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50;
}
</style>
