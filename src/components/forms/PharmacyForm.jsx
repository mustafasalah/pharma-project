import React, { useCallback } from "react";
import Form from "./Form";
import FormField from "./FormField";
import { getCityOptions, notify } from "../../utility";
import { useState, DevTools } from "@hookstate/core";
import { updatePharmacyStatus } from "../../services/pharmacies";
import PhoneNumberField from "./PhoneNumberField";

const rejectBtn = {
    label: "Reject",
    faClass: "fas fa-times-circle text-red group-hover:text-white",
    className:
        "bg-gray rounded text-smd shadow text-red hover:bg-red hover:text-white",
};
const activeBtn = { label: "Activate", faClass: "fas fa-check-circle" };

const PharmacyForm = ({
    state,
    className = "grid gap-x-5 gap-y-6 grid-cols-6 text-sm",
}) => {
    const formState = useState(JSON.parse(JSON.stringify(state.value)));
    DevTools(formState).label("Pharmacy Form State");

    const changePharmacyStatus = useCallback(async (id, status) => {
        const { status: responseStatus } = await updatePharmacyStatus(
            id,
            status
        );
        notify({
            status: responseStatus,
            waitMsg: "Changing Pharmacy Status...",
            successMsg: `Pharmacy status has been changed to '${status}' successfully!`,
            successCallback() {
                state.status.set(status);
            },
        });
    }, []);

    rejectBtn.onClick = changePharmacyStatus.bind(
        null,
        state.id.get(),
        "rejected"
    );

    activeBtn.onClick = changePharmacyStatus.bind(
        null,
        state.id.get(),
        "active"
    );

    const formButtons = [];

    switch (state.status.get()) {
        case "active":
            formButtons.push(rejectBtn);
            break;

        case "rejected":
            formButtons.push(activeBtn);
            break;

        default:
            formButtons.push(rejectBtn, activeBtn);
    }

    return (
        <Form
            className={className}
            formButtons={formButtons}
            onSubmit={() => false}
        >
            <FormField
                className="flex flex-col col-span-2"
                label="pharmacy name"
                name="name"
                id="1"
                value={formState.name}
                placeholder="pharmacy name here..."
                required
                disabled
            />

            <FormField
                className="flex flex-col col-span-2"
                label="branch name"
                name="branch"
                id="2"
                value={formState.branch}
                placeholder="branch name here..."
                disabled
            />

            <PhoneNumberField
                className="flex flex-col col-span-2"
                label="phone number 1"
                name="phone_number_1"
                id="3"
                value={formState.phone_numbers[0]}
                disabled
                required
            />

            <PhoneNumberField
                className="flex flex-col col-span-2"
                label="phone number 2"
                name="phone_number_2"
                id="4"
                value={formState.phone_numbers[1]}
                disabled
            />

            <FormField
                className="flex flex-col col-span-2"
                label="email"
                name="email"
                id="5"
                type="email"
                value={formState.email}
                placeholder="pharmacy email here..."
                disabled
            />

            <FormField
                className="flex flex-col col-span-2"
                label="website"
                name="website"
                id="6"
                type="url"
                value={formState.website}
                placeholder="pharmacy website here..."
                disabled
            />

            <FormField
                className="flex flex-col col-span-3"
                label="state"
                name="state"
                type="select"
                id="7"
                value={formState.state}
                options={[{ label: "Khartoum", value: "khartoum" }]}
                required
                disabled
            />

            <FormField
                className="flex flex-col col-span-3"
                label="city"
                name="city"
                id="8"
                type="select"
                options={getCityOptions()}
                value={formState.city}
                placeholder="city name here..."
                required
                disabled
            />

            <FormField
                className="flex flex-col col-span-6"
                label="address"
                name="address"
                id="8"
                value={formState.address}
                placeholder="address line here..."
                required
                disabled
            />
        </Form>
    );
};

export default PharmacyForm;
