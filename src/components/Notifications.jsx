import { useState } from "@hookstate/core";
import React, { useRef } from "react";

function NotificationsList({ notifications }) {
    return (
        <>
            {notifications.map(({ id, type, content }) => (
                <Notification
                    key={id.value}
                    id={id.value}
                    type={type.value}
                    content={content.value}
                ></Notification>
            ))}
        </>
    );
}

function Notification({ type, content, id }) {
    const colorsMap = useRef({
        new_pharmacy: "green",
        new_branch: "green-dark",
        out_of_stock: "red",
        expire_soon: "yellow",
        expired: "yellow-dark",
        new_order: "primary",
    });
    return (
        <li className="border-b-2 border-gray-200 last:border-0">
            <a href={"#"} className="block px-5 py-4 hover:bg-gray-100">
                <span
                    className={`bg-${colorsMap.current[type]} capitalize py-0.5 px-2 inline-block mb-1.5 rounded-sm font-semibold text-xxs text-white`}
                >
                    {type.replace("_", " ")}
                </span>
                <p className="font-medium text-gray-600">{content}</p>
            </a>
        </li>
    );
}

export default NotificationsList;
