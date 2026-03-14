/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
    './context/**/*.{js,jsx,ts,tsx}',
    './lib/**/*.{js,jsx,ts,tsx}',
    './hooks/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Primary brand palette
        brand: {
          navy:    '#1E3A5F',
          steel:   '#3A6EA5',
          saffron: '#F59E0B',
          light:   '#EBF3FB',
        },
        // Neutral palette
        surface: {
          DEFAULT: '#FFFFFF',
          alt:     '#F5F7FA',
          border:  '#E5E7EB',
        },
        // Text
        ink: {
          DEFAULT: '#1F2937',
          muted:   '#6B7280',
          subtle:  '#9CA3AF',
        },
      },
      fontFamily: {
        sans:     ['Open Sans', 'system-ui', 'sans-serif'],
        heading:  ['Inter',    'system-ui', 'sans-serif'],
      },
      fontSize: {
        '2xs': '0.625rem',
      },
      boxShadow: {
        'card':    '0 1px 3px 0 rgba(0,0,0,0.08), 0 1px 2px -1px rgba(0,0,0,0.05)',
        'card-lg': '0 4px 12px 0 rgba(0,0,0,0.10)',
        'nav':     '0 1px 0 0 #E5E7EB',
      },
      borderRadius: {
        DEFAULT: '4px',
        'md':    '6px',
        'lg':    '8px',
        'xl':    '12px',
      },
    },
  },
  plugins: [],
};
