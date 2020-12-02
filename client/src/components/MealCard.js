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
    Box,
    Typography,
    Grid,
    Link,
    IconButton,
    Dialog,
    DialogContent,
    DialogContentText,
    DialogTitle,
    DialogActions,
} from "@material-ui/core";
import { theme } from "../themes/theme";
import { CartContext } from "../contexts/cart/CartContextProvider";
import { dollarFormatter } from "../lib/utils";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles({
    root: {
        maxWidth: 225,
        borderRadius: "0px",
        boxShadow: "0px 0px 10px 5px rgba(7,7,7,0.05)",
        margin: theme.spacing(3),
    },
    replacement: {
        height: 150,
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        margin: 0,
    },
    small: {
        marginTop: theme.spacing(0.5),
        marginBottom: theme.spacing(0.5),
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

function MealCard({ picURL, title, price, id, chefId }) {
    const classes = useStyles();
    const history = useHistory();
    const { chef, addToCart } = useContext(CartContext);
    const [openDialog, setDialogOpen] = React.useState(false);
    const chefInfo = chefId.userId;

    const handleClose = () => {
        setDialogOpen(false);
    };

    const purchaseMeal = (e) => {
        e.preventDefault();

        if (chef && chefId._id !== chef) {
            setDialogOpen(true);
        } else {
            const chefName = `${chefInfo.firstName} ${chefInfo.lastName}`;
            const chefID = chefId._id;
            const meal = { id, picURL, title, price, chefName, chefID };
            addToCart(meal);
        }
    };

    return (
        <>
            <Card className={classes.root}>
                {picURL ? (
                    <CardMedia
                        component="img"
                        alt="meal1"
                        height="150"
                        image={picURL}
                        title="meal1"
                    />
                ) : (
                    <React.Fragment>
                        <CardContent className={classes.replacement}>
                            <Typography
                                color="primary"
                                align="center"
                                variant="subtitle2"
                            >
                                The chef is still cooking up an image
                            </Typography>
                        </CardContent>
                        <Divider />
                    </React.Fragment>
                )}
                <CardContent>
                    <Grid container direction="row" spacing={2}>
                        <Grid item xs={8}>
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
                        </Grid>
                        <Grid
                            item
                            xs={4}
                            container
                            justify="flex-end"
                            alignContent="center"
                        >
                            <IconButton
                                value={id}
                                color="primary"
                                variant="contained"
                                size="small"
                                onClick={purchaseMeal}
                            >
                                <AddShoppingCartIcon />
                            </IconButton>
                        </Grid>
                    </Grid>
                </CardContent>
                <Divider />
                <CardActions>
                    <Box ml={1} mr={1}>
                        <Grid container spacing={1}>
                            <Grid item container spacing={2}>
                                <Grid item>
                                    <Avatar
                                        className={classes.small}
                                        alt={!chefInfo.profilePicURL ? "" : "Chef"}
                                        src={chefInfo.profilePicURL}
                                    />
                                </Grid>
                                <Grid item xs={12} sm container alignItems="center">
                                    <Grid item container direction="column">
                                        <Grid item>
                                            <Typography
                                                className={classes.subtitle}
                                                variant="subtitle1"
                                            >
                                                {`${chefInfo.firstName} ${chefInfo.lastName}`}
                                            </Typography>
                                            <Typography
                                                className={classes.subtitle2}
                                                gutterBottom
                                            >
                                                {`${chefInfo.primaryAddress.city}, ${chefInfo.primaryAddress.country}`}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={12}>
                                <Link
                                    component="button"
                                    variant="body2"
                                    onClick={() =>
                                        history.push({
                                            pathname: "/chefprofile",
                                            state: {
                                                ...chefInfo,
                                                chefProfile: {
                                                    _id: chefId._id,
                                                    cuisineSpecialties:
                                                        chefId.cuisineSpecialties,
                                                },
                                            },
                                        })
                                    }
                                >
                                    Learn More
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
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
        </>
    );
}

export default MealCard;
