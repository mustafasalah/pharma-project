import { useState, DevTools } from "@hookstate/core";
import React, { useEffect } from "react";
import DataTable from "../common/DataTable";
import SectionHeader from "../common/SectionHeader";
import store from "../../state";
import ManageBtns from "../table/ManageBtns";
import { deleteEmployee, getEmployees } from "../../services/employees";
import { toast } from "react-toastify";
import EmployeeForm from "../forms/EmployeeForm";
import EmployeePopupForm from "../forms/EmployeePopupForm";

const Employees = () => {
    const {
        tables: { employees },
    } = useState(store);
    DevTools(employees).label("Employees");

    const showPopupForm = useState(false);
    const sortColumn = useState({ columnName: "id", order: "asc" });

    useEffect(() => {
        const employeesData = getEmployees();
        employees.data.set(employeesData);
    }, []);

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
            <a
                href={`#${full_name.get()}`}
                onClick={() => handleEdit(edited ? null : id.value)}
                className="text-smd"
            >
                {full_name.get()}
            </a>
        ),
    },
    { title: "username", prop: "username" },
    { title: "phone number", prop: "phone_number" },
    {
        title: "gender",
        wrapper: ({ gender }) => {
            return gender.get() === "m" ? "male" : "female";
        },
    },
    { title: "role", prop: "role" },
    {
        title: "work time",
        wrapper: ({
            work_from: { value: work_from },
            work_to: { value: work_to },
        }) => {
            if (work_from && work_to) return `${work_from} to ${work_to}`;
            else return "-";
        },
    },
    { title: "last seen", prop: "last_seen" },
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

                    const { status } = await deleteEmployee(id.get());
                    if (status >= 200 && status < 300) {
                        toast.success(
                            "Employee has been deleted successfully!"
                        );
                    } else {
                        toast.error("Network Error!");
                    }
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
];
