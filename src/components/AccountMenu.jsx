import React from "react";

function AccountMenu() {
    return (
        <>
            <li className="border-b-2 border-gray-200">
                <a
                    href="/account-settings"
                    className="px-5 py-4 font-semibold block hover:bg-gray-100"
                >
                    <i className="fas fa-user-cog text-xs text-primary mr-2" />
                    Account Settings
                </a>
            </li>

            <li>
                <a
                    href="/logout"
                    className="px-5 py-4 font-semibold block hover:bg-gray-100"
                >
                    <i className="fas fa-sign-out-alt text-xs text-primary mr-2" />
                    Logout
                </a>
            </li>
        </>
    );
}

export default AccountMenu;
