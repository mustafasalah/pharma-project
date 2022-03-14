import http from "./http";

let notifications = [
    {
        id: 1,
        type: "order",
        data: {
            id: 1,
            user: "Mustafa Salah",
        },
    },
    {
        id: 2,
        type: "new_pharmacy",
        data: {
            id: 3,
            name: "CVS Pharmacy",
            owner: "Mustafa Salah",
        },
    },
    {
        id: 3,
        type: "new_branch",
        data: {
            id: 3,
            name: "CVS Pharmacy",
            branch: "Bhary Branch",
            owner: "Mustafa Salah",
        },
    },
    {
        id: 4,
        type: "out_of_stock",
        data: {
            id: 4,
            name: "Flarin Ibuprofen 200mg Capsules",
        },
    },
    {
        id: 5,
        type: "expire_soon",
        data: {
            id: 2,
            name: "Ovex Family Pack Tablets",
            duration: 10, // days
        },
    },
    {
        id: 6,
        type: "expired",
        data: {
            id: 3,
            name: "ORS Rehydration Salts Lemon",
        },
    },
];

export const getPharmaciesNotifications = async () => {
    //return await http.get(`/notifications/pharmacies`);
    return Promise.resolve({
        data: notifications.filter(
            (notification) =>
                notification.type === "new_pharmacy" ||
                notification.type === "new_branch"
        ),
    });
};

export const getNotifications = async () => {
    // const orderNotifications = await http.get(`/notifications/orders`);
    // const inventoryNotification = await http.get(`/notifications/inventory`);
    // const notifications = [
    //     ...orderNotifications.data,
    //     ...inventoryNotification.data,
    // ];
    // return Promise.resolve({
    //     data: notifications,
    // });

    return Promise.resolve({
        data: notifications.filter(
            (notification) =>
                notification.type !== "new_pharmacy" &&
                notification.type !== "new_branch"
        ),
    });
};

export const deleteNotification = async (type, id) => {
    // const response = await http.delete(`/notifications/${type}/${id}`);
    // if (response.status === 200) {
    //     notifications = notifications.filter(
    //         (notification) => notification.id !== id
    //     );
    // }
    // return response;
    notifications = notifications.filter(
        (notification) => notification.id !== id
    );

    return Promise.resolve({
        status: 200,
    });
};
