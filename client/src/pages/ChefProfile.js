import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useLocation } from "react-router-dom";
import { UserContext } from "../contexts/user/UserContextProvider";
import ResponsiveSideBar from "../components/ResponsiveSideBar";
import Main from "../components/Main";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { Avatar, Typography, Grid, Box, Divider, Button } from "@material-ui/core";
import MenuItem from "../components/MenuItem";
import MealForm from "../components/MealForm";
import UpdateChef from "../components/UpdateChef";

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
        height: "225px",
        objectFit: "cover",
    },
    headerPlaceHolder: {
        width: "100%",
        height: "225px",
        background: theme.background.secondary,
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
        background: "#ffffff",
    },
    box: {
        color: "#ffff",
        background: theme.background.secondary,
    },
}));

function ChefProfile(props) {
    const location = useLocation();
    const user = React.useContext(UserContext);
    const classes = useStyles();
    const [meals, setMeals] = React.useState([]);
    const [mealFormOpen, setMealFormOpen] = React.useState(false);
    // const [chefInfo, setChefInfo] = React.useState({ ...location.state });
    const chefInfo = location.state ? location.state : user.profile;
    const currentChef = { ...user.profile.chefProfile };
    const headerImage = { ...meals[0] };

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

    const getMeals = async (chefId) => {
        const response = await fetch(`/meals/chef/${chefId}`, {
            method: "get",
            headers: {
                "Content-Type": "application/json",
            },
        });

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
        formValues.chefId = chefInfo.chefProfile._id;

        const response = await fetch("/meals", {
            method: "post",
            body: JSON.stringify(formValues),
            headers: {
                "Content-Type": "application/json",
            },
        });

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
        const id = location.state
            ? location.state.chefProfile._id
            : user.profile.chefProfile._id;
        const meals = async () => await getMeals(id);
        meals().catch((error) => {
            console.log(error);
        });
    }, [location]);

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
                            {headerImage.picURL === undefined ? (
                                <div className={classes.headerPlaceHolder}></div>
                            ) : (
                                <img
                                    className={classes.headerImage}
                                    src={headerImage.picURL}
                                    alt="meal"
                                ></img>
                            )}
                            <Box
                                boxShadow={2}
                                component={Avatar}
                                src={chefInfo.profilePicURL}
                                alt={chefInfo.profilePicURL ? "profile image" : ""}
                                className={classes.userImage}
                            />
                        </Grid>
                        <Grid
                            container
                            spacing={2}
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
                                    {`${chefInfo.firstName}  ${chefInfo.lastName}`}
                                </Typography>
                                <Typography
                                    className={classes.subtitle}
                                    variant="caption"
                                >
                                    {chefInfo.primaryAddress &&
                                        `${chefInfo.primaryAddress.city}, ${chefInfo.primaryAddress.country}`}
                                </Typography>
                            </Grid>
                            <Grid
                                item
                                container
                                spacing={2}
                                direction="row"
                                justify="center"
                                alignItems="center"
                            >
                                {chefInfo.chefProfile.cuisineSpecialty.length > 0
                                    ? chefInfo.chefProfile.cuisineSpecialty.map(
                                          (specialty, index) => (
                                              <Grid item>
                                                  <Box
                                                      key={index}
                                                      className={classes.box}
                                                      p={1}
                                                      fontWeight={"fontWeightBold"}
                                                  >
                                                      <Typography>
                                                          {specialty}
                                                      </Typography>
                                                  </Box>
                                              </Grid>
                                          )
                                      )
                                    : null}
                            </Grid>
                            <Grid item>
                                <Box mt={1} mb={1}>
                                    <Divider className={classes.line} />
                                </Box>
                            </Grid>
                            <Grid item>
                                <Box mb={3}>
                                    <Typography variant="body1">
                                        {chefInfo.bio}
                                    </Typography>
                                </Box>
                            </Grid>
                        </Grid>
                    </div>
                    <div>
                        {chefInfo.chefProfile._id !== currentChef._id ? (
                            <Button
                                color="primary"
                                variant="contained"
                                className={classes.footer}
                            >
                                Send Request
                            </Button>
                        ) : (
                            <UpdateChef />
                        )}
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
                    >
                        <Grid item>
                            <Typography variant="h5">
                                {chefInfo.chefProfile._id !== currentChef._id ? (
                                    <Box mt={5} fontWeight="fontWeightBold">
                                        {`${chefInfo.firstName}'s`} Menu:
                                    </Box>
                                ) : (
                                    <Box mt={5} fontWeight="fontWeightBold">
                                        Your Menu:
                                    </Box>
                                )}
                            </Typography>
                        </Grid>
                        <Grid item>
                            {chefInfo.chefProfile._id !== currentChef._id ? null : (
                                <Box mb={2} mr={0}>
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
                            )}
                            {!meals.length > 0 ? (
                                <Typography color="primary">
                                    No Meals Available
                                </Typography>
                            ) : (
                                <Box className={classes.list}>
                                    {meals.map((meal) => {
                                        return (
                                            <React.Fragment key={meal._id}>
                                                <Box className={classes.listItem}>
                                                    <MenuItem
                                                        update={getMeals}
                                                        isOpen={mealFormOpen}
                                                        open={handleMealFormOpen}
                                                        close={handleMealFormClose}
                                                        meal={meal}
                                                        canEdit={true}
                                                    />
                                                </Box>
                                            </React.Fragment>
                                        );
                                    })}
                                </Box>
                            )}
                        </Grid>
                    </Grid>
                </React.Fragment>
            </Main>
        </React.Fragment>
    );
}

export default ChefProfile;
