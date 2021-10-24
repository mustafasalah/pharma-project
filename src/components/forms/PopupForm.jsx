import React from "react";
import Popup from "../common/Popup";
import Form from "./Form";

const PopupForm = ({ children, className, onSubmit, ...props }) => {
    return (
        <Popup {...props}>
            <Form className={className} onSubmit={onSubmit} withDiscard>
                {children}
            </Form>
        </Popup>
    );
};

export default PopupForm;
