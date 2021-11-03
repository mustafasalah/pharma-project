import { useState, DevTools } from "@hookstate/core";
import React, { useEffect } from "react";
import DataTable from "../common/DataTable";
import SectionHeader from "../common/SectionHeader";
import store from "../../state";
import ManageBtns from "../table/ManageBtns";
import ProductCell from "../table/ProductCell";
import ProductForm from "../forms/ProductForm";
import { getCategories } from "../../services/categories";
import ProductPopupForm from "../forms/ProductPopupForm";
import { deleteProduct } from "../../services/products";
import { notify } from "../../utility";
import { getCompanies } from "../../services/companies";

const Products = () => {
    const {
        tables: { products },
        uploads: { productPhoto },
    } = useState(store);
    DevTools(products).label("Product");

    const showPopupForm = useState(false);
    const sortColumn = useState({ columnName: "id", order: "desc" });

    return (
        <>
            <SectionHeader
                name="Products Catalog"
                faClass="fas fa-boxes"
                addButton={{
                    label: "Add New Product",
                    handler: () => {
                        showPopupForm.set(true);
                    },
                }}
            />
            <DataTable
                filters={filters}
                filtersData={products.filters}
                data={products.data}
                columns={columns}
                sortColumn={sortColumn}
                form={(state, closeForm) => (
                    <ProductForm
                        state={state}
                        closeForm={() => {
                            closeForm();
                            productPhoto.set("");
                        }}
                    />
                )}
                pagination={products.pagination}
            />
            <ProductPopupForm showState={showPopupForm} />
        </>
    );
};

export default Products;

const columns = [
    {
        title: "Products List",
        sortProp: "id",
        wrapper: ({ name, photo, unit, id, edited, handleEdit }) => (
            <ProductCell
                name={name.value}
                photo={photo.url.value}
                unit={unit.value}
                id={id}
                edited={edited}
                onEdit={handleEdit}
            />
        ),
    },
    { title: "barcode", prop: "barcode" },
    { title: "category", prop: "category" },
    { title: "company", prop: "company" },
    {
        title: "ingredient",
        sortProp: "ingredient",
        wrapper: ({ ingredient }) => ingredient.value || "Unknown",
    },
    {
        title: "need perspection?",
        sortProp: "need_perspection",
        wrapper: ({ need_perspection }) =>
            need_perspection.value ? "Yes" : "No",
    },
    {
        title: "manage",
        sortable: false,
        wrapper: ({ id, edited, handleEdit }) => (
            <ManageBtns
                id={id}
                edited={edited}
                onEdit={(e) => {
                    handleEdit(e);
                    store.uploads.productPhoto.set("");
                }}
                onDelete={async () => {
                    const isDelete = window.confirm(
                        "Are you sure to delete this product?"
                    );
                    if (isDelete === false) return;

                    const { status } = await deleteProduct(id.get());

                    notify({
                        status,
                        waitMsg: "Deleting Product...",
                        successMsg: "Product has been deleted successfully!",
                    });
                }}
            />
        ),
    },
];

const filters = [
    {
        label: "Search",
        type: "search",
        by: "name",
        prop: "search",
        placeholder: "enter the product name here...",
    },
    {
        label: "Category",
        type: "select",
        by: "category",
        prop: "category",
        options: [{ label: "All", value: "" }, ...getCategories()],
    },
    {
        label: "Company",
        type: "select",
        by: "company",
        prop: "company",
        options: [{ label: "All", value: "" }, ...getCompanies()],
    },
];
