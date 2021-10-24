import React from "react";
import { Switch, Route } from "react-router";
import Inventory from "./pages/Inventory";
import Dashboard from "./pages/Dashboard";
import Employees from "./pages/Employees";
import Orders from "./pages/Orders";

function Main() {
    return (
        <main className="mt-21.5 ml-64 py-8 px-8 overflow-hidden">
            <Switch>
                <Route path="/Inventory" component={Inventory} />
                <Route path={["/staff/:id", "/staff"]} component={Employees} />
                <Route path={["/orders/:id", "/orders"]} component={Orders} />
                <Route path="/" component={Dashboard} />
            </Switch>
        </main>
    );
}

export default Main;
