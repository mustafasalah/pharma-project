import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { login } from "../services/auth";
import { getEmployees } from "../services/employees";
import { getInventoryItems } from "../services/inventoryItems";
import { getNotifications } from "../services/notifications";
import { getOrders } from "../services/orders";
import { getPharmacies } from "../services/pharmacies";
import { getPharmacyBranchInfo } from "../services/pharmacyBranch";
import { getProducts } from "../services/products";
import { getUsers } from "../services/users";
import store from "../state";
import Header from "./Header";
import Loading from "./Loading";
import Main from "./Main";
import TopBar from "./TopBar";

function App() {
    const [loading, setLoading] = useState(true);
    const { loggedUser, pharmacyBranch, notifications, tables, statistics } =
        store;
    useEffect(async () => {
        try {
            const appData = await Promise.all([
                login(),
                getPharmacyBranchInfo(),
                getNotifications(),
                getInventoryItems(),
                getEmployees(),
                getUsers(),
                getOrders(),
                getPharmacies(),
                getProducts(),
            ]);

            loggedUser.set(appData[0].data);
            pharmacyBranch.set(appData[1].data);
            notifications.set(appData[2].data);
            tables.inventory.data.set(appData[3].data);
            tables.employees.data.set(appData[4].data);
            tables.users.data.set(appData[5].data);
            tables.orders.data.set(appData[6].data);
            tables.pharmacies.data.set(appData[7].data);
            tables.products.data.set(appData[8].data);

            window.setTimeout(() => setLoading(false), 800);
        } catch (ex) {
            toast.error("Server Error!");
        }
    }, []);

    return (
        <>
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
            {loading ? (
                <Loading />
            ) : (
                <>
                    <TopBar />
                    <Header />
                    <Main />
                </>
            )}
        </>
    );
}

export default App;
