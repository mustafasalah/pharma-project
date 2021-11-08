import { useState } from "@hookstate/core";
import React from "react";
import { Link, useHistory } from "react-router-dom";
import { login } from "../../services/auth";
import { notify } from "../../utility";
import AuthSectionHeader from "../common/AuthSectionHeader";
import AuthForm from "../forms/AuthForm";
import AuthFormField from "../forms/AuthFormField";
import store from "../../state";
import PasswordAuthField from "../common/PasswordAuthField";
import UsernameAuthField from "../forms/UsernameAuthField";

const Login = () => {
    const { loggedUser } = useState(store);
    const loginForm = useState({
        username: "",
        password: "",
    });

    const history = useHistory();

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
                        successCallback() {
                            // Set loggedUser state
                            loggedUser.set(data);

                            // redirect to home page
                            history.replace("/");
                        },
                        errorMsg:
                            "The username or the password is incorrect, please try again",
                        errorCallback() {
                            loginForm.username.set("");
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
