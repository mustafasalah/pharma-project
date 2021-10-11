import React from "react";
import { getSuppliers } from "../../services/suppliers";
import FormField from "./FormField";

const SuppliersField = (props) => {
    return (
        <FormField
            name="supplier"
            label="supplier"
            type="text"
            options={getSuppliers().map((supplier) => supplier.value)}
            placeholder="Enter supplier name..."
            taggable
            {...props}
        />
    );
};

export default SuppliersField;
