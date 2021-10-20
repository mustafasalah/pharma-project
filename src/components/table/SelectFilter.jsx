import React from "react";
import FormField from "../forms/FormField";

function SelectFilter({ label, value, options, className = "" }) {
    return (
        <div
            className={`inline-block font-medium relative mr-5 last:mr-0 ${className}`}
        >
            <label htmlFor={label} className="mr-2 align-middle">
                {label}
            </label>
            <select
                id={label}
                className="inline-block py-1.5 px-2 w-28 border border-gray-300 rounded-sm shadow focus:outline-none"
                value={value.get()}
                onChange={({ target }) => value.set(target.value)}
            >
                {options.map((item, i) => (
                    <option key={i} value={item.value}>
                        {item.label}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default SelectFilter;
