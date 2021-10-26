import React from "react";
import { Switch, Route } from "react-router";
import Inventory from "./pages/Inventory";
import Dashboard from "./pages/Dashboard";
import Employees from "./pages/Employees";
import Orders from "./pages/Orders";
import Pharmacies from "./pages/Pharmacies";
import Users from "./pages/Users";
import Products from "./pages/Products";

function Main() {
    return (
        <main
            className="mt-21.5 ml-64 py-8 px-8 overflow-hidden"
            style={{ minHeight: "calc(100vh - 100px)" }}
        >
            <Switch>
                <Route path="/Inventory" component={Inventory} />
                <Route
                    path={["/products/:id", "/products"]}
                    component={Products}
                />
                <Route path={["/users/:id", "/users"]} component={Users} />
                <Route path={["/staff/:id", "/staff"]} component={Employees} />
                <Route
                    path={["/pharmacies/:id", "/pharmacies"]}
                    component={Pharmacies}
                />
                <Route path={["/orders/:id", "/orders"]} component={Orders} />
                <Route path="/" component={Dashboard} />
            </Switch>
        </main>
    );
}

export default Main;
