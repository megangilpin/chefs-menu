import React from "react";
import Main from "../components/Main";
import ProfilePic from "../components/ImageLoader";
import { Typography } from "@material-ui/core";
import { UserContext } from "../contexts/user/UserContextProvider";

function Profile(props) {
    const user = React.useContext(UserContext);

    return (
        <React.Fragment>
            <Main>
                <ProfilePic></ProfilePic>
            </Main>
        </React.Fragment>
    );
}

export default Profile;
