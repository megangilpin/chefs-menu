import { createMuiTheme } from "@material-ui/core";

export const theme = createMuiTheme({
  typography: {
    fontFamily: 'Montserrat',
    fontSize: 12,
    h1: {
      
    }
  },
  palette: {
    primary: { main: "#FF743D" },
    secondary: { main: "#FF510C" },
  },

  MuiButton: {
    text: {
      color: 'white',
      background: "FF743D"
      
    
    }

  }
});


// Font - Montserrat
// colors:
// #FF743D - orange
// #FF510C - brighter orange
// #F8F8FF - background grey