import { createTheme } from '@mui/material/styles';
import { lato } from "@/app/fonts";


const defaultTheme = createTheme({
  palette: {
    background: {
      default: "#F5F6FA",
      secondary: "#FFFFFF"
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
})

export default defaultTheme;
