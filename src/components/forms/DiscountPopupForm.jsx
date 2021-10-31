import { useHookstate } from "@hookstate/core";
import React from "react";
import FormField from "./FormField";
import PopupForm from "./PopupForm";

const DiscountPopupForm = ({ display, totalAmount, discount }) => {
    const { amount, unit } = useHookstate({
        amount: discount.amount.get(),
        unit: discount.unit.get(),
    });
    return (
        <PopupForm
            title="Make a Discount"
            faClass="fas fa-percent"
            style={{ minWidth: "30%", width: 300 }}
            state={display}
            formButtons={[
                {
                    label: "Apply Discount",
                    faClass: "",
                },
            ]}
            className="grid gap-x-5 gap-y-6 grid-cols-4 text-sm"
            onSubmit={() => {
                discount.set({
                    amount: amount.get(),
                    unit: unit.get(),
                });
                display.set(false);
            }}
        >
            <FormField
                className="col-span-2"
                label="discount amount"
                name="discount_amount"
                id="discount_amount"
                type="number"
                value={amount}
                max={unit.get() === "%" ? 100 : totalAmount}
                min="0"
            />

            <FormField
                className="col-span-2"
                label="unit"
                name="discount_unit"
                id="discount_unit"
                type="select"
                value={unit}
                options={[
                    { label: "SDG", value: "SDG" },
                    { label: "%", value: "%" },
                ]}
            />
        </PopupForm>
    );
};

export default DiscountPopupForm;
