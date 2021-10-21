import React from "react";
import CategoriesField from "./CategoriesField";
import CompaniesField from "./CompaniesField";
import SuppliersField from "./SuppliersField";
import Form from "./Form";
import FormField from "./FormField";
import { updateInventoryItem } from "../../services/inventoryItems";
import { notify } from "../../utility";
import { useState, DevTools } from "@hookstate/core";

const InventoryForm = ({
    state,
    closeForm,
    className = "grid gap-x-5 gap-y-6 grid-cols-6",
}) => {
    const formState = useState(JSON.parse(JSON.stringify(state.value)));
    DevTools(formState).label("Inventory Edit Form State");

    return (
        <Form
            className={className}
            onSubmit={async () => {
                const { status } = await updateInventoryItem(formState.get());
                notify({
                    status,
                    waitMsg: "Updating Item...",
                    successMsg: "Inventory Item has been updated successfully!",
                    successCallback() {
                        state.set(JSON.parse(JSON.stringify(formState.value)));
                        closeForm();
                    },
                });
            }}
        >
            <FormField
                className="flex flex-col col-span-3"
                label="product name"
                name="product_name"
                id="1"
                value={formState.name}
                placeholder="enter product name here..."
                disabled
            />

            <FormField
                className="flex flex-col"
                label="barcode"
                name="barcode"
                id="2"
                value={formState.barcode}
                placeholder="barcode here..."
                disabled
            />

            <FormField
                className="flex flex-col"
                label="unit size"
                name="unit_size"
                id="3"
                value={formState.unit}
                placeholder="e.g. 6 Capsules"
                disabled
            />

            <CategoriesField
                className="flex flex-col"
                id="4"
                value={formState.category}
                disabled
            />

            <CompaniesField
                className="flex flex-col col-span-2"
                id="5"
                value={formState.company}
                disabled
            />

            <SuppliersField
                className="flex flex-col"
                id="6"
                value={formState.supplier}
            />

            <FormField
                className="flex flex-col"
                label="cost"
                name="cost"
                id="7"
                value={formState.cost}
                type="number"
                min="1"
            />

            <FormField
                className="flex flex-col"
                label="price"
                name="price"
                id="8"
                value={formState.price}
                type="number"
                min="1"
            />

            <FormField
                className="flex flex-col"
                label="Online Order?"
                name="gender"
                type="radio"
                value={formState.online_order}
                options={[
                    {
                        label: "Enable",
                        value: true,
                    },
                    {
                        label: "Disable",
                        value: false,
                    },
                ]}
            />

            <FormField
                className="flex flex-col"
                label="in stock"
                name="in_stock"
                id="9"
                value={formState.stock}
                type="number"
                min="0"
            />

            <FormField
                className="flex flex-col"
                label="Reserved"
                name="reserved"
                id="10"
                value={formState.reserved}
                type="number"
                min="0"
            />

            <FormField
                className="flex flex-col col-span-2"
                label="arrival date"
                name="arrival_date"
                id="11"
                value={formState.arrival_date}
                max={formState.expair_date.value}
                type="date"
                placeholder="e.g. 11-11-2021"
            />

            <FormField
                className="flex flex-col col-span-2"
                label="expire date"
                name="expire_date"
                id="12"
                value={formState.expair_date}
                min={formState.arrival_date.value}
                type="date"
                placeholder="e.g. 11-11-2021"
            />
        </Form>
    );
};

export default InventoryForm;
