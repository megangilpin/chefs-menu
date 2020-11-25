import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Divider from "@material-ui/core/Divider";
import Avatar from "@material-ui/core/Avatar";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { theme } from "../themes/theme";
import { CartContext } from "../contexts/cart/CartContextProvider";

const useStyles = makeStyles({
    root: {
        maxWidth: 225,
        borderRadius: "0px",
        boxShadow: "0px 0px 10px 5px rgba(7,7,7,0.05)",
        margin: theme.spacing(3),
    },
    small: {
        marginTop: theme.spacing(0.5),
        marginBottom: theme.spacing(0.5),
        marginLeft: theme.spacing(1),
        width: theme.spacing(4),
        height: theme.spacing(4),
    },
    subtitle3: {
        fontSize: ".3rem",
        color: theme.palette.grey[600],
    },
    subtitle2: {
        fontWeight: "bold",
    },
    subtitle1: {
        fontWeight: "bold",
        fontSize: ".7rem",
    },
    subtitle: {
        fontWeight: "bold",
    },
});

function MealCard(props) {
    const classes = useStyles();
    const { chef, addToCart } = useContext(CartContext);
    const { mealPic, title, price, chefName, chefPic, location, id, chefId } = props;

    const addMeal = (e) => {
        e.preventDefault();
        const id = parseFloat(e.currentTarget.value);
        if (chef && chefId !== chef) {
            console.log(chef);
            alert("cart can only have one chef");
        } else {
            const meal = { id, mealPic, title, price, chefName, chefId };
            addToCart(meal, id);
        }
    };

    return (
        <div>
            <Card className={classes.root}>
                <CardMedia
                    component="img"
                    alt="meal1"
                    height="150"
                    image={mealPic}
                    title="meal1"
                />
                <CardContent>
                    <Typography gutterBottom className={classes.subtitle}>
                        {title}
                    </Typography>
                    <Typography
                        gutterBottom
                        className={classes.subtitle1}
                        color="secondary"
                    >
                        {price}
                    </Typography>
                </CardContent>
                <Divider />
                <CardActions>
                    <Grid container spacing={1}>
                        <Grid item>
                            <Avatar
                                className={classes.small}
                                alt={chefName}
                                src={chefPic}
                            />
                        </Grid>
                        <Grid item xs={12} sm container alignItems="center">
                            <Grid item xs container direction="column" spacing={2}>
                                <Grid item xs>
                                    <Typography
                                        className={classes.subtitle2}
                                        variant="subtitle1"
                                    >
                                        {chefName}
                                    </Typography>
                                    <Typography
                                        className={classes.subtitle3}
                                        gutterBottom
                                    >
                                        {location}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item>
                            <Button value={id} color="primary" onClick={addMeal}>
                                add to Cart
                            </Button>
                        </Grid>
                    </Grid>
                </CardActions>
            </Card>
        </div>
    );
}

export default MealCard;
