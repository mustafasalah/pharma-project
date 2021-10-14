import React from "react";
import FormButtons from "./FormButtons";

const Form = ({ children, className, onSubmit, withDiscard = false }) => {
    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                return onSubmit(e);
            }}
        >
            <div className={className}>{children}</div>
            <FormButtons withDiscard={withDiscard} />
        </form>
    );
};

export default Form;
