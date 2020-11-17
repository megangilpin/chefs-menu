import React from "react";
import SideBar from "../components/SideBar";
import Main from "../components/Main";
import { Typography } from "@material-ui/core";

function Home(props) {
    return (
        <React.Fragment>
            <SideBar>
                <Typography>Side Bar</Typography>
            </SideBar>
            <Main>
                <Typography>Main</Typography>
            </Main>
        </React.Fragment>
    );
}

export default Home;
