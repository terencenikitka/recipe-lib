/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'signup': "url('https://source.unsplash.com/Mv9hjnEUHR4/600x800')"
      }
    },
    screens: {
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px'
    },
    colors: {
      'blue': '#1fb6ff',
      'purple': '#7e5bef',
      'pink': '#ff49db',
      'orange': '#ff7849',
      'green': '#13ce66',
      'yellow': '#ffc82c',
      'gray-dark': '#273444',
      'gray': '#8492a6',
      'gray-light': '#d3dce6',
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require("daisyui")
  ],
  daisyui: {
    themes: ["autumn", 
      {
          mytheme: {
          "primary": "#9b2226",
          "secondary": "#ee9b00",
          "accent": "#00334D",
          "neutral": "#e1bb80",
          "base-100": "#000814",
          "info": "#669bbc",
          "success": "#548c2f",
          "warning": "#ffc300",        
          "error": "#c1121f",
          },
        },
    ],
  },
}

