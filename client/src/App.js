import React from "react";
import { ThemeProvider } from "@material-ui/core/styles";
import { BrowserRouter, Route, Redirect } from "react-router-dom";

import { theme } from "./themes/theme";
import LoginSignUp from "./pages/LoginSignUp";

function App() {
    return (
        <ThemeProvider theme={theme}>
            <BrowserRouter>
                <Route path="/">
                    <Redirect to="/signup" />
                </Route>
                <Route path="/login" component={LoginSignUp} />
                <Route path="/signup" component={LoginSignUp} />
            </BrowserRouter>
        </ThemeProvider>
    );
}

export default App;
