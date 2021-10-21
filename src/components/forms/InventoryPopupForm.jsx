import { DevTools, useState } from "@hookstate/core";
import React, { useEffect } from "react";
import inventoryFormState from "../../states/inventoryFormState";
import Note from "../common/Note";
import CategoriesField from "./CategoriesField";
import CompaniesField from "./CompaniesField";
import FormField from "./FormField";
import PopupForm from "./PopupForm";
import SuppliersField from "./SuppliersField";
import ProductsField from "./ProductsField";
import { getProducts } from "../../services/products";
import { setInventoryItem } from "../../services/inventoryItems";
import { toast } from "react-toastify";
import { notify } from "../../utility";

const InventoryPopupForm = ({ showState }) => {
    const products = getProducts();
    let state = useState(inventoryFormState);
    const { data, errors } = state;
    DevTools(state).label("Inventory Popup Form");

    useEffect(() => {
        let scanneredBarcode = "";
        window.onkeypress = ({ keyCode, key }) => {
            if (keyCode === 13) {
                const product = products.find(
                    ({ barcode }) => barcode === scanneredBarcode
                );
                if (product) {
                    data.productId.set(product.id);
                    data.name.set(product.name);
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
            className="grid gap-x-5 gap-y-6 grid-cols-4 text-sm"
            onSubmit={async () => {
                const { status } = await setInventoryItem(data.get());
                notify({
                    status,
                    successMsg: "Inventory Item has been added successfully!",
                    successCallback: () => {
                        // Clear the form data
                        state.set(inventoryFormState);
                        // Close the popup form
                        showState.set(false);
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
                    const product = products.find(
                        ({ id }) => id === selectedId
                    );
                    data.productId.set(product.id);
                    data.name.set(product.name);
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
                options={products.map(({ barcode, id }) => ({
                    label: barcode,
                    value: id,
                }))}
                onChange={({ value: selectedId }) => {
                    const product = products.find(
                        ({ id }) => id === selectedId
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
