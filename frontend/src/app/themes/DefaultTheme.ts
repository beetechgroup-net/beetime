import { createTheme } from '@mui/material/styles';
import { lato } from "@/app/fonts";

const defaultTheme = createTheme({
  palette: {
    background: {
      default: "#F5F6FA",  // Background color for the app
      paper: "#FFFFFF",    // Surface color, equivalent to what you were trying to achieve with secondary
    },
    primary: {
      main: "#FF8E29",
    },
    secondary: {
      main: "#27D095",
    },
  },
  typography: {
    fontFamily: lato.style.fontFamily,
  },
});

export default defaultTheme;
