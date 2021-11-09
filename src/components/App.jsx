import { useHookstate } from "@hookstate/core";
import React from "react";
import { ToastContainer } from "react-toastify";
import store from "../state";
import Authentication from "./Authentication";
import ControlPanel from "./ControlPanel";

function App() {
    const { loggedUser } = useHookstate(store);

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
