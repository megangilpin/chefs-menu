import * as React from "react";
import { ThemeProvider } from "@material-ui/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import {
    BrowserRouter,
    Route,
    Redirect,
    Switch,
    HashRouter,
} from "react-router-dom";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { theme } from "./themes/theme";
import LoginSignUp from "./pages/LoginSignUp";
import Page from "./components/Page";
import { UserContext } from "../src/contexts/user/UserContextProvider";
import { SnackbarProvider } from "notistack";
import UserProfile from "./pages/UserProfile";
import EditProfile from "./pages/EditProfile";
import ChefSearch from "./pages/ChefSearch";
import ChefProfile from "./pages/ChefProfile";
import Chat from "./pages/Chat";
import Meals from "./pages/Meals";
import Checkout from "./pages/Checkout";

function App() {
    const user = React.useContext(UserContext);

    const DefaultRoutes = () => (
        <Page>
            <Switch>
                <ProtectedRoute exact path="/meals" component={Meals} />
                <ProtectedRoute exact path="/profile" component={UserProfile} />
                <ProtectedRoute exact path="/editprofile" component={EditProfile} />
                <ProtectedRoute exact path="/chefs" component={ChefSearch} />
                <ProtectedRoute path="/chats/:chatId" component={Chat} />
                <ProtectedRoute path="/chats" component={Chat} />
                <ProtectedRoute
                    exact
                    path="/chefs/:chefId"
                    component={ChefProfile}
                />
                <ProtectedRoute exact path="/checkout" component={Checkout} />
                <ProtectedRoute
                    exact
                    path="/chefprofile/:id"
                    component={ChefProfile}
                />
            </Switch>
        </Page>
    );

    return (
        <ThemeProvider theme={theme}>
            <SnackbarProvider>
                <CssBaseline />
                <HashRouter>
                    <Route path="/">
                        {user.isAuthenticated ? (
                            <Redirect to="/meals" />
                        ) : (
                            <Redirect to="/signup" />
                        )}
                    </Route>
                    <Switch>
                        <Route path="/signup" component={LoginSignUp} />
                        <Route path="/login" component={LoginSignUp} />
                        <Route component={DefaultRoutes} />
                    </Switch>
                </HashRouter>
            </SnackbarProvider>
        </ThemeProvider>
    );
}

export default App;
