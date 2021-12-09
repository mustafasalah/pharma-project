import React from "react";

function TableRow({
    data,
    edited = false,
    form,
    columnsWidth,
    highlight,
    animate = false,
}) {
    return (
        <>
            <tr
                className={`last:rounded-b ${highlight ? "highlighted" : ""} ${
                    animate ? "animate__animated animate__fadeIn" : ""
                }`}
            >
                {data.map((cell, i) => (
                    <td
                        key={i}
                        style={
                            columnsWidth[i]
                                ? { width: columnsWidth[i] }
                                : undefined
                        }
                        className="first:rounded-bl last:rounded-br"
                    >
                        {cell}
                    </td>
                ))}
            </tr>
            {edited && form && (
                <tr className="last:rounded-b">
                    <td colSpan={data.length}>{form}</td>
                </tr>
            )}
        </>
    );
}

export default TableRow;
