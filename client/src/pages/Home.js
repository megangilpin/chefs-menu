import React from "react";
import SideBar from "../components/SideBar";
import Main from "../components/Main";
import { Typography } from "@material-ui/core";
import { UserContext } from "../contexts/user/UserContextProvider";
import ProfileImage from "../components/ProfileImage";

function Home(props) {
    const user = React.useContext(UserContext);

    return (
        <React.Fragment>
            <SideBar>
                <Typography>Side Bar</Typography>
                <Typography>{user.profile.email}</Typography>
            </SideBar>
            <Main>
                <ProfileImage />
            </Main>
        </React.Fragment>
    );
}

export default Home;
