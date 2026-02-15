import { colors } from "@mui/material";

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ["Montserrat", "sans-serif"],
        robotoCondensed: ['"Roboto Condensed"', "sans-serif"],
        openSans: ['"Open Sans"', "sans-serif"],
        lato: ["Lato", "sans-serif"],
      },
      colors: {
        primaryText: "rgb(9, 25, 58)",
        brandBlue: "rgb(65, 88, 138)",
        accentBlue: "rgb(50, 110, 240)",
      },
    },
  },
  plugins: [],
};
