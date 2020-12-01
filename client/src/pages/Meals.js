// TEMPORARY PAGE WITH RECIPES WILL BE REMOVED WHEN CHEF PROFILE PAGE IS CREATED
import React, { useState, useEffect } from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import ResponsiveSideBar from "../components/ResponsiveSideBar";
import Main from "../components/Main";
import { Typography, Grid, Button } from "@material-ui/core";
import MealCard from "../components/MealCard";
import useCuisineSelector from "../lib/useCuisineSelector";
import { abortableFetch } from "../utils";

const useStyles = makeStyles({
    availableMeals: { paddingBottom: "15px", display: "inline", fontSize: "30px" },
});

function Meals() {
    const classes = useStyles();
    const {
        ALL,
        cuisines,
        availableCuisines,
        addCuisine,
        removeCuisine,
    } = useCuisineSelector();

    const [meals, setMeals] = useState([]);

    useEffect(() => {
        let url = "/search?searchType=meals";
        if (!cuisines.has(ALL)) {
            url = `${url}&cuisine=` + [...cuisines].join(",");
        }
        const { ready, abort } = abortableFetch(url);
        ready
            .then((res) => res.json())
            .then((res) => res.meals)
            .then(setMeals)
            // ignore any errors
            .catch(() => {});
        return abort;
    }, [cuisines]);

    return (
        <Main>
            <ResponsiveSideBar>
                <Grid container spacing={2} alignContent="flex-start">
                    <Grid item xs={12}>
                        <Typography>Cuisine:</Typography>
                        {[...cuisines].map((cuisine) => (
                            <Button
                                key={cuisine}
                                color="primary"
                                variant="contained"
                                onClick={() => removeCuisine(cuisine)}
                            >
                                <Typography variant="button">{cuisine}</Typography>
                            </Button>
                        ))}
                    </Grid>
                    <Grid item xs={12}>
                        {[...availableCuisines].map((cuisine) => (
                            <Button
                                key={cuisine}
                                variant="contained"
                                onClick={() => addCuisine(cuisine)}
                            >
                                <Typography variant="button">{cuisine}</Typography>
                            </Button>
                        ))}
                    </Grid>
                </Grid>
            </ResponsiveSideBar>
            <Grid container spacing={4} alignContent="flex-start">
                <Grid item xs={12}>
                    <Typography className={classes.availableMeals}>
                        Available Meals:
                    </Typography>
                </Grid>
                {meals.map((meal) => (
                    <MealCard
                        key={meal._id}
                        id={meal._id}
                        {...meal}
                    />
                ))}
            </Grid>
        </Main>
    );
}

export default Meals;
