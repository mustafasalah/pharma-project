import { useState, DevTools } from "@hookstate/core";
import React from "react";
import DataTable from "../common/DataTable";
import SectionHeader from "../common/SectionHeader";
import store from "../../state";
import ManageBtns from "../table/ManageBtns";
import ProductCell from "../table/ProductCell";
import InventoryForm from "../forms/InventoryForm";
import { getCategories } from "../../services/categories";
import InventoryPopupForm from "../forms/InventoryPopupForm";

const Inventory = () => {
    const {
        tables: { inventory },
    } = useState(store);
    const showState = useState(false);
    DevTools(inventory).label("Inventory");

    return (
        <>
            <SectionHeader
                name="Inventory Management"
                faClass="fas fa-boxes"
                addButton={{
                    label: "Add New Product",
                    handler: () => {
                        showState.set(true);
                    },
                }}
            />
            <DataTable
                filters={filters}
                filtersData={inventory.filters}
                data={inventory.data}
                columns={columns}
                form={(state) => <InventoryForm state={state} />}
                pagination={inventory.pagination}
            />
            <InventoryPopupForm showState={showState} />
        </>
    );
};

export default Inventory;

const columns = [
    {
        title: "Products List",
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
        wrapper: ({ id, edited, handleEdit }) => (
            <ManageBtns id={id} edited={edited} onEdit={handleEdit} />
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
        prop: "stock",
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
