import React, { useEffect, useState } from "react";
import { getProducts } from "../../services/products";
import FormField from "./FormField";

const ProductsField = (props) => {
    let [products, setProducts] = useState([]);

    useEffect(async () => {
        const { data } = await getProducts();
        setProducts(data);
    }, []);

    return (
        <FormField
            label="product name"
            name="product_name"
            type="select"
            options={products.map((product) => ({
                label: product.name,
                value: product.id,
            }))}
            {...props}
        />
    );
};

export default ProductsField;
