/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        grey: 'var(--color-grey)',
        'grey-main': 'var(--color-grey-main)',
        'grey-dark': 'var(--color-grey-dark)',
      },
    },
  },
  plugins: [],
};
