/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx}','./src/common/**/*.{js,jsx}'],
   mode: 'jit',
  theme: {
    screens: {
      'sm': '640px',
      // => @media (min-width: 640px) { ... }

      'md': '768px',
      // => @media (min-width: 768px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
    },
    textColor: (theme) => ({
      ...theme('colors'),
      main: '#fff',
      secondary: '#F5D26D',
      gray: '#9e9e9e',
    }),
    borderColor: (theme) => ({
      ...theme('colors'),
      secondary: '#F5D26D',
      gray: '#9e9e9e',
    }),
    extend: {},
  },
  plugins: [require('daisyui'), require('prettier-plugin-tailwindcss'), require('autoprefixer')],
  daisyui: {
    styled: true,
    themes: true,
    base: true,
    utils: true,
    logs: true,
    rtl: false,
    prefix: '',
    darkTheme: 'light',
  },
};
