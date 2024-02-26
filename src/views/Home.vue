<template>
  <section id="weather" class="w-full p-12">
    <div>
      <ul class="flex gap-4">
        <li v-for="day in days" :key="day.day" class="weather-card group overflow-hidden bg-light-2 w-28 hover:w-56 dark:bg-dark-2 rounded-3xl p-4">
          <h3 class="text-lg text-center">{{day.day}}</h3>
          <div class="group-hover:flex block justify-between items-center gap-4">
            <img class="w-20" :src="`./weather-icons/fill/all/${day.icon}.svg`" alt="">
            <h4 class="font-number text-5xl group-hover:text-6xl text-center">{{day.temp}}&#176;</h4>
          </div>
          <div class="hidden mt-2 group-hover:block">
            <p class="text-sm">{{ day.desc }}</p>
            <p class="text-sm">0% chance</p>
          </div>
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue';

const days = ref([
  { day: 'Mon', icon: 'clear-day', temp: 10, desc: 'Sunny', chance: 0 },
  { day: 'Tue', icon: 'snow', temp: -2, desc: 'Sunny', chance: 0 },
  { day: 'Wed', icon: 'rain', temp: 2, desc: 'Sunny', chance: 0 },
  { day: 'Thu', icon: 'fog-day', temp: 7, desc: 'Sunny', chance: 0 },
  { day: 'Fri', icon: 'overcast', temp: 3, desc: 'Sunny', chance: 0 },
  { day: 'Sat', icon: 'overcast-day', temp: 5, desc: 'Sunny', chance: 0 },
  { day: 'Sun', icon: 'haze', temp: 4, desc: 'Sunny', chance: 0 },
]);
</script>

<style scoped>
.weather-card {
  transition: width 0.3s ease;
}
</style>