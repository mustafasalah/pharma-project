import { useHookstate } from "@hookstate/core";
import React, { useCallback, useEffect } from "react";
import { Route, Switch } from "react-router";
import { toast, ToastContainer } from "react-toastify";
import { login } from "../services/auth";
import store from "../state";
import ControlPanel from "./ControlPanel";
import Loading from "./Loading";
import MyPharmacies from "./pages/MyPharmacies";

function App() {
    const { loggedUser, pharmacyBranch } = useHookstate(store);
    const loading = useHookstate(true);

    useEffect(() => {
        (async () => {
            try {
                const { data: loggedUserData } = await login();
                loggedUser.set(loggedUserData);
                loading.set(false);
            } catch (ex) {
                toast.error("Login Error!");
            }
        })();
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
            {loading.get() ? <Loading /> : <ControlPanel />}
        </>
    );
}

export default App;
