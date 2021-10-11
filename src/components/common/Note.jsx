import React from "react";

const Note = ({ children, className }) => {
    return (
        <div
            className={`px-3 py-2 text-gray-600 bg-gray border-dashed border border-gray-300 rounded ${className}`}
        >
            {children}
        </div>
    );
};

export default Note;
