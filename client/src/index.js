import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { UserContextProvider } from "./contexts/user/UserContextProvider";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
    "pk_test_51HrOLODpMZzy7YFf2ImPzBZIAj7wyO69oVlA2hyu7e7BuLctRAzEVxTAnLwkRmKHdUgLW4SRjPpnPvxJyJMAumHq00PNeexRAM"
);

ReactDOM.render(
    <Elements stripe={stripePromise}>
        <UserContextProvider>
            <App />
        </UserContextProvider>
    </Elements>,
    document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
