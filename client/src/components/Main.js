import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography,Toolbar } from "@material-ui/core";


const useStyles = makeStyles((theme) => ({
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
