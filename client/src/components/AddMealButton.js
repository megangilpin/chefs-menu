import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { UserContext } from "../contexts/user/UserContextProvider";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import { Formik, Form, Field } from "formik";
import ProfilePicLoader from "../components/ProfilePicLoader";
import {
    Typography,
    Grid,
    Box,
    Button,
    List,
    ListItem,
    MenuItem,
} from "@material-ui/core";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";

import { Select } from "formik-material-ui";

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
                <DialogContent>
                    <Formik
                        initialValues={{
                            firstName: "",
                            lastName: "",
                            about: "",
                            city: "",
                            region: "",
                            country: "",
                        }}
                        onSubmit={(values, { setSubmitting }) => {
                            setSubmitting(false);

                            const editedVals = {
                                firstName: values.firstName,
                                lastName: values.lastName,
                                bio: values.about,
                                primaryAddress: {
                                    city: values.city,
                                    region: values.region,
                                    country: values.country,
                                },
                            };

                            // save meal into DB
                        }}
                    >
                        {({ submitForm, isSubmitting, values }) => (
                            <Form>
                                <Grid
                                    container
                                    spacing={2}
                                    direction="column"
                                    // justify="center"
                                    // alignItems="center"
                                >
                                    {/* Meal Image */}
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
                                            <Typography variant="subtitle2">
                                                <Box
                                                    fontWeight="fontWeightBold"
                                                    mb={1}
                                                >
                                                    Title
                                                </Box>
                                            </Typography>
                                            <Field
                                                fullWidth
                                                component={TextField}
                                                variant="outlined"
                                                name="title"
                                                type="text"
                                                label="Title"
                                            />
                                        </Grid>
                                        <Grid item xs={4}>
                                            <Typography variant="subtitle2">
                                                <Box
                                                    fontWeight="fontWeightBold"
                                                    mb={1}
                                                >
                                                    Price
                                                </Box>
                                            </Typography>
                                            <Field
                                                fullWidth
                                                component={TextField}
                                                variant="outlined"
                                                name="price"
                                                type="text"
                                                label="Price"
                                            />
                                        </Grid>
                                        <Grid item xs={8}>
                                            <Typography variant="subtitle2">
                                                <Box
                                                    fontWeight="fontWeightBold"
                                                    mb={1}
                                                >
                                                    Serving Size ie: "Meal for 2"
                                                </Box>
                                            </Typography>
                                            <Field
                                                fullWidth
                                                component={TextField}
                                                variant="outlined"
                                                name="serving size"
                                                type="text"
                                                label="Serving Size"
                                            />
                                        </Grid>
                                        <Grid item xs={4}>
                                            <Typography variant="subtitle2">
                                                <Box
                                                    fontWeight="fontWeightBold"
                                                    mb={1}
                                                >
                                                    Cuisine Type
                                                </Box>
                                            </Typography>
                                            <Field
                                                variant="outlined"
                                                component={Select}
                                                name="age"
                                                inputProps={{
                                                    id: "age-simple",
                                                }}
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
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Typography variant="subtitle2">
                                                <Box
                                                    fontWeight="fontWeightBold"
                                                    mb={1}
                                                >
                                                    List of Ingredients
                                                </Box>
                                            </Typography>
                                            <Field
                                                fullWidth
                                                component={TextField}
                                                variant="outlined"
                                                name="ingredients"
                                                type="text"
                                                label="Ingredients"
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Typography variant="subtitle2">
                                                <Box
                                                    fontWeight="fontWeightBold"
                                                    mb={1}
                                                >
                                                    Kitchen Requirements
                                                </Box>
                                            </Typography>
                                            <Field
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
                            </Form>
                        )}
                    </Formik>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleClose} color="primary">
                        Add
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}

export default AddMealButton;
