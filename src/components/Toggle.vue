<template>
  <label class="relative inline-flex items-center cursor-pointer overflow-hidden rounded-full">
    <input v-model="toggleTheme" class="sr-only peer" value="" type="checkbox" />
    <div
      class="w-24 h-12 rounded-full ring-0 peer duration-500 outline-none bg-light-2 overflow-hidden before:flex before:items-center before:justify-center after:flex after:items-center after:justify-center before:content-['☀️'] before:absolute before:h-10 before:w-10 before:top-1/2 before:bg-white before:rounded-full before:left-1 before:-translate-y-1/2 before:transition-all before:duration-700 peer-checked:before:opacity-0 peer-checked:before:rotate-90 peer-checked:before:-translate-y-full peer-checked:bg-dark-2 after:content-['🌑'] after:absolute after:bg-[#1d1d1d] after:rounded-full after:top-[4px] after:right-1 after:translate-y-full after:w-10 after:h-10 after:opacity-0 after:transition-all after:duration-700 peer-checked:after:opacity-100 peer-checked:after:rotate-180 peer-checked:after:translate-y-0">
    </div>
  </label>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useStore } from '@/stores/store';

const store = useStore();
const toggleTheme = ref(store.theme === 'dark' ? true : false)

function ifDark() {
  if(toggleTheme.value) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
}
ifDark();

watch(() => toggleTheme.value, (newValue) => {
  ifDark();
  store.theme = newValue ? 'dark' : 'light';
  localStorage.setItem('theme', store.theme);
});
</script>

<style></style>