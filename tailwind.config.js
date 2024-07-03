/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background_light: "#EFF5F5",
        background: "#FFAC96",
        orange: "#EB6440",
        dull: "#989898",
      },
    },
  },
  plugins: [],
};
