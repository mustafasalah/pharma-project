import React from "react";

const DeleteBtn = ({ onDelete, title = "Delete?" }) => {
    return (
        <button
            title={title}
            type="button"
            className="manage-btn bg-red text-red-light hover:text-red hover:bg-white"
            onClick={onDelete}
        >
            <i className="fas fa-trash-alt"></i>
        </button>
    );
};

export default DeleteBtn;
