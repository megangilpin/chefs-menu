import React from "react";


/* ---------- MATERIAL UI ---------- */
import { Grid, Typography, Button } from "@material-ui/core";
import { makeStyles, useTheme } from '@material-ui/core/styles';

/* ---------- REACT ROUTER DOM ---------- */
import { Link } from "react-router-dom";

import bigImage from "../images/login-signup-image.png";

import LoginForm from "../components/LoginForm";

const useStyles =  makeStyles({
  right: {
    backgroundImage: `url(${bigImage})`,
    backgroundPosition: "center center",
    backgroundSize: "cover",
    height: "100vh"
  }
})

export default function Login(props) {
  const classes = useStyles();
  const theme = useTheme();
  return (
    <Grid container spacing={6} justify="center" >

                <LoginForm/>



      <Grid className={classes.right} container item xs={6}>
        <Grid item xs={6}>
        <Typography  variant="body1">
          Don't have an account?{" "}
        </Typography>

        </Grid>

        <Grid item xs={6}>
        <Button className={theme.MuiButton} component={Link} to={"/signup"}
        variant="contained"
        color="primary">
          Sign Up
        </Button>
        </Grid>
      </Grid>
    </Grid>
  );
}
