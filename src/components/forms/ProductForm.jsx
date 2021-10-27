import React from "react";
import CategoriesField from "./CategoriesField";
import CompaniesField from "./CompaniesField";
import Form from "./Form";
import FormField from "./FormField";
import { updateProduct, uploadProductPhoto } from "../../services/products";
import { notify } from "../../utility";
import { useState, DevTools } from "@hookstate/core";
import ProductPhoto from "./ProductPhoto";

const ProductForm = ({
    state,
    closeForm,
    className = "grid gap-x-5 gap-y-6 grid-cols-8",
}) => {
    const formState = useState(JSON.parse(JSON.stringify(state.value)));
    DevTools(formState).label("Product Edit Form State");

    return (
        <Form
            className={className}
            onSubmit={async () => {
                const { status } = await updateProduct(formState.value);
                notify({
                    status,
                    waitMsg: "Updating Product Information...",
                    successMsg: "Product has been updated successfully!",
                    async successCallback() {
                        const { status, data } = await uploadProductPhoto(
                            formState.id.value
                        );
                        notify({
                            status,
                            waitMsg: "Uploading Product Photo...",
                            successMsg:
                                "Product Photo has been uploaded successfully!",
                            successCallback() {
                                state.set(
                                    JSON.parse(JSON.stringify(formState.value))
                                );
                                state.photo.merge(data);
                                closeForm();
                            },
                        });
                    },
                });
            }}
        >
            <ProductPhoto
                className="col-span-2 row-span-2"
                url={formState.photo.url}
                size={formState.photo.size}
            />

            <FormField
                className="flex flex-col col-span-2"
                label="product name"
                name="product_name"
                id="1"
                value={formState.name}
                placeholder="enter product name here..."
                required
            />

            <FormField
                className="flex flex-col col-span-2"
                label="barcode"
                name="barcode"
                id="2"
                value={formState.barcode}
                placeholder="barcode here..."
            />

            <FormField
                className="flex flex-col"
                label="unit size"
                name="unit_size"
                id="3"
                value={formState.unit}
                placeholder="e.g. 6 Capsules"
                required
            />

            <FormField
                className="flex flex-col"
                label="need perspection?"
                name="perspection"
                type="radio"
                value={formState.need_perspection}
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
                value={formState.category}
                required
            />

            <CompaniesField
                className="flex flex-col col-span-2"
                id="5"
                value={formState.company}
                required
            />

            <FormField
                className="flex flex-col col-span-2"
                label="ingredient"
                name="ingredient"
                id="6"
                value={formState.ingredient}
            />

            <FormField
                className="flex flex-col col-span-2"
                label="product description"
                name="description"
                id="7"
                value={formState.description}
                type="textarea"
            />

            <FormField
                className="flex flex-col col-span-2"
                label="usage instructions"
                name="usage"
                id="8"
                value={formState.usage}
                type="textarea"
            />

            <FormField
                className="flex flex-col col-span-2"
                label="warnings"
                name="warnings"
                id="9"
                value={formState.warnings}
                type="textarea"
            />

            <FormField
                className="flex flex-col col-span-2"
                label="side effects"
                name="side_effects"
                id="10"
                value={formState.side_effects}
                type="textarea"
            />
        </Form>
    );
};

export default ProductForm;
