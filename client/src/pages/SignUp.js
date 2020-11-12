import React from "react";

/* ---------- MATERIAL UI ---------- */
import { Grid, Typography, Button } from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";

/* ---------- REACT ROUTER DOM ---------- */
import { Link } from "react-router-dom";

import bigImage from "../images/login-signup-image.png";

import LoginForm from "../components/LoginForm";

const useStyles = makeStyles({
  right: {
    backgroundImage: `url(${bigImage})`,
    backgroundPosition: "center center",
    backgroundSize: "cover",
    height: "100vh",
  },
  left: {
    marginTop: "10vh"
  }
});

export default function SignUp(props) {
  const classes = useStyles();
  const theme = useTheme();
  return (
    <Grid container spacing={4}>
      <Grid className={classes.left} container item xs={6} justify="center">
        <Grid container justify="center" item xs={12}>
          <LoginForm />
        </Grid>
      </Grid>
      <Grid className={classes.right} container item xs={6}>
        <Grid item xs={6}>
          <Typography variant="body1">Already a member? </Typography>
        </Grid>

        <Grid item xs={6}>
          <Button
            className={theme.MuiButton}
            component={Link}
            to={"/login"}
            variant="contained"
            color="primary"
          >
            Login
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
}
