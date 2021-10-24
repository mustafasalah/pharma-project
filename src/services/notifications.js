import http from "./http";

export const getNotifications = async () => {
    return await Promise.resolve({
        data: [
            {
                id: 1,
                type: "new_order",
                content: "New Order #1 From Mustafa Salah!",
            },
            {
                id: 2,
                type: "new_pharmacy",
                content: "New Pharmacy joining the pharma platform",
            },
        ],
    });
};
