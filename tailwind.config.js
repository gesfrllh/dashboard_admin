/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens:{
      'sm': {'max': '576px'},
      'md': {'max': '765px'},
      'lg': {'max': '1024px'},
      'xl': {'max': '1280px'},
      '2xl': {'max': '1536px'},
    },
    extend: {},
  },
  plugins: [],
}

