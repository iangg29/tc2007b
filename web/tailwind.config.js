/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", 
            "./src/*.{js,jsx,ts,tsx}",
            'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        main: {
          //Light blue
          50: "#6694c1",
          //Reg blue
          100: "#396fb1",
          //Dark blue
          200: "#252d53",
          //Blue Button
          500: "#2d64a3",
          //Dark Aqua Button
          600: "#244b5c",
          //Dark purple Button
          700: "#50245c",
        },
        button: {
          //Dark Aqua Button
          100: "#244B5C",
          //Dark purple Button
          200: "#50245C",
          //Dark Blue Button
          300: "#252d53",
        },
      },
    },
  },
  plugins: [
    require('flowbite/plugin'),
  ],
};
