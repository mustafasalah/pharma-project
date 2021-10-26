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
    },
    {
        id: 3,
        name: "Family Pharmacy",
        branch: "",
        phone_numbers: ["+249965474441", "+249184757990"],
        email: "family-pharmacy@gmail.com",
        website: "",
        state: "khartoum",
        city: "bhary",
        address: "Al moasasha",
        lat: 11.74784,
        long: 33.47944,
        created_at: "01-08-2021 02:33:42 PM",
        status: "rejected",
        owned_by: {
            id: 2,
            name: "Ali Osman",
        },
    },
];

export const getPharmacies = async () => {
    return await Promise.resolve({ data: pharmacies });
};

export const deletePharmacy = async (id) => {
    return await http.delete(
        `https://jsonplaceholder.typicode.com/posts/${id}`
    );
};

export const updatePharmacyStatus = async (id, status) => {
    return await Promise.resolve({ data: { status }, status: 200 });
    return await http.put(`https://jsonplaceholder.typicode.com/posts/${id}`, {
        status,
    });
};
