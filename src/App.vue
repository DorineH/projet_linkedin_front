<script setup>
import { useTheme } from './useTheme';
import ThemeToggle from './components/ThemeToggle.vue'

useTheme()
</script>

<template>
<div class="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
  <header class="sticky top-0 z-10 bg-white/80 dark:bg-gray-900/80 backdrop-blur border-b border-gray-200 dark:border-gray-700">
    <div class="max-w-6xl mx-auto px-4 py-3 flex items-center gap-3">
      <div class="text-xl font-bold">Job Radar</div>
      <nav class="ml-auto text-sm text-gray-600 dark:text-gray-300 flex gap-2 items-center">
        <RouterLink class="px-3 py-1 hover:text-black dark:hover:text-white" to="/search">
          Recherche
        </RouterLink>
        <RouterLink class="px-3 py-1 hover:text-black dark:hover:text-white" to="/candidatures">
          Candidatures sauvegardées
        </RouterLink>
        <ThemeToggle />
      </nav>
    </div>
  </header>
  <main class="max-w-6xl mx-auto px-4 py-6">
    <RouterView />
  </main>
</div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
