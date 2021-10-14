import React from "react";
import Form from "./Form";

const PopupForm = ({ title, children, state, className, onSubmit }) => {
    const closeForm = state.set.bind(state, false);
    return (
        <>
            <div
                onClick={closeForm}
                className={`fixed top-0 left-0 right-0 bottom-0 bg-black opacity-0 z-40 ${
                    state.get() ? "opacity-75 visible" : "invisible"
                }`}
            ></div>
            <div
                className={`fixed w-1/2 z-50 bg-white rounded overflow-hidden shadow-xl duration-75 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 scale-0 ${
                    state.get() ? "scale-100 duration-500" : ""
                }`}
            >
                <div className="flex justify-between py-4 px-5 bg-gray shadow-md font-semibold">
                    <h3>
                        <i className="fas fa-plus-square text-primary mr-2"></i>
                        {title}
                    </h3>
                    <button
                        className="text-gray-300 self-center"
                        title="close?"
                        onClick={closeForm}
                    >
                        <i className="fas fa-times text-gray-400 self-center"></i>
                    </button>
                </div>
                <div className="px-5 py-6">
                    <Form className={className} onSubmit={onSubmit} withDiscard>
                        {children}
                    </Form>
                </div>
            </div>
        </>
    );
};

export default PopupForm;
