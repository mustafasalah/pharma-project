import { useState } from "@hookstate/core";
import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { deleteNotification } from "../services/notifications";
import store from "../state";

function NotificationsList() {
    const { notifications } = useState(store);

    return (
        <>
            {notifications.map((notification) => (
                <Notification
                    key={notification.id.value}
                    content={notification.value}
                ></Notification>
            ))}
        </>
    );
}

function Notification({ content }) {
    const colorsMap = useRef({
        new_pharmacy: "green",
        new_branch: "green-dark",
        out_of_stock: "red",
        expire_soon: "yellow",
        expired: "yellow-dark",
        new_order: "primary",
    });

    const { notifications } = useState(store);
    const { id, type, data } = content;

    let notificationLink = "",
        msg = "";

    switch (type) {
        case "new_pharmacy":
            notificationLink = `/pharmacies/${data.id}`;
            msg = (
                <>
                    <strong>{data.name}</strong> send request to join Pharma
                    Platform!
                </>
            );
            break;

        case "new_branch":
            notificationLink = `/pharmacies/${data.id}`;
            msg = (
                <>
                    <strong>{data.name}</strong> send request to add it's new
                    branch <strong>{data.branch}</strong> to Pharma Platform.
                </>
            );
            break;

        case "new_order":
            notificationLink = `/orders/${data.id}`;
            msg = (
                <>
                    New Order <strong>#{data.id}</strong> has been recevied from{" "}
                    {data.user}
                </>
            );
            break;

        case "expired":
            notificationLink = `/inventory/${data.id}`;
            msg = (
                <>
                    <strong>{data.name}</strong> has expired!
                </>
            );
            break;

        case "expire_soon":
            notificationLink = `/inventory/${data.id}`;
            msg = (
                <>
                    <strong>{data.name}</strong> will expire soon after{" "}
                    {data.duration} day.
                </>
            );
            break;

        case "out_of_stock":
            notificationLink = `/inventory/${data.id}`;
            msg = (
                <>
                    <strong>{data.name}</strong> has became out of stock!
                </>
            );
    }

    return (
        <li className="border-b-2 border-gray-200 last:border-0">
            <Link
                to={notificationLink}
                className="block relative px-5 py-4 hover:bg-gray-100"
            >
                <button
                    title="clear the notification"
                    className="text-gray-300 hover:text-red hover:bg-gray-200 rounded px-2 py-1 absolute top-3 right-2 transition-none"
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();

                        (async () => {
                            await deleteNotification(id);
                            notifications.set((prev) => {
                                return prev.filter((notification) => {
                                    return notification.id !== id;
                                });
                            });
                        })();
                    }}
                >
                    <i className="fas fa-times"></i>
                </button>
                <span
                    className={`bg-${colorsMap.current[type]} shadow capitalize py-0.5 px-2 inline-block mb-1.5 rounded-sm font-semibold text-xxs text-white`}
                >
                    {type.replace(/_/g, " ")}
                </span>
                <p className="font-medium text-gray-600">{msg}</p>
            </Link>
        </li>
    );
}

export default NotificationsList;
