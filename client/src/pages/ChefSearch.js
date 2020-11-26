import React, { useEffect } from "react";
import ResponsiveSideBar from "../components/ResponsiveSideBar";
import Main from "../components/Main";
import { Typography, Input, Grid, Box, TextField } from "@material-ui/core";
import { UserContext } from "../contexts/user/UserContextProvider";
import { abortableFetch, consoleErrorNonAbortErrors } from "../utils";

function ChefSearch(props) {
    const { profile } = React.useContext(UserContext);
    const {
        primaryAddress: { city, region, country },
    } = profile;
    const userLocation = [city, region, country].join(", ");
    const [location, setLocation] = React.useState(userLocation);
    const [radiusKm, setRadiusKm] = React.useState(100);
    const [results, setResults] = React.useState({
        chefs: [],
        chefMeals: {},
    });

    const handleChangeLocation = (e) => {
        // TODO: show suggestions using the auggestion API
    };

    const handleChangeRadiusKm = ({ target }) =>
        target.value > 0 && setRadiusKm(target.value);

    useEffect(() => {
        const { ready, abort } = abortableFetch(
            `/search?searchType=chefs&radiusKm=${radiusKm}`
        );
        ready
            .then((res) => res.json())
            .then(setResults)
            .catch(consoleErrorNonAbortErrors);
        return abort;
    }, [radiusKm]);

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
                            onChange={handleChangeLocation}
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
                </Grid>
            </ResponsiveSideBar>
            <Main>
                <Typography>Available Chefs:</Typography>
                <Typography>
                    {results.chefs.map((chef) => (
                        <span key={chef._id}>{JSON.stringify(chef, null, 4)}</span>
                    ))}
                </Typography>
            </Main>
        </React.Fragment>
    );
}

export default ChefSearch;
