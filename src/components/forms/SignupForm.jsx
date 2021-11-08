import React from "react";
import PasswordAuthField from "../common/PasswordAuthField";
import AuthForm from "./AuthForm";
import AuthFormField from "./AuthFormField";
import UsernameAuthField from "./UsernameAuthField";

const SignupForm = ({ formState, onSubmit, haveNextBtn = false }) => {
    return (
        <AuthForm
            submitBtn={{
                label: haveNextBtn ? "Next" : "Sign up",
                faClass: haveNextBtn
                    ? "fas fa-arrow-right"
                    : "fas fa-user-plus",
                className: "w-72 mx-auto-important block",
            }}
            footerLink={{
                link: "/login",
                content: "Do you have an account? Login now",
            }}
            className="grid grid-cols-2 gap-6"
            onSubmit={onSubmit}
        >
            <AuthFormField
                name="first_name"
                label="first name"
                id="firstname"
                value={formState.first_name}
                placeholder="e.g. Mustafa"
                minLength="2"
                maxLength="20"
                pattern="[^\d\s]+"
                required
            />

            <AuthFormField
                name="last_name"
                label="last name"
                id="lastname"
                value={formState.last_name}
                placeholder="e.g. Salah"
                minLength="2"
                maxLength="20"
                pattern="[^\d\s]+"
                required
            />

            <UsernameAuthField value={formState.username} required />

            <AuthFormField
                name="email"
                label="email"
                id="email"
                type="email"
                value={formState.email}
                placeholder="e.g. examle@example.com"
                icon="fas fa-envelope"
                required
            />

            <PasswordAuthField value={formState.password} required />

            <PasswordAuthField
                name="confirm_password"
                label="confirm password"
                id="confirm_password"
                value={formState.confirm_password}
                confirmation={formState.password.value}
                required
            />

            <AuthFormField
                name="phone_number"
                label="phone number"
                id="phone_number"
                type="tel"
                pattern="\+[0-9]{10,12}"
                value={formState.phone_number}
                placeholder="e.g. +249XXXXXXXXX"
                icon="fas fa-phone"
                required
            />

            <AuthFormField
                name="gender"
                label="gender"
                id="gender"
                type="radio"
                value={formState.gender}
                options={[
                    {
                        label: "Male",
                        value: "m",
                    },
                    {
                        label: "Female",
                        value: "f",
                    },
                ]}
            />
        </AuthForm>
    );
};

export default SignupForm;
