import React from "react";

function SelectFilter({ label, value, options, className = "" }) {
    return (
        <div
            className={`inline-block font-medium relative mr-5 last:mr-0 ${className}`}
        >
            <label htmlFor={label} className="mr-2">
                {label}
            </label>
            <select
                id={label}
                className="inline-block py-1.5 px-2 w-28 border border-gray-300 rounded-sm shadow focus:outline-none"
                value={value.get()}
                onChange={({ target }) => value.set(target.value)}
            >
                {options.map((item) => (
                    <option key={item.value} value={item.value}>
                        {item.label}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default SelectFilter;
