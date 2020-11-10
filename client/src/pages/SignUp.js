import React from "react";
import Container from "../components/Container";
import Item from "../components/Item";

/* ---------- MATERIAL UI ---------- */
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { Typography } from "@material-ui/core";

/* ---------- REACT ROUTER DOM ---------- */
import { Route, Link } from "react-router-dom";

export default function SignUp(props) {
  // const classes = useStyles();

  return (
    <Container>
      <Item xs={4}>SignUp</Item>
      <Item xs={8}>
        <Typography variant="body1">Already a member? </Typography>
        <Button component={Link} to={"/login"}>
          Sign In
        </Button>
      </Item>
    </Container>
  );
}
