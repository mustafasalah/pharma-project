import { useState, DevTools } from "@hookstate/core";
import React, { useEffect } from "react";
import DataTable from "../common/DataTable";
import SectionHeader from "../common/SectionHeader";
import store from "../../state";
import ManageBtns from "../table/ManageBtns";
import ProductCell from "../table/ProductCell";
import InventoryForm from "../forms/InventoryForm";
import { getCategories } from "../../services/categories";
import InventoryPopupForm from "../forms/InventoryPopupForm";
import { deleteInventoryItem } from "../../services/inventoryItems";
import { notify } from "../../utility";
import { useParams } from "react-router";

const Inventory = () => {
    const {
        tables: { inventory },
    } = useState(store);
    DevTools(inventory).label("Inventory");

    const showPopupForm = useState(false);
    const sortColumn = useState({ columnName: "id", order: "desc" });
    let { id: inventoryItemId } = useParams();

    useEffect(() => {
        if (typeof +inventoryItemId === "number") {
            const item = inventory.data.find(
                (item) => item.id.value === +inventoryItemId
            );
            item && inventory.filters.search.set(item.name.value);
        }
    }, [inventoryItemId]);

    return (
        <>
            <SectionHeader
                name="Inventory Management"
                faClass="fas fa-boxes"
                addButton={{
                    label: "Add New Product",
                    handler: () => {
                        showPopupForm.set(true);
                    },
                }}
            />
            <DataTable
                filters={filters}
                filtersData={inventory.filters}
                data={inventory.data}
                columns={columns}
                sortColumn={sortColumn}
                form={(state, closeForm) => (
                    <InventoryForm state={state} closeForm={closeForm} />
                )}
                pagination={inventory.pagination}
            />
            <InventoryPopupForm showState={showPopupForm} />
        </>
    );
};

export default Inventory;

const columns = [
    {
        title: "Products List",
        sortProp: "id",
        wrapper: ({ name, photo, unit, id, edited, handleEdit }) => (
            <ProductCell
                name={name.value}
                photo={photo.value}
                unit={unit.value}
                id={id}
                edited={edited}
                onEdit={handleEdit}
            />
        ),
    },
    { title: "cost", prop: "cost" },
    { title: "price", prop: "price" },
    { title: "supplier", prop: "supplier" },
    { title: "stock", prop: "stock" },
    { title: "reserved", prop: "reserved" },
    { title: "arrival date", prop: "arrival_date" },
    { title: "expair date", prop: "expair_date" },
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
                        "Are you sure to delete this inventory item?"
                    );
                    if (isDelete === false) return;

                    const { status } = await deleteInventoryItem(id.get());

                    notify({
                        status,
                        waitMsg: "Deleting Inventory Item...",
                        successMsg:
                            "Inventory Item has been deleted successfully!",
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
        by: "name",
        prop: "search",
        placeholder: "enter the product name here...",
    },
    {
        label: "Category",
        type: "select",
        by: "category",
        prop: "category",
        options: [{ label: "All", value: "" }, ...getCategories()],
    },
    {
        label: "Status",
        type: "select",
        by: "stock",
        prop: "status",
        handler: (status, stock) => {
            return status === "in-stock" ? stock > 0 : stock <= 0;
        },
        options: [
            { label: "All", value: "" },
            { label: "In Stock", value: "in-stock" },
            { label: "Out of Stock", value: "out-of-stock" },
        ],
    },
];
