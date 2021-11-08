import { useHookstate } from "@hookstate/core";
import React from "react";
import { Redirect, Route, useHistory } from "react-router";
import { ToastContainer } from "react-toastify";
import store from "../state";
import Authentication from "./Authentication";
import ControlPanel from "./ControlPanel";
import Loading from "./Loading";

function App() {
    const { loggedUser } = useHookstate(store);

    // useEffect(() => {
    //     (async () => {
    //         try {
    //             const { data: loggedUserData } = await login();
    //             loggedUser.set(loggedUserData);
    //             loading.set(false);
    //         } catch (ex) {
    //             toast.error("Login Error!");
    //         }
    //     })();
    // }, []);

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
            {loggedUser.id.ornull ? <ControlPanel /> : <Authentication />}
        </>
    );
}

export default App;
