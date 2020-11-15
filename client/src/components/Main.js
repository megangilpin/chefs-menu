import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Toolbar from "@material-ui/core/Toolbar";

const useStyles = makeStyles((theme) => ({
    root: {
        background: theme.background.default
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
}));

function Main(props) {
    const classes = useStyles();
    return (
        <div className={classes.content}>
            <Toolbar />
            <Typography>Main</Typography>
            {props.children}
        </div>
    );
}

export default Main;
