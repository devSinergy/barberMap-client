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

        // New custom colors
        coffee: '#5f4636',      // Dark coffee brown
        beige: '#c0a799',       // Light beige
        tan: '#b28562',         // Tan/light brown
        brick: '#8c4030',       // Brick red
        sand: '#fccc7c',        // Sand yellow
        amber: '#e48815',       // Bright amber
      },
    },
  },
  plugins: [],
};



