import React from "react";
import ResponsiveSideBar from "../components/ResponsiveSideBar";
import Main from "../components/Main";
import { Typography } from "@material-ui/core";
import { UserContext } from "../contexts/user/UserContextProvider";
import MealCard from "../components/MealCard";

function Home(props) {
    const user = React.useContext(UserContext);

    return (
        <React.Fragment>
            <ResponsiveSideBar>
                <Typography>Side Bar</Typography>
                <Typography>{user.profile.email}</Typography>
            </ResponsiveSideBar>
            <Main>
                <MealCard />
            </Main>
        </React.Fragment>
    );
}

export default Home;
