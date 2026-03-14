/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './context/**/*.{js,ts,jsx,tsx}',
    './lib/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        blue: {
          950: '#0c1e3e',
          900: '#1e3a5f',
          800: '#1e40af',
          700: '#1d4ed8',
          600: '#2563eb',
          500: '#3b82f6',
          400: '#60a5fa',
          300: '#93c5fd',
          200: '#bfdbfe',
          100: '#dbeafe',
          50:  '#eff6ff',
        },
        saffron: {
          600: '#d97706',
          500: '#f59e0b',
          400: '#fbbf24',
          100: '#fef3c7',
          50:  '#fffbeb',
        },
      },
      fontFamily: {
        sans:    ['Open Sans', 'system-ui', 'sans-serif'],
        heading: ['Inter',     'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'card':  '0 1px 4px rgba(0,0,0,0.06)',
        'card-hover': '0 8px 30px rgba(0,0,0,0.10)',
        'nav':   '0 2px 20px rgba(0,0,0,0.08)',
        'cta':   '0 8px 40px rgba(30,64,175,0.25)',
      },
      container: {
        center:  true,
        padding: { DEFAULT: '1rem', sm: '1.5rem', lg: '2rem' },
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
  ],
};
