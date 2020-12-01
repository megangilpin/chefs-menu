import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import chef1 from "../images/chef1.png";

const useStyles = makeStyles({
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
});

function ChefCard(props) {
    const classes = useStyles();

    const { cuisineSpecialty, userId, distanceKm } = props;
    const {
        firstName,
        lastName,
        bio,
        primaryAddress: { city, region, country },
    } = userId;
    const location = [city, region, country]
        .filter((ele) => ele && typeof ele === "string" && ele.length > 0)
        .join(", ");

    return (
        <Grid item xs={12} md={6} lg={4}>
            <Card>
                <CardMedia className={classes.media} image={chef1} />
                <CardContent>
                    <Typography className={classes.name} gutterBottom>
                        {firstName + " " + lastName}
                    </Typography>
                    <Typography className={classes.location} gutterBottom>
                        {location}
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
