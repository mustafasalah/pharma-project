import { DevTools, useState } from "@hookstate/core";
import React, { useEffect } from "react";
import employeeFormState from "../../states/employeeFormState";
import FormField from "./FormField";
import PopupForm from "./PopupForm";
import { getEmployees, setEmployee } from "../../services/employees";
import { notify } from "../../utility";
import store from "../../state";
import { getUserByUsername, getUsersByRole } from "../../services/users";

const EmployeePopupForm = ({ showState }) => {
    let state = useState({
        data: { ...employeeFormState.data },
        errors: { ...employeeFormState.errors },
    });
    DevTools(state).label("Employee Popup Form");

    const employeesData = useState(store.tables.employees.data);
    const { data, errors } = state;
    const avaiableUsersToEmployee = useState([]);

    useEffect(() => {
        (async () => {
            try {
                const { data } = await getUsersByRole("user");
                avaiableUsersToEmployee.set(data);
            } catch (ex) {}
        })();
    }, []);

    return (
        <PopupForm
            title="Add New Employee"
            state={showState}
            className="grid gap-x-5 gap-y-6 grid-cols-4 text-sm gray-inputs"
            formButtons={[
                {
                    label: "Add Employee",
                    faClass: "fas fa-plus",
                },
            ]}
            onSubmit={async () => {
                const { status } = await setEmployee(data.get());
                notify({
                    status,
                    successMsg: (
                        <>
                            We have send invitation email to{" "}
                            <strong>{data.full_name.get()}</strong> to join
                            employee team of this pharmacy branch!
                        </>
                    ),
                    successCallback: async () => {
                        // Clear the form data
                        data.set({ ...employeeFormState.data });

                        // Update employees data list
                        const { data: newEmployeesData } = await getEmployees();
                        employeesData.set(newEmployeesData);

                        // Close the popup form
                        showState.set(false);
                    },
                });
            }}
        >
            <FormField
                className="flex flex-col col-span-2"
                label="username"
                name="username"
                id="2"
                type="select"
                value={data.username}
                options={avaiableUsersToEmployee.map((user) => ({
                    label: user.username.value,
                    value: user.username.value,
                }))}
                onChange={async ({ value: selectedUsername }) => {
                    const { data: user } = await getUserByUsername(
                        selectedUsername
                    );

                    data.username.set(user.username);
                    data.full_name.set(`${user.first_name} ${user.last_name}`);
                    data.phone_number.set(user.phone_number);
                    data.gender.set(user.gender);
                }}
                placeholder="username here..."
                required
            />

            <FormField
                className="flex flex-col col-span-2"
                label="full name"
                name="full_name"
                id="1"
                value={data.full_name}
                placeholder="enter employee name here..."
                disabled
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
                disabled
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
                disabled
            />

            <FormField
                className="flex flex-col col-span-2"
                label="role"
                name="role"
                type="select"
                id="5"
                value={data.role}
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
