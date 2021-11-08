import { useState } from "@hookstate/core";
import React from "react";
import { Link } from "react-router-dom";
import store from "../state";

function AccountMenu() {
    const { loggedUser } = useState(store);

    return (
        <>
            <li className="border-b-2 border-gray-200">
                <Link
                    to="/account-settings"
                    className="px-5 py-4 font-semibold block hover:bg-gray-100"
                >
                    <i className="fas fa-user-cog text-xs text-primary mr-2" />
                    Account Settings
                </Link>
            </li>

            <li>
                <button
                    className="px-5 py-4 w-full text-left font-semibold block hover:bg-gray-100"
                    onClick={(e) => {
                        const confirm = window.confirm(
                            "Are you sure to logged out?"
                        );
                        confirm && loggedUser.set({});
                    }}
                >
                    <i className="fas fa-sign-out-alt text-xs text-primary mr-2" />
                    Logout
                </button>
            </li>
        </>
    );
}

export default AccountMenu;
