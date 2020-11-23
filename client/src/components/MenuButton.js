import * as React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Menu, MenuItem, IconButton } from "@material-ui/core";
import PersonOutlineIcon from "@material-ui/icons/PersonOutline";

const useStyles = makeStyles((theme) => ({
    root: {
        marginLeft: theme.spacing(0.5),
    },
    menuIcon: {
        marginRight: theme.spacing(2),
    },
}));

function MenuButton(props) {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <IconButton
                className={classes.root}
                edge="start"
                aria-label="menu"
                aria-haspopup="true"
                onClick={handleClick}
            >
                <svg
                    id="menu-icon"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 28 10"
                >
                    <rect id="Rectangle" width="24" height="2" />
                    <rect
                        id="Rectangle-2"
                        data-name="Rectangle"
                        width="24"
                        height="2"
                        transform="translate(0 8)"
                    />
                </svg>
            </IconButton>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={handleClose}>
                    <PersonOutlineIcon
                        className={classes.menuIcon}
                        fontSize="small"
                    />
                    Profile
                </MenuItem>
                <MenuItem onClick={handleClose}>Logout</MenuItem>
            </Menu>
        </div>
    );
}

export default MenuButton;
