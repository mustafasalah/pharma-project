import React from "react";

function TableHead({ columns, sortColumn }) {
    const sortColumnName = sortColumn.columnName.get();
    const order = sortColumn.order.get();

    return (
        <thead>
            <tr>
                {columns.map(({ title, prop, sortable }) => {
                    const isCurrentSortingColumn = sortColumnName === prop;
                    return (
                        <th
                            key={title}
                            className={`capitalize ${
                                sortable !== false ? "cursor-pointer" : ""
                            }`}
                            onClick={() => {
                                if (sortable !== false) {
                                    sortColumn.set({
                                        columnName: prop,
                                        order: isCurrentSortingColumn
                                            ? order === "desc"
                                                ? "asc"
                                                : "desc"
                                            : "desc",
                                    });
                                }
                            }}
                        >
                            {title}
                            {isCurrentSortingColumn && (
                                <i
                                    className={`ml-1 fas fa-sort-${
                                        order === "desc" ? "down" : "up"
                                    }`}
                                ></i>
                            )}
                        </th>
                    );
                })}
            </tr>
        </thead>
    );
}

export default TableHead;
