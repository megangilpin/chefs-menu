import * as React from "react";
import { SIGN_UP, LOGIN, LOGOUT } from "../types";

const initialState = {
    isAuthenticated: false,
    profile: {
        _id: "",
        email: "",
        favoriteCuisine: [],
        isChef: false,
        primaryAddress: {},
        profileImage: "",
    },
    token: null,
};

const UserReducer = (state, action) => {
    switch (action.type) {
        case SIGN_UP:
        case LOGIN:
            return {
                ...state,
                isAuthenticated: true,
                profile: {
                    _id: action.payload.user._id,
                    email: action.payload.user.email,
                    favoriteCuisine: action.payload.user.favoriteCuisine,
                    isChef: action.payload.user.isChef,
                    primaryAddress: {},
                    profileImage: "",
                },
                token: action.payload.token,
            };
        case LOGOUT:
            return {
                ...state,
                isAuthenticated: false,
                profile: null,
                token: null,
            };
        default:
            return state;
    }
};

const UserContext = React.createContext(initialState);

const UserContextProvider = ({ children }) => {
    const [state, dispatch] = React.useReducer(UserReducer, initialState);

    const register = async (formValues) => {
        const response = await fetch("/auth/register", {
            method: "post",
            body: JSON.stringify(formValues),
            headers: {
                "Content-Type": "application/json",
            },
        });

        const data = await response.json();

        if (!data.user) {
            return {
                result: false,
                message: data.errors,
            };
        } else {
            dispatch({ type: SIGN_UP, payload: data });
            return { result: true };
        }
    };

    const login = async (formValues) => {
        const response = await fetch("/auth/login", {
            method: "post",
            body: JSON.stringify(formValues),
            headers: {
                "Content-Type": "application/json",
            },
        });

        const data = await response.json();

        if (!data.user) {
            return {
                result: false,
                message: data.errors,
            };
        } else {
            console.log(data);
            dispatch({ type: LOGIN, payload: data });
            return { result: true };
        }
    };

    return (
        <UserContext.Provider value={{ ...state, register, login }}>
            {children}
        </UserContext.Provider>
    );
};

export { UserContext, UserContextProvider };
