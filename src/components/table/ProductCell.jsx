import React from "react";

const ProductCell = ({ id, name, photo, unit, edited, onEdit }) => {
    return (
        <div className="flex items-center">
            <div
                className="mr-3 bg-no-repeat bg-contain bg-center h-12 w-16 px-4 border border-gray-200 rounded-sm"
                style={{
                    backgroundImage: `url('${photo}')`,
                }}
            ></div>
            <div className="inline-flex flex-col h-full">
                {onEdit ? (
                    <a
                        href={`#${name}`}
                        onClick={() => onEdit(edited ? null : id.value)}
                        className="text-sm"
                    >
                        {name}
                    </a>
                ) : (
                    <span className="text-sm select-none">{name}</span>
                )}
                <span className="text-gray-500 text-xs mt-1">({unit})</span>
            </div>
        </div>
    );
};

export default ProductCell;
