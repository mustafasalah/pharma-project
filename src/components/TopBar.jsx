import React from "react";
import PagePath from "./PagePath";
import TopMenu from "./TopMenu";

function TopBar() {
    return (
        <div className="h-21.5 bg-white shadow-md flex justify-between fixed z-30 top-0 left-64 right-0">
            <PagePath />
            <TopMenu />
        </div>
    );
}

export default TopBar;
