import React from "react";
import PasswordAuthField from "../common/PasswordAuthField";
import AuthForm from "./AuthForm";
import AuthFormField from "./AuthFormField";
import PhoneNumberAuthField from "./PhoneNumberAuthField";
import UsernameAuthField from "./UsernameAuthField";

const SignupForm = ({ formState, onSubmit }) => {
    return (
        <AuthForm
            submitBtn={{
                label: "Create Account",
                faClass: "fas fa-user-plus",
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
                icon="fas fa-check-double"
                required
            />

            <PhoneNumberAuthField
                id="phone_number"
                value={formState.phone_number}
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
