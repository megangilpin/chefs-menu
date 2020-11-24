import React from "react";
import Main from "../components/Main";
import ProfileImage from "../components/ProfileImage";

function Profile(props) {
    return (
        <React.Fragment>
            <Main>
                <ProfileImage></ProfileImage>
            </Main>
        </React.Fragment>
    );
}

export default Profile;
