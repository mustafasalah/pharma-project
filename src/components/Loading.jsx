import React from "react";

function Loading() {
    return (
        <div className="bg-gray-100 h-screen flex">
            <p className="text-center m-auto">
                <i className="fas fa-spinner text-primary animate-spin text-lg"></i>
                <strong className="font-medium block mt-2">Loading</strong>
            </p>
        </div>
    );
}

export default Loading;
