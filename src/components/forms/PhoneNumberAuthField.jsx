import React from "react";
import AuthFormField from "../forms/AuthFormField";

const PhoneNumberAuthField = (props) => {
    return (
        <AuthFormField
            label="phone number"
            name="phone_number"
            type="tel"
            maxLength="13"
            pattern="\+?249[19]\d{8}"
            placeholder="e.g. +2499XXXXXXXX"
            icon="fas fa-phone"
            {...props}
        />
    );
};

export default PhoneNumberAuthField;
