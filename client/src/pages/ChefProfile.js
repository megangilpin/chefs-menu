import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { UserContext } from "../contexts/user/UserContextProvider";
import ResponsiveSideBar from "../components/ResponsiveSideBar";
import Main from "../components/Main";
import MealListItem from "../components/MealListItem";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { Avatar, Typography, Grid, Box, Divider, Button } from "@material-ui/core";
import { sizing } from "@material-ui/system";
import meal1 from "../images/meal1.png";
import meal2 from "../images/meal2.png";
import meal3 from "../images/meal3.png";
import chef1 from "../images/profilePic.png";

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        flexDirection: "column",
        height: "100%",
        justifyContent: "space-between",
    },
    header: {
        marginBottom: theme.spacing(9),
        position: "relative",
    },
    headerImage: {
        width: "100%",
        height: "30%",
    },
    userImage: {
        width: theme.spacing(15),
        height: theme.spacing(15),
        border: "5px solid white",
        position: "absolute",
        top: "200px",
    },
    subtitle: {
        color: theme.palette.grey[600],
    },
    line: {
        background: theme.background.secondary,
        height: "2px",
        width: "50px",
    },
    footer: {
        alignSelf: "flex-end",
        fontWeight: "bold",
        height: "100px",
        width: "100%",
        margin: 0,
    },
    mealCard: {
        minHeight: "300px",
        minWidth: "500px",
        maxWidth: "800px",
        boxShadow: "0px 0px 10px 5px rgba(7,7,7,0.07)",
        overflow: "auto",
    },
    mealImage: {
        width: "100%",
        maxHeight: "300px",
    },
    box: {
        color: "#ffff",
        background: theme.background.secondary,
    },
    subtitle2: {
        fontWeight: "bold",
    },
}));

function ChefProfile(props) {
    const user = React.useContext(UserContext);
    const classes = useStyles();

    return (
        <React.Fragment>
            <ResponsiveSideBar icon={<AccountCircleIcon fontSize="large" />}>
                <div className={classes.root}>
                    <div>
                        <Grid
                            className={classes.header}
                            container
                            direction="column"
                            justify="center"
                            alignItems="center"
                            xs={12}
                        >
                            <img className={classes.headerImage} src={meal1}></img>
                            <Box
                                boxShadow={2}
                                component={Avatar}
                                src={user.profile.profilePicURL}
                                alt={
                                    user.profile.profilePicURL ? "profile image" : ""
                                }
                                className={classes.userImage}
                            />
                        </Grid>
                        <Grid
                            container
                            direction="column"
                            justify="center"
                            alignItems="center"
                            className={classes.container2}
                        >
                            <Grid
                                item
                                container
                                direction="column"
                                justify="center"
                                alignItems="center"
                            >
                                <Typography variant="h6">{`${user.profile.firstName}  ${user.profile.lastName}`}</Typography>
                                <Typography
                                    className={classes.subtitle}
                                    variant="caption text"
                                >{`${user.profile.primaryAddress.city}, ${user.profile.primaryAddress.country}`}</Typography>
                            </Grid>
                            <Grid item>
                                <Box mt={3} mb={3}>
                                    <Divider className={classes.line} />
                                </Box>
                            </Grid>
                            <Grid item>
                                <Typography variant="body">
                                    <Box mb={2}>{user.profile.bio}</Box>
                                </Typography>
                            </Grid>
                        </Grid>
                    </div>
                    <div>
                        <Button
                            color="primary"
                            variant="contained"
                            className={classes.footer}
                        >
                            Send Request
                        </Button>
                    </div>
                </div>
            </ResponsiveSideBar>
            <Main>
                <MealListItem />
            </Main>
        </React.Fragment>
    );
}

export default ChefProfile;
