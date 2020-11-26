import React from "react";
import Grid from "@material-ui/core/Grid";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles({
    map: {
        backgroundPosition: "center center",
        backgroundSize: "cover",
        height: "50%",
    },
});

export default function UserProfileMap({ location }) {
    const classes = useStyles();
    const backgroundImage = `url(/maps/static?center=${encodeURIComponent(
        location
    )})`;
    return <Grid className={classes.map} item xs={12} style={{ backgroundImage }} />;
}
