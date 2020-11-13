import { createMuiTheme } from "@material-ui/core";

export const theme = createMuiTheme({
  typography: {
    fontFamily: ['"Montserrat"', 'Open Sans'].join(','),
    fontSize: 12,
    // htmlFontSize: 10,
    h1: {
      // could customize the h1 variant as well
    }
  },
  palette: {
    primary: { 
      main: "#FF743D"
    },
    secondary: {
      main: "#FF510C"
    },
    background: {
      default: "#F8F8FF"
    }
  },
});
