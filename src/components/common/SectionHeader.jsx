import React from "react";

const SectionHeader = ({ name, link, faClass = "" }) => {
    return (
        <h2>
            <span className="font-bold text-2xl">
                <i className={`${faClass} text-primary mr-2`}></i> {name}
            </span>
            {/* {link && (
                <Link to={link.href} className="add-new radius-3">
                    {link.label}
                </Link>
            )} */}
        </h2>
    );
};

export default SectionHeader;
