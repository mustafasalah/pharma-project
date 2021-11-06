import { useHookstate } from "@hookstate/core";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import store from "../state";
import { getEmployees } from "../services/employees";
import { getInventoryItems } from "../services/inventoryItems";
import {
    getNotifications,
    getPharmaciesNotifications,
} from "../services/notifications";
import { getOrders } from "../services/orders";
import { getPharmacies } from "../services/pharmacies";
import { getProducts } from "../services/products";
import { getUsers } from "../services/users";
import Loading from "../components/Loading";
import TopBar from "../components/TopBar";
import Header from "../components/Header";
import Main from "../components/Main";

const ControlPanel = () => {
    const { tables, notifications, loggedUser, pharmacyBranch } =
        useHookstate(store);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (pharmacyBranch.id.ornull) {
            (async () => {
                const { data: notificationsData } = await getNotifications(
                    pharmacyBranch.id.value
                );
                notifications.set(notificationsData);
            })();
        } else {
            notifications.set([]);
        }
    }, [pharmacyBranch.id.value]);

    useEffect(() => {
        try {
            (async () => {
                if (loggedUser.role.get() === "admin") {
                    const appData = await Promise.all([
                        getPharmaciesNotifications(),
                        getUsers(),
                        getPharmacies(),
                        getProducts(),
                    ]);

                    notifications.set(appData[0].data);
                    tables.users.data.set(appData[1].data);
                    tables.pharmacies.data.set(appData[2].data);
                    tables.products.data.set(appData[3].data);
                } else {
                    const appData = await Promise.all([
                        getInventoryItems(),
                        getEmployees(),
                        getOrders(),
                        getProducts(),
                    ]);

                    tables.inventory.data.set(appData[0].data);
                    tables.employees.data.set(appData[1].data);
                    tables.orders.data.set(appData[2].data);
                    tables.products.data.set(appData[3].data);
                }
                window.setTimeout(() => setLoading(false), 500);
            })();
        } catch (ex) {
            toast.error("Network Error in loading resourse.");
        }
    }, []);

    return loading ? (
        <Loading />
    ) : (
        <>
            <TopBar />
            <Header />
            <Main />
        </>
    );
};

export default ControlPanel;
