import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { UserContext } from "../contexts/user/UserContextProvider";
import ResponsiveSideBar from "../components/ResponsiveSideBar";
import Main from "../components/Main";
import MenuItem from "../components/MenuItem";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Formik, Form, Field } from "formik";
import ProfilePicLoader from "../components/ProfilePicLoader";
import {
    Avatar,
    Typography,
    Grid,
    Box,
    Divider,
    Button,
    List,
    ListItem,
} from "@material-ui/core";
import { sizing } from "@material-ui/system";
import meal1 from "../images/meal1.png";
import meal2 from "../images/meal2.png";
import meal3 from "../images/meal3.png";
import chef1 from "../images/profilePic.png";
import meals from "../lib/mockedMeals";
import AddMealButton from "../components/AddMealButton";

const useStyles = makeStyles((theme) => ({
    content: {
        display: "flex",
        justifyContent: "center",
    },
    sideBar: {
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
        objectFit: "cover",
    },
    userImage: {
        width: theme.spacing(15),
        height: theme.spacing(15),
        border: "5px solid white",
        position: "absolute",
        top: "155px",
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
    list: {
        boxShadow: "0px 0px 10px 5px rgba(7,7,7,0.07)",
        background: "#ffffff",
    },
    listItem: {
        borderBottom: "1px solid #DCDCDC",
    },
    // listItem: {
    //     ":last-child": {
    //         borderBottom: "none",
    //     },
    // },
    addImage: {
        width: "100%",
        objectFit: "cover",
    },
}));

function ChefProfile(props) {
    const user = React.useContext(UserContext);
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <React.Fragment>
            <ResponsiveSideBar icon={<AccountCircleIcon fontSize="large" />}>
                <div className={classes.sideBar}>
                    <div>
                        <Grid
                            className={classes.header}
                            container
                            direction="column"
                            justify="center"
                            alignItems="center"
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
                                    variant="caption"
                                >{`${user.profile.primaryAddress.city}, ${user.profile.primaryAddress.country}`}</Typography>
                            </Grid>
                            <Grid item>
                                <Box mt={3} mb={3}>
                                    <Divider className={classes.line} />
                                </Box>
                            </Grid>
                            <Grid item>
                                <Box mb={2}>
                                    <Typography variant="body1">
                                        {user.profile.bio}
                                    </Typography>
                                </Box>
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
                <Grid
                    spacing={10}
                    container
                    direction="column"
                    justify="center"
                    alignItems="center"
                    className={classes.color1}
                >
                    <Grid item>
                        <Typography variant="h5">Chef's Menu:</Typography>
                    </Grid>
                    <Grid item className={classes.color2}>
                        <Box mb={2}>
                            <AddMealButton />
                        </Box>
                        <List className={classes.list}>
                            {meals.map((meal) => {
                                return (
                                    <React.Fragment>
                                        <ListItem className={classes.listItem}>
                                            <MenuItem meal={meal} />
                                        </ListItem>
                                    </React.Fragment>
                                );
                            })}
                        </List>
                    </Grid>
                </Grid>
            </Main>
        </React.Fragment>
    );
}

export default ChefProfile;
