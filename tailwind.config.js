/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        studio: ["Studio Feixen Sans", "sans-serif"],
      },
    },
  },
  plugins: [],
};
