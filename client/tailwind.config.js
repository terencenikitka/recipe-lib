/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'signup': "url('https://source.unsplash.com/Mv9hjnEUHR4/600x800')"
      },
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif'],
        'bodoni-moda': ['Bodoni Moda', 'serif']
      },
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
    themes: ["autumn", "business",
      
    ],
  },
}


// {
//           darktheme: {
//           "primary": "#9b2226",
//           "secondary": "#ee9b00",
//           "accent": "#00334D",
//           "neutral": "#e1bb80",
//           "base-100": "#000814",
//           "info": "#669bbc",
//           "success": "#548c2f",
//           "warning": "#ffc300",        
//           "error": "#c1121f",
//           },
//           lighttheme: {
//             'parchment': {
//               '50': '#faf8f2',
//               '100': '#f3efe1',
//               '200': '#e8e0c8',
//               '300': '#d5c59c',
//               '400': '#c4a973',
//               '500': '#b79358',
//               '600': '#aa804c',
//               '700': '#8d6741',
//               '800': '#735439',
//               '900': '#5d4531',
//               '950': '#322418',
//           },

//           }
//         },

