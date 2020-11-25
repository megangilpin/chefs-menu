import * as React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Toolbar, Card, Divider, Button } from "@material-ui/core";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import DeleteIcon from "@material-ui/icons/Delete";
import MealCard from "../components/MealCard";
import { CartContext } from "../contexts/cart/CartContextProvider";
import meals from "../lib/mockedMeals";

const useStyles = makeStyles((theme) => ({
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    container: {
        display: "flex",
    },
    card: {
        padding: theme.spacing(1),
        width: "300px",
    },
}));

function Main(props) {
    const classes = useStyles();
    const {
        chefName,
        cart,
        totalPrice,
        totalItems,
        updateCartItem,
        deleteCartItem,
    } = React.useContext(CartContext);

    const updateQuantity = (e) => {
        e.preventDefault();
        const { name } = e.currentTarget;
        const id = parseFloat(e.currentTarget.value);
        updateCartItem(id, name);
    };

    const deleteMeal = (e) => {
        e.preventDefault();
        const id = parseFloat(e.currentTarget.value);
        deleteCartItem(id);
    };

    return (
        <div className={classes.content}>
            <Toolbar />
            <div className={classes.container}>
                {meals.map((meal) => {
                    return (
                        <MealCard
                            key={meal.id}
                            id={meal.id}
                            mealPic={meal.mealPic}
                            title={meal.title}
                            price={meal.price}
                            chefName={meal.chefName}
                            chefId={meal.chefId}
                            chefPic={meal.chefPic}
                            location={meal.location}
                        />
                    );
                })}
            </div>
            <div className={classes.container}>
                <Card className={classes.card}>
                    <Grid item xs={12}>
                        <Typography variant="h6" className={classes.title}>
                            Cart
                        </Typography>
                        <Typography variant="h6" className={classes.title}>
                            {chefName}
                        </Typography>
                        <Divider />
                        <div className={classes.demo}>
                            <List>
                                {cart.map((meal, index) => {
                                    return (
                                        <ListItem key={index}>
                                            <ListItemAvatar>
                                                <Avatar src={meal.mealPic} />
                                            </ListItemAvatar>
                                            <ListItemText
                                                primary={meal.title}
                                                secondary={
                                                    meal.quanity ? null : (
                                                        <React.Fragment>
                                                            <Button
                                                                value={meal.id}
                                                                name="add"
                                                                color="primary"
                                                                onClick={
                                                                    updateQuantity
                                                                }
                                                            >
                                                                +
                                                            </Button>
                                                            {meal.quantity}
                                                            <Button
                                                                value={meal.id}
                                                                name="minus"
                                                                color="primary"
                                                                onClick={
                                                                    updateQuantity
                                                                }
                                                            >
                                                                -
                                                            </Button>
                                                        </React.Fragment>
                                                    )
                                                }
                                            />
                                            <ListItemSecondaryAction>
                                                <IconButton
                                                    value={meal.id}
                                                    edge="end"
                                                    aria-label="delete"
                                                    onClick={deleteMeal}
                                                >
                                                    <DeleteIcon />
                                                </IconButton>
                                            </ListItemSecondaryAction>
                                        </ListItem>
                                    );
                                })}
                            </List>
                        </div>
                        <Divider />
                        <Typography>Total: {totalPrice}</Typography>
                        <Typography>Total Items: {totalItems}</Typography>
                    </Grid>
                </Card>
            </div>
        </div>
    );
}

export default Main;
