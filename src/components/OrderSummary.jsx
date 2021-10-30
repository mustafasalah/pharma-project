import React from "react";
import FormButton from "./forms/FormButton";

const OrderSummary = ({ list, discount, vat }) => {
    let totalItems = 0,
        basketTotal = 0;

    list.forEach((item) => {
        totalItems += +item.qty.get();
        basketTotal += item.qty.get() * item.price.get();
    });

    const discountPercentage = (discount.get() / basketTotal) * 100 || 0;
    const total = basketTotal - discount.get() + vat.get();

    return (
        <>
            <h3 className="font-semibold mb-5">
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
                        Discount ({discountPercentage}%)
                        <button
                            title="Add discount to order"
                            className="text-smd ml-1 fas fa-plus-circle shadow rounded-full text-secondary hover:text-primary"
                        ></button>
                    </span>
                    <span>- {discount.get()} SDG</span>
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
                <FormButton
                    className="w-full bg-primary shadow-md text-white hover:bg-secondary"
                    label="Confirm the Order"
                    faClass="fas fa-receipt"
                />

                <FormButton
                    className="w-full bg-white shadow-md hover:text-red"
                    label="Cancel the Order"
                    faClass="fas fa-times text-red"
                />
            </div>
        </>
    );
};

export default OrderSummary;
