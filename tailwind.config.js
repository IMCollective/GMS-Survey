const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      colors: {
        // Palette sampled from the GMS logo: globe blue, leaf green, gold
        brand: {
          ocean: '#2E7191',
          oceandark: '#245C78',
          leaf: '#4C8451',
          leafdark: '#3E6C42',
          gold: '#ECAD2D',
          ink: '#28323C',
          mist: '#EEF4F7',
        },
      },
      fontFamily: {
        sans: ['"Nunito Sans"', ...defaultTheme.fontFamily.sans],
        display: ['Outfit', ...defaultTheme.fontFamily.sans],
      },
      keyframes: {
        'fade-slide': {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      animation: {
        'fade-slide': 'fade-slide 0.3s ease-out both',
        'fade-in': 'fade-in 0.5s ease-out both',
      },
    },
  },
  plugins: [],
};
