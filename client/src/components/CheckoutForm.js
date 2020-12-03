import React from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { Button, Typography, Grid, Divider } from "@material-ui/core";
import CardSection from "./CardSection/CardSection";
import { UserContext } from "../contexts/user/UserContextProvider";
import { CartContext } from "../contexts/cart/CartContextProvider";
export default function CheckoutForm() {
    const stripe = useStripe();
    const elements = useElements();
    const user = React.useContext(UserContext);
    const { cart } = React.useContext(CartContext);

    const handleSubmit = async (event) => {
        // We don't want to let default form submission happen here,
        // which would refresh the page.
        event.preventDefault();

        if (!stripe || !elements) {
            // Stripe.js has not yet loaded.
            return;
        }

        const secret_result = await user.getStripeSecret({ meals: cart });
        if (secret_result) {
            console.log(secret_result);
        }

        const result = await stripe.confirmCardPayment("{CLIENT_SECRET}", {
            payment_method: {
                card: elements.getElement(CardElement),
                billing_details: {
                    name: "Jenny Rosen",
                },
            },
        });

        if (result.error) {
            // Show error to your customer (e.g., insufficient funds)
            console.log(result.error.message);
        } else {
            // The payment has been processed!
            if (result.paymentIntent.status === "succeeded") {
                // Show a success message to your customer
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
