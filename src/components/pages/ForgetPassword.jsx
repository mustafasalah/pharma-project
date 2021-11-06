import React from "react";
import { useState } from "@hookstate/core";
import AuthSectionHeader from "../common/AuthSectionHeader";
import AuthForm from "../forms/AuthForm";
import FormField from "../forms/FormField";
import Note from "../common/Note";

const ForgetPassword = () => {
    const forgetForm = useState({
        email: "",
        confirm_email: "",
    });

    return (
        <>
            <AuthSectionHeader name="Forget My Password" />
            <AuthForm
                submitBtn={{
                    label: "Send Reset Link",
                    faClass: "fas fa-paper-plane",
                }}
                footerLink={{
                    link: "/sign-up",
                    content: "Don't have an account? Signup now",
                }}
            >
                <Note className="text-smd">
                    <strong>Note:</strong> You will receive reset link in your
                    email inbox to reset your password to new one.
                </Note>
                <FormField
                    name="email"
                    inputClassName="bg-gray-100 border p-2 pr-6 w-full rounded-sm shadow"
                    label="email"
                    id="email"
                    value={forgetForm.email}
                    placeholder="e.g. example@example.com"
                    inputWrapper
                    contentAfter={
                        <i className="fas fa-at absolute top-1/2 transform -translate-y-1/2 right-3.5 text-xs text-gray-300"></i>
                    }
                />

                <FormField
                    name="confirm_email"
                    inputClassName="bg-gray-100 border p-2 w-full rounded-sm shadow"
                    label="confirm email"
                    id="confirm_email"
                    value={forgetForm.confirm_email}
                    placeholder="e.g. example@example.com"
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

export default ForgetPassword;
