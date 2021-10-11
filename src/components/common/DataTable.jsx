import { useState } from "@hookstate/core";
import React, { useMemo } from "react";
import Filters from "./Filters";
import { DevTools } from "@hookstate/core";

function range(min, max) {
    const nums = [];
    for (let i = min; i <= max; i++) {
        nums.push(i);
    }
    return nums;
}

function Pagination({ paginationData, data, onPaginate }) {
    const itemsPerPage = paginationData.itemsPerPage.get();
    const length = paginationData.length.get();
    const currentPage = paginationData.currentPage.get();
    const actualLength = Math.ceil(data.length / itemsPerPage);
    let start = currentPage - Math.floor(length / 2);
    start = start < 1 ? 1 : start;
    let end = start + length - 1;
    end = end > actualLength ? actualLength : end;

    return (
        <ol className="float-right mt-6 text-sm">
            <li>
                {start > 1 && (
                    <button
                        className="py-2 px-4 rounded-sm mr-1 last:mr-0 font-medium text-primary hover:text-secondary"
                        onClick={() => onPaginate(1)}
                    >
                        <i className="fas fa-angle-double-left"></i>
                    </button>
                )}
                {range(start, end).map((index) => (
                    <button
                        className={`py-2 px-4 rounded-sm font-medium ${
                            +currentPage === index
                                ? "bg-primary shadow-md text-white cursor-default"
                                : "hover:text-primary"
                        }`}
                        onClick={() =>
                            index !== +currentPage ? onPaginate(index) : null
                        }
                    >
                        {index}
                    </button>
                ))}
                {end < actualLength && (
                    <button
                        className="py-2 px-4 rounded-sm mr-1 last:mr-0 font-medium text-primary hover:text-secondary"
                        onClick={() => onPaginate(actualLength)}
                    >
                        <i className="fas fa-angle-double-right"></i>
                    </button>
                )}
            </li>
        </ol>
    );
}

function TableRow({ data, edited, form }) {
    return (
        <>
            <tr>
                {data.map((cell, i) => (
                    <td key={i}>{cell}</td>
                ))}
            </tr>
            {edited && (
                <tr>
                    <td colSpan={data.length}>{form}</td>
                </tr>
            )}
        </>
    );
}

function TableHead({ columns }) {
    return (
        <thead>
            <tr>
                {columns.map(({ title }) => (
                    <th key={title} className="capitalize">
                        {title}
                    </th>
                ))}
            </tr>
        </thead>
    );
}

function TableBody({ data, columns, form }) {
    const editedRow = useState(null);
    DevTools(editedRow).label("edited_row");

    return (
        <tbody>
            {data.map((item) => {
                const edited = editedRow.get() === item.id.get();
                return (
                    <TableRow
                        key={item.id.value}
                        form={form(item)}
                        edited={edited}
                        data={columns.map(({ prop, wrapper }) =>
                            prop
                                ? item[prop].value
                                : wrapper({
                                      ...item,
                                      edited,
                                      handleEdit: (id) => {
                                          editedRow.set(id);
                                      },
                                  })
                        )}
                    />
                );
            })}
        </tbody>
    );
}

function Table({ data, columns, form }) {
    if (data.length === 0)
        return (
            <p className="rounded shadow-lg bg-white mt-5 text-center text-gray-400 text-sm p-5 italic">
                There is no data yet.
            </p>
        );

    return (
        <>
            <table>
                <TableHead columns={columns} />
                <TableBody columns={columns} data={data} form={form} />
            </table>
        </>
    );
}

function filterData(filters, filtersData, data) {
    return data.filter((row) => {
        return filters.every((filter) => {
            const filterData = filtersData[filter.prop].get();
            const rowData = row[filter.by].get();

            if (filterData === "") return true;

            switch (filter.type) {
                case "search":
                    return (
                        rowData.search(new RegExp(`.*${filterData}.*`, "i")) !==
                        -1
                    );

                default:
                    if (filter.handler) {
                        return filter.handler(filterData, rowData);
                    }
                    return filterData === rowData;
            }
        });
    });
}

function paginateData(pagination, data) {
    const { currentPage, itemsPerPage } = pagination.get();
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + +itemsPerPage;
    return data.slice(start, end);
}

function DataTable({ columns, data, form, filters, filtersData, pagination }) {
    const filteredData = useMemo(
        () => filterData(filters, filtersData, data),
        [filters, filtersData, data]
    );
    const paginatedData = useMemo(
        () => paginateData(pagination, filteredData),
        [pagination, data]
    );

    return (
        <>
            <Filters
                filters={filters}
                data={filtersData}
                pagination={pagination}
            />
            <Table data={paginatedData} columns={columns} form={form} />
            <Pagination
                paginationData={pagination}
                data={filteredData}
                onPaginate={pagination.currentPage.set}
            />
        </>
    );
}

export default DataTable;
