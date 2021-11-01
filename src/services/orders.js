import http from "./http";

const orders = [
    {
        id: 23820,
        type: "local",
        status: "finished",
        handled_by: {
            id: 1,
            name: "Mustafa Salah",
        },
        date: "24-09-2021 12:34:03 PM",
        payment: {
            method: "cash",
            proof: "",
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
        status: "pending",
        handled_by: {
            id: 2,
            name: "Ali Osman",
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
    return Promise.resolve({ data: orders, status: 200 });
};

export const setOrder = (data) => {
    const newOrder = {
        id: orders.length + Math.round(Math.random() * 100),
        payment: {
            method: "cash",
            proof: "",
        },
        delivery: 0,
        ...data,
    };

    orders.push(newOrder);

    return Promise.resolve({
        data: newOrder,
        status: 200,
    });
};

export const updateOrderStatus = async (id, status) => {
    return await Promise.resolve({ data: { status }, status: 200 });
    // return await http.put(`https://jsonplaceholder.typicode.com/posts/${id}`, {
    //     status,
    // });
};
