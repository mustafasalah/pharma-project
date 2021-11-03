import { useState } from "@hookstate/core";
import React from "react";
import store from "../state";
import MenuItem from "./MenuItem";

function Navigation() {
    const { loggedUser } = useState(store);

    return (
        <nav id="main-nav" className="text-sm">
            <ul>
                <MenuItem
                    title="Dashboard"
                    faClass="fas fa-tachometer-alt"
                    link="/"
                    exact
                ></MenuItem>

                {loggedUser.role.get() === "admin" ? (
                    <>
                        <MenuItem
                            title="Products Catalog"
                            faClass="fas fa-boxes"
                            link="/products"
                        ></MenuItem>

                        <MenuItem
                            title="Pharmacies"
                            faClass="fas fa-clinic-medical"
                            link="/pharmacies"
                        ></MenuItem>

                        <MenuItem
                            title="Users"
                            faClass="fas fa-users"
                            link="/users"
                        ></MenuItem>
                    </>
                ) : (
                    <>
                        <MenuItem
                            title="Inventory"
                            faClass="fas fa-boxes"
                            link="/inventory"
                        ></MenuItem>

                        <MenuItem
                            title="Point of Sale"
                            faClass="fas fa-cash-register"
                            link="/pos"
                        ></MenuItem>

                        <MenuItem
                            title="Staff"
                            faClass="fas fa-user-tie"
                            link="/staff"
                        ></MenuItem>

                        <MenuItem
                            title="Orders"
                            faClass="fas fa-dolly"
                            link="/orders"
                        ></MenuItem>

                        <MenuItem
                            title="Pharmacy Settings"
                            faClass="fas fa-cogs"
                            link="/pharmacy-settings"
                        ></MenuItem>
                    </>
                )}
                <MenuItem
                    title="Account Settings"
                    faClass="fas fa-user-cog"
                    link="/account-settings"
                ></MenuItem>
            </ul>
        </nav>
    );
}

export default Navigation;
