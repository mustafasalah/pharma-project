import { useState } from "@hookstate/core";
import React from "react";
import store from "../state";

const OrderDetials = ({
    data: {
        id,
        date,
        products,
        products_amount,
        vat,
        discount,
        delivery,
        handled_by,
    },
}) => {
    const {
        pharmacyBranch: { phone_numbers, email, website },
    } = useState(store);
    return (
        <>
            <div className="mb-5 text-right">
                <button
                    onClick={window.print}
                    className="shadow-lg text-smd font-semibold bg-primary text-white px-3 py-1.5 hover:bg-secondary rounded-sm shadow-md"
                >
                    <i className="fas fa-print text-bright mr-2"></i>
                    Print
                </button>
            </div>
            <div className="printable bg-gray-100 border-2 border-gray-300 border-dashed rounded p-5">
                <section className="mb-6">
                    <h2 className="text-center font-semibold text-xl mb-5">
                        CVS Pharmacy
                    </h2>
                    <table>
                        <thead>
                            <tr>
                                <th>Products List</th>
                                <th>QTY</th>
                                <th>Subtotal</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product) => (
                                <tr key={product.name}>
                                    <td>{product.name}</td>
                                    <td>{product.qty}</td>
                                    <td>{product.price * product.qty} SDG</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </section>
                <section className="mb-6">
                    <h3 className="font-semibold mb-5 border-b pb-2">
                        Order Summary
                    </h3>
                    <table>
                        <tbody>
                            <tr>
                                <td>Products Amount</td>
                                <td>{products_amount} SDG</td>
                            </tr>
                            <tr>
                                <td>Discount</td>
                                <td>- {discount} SDG</td>
                            </tr>
                            <tr>
                                <td>VAT</td>
                                <td>+ {vat} SDG</td>
                            </tr>
                            {delivery !== 0 ? (
                                <tr>
                                    <td>Delivery</td>
                                    <td>+ {delivery} SDG</td>
                                </tr>
                            ) : null}
                            <tr>
                                <td>
                                    <strong>Total Amount</strong>
                                </td>
                                <td>
                                    <strong>
                                        {products_amount -
                                            discount +
                                            vat +
                                            delivery}
                                    </strong>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </section>
                <p className="text-sm text-gray-600 leading-6">
                    <p>
                        <strong>Order ID: </strong>
                        <span>{id}</span>
                        <span className="mx-2"> - </span>
                        <strong>Handled By: </strong>
                        <span>{handled_by.name}</span>
                        <span className="mx-2"> - </span>
                        <strong>Date: </strong>
                        <span>{date}</span>
                    </p>
                    <p>
                        <strong>Phone Numbers: </strong>
                        <span>{phone_numbers.get().join(" - ")}</span>
                        {email && (
                            <>
                                <br />
                                <strong>Email: </strong>
                                <span>{email.get()}</span>
                            </>
                        )}

                        {website && (
                            <>
                                <br />
                                <strong>Website: </strong>
                                <span>{website.get()}</span>
                            </>
                        )}
                    </p>
                </p>
            </div>
        </>
    );
};

export default OrderDetials;
