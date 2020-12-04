import React from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { Button, Typography, Grid, Divider } from "@material-ui/core";
import CardSection from "./CardSection/CardSection";
import { UserContext } from "../contexts/user/UserContextProvider";
import { CartContext } from "../contexts/cart/CartContextProvider";
import { useSnackbar } from "notistack";
import { useHistory } from "react-router-dom";

export default function CheckoutForm() {
    const stripe = useStripe();
    const elements = useElements();
    const history = useHistory();
    const user = React.useContext(UserContext);
    const { cart } = React.useContext(CartContext);
    const { enqueueSnackbar } = useSnackbar();

    const showSnackBar = (message, variant) => {
        enqueueSnackbar(message, { variant: variant, autoHideDuration: "6000" });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            // Stripe.js has not yet loaded.
            return;
        }

        // Create a payment intent with the current cart in context (it will be validated on the server)
        const secret_result = await user.getStripeSecret({ meals: cart });
        if (!secret_result.clientSecret) {
            showSnackBar(
                "An error occured while creating the payment intent",
                "error"
            );
            return;
        }
        // Confirm the payment
        const result = await stripe.confirmCardPayment(secret_result.clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement),
                billing_details: {
                    name: user.profile.firstName + " " + user.profile.lastName,
                },
            },
        });

        if (result.error) {
            // Show error to your customer (e.g., insufficient funds)
            showSnackBar(result.error.message, "error");
        } else {
            // The payment has been processed!
            if (result.paymentIntent.status === "succeeded") {
                showSnackBar("Payment successfully processed!", "success");

                // In the future push to direct messages to the chef of this purchased meal
                // perhaps with an auto message saying what meal was purchased
                // scheduling can be done through the chat for now

                history.push("/meals");

                // TODO:
                // There's a risk of the customer closing the window before callback
                // execution. Set up a webhook or plugin to listen for the
                // payment_intent.succeeded event that handles any business critical
                // post-payment actions.
            }
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <Grid container spacing={4}>
                <Grid item xs={12}>
                    <Typography variant="h4">Checkout</Typography>
                    <Divider />
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="h6">Enter your card details.</Typography>
                </Grid>
                <Grid item xs={12}>
                    <CardSection />
                </Grid>
                <Grid item xs={12}>
                    <Button
                        type="submit"
                        color="primary"
                        variant="contained"
                        disabled={!stripe}
                    >
                        <Typography variant="button">Confirm Order</Typography>
                    </Button>
                </Grid>
            </Grid>
        </form>
    );
}
