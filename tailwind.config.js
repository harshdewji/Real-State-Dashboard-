/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        sage: {
          50: '#F4F7F5',
          100: '#E6EDE8',
          200: '#CFDDD3',
          300: '#B0C7B7',
          400: '#94B29D',
          500: '#789B83', // Primary brand color
          600: '#5E8069',
          700: '#4B6654',
          800: '#3D5244',
          900: '#26332C', // Dark charcoal text
        },
        beige: {
          50: '#FCFBF9',
          100: '#F5F1E9', // Warm Beige secondary
          200: '#ECE4D4',
          300: '#DFD4BE',
          400: '#CDBFA2',
          500: '#BAA986',
        },
        offwhite: '#FAFAF7', // Platform background
        charcoal: '#26332C', // Text primary
        charcoalMuted: '#58675F',
        softblue: {
          50: '#F4F8FA',
          100: '#E7F2F7',
          200: '#DCEAF2', // Accent soft blue
          300: '#B6D7E7',
          400: '#85BBD4',
          500: '#539EBF',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        serif: ['Playfair Display', 'Georgia', 'serif'],
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(38, 51, 44, 0.05), 0 4px 6px -2px rgba(38, 51, 44, 0.02)',
        'soft-lg': '0 10px 25px -5px rgba(38, 51, 44, 0.07), 0 8px 10px -6px rgba(38, 51, 44, 0.03)',
        'soft-xl': '0 20px 35px -8px rgba(38, 51, 44, 0.09), 0 10px 15px -5px rgba(38, 51, 44, 0.03)',
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      }
    },
  },
  plugins: [],
}

