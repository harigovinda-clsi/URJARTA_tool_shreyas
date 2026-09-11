/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'bg-main': 'var(--bg-main)',
        'bg-panel': 'var(--bg-panel)',
        'bg-card': 'var(--bg-card)',
        'border-theme': 'var(--border-color)',
        'text-main': 'var(--text-main)',
        'muted-theme': 'var(--text-muted)',
      },
    },
  },
  plugins: [],
};
