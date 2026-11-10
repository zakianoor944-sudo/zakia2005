/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      letterSpacing: {
        // Bangla conjuncts break when letters are pulled together, so 'tight' stays neutral.
        tight: '0em',
      },
      fontFamily: {
        sans: ['"Hind Siliguri"', 'system-ui', 'sans-serif'],
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
      },
      colors: {
        primary: {
          50: '#F2F5F3',
          100: '#E1E9E4',
          200: '#C3D3C9',
          300: '#9DB6A6',
          400: '#71917F',
          500: '#557766',
          600: '#43604F',
          700: '#37503F',
          800: '#2A3D31',
          900: '#1E2B23',
        },
        neutral: {
          50: '#F9F8F5',
          100: '#F2F0EB',
          200: '#E6E3DB',
          300: '#D2CEC3',
          400: '#A29D91',
          500: '#78736A',
          600: '#5A564F',
          700: '#44413B',
          800: '#2F2D29',
          900: '#1A1917',
        },
        success: {
          50: '#EEF8F1',
          600: '#2F7A4F',
        },
        error: {
          50: '#FDF2F1',
          600: '#B42318',
        },
      },
      boxShadow: {
        soft: '0 1px 2px rgba(26, 25, 23, 0.04), 0 8px 24px -12px rgba(26, 25, 23, 0.12)',
      },
    },
  },
  plugins: [],
};
