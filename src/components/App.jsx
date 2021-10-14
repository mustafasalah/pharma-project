import React from "react";
import { ToastContainer } from "react-toastify";
import Header from "./Header";
import Main from "./Main";
import TopBar from "./TopBar";
import "react-toastify/dist/ReactToastify.css";

function App() {
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
            <TopBar />
            <Header />
            <Main />
        </>
    );
}

export default App;
