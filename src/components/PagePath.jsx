import React from "react";
import { useHistory, useLocation, useRouteMatch } from "react-router";

const pagesName = new Map([
    ["/", "Dashboard"],
    ["/inventory", "Inventory"],
    ["/orders", "Orders"],
    ["/pos", "Point of Sale"],
    ["/staff", "Staff"],
    ["/pharmacy-settings", "Pharmacy Settings"],
    ["/account-settings", "Account Settings"],
]);

function PagePath() {
    let { pathname } = useLocation();
    pathname = "/" + pathname.split("/")[1];

    return (
        <ul className="text-sm inline-flex items-center h-full pl-10">
            <li>
                <a href="/">
                    <i className="fas fa-home text-primary mr-2"></i>
                </a>
            </li>

            <PagePathItem link="/" title={pagesName.get(pathname)} />
        </ul>
    );
}

function PagePathItem({ link = "/", title }) {
    return (
        <li>
            <i className="fas fa-chevron-right text-xs text-gray-300 mr-2"></i>
            <a href="/" className="font-medium capitalize">
                {title}
            </a>
        </li>
    );
}

export default PagePath;
