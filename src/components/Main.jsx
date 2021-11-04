import React from "react";
import { Switch, Route, Redirect } from "react-router";
import Inventory from "./pages/Inventory";
import Dashboard from "./pages/Dashboard";
import Employees from "./pages/Employees";
import Orders from "./pages/Orders";
import Pharmacies from "./pages/Pharmacies";
import Users from "./pages/Users";
import Products from "./pages/Products";
import PharmacySettings from "./pages/PharmacySettings";
import AccountSettings from "./pages/AccountSettings";
import PointOfSale from "./pages/PointOfSale";
import { useState } from "@hookstate/core";
import store from "../state";

function Main() {
    const { loggedUser } = useState(store);

    return (
        <main
            className="mt-21.5 ml-64 py-8 px-8 overflow-hidden"
            style={{ minHeight: "calc(100vh - 100px)" }}
        >
            {loggedUser.role.get() === "admin" ? (
                <Switch>
                    <Route
                        path="/"
                        exact
                        render={() => <Dashboard type="admin" />}
                    />
                    <Route
                        path={["/products/:id", "/products"]}
                        component={Products}
                    />
                    <Route path={["/users/:id", "/users"]} component={Users} />
                    <Route
                        path={["/pharmacies/:id", "/pharmacies"]}
                        component={Pharmacies}
                    />
                    <Route
                        path="/account-settings"
                        component={AccountSettings}
                    />
                    <Redirect to="/" />
                </Switch>
            ) : (
                <Switch>
                    <Route
                        path="/"
                        exact
                        render={() => <Dashboard type="pharmacy owner" />}
                    />
                    <Route
                        path={["/orders/:id", "/orders"]}
                        component={Orders}
                    />
                    <Route path="/pos" component={PointOfSale} />
                    <Route
                        path={["/staff/:id", "/staff"]}
                        component={Employees}
                    />
                    <Route
                        path={["/Inventory/:id", "/Inventory"]}
                        component={Inventory}
                    />
                    <Route
                        path="/pharmacy-settings"
                        component={PharmacySettings}
                    />
                    <Route
                        path="/account-settings"
                        component={AccountSettings}
                    />
                    <Redirect to="/" />
                </Switch>
            )}
        </main>
    );
}

export default Main;
