import { useHookstate } from "@hookstate/core";
import React from "react";
import { setPharmacyInformation } from "../../services/pharmacyBranch";
import { notify } from "../../utility";
import FormButton from "./FormButton";
import FormField from "./FormField";

const PharmacyInformationForm = ({ data }) => {
    const formData = useHookstate(JSON.parse(JSON.stringify(data.value)));
    return (
        <form
            onSubmit={async (e) => {
                e.preventDefault();
                const { status } = await setPharmacyInformation(data.id.value, {
                    name: formData.name.value,
                    branch: formData.branch.value,
                    phone_numbers: formData.phone_numbers.map(
                        (num) => num.value
                    ),
                    website: formData.website.value,
                    state: formData.state.value,
                    city: formData.city.value,
                    address: formData.address.value,
                });
                notify({
                    status,
                    waitMsg: "Saving Changes...",
                    successMsg:
                        "Pharmacy information has been changed successfully!",
                    successCallback() {
                        data.set(JSON.parse(JSON.stringify(formData.value)));
                    },
                });
            }}
        >
            <div className="grid grid-cols-4 gap-5 text-sm">
                <FormField
                    className="flex flex-col col-span-2"
                    label="pharmacy name"
                    name="pharmacy_name"
                    id="1"
                    value={formData.name}
                    required
                />
                <FormField
                    className="flex flex-col col-span-2"
                    label="branch name"
                    name="branch_name"
                    id="2"
                    value={formData.branch}
                    required
                />
                <FormField
                    className="flex flex-col col-span-2"
                    label="phone number 1"
                    name="phone_number_1"
                    id="3"
                    type="tel"
                    maxLength="13"
                    pattern="\+[0-9]{10,12}"
                    value={formData.phone_numbers[0]}
                    placeholder="e.g. +2499XXXXXXXX"
                    required
                />
                <FormField
                    className="flex flex-col col-span-2"
                    label="phone number 2"
                    name="phone_number_2"
                    id="4"
                    type="tel"
                    maxLength="13"
                    pattern="\+[0-9]{10,12}"
                    value={formData.phone_numbers[1]}
                    placeholder="e.g. +2499XXXXXXXX"
                />
                <FormField
                    className="flex flex-col col-span-2"
                    label="pharmacy email"
                    name="email"
                    type="email"
                    id="5"
                    value={formData.email}
                    placeholder="email here..."
                />
                <FormField
                    className="flex flex-col col-span-2"
                    label="pharmacy website"
                    name="website"
                    type="url"
                    id="6"
                    value={formData.website}
                    placeholder="pharmacy website link here..."
                />
                <FormField
                    className="flex flex-col"
                    label="state"
                    name="state"
                    type="select"
                    id="9"
                    value={formData.state}
                    options={[{ label: "Khartoum", value: "khartoum" }]}
                />
                <FormField
                    className="flex flex-col"
                    label="city"
                    name="city"
                    id="10"
                    value={formData.city}
                    placeholder="city name here..."
                />
                <FormField
                    className="flex flex-col col-span-2"
                    label="address"
                    name="address"
                    id="11"
                    value={formData.address}
                    placeholder="address line here..."
                />
                <label htmlFor="" className="col-span-4 font-medium">
                    Location in the map
                </label>
            </div>
            <div className="text-right mt-5">
                <FormButton label="Save Changes" />
            </div>
        </form>
    );
};

export default PharmacyInformationForm;
