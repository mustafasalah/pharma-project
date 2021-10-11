import React from "react";
import CategoriesField from "./CategoriesField";
import CompaniesField from "./CompaniesField";
import SuppliersField from "./SuppliersField";
import Form from "./Form";
import FormField from "./FormField";

const InventoryForm = ({
    state,
    className = "grid gap-x-5 gap-y-6 grid-cols-6",
}) => {
    return (
        <Form className={className}>
            <FormField
                className="flex flex-col col-span-3"
                label="product name"
                name="product_name"
                id="1"
                value={state.name}
                placeholder="enter product name here..."
                disabled
            />

            <FormField
                className="flex flex-col"
                label="barcode"
                name="barcode"
                id="2"
                value={state.barcode}
                placeholder="barcode here..."
                disabled
            />

            <FormField
                className="flex flex-col"
                label="unit size"
                name="unit_size"
                id="3"
                value={state.unit}
                placeholder="e.g. 6 Capsules"
                disabled
            />

            <CategoriesField
                className="flex flex-col"
                id="4"
                value={state.category}
                disabled
            />

            <CompaniesField
                className="flex flex-col col-span-2"
                id="5"
                value={state.company}
                disabled
            />

            <SuppliersField
                className="flex flex-col"
                id="6"
                value={state.supplier}
            />

            <FormField
                className="flex flex-col"
                label="cost"
                name="cost"
                id="7"
                value={state.cost}
                type="number"
                min="1"
            />

            <FormField
                className="flex flex-col"
                label="price"
                name="price"
                id="8"
                value={state.price}
                type="number"
                min="1"
            />

            <FormField
                className="flex flex-col"
                label="Online Order?"
                name="gender"
                type="radio"
                value={state.online_order}
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
                value={state.stock}
                type="number"
                min="0"
            />

            <FormField
                className="flex flex-col"
                label="Reserved"
                name="reserved"
                id="10"
                value={state.reserved}
                type="number"
                min="0"
            />

            <FormField
                className="flex flex-col col-span-2"
                label="arrival date"
                name="arrival_date"
                id="11"
                value={state.arrival_date}
                max={state.expair_date.value}
                type="date"
                placeholder="e.g. 11-11-2021"
            />

            <FormField
                className="flex flex-col col-span-2"
                label="expire date"
                name="expire_date"
                id="12"
                value={state.expair_date}
                min={state.arrival_date.value}
                type="date"
                placeholder="e.g. 11-11-2021"
            />
        </Form>
    );
};

export default InventoryForm;
