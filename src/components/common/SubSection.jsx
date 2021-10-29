import React, { useState } from "react";

const SubSection = ({ label, children }) => {
    const [display, setDisplay] = useState(false);

    return (
        <section
            className={`shadow overflow-hidden${
                display ? "" : " border-b-2 last:border-b-0"
            }`}
        >
            <h4
                onClick={() => setDisplay(!display)}
                className="flex cursor-pointer items-center bg-secondary font-semibold text-sm text-white shadow px-3 py-2"
            >
                {label}
                <span className="bg-white rounded-sm shadow text-secondary ml-2 text-xxs px-1.5">
                    <i className="fas fa-check"></i> Active
                </span>
                <i
                    className={`fas fa-angle-${
                        display ? "up" : "down"
                    } ml-auto text-xs`}
                ></i>
            </h4>
            {display && children}
        </section>
    );
};

export default SubSection;
