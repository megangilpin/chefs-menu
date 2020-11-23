import React from "react";
import Main from "../components/Main";
import ProfileImage from "../components/ProfileImage";
import { Typography } from "@material-ui/core";
import { UserContext } from "../contexts/user/UserContextProvider";

function Profile(props) {
    const user = React.useContext(UserContext);

    return (
        <React.Fragment>
            <Main>
                <ProfileImage></ProfileImage>
            </Main>
        </React.Fragment>
    );
}

export default Profile;
