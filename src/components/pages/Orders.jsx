import { useState, DevTools } from "@hookstate/core";
import React, { useEffect } from "react";
import DataTable from "../common/DataTable";
import SectionHeader from "../common/SectionHeader";
import store from "../../state";
import ManageBtns from "../table/ManageBtns";
import { getOrders } from "../../services/orders";
import EmployeeForm from "../forms/EmployeeForm";
import { Link } from "react-router-dom";
import Popup from "../common/Popup";
import OrderDetials from "../OrderDetails";
import { useParams } from "react-router";

const Orders = () => {
    const {
        tables: { orders },
        showPopupWindow,
    } = useState(store);
    DevTools(orders).label("Orders");

    let { id: orderId } = useParams();
    const sortColumn = useState({ columnName: "id", order: "desc" });

    useEffect(() => {
        const ordersData = getOrders();
        orders.data.set(ordersData);
        if (!isNaN(orderId)) {
            orders.filters.search.set(orderId);
        }
    }, []);

    return (
        <>
            <SectionHeader name="Orders" faClass="fas fa-dolly" />
            <DataTable
                filters={filters}
                filtersData={orders.filters}
                data={orders.data}
                columns={columns}
                sortColumn={sortColumn}
                form={(state, closeForm) => (
                    <EmployeeForm state={state} closeForm={closeForm} />
                )}
                pagination={orders.pagination}
            />
            <Popup
                state={showPopupWindow.state}
                faClass={`fas fa-file-invoice${
                    showPopupWindow.data &&
                    showPopupWindow.data.type.get() === "payment-proof"
                        ? "-dollar"
                        : ""
                }`}
                title={`Order ${
                    showPopupWindow.data &&
                    showPopupWindow.data.type.get() === "payment-proof"
                        ? "Payment Proof"
                        : `Invoice - #${showPopupWindow.data.id.value}`
                }`}
            >
                {showPopupWindow.data.type.get() === "payment-proof" ? (
                    <img
                        src={showPopupWindow.data.proof_screenshot.get()}
                        style={{ height: 400 }}
                        alt="Payment Proof"
                    />
                ) : (
                    <OrderDetials data={showPopupWindow.data.get()} />
                )}
            </Popup>
        </>
    );
};

export default Orders;

const columns = [
    {
        title: "order ID",
        sortProp: "id",
        wrapper: ({ id, showPopupWindow, item }) => (
            <a
                href={`#${id.get()}`}
                onClick={() => {
                    showPopupWindow.data.set(
                        JSON.parse(JSON.stringify(item.value))
                    );
                    showPopupWindow.state.set(true);
                }}
                className="text-smd"
            >
                #{id.get()}
            </a>
        ),
    },
    { title: "type", prop: "type" },
    {
        title: "total price",
        wrapper: ({ products_amount, vat, discount, delivery }) => {
            return `${
                products_amount.value +
                vat.value +
                delivery.value -
                discount.value
            } SDG`;
        },
    },
    { title: "status", prop: "status" },
    {
        title: "handled by",
        wrapper: ({ handled_by: { id, name } }) => {
            return <Link to={`/staff/${id.get()}`}>{name.get()}</Link>;
        },
    },
    { title: "date", prop: "date" },
    {
        title: "payment method",
        wrapper: ({ showPopupWindow, payment: { method, proof } }) => {
            return (
                <>
                    <span className="align-middle">{method.get()}</span>
                    <button
                        type="button"
                        className="ml-2 px-2 py-1 rounded-sm text-white bg-green hover:text-green hover:bg-white hover:shadow-md transition-none shadow font-semibold text-xxs"
                        onClick={() => {
                            showPopupWindow.data.set({
                                proof_screenshot: proof.get(),
                            });
                            showPopupWindow.data.merge({
                                type: "payment-proof",
                            });
                            showPopupWindow.state.set(true);
                        }}
                    >
                        <i className="fas fa-file-invoice-dollar mr-1"></i>{" "}
                        Proof
                    </button>
                </>
            );
        },
    },
    {
        title: "manage",
        sortable: false,
        wrapper: ({ showPopupWindow, item }) => {
            return (
                <ManageBtns
                    id={item.id}
                    onView={() => {
                        showPopupWindow.data.set(
                            JSON.parse(JSON.stringify(item.value))
                        );
                        showPopupWindow.data.merge({ type: "order-invoice" });
                        showPopupWindow.state.set(true);
                    }}
                />
            );
        },
    },
];

const filters = [
    {
        label: "Search",
        type: "search",
        by: "id",
        prop: "search",
        placeholder: "enter the order ID here...",
    },
    {
        label: "Type",
        type: "select",
        by: "type",
        prop: "type",
        options: [
            { label: "All", value: "" },
            { label: "Local Orders", value: "local" },
            { label: "Online Orders", value: "online" },
        ],
    },
    {
        label: "Status",
        type: "select",
        by: "status",
        prop: "status",
        options: [
            { label: "All", value: "" },
            { label: "Finished", value: "finished" },
            { label: "Pending", value: "online" },
        ],
    },
];
