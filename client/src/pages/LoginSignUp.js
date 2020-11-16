import React from "react";

import { Link, useLocation } from "react-router-dom";

import { Grid, Typography, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import rightBanner from "../images/login-signup-image.png";
import logo from "../images/logo.png";

import LoginForm from "../components/LoginForm";
import SignUpForm from "../components/SignUpForm";

const useStyles = makeStyles({
    screen: {
        minHeight: "100vh",
    },
    logo: {
        width: "100%",
        maxWidth: "300px",
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
        paddingBottom: "2vh",
        color: "white",
    },
});

export default function LoginSignUp(props) {
    const classes = useStyles();
    const location = useLocation();
    return (
        <Grid container className={classes.screen}>
            <Grid className={classes.left} container item xs={8} sm={6}>
                <Grid item xs={12}>
                    <img
                        className={classes.logo}
                        src={logo}
                        alt="Chef's Menu Logo"
                    />
                </Grid>
                <Grid item container xs={12}>
                    {location.pathname === "/login" ? <LoginForm /> : <SignUpForm />}
                </Grid>
            </Grid>

            <Grid
                className={classes.right}
                container
                alignContent="flex-start"
                item
                xs={4}
                sm={6}
            >
                <Grid item xs={12}  >
                    <Typography className={classes.bannerText} variant="body1">
                        {location.pathname === "/login"
                            ? "Don't have an account?"
                            : "Already a member?"}
                    </Typography>
                </Grid>

                <Grid item xs={12} >
                    <Button
                        color="primary"
                        variant="contained"
                        component={Link}
                        to={location.pathname === "/signup" ? "/login" : "/signup"}
                    >
                        {location.pathname === "/signup" ? "Sign In" : "Sign Up"}
                    </Button>
                </Grid>
            </Grid>
        </Grid>
    );
}
