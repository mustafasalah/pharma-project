import React, { useEffect } from "react";
import { useState, DevTools } from "@hookstate/core";
import { getProductsStatistics } from "../services/statistic";
import store from "../state";
import DataTable from "./common/DataTable";
import SectionHeader from "./common/SectionHeader";
import ProductCell from "./table/ProductCell";
import { nFormatter } from "../utility";

function ProductsStatistics() {
    const {
        tables: { productsStatistics },
    } = useState(store);
    DevTools(productsStatistics).label("Products Statistics");
    const sortColumn = useState({
        columnName: "sold",
        order: "desc",
    });

    useEffect(() => {
        const productsStatisticsData = getProductsStatistics();
        productsStatistics.data.set(productsStatisticsData);
    }, []);

    return (
        <>
            <SectionHeader
                name="Products Statistics"
                faClass="fas fa-info-circle"
            />
            <DataTable
                filters={filters}
                filtersData={productsStatistics.filters}
                data={productsStatistics.data}
                columns={columns}
                sortColumn={sortColumn}
                pagination={productsStatistics.pagination}
            />
        </>
    );
}

export default ProductsStatistics;

const columns = [
    {
        title: "Products List",
        sortProp: "id",
        wrapper: ({ name, photo, unit, id }) => (
            <ProductCell
                name={name.value}
                photo={photo.value}
                unit={unit.value}
                id={id}
            />
        ),
    },
    { title: "cost", wrapper: ({ cost }) => `${cost.get()} SDG` },
    {
        title: "price",
        wrapper: ({ price }) => `${price.get()} SDG`,
    },
    { title: "item sold", prop: "sold" },
    {
        title: "total sales",
        wrapper: ({ sales }) => `${nFormatter(sales.get())} SDG`,
    },
    {
        title: "profits",
        wrapper: ({ profits }) => `${nFormatter(profits.get())} SDG`,
    },
    { title: "remaining qty", prop: "qty" },
    {
        title: "status",
        wrapper: ({ qty }) =>
            qty.value > 0 ? (
                <strong className="text-green font-semibold">In Stock</strong>
            ) : (
                <strong className="text-red font-semibold">Out of Stock</strong>
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
    // {
    //     label: "Order By",
    //     type: "select",
    //     prop: "order",
    //     options: [
    //         {
    //             label: "Top Selling",
    //             value: "sold",
    //         },
    //         {
    //             label: "Top Profitable",
    //             value: "profits",
    //         },
    //     ],
    // },
    // {
    //     label: "Status",
    //     type: "select",
    //     by: "stock",
    //     prop: "stock",
    //     handler: (status, stock) => {
    //         return status === "in-stock" ? stock > 0 : stock <= 0;
    //     },
    //     options: [
    //         { label: "All", value: "" },
    //         { label: "In Stock", value: "in-stock" },
    //         { label: "Out of Stock", value: "out-of-stock" },
    //     ],
    // },
];
