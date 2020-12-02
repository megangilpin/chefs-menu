import * as React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Toolbar, Grid } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    content: {
        flexGrow: 1,
        padding: theme.spacing(5),
    },
}));

function Main(props) {
    const classes = useStyles();

    return (
        <div className={classes.content}>
            <Toolbar />
            <Grid container direction="row" justify="center" alignContent="center">
                {props.children}
            </Grid>
        </div>
    );
}

export default Main;
