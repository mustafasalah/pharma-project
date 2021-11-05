import { useState } from "@hookstate/core";
import React from "react";
import store from "../state";

const CollapseBtn = ({ className = "collapse-btn" }) => {
    const { collapseMenu } = useState(store);

    return (
        <button
            title={
                collapseMenu.value
                    ? "extend menu to its full size"
                    : "collapse menu to its minimum size"
            }
            id="collapse-btn"
            onClick={() => {
                const newValue = !collapseMenu.value;
                collapseMenu.set(newValue);
                localStorage.setItem("collapse_menu", newValue.toString());
            }}
            className={className}
        >
            <i
                className={`fas fa-chevron-${
                    collapseMenu.value ? "right" : "left"
                }`}
            ></i>
        </button>
    );
};

export default CollapseBtn;
