import React from "react";
import AuthFormField from "../forms/AuthFormField";

const PasswordAuthField = ({ value, confirmation, ...props }) => {
    return (
        <AuthFormField
            name="password"
            label="password"
            id="password"
            type="password"
            value={value}
            placeholder="************"
            icon={confirmation ? `fas fa-check-double` : `fas fa-unlock-alt`}
            minLength="6"
            maxLength="20"
            pattern={confirmation}
            escapePattern
            required
            {...props}
        />
    );
};

export default PasswordAuthField;
