import React from "react";

function Popup({
    title,
    children,
    state,
    onClose,
    faClass = "fas fa-plus-square",
    style = {},
}) {
    const closeForm = () => {
        state.set(false);
        onClose && onClose();
    };

    const visiable = state.get();

    return (
        <>
            <div
                onClick={closeForm}
                className={`fixed top-0 left-0 right-0 bottom-0 bg-black opacity-0 z-40 ${
                    visiable ? "opacity-75 visible" : "invisible"
                }`}
            ></div>
            <div
                className={`dialog max-h-screen fixed w-1/2 z-50 bg-white rounded overflow-hidden shadow-xl duration-75 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 scale-0 ${
                    visiable ? "scale-100 duration-500" : ""
                }`}
                style={style}
            >
                <div className="flex justify-between py-4 px-5 bg-gray shadow-md font-semibold">
                    <h3>
                        <i className={`${faClass} text-primary mr-2`}></i>
                        {title}
                    </h3>
                    <button
                        className="text-gray-300 self-center"
                        title="close?"
                        onClick={closeForm}
                    >
                        <i className="fas fa-times text-gray-400 hover:text-red self-center"></i>
                    </button>
                </div>
                <div
                    className="px-5 py-6 overflow-y-auto"
                    style={{ maxHeight: "calc(100vh - 100px)" }}
                >
                    {visiable && children}
                </div>
            </div>
        </>
    );
}

export default Popup;
