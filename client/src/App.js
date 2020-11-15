import React, { useContext } from "react";
import { ThemeProvider } from '@material-ui/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { BrowserRouter, Route, Redirect } from "react-router-dom";
import { UserContext } from "./components/UserContext";
import { theme } from "./themes/theme";
import LoginSignUp from "./pages/LoginSignUp";
import Dashboard from "./pages/Dashboard";

function App() {
    const user = useContext(UserContext);

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <BrowserRouter>
                <Route path="/">
                    {!user.user ? 
                        <Redirect to="/signup" /> :
                        <Redirect to="/dashboard" />
                    }
                </Route>
                <Route path="/login" component={LoginSignUp} />
                <Route path="/signup" component={LoginSignUp} />
                <Route path="/dashboard" component={Dashboard} />
            </BrowserRouter>
        </ThemeProvider>
    );
}

export default App;
