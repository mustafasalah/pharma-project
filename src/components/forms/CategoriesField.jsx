import React from "react";
import { getCategories } from "../../services/categories";
import FormField from "./FormField";

const CategoriesField = (props) => {
    return (
        <FormField
            name="category"
            label="category"
            type="select"
            options={[{ label: "None", value: "" }, ...getCategories()]}
            placeholder="Select Category"
            {...props}
        />
    );
};

export default CategoriesField;
