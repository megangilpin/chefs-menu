import * as React from "react";
import {
    SET_CART,
    ADD_TO_CART,
    DELETE_CART_ITEM,
    UPDATE_CART_ITEM,
    SET_CART_CHEF,
    DELETE_CART_CHEF,
} from "../types";

const initialState = {
    cart: [],
    chef: false,
    chefName: "",
    totalItems: 0,
    totalPrice: 0,
};

const CartReducer = (state, action) => {
    switch (action.type) {
        case SET_CART:
            return {
                ...state,
                cart: [...action.payload.cart],
                chef: action.payload.chef,
                chefName: action.payload.chefName,
                totalItems: action.payload.totalItems,
                totalPrice: action.payload.totalPrice,
            };
        case ADD_TO_CART:
        case UPDATE_CART_ITEM:
        case DELETE_CART_ITEM:
            return {
                ...state,
                cart: [...action.payload.cart],
                totalItems: action.payload.totalItems,
                totalPrice: action.payload.totalPrice,
            };
        case DELETE_CART_CHEF:
        case SET_CART_CHEF:
            return {
                ...state,
                chef: action.payload.chef,
                chefName: action.payload.chefName,
            };
        default:
            return state;
    }
};

const CartContext = React.createContext(initialState);

const CartContextProvider = ({ children }) => {
    const [state, dispatch] = React.useReducer(CartReducer, initialState);

    const updateLocalStorage = (key, value) => {
        const stringValue = JSON.stringify(value);
        localStorage.setItem(key, stringValue);
    };

    const calcTotal = (cart) => {
        let totalPrice = 0;
        let totalItems = 0;
        cart.forEach((meal) => {
            totalPrice += meal.quantity * meal.price;
            totalItems += meal.quantity;
        });

        return { totalPrice, totalItems };
    };

    const addToCart = (meal) => {
        const cart = [...state.cart];
        const newMeal = { ...meal };
        let totalPrice = state.totalPrice;
        let totalItems = state.totalItems;

        if (state.chef !== meal.chefId) {
            dispatch({
                type: SET_CART_CHEF,
                payload: { chef: meal.chefId, chefName: meal.chefName },
            });
        }

        const mealIndex = cart.findIndex((meal) => meal.id === newMeal.id);

        if (mealIndex < 0) {
            cart.push({ ...newMeal, quantity: 1 });
            totalPrice += newMeal.price;
            totalItems += 1;
        } else {
            cart[mealIndex].quantity += 1;
            totalPrice += cart[mealIndex].price;
            totalItems += 1;
        }

        updateLocalStorage("cart", cart);
        dispatch({ type: ADD_TO_CART, payload: { cart, totalPrice, totalItems } });
    };

    const updateCartItem = (id, action) => {
        const cart = [...state.cart];
        const mealId = parseFloat(id);
        let totalPrice = state.totalPrice;
        let totalItems = state.totalItems;

        const mealIndex = cart.findIndex((meal) => meal.id === mealId);

        if (action === "add") {
            cart[mealIndex].quantity += 1;
            totalPrice += cart[mealIndex].price;
            totalItems += 1;
        } else {
            cart[mealIndex].quantity -= 1;
            totalPrice -= cart[mealIndex].price;
            totalItems -= 1;
        }

        if (cart[mealIndex].quantity === 0) {
            deleteCartItem(id);
            return;
        }

        updateLocalStorage("cart", cart);
        dispatch({
            type: UPDATE_CART_ITEM,
            payload: { cart, totalPrice, totalItems },
        });
    };

    const deleteCartItem = (id) => {
        const cart = [...state.cart];
        const mealIndex = cart.findIndex((meal) => meal.id === id);

        cart.splice(mealIndex, 1);

        if (cart.length <= 0) {
            const totalPrice = 0;
            const totalItems = 0;
            localStorage.removeItem("cart");
            dispatch({
                type: DELETE_CART_CHEF,
                payload: { chef: false, chefName: "" },
            });
            dispatch({
                type: DELETE_CART_ITEM,
                payload: { cart, totalPrice, totalItems },
            });
            return;
        } else {
            const { totalPrice, totalItems } = calcTotal(cart);
            updateLocalStorage("cart", cart);
            dispatch({
                type: DELETE_CART_ITEM,
                payload: { cart, totalPrice, totalItems },
            });
        }
    };

    React.useEffect(() => {
        const localCart = localStorage.getItem("cart");

        const cart = JSON.parse(localCart);

        if (cart) {
            const { totalPrice, totalItems } = calcTotal(cart);
            const chef = cart[0].chefId;
            const chefName = cart[0].chefName;
            dispatch({
                type: SET_CART,
                payload: { cart, chef, chefName, totalPrice, totalItems },
            });
        }
    }, []);

    return (
        <CartContext.Provider
            value={{ ...state, addToCart, updateCartItem, deleteCartItem }}
        >
            {children}
        </CartContext.Provider>
    );
};

export { CartContext, CartContextProvider };
