import React from "react";

function SearchFilter({ label = "Search", placeholder, value }) {
    return (
        <div className="inline-block font-medium relative mr-5">
            <label htmlFor={label} className="mr-2">
                {label}
            </label>
            <input
                id={label}
                className="inline-block py-1.5 px-2 w-72 border border-gray-300 rounded-sm shadow focus:outline-none"
                type="search"
                placeholder={placeholder}
                value={value.get()}
                onChange={({ target }) => value.set(target.value)}
            />
            <i className="fas fa-search absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-300"></i>
        </div>
    );
}

export default SearchFilter;
