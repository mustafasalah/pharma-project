import { useState } from "@hookstate/core";
import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import store from "../state";

function MenuItem({ title, link, faClass, exact = false }) {
    const { pathname } = useLocation();
    const isActive = exact ? pathname === link : pathname.startsWith(link);
    const { collapseMenu } = useState(store);

    return (
        <li>
            <NavLink
                to={link}
                activeClassName="active-menu-item"
                className={`menu-item group ${
                    collapseMenu.value ? " justify-center px-5" : ""
                }`}
                exact={exact}
            >
                <i
                    className={
                        faClass +
                        " " +
                        (isActive ? "active-" : "") +
                        "menu-item-icon" +
                        (!isActive && collapseMenu.value ? " mr-0" : "")
                    }
                ></i>
                <span
                    className={`font-${
                        isActive ? "" : "semi"
                    }bold align-middle ${collapseMenu.value ? "hidden" : ""}`}
                >
                    {title}
                </span>
                <i
                    className={`fas
                    fa-chevron-right
                    ml-auto
                    text-xs text-gray-300 ${
                        isActive ? "" : "hidden group-hover:block"
                    }`}
                ></i>
            </NavLink>
        </li>
    );
}

export default MenuItem;
