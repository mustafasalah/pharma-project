import React from "react";
import { Link } from "react-router-dom";
import FormButton from "./FormButton";

const AuthForm = ({
    children,
    submitBtn,
    footerLink,
    onSubmit,
    className = "flex flex-col gap-y-6",
}) => {
    return (
        <div className="bg-white rounded shadow-md p-5 text-sm animate__animated animate__fadeIn">
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    onSubmit();
                }}
            >
                <div className={className}>{children}</div>
                <FormButton
                    label={submitBtn.label}
                    faClass={submitBtn.faClass}
                    iconAfter
                    className={`${
                        submitBtn.className || "w-full"
                    } mt-6 rounded-sm shadow-md py-2.5 text-sm bg-primary text-white hover:bg-secondary`}
                />
            </form>
            {footerLink && (
                <div className="border-t-2 bg-gray-100 py-3 -mx-5 -mb-5 mt-6 rounded-b text-center">
                    <Link
                        to={footerLink.link}
                        className="text-gray-500 font-medium text-xs"
                    >
                        {footerLink.content}
                    </Link>
                </div>
            )}
        </div>
    );
};

export default AuthForm;
