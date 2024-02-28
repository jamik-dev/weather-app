import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

// main css
import './assets/main.css'

// plugins
import VueApexCharts from "vue3-apexcharts";
import '@/plugins/axios.js'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(VueApexCharts)

app.mount('#app')
