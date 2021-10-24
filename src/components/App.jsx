import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { login } from "../services/auth";
import { getNotifications } from "../services/notifications";
import { getPharmacyBranchInfo } from "../services/pharmacyBranch";
import store from "../state";
import Header from "./Header";
import Loading from "./Loading";
import Main from "./Main";
import TopBar from "./TopBar";

function App() {
    const [loading, setLoading] = useState(true);
    const { loggedUser, pharmacyBranch, notifications } = store;
    useEffect(async () => {
        try {
            const appData = await Promise.all([
                login(),
                getPharmacyBranchInfo(),
                getNotifications(),
            ]);

            loggedUser.set(appData[0].data);
            pharmacyBranch.set(appData[1].data);
            notifications.set(appData[2].data);

            setLoading(false);
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
