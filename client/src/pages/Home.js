import React from "react";
import Main from "../components/Main";
import { Typography } from "@material-ui/core";
import ResponsiveSideBar from "../components/ResponsiveSideBar";
import { CartContextProvider } from "../contexts/cart/CartContextProvider";

function Home(props) {
    return (
        <React.Fragment>
            <ResponsiveSideBar>
                <Typography>Responsive Side Bar</Typography>
            </ResponsiveSideBar>
            <CartContextProvider>
                <Main></Main>
            </CartContextProvider>
        </React.Fragment>
    );
}

export default Home;
