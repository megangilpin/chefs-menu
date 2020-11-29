import React, { useEffect, useState, useContext } from "react";
import ResponsiveSideBar from "../components/ResponsiveSideBar";
import ChefCard from "../components/ChefCard";
import Main from "../components/Main";
import { Typography, Button, Grid, TextField } from "@material-ui/core";
import { UserContext } from "../contexts/user/UserContextProvider";
import { abortableFetch, consoleErrorNonAbortErrors } from "../utils";

const ALL = "ALL";

const AllCuisines = [
    "AMERICAN",
    "BRITISH",
    "CARIBBEAN",
    "CHINESE",
    "FRENCH",
    "GREEK",
    "INDIAN",
    "ITALIAN",
    "MEDITERRANEAN",
    "MEXICAN",
    "MORROCAN",
    "SPANISH",
    "THAI",
    "TURKISH",
    "VIETNAMESE",
];

function ChefSearch(props) {
    const { profile } = useContext(UserContext);
    const {
        primaryAddress: { city, region, country },
    } = profile;
    const location = [city, region, country].join(", ");
    const [radiusKm, setRadiusKm] = useState(100);
    const [cuisines, setCuisines] = useState(new Set([ALL]));
    const [availableCuisines, setAvailableCuisines] = useState(new Set(AllCuisines));
    const [results, setResults] = useState({
        chefs: [],
        chefMeals: {},
    });

    const handleChangeRadiusKm = ({ target }) =>
        target.value > 0 && setRadiusKm(target.value);

    const removeCuisine = (cuisine) => {
        console.log("remove", cuisine);
        const newCuisines = new Set(cuisines);
        const newAvailableCuisines = new Set(availableCuisines);
        newCuisines.delete(cuisine);
        newAvailableCuisines.add(cuisine);
        if (newCuisines.size === 0) {
            newCuisines.add(ALL);
        }
        setCuisines(newCuisines);
        setAvailableCuisines(newAvailableCuisines);
    };

    const addCuisine = (cuisine) => {
        console.log("add", cuisine);
        if (cuisine === ALL) {
            setCuisines(new Set([ALL]));
            setAvailableCuisines(new Set(AllCuisines));
        } else {
            const newCuisines = new Set(cuisines);
            const newAvailableCuisines = new Set(availableCuisines);
            newCuisines.add(cuisine);
            newAvailableCuisines.delete(cuisine);
            if (newCuisines.has(ALL)) {
                newCuisines.delete(ALL);
                newAvailableCuisines.add(ALL);
            }
            setCuisines(newCuisines);
            setAvailableCuisines(newAvailableCuisines);
        }
    };

    useEffect(() => {
        let url = `/search?searchType=chefs&radiusKm=${radiusKm}`;
        if (!cuisines.has(ALL)) {
            url = `${url}&cuisine=` + [...cuisines].join(",");
        }
        const { ready, abort } = abortableFetch(url);
        ready
            .then((res) => res.json())
            .then(setResults)
            .catch(consoleErrorNonAbortErrors);
        return abort;
    }, [radiusKm, cuisines]);

    return (
        <React.Fragment>
            <ResponsiveSideBar>
                <Grid item xs={12} container spacing={2} alignContent="flex-start">
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
            <Main>
                <Grid
                    item
                    xs={12}
                    container
                    spacing={4}
                    style={{ paddingBottom: "15px" }}
                >
                    <Typography variant="h4">Available Chefs:</Typography>
                </Grid>
                <Grid item xs={12} container spacing={4} alignContent="flex-start">
                    {results.chefs.map((chef) => (
                        <ChefCard {...chef} key={chef._id} />
                    ))}
                </Grid>
            </Main>
        </React.Fragment>
    );
}

export default ChefSearch;
