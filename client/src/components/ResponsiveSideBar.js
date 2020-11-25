import * as React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Drawer, Toolbar } from "@material-ui/core";
import Hidden from "@material-ui/core/Hidden";
import SearchIcon from "@material-ui/icons/Search";
import Fab from "@material-ui/core/Fab";

const drawerWidth = 250;

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
        padding: theme.spacing(3),
    },
    menuButton: {
        margin: theme.spacing(3),
        // position: 'absolute',
    },
}));

function ResponsiveSideBar(props) {
    const classes = useStyles();
    const [mobileOpen, setMobileOpen] = React.useState(false);

    function handleDrawerToggle() {
        setMobileOpen(!mobileOpen);
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
                    <SearchIcon />
                </Fab>
                <Drawer
                    variant="temporary"
                    // anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                >
                    <Toolbar />
                    <div className={classes.drawerContainer}>{props.children}</div>
                </Drawer>
            </Hidden>
            <Hidden xsDown implementation="css">
                <Drawer
                    className={classes.drawer}
                    variant="permanent"
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                >
                    <Toolbar />
                    <div className={classes.drawerContainer}>{props.children}</div>
                </Drawer>
            </Hidden>
        </div>
    );
}

export default ResponsiveSideBar;
