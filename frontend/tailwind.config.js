/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  theme: {
    extend: {
      colors: {
        'brand-primary': 'var(--brand-primary)',
        'brand-hover': 'var(--brand-hover)',
        'brand-header-background': 'var(--brand-header-background)',
        'primary-white': 'var(--primary-white)',
        'white-hover': 'var(--white-hover)',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
