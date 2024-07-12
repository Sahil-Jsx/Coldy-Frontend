/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background_light: "#EFF5F5",
        background: "#fa8569",
        orange: "#EB6440",
        dull: "#989898",
        offwhite: "#fefefe",
      },
    },
  },
  plugins: [],
};
