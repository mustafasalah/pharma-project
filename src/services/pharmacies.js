import store from "../state";
import http from "./http";

export let pharmacies = [
    {
        id: 1,
        name: "CVS Pharmacy",
        pharmacy_id: 1,
        branch: "Omdurman Branch",
        phone_numbers: ["+249965474730", "+249184757530"],
        email: "cvs-pharma@cvs-pharma.com",
        website: "http://www.cvs-pharma.com",
        state: "khartoum",
        city: "omdurman",
        address: "Alwadi Street, near alrowda hospital",
        lat: 12.4034,
        lng: 42.4493,
        created_at: "24-09-2021 12:34:03 PM",
        status: "active",
        owned_by: {
            id: 2,
            name: "Mustafa Salah",
        },
        support_delivery: false,
        delivery_cost: 0,
        vat: 0,
        payment_options: {
            mbok: {
                account_no: "5678293",
                account_owner_name: "Mustafa Salah Mustafa",
                bank_branch_name: "sabren",
            },
            atm_card: {
                card_no: "",
                card_owner_name: "",
                bank_name: "",
            },
        },
    },
    {
        id: 2,
        name: "CVS Pharmacy",
        pharmacy_id: 1,
        branch: "Khartoum Branch",
        phone_numbers: ["+249965474722", "+249184757223"],
        email: "cvs-pharma@cvs-pharma.com",
        website: "http://www.cvs-pharma.com",
        state: "khartoum",
        city: "khartoum",
        address: "Al khartoum 2, near Ozone",
        lat: 11.7474,
        lng: 33.4794,
        created_at: "03-08-2021 22:04:02 PM",
        status: "pending",
        owned_by: {
            id: 2,
            name: "Mustafa Salah",
        },
        support_delivery: false,
        delivery_cost: 0,
        vat: 0,
        payment_options: {
            mbok: {
                account_no: "",
                account_owner_name: "",
                bank_branch_name: "",
            },
            atm_card: {
                card_no: "",
                card_owner_name: "",
                bank_name: "",
            },
        },
    },
    {
        id: 3,
        name: "CVS Pharmacy",
        pharmacy_id: 1,
        branch: "Bhary Branch",
        phone_numbers: ["+249965474441", "+249184757990"],
        email: "cvs-pharma@cvs-pharma.com",
        website: "http://www.cvs-pharma.com",
        state: "khartoum",
        city: "bhary",
        address: "Al moasasha",
        lat: 51.784,
        lng: 23.444,
        created_at: "01-08-2021 02:33:42 PM",
        status: "rejected",
        owned_by: {
            id: 2,
            name: "Mustafa Salah",
        },
        support_delivery: false,
        delivery_cost: 0,
        vat: 0,
        payment_options: {
            mbok: {
                account_no: "",
                account_owner_name: "",
                bank_branch_name: "",
            },
            atm_card: {
                card_no: "",
                card_owner_name: "",
                bank_name: "",
            },
        },
    },
];

export const updatePharmacyBranch = ({
    id,
    branch,
    phone_numbers,
    email,
    website,
    state,
    city,
    address,
    lat,
    lng,
}) => {
    const editedPharmacyBranch = {
        branch,
        phone_numbers,
        email,
        website,
        state,
        city,
        address,
        lat: +lat,
        lng: +lng,
        status: "pending",
    };
    let selectedPharmacy = pharmacies.find((pharmacy) => pharmacy.id === id);
    if (selectedPharmacy) {
        selectedPharmacy = Object.assign(
            selectedPharmacy,
            editedPharmacyBranch
        );
    }
    return Promise.resolve({ data: selectedPharmacy, status: 200 });
};

export const setPharmacy = (
    {
        name,
        branch,
        phone_numbers,
        email,
        website,
        state,
        city,
        address,
        lat,
        lng,
    },
    owner
) => {
    const newPharmacyBranch = {
        id: pharmacies.length + 1,
        name,
        pharmacy_id: pharmacies.length + Math.round(Math.random() * 100),
        branch,
        phone_numbers: [...phone_numbers],
        email,
        website,
        state,
        city,
        address,
        lat: +lat,
        lng: +lng,
        created_at: new Date().toJSON(),
        status: "pending",
        owned_by: {
            id: owner.id,
            name: owner.name,
        },
        support_delivery: false,
        delivery_cost: 0,
        vat: 0,
        payment_options: {
            mbok: {
                account_no: "",
                account_owner_name: "",
                bank_branch_name: "",
            },
            atm_card: {
                card_no: "",
                card_owner_name: "",
                bank_name: "",
            },
        },
    };

    pharmacies.push(newPharmacyBranch);

    return Promise.resolve({
        data: newPharmacyBranch,
        status: 200,
    });
};

export const setPharmacyBranch = ({
    pharmacy_id,
    name, // will not be send to http endpoint
    branch,
    phone_numbers,
    email,
    website,
    state,
    city,
    address,
    lat,
    lng,
}) => {
    const newPharmacyBranch = {
        id: pharmacies.length + Math.round(Math.random() * 100),
        name,
        pharmacy_id,
        branch,
        phone_numbers: [...phone_numbers],
        email,
        website,
        state,
        city,
        address,
        lat: +lat,
        lng: +lng,
        created_at: new Date().toJSON(),
        status: "pending",
        owned_by: {
            id: store.loggedUser.id.get(),
            name: `${store.loggedUser.first_name.get()} ${store.loggedUser.last_name.get()}`,
        },
        support_delivery: false,
        delivery_cost: 0,
        vat: 0,
        payment_options: {
            mbok: {
                account_no: "",
                account_owner_name: "",
                bank_branch_name: "",
            },
            atm_card: {
                card_no: "",
                card_owner_name: "",
                bank_name: "",
            },
        },
    };

    pharmacies.push(newPharmacyBranch);

    return Promise.resolve({
        data: newPharmacyBranch,
        status: 200,
    });
};

export const getPharmaciesByOwner = (ownerId) => {
    return Promise.resolve({
        data: pharmacies.filter((pharmacy) => pharmacy.owned_by.id === ownerId),
        status: 200,
    });
};

export const getPharmacyBranchByEmployee = (userId) => {
    // return Promise.reject({ status: 404 });

    return Promise.resolve({
        data: pharmacies[0],
        status: 200,
    });
};

export const getPharmacyBasicInfo = (ownerId) => {
    const pharmacy = pharmacies.find(
        (pharmacy) => pharmacy.owned_by.id === +ownerId
    );
    if (pharmacy === undefined) return Promise.reject({ status: 404 });

    const { pharmacy_id, name, email, website } = pharmacy;

    return Promise.resolve({
        data: { pharmacy_id, name, email, website },
        status: 200,
    });
};

export const getPharmacies = () => {
    return Promise.resolve({ data: pharmacies });
};

export const deletePharmacy = (id) => {
    pharmacies = pharmacies.filter((pharmacy) => pharmacy.id !== id);
    return Promise.resolve({ data: { id }, status: 200 });
};

export const updatePharmacyStatus = async (id, status) => {
    return await Promise.resolve({ data: { status }, status: 200 });
};
