import React, { useState } from "react";
import AccountMenu from "./AccountMenu";
import Notifications from "./Notifications";
import store from "../state";
import { useHookstate } from "@hookstate/core";
function TopMenu() {
    const [activeMenu, changeActive] = useState(0);
    const { notifications } = useHookstate(store);

    return (
        <ul className="flex">
            <TopMenuItem
                submenu={<Notifications notifications={notifications} />}
                active={activeMenu === 1}
                onClick={() =>
                    activeMenu === 1 ? changeActive(0) : changeActive(1)
                }
            >
                <i className="fas fa-bellfas fa-bell text-primary"></i>
                {notifications.length !== 0 && (
                    <span className="rounded-full w-3.5 h-3.5 absolute bg-red top-7 right-5 text-xxs text-white">
                        {notifications.length}
                    </span>
                )}
            </TopMenuItem>

            <TopMenuItem
                submenu={<AccountMenu />}
                active={activeMenu === 2}
                onClick={() =>
                    activeMenu === 2 ? changeActive(0) : changeActive(2)
                }
            >
                <span>My Account</span>
                <i className="fas fa-user-circle ml-2"></i>
            </TopMenuItem>
        </ul>
    );
}

function TopMenuItem({ children, submenu, onClick, active }) {
    return (
        <li className="relative border-l-2 border-gray-200">
            <button
                onClick={onClick}
                className={`h-full px-8 font-semibold hover:bg-gray-100${
                    active ? " bg-gray-100" : ""
                }`}
            >
                {children}
            </button>
            <ul
                className={`absolute z-40 top-full border-t max-h-60 border-gray-200 right-0 bg-white shadow-lg border-1 w-80 text-sm rounded-b transform origin-top-right transition-transform duration-500 scale-0${
                    active ? " scale-100" : ""
                }`}
            >
                {submenu}
            </ul>
        </li>
    );
}

export default TopMenu;
