import React from "react";
import FormField from "./FormField";

const PhoneNumberField = (props) => {
    return (
        <FormField
            label="phone number"
            name="phone_number"
            type="tel"
            maxLength="13"
            pattern="\+?249[19]\d{8}"
            placeholder="e.g. +2499XXXXXXXX"
            {...props}
        />
    );
};

export default PhoneNumberField;
