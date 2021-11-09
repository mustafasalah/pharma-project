import { useState } from "@hookstate/core";
import React, { useEffect } from "react";
import { getPharmaciesByOwner } from "../../services/pharmacies";
import store from "../../state";
import SectionHeader from "../common/SectionHeader";
import PharmacyPopupForm from "../forms/PharmacyPopupForm";
import Loading from "../Loading";

const MyPharmacies = ({ history }) => {
    const pharmacyBranches = useState(store.pharmacyBranches);
    const pharmacyBranch = useState(store.pharmacyBranch);
    const loading = useState(true);
    const displayPopupForm = useState(false);
    const pharmacyBranchFormState = useState(undefined);

    // Reset selected pharmacy branch to nothing
    pharmacyBranch.id.ornull && pharmacyBranch.set({});

    const handlePharmacySelection = (selectedPharmacyBranch) => {
        switch (selectedPharmacyBranch.status) {
            case "active":
                pharmacyBranch.set(
                    JSON.parse(JSON.stringify(selectedPharmacyBranch))
                );
                history.push("/");
                break;

            case "rejected":
            case "pending":
                pharmacyBranchFormState.set(
                    JSON.parse(JSON.stringify(selectedPharmacyBranch))
                );
                displayPopupForm.set(true);
                break;
        }
    };

    useEffect(() => {
        (async () => {
            const { data: pharmaciesData } = await getPharmaciesByOwner(
                store.loggedUser.id.get()
            );
            pharmacyBranches.set(pharmaciesData);
            loading.set(false);
        })();
    }, []);

    return loading.value ? (
        <Loading />
    ) : (
        <>
            <SectionHeader
                name="Your Pharmacies"
                faClass="fas fa-clinic-medical"
            />
            <div className="grid grid-cols-4 gap-8">
                {pharmacyBranches.map((pharmacyBranch, i) => (
                    <PharmacyCard
                        key={pharmacyBranch.id.get()}
                        data={pharmacyBranch.get()}
                        onClick={() =>
                            handlePharmacySelection(pharmacyBranch.get())
                        }
                    />
                ))}
                <AddPharmacyBranchCard
                    onClick={() => {
                        pharmacyBranchFormState.set(undefined);
                        displayPopupForm.set(true);
                    }}
                />
            </div>
            <PharmacyPopupForm
                showState={displayPopupForm}
                formState={pharmacyBranchFormState.get()}
            />
        </>
    );
};

const AddPharmacyBranchCard = ({ onClick }) => {
    return (
        <button
            onClick={onClick}
            title="Add New Pharmacy Branch"
            className="flex flex-col group py-12 hover:border-gray-400 border-2 border-dashed items-center rounded border-gray-300"
        >
            <i className="fas fa-plus text-6xl mb-8 group-hover:text-primary text-gray-300"></i>
            <strong className="font-semibold text-gray-500 group-hover:text-black">
                Add New Pharmacy Branch
            </strong>
        </button>
    );
};

const PharmacyCard = ({ data: { status, name, branch }, onClick }) => {
    const statusColor =
        status === "pending"
            ? "gray-400"
            : status === "rejected"
            ? "red"
            : "primary";

    return (
        <button
            onClick={onClick}
            className={`animate__animated animate__flipInY flex flex-col py-12 hover:bg-${statusColor} justify-center group items-center relative bg-white shadow-md rounded`}
        >
            <span
                className={`absolute top-0 right-0 group-hover:bg-white group-hover:text-${statusColor} text-xs text-white px-2.5 py-2 rounded-tr shadow-md font-semibold bg-${statusColor}`}
            >
                {status}
            </span>
            <i
                className={`fas fa-clinic-medical text-6xl mb-4 group-hover:text-white text-${statusColor}`}
            ></i>
            <strong className="font-semibold text-lg">{name}</strong>
            <span className="text-sm text-gray-500 group-hover:text-white">
                {branch}
            </span>
        </button>
    );
};

export default MyPharmacies;
