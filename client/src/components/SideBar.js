import * as React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Drawer, Toolbar } from "@material-ui/core";


const drawerWidth = 300;

const useStyles = makeStyles((theme) => ({
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerContainer: {
        overflow: "auto",
        padding: theme.spacing(3),
    },
}));

function SideBar(props) {
    const classes = useStyles();

    return (
        <Drawer
            className={classes.drawer}
            variant="permanent"
            classes={{
                paper: classes.drawerPaper,
            }}
        >
            <Toolbar />
            <div className={classes.drawerContainer}>
                {props.children}
            </div>
        </Drawer>
    );
}

export default SideBar;
