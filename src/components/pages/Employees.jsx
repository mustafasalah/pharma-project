import { useState, DevTools } from "@hookstate/core";
import React, { useEffect } from "react";
import DataTable from "../common/DataTable";
import SectionHeader from "../common/SectionHeader";
import store from "../../state";
import ManageBtns from "../table/ManageBtns";
import { deleteEmployee, getEmployees } from "../../services/employees";
import EmployeeForm from "../forms/EmployeeForm";
import EmployeePopupForm from "../forms/EmployeePopupForm";
import { useParams } from "react-router";
import { notify } from "../../utility";

const Employees = () => {
    const {
        tables: { employees },
    } = useState(store);
    DevTools(employees).label("Employees");

    let { id: employeeId } = useParams();
    const showPopupForm = useState(false);
    const sortColumn = useState({ columnName: "id", order: "desc" });

    useEffect(() => {
        if (typeof +employeeId === "number") {
            const emp = employees.data.find(
                (emp) => emp.id.value === +employeeId
            );
            emp && employees.filters.search.set(emp.full_name.value);
        }
    }, [employeeId]);

    return (
        <>
            <SectionHeader
                name="Staff Management"
                faClass="fas fa-user-tie"
                addButton={{
                    label: "Add New Employee",
                    handler: () => {
                        showPopupForm.set(true);
                    },
                }}
            />
            <DataTable
                filters={filters}
                filtersData={employees.filters}
                data={employees.data}
                columns={columns}
                sortColumn={sortColumn}
                form={(state, closeForm) => (
                    <EmployeeForm state={state} closeForm={closeForm} />
                )}
                pagination={employees.pagination}
            />
            <EmployeePopupForm showState={showPopupForm} />
        </>
    );
};

export default Employees;

const columns = [
    {
        title: "full name",
        sortProp: "full_name",
        wrapper: ({ id, full_name, edited, handleEdit }) => (
            <button
                onClick={() => handleEdit(edited ? null : id.value)}
                className="text-smd text-secondary underline font-medium hover:text-primary"
            >
                {full_name.get()}
            </button>
        ),
    },
    { title: "username", prop: "username" },
    { title: "phone number", prop: "phone_number" },
    {
        title: "gender",
        sortProp: "gender",
        wrapper: ({ gender }) => {
            return gender.get() === "m" ? "male" : "female";
        },
    },
    { title: "status", prop: "status" },
    { title: "role", prop: "role" },
    {
        title: "work time",
        sortable: false,
        wrapper: ({
            work_from: { value: work_from },
            work_to: { value: work_to },
        }) => {
            if (work_from && work_to) return `${work_from} to ${work_to}`;
            else return "-";
        },
    },
    {
        title: "last seen",
        sortable: false,
        prop: "last_seen",
        defaultValue: "Not logged in yet",
    },
    { title: "joining date", prop: "joining_date" },
    {
        title: "manage",
        sortable: false,
        wrapper: ({ id, edited, handleEdit }) => (
            <ManageBtns
                id={id}
                edited={edited}
                onEdit={handleEdit}
                onDelete={async () => {
                    const isDelete = window.confirm(
                        "Are you sure to delete this employee item?"
                    );
                    if (isDelete === false) return;

                    const { data, status } = await deleteEmployee(id.get());

                    notify({
                        status,
                        waitMsg: "Deleting Employee...",
                        successMsg: "Employee has been deleted successfully!",
                        async successCallback() {
                            store.tables.employees.data.set((p) => {
                                return p.filter((emp) => emp.id !== data.id);
                            });
                        },
                    });
                }}
            />
        ),
    },
];

const filters = [
    {
        label: "Search",
        type: "search",
        by: "full_name",
        prop: "search",
        placeholder: "enter the employee name here...",
    },
    {
        label: "Role",
        type: "select",
        by: "role",
        prop: "role",
        options: [
            { label: "All", value: "" },
            { label: "Supervisor", value: "supervisor" },
            { label: "Pharmacist", value: "pharmacist" },
        ],
    },
    {
        label: "Status",
        type: "select",
        by: "status",
        prop: "status",
        options: [
            { label: "All", value: "" },
            { label: "Approved", value: "approve" },
            { label: "Pending", value: "pending" },
        ],
    },
];
