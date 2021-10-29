import React from "react";
import Popup from "../common/Popup";
import Form from "./Form";

const PopupForm = ({
    children,
    className,
    onSubmit,
    formButtons = [{}],
    ...props
}) => {
    return (
        <Popup {...props}>
            <Form
                formButtons={formButtons}
                className={className}
                onSubmit={onSubmit}
            >
                {children}
            </Form>
        </Popup>
    );
};

export default PopupForm;
