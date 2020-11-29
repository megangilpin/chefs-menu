import * as React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Typography, Toolbar } from "@material-ui/core";
import NavMenuButton from "./NavMenuButton";
import ShoppingCart from "./ShoppingCart";
import logo from "../images/logo.svg";
import { CartContextProvider } from "../contexts/cart/CartContextProvider";

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        background: "#FFFFFF",
        boxShadow: "0px 0px 10px 5px rgba(7,7,7,0.07)",
    },
    appBarTitle: {
        flexGrow: 1,
        marginLeft: theme.spacing(2),
    },
}));

function Page(props) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <CartContextProvider>
                <AppBar position="fixed" className={classes.appBar}>
                    <Toolbar>
                        <Typography className={classes.appBarTitle}>
                            <img src={logo} alt="Chef's Menu Logo" />
                        </Typography>
                        <NavMenuButton />
                        <ShoppingCart />
                    </Toolbar>
                </AppBar>
                {props.children}
            </CartContextProvider>
        </div>
    );
}

export default Page;
