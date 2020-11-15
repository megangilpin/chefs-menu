import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Typography,Toolbar } from "@material-ui/core";
import MenuButton from "./MenuButton";
import { UserContext } from "../components/UserContext";
import logo from "../images/logo.svg";

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        background: "#FFFFFF",
    },
    appBarTitle: {
        flexGrow: 1,
        marginLeft: theme.spacing(2),
    },
    logo: {},
}));

function Page(props) {
    const classes = useStyles();
    const user = useContext(UserContext);
    return (
        <div className={classes.root}>
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                    <Typography className={classes.appBarTitle}>
                        <img
                            className={classes.logo}
                            src={logo}
                            alt="Chef's Menu Logo"
                        />
                    </Typography>
                    <MenuButton />
                </Toolbar>
            </AppBar>
            {props.children}
        </div>
    );
}

export default Page;
