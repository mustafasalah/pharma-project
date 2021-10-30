import { useHookstate } from "@hookstate/core";
import React, { useState } from "react";
import { setPaymentOption } from "../services/pharmacyBranch";
import { notify } from "../utility";
import ATMCardOption from "./ATMCardOption";
import MbokOption from "./MbokOption";

const PaymentOption = ({ option, data, branchId }) => {
    const defaultStatus =
        data[option === "mbok" ? "account_no" : "card_no"].value !== "";
    const [active, setActive] = useState(defaultStatus);
    const formData = useHookstate(JSON.parse(JSON.stringify(data.value)));

    const handleSave = async (e, isDeactivate = false) => {
        e.preventDefault();
        const { status } = await setPaymentOption(
            branchId,
            option,
            formData.get()
        );
        notify({
            status,
            waitMsg: "Saving Changes...",
            successMsg: isDeactivate
                ? `Payment option "${option}" has been deactivated successfully!`
                : `Payment option "${option}" has been changed successfully!`,
            successCallback() {
                data.set(JSON.parse(JSON.stringify(formData.value)));
                if (isDeactivate) setActive(false);
            },
        });
    };

    const handleDeactivate = (e) => {
        const deactivate = window.confirm(
            "Are you sure to deactivate this payment option?"
        );
        if (deactivate === false) return;
        if (option === "mbok") {
            formData.account_no.set("");
            formData.account_owner_name.set("");
            formData.bank_branch_name.set("");
        } else {
            formData.card_no.set("");
            formData.card_onwer_name.set("");
            formData.bank_name.set("");
        }
        handleSave(e, true);
    };

    return (
        <>
            {active ? (
                option === "mbok" ? (
                    <MbokOption
                        data={formData}
                        onSave={handleSave}
                        onDeactivate={handleDeactivate}
                    />
                ) : (
                    <ATMCardOption
                        data={formData}
                        onSave={handleSave}
                        onDeactivate={handleDeactivate}
                    />
                )
            ) : (
                <h4 className="flex items-center bg-gray border-b last:border-b-0 font-semibold text-sm shadow px-3 py-2">
                    {option === "mbok" ? "MBOK" : "ATM Card"} -{" "}
                    <i>Not Activated Yet</i>
                    <button
                        type="button"
                        onClick={() => {
                            setActive(true);
                        }}
                        className="text-xxs font-semibold ml-auto px-2 py-0.5 shadow-md rounded-sm bg-secondary hover:bg-primary text-white"
                    >
                        Activate
                    </button>
                </h4>
            )}
        </>
    );
};

export default PaymentOption;
