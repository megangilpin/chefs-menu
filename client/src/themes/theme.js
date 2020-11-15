import { createMuiTheme } from "@material-ui/core";

export const theme = createMuiTheme({
    typography: {
        fontFamily: "Montserrat",
        fontSize: 12,
    },
    palette: {
        primary: { main: "#FF743D", contrastText: "#fff" },
        secondary: { main: "#FF510C" },
    },
    background: {
        default: "#F8F8FF",
    },
    overrides: {
        MuiButton: {
            root: {
                borderRadius: "0px",
                color: "white",
            },
        },
    },
});

// Font - Montserrat
// colors:
// #FF743D - orange
// #FF510C - brighter orange
// #F8F8FF - background grey
