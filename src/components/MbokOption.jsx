import React from "react";
import SubSection from "./common/SubSection";
import FormButton from "./forms/FormButton";
import FormField from "./forms/FormField";

const MbokOption = ({ data, onSave, onDeactivate }) => {
    return (
        <SubSection label="MBOK">
            <form
                onSubmit={onSave}
                className="p-4 select-none bg-gray grid gap-y-5 grid-cols-1"
            >
                <FormField
                    label="account no"
                    name="mbok_account_no"
                    id="mbok_account_no"
                    type="number"
                    value={data.account_no}
                    required
                />

                <FormField
                    label="account onwer name"
                    name="mbok_account_name"
                    id="mbok_account_name"
                    value={data.account_owner_name}
                    required
                />

                <FormField
                    label="account branch name"
                    name="mbok_account_branch"
                    id="mbok_account_branch"
                    value={data.bank_branch_name}
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

export default MbokOption;
