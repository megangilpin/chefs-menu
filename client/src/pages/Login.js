import React from "react";

import { Link } from "react-router-dom";

import { Grid, Typography, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import rightBanner from "../images/login-signup-image.png";
import logo from "../images/logo.png";

import LoginForm from "../components/LoginForm";

const useStyles = makeStyles({
    screen: {
        minHeight: "100vh",
    },
    right: {
        backgroundImage: `url(${rightBanner})`,
        backgroundPosition: "center center",
        backgroundSize: "cover",
        textAlign: "right",
        padding: "5vh 5vh 10vh 5vw",
    },
    left: {
        textAlign: "left",
        padding: "5vh 5vh 10vh 5vw",
        height: "70vh",
    },
 
    bannerText: {
        color: "white",
    },
});

export default function SignUp(props) {
    const classes = useStyles();

    return (
        <Grid container className={classes.screen}>
            <Grid className={classes.left} container item xs={6}>
                <Grid item xs={12}>
                    <img
                        className={classes.logo}
                        src={logo}
                        alt="Chef's Menu Logo"
                    />
                </Grid>
                <Grid item container xs={12}>
                    <LoginForm />
                </Grid>
            </Grid>

            <Grid className={classes.right} container item xs={6} direction="row">
                <Grid item xs={8}>
                    <Typography className={classes.bannerText} variant="body1">
                        Don't have an account?{" "}
                    </Typography>
                </Grid>

                <Grid item xs={4}>
                    <Button
                        color="primary"
                        variant="contained"
                        component={Link}
                        to={"/signup"}
                    >
                        Sign Up
                    </Button>
                </Grid>
            </Grid>
        </Grid>
    );
}
