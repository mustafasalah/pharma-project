import React from "react";
import FormButton from "./FormButton";

const Form = ({ children, className, onSubmit, formButtons = [{}] }) => {
    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                return onSubmit(e);
            }}
        >
            <div className={className}>{children}</div>
            <div className="flex justify-end mt-6">
                {formButtons.map((props, i) => (
                    <FormButton key={i} {...props} />
                ))}
            </div>
        </form>
    );
};

export default Form;
