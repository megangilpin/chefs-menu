import * as React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
    Avatar,
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
    Typography,
} from "@material-ui/core";

import DeleteIcon from "@material-ui/icons/Delete";

import { CartContext } from "../contexts/cart/CartContextProvider";
import { dollarFormatter, calcServiceFee, calcTotalWithFee } from "../lib/utils";
// import { useHistory } from "react-router-dom";

import CheckoutForm from "../components/CheckoutForm";

const useStyles = makeStyles((theme) => ({
    container: {
        marginTop: "10vh",
        width: "100%",
    },
    orderSummary: {
        background: "white",
        padding: "1rem",
    },
    checkoutForm: {
        marginTop: "1rem",
        padding: "1rem 3rem 1rem 3rem !important",
        background: "white",
        height: "50vh",
        width: "100%",
    },
    empty: {
        fontSize: ".8rem",
    },
    quantityBttnPlus: {
        minWidth: "43px",
        padding: 0,
        margin: 0,
    },
    quantityBttnMinus: {
        minWidth: "43px",
        padding: 0,
        margin: 0,
    },
}));

function Checkout(props) {
    const classes = useStyles();
    // const history = useHistory();

    const {
        // chefName,
        cart,
        totalPrice,
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
        <Grid container className={classes.container} spacing={4}>
            <Box
                component={Grid}
                boxShadow={3}
                item
                xs={6}
                className={classes.checkoutForm}
            >
                <CheckoutForm />
            </Box>

            <Grid item xs={6}>
                <Box
                    component={Grid}
                    boxShadow={3}
                    container
                    className={classes.orderSummary}
                >
                    <Grid item xs={12}>
                        <Typography variant="h6">Your Order</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        {" "}
                        <List>
                            {cart.length > 0 ? (
                                cart.map((meal, index) => {
                                    return (
                                        <ListItem
                                            key={index}
                                            alignItems="flex-start"
                                        >
                                            <ListItemAvatar>
                                                <Avatar
                                                    src={meal.picURL}
                                                    variant="square"
                                                />
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
                    </Grid>

                    <Grid item xs={12}>
                        <Typography variant="subtitle2">
                            Sub-total: {dollarFormatter.format(totalPrice / 100)}
                        </Typography>

                        <Typography variant="subtitle2">
                            10% Service Fee:{" "}
                            {dollarFormatter.format(calcServiceFee(totalPrice))}
                        </Typography>
                        <Divider />
                    </Grid>

                    <Grid item xs={6}>
                        <Typography variant="h6">Total: </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography color="primary" variant="h6">
                            {dollarFormatter.format(calcTotalWithFee(totalPrice))}
                        </Typography>
                    </Grid>
                </Box>
            </Grid>
        </Grid>
    );
}

export default Checkout;
