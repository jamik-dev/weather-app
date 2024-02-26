/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  content: [],
  theme: {
    extend: {},
    colors: {
      'light-1': '#F7F8F9',
      'light-2': '#DCDFE4',
      'dark-1': '#101214',
      'dark-2': '#22272B'
    },
    fontFamily: {
      'number': ['Anta', 'sans-serif'],
      'text': ['Montserrat', 'sans-serif']
    }
  },
  plugins: [],
}

