import * as React from "react";
import { useHistory } from "react-router-dom";

import { Typography, Grid, Button } from "@material-ui/core";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import EditIcon from "@material-ui/icons/Edit";
import IconButton from "@material-ui/core/IconButton";

import UserProfileMap from "../components/UserProfileMap";
import { UserContext } from "../contexts/user/UserContextProvider";

const useStyles = makeStyles({
    profile: {
        margin: "12vh auto",

        width: "80%",
        height: "80vh",
        overflow: "hidden",
    },
    profileTopRight: {
        //  if changing this, change UserProfileMap styles height to correspond
        height: "50%",

        padding: "5vh 1vw 0 5vw",
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
    },
});

export default function UserProfile() {
    const classes = useStyles();
    const history = useHistory();
    const user = React.useContext(UserContext);
    console.log(user.profile);

    // populate user data using profile from context
    const userData = {
        name: user.profile.firstName + " " + user.profile.lastName,
        location:
            user.profile.primaryAddress.city +
            ", " +
            user.profile.primaryAddress.country,
        about: user.profile.bio,
        cuisine: user.profile.favoriteCuisine,
    };

    return (
        <Box component={Grid} boxShadow={3} container className={classes.profile}>
            <Grid
                item
                xs={4}
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
                        alt="user"
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
                <Grid item xs={12}>
                    <Button
                        className={classes.sendMessageBtn}
                        color="primary"
                        variant="outlined"
                    >
                        Send Message
                    </Button>
                </Grid>
            </Grid>

            <Grid
                item
                xs={8}
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
                        ABOUT ME:
                    </Typography>
                    <Typography variant="body1" component="h5">
                        {userData.about}
                    </Typography>
                </Grid>

                <Grid item xs={12}>
                    <Typography variant="h6" component="h4">
                        FAVOURITE CUISINE:
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

            <UserProfileMap />
        </Box>
    );
}
