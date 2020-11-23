import React from "react";
import Main from "../components/Main";
import ProfilePic from "../components/ImageLoader";

function Profile(props) {
    return (
        <React.Fragment>
            <Main>
                <ProfilePic></ProfilePic>
            </Main>
        </React.Fragment>
    );
}

export default Profile;
