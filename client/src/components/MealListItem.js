import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import meal1 from "../images/meal1.png";
import { Typography, Grid, Box } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    mealCard: {
        minHeight: "300px",
        minWidth: "500px",
        maxWidth: "800px",
        boxShadow: "0px 0px 10px 5px rgba(7,7,7,0.07)",
        overflow: "auto",
    },
    mealImage: {
        width: "100%",
        maxHeight: "300px",
    },
    box: {
        color: "#ffff",
        background: theme.background.secondary,
    },
    subtitle2: {
        fontWeight: "bold",
    },
}));

function MealListItem(props) {
    const classes = useStyles();
    return (
        <div>
            <Box className={classes.mealCard} p={4}>
                <Grid
                    spacing={4}
                    container
                    direction="row"
                    justify="center"
                    alignItems="stretch"
                >
                    <Grid
                        xs={12}
                        sm={6}
                        spacing={2}
                        item
                        container
                        direction="column"
                    >
                        <Grid item container direction="row">
                            <Typography color="">
                                <Box
                                    className={classes.box}
                                    mb={1}
                                    p={1}
                                    fontWeight="fontWeightBold"
                                >
                                    Serving Size
                                </Box>
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant="h5">
                                <Box fontWeight="fontWeightBold" letterSpacing={1}>
                                    This is a roll
                                </Box>
                            </Typography>
                            <Typography color="primary" variant="subtitle1">
                                <Box fontWeight="fontWeightBold">$1.50</Box>
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant="subtitle2">
                                <Box fontWeight="fontWeightBold">INGREDIENTS</Box>
                            </Typography>
                            <Typography
                                className={classes.subtitle}
                                variant="caption text"
                            >
                                This is the list of ingredients Lorem ipsum dolor sit
                                amet.
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant="subtitle2">
                                <Box fontWeight="fontWeightBold">REQUIRED STUFF</Box>
                            </Typography>
                            <Typography
                                className={classes.subtitle}
                                variant="caption text"
                            >
                                This is the list of ingredients Lorem ipsum dolor sit
                                amet
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid xs={12} sm={6} item container alignItems="center">
                        <img
                            className={classes.mealImage}
                            src={meal1}
                            alt="Chef's Menu Logo"
                        />
                    </Grid>
                </Grid>
            </Box>
        </div>
    );
}

export default MealListItem;
