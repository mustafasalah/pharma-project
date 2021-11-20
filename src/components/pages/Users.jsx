import { useState, DevTools } from "@hookstate/core";
import React, { useEffect } from "react";
import DataTable from "../common/DataTable";
import SectionHeader from "../common/SectionHeader";
import store from "../../state";
import ManageBtns from "../table/ManageBtns";
import { deleteUser } from "../../services/users";
import UserForm from "../forms/UserForm";
import UserPopupForm from "../forms/UserPopupForm";
import { useParams } from "react-router";
import { notify } from "../../utility";

const Users = () => {
    const {
        tables: { users },
    } = useState(store);
    DevTools(users).label("Users");

    let { id: userId } = useParams();
    const showPopupForm = useState(false);
    const sortColumn = useState({ columnName: "id", order: "desc" });

    useEffect(() => {
        if (typeof +userId === "number") {
            const user = users.data.find((user) => user.id.value === +userId);
            user && users.filters.search.set(user.first_name.value);
        }
    }, [userId]);

    return (
        <>
            <SectionHeader
                name="Users Management"
                faClass="fas fa-users"
                addButton={{
                    label: "Add New User",
                    handler: () => {
                        showPopupForm.set(true);
                    },
                }}
            />
            <DataTable
                filters={filters}
                filtersData={users.filters}
                data={users.data}
                columns={columns}
                sortColumn={sortColumn}
                form={(state, closeForm) => (
                    <UserForm state={state} closeForm={closeForm} />
                )}
                pagination={users.pagination}
            />
            <UserPopupForm showState={showPopupForm} />
        </>
    );
};

export default Users;

const columns = [
    {
        title: "full name",
        sortProp: "full_name",
        wrapper: ({ id, first_name, last_name, edited, handleEdit }) => (
            <button
                onClick={() => handleEdit(edited ? null : id.value)}
                className="text-smd text-secondary underline font-medium hover:text-primary"
            >
                {`${first_name.get()} ${last_name.get()}`}
            </button>
        ),
    },
    { title: "username", prop: "username" },
    { title: "email", prop: "email" },
    {
        title: "gender",
        sortProp: "gender",
        wrapper: ({ gender }) => {
            return gender.get() === "m" ? "male" : "female";
        },
    },
    { title: "role", prop: "role" },
    { title: "status", prop: "status" },
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
                        "Are you sure to delete this user item?"
                    );
                    if (isDelete === false) return;

                    const { data, status } = await deleteUser(id.get());

                    notify({
                        status,
                        waitMsg: "Deleting User...",
                        successMsg: "User has been deleted successfully!",
                        successCallback() {
                            store.tables.users.data.set((p) => {
                                return p.filter((user) => user.id !== data.id);
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
        by: "first_name",
        prop: "search",
        placeholder: "enter the user name here...",
    },
    {
        label: "Role",
        type: "select",
        by: "role",
        prop: "role",
        wide: true,
        options: [
            { label: "All", value: "" },
            { label: "Admin", value: "admin" },
            { label: "Pharmacy Owner", value: "pharmacy owner" },
            { label: "Supervisor", value: "supervisor" },
            { label: "Pharmacist", value: "pharmacist" },
            { label: "User", value: "user" },
        ],
    },
    {
        label: "Status",
        type: "select",
        by: "status",
        prop: "status",
        options: [
            { label: "All", value: "" },
            { label: "Activated", value: "active" },
            { label: "Non-activated", value: "non-active" },
            { label: "banned", value: "banned" },
        ],
    },
];
