/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'book-img' : "url(/images/home/1426929.webp)",
        'moon': "url(/images/home/canh-anh-trang.gif)"
      },
      fontFamily: {
        noto: ['Noto Sans', 'sans-serif'],
        quicksand: ['Quicksand', 'sans-serif'],
        lato : [ 'Lato', 'sans-serif']
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar')
  ],
}

