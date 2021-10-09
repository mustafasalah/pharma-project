import React from "react";

function MenuItem({ title, link = "#", faClass, isActive = false }) {
    return (
        <li>
            <a
                href={link}
                className={(isActive ? "active-" : "") + "menu-item group"}
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
            </a>
        </li>
    );
}

export default MenuItem;
