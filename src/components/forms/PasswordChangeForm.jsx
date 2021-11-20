import { useHookstate } from "@hookstate/core";
import React from "react";
import { changePassword } from "../../services/auth";
import store from "../../state";
import { notify } from "../../utility";
import Form from "./Form";
import FormField from "./FormField";
import PasswordField from "./PasswordField";

const defaultState = {
    newPassword: "",
    confirmPassword: "",
    oldPassword: "",
};

const PasswordChangeForm = () => {
    const { loggedUser } = useHookstate(store);
    const formData = useHookstate({ ...defaultState });

    return (
        <Form
            className="grid gap-y-5"
            onSubmit={async () => {
                const { status } = await changePassword(
                    loggedUser.id.value,
                    formData.value
                );
                notify({
                    status,
                    waitMsg: "Changing Password...",
                    successMsg: "Your password has been changed successfully!",
                    successCallback() {
                        formData.set({
                            ...defaultState,
                        });
                    },
                });
            }}
            formButtons={[
                {
                    label: "Change Password",
                    faClass: "fas fa-exchange-alt",
                },
            ]}
        >
            <PasswordField
                className="flex flex-col"
                value={formData.newPassword}
                placeholder="Your new password here..."
            />

            <PasswordField
                className="flex flex-col"
                label="confirm password"
                name="confirm_password"
                id="confirm_password"
                value={formData.confirmPassword}
                confirmation={formData.newPassword.value}
                placeholder="Confirm your new password here..."
            />

            <PasswordField
                className="flex flex-col"
                label="old password"
                name="old_password"
                id="old_password"
                value={formData.oldPassword}
                placeholder="Your old password here..."
            />
        </Form>
    );
};

export default PasswordChangeForm;
