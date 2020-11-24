import React from "react";
import SideBar from "../components/SideBar";
import Main from "../components/Main";
import { Typography } from "@material-ui/core";
import { UserContext } from "../contexts/user/UserContextProvider";
import MealCard from "../components/MealCard";
import ResponsiveSideBar from "../components/ResponsiveSideBar";

function Home(props) {
    const user = React.useContext(UserContext);

    return (
        <React.Fragment>
            <ResponsiveSideBar>
                <Typography>Responsive Side Bar</Typography>
            </ResponsiveSideBar>
            <Main>
                <MealCard></MealCard>
            </Main>
        </React.Fragment>
    );
}

export default Home;
