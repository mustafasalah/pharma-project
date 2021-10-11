import React from "react";
import FormButtons from "./FormButtons";

const Form = ({ children, className, withDiscard = false }) => {
    return (
        <form action="#" method="post">
            <div className={className}>{children}</div>
            <FormButtons withDiscard={withDiscard} />
        </form>
    );
};

export default Form;
