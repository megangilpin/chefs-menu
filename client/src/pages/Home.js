import React from "react";
import SideBar from "../components/SideBar";
import Main from "../components/Main";
import { Typography } from "@material-ui/core";
import { UserContext } from "../contexts/user/UserContextProvider";

function Home(props) {
    const user = React.useContext(UserContext);

    return (
        <React.Fragment>
            <SideBar>
                <Typography>Side Bar</Typography>
                <Typography>{user.profile.email}</Typography>
            </SideBar>
            <Main>
                <Typography>Main</Typography>
            </Main>
        </React.Fragment>
    );
}

export default Home;
