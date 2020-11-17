import React from 'react';
import {Redirect, Route} from 'react-router-dom';
import { UserContext } from "../contexts/UserContextProvider";

export const ProtectedRoute = ({component: Component, ...rest}) => {
  const user = React.useContext(UserContext);
  return (
    <Route 
      {...rest} 
      render={props => {
        if(user.profile) {
          return <Component {...props} />;
        } else {
          return (
            <Redirect to={{ pathname: "/signup", state: {from: props.location}}} />
          );
        }
      }}
    />
  );
}