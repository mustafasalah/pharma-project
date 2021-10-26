import React from "react";

const FormButton = ({
    label = "Save Changes",
    faClass = "fas fa-save",
    className = "bg-primary hover:bg-secondary text-white shadow-md",
    onClick,
}) => {
    return (
        <button
            type="submit"
            onClick={onClick}
            className={`rounded-sm py-2 px-3 text-smd font-semibold mr-4 last:mr-0 group ${className}`}
        >
            <i className={`${faClass} text-bright mr-1`}></i> {label}
        </button>
    );
};

export default FormButton;
