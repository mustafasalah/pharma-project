import React from "react";
import { DevTools, useState } from "@hookstate/core";
import TableRow from "./TableRow";
import store from "../../state";

function TableBody({ data, columns, form }) {
    const editedRow = useState(null);
    const { popupWindow } = useState(store);
    DevTools(editedRow).label("edited_row");

    return (
        <tbody>
            {data.map((item) => {
                const edited = editedRow.get() === item.id.get();
                return (
                    <TableRow
                        key={item.id.value}
                        form={form && form(item, () => editedRow.set(null))}
                        edited={edited}
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
