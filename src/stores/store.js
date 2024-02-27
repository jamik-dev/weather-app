import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useStore = defineStore('store', () => {
  const theme = ref(localStorage.getItem('theme') || 'dark');

  return { theme }
})
