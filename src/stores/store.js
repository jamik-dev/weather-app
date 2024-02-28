import { ref, computed } from "vue";
import { defineStore } from "pinia";
import axios from "axios";

export const useStore = defineStore("store", () => {
  const theme = ref(localStorage.getItem("theme") || "dark");
  const weather_all = ref([]);
  const chosen_daily = ref(null);

  const regions = ref([
    { name: "Andijan", code: "UZ-AN", lat: "40.7833", lng: "72.3333", top: 300, left: 820, width: 8 },
    { name: "Bukhara", code: "UZ-BU", lat: "39.7667", lng: "64.4333", top: 320, left: 400, width: 16 },
    { name: "Fergana", code: "UZ-FA", lat: "40.3864", lng: "71.7864", top: 320, left: 770, width: 8 },
    { name: "Jizzakh", code: "UZ-JI", lat: "40.1158", lng: "67.8422", top: 320, left: 590, width: 12 },
    { name: "Namangan", code: "UZ-NG", lat: "41.0011", lng: "71.6683", top: 285, left: 765, width: 10 },
    { name: "Navai", code: "UZ-NV", lat: "40.0844", lng: "65.3792", top: 208, left: 440, width: 24},
    { name: "Kashkadarya", code: "UZ-QA", lat: "38.8667", lng: "65.8000", top: 410, left: 530, width: 12 },
    { name: "Karakalpak", code: "UZ-QR", lat: "42.4667", lng: "59.6000", top: 128, left: 208, width: 24 },
    { name: "Samarkand", code: "UZ-SA", lat: "39.6547", lng: "66.9758", top: 350, left: 540, width: 12 },
    { name: "Sirdarya", code: "UZ-SI", lat: "40.4833", lng: "68.7833", top: 320, left: 650, width: 8 },
    { name: "Surkhandarya", code: "UZ-SU", lat: "37.2167", lng: "67.2833", top: 460, left: 590, width: 12 },
    { name: "Tashkent city", code: "UZ-TK", lat: "41.3111", lng: "69.2797", top: 260, left: 690, width: 8 },
    { name: "Tashkent", code: "UZ-TO", lat: "41.2213", lng: "69.8597", top: 290, left: 700, width: 8 },
    { name: "Khorazm", code: "UZ-XO", lat: "41.5500", lng: "60.6333", top: 250, left: 270, width: 12 },
  ]);

  const icons = ref([
    { id: 200, icon: "thunderstorms-day-rain" },
    { id: 201, icon: "thunderstorms-rain" },
    { id: 202, icon: "thunderstorms-rain" },
    { id: 210, icon: "thunderstorms" },
    { id: 211, icon: "thunderstorms" },
    { id: 212, icon: "thunderstorms" },
    { id: 221, icon: "thunderstorms" },
    { id: 230, icon: "thunderstorms-day-rain" },
    { id: 231, icon: "thunderstorms-day-rain" },
    { id: 232, icon: "thunderstorms-day-rain" },
    { id: 300, icon: "drizzle" },
    { id: 301, icon: "drizzle" },
    { id: 302, icon: "drizzle" },
    { id: 310, icon: "drizzle" },
    { id: 311, icon: "drizzle" },
    { id: 312, icon: "drizzle" },
    { id: 313, icon: "drizzle" },
    { id: 314, icon: "drizzle" },
    { id: 321, icon: "drizzle" },
    { id: 500, icon: "partly-cloudy-day-rain" },
    { id: 501, icon: "rain" },
    { id: 502, icon: "rain" },
    { id: 503, icon: "rain" },
    { id: 504, icon: "rain" },
    { id: 511, icon: "partly-cloudy-day-sleet" },
    { id: 520, icon: "partly-cloudy-day-rain" },
    { id: 521, icon: "partly-cloudy-day-rain" },
    { id: 522, icon: "partly-cloudy-day-rain" },
    { id: 531, icon: "partly-cloudy-day-rain" },
    { id: 600, icon: "snow" },
    { id: 601, icon: "snow" },
    { id: 602, icon: "snow" },
    { id: 611, icon: "partly-cloudy-day-sleet" },
    { id: 612, icon: "snow" },
    { id: 613, icon: "snow" },
    { id: 615, icon: "snow" },
    { id: 616, icon: "snow" },
    { id: 620, icon: "snow" },
    { id: 621, icon: "snow" },
    { id: 622, icon: "snow" },
    { id: 701, icon: "mist" },
    { id: 711, icon: "smoke" },
    { id: 721, icon: "haze" },
    { id: 731, icon: "dust" },
    { id: 741, icon: "fog" },
    { id: 751, icon: "sand" },
    { id: 761, icon: "dust-day" },
    { id: 762, icon: "barometer" },
    { id: 771, icon: "fog" },
    { id: 781, icon: "tornado" },
    { id: 800, icon: "clear-day" },
    { id: 801, icon: "cloudy" },
    { id: 802, icon: "cloudy" },
    { id: 803, icon: "overcast" },
    { id: 804, icon: "overcast" },
  ]);

  const days = ref([
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ]);

  const getWeather = async (code) => {
    const region = regions.value.find((region) => region.code === code);
    await axios
      .get(
        `onecall?lat=${region.lat}&lon=${
          region.lng
        }&exclude=minutely,hourly,alerts&appid=${
          import.meta.env.VITE_BASE_URL_KEY
        }&units=metric&lang=en`
      )
      .then((response) => {
        chosen_daily.value = response.data.daily.slice(0, 7);
        chosen_daily.value.forEach((day, index) => {
          if (index === 0) {
            day.active = true;
          } else {
            day.active = false;
          }

          for (let key in day.temp) {
            if (typeof day.temp[key] === "number") {
              day.temp[key] = Math.floor(day.temp[key]);
            }
          }
          day.weather[0].icon = icons.value.find(
            (icon) => icon.id === day.weather[0].id
          ).icon;
          day.dt = days.value[new Date(day.dt * 1000).getDay()];
        });
        chosen_daily.value[0].dt = "Today";
      })
      .catch((error) => {
        console.error("Error:", error);
      })
  };

  const getWeatherAllRegions = async () => {
    for(const region of regions.value) {
      await axios
        .get(
          `onecall?lat=${region.lat}&lon=${
            region.lng
          }&exclude=minutely,hourly,alerts&appid=${
            import.meta.env.VITE_BASE_URL_KEY
          }&units=metric&lang=en`
        )
        .then((response) => {
          let daily = response.data.daily[0];
          daily.name = region.name;
          daily.top = region.top;
          daily.left = region.left;
          daily.width = region.width;
          for (let key in daily.temp) {
            if (typeof daily.temp[key] === "number") {
              daily.temp[key] = Math.floor(daily.temp[key]);
            }
          }
          daily.weather[0].icon = icons.value.find(
            (icon) => icon.id === daily.weather[0].id
          ).icon;
          daily.dt = days.value[new Date(daily.dt * 1000).getDay()];
          daily.code = region.code;
          weather_all.value.push(daily);
        })
    }
  };

  return { theme, regions, getWeather, chosen_daily, getWeatherAllRegions, weather_all };
});
