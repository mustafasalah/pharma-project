import { DevTools, useHookstate } from "@hookstate/core";
import React, { useEffect, useState } from "react";
import inventoryFormState from "../../states/inventoryFormState";
import Note from "../common/Note";
import CategoriesField from "./CategoriesField";
import CompaniesField from "./CompaniesField";
import FormField from "./FormField";
import PopupForm from "./PopupForm";
import SuppliersField from "./SuppliersField";
import ProductsField from "./ProductsField";
import {
    getInventoryItems,
    setInventoryItem,
} from "../../services/inventoryItems";
import { notify } from "../../utility";
import store from "../../state";

const InventoryPopupForm = ({ showState }) => {
    let state = useHookstate({
        data: { ...inventoryFormState.data },
        errors: { ...inventoryFormState.errors },
    });
    const productsData = useHookstate(store.tables.products.data);
    const inventoryData = useHookstate(store.tables.inventory.data);
    const { data, errors } = state;
    DevTools(state).label("Inventory Popup Form");

    useEffect(() => {
        let scanneredBarcode = "";
        window.onkeypress = ({ keyCode, key }) => {
            if (keyCode === 13) {
                const product = productsData.find(
                    ({ barcode }) => barcode.value === scanneredBarcode
                );
                if (product) {
                    data.productId.set(product.id);
                    data.name.set(product.name);
                    data.photo.set(product.photo.url);
                    data.barcode.set(product.barcode);
                    data.unit.set(product.unit);
                    data.category.set(product.category);
                    data.company.set(product.company);
                }
                scanneredBarcode = "";
            } else {
                scanneredBarcode += key;
            }
        };
    }, []);

    return (
        <PopupForm
            title="Add New Product"
            state={showState}
            formButtons={[
                {
                    label: "Add Product to Inventory",
                    faClass: "fas fa-plus",
                },
            ]}
            className="grid gap-x-5 gap-y-6 grid-cols-4 text-sm gray-inputs"
            onSubmit={async () => {
                const { status } = await setInventoryItem(data.get());
                notify({
                    status,
                    successMsg: "Inventory Item has been added successfully!",
                    successCallback: async () => {
                        // Clear the form data
                        data.set({ ...inventoryFormState.data });

                        // Close the popup form
                        showState.set(false);

                        // Update inventory data list
                        const { data: newInventoryData } =
                            await getInventoryItems();
                        inventoryData.set(newInventoryData);
                    },
                });
            }}
        >
            <Note className="col-span-4">
                <strong>Note:</strong> You can use{" "}
                <i className="fas fa-barcode"></i> barcode reader to capture
                basic product information into the fields below.
            </Note>

            <ProductsField
                className="flex flex-col col-span-2"
                id="1"
                type="select"
                value={data.name}
                onChange={({ value: selectedId }) => {
                    const product = productsData.find(
                        ({ id }) => id.value === selectedId
                    );
                    data.productId.set(product.id);
                    data.name.set(product.name);
                    data.photo.set(product.photo.url);
                    data.barcode.set(product.barcode);
                    data.unit.set(product.unit);
                    data.category.set(product.category);
                    data.company.set(product.company);
                }}
                required
            />

            <FormField
                className="flex flex-col"
                label="barcode"
                name="barcode"
                type="select"
                id="2"
                value={data.barcode}
                options={productsData.map(({ barcode, id }) => ({
                    label: barcode.value,
                    value: id.value,
                }))}
                onChange={({ value: selectedId }) => {
                    const product = productsData.find(
                        ({ id }) => id.value === selectedId
                    );
                    data.productId.set(product.id);
                    data.name.set(product.name);
                    data.barcode.set(product.barcode);
                    data.unit.set(product.unit);
                    data.category.set(product.category);
                    data.company.set(product.company);
                }}
                placeholder="barcode here..."
                required
            />

            <FormField
                className="flex flex-col"
                label="unit size"
                name="unit_size"
                id="3"
                value={data.unit}
                placeholder="e.g. 6 Capsules"
                disabled
            />

            <CategoriesField
                className="flex flex-col col-span-2"
                id="4"
                value={data.category}
                disabled
            />

            <CompaniesField
                className="flex flex-col col-span-2"
                id="5"
                value={data.company}
                placeholder="Company Name..."
                disabled
            />

            <SuppliersField
                className="flex flex-col col-span-2"
                id="6"
                value={data.supplier}
            />

            <FormField
                className="flex flex-col"
                label="cost"
                name="cost"
                id="7"
                value={data.cost}
                type="number"
                min="1"
                required
            />

            <FormField
                className="flex flex-col"
                label="price"
                name="price"
                id="8"
                value={data.price}
                type="number"
                min="1"
                required
            />

            <FormField
                className="flex flex-col"
                label="in stock"
                name="in_stock"
                id="9"
                value={data.stock}
                type="number"
                min="0"
                required
            />

            <FormField
                className="flex flex-col"
                label="Reserved"
                name="reserved"
                id="10"
                value={data.reserved}
                type="number"
                min="0"
            />

            <FormField
                className="flex flex-col col-span-2"
                label="Online Order?"
                name="gender"
                type="radio"
                value={data.online_order}
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
                className="flex flex-col col-span-2"
                label="arrival date"
                name="arrival_date"
                id="11"
                value={data.arrival_date}
                max={data.expair_date.value}
                type="date"
                placeholder="e.g. 11-11-2021"
            />

            <FormField
                className="flex flex-col col-span-2"
                label="expire date"
                name="expire_date"
                id="12"
                value={data.expair_date}
                min={data.arrival_date.value}
                type="date"
                placeholder="e.g. 11-11-2021"
            />
        </PopupForm>
    );
};

export default InventoryPopupForm;
