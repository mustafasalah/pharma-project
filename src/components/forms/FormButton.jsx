import React from "react";

const FormButton = ({
    label = "Save Changes",
    faClass = "fas fa-save",
    className = "bg-primary hover:bg-secondary text-white shadow-md rounded text-smd",
    type = "submit",
    onClick,
    iconAfter = false,
}) => {
    return (
        <button
            type={type}
            onClick={onClick}
            className={`py-2 px-3 font-semibold mr-4 last:mr-0 group ${className}`}
        >
            {iconAfter ? (
                <>
                    {label}
                    <i className={`${faClass} text-bright ml-1.5`}></i>
                </>
            ) : (
                <>
                    <i className={`${faClass} text-bright mr-1.5`}></i> {label}
                </>
            )}
        </button>
    );
};

export default FormButton;
