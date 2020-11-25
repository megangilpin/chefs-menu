import * as React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { IconButton, Typography, Drawer, Divider, Button } from "@material-ui/core";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";

import Grid from "@material-ui/core/Grid";

import DeleteIcon from "@material-ui/icons/Delete";
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
    console.log(user.profile.firstName);
    const toggleCart = () => {
        let open = !cartOpen;
        setCartOpen(open);
    };

    const {
        chefName,
        cart,
        totalPrice,
        totalItems,
        updateCartItem,
        deleteCartItem,
    } = React.useContext(CartContext);

    const updateQuantity = (e) => {
        e.preventDefault();
        const { name } = e.currentTarget;
        const id = parseFloat(e.currentTarget.value);
        updateCartItem(id, name);
    };

    const deleteMeal = (e) => {
        e.preventDefault();
        const id = parseFloat(e.currentTarget.value);
        deleteCartItem(id);
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
                <Grid item xs={12}>
                    <Typography variant="h6" className={classes.title}>
                        {!user ? "Your " : `${user.profile.firstName}'s `}Cart
                    </Typography>
                    <Typography variant="h6" className={classes.title}>
                        {chefName}
                    </Typography>
                    <Divider />
                    <div className={classes.demo}>
                        <List>
                            {cart.map((meal, index) => {
                                return (
                                    <ListItem key={index}>
                                        <ListItemAvatar>
                                            <Avatar src={meal.mealPic} />
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary={meal.title}
                                            secondary={
                                                meal.quanity ? null : (
                                                    <React.Fragment>
                                                        <Button
                                                            value={meal.id}
                                                            name="add"
                                                            color="primary"
                                                            onClick={updateQuantity}
                                                        >
                                                            +
                                                        </Button>
                                                        {meal.quantity}
                                                        <Button
                                                            value={meal.id}
                                                            name="minus"
                                                            color="primary"
                                                            onClick={updateQuantity}
                                                        >
                                                            -
                                                        </Button>
                                                    </React.Fragment>
                                                )
                                            }
                                        />
                                        <ListItemSecondaryAction>
                                            <IconButton
                                                value={meal.id}
                                                edge="end"
                                                aria-label="delete"
                                                onClick={deleteMeal}
                                            >
                                                <DeleteIcon />
                                            </IconButton>
                                        </ListItemSecondaryAction>
                                    </ListItem>
                                );
                            })}
                        </List>
                    </div>
                    <Divider />
                    <Typography>Total: {totalPrice}</Typography>
                    <Typography>Total Items: {totalItems}</Typography>
                </Grid>
            </Drawer>
        </div>
    );
}

export default ShoppingCart;
