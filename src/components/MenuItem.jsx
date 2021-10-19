import React from "react";
import { NavLink, useLocation } from "react-router-dom";

function MenuItem({ title, link, faClass, exact = false }) {
    const { pathname } = useLocation();
    const isActive = pathname === link;
    return (
        <li>
            <NavLink
                to={link}
                activeClassName="active-menu-item"
                className="menu-item group"
                exact
            >
                <i
                    className={
                        faClass +
                        " " +
                        (isActive ? "active-" : "") +
                        "menu-item-icon"
                    }
                ></i>
                <span
                    className={`font-${
                        isActive ? "" : "semi"
                    }bold align-middle`}
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
