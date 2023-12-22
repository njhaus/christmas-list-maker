import { createTheme } from "@mui/material/styles";
import { green, purple } from "@mui/material/colors";

const theme = createTheme({
  palette: {
    primary: {
      main: "#034f1b",
      dark: "#00320b",
    },
    secondary: {
      main: "#f6ecc1",
      dark: "#ceac5c",
      light: "#ffffe1",
    },
    info: {
      main: "#ad2624",
      dark: "#6e020d",
      light: "#F1D2D0",
    },
  },
});

export default theme;