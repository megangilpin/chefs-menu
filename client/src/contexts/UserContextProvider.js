import * as React from "react";

const UserContext = React.createContext();

const UserContextProvider = ({ children }) => {
    const [profile, setProfile] = React.useState(null);

    return (
        <UserContext.Provider value={{profile, setProfile}}>
            {children}
        </UserContext.Provider>
    );
};

export { UserContext, UserContextProvider };
