import React from "react";

function TableHead({ columns, sortColumn }) {
    const sortColumnName = sortColumn.columnName.get();
    const order = sortColumn.order.get();

    return (
        <thead>
            <tr className="rounded-t">
                {columns.map(({ title, prop, sortProp, sortable }) => {
                    sortProp = sortProp || prop;
                    const isCurrentSortingColumn = sortColumnName === sortProp;
                    return (
                        <th
                            key={title}
                            className={`first:rounded-tl last:rounded-tr capitalize select-none ${
                                sortable !== false ? "cursor-pointer" : ""
                            }`}
                            onClick={() => {
                                if (sortable !== false) {
                                    sortColumn.set({
                                        columnName: sortProp,
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
