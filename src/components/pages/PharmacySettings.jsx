import { useState } from "@hookstate/core";
import React from "react";
import store from "../../state";
import Note from "../common/Note";
import Section from "../common/Section";
import SectionHeader from "../common/SectionHeader";
import PaymentOption from "../PaymentOption";
import DeliveryOption from "../DeliveryOption";
import PharmacyInformationForm from "../forms/PharmacyInformationForm";
import FormField from "../forms/FormField";
import FormButton from "../forms/FormButton";
import { setVATOption } from "../../services/pharmacyBranch";
import { notify } from "../../utility";

const PharmacySettings = () => {
    const { pharmacyBranch } = useState(store);
    const vatAmount = useState(pharmacyBranch.vat.value);
    return (
        <>
            <SectionHeader name="Pharmacy Settings" faClass="fas fa-cogs" />
            <div className="grid grid-cols-3 gap-5 items-start">
                <Section
                    label="Pharmacy Information"
                    className="col-span-2"
                    contentClassName="p-5 gray-inputs"
                >
                    <PharmacyInformationForm data={pharmacyBranch} />
                </Section>

                <aside>
                    <Section
                        label="Online Order Option"
                        contentClassName="overflow-hidden"
                    >
                        <Note className="text-smd m-5">
                            <strong>Note:</strong> To enable online ordering for
                            your pharmacy products, you must activate at least
                            one of the payment methods below.
                        </Note>
                        <PaymentOption
                            branchId={pharmacyBranch.id.value}
                            option="mbok"
                            data={pharmacyBranch.payment_options.mbok}
                        />
                        <PaymentOption
                            branchId={pharmacyBranch.id.value}
                            option="atm_card"
                            data={pharmacyBranch.payment_options.atm_card}
                        />
                    </Section>

                    <Section label="VAT Option" className="mt-5 gray-inputs">
                        <Note className="text-smd mb-5">
                            <strong>Note:</strong> This VAT will be added to the
                            total price of online and local orders.
                        </Note>
                        <form
                            onSubmit={async (e) => {
                                e.preventDefault();
                                const { status } = await setVATOption();
                                notify({
                                    status,
                                    waitMsg: "Setting new VAT amount...",
                                    successMsg:
                                        "VAT amount has been changes successfully!",
                                    successCallback() {
                                        pharmacyBranch.vat.set(
                                            +vatAmount.value
                                        );
                                    },
                                });
                            }}
                            className="text-smd"
                        >
                            <FormField
                                label="VAT amount (SDG)"
                                name="vat"
                                id="pharmacy_vat"
                                value={vatAmount}
                                type="number"
                                min="0"
                            />
                            <div className="mt-5 text-right">
                                <FormButton label="save" />
                            </div>
                        </form>
                    </Section>

                    <Section
                        label="Delivery Option"
                        className="mt-5 gray-inputs"
                    >
                        <Note className="text-smd mb-5">
                            <strong>Note:</strong> If home delivery is enabled,
                            users of the search platform will be able to order
                            medicines with the option of home delivery. Your
                            delivery service should be statewide and at a fixed
                            price for all orders.
                        </Note>
                        <DeliveryOption data={pharmacyBranch} />
                    </Section>
                </aside>
            </div>
        </>
    );
};

export default PharmacySettings;
