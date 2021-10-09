import { useState } from "@hookstate/core";
import React from "react";
import Filters from "./Filters";
import { DevTools } from "@hookstate/core";

function Pagination() {
    return (
        <ol className="float-right mt-6 text-sm">
            <li>
                <button className="py-2 px-4 rounded-sm font-medium bg-primary shadow-md text-white">
                    1
                </button>
                <button className="py-2 px-4 rounded-sm font-medium hover:text-primary">
                    2
                </button>
                <button className="py-2 px-4 rounded-sm font-medium hover:text-primary">
                    3
                </button>
                <button className="py-2 px-4 rounded-sm mr-1 last:mr-0 font-medium text-primary hover:text-secondary">
                    <i className="fas fa-angle-double-right"></i>
                </button>
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
            {edited && <tr>{form}</tr>}
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
    if (data.length === 0) return <p>There is no data yet.</p>;

    return (
        <>
            <table>
                <TableHead columns={columns} />
                <TableBody columns={columns} data={data} form={form} />
            </table>
            <Pagination />
        </>
    );
}

function DataTable({ columns, data, form, filters, filtersData }) {
    return (
        <>
            <Filters filters={filters} data={filtersData} />
            <Table data={data} columns={columns} form={form} />
        </>
    );
}

export default DataTable;
