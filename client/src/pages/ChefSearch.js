import React from "react";
import ResponsiveSideBar from "../components/ResponsiveSideBar";
import Main from "../components/Main";
import { Typography, Input, Grid, Box, TextField } from "@material-ui/core";
import { UserContext } from "../contexts/user/UserContextProvider";

function ChefSearch(props) {
    const { profile } = React.useContext(UserContext);
    const {
        primaryAddress: { city, region, country },
    } = profile;
    const userLocation = [city, region, country].join(", ");
    const [location, setLocation] = React.useState(userLocation);
    const [radiusKm, setRadiusKm] = React.useState(100);

    const handleChangeLocation = (e) => {
        // show suggestions using the auggestion API
    };

    const handleChangeRadiusKm = (e) => {
        // update redius
    };

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
                {"[Array of chefs]"}
            </Main>
        </React.Fragment>
    );
}

export default ChefSearch;
