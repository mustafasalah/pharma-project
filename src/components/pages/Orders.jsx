import { useState, DevTools } from "@hookstate/core";
import React, { useEffect } from "react";
import DataTable from "../common/DataTable";
import SectionHeader from "../common/SectionHeader";
import store from "../../state";
import ManageBtns from "../table/ManageBtns";
import { updateOrderStatus } from "../../services/orders";
import { Link } from "react-router-dom";
import Popup from "../common/Popup";
import OrderDetials from "../OrderDetails";
import { useParams } from "react-router";
import FormField from "../forms/FormField";
import { notify } from "../../utility";

const Orders = () => {
    const {
        tables: { orders },
        popupWindow,
    } = useState(store);
    DevTools(orders).label("Orders");

    let { id: orderId } = useParams();
    const sortColumn = useState({ columnName: "id", order: "desc" });

    useEffect(() => {
        if (!isNaN(orderId)) {
            orders.filters.search.set(orderId);
        }
    }, [orderId]);

    return (
        <>
            <SectionHeader name="Orders" faClass="fas fa-dolly" />
            <DataTable
                filters={filters}
                filtersData={orders.filters}
                data={orders.data}
                columns={columns}
                sortColumn={sortColumn}
                pagination={orders.pagination}
            />
            <Popup
                style={
                    popupWindow.type.get() === "payment-proof"
                        ? { width: 400 }
                        : {}
                }
                state={popupWindow.display}
                faClass={`fas fa-file-invoice${
                    popupWindow.type.get() === "payment-proof" ? "-dollar" : ""
                }`}
                title={`Order ${
                    popupWindow.type.get() === "payment-proof"
                        ? "Payment Proof"
                        : `Invoice - #${popupWindow.data.id.get()}`
                }`}
            >
                {popupWindow.type.get() === "payment-proof" ? (
                    <img
                        className="mx-auto"
                        src={popupWindow.data.proof_screenshot.get()}
                        style={{ height: 600 }}
                        alt="Payment Proof"
                    />
                ) : (
                    <OrderDetials data={popupWindow.data.get()} />
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
        wrapper: ({ id, popupWindow, item }) => (
            <a
                href={`#${id.get()}`}
                onClick={() => {
                    popupWindow.data.set(
                        JSON.parse(JSON.stringify(item.value))
                    );
                    popupWindow.type.set("order-invoice");
                    popupWindow.display.set(true);
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
        sortProp: "products_amount",
        wrapper: ({ products_amount, vat, discount, delivery }) => {
            return `${
                products_amount.value +
                vat.value +
                delivery.value -
                discount.value
            } SDG`;
        },
    },
    {
        title: "status",
        sortProp: "status",
        wrapper: ({ status, id }) => {
            return (
                <FormField
                    name="status"
                    type="select"
                    value={status}
                    onChange={async (selectedValue) => {
                        const { status: responseStatus } =
                            await updateOrderStatus(
                                id.get(),
                                selectedValue.value
                            );
                        notify({
                            status: responseStatus,
                            waitMsg: "Changing Order Status...",
                            successMsg: `Order status has been changed to '${selectedValue.label}' successfully!`,
                            successCallback() {
                                status.set(selectedValue.value);
                            },
                        });
                    }}
                    options={[
                        { label: "Finished", value: "finished" },
                        { label: "Pending", value: "pending" },
                        { label: "Payment Confirmed", value: "confirmed" },
                        { label: "Canceled", value: "canceled" },
                    ]}
                />
            );
        },
    },
    {
        title: "handled by",
        sortProp: "handled_by.name",
        wrapper: ({ handled_by: { id, name } }) => {
            if (id.get() === "") return "Not handled yet";
            if (store.loggedUser.role.get() === "pharmacist") return name.get();
            return <Link to={`/staff/${id.get()}`}>{name.get()}</Link>;
        },
    },
    { title: "date", prop: "date" },
    {
        title: "payment method",
        sortProp: "payment.method",
        wrapper: ({ popupWindow, payment: { method, proof } }) => {
            return (
                <>
                    <span className="capitalize align-middle">
                        {method.get()}
                    </span>
                    {proof.get() && (
                        <button
                            type="button"
                            className="ml-2 px-2 py-1 rounded-sm text-white bg-green hover:text-green hover:bg-white hover:shadow-md transition-none shadow font-semibold text-xxs"
                            onClick={() => {
                                popupWindow.data.set({
                                    proof_screenshot: proof.get(),
                                });
                                popupWindow.type.set("payment-proof");
                                popupWindow.display.set(true);
                            }}
                        >
                            <i className="fas fa-file-invoice-dollar mr-1"></i>{" "}
                            Proof
                        </button>
                    )}
                </>
            );
        },
    },
    {
        title: "manage",
        sortable: false,
        wrapper: ({ popupWindow, item }) => {
            return (
                <ManageBtns
                    id={item.id}
                    onView={() => {
                        popupWindow.data.set(
                            JSON.parse(JSON.stringify(item.value))
                        );
                        popupWindow.type.set("order-invoice");
                        popupWindow.display.set(true);
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
            { label: "Pending", value: "pending" },
            { label: "Payment Confirmed", value: "confirmed" },
            { label: "Canceled", value: "canceled" },
        ],
    },
];
