import React from "react";
import { Redirect, Route } from "react-router-dom";
import { Backdrop, CircularProgress } from "@material-ui/core";
import { UserContext } from "../contexts/user/UserContextProvider";

export const ProtectedRoute = ({ component: Component, ...rest }) => {
    const user = React.useContext(UserContext);
    const renderedComponent = (props) => user.isLoading
        ? <>
            <Component {...props} />
            <Backdrop open={true}>
                <CircularProgress color="inherit" />
            </Backdrop>
        </>
        : user.isAuthenticated
            ? <Component {...props} />
            : <Redirect to={{
                pathname: "/signup",
                state: { from: props.location }
            }} />

    return <Route {...rest} render={renderedComponent} />;
};
