import * as React from "react";
import { useHistory } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import { Typography, Grid, Button, Box } from "@material-ui/core";
import { TextField } from "formik-material-ui";
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

export default function LoginForm(props) {
    const classes = useStyles();
    const user = React.useContext(UserContext);
    const history = useHistory();

    const validationSchema = Yup.object().shape({
        email: Yup.string().email().required("Required!"),
        password: Yup.string().min(6).required("Required!"),
    });

    const { enqueueSnackbar } = useSnackbar();

    const showSnackBar = (message, variant) => {
        enqueueSnackbar(message, { variant: variant, autoHideDuration: "6000" });
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
                    email: "",
                    password: "",
                }}
                validationSchema={validationSchema}
                onSubmit={(values, { setSubmitting }) => {
                    setSubmitting(false);
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
                                <Button onClick={handleDemoSubmit}className={classes.demoButton} color="primary" variant="contained"> Demo App</Button>
                            </Grid>
                        </Grid>
                    </Form>
                )}
            </Formik>
        </>
    );
}
