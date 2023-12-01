/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}'
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
    require("daisyui"),
    require('flowbite/plugin')
  ],
  daisyui: {
    themes: ["autumn", "business",
    {
      myLight: {
        'primary': '#c2c7b8',         
        'primary-focus': '#69657b',  
        'primary-content': '#58663C', 
        'secondary': '#BFB9D8',
        'secondary-focus': '#af8743',
        'secondary-content': '#66442d',
        'accent': '#e19e3a',
        'accent-focus': '#d98127',
        'accent-content': '#c0611f',
        'neutral': '#c2a4af',
        'neutral-focus': '#7a5667',
        'neutral-content': '#302128',
        'base-100':'#F7F4EC',

        'base-content': '#735539',
        'info': '#74a3a1',
        'info-content': '#2c4243',
        'success': '#becde3',
        'success-content': '#7380b8',
        'warning': '#c66f6d',
        'warning-content': '#6b3037',
        'error': '#5a7266',
        'error-content': '#2f3834',
      }
      },
      {
        myDark: {
          'primary': '#729a9f',         
          'primary-focus': '#d7a029',  
          'primary-content': '#204246', 
          'secondary': '#AA6F73',
          'secondary-focus': '#553739',
          'secondary-content': '#553739',
          'accent': '#ffcb7f',
          'accent-focus': '#ffb64c',
          'accent-content': '#ff9800',
          'neutral': '#b6b3b3',
          'neutral-focus': '#837f7f',
          'neutral-content': '#5b5959',
          'base-100':'#263238',

          'base-content': '#735539',
          'info': '#6582ab',
          'info-content': '#414f67',
          'success': '#405fb3',
          'success-content': '#e2ebf7',
          'warning': '#d95bab',
          'warning-content': '#480f2e',
          'error': '#de3124',
          'error-content': '#ffcdc9',
        }
      },
    ],
  },
}


// {
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
//             'granite-green': {
//               '50': '#f6f6f3',
//               '100': '#e8e6e3',
//               '200': '#d2d0c8',
//               '300': '#b2b0a3',
//               '400': '#92907e',
//               '500': '#706e59',
//               '600': '#575644',
//               '700': '#464536',
//               '800': '#38382d',
//               '900': '#2f2f25',
//               '950': '#1a1a14',
//           },
//             'laser': {
//               '50': '#f8f6ee',
//               '100': '#efe8d2',
//               '200': '#e0d2a8',
//               '300': '#ccb271',
//               '400': '#bf9b50',
//               '500': '#af8743',
//               '600': '#976c37',
//               '700': '#79522f',
//               '800': '#66442d',
//               '900': '#583a2b',
//               '950': '#321e16',
//           },
//             'fire-bush': {
//               '50': '#fdf8ed',
//               '100': '#f7eace',
//               '200': '#efd398',
//               '300': '#e7b862',
//               '400': '#e19e3a',
//               '500': '#d98127',
//               '600': '#c0611f',
//               '700': '#a0461d',
//               '800': '#82381e',
//               '900': '#6c2e1b',
//               '950': '#3d160b',
//           },
//             'woody-brown': {
//               '50': '#f9f6f7',
//               '100': '#f4eff1',
//               '200': '#eae0e4',
//               '300': '#dac7ce',
//               '400': '#c2a4af',
//               '500': '#ad8794',
//               '600': '#966c78',
//               '700': '#7e5862',
//               '800': '#694b52',
//               '900': '#5a4147',
//               '950': '#442e33',
//           },
//           }
//         },
    
//         darktheme: {
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

