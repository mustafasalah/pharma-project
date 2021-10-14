import React from "react";

const ManageBtns = ({ id, edited, onEdit, onDelete }) => {
    return (
        <>
            <button
                title="Delete?"
                className="manage-btn bg-red text-red-light hover:text-red hover:bg-white"
                onClick={() => onDelete(id.value)}
            >
                <i className="fas fa-trash-alt"></i>
            </button>

            <button
                title="Edit?"
                className={`manage-btn  text-white ${
                    edited ? "bg-secondary" : "bg-primary hover:bg-secondary"
                }`}
                onClick={() => onEdit(edited ? null : id.value)}
            >
                <i className="fas fa-edit mr-1"></i>
                <span>Edit</span>
                <i
                    className={`fas fa-caret-${edited ? "up" : "down"} ml-1`}
                ></i>
            </button>
        </>
    );
};

export default ManageBtns;
