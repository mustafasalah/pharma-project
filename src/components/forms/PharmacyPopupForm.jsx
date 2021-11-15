import { DevTools, useState } from "@hookstate/core";
import React, { useEffect } from "react";
import pharmacyFormState from "../../states/pharmacyFormState";
import FormField from "./FormField";
import PopupForm from "./PopupForm";
import {
    getPharmaciesByOwner,
    getPharmacyBasicInfo,
    setPharmacy,
    updatePharmacyBranch,
} from "../../services/pharmacies";
import { getCityOptions, notify } from "../../utility";
import store from "../../state";
import { setPharmacyBranch } from "../../services/pharmacies";
import Note from "../common/Note";
import PhoneNumberField from "./PhoneNumberField";

const PharmacyPopupForm = ({ showState, formState }) => {
    let state = useState({
        data: { ...pharmacyFormState.data },
        errors: { ...pharmacyFormState.errors },
    });
    const { pharmacyBranches: pharmaciesData, loggedUser } = useState(store);
    let { data, errors } = state;
    DevTools(state).label("Pharmacy Popup Form");
    const isPending = formState && formState.status === "pending";
    const isFirstPharmacy = useState(false);

    useEffect(() => {
        data.set(
            formState
                ? JSON.parse(JSON.stringify(formState))
                : {
                      ...pharmacyFormState.data,
                      pharmacy_id: data.pharmacy_id.get(),
                      name: data.name.get(),
                      website: data.website.get(),
                      email: data.email.get(),
                      phone_numbers: ["", ""],
                  }
        );
    }, [formState]);

    useEffect(() => {
        (async () => {
            if (isFirstPharmacy.value === true) return;
            try {
                const { data: pharmacyBasicInfo } = await getPharmacyBasicInfo(
                    store.loggedUser.id.get()
                );
                state.data.merge(pharmacyBasicInfo);
            } catch (ex) {
                isFirstPharmacy.set(true);
            }
        })();
    }, [isFirstPharmacy.value]);

    return (
        <PopupForm
            title="Add New Pharmacy Branch"
            state={showState}
            className="grid grid-cols-12 gap-x-5 gap-y-6 text-sm gray-inputs"
            formButtons={
                formState && formState.status === "pending"
                    ? []
                    : [
                          {
                              label: formState
                                  ? "Resubmit Pharmacy Branch Info"
                                  : "Add Pharmacy Branch",
                              faClass: formState
                                  ? "fas fa-redo"
                                  : "fas fa-plus",
                          },
                      ]
            }
            onSubmit={async () => {
                const isUpdate = formState && formState.status === "rejected";

                const { status } = await (isUpdate
                    ? updatePharmacyBranch(data.get())
                    : isFirstPharmacy.value
                    ? setPharmacy(data.get(), {
                          id: loggedUser.id.get(),
                          name: `${loggedUser.first_name.get()} ${loggedUser.last_name.get()}`,
                      })
                    : setPharmacyBranch(data.get()));

                notify({
                    status,
                    successMsg: isUpdate
                        ? "Pharmacy Branch Info has been Resubmited successfully!"
                        : "New Pharmacy Branch has been added successfully!",
                    successCallback: async () => {
                        // Clear the form data
                        data.set({
                            ...pharmacyFormState.data,
                            pharmacy_id: data.pharmacy_id.get(),
                            name: data.name.get(),
                            website: data.website.get(),
                            email: data.email.get(),
                            phone_numbers: ["", ""],
                        });

                        if (isFirstPharmacy.value === true) {
                            isFirstPharmacy.set(false);
                        }

                        // Update employees data list
                        const { data: newPharmacyBranchData } =
                            await getPharmaciesByOwner(
                                store.loggedUser.id.get()
                            );
                        pharmaciesData.set(newPharmacyBranchData);

                        // Close the popup form
                        showState.set(false);
                    },
                });
            }}
        >
            {formState && (
                <Note className="col-span-full">
                    {formState.status === "rejected" ? (
                        <>
                            <strong>Note:</strong> Your pharmacy branch has been
                            rejected due to incorrect information about your
                            branch, please review the information you entered
                            and edit them to be correct and then resubmit the
                            information again to be reviewd by our team.
                        </>
                    ) : (
                        <>
                            <strong>Note:</strong> Our team will review your
                            pharmacy branch information as soon as possible to
                            verify from the information you entered and then
                            activate it!
                        </>
                    )}
                </Note>
            )}

            <FormField
                className="flex flex-col col-span-4"
                label="pharmacy name"
                name="name"
                id="1"
                value={data.name}
                placeholder="pharmacy name here..."
                disabled={isFirstPharmacy.value === false}
                required
            />

            <FormField
                className="flex flex-col col-span-4"
                label="branch name"
                name="branch"
                id="2"
                value={data.branch}
                placeholder="branch name here..."
                required={isFirstPharmacy.value === false}
                disabled={isPending}
            />

            <PhoneNumberField
                className="flex flex-col col-span-4"
                label="phone number 1"
                name="phone_number_1"
                id="3"
                value={data.phone_numbers[0]}
                disabled={isPending}
                required
            />

            <PhoneNumberField
                className="flex flex-col col-span-4"
                label="phone number 2"
                name="phone_number_2"
                id="4"
                value={data.phone_numbers[1]}
                disabled={isPending}
            />

            <FormField
                className="flex flex-col col-span-4"
                label="email"
                name="email"
                id="5"
                type="email"
                value={data.email}
                placeholder="pharmacy email here..."
                disabled={isPending}
            />

            <FormField
                className="flex flex-col col-span-4"
                label="website"
                name="website"
                id="6"
                type="url"
                value={data.website}
                placeholder="pharmacy website here..."
                disabled={isPending}
            />

            <FormField
                className="flex flex-col col-span-3"
                label="state"
                name="state"
                type="select"
                id="7"
                value={data.state}
                options={[{ label: "Khartoum", value: "khartoum" }]}
                required
                disabled={isPending}
            />

            <FormField
                className="flex flex-col col-span-3"
                label="city"
                name="city"
                id="8"
                type="select"
                options={getCityOptions()}
                value={data.city}
                placeholder="city name here..."
                required
                disabled={isPending}
            />

            <FormField
                className="flex flex-col col-span-6"
                label="address"
                name="address"
                id="8"
                value={data.address}
                placeholder="address line here..."
                required
                disabled={isPending}
            />
        </PopupForm>
    );
};

export default PharmacyPopupForm;
