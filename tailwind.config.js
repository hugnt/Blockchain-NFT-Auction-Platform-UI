/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily:{
        poppins:['Poppins','sans-serif']
      },
      colors:{
        fog:{
          1: 'rgba(255, 255, 255, 0.20)',
          2: 'rgba(255, 255, 255, 0.50)',
          3: 'rgba(0, 0, 0, 0.5)',
          4: 'rgba(255, 255, 255, 0.05)',
          5: 'RGBA(50,26,78,0.88)'
        },
        purple:{
          1: 'rgba(33, 17, 52, 1)',
          2: 'rgba(66, 12, 88, 1)',
          3: 'rgba(162, 89, 255, 0.20)',
          4: 'rgba(50, 26, 78, 1)',
          5: 'rgba(66, 12, 88, 1)',
          6:'rgba(12, 68, 93, 1)'
        },
      },
      container: {
        center: true,
      },
    },
  },
  plugins: []
}