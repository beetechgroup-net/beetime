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
    // h6: {
    //   // fontSize: 14,
    //   color: "#202224",
    //   fontStyle: "normal",
    //   fontWeight: 600,
    //   lineHeight: "normal",
    //   letterSpacing: "0.3px",
    // },
  },
})

export default defaultTheme;
