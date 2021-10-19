import React, { useState } from "react";
import MenuItem from "./MenuItem";

function Navigation() {
    return (
        <nav id="main-nav" className="text-sm">
            <ul>
                <MenuItem
                    title="Dashboard"
                    faClass="fas fa-tachometer-alt"
                    link="/"
                    exact
                ></MenuItem>

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
                    faClass="fas fa-clinic-medical"
                    link="/pharmacy-settings"
                ></MenuItem>

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
