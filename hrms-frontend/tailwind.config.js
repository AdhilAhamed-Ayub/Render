/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html", // If using a basic HTML structure
    "./src/**/*.{js,ts,jsx,tsx}", // Scans all React files in src folder
  ],
  theme: {
    extend: {},
  },
  build: {
    cssMinify: false,
    chunkSizeWarningLimit: 1000, // Add this to skip CSS minify and avoid such warnings
  },
  plugins: [],
};
