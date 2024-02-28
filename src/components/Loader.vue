<template>
  <transition name="load" mode="out-in">
    <div v-if="loader" class="w-screen h-screen fixed z-20 dark:bg-dark-1 bg-light-1 flex justify-center items-center">
      <div
      class="p-3 animate-spin drop-shadow-2xl bg-gradient-to-bl from-pink-400 via-purple-400 to-indigo-600 md:w-48 md:h-48 h-32 w-32 aspect-square rounded-full">
      <div class="rounded-full h-full w-full bg-slate-100 dark:bg-zinc-900 background-blur-md"></div>
    </div>
  </div>
</transition>
</template>

<script setup>
import {ref} from 'vue';
const loader = ref(true);

document.addEventListener('DOMContentLoaded',(e) => {
  setTimeout(() => {
    loader.value = false
  }, 2000)
})
</script>

<style scoped>
.load-leave-to {
  opacity: 0;
} 

.load-enter-active, .load-leave-active {
  transition: all 0.5s ease-out;
}

.load-enter-to, .load-leave-from {
  opacity: 1;
}
</style>