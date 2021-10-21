import React from "react";

function TableRow({ data, edited = false, form, onEdit }) {
    return (
        <>
            <tr>
                {data.map((cell, i) => (
                    <td key={i}>{cell}</td>
                ))}
            </tr>
            {edited && form && (
                <tr>
                    <td colSpan={data.length}>{form}</td>
                </tr>
            )}
        </>
    );
}

export default TableRow;
