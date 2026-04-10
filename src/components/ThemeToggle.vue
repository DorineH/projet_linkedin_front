<template>
  <button @click="toggleTheme" class="switch" :class="{ dark: isDark }" aria-label="Toggle theme">
    <span class="icon">{{ isDark ? '🌙' : '☀️' }}</span>
    <span class="knob"></span>
  </button>
</template>

<script setup>
import { useTheme } from '../useTheme';

const { isDark, toggleTheme } = useTheme()
</script>

<style scoped>
.switch {
  position: relative;
  display: flex;
  align-items: center;
  gap: 6px;
  width: 64px;
  height: 32px;
  border-radius: 999px;
  border: none;
  padding: 0 8px;
  cursor: pointer;
  background: #e2e8f0;
  transition: background 0.3s;
}

.switch.dark {
  background: #3b4a6b;
}

.knob {
  position: absolute;
  top: 4px;
  left: 4px;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: white;
  transition: transform 0.3s;
  box-shadow: 0 1px 4px rgba(0,0,0,0.2);
}

.switch.dark .knob {
  transform: translateX(32px);
}

.icon {
  position: absolute;
  right: 7px;
  font-size: 14px;
  transition: opacity 0.3s;
}

.switch.dark .icon {
  right: auto;
  left: 7px;
}
</style>