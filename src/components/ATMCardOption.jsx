import React from "react";
import SubSection from "./common/SubSection";
import FormButton from "./forms/FormButton";
import FormField from "./forms/FormField";

const ATMCardOption = ({ data, onSave, onDeactivate }) => {
    return (
        <SubSection label="ATM Card">
            <form
                onSubmit={onSave}
                className="p-4 select-none bg-gray grid gap-y-5 grid-cols-1"
            >
                <FormField
                    label="card no"
                    name="card_no"
                    id="card_no"
                    type="number"
                    value={data.card_no}
                    required
                />

                <FormField
                    label="card owner name"
                    name="card_onwer_name"
                    id="card_onwer_name"
                    value={data.card_owner_name}
                    required
                />

                <FormField
                    label="bank name"
                    name="bank_name"
                    id="bank_name"
                    value={data.bank_name}
                    required
                />

                <div className="flex justify-end">
                    <FormButton
                        label="Deactivate"
                        faClass="fas fa-times text-red"
                        className="bg-white text-black shadow-md hover:text-red"
                        type="button"
                        onClick={onDeactivate}
                    />
                    <FormButton label="Save" />
                </div>
            </form>
        </SubSection>
    );
};

export default ATMCardOption;
