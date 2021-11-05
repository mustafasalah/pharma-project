import React from "react";
import { Link } from "react-router-dom";

function AccountMenu() {
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
                <Link
                    to="/logout"
                    className="px-5 py-4 font-semibold block hover:bg-gray-100"
                >
                    <i className="fas fa-sign-out-alt text-xs text-primary mr-2" />
                    Logout
                </Link>
            </li>
        </>
    );
}

export default AccountMenu;
