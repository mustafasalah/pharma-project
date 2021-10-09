import React from "react";

function PagePath() {
    return (
        <ul className="text-sm inline-flex items-center h-full pl-10">
            <li>
                <a href="/">
                    <i className="fas fa-home text-primary mr-2"></i>
                </a>
            </li>

            <PagePathItem link="/" title="Dashboard" />
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
