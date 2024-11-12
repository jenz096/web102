// tailwind.config.js
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        natureGreen: '#4CAF50', // A calm green
        earthBrown: '#8B5E3C',  // Brown for text or accents
        skyBlue: '#87CEEB',     // Light blue for accenting or backgrounds
        cream: '#F5F5DC',       // Background color for a soft, earthy tone
        forestGreen: '#2E8B57', // Darker green for headers or buttons
      },
    },
  },
  plugins: [],
}
