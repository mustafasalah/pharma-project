import React from "react";

const AuthSectionHeader = ({ name }) => {
    return (
        <h2 className="text-center font-semibold text-xl mb-10">
            <span className="inline-block pb-2 border-b-2 border-gray-300 border-dashed">
                {name}
            </span>
        </h2>
    );
};

export default AuthSectionHeader;
