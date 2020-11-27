// WILL MOVE ADD TO CART BUTTON ONCE CHEF PROFILE PAGE IS CREATED
import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
    Card,
    Divider,
    Avatar,
    CardActions,
    CardContent,
    CardMedia,
    Button,
    Typography,
    Grid,
    Dialog,
    DialogContent,
    DialogContentText,
    DialogTitle,
    DialogActions,
} from "@material-ui/core";
import { theme } from "../themes/theme";
import { CartContext } from "../contexts/cart/CartContextProvider";
import { dollarFormatter } from "../lib/utils";

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
    subtitle2: {
        fontSize: ".3rem",
        color: theme.palette.grey[600],
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
    const [openDialog, setDialogOpen] = React.useState(false);

    const handleClickOpen = () => {
        setDialogOpen(true);
    };

    const handleClose = () => {
        setDialogOpen(false);
    };
    const addMeal = (e) => {
        e.preventDefault();
        const id = parseFloat(e.currentTarget.value);
        if (chef && chefId !== chef) {
            setDialogOpen(true);
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
                        {/* assuming we save price in cents on DB */}
                        {dollarFormatter.format(price / 100)}
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
                                        className={classes.subtitle}
                                        variant="subtitle1"
                                    >
                                        {chefName}
                                    </Typography>
                                    <Typography
                                        className={classes.subtitle2}
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

export default MealCard;
