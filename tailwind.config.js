/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    extend: {
      container: {
        center: true,
      },
      colors: {
        background: 'var(--background)',
        primary: 'var(--primary)',
        secondary: 'var(--secondary)',
        paleGrey: 'var(--paleGrey)',
        grey: 'var(--grey)',
        text : 'var(--text)',
        darkBackground: 'var(--darkBackground)',
        darkPrimary: 'var(--darkPrimary)',
      },
      animation: {
        err: 'err 1s infinite alternate'
      },
      keyframes: {
        err: {
          '100%': { opacity: '20%' }
        }
      }
    },
  },
  plugins: [],
}
