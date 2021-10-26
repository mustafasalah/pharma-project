import React from "react";
import DeleteBtn from "../common/DeleteBtn";

const ManageBtns = ({ id, edited, onEdit, onDelete, onView }) => {
    return (
        <div className="flex">
            {onDelete && <DeleteBtn onDelete={() => onDelete(id.value)} />}
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
        </div>
    );
};

export default ManageBtns;
