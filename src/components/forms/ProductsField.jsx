import React from "react";
import FormField from "./FormField";
import { useHookstate } from "@hookstate/core";
import store from "../../state";

const ProductsField = (props) => {
    const productsData = useHookstate(store.tables.products.data);

    return (
        <FormField
            label="product name"
            name="product_name"
            type="select"
            options={productsData.map((product) => ({
                label: product.name.value,
                value: product.id.value,
            }))}
            {...props}
        />
    );
};

export default ProductsField;
