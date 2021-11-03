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

    const renderControlPanel = useCallback(
        ({ history }) => {
            const isPharmacyOwner = loggedUser.role.get() === "pharmacy owner";
            const isPharmacyBranchSelected =
                pharmacyBranch.id.value !== undefined;

            if (isPharmacyOwner && !isPharmacyBranchSelected) {
                history.replace("/my-pharmacies");
            }

            return <ControlPanel />;
        },
        [loggedUser.role.value, pharmacyBranch.id.ornull]
    );

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
            {loading.get() ? (
                <Loading />
            ) : (
                <Switch>
                    {loggedUser.role.get() === "pharmacy owner" && (
                        <Route
                            path="/my-pharmacies"
                            component={MyPharmacies}
                            exact
                        />
                    )}
                    <Route path="/" render={renderControlPanel} />
                </Switch>
            )}
        </>
    );
}

export default App;
