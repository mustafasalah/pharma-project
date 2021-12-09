import React from "react";
import TableHead from "./TableHead";
import TableBody from "./TableBody";

function Table({ data, columns, form, sortColumn, animateRows }) {
    if (data.length === 0)
        return (
            <p className="rounded shadow-lg bg-white mt-5 text-center text-gray-400 text-sm p-5 italic">
                There is no data yet.
            </p>
        );

    return (
        <>
            <table>
                <TableHead columns={columns} sortColumn={sortColumn} />
                <TableBody
                    columns={columns}
                    data={data}
                    form={form}
                    animateRows={animateRows}
                />
            </table>
        </>
    );
}

export default Table;
