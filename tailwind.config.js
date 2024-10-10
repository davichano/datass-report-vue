/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('flowbite/plugin'),
  ],
  css:{
    postcss:{
      plugins:[
        require('tailwindcss'),
        require('autoprefixer'),
      ],
    },
  }
}

