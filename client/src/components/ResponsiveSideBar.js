import * as React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Drawer, Toolbar } from "@material-ui/core";
import Hidden from "@material-ui/core/Hidden";
import SearchIcon from "@material-ui/icons/Search";
import Fab from "@material-ui/core/Fab";

const drawerWidth = 350;

const useStyles = makeStyles((theme) => ({
    drawer: {
        [theme.breakpoints.up("sm")]: {
            width: drawerWidth,
            flexShrink: 0,
        },
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerContainer: {
        overflow: "auto",
        height: "100vh",
    },
    menuButton: {
        margin: theme.spacing(3),
    },
}));

function ResponsiveSideBar(props) {
    const classes = useStyles();
    const [mobileOpen, setMobileOpen] = React.useState(false);

    function handleDrawerToggle() {
        setMobileOpen((previous) => !previous);
    }

    return (
        <div className={classes.root}>
            <Hidden smUp implementation="css">
                <Toolbar />
                <Fab
                    color="primary"
                    aria-label="Open drawer"
                    edge="start"
                    onClick={handleDrawerToggle}
                    className={classes.menuButton}
                    size="medium"
                >
                    {!props.icon ? <SearchIcon /> : props.icon}
                </Fab>
                <Drawer
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                >
                    <div className={classes.drawerContainer}>{props.children}</div>
                </Drawer>
            </Hidden>
            <Hidden xsDown implementation="css">
                <Toolbar />
                <Drawer
                    className={classes.drawer}
                    variant="permanent"
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                >
                    <div className={classes.drawerContainer}>{props.children}</div>
                </Drawer>
            </Hidden>
        </div>
    );
}

export default ResponsiveSideBar;
