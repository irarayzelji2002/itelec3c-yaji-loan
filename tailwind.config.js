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
  },

  plugins: [forms],
};
