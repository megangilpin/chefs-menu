import React, { useState, createContext, useEffect } from "react";

const UserContext = createContext({ user: {}, auth: false });

const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [auth, setAuth] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const fetchUser = () => {
        setIsLoading(true);
        fetch("/users/user", {
            method: "get",
        })
            .then((res) => {
                setIsLoading(false);
                // setUser(res);
            })
            .catch((err) => {
                console.log(err);
                setIsLoading(false);
            });
    };

    useEffect(() => {
        fetchUser();
        return () => {};
    }, [auth]);

    return (
        <UserContext.Provider value={{ user, auth: false }}>
            {children}
        </UserContext.Provider>
    );
};

export { UserContext, UserProvider };
