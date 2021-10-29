import { useState } from "@hookstate/core";
import React from "react";
import store from "../../state";
import Note from "../common/Note";
import Section from "../common/Section";
import SectionHeader from "../common/SectionHeader";
import FormField from "../forms/FormField";
import PaymentOption from "../PaymentOption";
import DeliveryOption from "../DeliveryOption";
import FormButton from "../forms/FormButton";
import PharmacyInformationForm from "../forms/PharmacyInformationForm";

const PharmacySettings = () => {
    const { pharmacyBranch } = useState(store);

    return (
        <>
            <SectionHeader name="Pharmacy Settings" faClass="fas fa-cogs" />
            <div className="grid grid-cols-3 gap-5 items-start">
                <Section label="Pharmacy Information" className="col-span-2">
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
                    <Section label="Delivery Option" className="mt-5 text-sm">
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
