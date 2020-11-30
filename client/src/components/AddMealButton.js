import * as React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { UserContext } from "../contexts/user/UserContextProvider";
import ProfilePicLoader from "./ProfilePicLoader";
import {
    Grid,
    Box,
    Button,
    MenuItem,
    InputLabel,
    Dialog,
    DialogActions,
    DialogContent,
} from "@material-ui/core";

import { Formik, Form, Field, ErrorMessage } from "formik";
import { TextField, Select } from "formik-material-ui";
import * as Yup from "yup";

const useStyles = makeStyles((theme) => ({
    content: {
        display: "flex",
        justifyContent: "center",
    },
    list: {
        boxShadow: "0px 0px 10px 5px rgba(7,7,7,0.07)",
        background: "#ffffff",
    },
    listItem: {
        borderBottom: "1px solid #DCDCDC",
    },
    // listItem: {
    //     ":last-child": {
    //         borderBottom: "none",
    //     },
    // },
    addImage: {
        width: "100%",
        objectFit: "cover",
    },
    error: {
        color: theme.palette.error.main,
    },
}));

function AddMealButton(props) {
    const user = React.useContext(UserContext);
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const validationSchema = Yup.object().shape({
        title: Yup.string().required("Required!"),
        price: Yup.number()
            .typeError("Price must be a number")
            .required("Required!")
            .test("is-decimal", "must be to the nearest cent", (value) =>
                (value + "").match(/^\d+(?:\.\d{0,2})$/)
            ),
        servingSize: Yup.string().required("Required!"),
        cuisineType: Yup.string().required("Required!"),
        ingredients: Yup.string().required("Required!"),
    });

    return (
        <React.Fragment>
            <Button color="primary" variant="contained" onClick={handleClickOpen}>
                Add Meal
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="form-dialog-title"
            >
                <Formik
                    initialValues={{
                        title: "",
                        price: "",
                        servingSize: "",
                        cuisineType: "",
                        ingredients: "",
                        requirements: "",
                    }}
                    validationSchema={validationSchema}
                    onSubmit={(values, { setSubmitting }) => {
                        setSubmitting(false);
                        console.log(values);
                        // const response = await fetch("/meals", {
                        //     method: "get",
                        //     credentials: "include",
                        // });
                    }}
                >
                    {({ submitForm, isSubmitting }) => (
                        <React.Fragment>
                            <Form>
                                <DialogContent>
                                    <Grid container spacing={2} direction="column">
                                        {/* MEAL IMAGE INPUT */}
                                        <Grid xs={12} item>
                                            {/* <img
                                        className={classes.addImage}
                                        src={meal1}
                                        alt="Chef's Menu Logo"
                                    /> */}
                                            <ProfilePicLoader />
                                        </Grid>
                                        <Grid item xs={12} container spacing={3}>
                                            <Grid item xs={8}>
                                                <InputLabel htmlFor="title">
                                                    <Box
                                                        fontWeight="fontWeightBold"
                                                        mb={1.5}
                                                    >
                                                        Meal Title
                                                    </Box>
                                                </InputLabel>
                                                <Field
                                                    inputProps={{
                                                        id: "title",
                                                    }}
                                                    fullWidth
                                                    component={TextField}
                                                    variant="outlined"
                                                    name="title"
                                                    type="text"
                                                    label="Title"
                                                />
                                            </Grid>
                                            <Grid item xs={4}>
                                                <InputLabel htmlFor="price">
                                                    <Box
                                                        fontWeight="fontWeightBold"
                                                        mb={1.5}
                                                    >
                                                        Price
                                                    </Box>
                                                </InputLabel>
                                                <Field
                                                    inputProps={{
                                                        id: "price",
                                                    }}
                                                    fullWidth
                                                    id="price"
                                                    component={TextField}
                                                    variant="outlined"
                                                    name="price"
                                                    type="text"
                                                    label="$0.00"
                                                />
                                            </Grid>
                                            <Grid item xs={8}>
                                                <InputLabel htmlFor="serving-size">
                                                    <Box
                                                        fontWeight="fontWeightBold"
                                                        mb={1.5}
                                                    >
                                                        Serving Size
                                                    </Box>
                                                </InputLabel>
                                                <Field
                                                    inputProps={{
                                                        id: "serving-size",
                                                    }}
                                                    fullWidth
                                                    component={TextField}
                                                    variant="outlined"
                                                    name="servingSize"
                                                    type="text"
                                                    label="ie: Meal for 2"
                                                />
                                            </Grid>
                                            <Grid item xs={4}>
                                                <InputLabel htmlFor="cuisine-type">
                                                    <Box
                                                        fontWeight="fontWeightBold"
                                                        mb={1.5}
                                                    >
                                                        Cuisine Type
                                                    </Box>
                                                </InputLabel>
                                                <Field
                                                    inputProps={{
                                                        id: "cuisine-type",
                                                    }}
                                                    variant="outlined"
                                                    component={Select}
                                                    name="cuisineType"
                                                >
                                                    <MenuItem value={"american"}>
                                                        American
                                                    </MenuItem>
                                                    <MenuItem value={"spanish"}>
                                                        Spanish
                                                    </MenuItem>
                                                    <MenuItem value={"japanese"}>
                                                        Japanese
                                                    </MenuItem>
                                                </Field>
                                                <Box ml={1} color="error">
                                                    <ErrorMessage name="cuisineType">
                                                        {(msg) => (
                                                            <div
                                                                className={
                                                                    classes.error
                                                                }
                                                            >
                                                                {msg}
                                                            </div>
                                                        )}
                                                    </ErrorMessage>
                                                </Box>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <InputLabel htmlFor="ingredients">
                                                    <Box
                                                        fontWeight="fontWeightBold"
                                                        mb={1.5}
                                                    >
                                                        List of Ingredients
                                                    </Box>
                                                </InputLabel>
                                                <Field
                                                    inputProps={{
                                                        id: "ingredients",
                                                    }}
                                                    fullWidth
                                                    component={TextField}
                                                    variant="outlined"
                                                    name="ingredients"
                                                    type="text"
                                                    label="Ingredients"
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <InputLabel htmlFor="requirements">
                                                    <Box
                                                        fontWeight="fontWeightBold"
                                                        mb={1.5}
                                                    >
                                                        Kitchen Requirements
                                                    </Box>
                                                </InputLabel>
                                                <Field
                                                    inputProps={{
                                                        id: "requirements",
                                                    }}
                                                    fullWidth
                                                    component={TextField}
                                                    rows={4}
                                                    variant="outlined"
                                                    name="requirements"
                                                    type="text"
                                                    label="Requirements"
                                                />
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={handleClose} color="primary">
                                        Cancel
                                    </Button>
                                    <Button
                                        disabled={isSubmitting}
                                        onClick={submitForm}
                                        color="primary"
                                    >
                                        Add
                                    </Button>
                                </DialogActions>
                            </Form>
                        </React.Fragment>
                    )}
                </Formik>
            </Dialog>
        </React.Fragment>
    );
}

export default AddMealButton;
