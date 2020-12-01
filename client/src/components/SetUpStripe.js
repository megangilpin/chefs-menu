import * as React from "react";
// import { useHistory } from "react-router-dom";

import { Typography, Grid, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { UserContext } from "../contexts/user/UserContextProvider";

function SetUpStripe(props) {
    const user = React.useContext(UserContext);

    const [error, setError] = React.useState(null);
    const [isLoaded, setIsLoaded] = React.useState(false);
    const [account, setAccount] = React.useState([]);

    React.useEffect(() => {
        let mounted = true;
        user.getStripeAccount().then(
            (data) => {
                if (mounted) {
                    setIsLoaded(true);
                    setAccount(data);
                    console.log(data);
                }
            },
            (error) => {
                if (mounted) {
                    setIsLoaded(true);
                    setError(error);
                }
            }
        );
        return () => (mounted = false);
    }, []);

    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
        // } else if (account.charges_enabled) {
        //     return (
        //         <Grid container justify="center" spacing={2}>
        //             <Grid item xs={8}>
        //                 <Typography variant="h5">
        //                     Looks like your Stripe is all set up!
        //                 </Typography>
        //             </Grid>
        //         </Grid>
        //     );
    }
    return (
        <Grid container justify="center" spacing={2}>
            <Grid item xs={8}>
                <Typography variant="h5">
                    Set up payouts to list meals on Chef's Meal
                </Typography>
            </Grid>
            <Grid item xs={8}>
                <Typography variant="body1">
                    Chef's Meal partners with Stripe to transfer earnings to your
                    bank account.
                </Typography>
            </Grid>
            <Grid item xs={8}>
                <Button
                    onClick={() => {
                        user.getStripeOnboardingLink().then((data) => {
                            window.location.replace(data.redirectURL);
                        });
                    }}
                    color="primary"
                    variant="contained"
                >
                    <Typography variant="button">Set up payouts</Typography>
                </Button>
                <Typography variant="subtitle1">
                    You'll be redirected to Stripe to complete the onboarding proces.
                </Typography>
            </Grid>
        </Grid>
    );
}
export default SetUpStripe;
