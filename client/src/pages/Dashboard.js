import React from "react";
import Page from "../components/Page";
import SideBar from "../components/SideBar";
import Main from "../components/Main";

function Dashboard(props) {
    return (
        <Page>
            <SideBar />
            <Main />
        </Page>
    );
}

export default Dashboard;
