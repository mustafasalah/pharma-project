import React from "react";

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

export default TableRow;
