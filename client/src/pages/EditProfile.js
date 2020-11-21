import * as React from "react";
import { Typography, Grid, Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
// import ArrowBackIcon from "@material-ui/icons/ArrowBack";
// import IconButton from "@material-ui/core/IconButton";
import { UserContext } from "../contexts/user/UserContextProvider";
import sampleUser from "../images/sampleUser.png";

import { Formik, Form, Field } from "formik";

import { TextField } from "formik-material-ui";

import Chip from "@material-ui/core/Chip";

const useStyles = makeStyles({
    profile: {
        margin: "2vh auto",
        marginTop: "10vh",
        width: "80%",
        height: "80vh",
        overflow: "hidden",
    },
    profileTopRight: {
        padding: "5vh 5vw 0 5vw",
    },
    profileTopLeft: {
        borderRight: "1px solid lightgrey",
        padding: "5vh 5vw 0 5vw",
        textAlign: "center",
    },

    userImage: {
        margin: "auto",
        border: "5px solid white",
        height: "15vw",
        width: "15vw",
        maxWidth: "18vh",
        maxHeight: "18vh",
    },

    allergyChip: {
        background: "#CCCC00",
        color: "white",
    },
});

export default function EditProfile() {
    
    const classes = useStyles();
    const history = useHistory();
    const user = React.useContext(UserContext);
    const userData = user.profile;


    const [cusineChipData, setCusineChipData] = React.useState(
        userData.favoriteCuisine? userData.favoriteCuisine.map((cusine, index) => ({ key: index, label: cusine })) : []
    );
    const [allergyChipData, setAllergyChipData] = React.useState(
        userData.allergies? userData.allergies.map((cusine, index) => ({ key: index, label: cusine })) : []
    );

    const handleCusineDelete = (chipToDelete) => () => {
        setCusineChipData((chips) =>
            chips.filter((chip) => chip.key !== chipToDelete.key)
        );
    };
    const handleAllergenDelete = (chipToDelete) => () => {
        setAllergyChipData((chips) =>
            chips.filter((chip) => chip.key !== chipToDelete.key)
        );
    };

    return (
        <Formik
            initialValues={{
         
                firstName: userData.firstName,
                lastName: userData.lastName,
                cusine: "",
                about: userData.bio,
                allergy: "",
                city: userData.primaryAddress["city"],
                country: userData.primaryAddress["country"],
                
            }}
            onSubmit={(values, { setSubmitting }) => {
                setSubmitting(false);

                const editedVals ={
                    firstName: values.firstName,
                    lastName: values.lastName,
                    bio: values.about,
                    primaryAddress: {
                
                        city: values.city,
                 
                        country: values.country,
                    },
               
                    favoriteCuisine: cusineChipData.map(x => x.label),
                    
                }
                
                user.updateUser(editedVals)
                        .then((res) => {
                            if (res.result) {
                                history.push("/profile");
                                
                          
                            } else {
                               
                            }
                        })
                        .catch((error) => {
                            console.log(error.message);
                     
                        });
                
                // all info is contained in values values can be pushed to the model here
                // for cusine cusineChipData.map(x => x.label)
                // for allergen allergenChipData.map(x => x.label)


                
            }}
        >
            {({ submitForm, isSubmitting, values }) => (
                <Form>
                    <Box
                        component={Grid}
                        boxShadow={3}
                        container
                        className={classes.profile}
                    >
                        <Grid
                            item
                            xs={12}
                            sm={6}
                            container
                            spacing={2}
                            alignContent="flex-start"
                            className={classes.profileTopLeft}
                        >
                            <Grid item xs={12}>
                                <Box
                                    boxShadow={2}
                                    component={Avatar}
                                    src={sampleUser}
                                    alt="user"
                                    className={classes.userImage}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Field
                                    fullWidth
                                    component={TextField}
                                    variant="outlined"
                                    name="firstName"
                                    type="text"
                                    label="First Name"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Field
                                    fullWidth
                                    component={TextField}
                                    variant="outlined"
                                    name="lastName"
                                    type="text"
                                    label="Last Name"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Field
                                    fullWidth
                                    component={TextField}
                                    variant="outlined"
                                    name="city"
                                    type="text"
                                    label="City"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Field
                                    fullWidth
                                    component={TextField}
                                    variant="outlined"
                                    name="country"
                                    type="text"
                                    label="Country"
                                />
                            </Grid>
                        </Grid>

                        <Grid
                            item
                            xs={12}
                            sm={6}
                            container
                            spacing={2}
                            alignContent="flex-start"
                            className={classes.profileTopRight}
                        >
                            <Grid item xs={12}>
                                <Typography variant="h6" component="h4">
                                    ABOUT ME:
                                </Typography>
                            </Grid>

                            <Grid item xs={12}>
                                <Field
                                    fullWidth
                                    component={TextField}
                                    multiline
                                    rowsMax={4}
                                    variant="outlined"
                                    name="about"
                                    type="text"
                                    label="About Me"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="h6" component="h4">
                                    FAVOURITE CUSINE:
                                </Typography>
                            </Grid>
                            <Grid item xs={8}>
                                <Field
                                    fullWidth
                                    component={TextField}
                                    variant="outlined"
                                    name="cusine"
                                    type="text"
                                    label="Cusine Name"
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <Button
                                    className={classes.cusineButton}
                                    color="primary"
                                    variant="outlined"
                                    onClick={() =>
                                        setCusineChipData([
                                            ...cusineChipData,
                                            {
                                                key: [cusineChipData.size],
                                                label: values.cusine,
                                            },
                                        ])
                                    }
                                >
                                    Add Cusine
                                </Button>
                            </Grid>
                            <Grid item xs={12}>
                                {cusineChipData.map((data) => {
                                    return (
                                        <Chip
                                            color="primary"
                                            key={data.key}
                                            label={data.label}
                                            onDelete={handleCusineDelete(data)}
                                            className={classes.chip}
                                        />
                                    );
                                })}
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="h6" component="h4">
                                    ALLERGIES
                                </Typography>
                            </Grid>
                            <Grid item xs={8}>
                                <Field
                                    fullWidth
                                    component={TextField}
                                    variant="outlined"
                                    name="allergy"
                                    type="text"
                                    label="Allergen"
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <Button
                                    className={classes.cusineButton}
                                    color="primary"
                                    variant="outlined"
                                    onClick={() =>
                                        setAllergyChipData([
                                            ...allergyChipData,
                                            {
                                                key: [allergyChipData.size],
                                                label: values.allergy,
                                            },
                                        ])
                                    }
                                >
                                    Add Allergen
                                </Button>
                            </Grid>
                            <Grid item xs={12}>
                                {allergyChipData.map((data) => {
                                    return (
                                        <Chip
                                            key={data.key}
                                            label={data.label}
                                            onDelete={handleAllergenDelete(data)}
                                            className={classes.allergyChip}
                                        />
                                    );
                                })}
                            </Grid>
                            <Grid item xs={12}>
                                <Button
                                    disabled={isSubmitting}
                                    onClick={submitForm}
                                    color="primary"
                                    variant="contained"
                                >
                                    <Typography variant="h5">
                                        SUBMIT CHANGES
                                    </Typography>
                                </Button>
                            </Grid>
                        </Grid>
                    </Box>
                </Form>
            )}
        </Formik>
    );
}
