import React from "react";
import { MuiThemeProvider } from "@material-ui/core";
import { BrowserRouter, Route, Redirect } from "react-router-dom";

import { theme } from "./themes/theme";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <BrowserRouter>
        <Route path="/">
          <Redirect to="/signup" />
        </Route>

        <Route path="/login" component={Login} />
        <Route path="/signup" component={SignUp} />
      </BrowserRouter>
    </MuiThemeProvider>
  );
}

export default App;
