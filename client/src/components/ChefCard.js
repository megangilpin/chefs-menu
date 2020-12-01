import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { Avatar, Typography, Grid, Box, Divider, Button } from "@material-ui/core";
import CardMedia from "@material-ui/core/CardMedia";

import chef1 from "../images/chef1.png";

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 345,
    },
    media: {
        height: 200,
    },
    name: {
        textAlign: "center",
        fontWeight: "bold",
    },
    location: {
        textAlign: "center",
    },
    userImage: {
        width: theme.spacing(15),
        height: theme.spacing(15),
        border: "5px solid white",
    },
}));

function ChefCard(props) {
    const classes = useStyles();

    const { cuisineSpecialty, userId, distanceKm } = props;
    const {
        firstName,
        lastName,
        bio,
        primaryAddress: { city, region, country },
        profilePicURL,
    } = userId;
    const location = [city, region, country]
        .filter((ele) => ele && typeof ele === "string" && ele.length > 0)
        .join(", ");

    return (
        <Grid item xs={12} md={6} lg={4}>
            <Card>
                <Grid container justify="center" alignContent="center">
                    <Box
                        mt={2}
                        boxShadow={2}
                        component={Avatar}
                        src={profilePicURL}
                        alt={profilePicURL ? "profile image" : ""}
                        className={classes.userImage}
                    />
                </Grid>
                {/* <CardMedia className={classes.media} image={profilePicURL} /> */}
                <CardContent>
                    <Typography className={classes.name} gutterBottom>
                        {firstName + " " + lastName}
                    </Typography>
                    <Typography className={classes.location} gutterBottom>
                        {location}
                    </Typography>
                    <Typography className={classes.location} gutterBottom>
                        {`${Math.round(distanceKm)} Km away`}
                    </Typography>
                    {cuisineSpecialty &&
                        cuisineSpecialty.map((cuisine) => (
                            <Button
                                key={cuisine}
                                color="primary"
                                variant="contained"
                            >
                                <Typography variant="button">{cuisine}</Typography>
                            </Button>
                        ))}
                    <Typography variant="body2" color="textSecondary" component="p">
                        {bio}
                    </Typography>
                </CardContent>
            </Card>
        </Grid>
    );
}

export default ChefCard;
