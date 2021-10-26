import React from "react";
import Form from "./Form";
import FormField from "./FormField";
import { updateUser } from "../../services/users";
import { notify } from "../../utility";
import { useState, DevTools } from "@hookstate/core";

const UserForm = ({
    state,
    closeForm,
    className = "grid gap-x-5 gap-y-6 grid-cols-12",
}) => {
    const formState = useState(JSON.parse(JSON.stringify(state.value)));
    DevTools(formState).label("User Edit Form State");

    return (
        <Form
            className={className}
            onSubmit={async () => {
                const { status } = await updateUser(state.get());
                notify({
                    status,
                    waitMsg: "Updating User Information...",
                    successMsg:
                        "User information has been updated successfully!",
                    successCallback() {
                        state.set(JSON.parse(JSON.stringify(formState.value)));
                        closeForm();
                    },
                });
            }}
        >
            <FormField
                className="flex flex-col col-span-2"
                label="first name"
                name="first_name"
                id="1"
                value={formState.first_name}
                placeholder="First name here..."
                required
            />

            <FormField
                className="flex flex-col col-span-2"
                label="last name"
                name="last_name"
                id="2"
                value={formState.last_name}
                placeholder="Last name here..."
                required
            />

            <FormField
                className="flex flex-col col-span-3"
                label="username"
                name="username"
                id="3"
                value={formState.username}
                placeholder="username here..."
                required
            />

            <FormField
                className="flex flex-col col-span-3"
                label="email"
                name="email"
                type="email"
                id="4"
                value={formState.email}
                placeholder="email here..."
                required
            />

            <FormField
                className="flex flex-col col-span-2"
                label="role"
                name="role"
                type="select"
                id="5"
                value={formState.role}
                options={[
                    { label: "Admin", value: "admin" },
                    { label: "Pharmacy Owner", value: "pharmacy owner" },
                    { label: "User", value: "user" },
                ]}
            />

            <FormField
                className="flex flex-col col-span-2"
                id="6"
                label="Gender"
                name="gender"
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

            <FormField
                className="flex flex-col col-span-2"
                label="phone number"
                name="phone_number"
                id="7"
                type="tel"
                maxLength="13"
                pattern="\+[0-9]{10,12}"
                value={formState.phone_number}
                placeholder="e.g. +2499XXXXXXXX"
            />

            <FormField
                className="flex flex-col col-span-2"
                label="status"
                name="status"
                type="select"
                id="8"
                value={formState.status}
                options={[
                    { label: "Activated", value: "active" },
                    { label: "Non-activated", value: "non-active" },
                    { label: "banned", value: "banned" },
                ]}
            />

            <FormField
                className="flex flex-col col-span-2"
                label="state"
                name="state"
                type="select"
                id="9"
                value={formState.state}
                options={[{ label: "Khartoum", value: "khartoum" }]}
            />

            <FormField
                className="flex flex-col col-span-2"
                label="city"
                name="city"
                id="10"
                value={formState.city}
                placeholder="city name here..."
            />

            <FormField
                className="flex flex-col col-span-2"
                label="address"
                name="address"
                id="11"
                value={formState.address}
                placeholder="address line here..."
            />
        </Form>
    );
};

export default UserForm;
