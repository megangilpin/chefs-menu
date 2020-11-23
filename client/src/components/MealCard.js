import React from "react";
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
import meal1 from "../images/meal1.png";
import chef1 from "../images/chef1.png";
import { theme } from "../themes/theme";

const useStyles = makeStyles({
    root: {
        maxWidth: 225,
        borderRadius: "0px",
        boxShadow: "0px 0px 10px 5px rgba(7,7,7,0.05)",
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
    const addToCart = (e) => {
        e.preventDefault();
        console.log(e.currentTarget.value);
    };
    return (
        <div>
            <Card className={classes.root}>
                <CardMedia
                    component="img"
                    alt="meal1"
                    height="150"
                    image={meal1}
                    title="meal1"
                />
                <CardContent>
                    <Typography gutterBottom className={classes.subtitle}>
                        4 specialty rolls
                    </Typography>
                    <Typography
                        gutterBottom
                        className={classes.subtitle1}
                        color="secondary"
                        cd
                    >
                        $15.00
                    </Typography>
                </CardContent>
                <Divider />
                <CardActions>
                    <Grid container spacing={1}>
                        <Grid item>
                            <Avatar
                                className={classes.small}
                                alt="Atsushi Mikazuki"
                                src={chef1}
                            />
                        </Grid>
                        <Grid item xs={12} sm container alignItems="center">
                            <Grid item xs container direction="column" spacing={2}>
                                <Grid item xs>
                                    <Typography
                                        className={classes.subtitle2}
                                        variant="subtitle"
                                    >
                                        Atsushi Mikazuki
                                    </Typography>
                                    <Typography
                                        className={classes.subtitle3}
                                        gutterBottom
                                    >
                                        Toronto, Canada
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item>
                            <Button value="123" color="primary" onClick={addToCart}>
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
