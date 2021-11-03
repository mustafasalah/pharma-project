import { useHookstate } from "@hookstate/core";
import React, { useEffect } from "react";
import { setDeliveryOption } from "../services/pharmacyBranch";
import { notify } from "../utility";
import FormButton from "./forms/FormButton";
import FormField from "./forms/FormField";

const DeliveryOption = ({ data: { id, support_delivery, delivery_cost } }) => {
    const formData = useHookstate({
        support_delivery: support_delivery.value,
        delivery_cost: delivery_cost.value,
    });

    // Reset Delivery Cost to 0 when disable it
    useEffect(() => {
        if (formData.support_delivery.value === false) {
            formData.delivery_cost.set(0);
        }
    }, [formData.support_delivery.value]);

    const handleSave = async (e) => {
        e.preventDefault();
        const { status } = await setDeliveryOption(id.value, {
            support_delivery: formData.support_delivery.value,
            delivery_cost: formData.delivery_cost.value,
        });

        notify({
            status,
            waitMsg: "Changing delivery option...",
            successMsg: `Delivery option has been ${
                formData.support_delivery.value
                    ? `enabled with cost of ${formData.delivery_cost.value} SDG`
                    : "disabled"
            } successfully!`,
            successCallback() {
                support_delivery.set(formData.support_delivery.value);
                delivery_cost.set(formData.delivery_cost.value);
            },
        });
    };

    return (
        <form onSubmit={handleSave} className="grid gap-y-5 text-smd">
            <FormField
                className="flex flex-col"
                id="support_delivery"
                label="Do you offer home delivery?"
                name="support_delivery"
                type="radio"
                value={formData.support_delivery}
                booleanValue
                options={[
                    {
                        label: "Yes, Enable Delivery",
                        value: true,
                    },
                    {
                        label: "No",
                        value: false,
                    },
                ]}
            />
            <FormField
                label="delivery cost (SDG)"
                name="delivery_cost"
                id="delivery_cost"
                type="number"
                disabled={!formData.support_delivery.value}
                value={formData.delivery_cost}
            />

            <div className="text-right">
                <FormButton label="Save" />
            </div>
        </form>
    );
};

export default DeliveryOption;
