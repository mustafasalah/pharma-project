import React from "react";

function Loading({
    label = "Loading",
    className = "bg-gray-100 h-screen flex",
}) {
    return (
        <div className={className}>
            <p className="text-center m-auto">
                <i className="fas fa-spinner text-primary animate-spin text-lg"></i>
                <strong className="font-medium block mt-2">{label}</strong>
            </p>
        </div>
    );
}

export default Loading;
