import React from "react";
import ResponsiveSideBar from "../components/ResponsiveSideBar";
import Main from "../components/Main";
import { Typography } from "@material-ui/core";
import { UserContext } from "../contexts/user/UserContextProvider";

function ChefSearch(props) {
    const { profile } = React.useContext(UserContext);
    const { primaryAddress: { city, region, country } } = profile;
    const location = [city, region, country].join(', ');

    return (
        <React.Fragment>
            <ResponsiveSideBar>
                <Typography>LOCATION:</Typography>
                <Typography>{location}</Typography>
                <Typography>RADIUS:</Typography>
                <Typography>{'100km'}</Typography>
            </ResponsiveSideBar>
            <Main>
                <Typography>Available Chefs:</Typography>
                {'[Array of chefs]'}
            </Main>
        </React.Fragment>
    );
}

export default ChefSearch;
