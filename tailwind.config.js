/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
  "./pages/**/*.{js,ts,jsx,tsx}",
  "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: '#0891B2',
        'brand-dark': '#0E7490',
        'brand-light': '#22D3EE',
        cream: '#F8FAFC',
        'gray-warm': '#F1F5F9',
        'gray-mid': '#E2E8F0',
        'text-dark': '#0F172A',
        'text-mid': '#475569',
        'text-muted': '#94A3B8',
      },
      fontFamily: {
      sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      display: ['var(--font-inter)', 'system-ui', 'sans-serif'],
},
    },
  },
  plugins: [],
}