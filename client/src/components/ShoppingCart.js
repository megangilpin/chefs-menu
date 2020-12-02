import * as React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
    Avatar,
    Badge,
    Button,
    Box,
    Divider,
    Grid,
    IconButton,
    List,
    ListItem,
    ListItemAvatar,
    ListItemSecondaryAction,
    ListItemText,
    Popover,
    Typography,
} from "@material-ui/core";

import DeleteIcon from "@material-ui/icons/Delete";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { CartContext } from "../contexts/cart/CartContextProvider";
import { dollarFormatter, calcServiceFee, calcTotalWithFee } from "../lib/utils";

const useStyles = makeStyles((theme) => ({
    root: {
        marginRight: theme.spacing(0.5),
    },
    container: {
        padding: theme.spacing(2),
    },
    empty: {
        fontSize: ".8rem",
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(1),
    },
    quantityBttnPlus: {
        minWidth: "43px",
        padding: 0,
        margin: 0,
        marginRight: theme.spacing(1),
    },
    quantityBttnMinus: {
        minWidth: "43px",
        padding: 0,
        margin: 0,
        marginLeft: theme.spacing(1),
    },
}));

function ShoppingCart(props) {
    const classes = useStyles();

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
        const id = e.currentTarget.value;
        updateCartItem(id, name);
    };

    const deleteMeal = (e) => {
        e.preventDefault();
        const id = e.currentTarget.value;
        deleteCartItem(id);
    };

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const cartOpen = Boolean(anchorEl);
    const id = cartOpen ? "simple-popover" : undefined;

    return (
        <div>
            <IconButton
                aria-describedby={id}
                onClick={handleClick}
                className={classes.root}
                aria-label="shopping cart"
            >
                <Badge badgeContent={totalItems} color="primary">
                    <ShoppingCartIcon fontSize="inherit" />
                </Badge>
            </IconButton>
            <Popover
                id={id}
                open={cartOpen}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
            >
                <Grid item xs={12} className={classes.container}>
                    <Box mt={1}>
                        <Typography color="primary" variant="h5">
                            Your Cart
                        </Typography>
                    </Box>
                    <Divider />
                    {chefName ? (
                        <Box p={2}>
                            <Typography variant="subtitle2">
                                Selected Chef:
                            </Typography>
                            <Typography variant="caption">{chefName}</Typography>
                        </Box>
                    ) : null}
                    <Divider />
                    <div>
                        <List>
                            {cart.length > 0 ? (
                                cart.map((meal, index) => {
                                    return (
                                        <ListItem
                                            key={index}
                                            alignItems="flex-start"
                                        >
                                            <ListItemAvatar>
                                                <Avatar src={meal.mealPic} />
                                            </ListItemAvatar>
                                            <ListItemText
                                                primary={`${
                                                    meal.title
                                                } - ${dollarFormatter.format(
                                                    meal.price / 100
                                                )}`}
                                                secondary={
                                                    meal.quanity ? null : (
                                                        <React.Fragment>
                                                            <Button
                                                                className={
                                                                    classes.quantityBttnPlus
                                                                }
                                                                value={meal.id}
                                                                name="add"
                                                                color="primary"
                                                                onClick={
                                                                    updateQuantity
                                                                }
                                                            >
                                                                +
                                                            </Button>

                                                            {meal.quantity}

                                                            <Button
                                                                className={
                                                                    classes.quantityBttnMinus
                                                                }
                                                                value={meal.id}
                                                                name="minus"
                                                                color="primary"
                                                                onClick={
                                                                    updateQuantity
                                                                }
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
                                })
                            ) : (
                                <Typography className={classes.empty}>
                                    Your cart is empty
                                </Typography>
                            )}
                        </List>
                    </div>
                    <Divider />
                    <Typography variant="subtitle2">
                        SubTotal: {dollarFormatter.format(totalPrice / 100)}
                    </Typography>
                    <Typography variant="subtitle2">
                        10% Service Fee:{" "}
                        {dollarFormatter.format(calcServiceFee(totalPrice))}
                    </Typography>
                    <Divider />
                    <Box pt={2}>
                        <Typography variant="h6">
                            Total:{" "}
                            {dollarFormatter.format(calcTotalWithFee(totalPrice))}
                        </Typography>
                    </Box>
                </Grid>
            </Popover>
        </div>
    );
}

export default ShoppingCart;
