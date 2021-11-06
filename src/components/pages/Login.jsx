import { useState } from "@hookstate/core";
import React from "react";
import { Link } from "react-router-dom";
import AuthSectionHeader from "../common/AuthSectionHeader";
import AuthForm from "../forms/AuthForm";
import FormField from "../forms/FormField";

const Login = () => {
    const loginForm = useState({
        username: "",
        password: "",
    });

    return (
        <>
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
            >
                <FormField
                    name="username"
                    inputClassName="bg-gray-100 border p-2 pr-6 w-full rounded-sm shadow"
                    label="username"
                    id="username"
                    value={loginForm.username}
                    placeholder="e.g. Ahmed"
                    inputWrapper
                    contentAfter={
                        <i className="fas fa-user absolute top-1/2 transform -translate-y-1/2 right-3.5 text-xs text-gray-300"></i>
                    }
                />

                <FormField
                    name="password"
                    inputClassName="bg-gray-100 border p-2 w-full rounded-sm shadow"
                    label="password"
                    id="password"
                    value={loginForm.password}
                    placeholder="************"
                    inputWrapper
                    contentAfter={
                        <>
                            <i className="fas fa-unlock-alt absolute top-1/2 transform -translate-y-1/2 right-3.5 text-xs text-gray-300"></i>
                        </>
                    }
                />

                <Link to="/forget-password" className="text-xs italic -mt-2.5">
                    Forgetten password?
                </Link>
            </AuthForm>
        </>
    );
};

export default Login;
