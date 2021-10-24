import http from "./http";

const orders = [
    {
        id: 23820,
        type: "local",
        price: 5400,
        status: "finished",
        handled_by: {
            id: 1,
            name: "Mustafa Salah",
        },
        date: "24-09-2021 12:34:03 PM",
        payment: {
            method: "cash",
            proof: "/assets/images/pay.jpg",
        },
        products: [
            {
                name: "Diarrhoea. Relief - Loperamide Capsules",
                qty: 1,
                price: 1200,
            },
            {
                name: "Ovex Family Pack Tablets",
                qty: 2,
                price: 1400,
            },
        ],
        products_amount: 5400,
        discount: 0,
        vat: 0,
        delivery: 0,
    },
    {
        id: 12038,
        type: "online",
        price: 5400,
        status: "pending",
        handled_by: {
            id: 1,
            name: "Mustafa Salah",
        },
        date: "24-09-2021 12:34:03 PM",
        payment: {
            method: "MBOK",
            proof: "/assets/images/pay.jpg",
        },
        products: [
            {
                name: "ORS Rehydration Salts Lemon",
                qty: 3,
                price: 450,
            },
        ],
        products_amount: 1350,
        discount: 0,
        vat: 0,
        delivery: 2000,
    },
];

export const getOrders = () => {
    return orders;
};

export const updateOrderStatus = async (id, status) => {
    return await http.put(`https://jsonplaceholder.typicode.com/posts/${id}`, {
        status,
    });
};
