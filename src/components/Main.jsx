import React from "react";
import { Switch, Route } from "react-router";
import Inventory from "./pages/Inventory";

function Main() {
    return (
        <main className="mt-21.5 ml-64 py-10 px-10 overflow-hidden">
            <Switch>
                <Route path="/Inventory" component={Inventory} />
            </Switch>
        </main>
    );
}

export default Main;
