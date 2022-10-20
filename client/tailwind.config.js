// (c) Tecnologico de Monterrey 2022, rights reserved.

/** @type {import("tailwindcss").Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./source/screens/**/*.{js,ts,jsx,tsx}",
    "./source/pages/**/*.{js,ts,jsx,tsx}",
    "./source/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        main: {
          // Light blue
          50: "#6694c1",
          // Reg blue
          100: "#396fb1",
          // Dark blue
          200: "#252d53",
          // Blue Button
          500: "#2d64a3",
        },
      },
    },
  },
  plugins: [],
};
