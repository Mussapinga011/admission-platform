/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Duolingo-inspired palette
        primary: {
          DEFAULT: '#58CC02', // Green
          hover: '#46A302',
          shade: '#58a700', // Darker green for 3D effect
        },
        secondary: {
          DEFAULT: '#1CB0F6', // Blue
          hover: '#118CDB',
          shade: '#1899d6',
        },
        accent: {
          DEFAULT: '#FFC800', // Yellow
          hover: '#E5B400',
          shade: '#e5b400',
        },
        danger: {
          DEFAULT: '#FF4B4B', // Red
          hover: '#D33131',
          shade: '#d33131',
        },
        gray: {
          100: '#F7F7F7',
          200: '#E5E5E5',
          300: '#D4D4D4',
          400: '#A3A3A3',
          500: '#737373',
          700: '#4B4B4B',
          900: '#3C3C3C',
        }
      },
      fontFamily: {
        sans: ['"Nunito"', 'sans-serif'], // Rounded font often used in gamified apps
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
      }
    },
  },
  plugins: [],
}
