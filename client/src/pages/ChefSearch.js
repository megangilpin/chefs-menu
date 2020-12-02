import React, { useEffect, useState, useContext } from "react";
import ResponsiveSideBar from "../components/ResponsiveSideBar";
import ChefCard from "../components/ChefCard";
import Main from "../components/Main";
import { Typography, Button, Grid, TextField, Toolbar } from "@material-ui/core";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { UserContext } from "../contexts/user/UserContextProvider";
import { abortableFetch } from "../utils";
import useCuisineSelector from "../lib/useCuisineSelector";

const useStyles = makeStyles({
    availableChefs: { paddingBottom: "15px", display: "inline", fontSize: "30px" },
    drawerContainer: {
        paddingLeft: "20px",
        paddingRight: "20px",
        paddingTop: "100px",
        overflow: "auto",
        height: "100vh",
    },
});

function ChefSearch() {
    const classes = useStyles();
    const {
        ALL,
        cuisines,
        availableCuisines,
        addCuisine,
        removeCuisine,
    } = useCuisineSelector();
    const { profile } = useContext(UserContext);
    const {
        primaryAddress: { city, region, country },
    } = profile;
    const location = [city, region, country].join(", ");
    const [radiusKm, setRadiusKm] = useState(100);
    const [chefs, setChefs] = useState([]);
    const handleChangeRadiusKm = ({ target }) =>
        target.value > 0 && setRadiusKm(target.value);

    useEffect(() => {
        let url = `/search?searchType=chefs&radiusKm=${radiusKm}`;
        if (!cuisines.has(ALL)) {
            url = `${url}&cuisine=` + [...cuisines].join(",");
        }
        const { ready, abort } = abortableFetch(url);
        ready
            .then((res) => res.json())
            .then((res) => res.chefs)
            .then(setChefs)
            // ignore any errors
            .catch(() => {});
        return abort;
    }, [radiusKm, cuisines]);

    return (
        <>
            <ResponsiveSideBar>
                <div className={classes.drawerContainer}>
                    <Grid container spacing={2} alignContent="flex-start">
                        <Grid item xs={12}>
                            <Typography>Location:</Typography>
                            <TextField
                                value={location}
                                fullWidth
                                variant="outlined"
                                type="text"
                                disabled={true}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Typography>Radius in Km:</Typography>
                            <TextField
                                value={radiusKm}
                                fullWidth
                                variant="outlined"
                                type="number"
                                onChange={handleChangeRadiusKm}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Typography>Cuisine:</Typography>
                            {[...cuisines].map((cuisine) => (
                                <Button
                                    key={cuisine}
                                    color="primary"
                                    variant="contained"
                                    onClick={() => removeCuisine(cuisine)}
                                >
                                    <Typography variant="button">
                                        {cuisine}
                                    </Typography>
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
                                    <Typography variant="button">
                                        {cuisine}
                                    </Typography>
                                </Button>
                            ))}
                        </Grid>
                    </Grid>
                </div>
            </ResponsiveSideBar>
            <Main>
                <Grid container spacing={4} alignContent="flex-start">
                    <Grid item xs={12}>
                        <Typography className={classes.availableChefs}>
                            Available Chefs:
                        </Typography>
                    </Grid>
                    {chefs.map((chef) => (
                        <ChefCard {...chef} key={chef._id} />
                    ))}
                </Grid>
            </Main>
        </>
    );
}

export default ChefSearch;
