import * as React from "react";
import { Menu, MenuItem, IconButton } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { UserContext } from "../contexts/user/UserContextProvider";

function MenuButton(props) {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const user = React.useContext(UserContext);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const history = useHistory();

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
                <MenuItem onClick={() => history.push("profile")}>Profile</MenuItem>
                <MenuItem onClick={() => history.push("chefs")}>Chefs</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
                <MenuItem onClick={()=> user.logoutUser()}>Logout</MenuItem>
            </Menu>
        </div>
    );
}

export default MenuButton;
