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
        sans: ["Figtree", ...defaultTheme.fontFamily.sans],
      },
      // Custom colors
      colors: {
        green: {
          100: "#F2FDF7",
          200: "#FOFCF5",
          300: "#EDFCF4",
          400: "#EAFBF2",
          500: "#81E7B2",
          600: "#62E19E",
          700: "#57DF98",
          800: "#38b876",
          900: "#043C3C",
        },
      },
    },
  },

  plugins: [forms],
};
