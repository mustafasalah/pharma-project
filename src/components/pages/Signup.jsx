import { useState } from "@hookstate/core";
import React, { useCallback, useEffect, useRef } from "react";
import { signup } from "../../services/auth";
import { setPharmacy } from "../../services/pharmacies";
import { notify } from "../../utility";
import AuthSectionHeader from "../common/AuthSectionHeader";
import SignupChoice from "../common/SignupChoice";
import SuccessPage from "../common/SuccessPage";
import PharmacyRegisterationForm from "../forms/PharmacyRegisterationForm";
import SignupForm from "../forms/SignupForm";
import StepsProgress from "../StepsProgress";

const Signup = () => {
    const signupProgress = useState({
        type: "",
        step: 1,
    });

    const signupForm = useState({
        first_name: "",
        last_name: "",
        username: "",
        password: "",
        confirm_password: "",
        email: "",
        phone_number: "",
        gender: "",
    });

    const pharmacyRegisterationForm = useState({
        name: "",
        branch: "",
        phone_numbers: ["", ""],
        email: "",
        website: "",
        state: "khartoum",
        city: "",
        address: "",
        lat: 15.4838,
        lng: 32.5339,
    });

    let createdUser = useRef();

    const renderStep = useCallback(() => {
        const { type, step } = signupProgress;
        if (type.get() === "" && step.get() > 1) step.set(1);

        switch (step.value) {
            case 1:
                return (
                    <div className="flex justify-center gap-x-10 mb-10">
                        <SignupChoice
                            label="Customer"
                            icon="fas fa-hospital-user"
                            title="Sign up as normal user"
                            onSelect={() => {
                                type.set("user");
                                step.set(2);
                            }}
                        />
                        <SignupChoice
                            label="Pharmacy Owner"
                            icon="fas fa-clinic-medical"
                            title="Sign up as pharmacy owner"
                            onSelect={() => {
                                type.set("pharmacy owner");
                                step.set(2);
                            }}
                        />
                    </div>
                );

            case 2:
                return (
                    <SignupForm
                        formState={signupForm}
                        haveNextBtn={type.value === "pharmacy owner"}
                        onSubmit={async () => {
                            const { data, status } = await signup({
                                role: type.value,
                                ...signupForm.get(),
                            });

                            notify({
                                status,
                                successMsg:
                                    type.value === "pharmacy owner"
                                        ? "Your account has been created successfully!"
                                        : "",
                                successCallback() {
                                    if (type.value === "pharmacy owner") {
                                        createdUser.current = {
                                            id: data.id,
                                            name: `${data.first_name} ${data.last_name}`,
                                        };
                                        step.set(3);
                                    } else {
                                        step.set(4);
                                    }
                                },
                            });
                        }}
                    />
                );

            case 3:
                return (
                    <PharmacyRegisterationForm
                        formState={pharmacyRegisterationForm}
                        onSubmit={async () => {
                            const { data, status } = await setPharmacy(
                                pharmacyRegisterationForm.get(),
                                createdUser.current
                            );

                            notify({
                                status,
                                successCallback() {
                                    step.set(4);
                                },
                            });
                        }}
                    />
                );

            case 4:
                return (
                    <SuccessPage
                        title="Your are Signed up Successfully!"
                        redirect={{ link: "/login", pageName: "Login Page" }}
                    >
                        You will be receiving an activation link into your email
                        to activate your account.
                    </SuccessPage>
                );
        }
    }, [signupProgress.value]);

    return (
        <div className="mt-10 max-w-xl mx-auto">
            {signupProgress.step.value !== 4 && (
                <AuthSectionHeader name="Signup" />
            )}
            {signupProgress.type.value !== "" &&
                signupProgress.step.value > 1 && (
                    <StepsProgress
                        steps={
                            signupProgress.type.value === "user"
                                ? [
                                      "select account type",
                                      "fill account info",
                                      "sign up done!",
                                  ]
                                : [
                                      "select account type",
                                      "fill account info",
                                      "fill pharmacy info",
                                      "sign up done!",
                                  ]
                        }
                        currentStep={signupProgress.step}
                    />
                )}
            {renderStep()}
        </div>
    );
};

export default Signup;
