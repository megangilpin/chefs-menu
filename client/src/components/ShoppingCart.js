import * as React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { IconButton, Typography, Drawer, Toolbar, Divider } from "@material-ui/core";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import Badge from "@material-ui/core/Badge";
import { UserContext } from "../contexts/user/UserContextProvider";
import { CartContext } from "../contexts/cart/CartContextProvider";

const drawerWidth = 250;

const useStyles = makeStyles((theme) => ({
    root: {
        marginRight: theme.spacing(0.5),
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerContainer: {
        overflow: "auto",
        padding: theme.spacing(3),
    },
}));

function ShoppingCart(props) {
    const classes = useStyles();
    const [cartOpen, setCartOpen] = React.useState(false);
    const user = React.useContext(UserContext);
    const cart = React.useContext(CartContext);

    const toggleCart = () => {
        let open = !cartOpen;
        setCartOpen(open);
    };

    return (
        <div>
            <IconButton
                onClick={toggleCart}
                className={classes.root}
                aria-label="shopping cart"
            >
                <Badge badgeContent={0} color="primary">
                    <ShoppingCartIcon fontSize="inherit" />
                </Badge>
            </IconButton>
            <Drawer
                onClose={toggleCart}
                variant="temporary"
                anchor="right"
                open={cartOpen}
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <div className={classes.drawerContainer}>
                    <Typography variant="h4">
                        {user.firstName ? user.firstName : "Your"} Cart
                    </Typography>
                    <Divider />
                </div>
            </Drawer>
        </div>
    );
}

export default ShoppingCart;
