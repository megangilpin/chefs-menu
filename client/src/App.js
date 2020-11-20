import * as React from "react";
import { ThemeProvider } from "@material-ui/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { theme } from "./themes/theme";
import LoginSignUp from "./pages/LoginSignUp";
import Home from "./pages/Home";
import Page from "./components/Page";

function App() {
    const DefaultRoutes = () => {
        return (
            <div>
                <Page>
                    <Switch>
                        <ProtectedRoute exact path="/home" component={Home} />
                    </Switch>
                </Page>
            </div>
        );
    };

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <BrowserRouter>
                <Route path="/">
                    <Redirect to="/home" />
                </Route>
                <Switch>
                    <Route path="/login" component={LoginSignUp} />
                    <Route path="/signup" component={LoginSignUp} />
                    <Route component={DefaultRoutes} />
                </Switch>
            </BrowserRouter>
        </ThemeProvider>
    );
}

export default App;
