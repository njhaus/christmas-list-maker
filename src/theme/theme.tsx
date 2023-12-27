import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#034f1b",
      dark: "#00320b",
    },
    secondary: {
      main: "#f6ecc1",
      dark: "#d6cca1",
      light: "#ffffe1",
    },
    info: {
      main: "#d20002",
      dark: "#930001",
      light: "#ffe0e0",
    },
  },
  typography: {
    h1: {
      fontFamily: ["Kaushan Script, Apple Chancery, cursive"].join(","),
    },
    h2: {
      fontFamily: ["Kaushan Script, Apple Chancery, cursive"].join(","),
    },
    h3: {
      fontFamily: ["Kaushan Script, Apple Chancery, cursive"].join(","),
    },
    h4: {
      fontFamily: ["Kaushan Script, Apple Chancery, cursive"].join(","),
    },
    h5: {
      fontFamily: ["Kaushan Script, Apple Chancery, cursive"].join(","),
    },
    h6: {
      fontFamily: ["Kaushan Script, Apple Chancery, cursive"].join(","),
    },
    subtitle1: {},
    body1: {
      fontFamily: ["Montserrat, Arial, sans-serif"].join(","),
      fontSize: "1.2rem",
      fontWeight: "400",
    },
    body2: {
      fontFamily: ["Montserrat, Arial, sans-serif"].join(","),
      fontSize: "1.5rem",
      fontWeight: "600",
    },
    button: {
      fontFamily: ["Montserrat, Arial, sans-serif"].join(","),
    },
    caption: {
      fontFamily: ["Montserrat, Arial, sans-serif"].join(","),
      fontSize: "0.6rem",
      fontWeight: "400",
    },
  },
});

export default theme;