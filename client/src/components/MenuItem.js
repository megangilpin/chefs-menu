import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { UserContext } from "../contexts/user/UserContextProvider";
import { CartContext } from "../contexts/cart/CartContextProvider";
import {
    Button,
    Box,
    Typography,
    Grid,
    IconButton,
    Dialog,
    DialogContent,
    DialogContentText,
    DialogTitle,
    DialogActions,
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import ClearIcon from "@material-ui/icons/Clear";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import { dollarFormatter } from "../lib/utils";
import MealForm from "../components/MealForm";

const useStyles = makeStyles((theme) => ({
    mealCard: {
        maxHeight: "auto",
        width: "100%",
        maxWidth: "800px",
        overflow: "auto",
    },
    mealImage: {
        maxWidth: "100%",
        maxHeight: "500px",
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
    const user = React.useContext(UserContext);
    const { chef, addToCart } = useContext(CartContext);
    const [mealFormOpen, setMealFormOpen] = React.useState(false);
    const [openDialog, setDialogOpen] = React.useState(false);
    const chefProfile = { ...user.profile.chefProfile };

    const {
        title,
        price,
        chefName,
        chefId,
        ingredients,
        requirements,
        picURL,
        servingSize,
    } = props.meal;
    const id = props.meal._id;

    const purchaseMeal = (e) => {
        e.preventDefault();
        const chefID = chefId;
        const meal = { id, picURL, title, price, chefName, chefID };
        if (chef && chefId !== chef) {
            setDialogOpen(true);
        } else {
            addToCart(meal, id);
        }
    };

    const deleteMeal = async (e) => {
        e.preventDefault();
        const response = await fetch(`/meals/${id}`, {
            method: "delete",
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
            props.update(chefProfile._id);
        }
    };

    const editMeal = async (formValues) => {
        const response = await fetch(`/meals/${id}`, {
            method: "put",
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
            props.update(chefProfile._id);
            handleMealFormClose();
        }
    };

    const handleMealFormOpen = () => {
        setMealFormOpen(true);
    };

    const handleMealFormClose = () => {
        setMealFormOpen(false);
    };

    const handleClose = () => {
        setDialogOpen(false);
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
                        {chefProfile._id === chefId ? (
                            <React.Fragment>
                                <IconButton
                                    onClick={handleMealFormOpen}
                                    color="primary"
                                    variant="contained"
                                    className={classes.editButton}
                                >
                                    <EditIcon />
                                </IconButton>
                                {/* Dialog Box with Form for adding / updating meal */}
                                <MealForm
                                    update={props.update}
                                    isOpen={mealFormOpen}
                                    open={handleMealFormOpen}
                                    close={handleMealFormClose}
                                    meal={props.meal}
                                    onSubmit={editMeal}
                                />
                                <IconButton
                                    color="primary"
                                    variant="contained"
                                    className={classes.editButton}
                                    onClick={deleteMeal}
                                >
                                    <ClearIcon />
                                </IconButton>
                            </React.Fragment>
                        ) : (
                            <IconButton
                                value={id}
                                color="primary"
                                variant="contained"
                                onClick={purchaseMeal}
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
                                fontWeight={"fontWeightBold"}
                            >
                                <Typography>{servingSize}</Typography>
                            </Box>
                        </Grid>
                        <Grid item>
                            <Typography variant="h5">
                                <Box fontWeight="fontWeightBold">{title}</Box>
                            </Typography>

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
                            <Box mb={2}>
                                <Typography variant="subtitle2">
                                    REQUIRED STUFF
                                </Typography>
                                <Typography
                                    className={classes.subtitle}
                                    variant="subtitle2"
                                >
                                    {requirements
                                        ? `${requirements}`
                                        : "No Meal Requirements"}
                                </Typography>
                            </Box>
                        </Grid>
                    </Grid>
                    <Grid xs={12} sm={6} item container alignItems="center">
                        {!picURL ? (
                            <Box className={classes.mealImage}>
                                <Typography color="primary" variant="subtitle2">
                                    The chef is still cooking up an image
                                </Typography>
                            </Box>
                        ) : (
                            <img
                                className={classes.mealImage}
                                src={picURL}
                                alt="Meal"
                            />
                        )}
                    </Grid>
                </Grid>
            </Box>
            <Dialog
                open={openDialog}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Your cart already contains meals from another chef!"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        A meal order can only contain meals from the same chef. If
                        you would like to select this meal please empty your current
                        cart or complete your purchase and start another order.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Got it!
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default MenuItem;
