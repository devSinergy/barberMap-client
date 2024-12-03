const plugin = require('tailwindcss/plugin');

module.exports = {
  content: [
    './src/**/*.{html,svelte,js,ts}', // Paths for scanning Tailwind usage
  ],
  theme: {
    extend: {
      colors: {
        // Primary colors
        blue: '#0000ff',        // Bright blue
        red: '#ff0000',         // Bright red
        white: '#f0f0f0',       // Pure white

        
      },
    },
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      addUtilities({
        '.border-gradient': {
          'border-width': '4px',
          'border-style': 'solid',
          'border-image': 'linear-gradient(45deg, #bbb, #fff, #aaa) 1',
        },
      });
    }),
  ],
};



