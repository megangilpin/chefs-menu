import React, {useContext} from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Toolbar from "@material-ui/core/Toolbar";
import { Typography } from "@material-ui/core";
import { UserContext } from "../components/UserContext";

const drawerWidth = 300;

const useStyles = makeStyles((theme) => ({
    drawer: {
        width: drawerWidth,
        // flexShrink: 0,
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
    const loadedUser = useContext(UserContext);
    
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
                <Typography>Side Bar</Typography>
            </div>
        </Drawer>
    );
}

export default SideBar;
