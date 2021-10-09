import React from "react";
import Logo from "./Logo";
import Navigation from "./Navigation";

function header() {
    return (
        <>
            <header className="h-screen w-64 bg-white shadow-lg overflow-hidden fixed top-0 left-0 z-10">
                <Logo />
                <Navigation />
            </header>
        </>
    );
}

export default header;
