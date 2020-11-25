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
    total: 0,
    chefName: "",
};

const CartReducer = (state, action) => {
    switch (action.type) {
        case SET_CART:
            return {
                ...state,
                total: action.payload.total,
                cart: [...action.payload.cart],
                chef: action.payload.chef,
                chefName: action.payload.chefName,
            };
        case ADD_TO_CART:
        case UPDATE_CART_ITEM:
            console.log(action.payload.cart);
            return {
                ...state,
                total: action.payload.total,
                cart: [...action.payload.cart],
            };
        case DELETE_CART_ITEM:
            return {
                ...state,
                total: action.payload.total,
                cart: [...action.payload.cart],
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
        let stringValue = JSON.stringify(value);
        localStorage.setItem(key, stringValue);
    };

    const addToCart = (meal, id) => {
        const cart = [...state.cart];
        const newMeal = { ...meal };
        console.log(newMeal);
        const mealId = parseFloat(id);
        let total = state.total;

        if (state.chef !== meal.chefId) {
            dispatch({
                type: SET_CART_CHEF,
                payload: { chef: meal.chefId, chefName: meal.chefName },
            });
        }

        const mealIndex = cart.findIndex((meal) => meal.id === mealId);

        if (mealIndex < 0) {
            cart.push({ ...newMeal, quantity: 1 });
            total += newMeal.price;
        } else {
            cart[mealIndex].quantity += 1;
            total += cart[mealIndex].price;
        }

        updateLocalStorage("cart", cart);
        dispatch({ type: ADD_TO_CART, payload: { cart, total } });
    };

    const updateCartItem = (id, action) => {
        const cart = [...state.cart];
        const mealId = parseFloat(id);
        let total = state.total;

        const mealIndex = cart.findIndex((meal) => meal.id === mealId);

        if (action === "add") {
            cart[mealIndex].quantity += 1;
            total += cart[mealIndex].price;
        } else {
            cart[mealIndex].quantity -= 1;
            total -= cart[mealIndex].price;
        }

        if (cart[mealIndex].quantity === 0) {
            deleteCartItem(id);
            return;
        }

        updateLocalStorage("cart", cart);
        dispatch({ type: UPDATE_CART_ITEM, payload: { cart, total } });
    };

    const deleteCartItem = (id) => {
        const cart = [...state.cart];
        const mealId = parseFloat(id);
        const mealIndex = cart.findIndex((meal) => meal.id === mealId);
        let total = state.total;
        total -= cart[mealIndex].quantity * cart[mealIndex].price;
        console.log(total);
        cart.splice(mealIndex, 1);

        if (cart.length <= 0) {
            const chef = "";
            total = 0;
            localStorage.removeItem("cart");
            dispatch({
                type: DELETE_CART_CHEF,
                payload: { chef: false, chefName: "" },
            });
            dispatch({ type: DELETE_CART_ITEM, payload: { cart, total } });
            return;
        }

        updateLocalStorage("cart", cart);
        dispatch({ type: DELETE_CART_ITEM, payload: { cart, total } });
    };

    const calcTotal = (cart) => {
        let total = 0;
        cart.forEach((meal) => {
            total += meal.quantity * meal.price;
        });
        return total;
    };

    React.useEffect(() => {
        let localCart = localStorage.getItem("cart");

        let cart = JSON.parse(localCart);

        if (cart) {
            const total = calcTotal(cart);
            let chef = cart[0].chefId;
            let chefName = cart[0].chefName;
            dispatch({ type: SET_CART, payload: { cart, chef, chefName, total } });
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
