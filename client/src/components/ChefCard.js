import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { Avatar, Typography, Grid, Box, Button, Link } from "@material-ui/core";
import { useHistory } from "react-router-dom";

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
    link: {
        fontWeight: "bold",
        fontSize: "1rem",
    },
}));

function ChefCard(props) {
    const classes = useStyles();
    const history = useHistory();

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
                <CardContent>
                    <Grid
                        container
                        direction="column"
                        justify="center"
                        alignItems="center"
                        spacing={2}
                    >
                        <Grid item>
                            <Typography className={classes.name} gutterBottom>
                                {firstName + " " + lastName}
                            </Typography>
                            <Typography className={classes.location} gutterBottom>
                                {location}
                            </Typography>
                            <Typography className={classes.location} gutterBottom>
                                {`${Math.round(distanceKm)} Km away`}
                            </Typography>
                        </Grid>
                        <Grid
                            item
                            container
                            direction="row"
                            justify="center"
                            alignItems="center"
                        >
                            {cuisineSpecialty &&
                                cuisineSpecialty.map((cuisine) => (
                                    <Button
                                        key={cuisine}
                                        color="primary"
                                        variant="contained"
                                    >
                                        <Typography variant="button">
                                            {cuisine}
                                        </Typography>
                                    </Button>
                                ))}
                        </Grid>
                        <Grid item>
                            <Typography className={classes.name}>{bio}</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Link
                                component="button"
                                variant="body2"
                                className={classes.link}
                                onClick={() =>
                                    history.push({
                                        pathname: "/chefprofile",
                                        state: {
                                            ...props.userId,
                                            chefProfile: {
                                                _id: props._id,
                                                cuisineSpecialty:
                                                    props.cuisineSpecialty,
                                            },
                                        },
                                    })
                                }
                            >
                                View Chef's Menu
                            </Link>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </Grid>
    );
}

export default ChefCard;
