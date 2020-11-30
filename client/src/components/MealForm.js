import * as React from "react";
import { makeStyles } from "@material-ui/core/styles";
import MealPicLoader from "./MealPicLoader";
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
        maxWidth: "50%",
        objectFit: "cover",
    },
    error: {
        color: theme.palette.error.main,
    },
}));

function MealForm(props) {
    const classes = useStyles();
    const [mealPicUrl, setMealPicUrl] = React.useState("");
    const url =
        "https://teamcornpops-images.s3.us-east-2.amazonaws.com/5fb3030d70632969a8f0684f-1606778786489";
    const meal = props.meal;
    const price = meal.price !== "" ? meal.price / 100 : meal.price;
    const cuisineType = meal.cuisineType[0] ? meal.cuisineType[0] : "";
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

    const handleUrlUpdate = (url) => {
        setMealPicUrl(url);
    };

    return (
        <React.Fragment>
            <Dialog
                open={props.isOpen}
                onClose={props.close}
                aria-labelledby="form-dialog-title"
            >
                <Formik
                    initialValues={{
                        title: meal.title,
                        price: price,
                        servingSize: meal.servingSize,
                        cuisineType: cuisineType,
                        ingredients: meal.ingredients,
                        requirements: meal.requirements,
                    }}
                    validationSchema={validationSchema}
                    onSubmit={(values, actions) => {
                        actions.setSubmitting(false);
                        values.price = parseFloat(values.price) * 100;
                        values.cuisineType = [values.cuisineType];
                        props.onSubmit(values);

                        props.update();
                        props.close();
                    }}
                >
                    {({ submitForm, isSubmitting }) => (
                        <React.Fragment>
                            <Form>
                                <DialogContent>
                                    <Grid container spacing={2} direction="column">
                                        {/* MEAL IMAGE INPUT */}
                                        <Grid xs={12} item>
                                            {mealPicUrl === "" ? null : (
                                                <img
                                                    className={classes.addImage}
                                                    src={mealPicUrl}
                                                    alt="Meal Picture"
                                                />
                                            )}
                                            <MealPicLoader
                                                upload={handleUrlUpdate}
                                            />
                                        </Grid>
                                        <Grid item xs={12} container spacing={3}>
                                            <Grid item xs={8}>
                                                <InputLabel htmlFor="title">
                                                    <Box
                                                        fontWeight="fontWeightBold"
                                                        // mt={1.5}
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
                                    <Button onClick={props.close} color="primary">
                                        Cancel
                                    </Button>
                                    <Button
                                        disabled={isSubmitting}
                                        onClick={submitForm}
                                        color="primary"
                                    >
                                        Submit
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

export default MealForm;
