import React from "react";
import Form from "./Form";
import FormField from "./FormField";
import { updateUser } from "../../services/users";
import { getCityOptions, notify } from "../../utility";
import { useState, DevTools } from "@hookstate/core";
import PhoneNumberField from "./PhoneNumberField";

const PersonalInformationForm = ({ data: state }) => {
    const formState = useState(JSON.parse(JSON.stringify(state.value)));
    DevTools(formState).label("Personal Information Form State");

    return (
        <Form
            className="grid gap-5 grid-cols-6"
            onSubmit={async () => {
                const { status } = await updateUser(state.get());
                notify({
                    status,
                    waitMsg: "Updating Account Information...",
                    successMsg:
                        "Your personal information has been updated successfully!",
                    successCallback() {
                        state.set(JSON.parse(JSON.stringify(formState.value)));
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
                className="flex flex-col col-span-2"
                label="username"
                name="username"
                id="3"
                value={formState.username}
                placeholder="username here..."
                disabled
                required
            />

            <FormField
                className="flex flex-col col-span-2"
                label="email"
                name="email"
                type="email"
                id="4"
                value={formState.email}
                placeholder="email here..."
                required
            />

            <PhoneNumberField
                className="flex flex-col col-span-2"
                id="7"
                value={formState.phone_number}
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
                type="select"
                options={getCityOptions()}
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

export default PersonalInformationForm;
