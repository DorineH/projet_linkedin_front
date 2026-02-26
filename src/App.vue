<script setup>
import HelloWorld from "./components/HelloWorld.vue";
</script>

<template>
  <div>
    <header class="sticky top-0 z-10 bg-white/80 backdrop-blur border-b">
      <div class="max-w-6xl mx-auto px-4 py-3 flex items-center gap-3">
        <div class="text-xl font-bold">Jobs Visualizer</div>
        <nav class="ml-auto text-sm text-gray-600 flex gap-2">
          <RouterLink class="px-3 py-1 hover:text-black" to="/search">
            Recherche
          </RouterLink>
          <RouterLink class="px-3 py-1 hover:text-black" to="/candidatures">
            Candidatures sauvegardées
          </RouterLink>
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
