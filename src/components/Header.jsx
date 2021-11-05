import { useState } from "@hookstate/core";
import React from "react";
import store from "../state";
import Logo from "./Logo";
import Navigation from "./Navigation";

function Header() {
    const { collapseMenu } = useState(store);

    return (
        <>
            <header
                className={`h-screen ${
                    collapseMenu.value ? "w-24" : "w-64"
                } bg-white shadow-lg overflow-hidden transition-all fixed top-0 left-0 z-10`}
            >
                <Logo />
                <Navigation />
            </header>
        </>
    );
}

export default Header;
