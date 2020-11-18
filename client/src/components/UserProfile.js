import * as React from "react";

import { useHistory } from "react-router-dom";

import { Typography, Grid, Button } from "@material-ui/core";

import makeStyles from "@material-ui/core/styles/makeStyles";
import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import EditIcon from "@material-ui/icons/Edit";
import IconButton from "@material-ui/core/IconButton";
import sampleUser from "../images/sampleUser.png";

import UserProfileMap from "./UserProfileMap";

const useStyles = makeStyles({
    profile: {
        margin: "2vh auto",
        width: "80vw",
        height: "90vh",
        overflow: "hidden",
    },
    profileTopRight: {
        height: "50%",
        // if you change this height, make sure you change UserProfileMap as well
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

    sendMessageBtn: {
       textTransform: "capitalize",
        padding: "1vh 3vw 1vh 3vw",
    },
});

export default function UserProfile() {
    const classes = useStyles();
    const history = useHistory();

    //  dummy value for now, will make backend call later or maybe get info
    // from user context?
    const userData = {
        name: "Christina Wilson",
        city: "Toronto, Canada",
        about:
            "Hi everyone! I'm a foodie and I love to eat healthy and I love to eat healthy and tasty meals. Also I'm a mom of two beautiful babies",
        cusine: ["Japanese", "Chinese", "Mediterranean", "Thai"],
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
                        src={sampleUser}
                        alt="user"
                        className={classes.userImage}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="h6" component="h2">
                        {userData.name}
                    </Typography>
                    <Typography variant="body1" component="h3">
                        {userData.city}
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
                <Grid item xs={12}>
                    <Typography variant="h6" component="h4">
                        ABOUT ME:{" "}
                      
                            <EditIcon onClick={() => history.push("/edit")}/>
           
                    </Typography>
                    <Typography variant="body1" component="h5">
                        {userData.about}
                    </Typography>
                </Grid>

                <Grid item xs={12}>
                    <Typography variant="h6" component="h4">
                        FAVOURITE CUSINE:
                    </Typography>
                    {userData.cusine.map((cusine) => (
                        <Button
                            className={classes.cusineButton}
                            color="primary"
                            variant="contained"
                        >
                            <Typography variant="button">{cusine}</Typography>
                        </Button>
                    ))}
                </Grid>
            </Grid>

            <UserProfileMap />
        </Box>
    );
}
