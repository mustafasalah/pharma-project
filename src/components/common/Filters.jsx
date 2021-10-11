import React from "react";

function Filters({ filters, data, pagination }) {
    return (
        <div className="mt-6 text-xs">
            <div className="inline-block font-semibold">
                <i className="fas fa-filter text-bright mr-1"></i> Filters
                <span className="mx-4">|</span>
            </div>

            {filters.map((filter) => {
                switch (filter.type) {
                    case "search":
                        return (
                            <SearchFilter
                                key={filter.label}
                                label={filter.label}
                                value={data[filter.prop]}
                                placeholder={filter.placeholder}
                            />
                        );

                    default:
                        return (
                            <SelectFilter
                                key={filter.label}
                                label={filter.label}
                                value={data[filter.prop]}
                                options={filter.options}
                            />
                        );
                }
            })}

            <SelectFilter
                label="Items per Page"
                name="items_per_page"
                className="float-right"
                value={pagination.itemsPerPage}
                options={pagination.itemsPerPageOptions.get().map((option) => ({
                    label: option,
                    value: option,
                }))}
            />
        </div>
    );
}

export default Filters;

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
