import React from "react";

const SectionHeader = ({ name, faClass = "", addButton = false }) => {
    return (
        <h2 className="flex items-center">
            <span className="font-bold text-2xl">
                <i className={`${faClass} text-primary mr-2`}></i> {name}
            </span>
            {addButton && (
                <button
                    className="ml-auto rounded-sm shadow-md bg-secondary font-semibold py-1.5 px-3 text-xs text-white hover:bg-primary"
                    onClick={addButton.handler}
                >
                    <i className="fas fa-plus mr-1.5"></i>
                    {addButton.label}
                </button>
            )}
        </h2>
    );
};

export default SectionHeader;
