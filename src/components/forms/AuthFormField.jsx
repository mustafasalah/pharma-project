import React from "react";
import FormField from "./FormField";

const AuthFormField = ({ icon, ...props }) => {
    return (
        <FormField
            inputClassName={`bg-gray-100 border p-2 w-full rounded-sm shadow ${
                icon ? "pr-6" : ""
            }`}
            inputWrapper={!!icon}
            contentAfter={
                icon && (
                    <i
                        className={`${icon} absolute top-1/2 transform -translate-y-1/2 right-3.5 text-xs text-gray-300`}
                    ></i>
                )
            }
            {...props}
        />
    );
};

export default AuthFormField;
