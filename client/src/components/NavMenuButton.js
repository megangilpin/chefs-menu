import * as React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Menu, MenuItem, IconButton } from "@material-ui/core";
import { Link } from "react-router-dom";
import { UserContext } from "../contexts/user/UserContextProvider";

const useStyles = makeStyles((theme) => ({
    link: {
        textDecoration: "none",
        color: "#000000DE",
    },
}));

function NavMenuButton(props) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const classes = useStyles();

    const user = React.useContext(UserContext);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <IconButton
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
                <Link to="/profile" className={classes.link}>
                    <MenuItem>Profile</MenuItem>
                </Link>
                <Link to="/chefs" className={classes.link}>
                    <MenuItem>Find A Chef</MenuItem>
                </Link>
                <Link to="/meals" className={classes.link}>
                    <MenuItem>Find A Meal</MenuItem>
                </Link>
                <MenuItem onClick={() => user.logoutUser()}>Logout</MenuItem>
            </Menu>
        </div>
    );
}

export default NavMenuButton;
