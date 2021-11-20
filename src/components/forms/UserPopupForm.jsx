import { DevTools, useState } from "@hookstate/core";
import React from "react";
import userFormState from "../../states/userFormState";
import FormField from "./FormField";
import PopupForm from "./PopupForm";
import { getUsers, setUser } from "../../services/users";
import { getCityOptions, notify } from "../../utility";
import store from "../../state";
import PhoneNumberField from "./PhoneNumberField";
import PasswordField from "./PasswordField";

const UserPopupForm = ({ showState }) => {
    let state = useState({
        data: { ...userFormState.data },
        errors: { ...userFormState.errors },
    });
    const usersData = useState(store.tables.users.data);
    const { data, errors } = state;

    DevTools(state).label("User Popup Form");

    return (
        <PopupForm
            title="Add New User"
            state={showState}
            className="grid gap-x-5 gap-y-6 grid-cols-3 text-sm gray-inputs"
            formButtons={[
                {
                    label: "Create New User",
                    faClass: "fas fa-plus",
                },
            ]}
            onSubmit={async () => {
                const { status } = await setUser(data.get());
                notify({
                    status,
                    successMsg: "User has been created successfully!",
                    successCallback: async () => {
                        // Clear the form data
                        data.set({ ...userFormState.data });

                        // Update users data list
                        const { data: newUsersData } = await getUsers();
                        usersData.set(newUsersData);

                        // Close the popup form
                        showState.set(false);
                    },
                });
            }}
        >
            <FormField
                className="flex flex-col"
                label="first name"
                name="first_name"
                id="1"
                value={data.first_name}
                placeholder="First name here..."
                required
            />

            <FormField
                className="flex flex-col"
                label="last name"
                name="last_name"
                id="2"
                value={data.last_name}
                placeholder="Last name here..."
                required
            />

            <FormField
                className="flex flex-col"
                label="username"
                name="username"
                id="3"
                value={data.username}
                placeholder="username here..."
                required
            />

            <FormField
                className="flex flex-col"
                label="email"
                name="email"
                type="email"
                id="4"
                value={data.email}
                placeholder="email here..."
                required
            />

            <PasswordField className="flex flex-col" value={data.password} />

            <PasswordField
                label="Confirm Password"
                className="flex flex-col col-span-1"
                confirmation={data.password.value}
                value={data.confirm_password}
            />

            <FormField
                className="flex flex-col"
                label="role"
                name="role"
                type="select"
                id="5"
                value={data.role}
                options={[
                    { label: "Admin", value: "admin" },
                    { label: "Pharmacy Owner", value: "pharmacy owner" },
                    { label: "User", value: "user" },
                ]}
            />

            <FormField
                className="flex flex-col"
                id="6"
                label="Gender"
                name="gender"
                type="radio"
                value={data.gender}
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

            <PhoneNumberField
                className="flex flex-col"
                id="7"
                value={data.phone_number}
            />

            <FormField
                className="flex flex-col"
                label="status"
                name="status"
                type="select"
                id="8"
                value={data.status}
                options={[
                    { label: "Activated", value: "active" },
                    { label: "Non-activated", value: "non-active" },
                    { label: "banned", value: "banned" },
                ]}
            />

            <FormField
                className="flex flex-col"
                label="state"
                name="state"
                type="select"
                id="9"
                value={data.state}
                options={[{ label: "Khartoum", value: "khartoum" }]}
            />

            <FormField
                className="flex flex-col"
                label="city"
                name="city"
                id="10"
                value={data.city}
                type="select"
                options={getCityOptions()}
                placeholder="city name here..."
            />

            <FormField
                className="flex flex-col col-span-3"
                label="address"
                name="address"
                id="11"
                value={data.address}
                placeholder="address line here..."
            />
        </PopupForm>
    );
};

export default UserPopupForm;
