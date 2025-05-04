/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'airbnb-red': '#FF5A5F',
        'airbnb-pink': '#FF385C',
        'airbnb-dark-gray': '#222222',
        'airbnb-light-gray': '#717171',
        'airbnb-black': '#000000',
        'airbnb-white': '#FFFFFF',
        'airbnb-bg': '#F7F7F7',
        'airbnb-border': '#DDDDDD',
        'airbnb-teal': '#00A699',
        'airbnb-purple': '#914669',
      },
      fontFamily: {
        sans: ['Circular', 'Arial', 'sans-serif'],
      },
      boxShadow: {
        'airbnb': '0px 6px 16px rgba(0, 0, 0, 0.12)',
        'airbnb-dark': '0px 8px 28px rgba(0, 0, 0, 0.28)',
        'airbnb-light': '0px 2px 8px rgba(0, 0, 0, 0.08)',
      },
      borderRadius: {
        'airbnb': '12px',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}