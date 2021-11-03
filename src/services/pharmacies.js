import store from "../state";
import http from "./http";

const pharmacies = [
    {
        id: 1,
        name: "CVS Pharmacy",
        branch: "Omdurman Branch",
        phone_numbers: ["+249965474730", "+249184757530"],
        email: "cvs-pharma@cvs-pharma.com",
        website: "http://www.cvs-pharma.com",
        state: "khartoum",
        city: "omdurman",
        address: "Alwadi Street, near alrowda hospital",
        lat: 12.434034,
        long: 42.439493,
        created_at: "24-09-2021 12:34:03 PM",
        status: "active",
        owned_by: {
            id: 1,
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
        branch: "Khartoum Branch",
        phone_numbers: ["+249965474722", "+249184757223"],
        email: "cvs-pharma@cvs-pharma.com",
        website: "http://www.cvs-pharma.com",
        state: "khartoum",
        city: "khartoum",
        address: "Al khartoum 2, near Ozone",
        lat: 11.74784,
        long: 33.47944,
        created_at: "03-08-2021 22:04:02 PM",
        status: "pending",
        owned_by: {
            id: 1,
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
        branch: "Bhary Branch",
        phone_numbers: ["+249965474441", "+249184757990"],
        email: "cvs-pharma@cvs-pharma.com",
        website: "http://www.cvs-pharma.com",
        state: "khartoum",
        city: "bhary",
        address: "Al moasasha",
        lat: 11.74784,
        long: 33.47944,
        created_at: "01-08-2021 02:33:42 PM",
        status: "rejected",
        owned_by: {
            id: 1,
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
    name,
    branch,
    phone_numbers,
    email,
    website,
    state,
    city,
    address,
    lat,
    long,
}) => {
    const editedPharmacyBranch = {
        name,
        branch,
        phone_numbers,
        email,
        website,
        state,
        city,
        address,
        lat: +lat,
        long: +long,
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

export const setPharmacyBranch = ({
    name,
    branch,
    phone_numbers,
    email,
    website,
    state,
    city,
    address,
    lat,
    long,
}) => {
    const newPharmacyBranch = {
        id: pharmacies.length + Math.round(Math.random() * 100),
        name,
        branch,
        phone_numbers,
        email,
        website,
        state,
        city,
        address,
        lat: +lat,
        long: +long,
        created_at: new Date().toJSON(),
        status: "pending",
        owned_by: {
            id: store.loggedUser.id.get(),
            name: store.loggedUser.name.get(),
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

export const getPharmacyBasicInfo = (ownerId) => {
    const { name, email, website } = pharmacies.find(
        (pharmacy) => pharmacy.owned_by.id === +ownerId
    );
    return Promise.resolve({
        data: { name, email, website },
        status: 200,
    });
};

export const getPharmacies = () => {
    return Promise.resolve({ data: pharmacies });
};

export const deletePharmacy = (id) => {
    return http.delete(`https://jsonplaceholder.typicode.com/posts/${id}`);
};

export const updatePharmacyStatus = async (id, status) => {
    return await Promise.resolve({ data: { status }, status: 200 });
    return await http.put(`https://jsonplaceholder.typicode.com/posts/${id}`, {
        status,
    });
};
