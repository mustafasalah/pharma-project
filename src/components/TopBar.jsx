import React from "react";
import Logo from "./Logo";
import PagePath from "./PagePath";
import TopMenu from "./TopMenu";

function TopBar({ withLogo = false }) {
    if (withLogo) {
        return (
            <header className="h-21.5 bg-white shadow-md flex justify-between">
                <Logo
                    className="flex items-center w-64 h-full"
                    withoutCollapseBtn
                />
                <TopMenu withoutNotifications />
            </header>
        );
    }

    return (
        <div className="h-21.5 bg-white shadow-md flex justify-between fixed z-30 top-0 left-64 right-0">
            <PagePath />
            <TopMenu />
        </div>
    );
}

export default TopBar;
