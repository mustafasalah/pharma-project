import React from "react";
import Form from "./Form";
import FormField from "./FormField";
import { updateEmployee } from "../../services/employees";
import { notify } from "../../utility";
import { useState, DevTools } from "@hookstate/core";

const EmployeeForm = ({
    state,
    closeForm,
    className = "grid gap-x-5 gap-y-6 grid-cols-6",
}) => {
    const formState = useState(JSON.parse(JSON.stringify(state.value)));
    DevTools(formState).label("Employee Edit Form State");

    return (
        <Form
            className={className}
            onSubmit={async () => {
                const { status } = await updateEmployee(state.get());
                notify({
                    status,
                    waitMsg: "Updating Employee Information...",
                    successMsg:
                        "Employee information has been updated successfully!",
                    successCallback() {
                        state.set(JSON.parse(JSON.stringify(formState.value)));
                        closeForm();
                    },
                });
            }}
        >
            <FormField
                className="flex flex-col col-span-2"
                label="full name"
                name="full_name"
                id="1"
                value={formState.full_name}
                placeholder="enter employee name here..."
                required
                disabled
            />

            <FormField
                className="flex flex-col col-span-2"
                label="username"
                name="username"
                id="2"
                value={formState.username}
                placeholder="username here..."
                disabled
                required
            />

            <FormField
                className="flex flex-col col-span-2"
                label="phone number"
                name="phone_number"
                id="3"
                type="tel"
                maxLength="13"
                pattern="\+[0-9]{10,12}"
                value={formState.phone_number}
                placeholder="e.g. +2499XXXXXXXX"
                disabled
            />

            <FormField
                className="flex flex-col"
                id="4"
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
                disabled
            />

            <FormField
                className="flex flex-col"
                label="role"
                name="role"
                type="select"
                id="5"
                value={formState.role}
                options={[
                    { label: "Supervisor", value: "supervisor" },
                    { label: "Pharmacist", value: "pharmacist" },
                ]}
            />

            <FormField
                className="flex flex-col col-span-2"
                label="work from"
                name="work_from"
                id="7"
                value={formState.work_from}
                type="time"
            />

            <FormField
                className="flex flex-col col-span-2"
                label="work to"
                name="work_to"
                id="8"
                value={formState.work_to}
                type="time"
                min={state.work_from.value}
            />
        </Form>
    );
};

export default EmployeeForm;
