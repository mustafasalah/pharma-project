import React from "react";

function Logo({
    className = "flex items-center py-6 border-b-2 border-r border-gray-200",
    withoutCollapseBtn = false,
}) {
    return (
        <div className={className}>
            <div id="logo" className="px-6">
                <a className="block" href="/">
                    <img src="/assets/images/logo.png" alt="Pharma Logo" />
                </a>
            </div>
            {!withoutCollapseBtn && (
                <button
                    id="collapse-btn"
                    className="
            text-xs
            px-2.5
            py-1.5
            text-gray-300
            bg-gray-100
            rounded-l
            border border-r-0 border-gray-200 transition-none
            active:bg-primary active:border-primary active:text-white
        "
                >
                    <i className="fas fa-chevron-left"></i>
                </button>
            )}
        </div>
    );
}

export default Logo;
