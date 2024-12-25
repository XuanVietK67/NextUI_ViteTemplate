import {nextui} from '@nextui-org/theme'

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    './src/layouts/**/*.{js,ts,jsx,tsx,mdx}',
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#088a85',
        'background': '#f0f7f4',
        success: "#b6e5d6",
        'title': '#b3bbbd',
        'sidebar': "#001d22",
        'active': '#263f43',
        'default':'#334a4e',
        'ring': '#848994',
        'home':'#f5f5fa',
        'red':'#ff424e',
        'gray':'#888a90',
        'special-gray':'#dfdfdf',
        'yellow':'#ffc400'
      },
      width:{
        '1/8': '12.5vw',
        '1/7': '13vw'
      },
      height:{
        '3/4':'75vh',
        '3/50':'6vh',
        '7/10':'70vh',
      }
    },
  },
  darkMode: "class",
  plugins: [nextui()],
}
