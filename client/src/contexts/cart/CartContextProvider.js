import * as React from "react";
import { SET_CART, ADD_TO_CART, DELETE_CART_ITEM } from "../types";

const initialState = {
    cart: {},
};

const CartReducer = (state, action) => {
    switch (action.type) {
        case SET_CART:
            return {
                ...state,
                cart: { ...action.payload },
            };
        case ADD_TO_CART:
            return {
                ...state,
                cart: { ...action.payload },
            };
        case DELETE_CART_ITEM:
            return {
                ...state,
                cart: { ...action.payload },
            };
        default:
            return state;
    }
};

const CartContext = React.createContext(null);

const CartContextProvider = ({ children }) => {
    const [state, dispatch] = React.useReducer(CartReducer, initialState);
    let localCart = localStorage.getItem("cart");

    const setCart = () => {};

    const addToCart = () => {};

    React.useEffect(() => {
        localCart = JSON.parse(localCart);
        console.log(localCart);
    }, []);

    return (
        <CartContext.Provider value={{ ...state }}>{children}</CartContext.Provider>
    );
};

export { CartContext, CartContextProvider };
