import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { UserContext } from "../contexts/user/UserContextProvider";
import MenuItem from "./MenuItem";
import {
    Typography,
    Grid,
    Box,
    Divider,
    Button,
    List,
    ListItem,
} from "@material-ui/core";
import meal1 from "../images/meal1.png";
import meals from "../lib/mockedMeals";
import AddMealButton from "../components/AddMealButton";

const useStyles = makeStyles((theme) => ({
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

const ChefsMenu = (props) => {
    const user = React.useContext(UserContext);
    const classes = useStyles();

    return (
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
                            {props.chefName}'s Menu:
                        </Box>
                    </Typography>
                </Grid>
                <Grid item className={classes.color2}>
                    {props.currentChef ? (
                        <Box mb={2}>
                            <AddMealButton />
                        </Box>
                    ) : null}
                    <List className={classes.list}>
                        {meals.map((meal) => {
                            return (
                                <React.Fragment>
                                    <ListItem className={classes.listItem}>
                                        <MenuItem
                                            currentChef={props.currentChef}
                                            meal={meal}
                                        />
                                    </ListItem>
                                </React.Fragment>
                            );
                        })}
                    </List>
                </Grid>
            </Grid>
        </React.Fragment>
    );
};

export default ChefsMenu;
