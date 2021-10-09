import { useState, DevTools } from "@hookstate/core";
import React, { useMemo } from "react";
import DataTable from "../common/DataTable";
import SectionHeader from "../common/SectionHeader";
import store from "../../state";
import ManageBtns from "../table/ManageBtns";
import ProductCell from "../table/ProductCell";
import InventoryForm from "../forms/InventoryForm";

const Inventory = () => {
    const {
        tables: { inventory },
    } = useState(store);

    DevTools(inventory).label("Inventory");

    const filters = useMemo(
        () => [
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
                options: [
                    { label: "All", value: "" },
                    { label: "Antibiotics", value: "antibiotics" },
                ],
            },
            {
                label: "Status",
                type: "select",
                by: "status",
                prop: "status",
                options: [
                    { label: "All", value: "" },
                    { label: "In Stock", value: "in-stock" },
                    { label: "Out of Stock", value: "out-of-stock" },
                ],
            },
        ],
        []
    );

    const columns = useMemo(
        () => [
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
        ],
        []
    );

    return (
        <>
            <SectionHeader name="Inventory Management" faClass="fas fa-boxes" />
            <DataTable
                filters={filters}
                filtersData={inventory.filters}
                data={inventory.data}
                columns={columns}
                form={(state) => (
                    <InventoryForm state={state} colsLength={columns.length} />
                )}
            />
        </>
    );
};

export default Inventory;
