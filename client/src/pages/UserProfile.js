import * as React from "react";
import { useHistory, Link } from "react-router-dom";

import { Typography, Grid, Button } from "@material-ui/core";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import EditIcon from "@material-ui/icons/Edit";
import IconButton from "@material-ui/core/IconButton";

import UserProfileMap from "../components/UserProfileMap";
import { UserContext } from "../contexts/user/UserContextProvider";
import ChefSignUp from "../components/ChefSignUp";
import Main from "../components/Main";

const useStyles = makeStyles((theme) => ({
    profile: {
        overflow: "hidden",
        height: "85vh",
    },
    profileTopRight: {
        padding: "2rem 0 0 2rem",
        height: "60%",
    },
    profileTopLeft: {
        borderRight: "1px solid lightgrey",
        padding: "2rem 0 0 0",
        textAlign: "center",
        height: "60%",
    },

    userImage: {
        margin: "auto",
        border: "5px solid white",
        height: "15vw",
        width: "15vw",
        maxWidth: "18vh",
        maxHeight: "18vh",
    },

    sendMessageBtn: {
        textTransform: "capitalize",
        padding: "10px",
    },

    editRow: {
        textAlign: "right",
    },
    editButton: {
        color: "white",
        background: "#FF743D",
        maxHeight: "2rem",
        maxWidth: "2rem",
    },
    chefButton: {
        padding: "10px",
    },
    box: {
        padding: ".6rem",
        fontSize: ".5rem",
        fontWeight: "600",
        color: "#ffff",
        background: theme.background.secondary,
    },
    link: {
        color: "#FF743D",
        textDecoration: "none",
    },
}));

export default function UserProfile() {
    const classes = useStyles();
    const history = useHistory();
    const user = React.useContext(UserContext);
    const { profile } = user;
    profile.chefProfile = { ...profile.chefProfile };

    // populate user data using profile from context
    const userData = {
        name: user.profile.firstName + " " + user.profile.lastName,
        location:
            user.profile.primaryAddress.city +
            ", " +
            user.profile.primaryAddress.region +
            ", " +
            user.profile.primaryAddress.country,
        about: user.profile.bio,
        cuisine: user.profile.favoriteCuisine,
    };

    return (
        <Main>
            <Box
                component={Grid}
                boxShadow={3}
                container
                spacing={0}
                className={classes.profile}
            >
                <Grid
                    item
                    xs={6}
                    sm={4}
                    container
                    spacing={2}
                    alignContent="flex-start"
                    className={classes.profileTopLeft}
                >
                    <Grid item xs={12}>
                        <Box
                            boxShadow={2}
                            component={Avatar}
                            src={user.profile.profilePicURL}
                            alt={user.profile.profilePicURL ? "Profile Image" : ""}
                            className={classes.userImage}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="h6" component="h2">
                            {userData.name}
                        </Typography>
                        <Typography variant="body1" component="h3">
                            {userData.location}
                        </Typography>
                    </Grid>
                    <Grid
                        item
                        xs={12}
                        container
                        direction="row"
                        justify="center"
                        alignItems="center"
                        spacing={2}
                    >
                        {user.profile.chefProfile.cuisineSpecialty &&
                            user.profile.chefProfile.cuisineSpecialty.map(
                                (specialty) => (
                                    <Grid item key={specialty}>
                                        <Box className={classes.box}>
                                            {specialty}
                                        </Box>
                                    </Grid>
                                )
                            )}
                    </Grid>
                    <Grid item xs={12}>
                        {!user.profile.isChef ? (
                            <ChefSignUp />
                        ) : (
                            <div>
                                <Button
                                    className={classes.chefButton}
                                    variant="outlined"
                                    color="primary"
                                >
                                    <Link
                                        className={classes.link}
                                        to={`chefprofile/${profile.chefProfile._id}`}
                                    >
                                        Edit Menu
                                    </Link>
                                </Button>
                            </div>
                        )}
                    </Grid>
                </Grid>

                <Grid
                    item
                    xs={6}
                    container
                    spacing={2}
                    alignContent="flex-start"
                    className={classes.profileTopRight}
                >
                    <Grid className={classes.editRow} item xs={12}>
                        <IconButton
                            className={classes.editButton}
                            onClick={() => history.push("/editprofile")}
                        >
                            <EditIcon />
                        </IconButton>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="h6" component="h4">
                            About Me:
                        </Typography>
                        <Typography variant="body1" component="h5">
                            {userData.about}
                        </Typography>
                    </Grid>

                    <Grid item xs={12}>
                        <Typography variant="h6" component="h4">
                            Favourite Cuisine:
                        </Typography>
                        {userData.cuisine.map((cuisine) => (
                            <Button
                                key={cuisine}
                                className={classes.cuisineButton}
                                color="primary"
                                variant="contained"
                            >
                                <Typography variant="button">{cuisine}</Typography>
                            </Button>
                        ))}
                    </Grid>
                </Grid>
                <UserProfileMap location={userData.location} />
            </Box>
        </Main>
    );
}
