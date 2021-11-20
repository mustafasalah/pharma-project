import React, { useState } from "react";
import AccountMenu from "./AccountMenu";
import Notifications from "./Notifications";
import store from "../state";
import { useHookstate } from "@hookstate/core";
import { useHistory, useLocation } from "react-router";

function TopMenu({ withoutNotifications = false }) {
    const [activeMenu, changeActive] = useState(0);
    const { notifications, loggedUser } = useHookstate(store);
    const location = useLocation();
    const history = useHistory();

    return (
        <ul className="flex">
            {!withoutNotifications && notifications.length > 0 && (
                <TopMenuItem
                    submenu={<Notifications />}
                    active={activeMenu === 1}
                    onClick={() =>
                        activeMenu === 1 ? changeActive(0) : changeActive(1)
                    }
                >
                    <i
                        className={`animate__animated animate__delay-2s animate__repeat-3 animate__swing fas fa-bellfas fa-bell text-primary`}
                    ></i>
                    {notifications.length !== 0 && (
                        <span className="rounded-full w-3.5 h-3.5 absolute bg-red top-7 right-5 text-xxs text-white">
                            {notifications.length}
                        </span>
                    )}
                </TopMenuItem>
            )}

            {loggedUser.role.get() === "pharmacy owner" && (
                <TopMenuItem
                    active={location.pathname === "/my-pharmacies"}
                    onClick={() => history.push("/my-pharmacies")}
                >
                    <span>My Pharmacies</span>
                    <i className="fas fa-clinic-medical ml-2 text-primary"></i>
                </TopMenuItem>
            )}

            {loggedUser.id.ornull ? (
                <TopMenuItem
                    submenu={<AccountMenu />}
                    active={activeMenu === 2}
                    onClick={() =>
                        activeMenu === 2 ? changeActive(0) : changeActive(2)
                    }
                >
                    <span>My Account</span>
                    <i className="fas fa-user-circle ml-2 text-primary"></i>
                </TopMenuItem>
            ) : (
                <>
                    <TopMenuItem
                        active={location.pathname === "/login"}
                        onClick={() => history.push("/login")}
                    >
                        <span>Login</span>
                        <i className="fas fa-sign-in-alt ml-2 text-primary"></i>
                    </TopMenuItem>

                    <TopMenuItem
                        active={location.pathname === "/sign-up"}
                        onClick={() => history.push("/sign-up")}
                        className={
                            location.pathname === "/sign-up"
                                ? ""
                                : "bg-primary group text-white"
                        }
                    >
                        <span>Sign Up</span>
                        <i
                            className={`fas fa-plus-square ml-2 group-hover:text-primary`}
                        ></i>
                    </TopMenuItem>
                </>
            )}
        </ul>
    );
}

function TopMenuItem({ children, submenu, onClick, active, className = "" }) {
    return (
        <li className="relative">
            <button
                onClick={onClick}
                className={`border-l-2 border-gray-200 h-full px-8 font-semibold hover:bg-gray-100 hover:text-secondary ${
                    active ? "bg-gray-100 text-secondary" : ""
                } ${className}`}
                style={{ transitionProperty: "background" }}
            >
                {children}
            </button>
            {submenu && (
                <ul
                    className={`absolute z-40 top-full border-t max-h-80 overflow-y-auto overflow-x-hidden border-gray-200 right-0 bg-white shadow-lg border-1 w-80 text-sm rounded-b transform origin-top-right transition-transform duration-500 scale-0${
                        active ? " scale-100" : ""
                    }`}
                >
                    {submenu}
                </ul>
            )}
        </li>
    );
}

export default TopMenu;
