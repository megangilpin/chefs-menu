import React, { useContext } from "react";
import { useParams } from "react-router-dom";

import ResponsiveSideBar from "../components/ResponsiveSideBar";
import Main from "../components/Main";
import Message from "../components/Message";
import { Grid } from "@material-ui/core";
import { UserContext } from "../contexts/user/UserContextProvider";

function ChefSearch() {
    const { profile } = useContext(UserContext);
    const userId = "245";
    const { chefId } = useParams();

    console.log("In caht page");

    const messages = [
        {
            sender: "123",
            receiver: "",
            message: "Hi Christine! Thank you for your order!",
            createdAt: "",
        },
        {
            sender: "345",
            receiver: "",
            message:
                "Hi Atsushi! I will be waiting for you tomorrow at the new location.",
            createdAt: "",
        },
        {
            sender: "345",
            receiver: "",
            message: "3250 Dufferin St, North York",
            createdAt: "",
        },
    ];

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
                    {messages.map(({ sender, message, createdAt }) => (
                        <Message
                            senderMsg={userId === sender}
                            message={message}
                            createdAt={createdAt}
                        />
                    ))}
                </Grid>
            </Main>
        </>
    );
}

export default ChefSearch;
