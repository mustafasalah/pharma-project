import React from "react";

const SectionHeader = ({
    name = "",
    faClass = "",
    addButton = false,
    selectMenu = false,
}) => {
    const id = name.replace(" ", "_");
    return (
        <h2 className="flex items-center mb-4">
            <span className="font-bold text-xl">
                <i className={`${faClass} text-primary mr-2`}></i> {name}
            </span>
            {selectMenu && (
                <div className="ml-auto text-gray-500 text-smd font-medium">
                    <label htmlFor={id}>{selectMenu.label}</label>
                    <select
                        id={id}
                        value={selectMenu.value}
                        onChange={selectMenu.onchange}
                        className="ml-3 text-xs rounded-sm bg-white shadow px-1.5 py-1"
                    >
                        {selectMenu.options.map(({ label, value }) => (
                            <option key={value} value={value}>
                                {label}
                            </option>
                        ))}
                    </select>
                </div>
            )}
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
