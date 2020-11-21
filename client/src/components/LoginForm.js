import * as React from "react";
import { useHistory } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import { Typography, Grid, Button } from "@material-ui/core";
import { TextField } from "formik-material-ui";
import { makeStyles } from "@material-ui/core/styles";
import * as Yup from "yup";
import { UserContext } from "../contexts/user/UserContextProvider";

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

export default function LoginForm(props) {
    const classes = useStyles();
    const user = React.useContext(UserContext);
    const history = useHistory();
    
    const validationSchema = Yup.object().shape({
        email: Yup.string().email().required("Required!"),
        password: Yup.string().min(6).required("Required!"),
    });


    const [open, setOpen] = React.useState(false);

    const [message, setMessage] = React.useState("");

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
                    email: "",
                    password: "",
                }}
                validationSchema={validationSchema}
                onSubmit={(values, { setSubmitting }) => {
                    setSubmitting(false);
                    user.login(values)
                        .then((res) => {
                            if (res.result) {
                                history.push("/home");
                            } else {
                                setMessage(res.message);
                                setOpen(true);
                            }
                        })
                        .catch((error) => {
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
                                    Login
                                </Typography>
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

                            <Grid item xs={12}>
                                <Button
                                    className={classes.formItem}
                                    color="primary"
                                    variant="contained"
                                    disabled={isSubmitting}
                                    onClick={submitForm}
                                >
                                    Sign In
                                </Button>
                            </Grid>
                        </Grid>
                    </Form>
                )}
            </Formik>
            <Snackbar open={open} autoHideDuration={6000} onClose={snackBarClose}>
                <MuiAlert onClose={snackBarClose} severity="error">
                    {message}
                </MuiAlert>
            </Snackbar>
        </>
    );
}
