import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import chef1 from "../images/chef1.png";

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
    },
    media: {
        height: 200,
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
    console.log(cuisineSpecialty, distanceKm, location, bio);

    return (
        <Grid item xs={12} sm={6} lg={4}>
            <Card>
                <CardMedia className={classes.media} image={chef1} />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {firstName + " " + lastName}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {bio}
                    </Typography>
                </CardContent>
            </Card>
        </Grid>
    );
}

export default ChefCard;
