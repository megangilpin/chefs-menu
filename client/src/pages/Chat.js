import React, { useContext, useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";

import ResponsiveSideBar from "../components/ResponsiveSideBar";
import Main from "../components/Main";
import Message from "../components/Message";
import { Grid, Typography, Box, Input, Button } from "@material-ui/core";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { UserContext } from "../contexts/user/UserContextProvider";
import { abortableFetch } from "../utils";

const useStyles = makeStyles({
    drawerContainer: {
        paddingLeft: "20px",
        paddingRight: "20px",
        paddingTop: "100px",
        overflow: "auto",
        height: "100vh",
    },
    input: {
        width: "100%",
    },
});

function ChefSearch() {
    const classes = useStyles();
    const { profile } = useContext(UserContext);
    const { chatId } = useParams();
    const [chats, setChats] = useState([]);
    const [messages, setMessages] = useState({
        userId1: {},
        userId2: {},
        messages: [],
    });
    const inputEl = useRef(null);

    console.log({ chats, messages });

    useEffect(() => {
        let url = "/messages";
        const { ready, abort } = abortableFetch(url);
        ready
            .then((res) => res.json())
            .then(setChats)
            // ignore any errors
            .catch(() => {});
        return abort;
    }, []);

    useEffect(() => {
        let url = `/messages/${chatId}`;
        const { ready, abort } = abortableFetch(url);
        ready
            .then((res) => res.json())
            .then(setMessages)
            // ignore any errors
            .catch(() => {});
        return abort;
    }, [chats]);

    const sendMsg = () => {
        fetch(`/messages/${chatId}`, {
            method: "put",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                sender: messages.userId1._id,
                receiver: messages.userId2._id,
                message: inputEl.current.value,
            }),
        })
            .then((res) => res.json())
            .then(setMessages)
            // ignore any errors
            .catch(() => {});
        console.log("sending Msg: ", inputEl.current.value);
    };

    return (
        <>
            <ResponsiveSideBar>
                <div className={classes.drawerContainer}>
                    <Grid container spacing={2} alignContent="flex-start">
                        <Grid item xs={12}>
                            {`Recent Chats for ${profile.email}`}
                        </Grid>
                        {chats.map(({ userId2 }) => (
                            <Grid item xs={12} key={userId2}>
                                <Box mb={3}>
                                    <Typography variant="h5">
                                        {`${userId2.firstName}  ${userId2.lastName}`}
                                    </Typography>
                                </Box>
                            </Grid>
                        ))}
                    </Grid>
                </div>
            </ResponsiveSideBar>
            <Main>
                {chatId ? (
                    <Grid container spacing={4} alignContent="flex-start">
                        <Grid item xs={12}>
                            {`Selected chatId: ${chatId}`}
                        </Grid>
                        {messages &&
                            messages.messages &&
                            messages.messages.map(
                                ({ sender, message, createdAt }, key) => (
                                    <Message
                                        key={key}
                                        senderMsg={profile._id === sender}
                                        message={message}
                                        createdAt={createdAt}
                                    />
                                )
                            )}
                        <Grid item xs={12}>
                            <input
                                className={classes.input}
                                ref={inputEl}
                                type="text"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                color="primary"
                                variant="contained"
                                onClick={sendMsg}
                            >
                                Send
                            </Button>
                        </Grid>
                    </Grid>
                ) : (
                    "Please select a chat to see conversation"
                )}
            </Main>
        </>
    );
}

export default ChefSearch;
