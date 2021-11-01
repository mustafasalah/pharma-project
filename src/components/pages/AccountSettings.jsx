import { useHookstate } from "@hookstate/core";
import React from "react";
import store from "../../state";
import Section from "../common/Section";
import SectionHeader from "../common/SectionHeader";
import PasswordChangeForm from "../forms/PasswordChangeForm";
import PersonalInformationForm from "../forms/PersonalInformationForm";

const AccountSettings = () => {
    const { loggedUser } = useHookstate(store);
    return (
        <>
            <SectionHeader name="Account Settings" faClass="fas fa-user-cog" />
            <div className="grid grid-cols-3 gap-5 items-start">
                <Section
                    label="Personal Information"
                    className="col-span-2"
                    contentClassName="p-5 gray-inputs"
                >
                    <PersonalInformationForm data={loggedUser} />
                </Section>

                <aside>
                    <Section
                        label="Change your password"
                        contentClassName="p-5 gray-inputs"
                    >
                        <PasswordChangeForm />
                    </Section>
                </aside>
            </div>
        </>
    );
};

export default AccountSettings;
