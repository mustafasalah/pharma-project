import React from "react";
import { useState } from "@hookstate/core";
import AuthSectionHeader from "../common/AuthSectionHeader";
import AuthForm from "../forms/AuthForm";
import FormField from "../forms/FormField";

const ResetPassword = () => {
    const resetPasswordForm = useState({
        password: "",
        confirm_password: "",
    });

    return (
        <>
            <AuthSectionHeader name="Reset My Password" />
            <AuthForm
                submitBtn={{
                    label: "Reset My Password",
                    faClass: "fas fa-redo",
                }}
                footerLink={{
                    link: "/sign-up",
                    content: "Don't have an account? Signup now",
                }}
            >
                <FormField
                    name="password"
                    inputClassName="bg-gray-100 border p-2 pr-6 w-full rounded-sm shadow"
                    label="new password"
                    id="password"
                    value={resetPasswordForm.password}
                    placeholder="************"
                    inputWrapper
                    contentAfter={
                        <i className="fas fa-unlock-alt absolute top-1/2 transform -translate-y-1/2 right-3.5 text-xs text-gray-300"></i>
                    }
                />

                <FormField
                    name="confirm_password"
                    inputClassName="bg-gray-100 border p-2 w-full rounded-sm shadow"
                    label="confirm password"
                    id="confirm_password"
                    value={resetPasswordForm.confirm_password}
                    placeholder="************"
                    inputWrapper
                    contentAfter={
                        <>
                            <i className="fas fa-check-double absolute top-1/2 transform -translate-y-1/2 right-3.5 text-xs text-gray-300"></i>
                        </>
                    }
                />
            </AuthForm>
        </>
    );
};

export default ResetPassword;
