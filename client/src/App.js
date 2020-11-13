import React from "react";
import { ThemeProvider } from "@material-ui/core/styles";
import { BrowserRouter, Route, Redirect } from "react-router-dom";

import { theme } from "./themes/theme";
import Login from "./pages/LoginSignUp";
import SignUp from "./pages/SignUp";

function App() {
    return (
        <ThemeProvider theme={theme}>
            <BrowserRouter>
                <Route path="/">
                    <Redirect to="/signup" />
                </Route>

                <Route path="/login" component={Login} />
                <Route path="/signup" component={Login} />
            </BrowserRouter>
        </ThemeProvider>
    );
}

export default App;
