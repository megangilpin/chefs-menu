import React from "react";

/* ---------- CUSTOM COMPONENTS---------- */
import Container from "../components/Container";
import Item from "../components/Item";

/* ---------- MATERIAL UI ---------- */
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";


/* ---------- REACT ROUTER DOM ---------- */
import { Link } from "react-router-dom";

export default function Login(props) {
  // const classes = useStyles();

  return (
    <Container>
      <Item xs={4}>Login</Item>
      <Item xs={8}>
        <Typography variant="body1">Don't have an account? </Typography>
        <Button component={Link} to={"/signup"}>
          Sign Up
        </Button>
      </Item>
    </Container>
  );
}
