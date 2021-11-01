import { useHookstate } from "@hookstate/core";
import React from "react";
import { setOrder } from "../services/orders";
import store from "../state";
import { notify } from "../utility";
import Popup from "./common/Popup";
import DiscountPopupForm from "./forms/DiscountPopupForm";
import FormButton from "./forms/FormButton";
import OrderDetials from "./OrderDetails";

const OrderSummary = ({ products, discount, vat }) => {
    const orderDetails = useHookstate({
        display: false,
        data: {},
    });
    const displayDiscountForm = useHookstate(false);
    const { loggedUser } = useHookstate(store);

    let totalItems = 0,
        basketTotal = 0;

    products.forEach((item) => {
        totalItems += +item.qty.get();
        basketTotal += item.qty.get() * item.price.get();
    });

    // if products products become empty reset discount to zero
    if (products.length === 0 && discount.amount.get() !== 0)
        discount.amount.set(0);

    let discountPercentage = 0;
    let total = 0;
    let actualDiscountAmount = 0;

    if (discount.unit.get() === "%") {
        discountPercentage = +discount.amount.get();
        actualDiscountAmount = (basketTotal * discount.amount.get()) / 100;
        total = basketTotal - actualDiscountAmount + vat.get();
    } else {
        discountPercentage = (discount.amount.get() / basketTotal) * 100 || 0;
        actualDiscountAmount = +discount.amount.get();
        total = basketTotal - actualDiscountAmount + vat.get();
    }

    // if discount become bigger than basket total than reduce it to basket total
    if (actualDiscountAmount > basketTotal) discount.amount.set(basketTotal);

    return (
        <>
            <h3 className="font-semibold mb-5 inline-block pb-2 border-b-2 border-dashed border-gray-300">
                <i className="fas fa-file-invoice-dollar mr-2 text-primary"></i>
                <span>Order Summary</span>
            </h3>
            <div className="bg-white rounded shadow-md p-4 text-smd">
                <p className="flex justify-between pb-2">
                    <span>Basket Total ({totalItems})</span>
                    <span>{basketTotal} SDG</span>
                </p>
                <p className="flex justify-between pb-2">
                    <span>
                        Discount ({discountPercentage.toFixed(1)}%)
                        <button
                            title="Add discount to order"
                            className="text-smd ml-1 fas fa-plus-circle shadow rounded-full text-secondary hover:text-primary"
                            onClick={() => {
                                displayDiscountForm.set(true);
                            }}
                        ></button>
                    </span>
                    <span>- {actualDiscountAmount} SDG</span>
                </p>
                <p className="flex text-gray-400 justify-between pb-3">
                    <span>VAT</span>
                    <span>+ {vat.get()} SDG</span>
                </p>
                <p className="flex justify-between font-semibold text-sm pt-3 border-t-2 border-dashed border-gray-300">
                    <span>Total</span>
                    <span className="text-primary">{total} SDG</span>
                </p>
            </div>
            <div className="grid grid-cols-1 gap-y-4 mt-6">
                {products.length !== 0 && (
                    <>
                        <FormButton
                            className="w-full bg-primary shadow-md text-white hover:bg-secondary"
                            label="Confirm the Order"
                            faClass="fas fa-receipt"
                            onClick={async () => {
                                const { data, status } = await setOrder({
                                    type: "local",
                                    status: "finished",
                                    handled_by: {
                                        id: loggedUser.id.get(),
                                        name: `${loggedUser.first_name.get()} ${loggedUser.last_name.get()}`,
                                    },
                                    date: new Date().toJSON(),
                                    products: products.map(
                                        ({ id, price, qty, name }) => ({
                                            id: id.get(),
                                            name: name.get(),
                                            price: price.get(),
                                            qty: qty.get(),
                                        })
                                    ),
                                    products_amount: total,
                                    discount: actualDiscountAmount,
                                    vat: vat.get(),
                                });

                                notify({
                                    status,
                                    waitMsg: "Making the order...",
                                    successMsg:
                                        "Order has been created successfully!",
                                    successCallback() {
                                        orderDetails.data.set(data);
                                        orderDetails.display.set(true);
                                    },
                                });
                            }}
                        />

                        <FormButton
                            className="w-full bg-white shadow-md hover:text-red"
                            label="Cancel the Order"
                            faClass="fas fa-times text-red"
                            onClick={() => {
                                products.set([]);
                            }}
                        />
                    </>
                )}
            </div>

            <Popup
                state={orderDetails.display}
                faClass="fas fa-file-invoice"
                title={`Order Invoice`}
                onClose={() => {
                    products.set([]);
                }}
            >
                <OrderDetials data={orderDetails.data.get()} />
            </Popup>

            <DiscountPopupForm
                display={displayDiscountForm}
                totalAmount={basketTotal}
                discount={discount}
            />
        </>
    );
};

export default OrderSummary;
