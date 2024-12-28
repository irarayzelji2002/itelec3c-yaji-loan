import forms from "@tailwindcss/forms";
import defaultTheme from "tailwindcss/defaultTheme";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php",
    "./storage/framework/views/*.php",
    "./resources/views/**/*.blade.php",
    "./resources/js/**/*.jsx",
  ],

  theme: {
    extend: {
      fontFamily: {
        sans: ["DM Sans", ...defaultTheme.fontFamily.sans],
      },
      // Custom colors
      colors: {
        green: {
          100: "#F2FDF7", // Mint cream
          200: "#FOFCF5", // Mint Fost (lighter)
          300: "#EDFCF4", // Mint Fost (darker)
          400: "#EAFBF2", // Honeydew
          500: "#81E7B2", // Aquamarine
          600: "#62E19E", // Emerald (lighter 1)
          700: "#57DF98", // Emerald (lighter 2)
          800: "#38b876", // Emerald (darker)
          900: "#043C3C", // Midnight green
        },
      },
    },
    // Z-index
    zIndex: {
      0: 0,
      1: 1,
      2: 2,
      3: 3,
      4: 4,
      5: 5,
      6: 6,
      7: 7,
      8: 8,
      9: 9,
      10: 10,
      15: 15,
      20: 20,
      25: 25,
      30: 30,
      35: 35,
      40: 40,
      45: 45,
      50: 50,
      55: 55,
      60: 60,
      65: 65,
      70: 70,
      75: 75,
      80: 80,
      85: 85,
      90: 90,
      95: 95,
      100: 100,
      200: 200,
      300: 300,
      400: 400,
      500: 500,
      600: 600,
      700: 700,
      800: 800,
      900: 900,
      1000: 1000,
      auto: "auto",
    },
  },

  plugins: [forms],
};
