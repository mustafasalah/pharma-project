import { DevTools, useState } from "@hookstate/core";
import React from "react";
import employeeFormState from "../../states/employeeFormState";
import FormField from "./FormField";
import PopupForm from "./PopupForm";
import { setEmployee } from "../../services/employees";
import { notify } from "../../utility";

const EmployeePopupForm = ({ showState }) => {
    let state = useState(employeeFormState);
    const { data, errors } = state;
    DevTools(state).label("Employee Popup Form");

    return (
        <PopupForm
            title="Add New Employee"
            state={showState}
            className="grid gap-x-5 gap-y-6 grid-cols-4 text-sm"
            onSubmit={async () => {
                const { status } = await setEmployee(data.get());
                notify({
                    status,
                    successMsg: "Employee Item has been added successfully!",
                    successCallback: () => {
                        // Clear the form data
                        state.set(employeeFormState);
                        // Close the popup form
                        showState.set(false);
                    },
                });
            }}
        >
            <FormField
                className="flex flex-col col-span-2"
                label="full name"
                name="full_name"
                id="1"
                value={data.full_name}
                placeholder="enter employee name here..."
                required
            />

            <FormField
                className="flex flex-col col-span-2"
                label="username"
                name="username"
                id="2"
                value={data.username}
                placeholder="username here..."
                required
            />

            <FormField
                className="flex flex-col"
                label="phone number"
                name="phone_number"
                id="3"
                type="tel"
                maxLength="13"
                pattern="\+[0-9]{10,12}"
                value={data.phone_number}
                placeholder="e.g. +2499XXXXXXXX"
            />

            <FormField
                className="flex flex-col"
                id="4"
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

            <FormField
                className="flex flex-col col-span-2"
                label="role"
                name="role"
                type="select"
                id="5"
                value={data.role}
                options={[
                    { label: "Pharmacy Onwer", value: "pharmacy onwer" },
                    { label: "Supervisor", value: "supervisor" },
                    { label: "Pharmacist", value: "pharmacist" },
                ]}
            />

            <FormField
                className="flex flex-col col-span-2"
                label="work from"
                name="work_from"
                id="7"
                value={data.work_from}
                type="time"
            />

            <FormField
                className="flex flex-col col-span-2"
                label="work to"
                name="work_to"
                id="8"
                value={data.work_to}
                type="time"
                min={state.work_from.value}
            />
        </PopupForm>
    );
};

export default EmployeePopupForm;
