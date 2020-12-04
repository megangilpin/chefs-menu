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
        height: "35px",
        fontSize: "20px",
    },
});

function ChefSearch() {
    const classes = useStyles();
    const { profile } = useContext(UserContext);
    const [chatId, setchatId] = useState(useParams().chatId);
    const [chats, setChats] = useState([]);
    const [messages, setMessages] = useState({
        userId1: {},
        userId2: {},
        messages: [],
    });
    const inputEl = useRef(null);

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
        if (!chatId) return;
        let url = `/messages/${chatId}`;
        const { ready, abort } = abortableFetch(url);
        ready
            .then((res) => res.json())
            .then(setMessages)
            // ignore any errors
            .catch(() => {});
        return abort;
    }, [chatId, chats]);

    const sendMsg = () => {
        const message = inputEl.current.value;
        inputEl.current.value = "";
        let receiver;
        let sender;
        const { userId1, userId2 } = messages;
        if (userId1._id === profile._id) {
            sender = messages.userId1._id;
            receiver = messages.userId2._id;
        } else {
            sender = messages.userId2._id;
            receiver = messages.userId1._id;
        }

        console.log({ sender, receiver });

        fetch(`/messages/${chatId}`, {
            method: "put",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                sender,
                receiver,
                message,
            }),
        })
            .then((res) => res.json())
            .then(setMessages)
            // ignore any errors
            .catch(() => {});
    };

    return (
        <>
            <ResponsiveSideBar>
                <div className={classes.drawerContainer}>
                    <Grid container spacing={2} alignContent="flex-start">
                        <Grid item xs={12}>
                            {`Recent Chats for ${profile.email}`}
                        </Grid>
                        {chats.map(({ userId1, userId2, _id }) => {
                            const receiver =
                                userId1._id === profile._id ? userId2 : userId1;
                            return (
                                <Grid
                                    item
                                    xs={12}
                                    key={_id}
                                    onClick={() => setchatId(_id)}
                                >
                                    <Box mb={3}>
                                        <Typography variant="h5">
                                            {`${receiver.firstName}  ${receiver.lastName}`}
                                        </Typography>
                                    </Box>
                                </Grid>
                            );
                        })}
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
                                placeholder="Write a message..."
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
