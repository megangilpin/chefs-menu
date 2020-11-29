import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { CartContext } from "../contexts/cart/CartContextProvider";
import { Typography, Grid, Box, IconButton, Paper } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import ClearIcon from "@material-ui/icons/Clear";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import { dollarFormatter } from "../lib/utils";

const useStyles = makeStyles((theme) => ({
    mealCard: {
        minHeight: "300px",
        maxWidth: "800px",
        // boxShadow: "0px 0px 10px 5px rgba(7,7,7,0.07)",
        overflow: "auto",
    },
    mealImage: {
        width: "100%",
        maxHeight: "300px",
        objectFit: "cover",
    },
    box: {
        color: "#ffff",
        background: theme.background.secondary,
    },
    editRow: {
        textAlign: "right",
    },
    editButton: {
        marginRight: theme.spacing(2),
    },
    subtitle: {
        color: theme.palette.grey[500],
    },
}));

function MenuItem(props) {
    const classes = useStyles();
    const { chef, addToCart } = useContext(CartContext);
    const {
        mealPic,
        title,
        price,
        chefName,
        id,
        chefId,
        ingredients,
        requirements,
    } = props.meal;

    const addMeal = (e) => {
        e.preventDefault();
        const id = parseFloat(e.currentTarget.value);
        if (chef && chefId !== chef) {
            alert(
                `Your cart currently contains meals from another chef. You can only checkout with meals from one chef`
            );
        } else {
            const meal = { id, mealPic, title, price, chefName, chefId };
            addToCart(meal, id);
        }
    };

    return (
        <div>
            <Box className={classes.mealCard} p={2}>
                <Grid
                    spacing={1}
                    container
                    direction="row"
                    justify="center"
                    alignItems="stretch"
                >
                    <Grid className={classes.editRow} item xs={12}>
                        {props.canEdit ? (
                            <React.Fragment>
                                <IconButton
                                    color="primary"
                                    variant="contained"
                                    className={classes.editButton}
                                >
                                    <EditIcon />
                                </IconButton>
                                <IconButton
                                    color="primary"
                                    variant="contained"
                                    className={classes.editButton}
                                >
                                    <ClearIcon />
                                </IconButton>
                            </React.Fragment>
                        ) : (
                            <IconButton
                                value={id}
                                color="primary"
                                variant="contained"
                                onClick={addMeal}
                            >
                                <AddShoppingCartIcon />
                            </IconButton>
                        )}
                    </Grid>
                    <Grid
                        xs={12}
                        sm={6}
                        spacing={2}
                        item
                        container
                        direction="column"
                    >
                        <Grid item container direction="row">
                            <Box
                                className={classes.box}
                                mb={1}
                                p={1}
                                fontWeight="fontWeightBold"
                            >
                                <Typography>Meal for 1</Typography>
                            </Box>
                        </Grid>
                        <Grid item>
                            <Typography variant="h5">{title}</Typography>

                            <Typography color="primary" variant="subtitle1">
                                {dollarFormatter.format(price / 100)}
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant="subtitle2">INGREDIENTS</Typography>
                            <Typography
                                className={classes.subtitle}
                                variant="subtitle2"
                            >
                                {ingredients}
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant="subtitle2">
                                REQUIRED STUFF
                            </Typography>
                            <Typography
                                className={classes.subtitle}
                                variant="subtitle2"
                            >
                                {requirements}
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid xs={12} sm={6} item container alignItems="center">
                        <img
                            className={classes.mealImage}
                            src={mealPic}
                            alt="Meal Picture"
                        />
                    </Grid>
                </Grid>
            </Box>
        </div>
    );
}

export default MenuItem;
