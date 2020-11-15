import React,{ useState, createContext } from "react";

const loadedUser =   {
    firstName: "Megan",
    lastName: "Gilpin",
    password: "1234",
    email: "megangilpin@gmail.com",
    primaryAddress: {
      street: "3692 Broadway",
      city: "New York",
      region: "New York",
      postalCode: "10031",
      country: "United States",
    },
    auth: false
  }

const UserContext = createContext(null)

const UserProvider = ({ children }) => {
    const [user, setUser] = useState(loadedUser);

    return (
        <UserContext.Provider value={user}>
            {children}
        </UserContext.Provider>
    );
}

export { UserContext, UserProvider };
