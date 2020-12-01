import React from "react";
import ResponsiveSideBar from "../components/ResponsiveSideBar";
import Main from "../components/Main";
import { Typography } from "@material-ui/core";

import SetUpStripe from "../components/SetUpStripe";

function Home(props) {
    return (
        <React.Fragment>
            <ResponsiveSideBar>
                <Typography>Responsive Side Bar</Typography>
            </ResponsiveSideBar>
            <Main>
                <SetUpStripe />
            </Main>
        </React.Fragment>
    );
}

export default Home;
