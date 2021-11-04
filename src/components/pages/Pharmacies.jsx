import { useState, DevTools } from "@hookstate/core";
import React, { useEffect } from "react";
import DataTable from "../common/DataTable";
import SectionHeader from "../common/SectionHeader";
import store from "../../state";
import ManageBtns from "../table/ManageBtns";
import {
    deletePharmacy,
    updatePharmacyStatus,
} from "../../services/pharmacies";
import { Link } from "react-router-dom";
import Popup from "../common/Popup";
import { useParams } from "react-router";
import { notify } from "../../utility";
import PharmacyForm from "../forms/PharmacyForm";
import FormField from "../forms/FormField";

const Pharmacies = () => {
    const {
        tables: { pharmacies },
        popupWindow,
    } = useState(store);
    DevTools(pharmacies).label("Orders");

    let { id: pharmacyId } = useParams();
    const sortColumn = useState({ columnName: "id", order: "desc" });

    useEffect(() => {
        if (!isNaN(pharmacyId)) {
            const pharmacy = pharmacies.data.find(
                (pharmacy) => pharmacy.id.value === +pharmacyId
            );
            pharmacy && pharmacies.filters.search.set(pharmacy.name.value);
        }
    }, [pharmacyId]);

    return (
        <>
            <SectionHeader
                name="Pharmacies Management"
                faClass="fas fa-clinic-medical"
            />
            <DataTable
                filters={filters}
                filtersData={pharmacies.filters}
                data={pharmacies.data}
                columns={columns}
                sortColumn={sortColumn}
                pagination={pharmacies.pagination}
            />
            <Popup
                state={popupWindow.display}
                faClass="fas fa-info-circle"
                title={`Pharmacy Information Detials`}
            >
                {popupWindow.type.get() === "pharmacy-info" && (
                    <PharmacyForm
                        state={pharmacies.data.find(
                            (item) =>
                                item.id.value === popupWindow.data.id.value
                        )}
                    />
                )}
            </Popup>
        </>
    );
};

export default Pharmacies;

const columns = [
    {
        title: "pharmacy name",
        sortProp: "name",
        wrapper: ({ id, name, popupWindow, item }) => (
            <a
                href={`#${id.get()}`}
                onClick={() => {
                    popupWindow.data.set({ id: item.id.value });
                    popupWindow.type.set("pharmacy-info");
                    popupWindow.display.set(true);
                }}
                className="text-smd"
            >
                {name.get()}
            </a>
        ),
    },
    { title: "branch name", prop: "branch", defaultValue: "Main Branch" },
    {
        title: "status",
        sortProp: "status",
        wrapper: ({ id, status }) => {
            return (
                <FormField
                    name="status"
                    type="select"
                    value={status}
                    onChange={async (selectedValue) => {
                        const { status: responseStatus } =
                            await updatePharmacyStatus(
                                id.get(),
                                selectedValue.value
                            );
                        notify({
                            status: responseStatus,
                            waitMsg: "Changing Pharmacy Status...",
                            successMsg: `Pharmacy status has been changed to '${selectedValue.label}' successfully!`,
                            successCallback() {
                                status.set(selectedValue.value);
                            },
                        });
                    }}
                    options={[
                        { label: "Active", value: "active" },
                        { label: "Pending", value: "pending" },
                        { label: "Rejected", value: "rejected" },
                    ]}
                />
            );
        },
    },
    {
        title: "owned by",
        sortProp: "owned_by.name",
        wrapper: ({ owned_by: { id, name } }) => {
            return <Link to={`/users/${id.get()}`}>{name.get()}</Link>;
        },
    },
    {
        title: "phone numbers",
        sortable: false,
        wrapper: ({ phone_numbers }) => {
            return phone_numbers.get().join(" - ");
        },
    },
    { title: "joining date", prop: "created_at" },
    {
        title: "manage",
        sortable: false,
        wrapper: ({ popupWindow, id, item }) => {
            return (
                <ManageBtns
                    id={item.id}
                    onDelete={async () => {
                        const isDelete = window.confirm(
                            "Are you sure to delete this pharmacy?"
                        );
                        if (isDelete === false) return;

                        const { status } = await deletePharmacy(id.get());

                        notify({
                            status,
                            waitMsg: "Deleting Pharmacy...",
                            successMsg:
                                "Pharmacy has been deleted successfully!",
                        });
                    }}
                    onView={() => {
                        popupWindow.data.set(
                            JSON.parse(JSON.stringify(item.value))
                        );
                        popupWindow.type.set("pharmacy-info");
                        popupWindow.display.set(true);
                    }}
                />
            );
        },
    },
];

const filters = [
    {
        label: "Search",
        type: "search",
        by: "name",
        prop: "search",
        placeholder: "enter the pharmacy name here...",
    },
];
