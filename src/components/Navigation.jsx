import { useState } from "@hookstate/core";
import React from "react";
import store from "../state";
import CollapseBtn from "./CollapseBtn";
import MenuItem from "./MenuItem";

function Navigation() {
    const { loggedUser, collapseMenu, pharmacyBranch } = useState(store);
    const userRole = loggedUser.role.get();
    const isPharmacyBranchSelected = pharmacyBranch.id.value !== undefined;

    function renderNavigationItems() {
        const output = [];
        switch (userRole) {
            case "admin":
                output.push(
                    <>
                        <MenuItem
                            key="dashboard"
                            title="Dashboard"
                            faClass="fas fa-tachometer-alt"
                            link="/"
                            exact
                        ></MenuItem>
                        <MenuItem
                            key="products"
                            title="Products Catalog"
                            faClass="fas fa-boxes"
                            link="/products"
                        ></MenuItem>

                        <MenuItem
                            key="pharmacies"
                            title="Pharmacies"
                            faClass="fas fa-clinic-medical"
                            link="/pharmacies"
                        ></MenuItem>

                        <MenuItem
                            key="users"
                            title="Users"
                            faClass="fas fa-users"
                            link="/users"
                        ></MenuItem>
                    </>
                );
                break;

            case "pharmacy owner":
                if (!isPharmacyBranchSelected) {
                    output.push(
                        <MenuItem
                            key="my-pharmacies"
                            title="My Pharmacies"
                            faClass="fas fa-clinic-medical"
                            link="/my-pharmacies"
                        ></MenuItem>
                    );
                    break;
                }

            case "supervisor":
                output.push(
                    <>
                        <MenuItem
                            key="dashboard"
                            title="Dashboard"
                            faClass="fas fa-tachometer-alt"
                            link="/"
                            exact
                        ></MenuItem>

                        <MenuItem
                            key="pos"
                            title="Point of Sale"
                            faClass="fas fa-cash-register"
                            link="/pos"
                        ></MenuItem>

                        <MenuItem
                            key="orders"
                            title="Orders"
                            faClass="fas fa-dolly"
                            link="/orders"
                        ></MenuItem>

                        <MenuItem
                            key="inventory"
                            title="Inventory"
                            faClass="fas fa-boxes"
                            link="/inventory"
                        ></MenuItem>

                        <MenuItem
                            key="staff"
                            title="Staff"
                            faClass="fas fa-user-tie"
                            link="/staff"
                        ></MenuItem>

                        <MenuItem
                            key="pharmacy-settings"
                            title="Pharmacy Settings"
                            faClass="fas fa-cogs"
                            link="/pharmacy-settings"
                        ></MenuItem>
                    </>
                );
                break;

            case "pharmacist":
                output.push(
                    <>
                        <MenuItem
                            key="pos"
                            title="Point of Sale"
                            faClass="fas fa-cash-register"
                            link="/"
                            exact
                        ></MenuItem>

                        <MenuItem
                            key="orders"
                            title="Orders"
                            faClass="fas fa-dolly"
                            link="/orders"
                        ></MenuItem>

                        <MenuItem
                            key="inventory"
                            title="Inventory"
                            faClass="fas fa-boxes"
                            link="/inventory"
                        ></MenuItem>
                    </>
                );
                break;
        }

        output.push(
            <MenuItem
                key="account-settings"
                title="Account Settings"
                faClass="fas fa-user-cog"
                link="/account-settings"
            ></MenuItem>
        );

        return output;
    }

    return (
        <nav id="main-nav" className="text-sm">
            <ul>
                {collapseMenu.get() && (
                    <li>
                        <CollapseBtn className="menu-item w-full justify-center transition-none text-gray-400 hover:bg-gray-100 hover:text-primary" />
                    </li>
                )}
                {renderNavigationItems()}
            </ul>
        </nav>
    );
}

export default Navigation;
