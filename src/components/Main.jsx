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
import MyPharmacies from "./pages/MyPharmacies";

function Main() {
    const { loggedUser, pharmacyBranch, collapseMenu } = useState(store);
    const userRole = loggedUser.role.get();
    const isPharmacyBranchSelected = pharmacyBranch.id.value !== undefined;

    function renderMain() {
        switch (userRole) {
            case "pharmacy owner":
                if (!isPharmacyBranchSelected) {
                    return (
                        <Switch>
                            <Route
                                path="/account-settings"
                                component={AccountSettings}
                            />
                            <Route
                                path="/my-pharmacies"
                                component={MyPharmacies}
                            />
                            <Redirect from="/" to="/my-pharmacies" />
                        </Switch>
                    );
                }

            case "supervisor":
                return (
                    <Switch>
                        <Route path="/" exact component={Dashboard} />
                        {userRole === "pharmacy owner" && (
                            <Route
                                path="/my-pharmacies"
                                component={MyPharmacies}
                            />
                        )}
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
                        {userRole === "pharmacy owner" && (
                            <Route
                                path="/pharmacy-settings"
                                component={PharmacySettings}
                            />
                        )}
                        <Route
                            path="/account-settings"
                            component={AccountSettings}
                        />
                        <Redirect to="/" />
                    </Switch>
                );

            case "pharmacist":
                return (
                    <Switch>
                        <Route
                            path={["/orders/:id", "/orders"]}
                            component={Orders}
                        />
                        <Route
                            path={["/Inventory/:id", "/Inventory"]}
                            component={Inventory}
                        />
                        <Route
                            path="/account-settings"
                            component={AccountSettings}
                        />
                        <Route path="/" component={PointOfSale} />
                        <Redirect to="/" />
                    </Switch>
                );

            case "admin":
                return (
                    <Switch>
                        <Route path="/" exact component={Dashboard} />
                        <Route
                            path={["/products/:id", "/products"]}
                            component={Products}
                        />
                        <Route
                            path={["/users/:id", "/users"]}
                            component={Users}
                        />
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
                );
        }
    }

    return (
        <main
            className={`${
                collapseMenu.value ? "ml-24" : "ml-64"
            } mt-21.5 py-8 px-8 overflow-hidden transition-all`}
            style={{ minHeight: "calc(100vh - 100px)" }}
        >
            {renderMain()}
        </main>
    );
}

export default Main;
