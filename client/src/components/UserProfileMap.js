import * as React from "react";
import Grid from "@material-ui/core/Grid";

import makeStyles from "@material-ui/core/styles/makeStyles";

import placeHolderMap from "../images/placeHolderMap.png";

const useStyles = makeStyles({
    map: {
        backgroundImage: `url(${placeHolderMap})`,
        backgroundPosition: "center center",
        backgroundSize: "cover",
        height: "50%",
    },
});

export default function UserProfileMap() {
    const classes = useStyles();

    return <Grid className={classes.map} item xs={12}></Grid>;
}
