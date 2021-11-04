import React, { useEffect } from "react";
import { DevTools, useState } from "@hookstate/core";
import TableRow from "./TableRow";
import store from "../../state";
import { useRouteMatch } from "react-router";

function TableBody({ data, columns, form }) {
    const { params } = useRouteMatch();
    const editedRow = useState(null);
    const { popupWindow } = useState(store);
    DevTools(editedRow).label("edited_row");

    useEffect(() => {
        if (params.id) editedRow.set(+params.id);
    }, [params.id]);

    return (
        <tbody>
            {data.map((item) => {
                const edited = editedRow.get() === item.id.get();
                return (
                    <TableRow
                        key={item.id.value}
                        highlight={params.id && +params.id === item.id.get()}
                        form={form && form(item, () => editedRow.set(null))}
                        edited={edited}
                        columnsWidth={columns.map((col) => col.width)}
                        data={columns.map(
                            ({ prop, wrapper, defaultValue = "" }) =>
                                prop
                                    ? item[prop].value === ""
                                        ? defaultValue
                                        : item[prop].value
                                    : wrapper({
                                          ...item,
                                          edited,
                                          handleEdit: (id) => {
                                              editedRow.set(id);
                                          },
                                          popupWindow,
                                          item,
                                      })
                        )}
                    />
                );
            })}
        </tbody>
    );
}

export default TableBody;
