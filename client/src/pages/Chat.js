import React, { useContext } from "react";
import { useParams } from "react-router-dom";

import ResponsiveSideBar from "../components/ResponsiveSideBar";
import Main from "../components/Main";
import { Grid } from "@material-ui/core";
import { UserContext } from "../contexts/user/UserContextProvider";

function ChefSearch() {
    const { profile } = useContext(UserContext);
    const { chefId } = useParams();

    console.log('In caht page')

    return (
        <>
            <ResponsiveSideBar>
                <Grid container spacing={2} alignContent="flex-start">
                    <Grid item xs={12}>
                        {`Recent Chats for ${profile.email}`}
                    </Grid>
                </Grid>
            </ResponsiveSideBar>
            <Main>
                <Grid container spacing={4} alignContent="flex-start">
                    <Grid item xs={12}>
                        {`Selected chatId: ${chefId}`}
                    </Grid>
                    [chat history]
                </Grid>
            </Main>
        </>
    );
}

export default ChefSearch;
