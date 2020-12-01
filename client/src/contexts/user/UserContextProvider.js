import * as React from "react";
import { SET_USER, LOGOUT, SET_IS_LOADING, SET_PROFILE_IMAGE } from "../types";

const initialState = {
    isAuthenticated: false,
    profile: {
        email: "",
        primaryAddress: {},
        favoriteCuisine: [],
        allergies: [],
    },
    isLoading: true,
};

const UserReducer = (state, action) => {
    switch (action.type) {
        case SET_USER:
            return {
                ...state,
                isLoading: false,
                isAuthenticated: true,
                profile: action.payload.user,
                chefProfile: action.payload.chef,
            };
        case LOGOUT:
            return {
                ...state,
                isLoading: false,
                isAuthenticated: false,
                profile: null,
            };
        case SET_IS_LOADING:
            return {
                ...state,
                isLoading: action.payload,
            };
        case SET_PROFILE_IMAGE:
            return {
                ...state,
                profile: {
                    ...state.profile,
                    profilePicURL: action.payload,
                },
            };
        default:
            return state;
    }
};

const UserContext = React.createContext(initialState);

const UserContextProvider = ({ children }) => {
    const [state, dispatch] = React.useReducer(UserReducer, initialState);

    const isLoading = (data) => {
        data = !!data;
        dispatch({ type: SET_IS_LOADING, payload: data });
    };

    const register = async (formValues) => {
        isLoading(true);
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
        isLoading(true);
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
        isLoading(true);
        const response = await fetch("/users", {
            method: "get",
            credentials: "include",
        });

        const data = await response.json();

        if (data.user) {
            dispatch({ type: SET_USER, payload: data });
        } else {
            dispatch({ type: LOGOUT, payload: null });
        }
    };

    const uploadProfileImage = async (formData) => {
        const response = await fetch("/users/profileImageUpload", {
            method: "post",
            body: formData,
        });

        const data = await response.json();

        if (data.errors) {
            return {
                result: false,
                message: data.errors,
            };
        } else {
            dispatch({ type: SET_PROFILE_IMAGE, payload: data });
            return {
                result: true,
            };
        }
    };
    const logoutUser = async () => {
        dispatch({ type: LOGOUT, payload: null });
    };

    const updateUser = async (formValues) => {
        isLoading(true);
        const response = await fetch("/users", {
            method: "put",
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

    const getStripeOnboardingLink = async () => {
        const response = await fetch("/stripe/onboardinglink");
        const data = response.json();

        if (!data) {
            return {
                result: false,
            };
        } else {
            return data;
        }
    };

    const getStripeAccount = async () => {
        const response = await fetch("/stripe/account");
        const data = response.json();

        if (!data) {
            return {
                result: false,
            };
        } else {
            return data;
        }
    };
    const getStripeLoginLink = async () => {
        const response = await fetch("/stripe/login");
        const data = response.json();

        if (!data.url) {
            return {
                result: false,
            };
        } else {
            return data;
        }
    };

    const getStripeSecret = async () => {
        const response = await fetch("/stripe/secret");
        const data = response.json();

        if (!data.clientSecret) {
            return {
                result: false,
            };
        } else {
            // call stripe.confirmard payment
        }
    };

    React.useEffect(() => {
        const checkCookie = async () => await checkLogin();
        checkCookie().catch((error) => {
            console.log(error);
        });
    }, []);

    return (
        <UserContext.Provider
            value={{
                ...state,
                register,
                login,
                logoutUser,
                updateUser,
                uploadProfileImage,
                getStripeOnboardingLink,
                getStripeAccount,
                getStripeLoginLink,
            }}
        >
            {children}
        </UserContext.Provider>
    );
};

export { UserContext, UserContextProvider };
