import React from "react";

const SignupChoice = ({ label, icon, title, onSelect }) => {
    return (
        <button className="group" title={title} onClick={onSelect}>
            <span className="block bg-white text-primary group-hover:text-white group-hover:bg-primary shadow-md rounded py-10 text-center w-36">
                <i className={`${icon} text-5xl transition-none`}></i>
            </span>
            <strong className="mt-3 font-semibold inline-block group-hover:text-primary">
                {label}
            </strong>
        </button>
    );
};

export default SignupChoice;
