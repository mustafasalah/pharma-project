import React from "react";
import { getCompanies } from "../../services/companies";
import FormField from "./FormField";

const CompaniesField = (props) => {
    return (
        <FormField
            name="company"
            label="company"
            type="text"
            options={getCompanies()}
            placeholder="Enter the company..."
            taggable
            {...props}
        />
    );
};

export default CompaniesField;
