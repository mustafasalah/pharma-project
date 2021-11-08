import React from "react";
import AuthFormField from "./AuthFormField";

const UsernameAuthField = ({ value, ...props }) => {
    return (
        <AuthFormField
            name="username"
            label="username"
            id="username"
            value={value}
            placeholder="e.g. Ahmed"
            icon="fas fa-user"
            minLength="2"
            maxLength="20"
            pattern="\w+"
            {...props}
        />
    );
};

export default UsernameAuthField;
