import React from "react";

const ManageBtns = ({ id, edited, onEdit, onDelete, onView, onPrint }) => {
    return (
        <>
            {onDelete && (
                <button
                    title="Delete?"
                    className="manage-btn bg-red text-red-light hover:text-red hover:bg-white"
                    onClick={() => onDelete(id.value)}
                >
                    <i className="fas fa-trash-alt"></i>
                </button>
            )}
            {onPrint && (
                <button
                    title="Print?"
                    className="manage-btn shadow bg-gray-200 text-gray-600 hover:text-black hover:bg-white"
                    onClick={onPrint}
                >
                    <i className="fas fa-print"></i>
                </button>
            )}
            {onEdit && (
                <button
                    title="Edit?"
                    className={`manage-btn  text-white ${
                        edited
                            ? "bg-secondary"
                            : "bg-primary hover:bg-secondary"
                    }`}
                    onClick={() => onEdit(edited ? null : id.value)}
                >
                    <i className="fas fa-edit text-bright mr-1.5"></i>
                    <span>Edit</span>
                    <i
                        className={`fas fa-caret-${
                            edited ? "up" : "down"
                        } ml-1`}
                    ></i>
                </button>
            )}
            {onView && (
                <button
                    title="View Detials?"
                    className={`manage-btn text-white bg-primary hover:bg-secondary`}
                    onClick={onView}
                >
                    <i className="fas fa-file-invoice text-bright mr-1.5"></i>
                    <span>View Detials</span>
                </button>
            )}
        </>
    );
};

export default ManageBtns;
