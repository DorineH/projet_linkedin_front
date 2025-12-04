<template>
  <div class="flex flex-col md:flex-row flex-wrap gap-3 items-end">
    <!-- Texte libre -->
    <input
      v-model="local.q"
      type="text"
      placeholder="Rechercher (titre, description, entreprise)"
      class="input"
      @keyup.enter="apply"
    />

    <!-- Contrat -->
    <select v-model="local.contract_type" class="input">
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
        <input v-model="local.date_from" type="date" class="input" />
      </div>
      <div class="flex flex-col text-xs text-gray-600">
        <span>Publié avant</span>
        <input v-model="local.date_to" type="date" class="input" />
      </div>
    </div>

    <!-- Tri -->
    <select v-model="local.sort" class="input">
      <option value="-posted_date">Plus récent d'abord</option>
      <option value="posted_date">Plus ancien d'abord</option>
      <option value="title">Titre (A → Z)</option>
    </select>

    <button @click="apply" class="btn">Rechercher</button>
  </div>
</template>

<script setup>
import { reactive, watch } from "vue";

const props = defineProps({
  modelValue: { type: Object, required: true },
});
const emit = defineEmits(["update:modelValue", "search"]);

const local = reactive({ ...props.modelValue });

watch(
  () => props.modelValue,
  (v) => Object.assign(local, v)
);

function apply() {
  emit("update:modelValue", { ...local });
  emit("search");
}
</script>

<style scoped>
.input {
  @apply w-full md:w-auto flex-1 px-3 py-2 rounded-xl border border-gray-300 bg-white;
}
.btn {
  @apply px-4 py-2 rounded-xl bg-black text-white hover:opacity-90;
}
</style>
