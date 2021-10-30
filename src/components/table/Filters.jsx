import React from "react";
import SearchFilter from "./SearchFilter";
import SelectFilter from "./SelectFilter";

function Filters({ filters, data, pagination }) {
    return (
        <div className="text-xs mb-5">
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
                                onChange={filter.onChange}
                            />
                        );

                    default:
                        return (
                            <SelectFilter
                                key={filter.label}
                                label={filter.label}
                                value={data[filter.prop]}
                                options={filter.options}
                                onChange={filter.onChange}
                            />
                        );
                }
            })}

            {pagination && (
                <SelectFilter
                    label="Items per Page"
                    name="items_per_page"
                    className="float-right"
                    value={pagination.itemsPerPage}
                    options={pagination.itemsPerPageOptions
                        .get()
                        .map((option) => ({
                            label: option,
                            value: option,
                        }))}
                />
            )}
        </div>
    );
}

export default Filters;
