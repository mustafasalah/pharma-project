import React, { useCallback, useState } from "react";

const Section = ({ label, className, children, contentClassName = "p-5" }) => {
    const [display, setDisplay] = useState(true);

    const handleDisplay = useCallback(() => {
        setDisplay(!display);
    }, [display]);

    return (
        <section
            className={`${
                display ? "shadow-md" : "shadow"
            } rounded ${className}`}
        >
            <h3
                onClick={handleDisplay}
                className={`${
                    display ? "rounded-t" : "rounded"
                } bg-gray cursor-pointer items-center flex text-sm text-gray-700 border-b-2 px-4 py-3 font-semibold`}
            >
                {label}
                <i
                    className={`fas fa-angle-${
                        display ? "up" : "down"
                    } text-gray-300 ml-auto`}
                ></i>
            </h3>
            {display && (
                <div
                    className={`text-sm bg-white rounded-b select-none ${contentClassName}`}
                >
                    {children}
                </div>
            )}
        </section>
    );
};

export default Section;
