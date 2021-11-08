import React, { useEffect } from "react";
import { useState } from "@hookstate/core";
import AuthSectionHeader from "../common/AuthSectionHeader";
import AuthForm from "../forms/AuthForm";
import PasswordAuthField from "../common/PasswordAuthField";
import { resetPassword, verifyToken } from "../../services/auth";
import { useHistory, useParams } from "react-router";
import { notify } from "../../utility";
import SuccessPage from "../common/SuccessPage";

const ResetPassword = () => {
    const resetPasswordForm = useState({
        password: "",
        confirm_password: "",
    });

    const showSuccessPage = useState(false);
    const { token } = useParams();
    const history = useHistory();

    // Token Verification
    useEffect(() => {
        (async () => {
            const { status } = await verifyToken(token);
            // if token is invalid redirect user into forget password page
            if (status !== 200) history.replace("/forget-password");
        })();
    }, []);

    return (
        <div
            className={`mt-10 mx-auto ${
                showSuccessPage.value ? "max-w-xl" : "w-96"
            }`}
        >
            {showSuccessPage.value ? (
                <SuccessPage
                    title="your password has been reset successfully!"
                    redirect={{ link: "/login", pageName: "Login Page" }}
                ></SuccessPage>
            ) : (
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
                        onSubmit={async () => {
                            const { status } = await resetPassword(
                                token,
                                resetPasswordForm.password.get()
                            );
                            notify({
                                status,
                                successCallback() {
                                    showSuccessPage.set(true);
                                },
                                errorMsg:
                                    "This link to reset password is invalid! you will be redirected to forget password page.",
                                errorCallback() {
                                    window.setTimeout(
                                        () =>
                                            history.replace("/forget-password"),
                                        5000
                                    );
                                },
                            });
                        }}
                    >
                        <PasswordAuthField
                            label="new password"
                            value={resetPasswordForm.password}
                        />

                        <PasswordAuthField
                            name="confirm_password"
                            label="confirm new password"
                            id="confirm_password"
                            value={resetPasswordForm.confirm_password}
                            confirmation={resetPasswordForm.password.value}
                        />
                    </AuthForm>
                </>
            )}
        </div>
    );
};

export default ResetPassword;
