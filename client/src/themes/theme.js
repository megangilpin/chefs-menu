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
    overrides: {
        MuiButton: {
            root: {
                borderRadius: "0px",
                color: "white",
                textAlign: "center",
                margin: "0vh 1vw 1vh 0vw",
            },
        },
        MuiChip: {
            root: {
                fontWeight: "bold",
                borderRadius: "0px",
                margin: "0vh 1vw 1vh 0vw",
                margin: "0vh 1vw 1vh 0vw",
            },
        },

        MuiIconButton: {
            root: {
                color: "white",
                background: "#FF743D",
            },
        },
    },
});

// Font - Montserrat
// colors:
// #FF743D - orange
// #FF510C - brighter orange
// #F8F8FF - background grey
