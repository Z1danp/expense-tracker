/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        bebas: ['var(--font-bebas)'],
        barlow: ['var(--font-barlow)'],
      },
      colors: {
        black: 'var(--color-black)',
        red: 'var(--color-red)',
        'dark-maroon': 'var(--color-dark-maroon)',
        gray: 'var(--color-gray)',
        white: 'var(--color-white)',
        'acid-yellow': 'var(--color-acid-yellow)',
        'charcoal-gray': 'var(--color-charcoal-gray)',
        'light-gray': 'var(--color-light-gray)',
      },
    },
  },
  plugins: [],
};
