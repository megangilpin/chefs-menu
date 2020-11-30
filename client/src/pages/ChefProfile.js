import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { UserContext } from "../contexts/user/UserContextProvider";
import { useParams } from "react-router-dom";
import ResponsiveSideBar from "../components/ResponsiveSideBar";
import Main from "../components/Main";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { Avatar, Typography, Grid, Box, Divider, Button } from "@material-ui/core";
import meal1 from "../images/meal1.png";
import MenuItem from "../components/MenuItem";
import { List, ListItem } from "@material-ui/core";
import MealForm from "../components/MealForm";

const useStyles = makeStyles((theme) => ({
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
    content: {
        display: "flex",
        justifyContent: "center",
    },
    list: {
        boxShadow: "0px 0px 10px 5px rgba(7,7,7,0.07)",
        background: "#ffffff",
    },
    listItem: {
        borderBottom: "1px solid #DCDCDC",
    },
    addImage: {
        width: "100%",
        objectFit: "cover",
    },
}));

function ChefProfile(props) {
    const user = React.useContext(UserContext);
    const classes = useStyles();
    const { chefId } = useParams();
    const [meals, setMeals] = React.useState([]);
    const [mealFormOpen, setMealFormOpen] = React.useState(false);
    const initialMeal = {
        title: "",
        price: "",
        servingSize: "",
        cuisineType: "",
        ingredients: "",
        requirements: "",
    };

    const handleMealFormOpen = () => {
        setMealFormOpen(true);
    };

    const handleMealFormClose = () => {
        setMealFormOpen(false);
    };

    const getMeals = async () => {
        const response = await fetch(`/meals/chef/${chefId}`, {
            method: "get",
            headers: {
                "Content-Type": "application/json",
            },
        });

        // console.log(await response.json());
        const data = await response.json();
        if (data.errors) {
            return {
                result: false,
                message: data.errors,
            };
        } else {
            setMeals(data);
        }
    };

    const createMeal = async (formValues) => {
        formValues.chefId = user.profile.chefProfile._id;

        const response = await fetch("/meals", {
            method: "post",
            body: JSON.stringify(formValues),
            headers: {
                "Content-Type": "application/json",
            },
        });

        // console.log(await response.json());
        const data = await response.json();
        if (data.errors) {
            return {
                result: false,
                message: data.errors,
            };
        } else {
            return {
                result: true,
                message: "Meal successfully added to menu",
            };
        }
    };

    React.useEffect(() => {
        const meals = async () => await getMeals();
        meals().catch((error) => {
            console.log(error);
        });
    }, []);

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
                                <Typography variant="h6">
                                    {`${user.profile.firstName}  ${user.profile.lastName}`}
                                </Typography>
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
                <React.Fragment>
                    <Grid
                        spacing={10}
                        container
                        direction="column"
                        justify="center"
                        alignItems="center"
                        className={classes.color1}
                    >
                        <Grid item>
                            <Typography variant="h5">
                                <Box mt={5} fontWeight="fontWeightBold">
                                    {props.chefName} Menu:
                                </Box>
                            </Typography>
                        </Grid>
                        <Grid item className={classes.color2}>
                            <Box mb={2}>
                                {/* Dialog Box with Form for adding / updating meal */}
                                <MealForm
                                    update={getMeals}
                                    isOpen={mealFormOpen}
                                    open={handleMealFormOpen}
                                    close={handleMealFormClose}
                                    meal={initialMeal}
                                    onSubmit={createMeal}
                                />
                                <Button
                                    color="primary"
                                    variant="contained"
                                    onClick={handleMealFormOpen}
                                >
                                    Add Meal
                                </Button>
                            </Box>
                            <List className={classes.list}>
                                {meals.map((meal) => {
                                    return (
                                        <React.Fragment>
                                            <ListItem className={classes.listItem}>
                                                <MenuItem
                                                    update={getMeals}
                                                    isOpen={mealFormOpen}
                                                    open={handleMealFormOpen}
                                                    close={handleMealFormClose}
                                                    meal={meal}
                                                    canEdit={true}
                                                />
                                            </ListItem>
                                        </React.Fragment>
                                    );
                                })}
                            </List>
                        </Grid>
                    </Grid>
                </React.Fragment>
            </Main>
        </React.Fragment>
    );
}

export default ChefProfile;
