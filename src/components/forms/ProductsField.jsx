import React from "react";
import { getProducts } from "../../services/products";
import FormField from "./FormField";

const ProductsField = (props) => {
    return (
        <FormField
            label="product name"
            name="product_name"
            type="select"
            options={[
                ...getProducts().map((product) => ({
                    label: product.name,
                    value: product.id,
                })),
            ]}
            {...props}
        />
    );
};

export default ProductsField;
