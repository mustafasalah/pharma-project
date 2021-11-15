import React from "react";
import { useState } from "@hookstate/core";
import AuthSectionHeader from "../common/AuthSectionHeader";
import AuthForm from "../forms/AuthForm";
import Note from "../common/Note";
import AuthFormField from "../forms/AuthFormField";
import { forgetPassword } from "../../services/auth";
import { notify } from "../../utility";
import SuccessPage from "../common/SuccessPage";

const ForgetPassword = () => {
    const forgetForm = useState({
        email: "",
        confirm_email: "",
    });

    const showSuccessPage = useState(false);

    return (
        <div
            className={`mt-10 mx-auto ${
                showSuccessPage.value ? "max-w-xl" : "w-96"
            }`}
        >
            {showSuccessPage.value ? (
                <SuccessPage
                    title="we send password reset link into your email inbox, go check it out!"
                    redirect={{ link: "/login", pageName: "Login Page" }}
                ></SuccessPage>
            ) : (
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
                        onSubmit={async () => {
                            const { status } = await forgetPassword(
                                forgetForm.email.get()
                            );

                            notify({
                                status,
                                successMsg:
                                    "We send password reset link to your email, go and check it out!",
                                successCallback() {
                                    showSuccessPage.set(true);
                                },
                                errorMsg:
                                    "There is no account registerated with this email!",
                            });
                        }}
                    >
                        <Note className="text-smd">
                            <strong>Note:</strong> You will receive reset link
                            in your email inbox to reset your password to new
                            one.
                        </Note>
                        <AuthFormField
                            name="email"
                            label="email"
                            id="email"
                            type="email"
                            value={forgetForm.email}
                            placeholder="e.g. example@example.com"
                            icon="fas fa-at"
                            required
                        />

                        <AuthFormField
                            name="confirm_email"
                            label="confirm email"
                            id="confirm_email"
                            type="email"
                            value={forgetForm.confirm_email}
                            placeholder="e.g. example@example.com"
                            pattern={forgetForm.email.value}
                            icon="fas fa-check-double"
                            escapePattern
                            required
                        />
                    </AuthForm>
                </>
            )}
        </div>
    );
};

export default ForgetPassword;
