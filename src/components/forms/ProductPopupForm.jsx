import { DevTools, useHookstate } from "@hookstate/core";
import React from "react";
import productFormState from "../../states/productFormState";
import CategoriesField from "./CategoriesField";
import CompaniesField from "./CompaniesField";
import FormField from "./FormField";
import PopupForm from "./PopupForm";
import { setProduct, uploadProductPhoto } from "../../services/products";
import { notify } from "../../utility";
import ProductPhoto from "./ProductPhoto";
import store from "../../state";

const ProductPopupForm = ({ showState }) => {
    let state = useHookstate({
        errors: { ...productFormState.errors },
        data: { ...productFormState.data },
    });
    const {
        uploads: { productPhoto },
    } = useHookstate(store);
    const { data, errors } = state;
    DevTools(state).label("Product Popup Form");

    return (
        <PopupForm
            title="Add New Product"
            state={showState}
            onClose={() => {
                productPhoto.set("");
            }}
            formButtons={[
                {
                    label: "Add Product",
                    faClass: "fas fa-plus",
                },
            ]}
            className="grid gap-x-5 gap-y-6 grid-cols-4 text-sm"
            onSubmit={async () => {
                const { status, data: productData } = await setProduct(
                    data.get()
                );
                notify({
                    status,
                    successMsg: "Product Item has been added successfully!",
                    successCallback: async () => {
                        if (productPhoto.get() === "") {
                            // Clear the form data
                            data.set({ ...productFormState.data });

                            // Close the popup form
                            showState.set(false);
                        } else {
                            const { status, data: photoData } =
                                await uploadProductPhoto(productData.id);

                            notify({
                                status,
                                waitMsg: "Uploading Product Photo...",
                                successMsg:
                                    "Product Photo has been uploaded successfully!",
                                successCallback() {
                                    productData.photo = photoData;

                                    // Clear the form data
                                    data.set({ ...productFormState.data });
                                    productPhoto.set("");

                                    // Close the popup form
                                    showState.set(false);
                                },
                            });
                        }
                    },
                });
            }}
        >
            <ProductPhoto
                className="col-span-2 row-span-2"
                url={data.photo.url}
                size={data.photo.size}
            />

            <FormField
                className="flex flex-col col-span-2"
                label="product name"
                name="product_name"
                id="1"
                value={data.name}
                placeholder="enter product name here..."
                required
            />

            <FormField
                className="flex flex-col col-span-2"
                label="barcode"
                name="barcode"
                id="2"
                value={data.barcode}
                placeholder="barcode here..."
            />

            <FormField
                className="flex flex-col"
                label="unit size"
                name="unit_size"
                id="3"
                value={data.unit}
                placeholder="e.g. 6 Capsules"
                required
            />

            <FormField
                className="flex flex-col"
                label="need perspection?"
                name="perspection"
                type="radio"
                value={data.need_perspection}
                options={[
                    {
                        label: "Yes",
                        value: true,
                    },
                    {
                        label: "No",
                        value: false,
                    },
                ]}
            />

            <CategoriesField
                className="flex flex-col col-span-2"
                id="4"
                value={data.category}
                required
            />

            <CompaniesField
                className="flex flex-col col-span-2"
                id="5"
                value={data.company}
                required
            />

            <FormField
                className="flex flex-col col-span-2"
                label="ingredient"
                name="ingredient"
                id="6"
                value={data.ingredient}
            />

            <FormField
                className="flex flex-col col-span-2"
                label="product description"
                name="description"
                id="7"
                value={data.description}
                type="textarea"
            />

            <FormField
                className="flex flex-col col-span-2"
                label="usage instructions"
                name="usage"
                id="8"
                value={data.usage}
                type="textarea"
            />

            <FormField
                className="flex flex-col col-span-2"
                label="warnings"
                name="warnings"
                id="9"
                value={data.warnings}
                type="textarea"
            />

            <FormField
                className="flex flex-col col-span-2"
                label="side effects"
                name="side_effects"
                id="10"
                value={data.side_effects}
                type="textarea"
            />
        </PopupForm>
    );
};

export default ProductPopupForm;
