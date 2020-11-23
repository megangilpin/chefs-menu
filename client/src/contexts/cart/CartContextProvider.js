import * as React from "react";

const CartContext = React.createContext(null);

function CartContextProvider(props) {
    return (
        <CartContext.Provider value={{ ...state }}>{children}</CartContext.Provider>
    );
}

export { CartContext, CartContextProvider };
