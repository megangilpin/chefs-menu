import * as React from "react";
import { SET_USER, LOGOUT } from "../types";



const initialState = {
    isAuthenticated: false,
    profile: null,
};

const UserReducer = (state, action) => {
    switch (action.type) {
        case SET_USER:
            return {
                ...state,
                isAuthenticated: true,
                profile: action.payload.user,
            };
        case LOGOUT:
            return {
                ...state,
                isAuthenticated: false,
                profile: null,
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
            dispatch({ type: SET_USER, payload: data });
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
            dispatch({ type: SET_USER, payload: data });
            return { result: true };
        }
    };

    const checkLogin = async () => {
        const response = await fetch("/auth/user", {
            method: "get",
            credentials: 'include',
        });

        const data = await response.json();

        if (data.user) {
            dispatch({ type: SET_USER, payload: data });
        } else {
            dispatch({type: LOGOUT, payload: null})
        }
    };

    React.useEffect(() => {
        const checkCookie = async () => await checkLogin();
        checkCookie().catch((error) => {
            console.log(error)
        })
    }, [])

    return (
        <UserContext.Provider value={{ ...state, register, login }}>
            {children}
        </UserContext.Provider>
    );
};

export { UserContext, UserContextProvider };
