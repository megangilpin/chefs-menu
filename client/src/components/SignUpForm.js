import * as React from "react";
import { useHistory } from 'react-router-dom';
import { Formik, Form, Field } from "formik";
import { Typography, Grid, Button } from "@material-ui/core";
import { TextField, CheckboxWithLabel } from "formik-material-ui";
import { makeStyles } from "@material-ui/core/styles";
import * as Yup from "yup";
import AuthService from "../services/AuthService";
import { UserContext } from "../contexts/UserContextProvider";

import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

const useStyles = makeStyles({
    formItem: {
        margin: "2vh 0 2vh 0",
    },
    formContainer: {
        margin: "10vh 0 0 0",
    },
});

export default function SignUp() {
    const classes = useStyles();
    const user = React.useContext(UserContext);
    const history = useHistory();
    const [open, setOpen] = React.useState(false);
    const [severity, setSeverity] = React.useState("");
    const [message, setMessage] = React.useState("");
    const validationSchema = Yup.object().shape({
        name: Yup.string().required("Required!"),
        email: Yup.string().email().required("Required!"),
        password: Yup.string().min(6).required("Required!"),
    });

    const snackBarClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setOpen(false);
    };
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
                    AuthService.register(values)
                        .then((data) => {
                            if (data.user) {
                                setSeverity("success");
                                setMessage("Successfully registered");
                                setOpen(true);
                                user.setProfile(data.user)
                                history.push("/home")
                            } else {
                                setSeverity("error");
                                setMessage(data.errors);
                                setOpen(true);
                            }
                        })
                        .catch((error) => {
                            console.log(error);
                            setSeverity("error");
                            setMessage("Error while making request");
                            setOpen(true);
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
                            </Grid>
                        </Grid>
                    </Form>
                )}
            </Formik>
            <Snackbar open={open} autoHideDuration={6000} onClose={snackBarClose}>
                <MuiAlert onClose={snackBarClose} severity={severity}>
                    {message}
                </MuiAlert>
            </Snackbar>
        </>
    );
}
