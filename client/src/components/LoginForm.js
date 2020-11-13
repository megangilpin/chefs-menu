import * as React from "react";
import { Formik, Form, Field } from "formik";
import { Grid, Button } from "@material-ui/core";
import { TextField } from "formik-material-ui";
import { makeStyles } from "@material-ui/core/styles";
import * as Yup from "yup";

const useStyles = makeStyles({
    formItem: {
        margin: "2vh 0vw 2vh 0vw",
        textAlign: "left",
    },
    formContainer: {
        marginLeft: "5vw",
    },
});

export default function LoginForm() {
    const classes = useStyles();

    const validationSchema = Yup.object().shape({
        email: Yup.string().email().required("Required!"),
        password: Yup.string().min(6).required("Required!"),
    });
    return (
        <Formik
            initialValues={{
                email: "",
                password: "",
            }}
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {
                    setSubmitting(false);
                    alert(JSON.stringify(values, null, 2));
                }, 500);
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
                            <h2>Login</h2>
                        </Grid>

                        <Grid className={classes.formItem} item xs={12}>
                            <Field
                                component={TextField}
                                variant="outlined"
                                name="email"
                                type="email"
                                label="Email"
                            />
                        </Grid>
                        <Grid className={classes.formItem} item xs={12}>
                            <Field
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
    );
}
