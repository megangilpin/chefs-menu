import * as React from "react";
import { useHistory } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import {
    Typography,
    Grid,
    Button,
    List,
    ListItem,
    ListItemText,
} from "@material-ui/core";
import { TextField, CheckboxWithLabel } from "formik-material-ui";
import { makeStyles } from "@material-ui/core/styles";
import * as Yup from "yup";
import { UserContext } from "../contexts/user/UserContextProvider";

import { useSnackbar } from "notistack";

const useStyles = makeStyles({
    formItem: {
        margin: "2vh 0 2vh 0",
    },
    demoButton: {
        margin: "2vh 0 2vh 2rem",
    },
    formContainer: {
        margin: "10vh 0 0 0",
    },
});

export default function SignUp() {
    const classes = useStyles();
    const user = React.useContext(UserContext);
    const history = useHistory();
    const [address, setAddress] = React.useState("");
    const [predictions, setPredictions] = React.useState(undefined);

    const validationSchema = Yup.object().shape({
        name: Yup.string().required("Required!"),
        email: Yup.string().email().required("Required!"),
        password: Yup.string().min(6).required("Required!"),
    });

    const { enqueueSnackbar } = useSnackbar();

    const showSnackBar = (message, variant) => {
        enqueueSnackbar(message, { variant: variant, autoHideDuration: "6000" });
    };

    const handleChange = (e) => {
        setAddress(e.target.value);
        address &&
            address.length > 3 &&
            fetch(`/maps/autocomplete?input=${e.target.value}`, {
                method: "get",
                headers: { "Content-Type": "application/json" },
            })
                .then((response) => response.json())
                .then(({ predictions }) => setPredictions(predictions))
                .catch(console.error);
    };

    const handleDemoSubmit = () => {
        const values = {
            email: "megan@gmail.com",
            password: "123456"
        }
        user.login(values)
        .then((res) => {
            if (res.result) {
                showSnackBar("Successfully logged in!", "success");
                history.push("/meals");
            } else {
                showSnackBar(res.message, "error");
            }
        })
        .catch((error) => {
            showSnackBar("Error while making request!", "error");
        });
    }

    return (
        <>
            <Formik
                initialValues={{
                    name: "",
                    email: "",
                    password: "",
                    chef: false,
                }}
                validationSchema={validationSchema}
                onSubmit={(values, { setSubmitting }) => {
                    setSubmitting(false);
                    user.register({ ...values, address })
                        .then((res) => {
                            if (res.result) {
                                if (values.chef) {
                                    user.getStripeOnboardingLink().then((data) => {
                                        window.location.replace(data.redirectURL);
                                        showSnackBar(
                                            "Success! Redirecting to stripe.",
                                            "success"
                                        );
                                    });
                                }
                                history.push("/meals");
                                showSnackBar("Successfully registered!", "success");
                            } else {
                                showSnackBar(res.message, "error");
                            }
                        })
                        .catch((error) => {
                            showSnackBar("Error while making request!", "error");
                        });
                }}
            >
                {({ submitForm, isSubmitting }) => (
                    <Form>
                        <Grid
                            className={classes.formContainer}
                            container
                            justify="flex-start"
                        >
                            <Grid className={classes.formItem} item xs={12}>
                                <Typography variant="h5" component="h2">
                                    Create an account
                                </Typography>
                            </Grid>
                            <Grid className={classes.formItem} item xs={12}>
                                <Field
                                    fullWidth
                                    component={TextField}
                                    variant="outlined"
                                    name="name"
                                    label="Name"
                                />
                            </Grid>
                            <Grid className={classes.formItem} item xs={12}>
                                <Field
                                    fullWidth
                                    component={TextField}
                                    variant="outlined"
                                    name="address"
                                    label="Address"
                                    onChange={handleChange}
                                    value={address}
                                />
                                {predictions && (
                                    <List
                                        component="nav"
                                        aria-label="secondary mailbox folders"
                                    >
                                        {predictions.map((prediction) => (
                                            <ListItem
                                                button
                                                key={prediction}
                                                onClick={() => {
                                                    setAddress(prediction);
                                                    setPredictions(null);
                                                }}
                                            >
                                                <ListItemText primary={prediction} />
                                            </ListItem>
                                        ))}
                                    </List>
                                )}
                            </Grid>
                            <Grid className={classes.formItem} item xs={12}>
                                <Field
                                    fullWidth
                                    component={TextField}
                                    variant="outlined"
                                    name="email"
                                    type="email"
                                    label="Email"
                                />
                            </Grid>
                            <Grid className={classes.formItem} item xs={12}>
                                <Field
                                    fullWidth
                                    component={TextField}
                                    variant="outlined"
                                    name="password"
                                    type="password"
                                    label="Password"
                                />
                            </Grid>
                            <Grid className={classes.formItem} item xs={12}>
                                <Field
                                    component={CheckboxWithLabel}
                                    type="checkbox"
                                    name="chef"
                                    Label={{ label: "Sign up as chef!" }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Button
                                    className={classes.formItem}
                                    color="primary"
                                    variant="contained"
                                    disabled={isSubmitting}
                                    onClick={submitForm}
                                >
                                    Sign Up
                                </Button>
                                <Button onClick={handleDemoSubmit}className={classes.demoButton} color="primary" variant="contained"> Demo App</Button>

                            </Grid>
                        </Grid>
                    </Form>
                )}
            </Formik>
        </>
    );
}
