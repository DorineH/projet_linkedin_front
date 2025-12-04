<template>
  <div class="flex items-center justify-between mt-4">
    <div class="text-sm text-gray-600">Total: {{ total }}</div>
    <div class="flex items-center gap-2">
      <button
        class="btn"
        :disabled="page <= 1"
        @click="$emit('update:page', page - 1)"
      >
        Précédent
      </button>
      <span class="px-2">Page {{ page }}</span>
      <button
        class="btn"
        :disabled="page >= maxPage"
        @click="$emit('update:page', page + 1)"
      >
        Suivant
      </button>
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
  @apply px-3 py-2 rounded-xl border bg-white hover:bg-gray-50 disabled:opacity-50;
}
</style>
