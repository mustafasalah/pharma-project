import { useState } from "@hookstate/core";
import React from "react";
import { Link } from "react-router-dom";
import store from "../state";
import CollapseBtn from "./CollapseBtn";

function Logo({
    className = "flex items-center py-6 border-b-2 border-r border-gray-200",
    withoutCollapseBtn = false,
}) {
    const { collapseMenu } = useState(store);

    return (
        <div className={className}>
            <div id="logo" className="px-6">
                <Link className="block" to="/">
                    {collapseMenu.value && !withoutCollapseBtn ? (
                        <img
                            src="/assets/images/favicon.svg"
                            alt="Pharma Logo"
                            style={{
                                width: 47,
                                height: 39.16,
                            }}
                        />
                    ) : (
                        <img
                            src="/assets/images/logo.svg"
                            alt="Pharma Logo"
                            style={{
                                width: 178.5,
                                height: 37.19,
                            }}
                        />
                    )}
                </Link>
            </div>
            {!withoutCollapseBtn && !collapseMenu.value && <CollapseBtn />}
        </div>
    );
}

export default Logo;
