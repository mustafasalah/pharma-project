import React from "react";
import FormField from "./FormField";

const PasswordField = ({ confirmation, ...props }) => {
    return (
        <FormField
            label="password"
            name="password"
            id="password"
            type="password"
            placeholder="************"
            minLength="6"
            maxLength="20"
            pattern={confirmation}
            escapePattern
            required
            {...props}
        />
    );
};

export default PasswordField;
