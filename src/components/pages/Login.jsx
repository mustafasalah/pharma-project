import { useState } from "@hookstate/core";
import React from "react";
import { Link, useHistory } from "react-router-dom";
import { login } from "../../services/auth";
import { notify } from "../../utility";
import AuthSectionHeader from "../common/AuthSectionHeader";
import AuthForm from "../forms/AuthForm";
import store from "../../state";
import PasswordAuthField from "../common/PasswordAuthField";
import UsernameAuthField from "../forms/UsernameAuthField";
import { toast } from "react-toastify";
import { getPharmacyBranchByEmployee } from "../../services/pharmacies";

const Login = () => {
    const { loggedUser, pharmacyBranch } = useState(store);
    const loginForm = useState({
        username: "",
        password: "",
    });

    const history = useHistory();

    const assignPharmacyBranch = async ({ id }) => {
        try {
            const { data: pharmacyBranchData } =
                await getPharmacyBranchByEmployee(id);
            pharmacyBranch.set(pharmacyBranchData);
            return true;
        } catch (ex) {
            toast.error(
                "There is no pharmacy branch assigned to this employee!"
            );
        }
        return false;
    };

    return (
        <div className="mt-10 w-96 mx-auto">
            <AuthSectionHeader name="Login" />
            <AuthForm
                submitBtn={{
                    label: "Login",
                    faClass: "fas fa-sign-in-alt",
                }}
                footerLink={{
                    link: "/sign-up",
                    content: "Don't have an account? Signup now",
                }}
                onSubmit={async () => {
                    const { username, password } = loginForm.get();
                    const { data, status } = await login(username, password);

                    if (status === 200) {
                        if (
                            data.role === "supervisor" ||
                            data.role === "pharmacist"
                        ) {
                            if ((await assignPharmacyBranch(data)) === false)
                                return;
                        } else if (data.role === "user") {
                            return toast.error(
                                "You don't have permission to access."
                            );
                        }
                    }

                    notify({
                        status,
                        waitMsg: "Logging you in...",
                        successMsg: data ? (
                            <>
                                Welcome Back{" "}
                                <strong className="font-semibold">
                                    {data.first_name} {data.last_name}!
                                </strong>
                            </>
                        ) : (
                            ""
                        ),
                        async successCallback() {
                            // Set loggedUser state
                            loggedUser.set(data);

                            // redirect to home page
                            history.replace("/");
                        },
                        errorMsg:
                            "The username or the password is incorrect, please try again",
                        errorCallback() {
                            loginForm.password.set("");
                        },
                    });
                }}
            >
                <UsernameAuthField value={loginForm.username} />
                <PasswordAuthField value={loginForm.password} />

                <Link to="/forget-password" className="text-xs italic -mt-2.5">
                    Forgetten password?
                </Link>
            </AuthForm>
        </div>
    );
};

export default Login;
