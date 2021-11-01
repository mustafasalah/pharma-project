import http from "./http";

const productsStatistics = [
    {
        id: 1,
        name: "Diarrhoea. Relief - Loperamide Capsules",
        unit: "6 Capsules",
        photo: "/assets/images/5.jpg",
        cost: 1000,
        price: 1200,
        sold: 375,
        sales: 450000,
        profits: 75000,
        qty: 225,
    },
    {
        id: 2,
        name: "Ovex Family Pack Tablets",
        unit: "4x 100mg Tablets",
        photo: "/assets/images/3.jpg",
        cost: 1200,
        price: 1400,
        sold: 253,
        sales: 354000,
        profits: 50000,
        qty: 20,
    },
];

export const getProductsStatistics = () => {
    return Promise.resolve({ data: productsStatistics, status: 200 });
};

export const statisticOptions = [
    { label: "This Day", value: "day" },
    { label: "This Week", value: "week" },
    { label: "This month", value: "month" },
    { label: "This Year", value: "year" },
];

export const getOverviewStatistic = (type = "admin") => {
    if (type === "admin") {
        return Promise.resolve({
            data: {
                views: {
                    counter: 6122,
                    previous_counter: 7110,
                },
                orders: {
                    counter: 220,
                    previous_counter: 188,
                },
                pharmacies: {
                    counter: 102,
                },
                users: {
                    counter: 1365,
                },
            },
            status: 200,
        });
    } else {
        return Promise.resolve({
            data: {
                sales: {
                    counter: 24450,
                    previous_counter: 24199,
                },
                orders: {
                    counter: 220,
                    previous_counter: 188,
                },
                profits: {
                    counter: 4350,
                    previous_counter: 3967,
                },
                sold_products: {
                    counter: 1365,
                    previous_counter: 3808,
                },
            },
            status: 200,
        });
    }
};

export const getOrdersStatistic = (time = "week") => {
    let data = [];

    switch (time) {
        case "day":
            data = [700, 200, 140, 20];
            break;
        case "week":
            data = [5003, 1002, 670, 100];
            break;
        case "month":
            data = [11544, 2034, 804, 234];
            break;
        case "year":
            data = [55450, 2000, 233, 400];
            break;
    }

    return Promise.resolve({ data, status: 200 });
};

export const getOnlineOrdersStatistic = (time = "week") => {
    let data = [];

    switch (time) {
        case "day":
            data = [7200, 2030, 1403, 220];
            break;

        case "week":
            data = [55003, 11002, 6770, 1700];
            break;

        case "month":
            data = [33544, 22034, 7704, 1934];
            break;

        case "year":
            data = [355450, 92000, 22233, 4400];
            break;
    }

    return Promise.resolve({ data, status: 200 });
};

export const getViewsStatistic = (time = "week") => {
    let data = [];

    switch (time) {
        case "day":
            data = [
                5800, 70, 400, 604, 430, 200, 124, 111, 120, 500, 430, 540, 800,
                505, 782, 955,
            ];
            break;

        case "week":
            data = [2230, 6000, 5003, 9544, 4200, 8000, 6000];
            break;

        case "month":
            data = [2230, 6000, 5003, 9544, 4200, 8000, 6000];
            break;

        case "year":
            data = [
                40450, 33000, 40000, 50000, 60023, 33300, 49739, 69000, 51000,
                23003,
            ];
            break;
    }
    return Promise.resolve({ data, status: 200 });
};

export const getSalesStatistic = (time = "week") => {
    let data = [];

    switch (time) {
        case "day":
            data = [
                5800, 70, 400, 604, 430, 200, 124, 111, 120, 500, 430, 540, 800,
                505, 782, 955,
            ];
            break;

        case "week":
            data = [2230, 6000, 5003, 9544, 4200, 8000, 6000];
            break;

        case "month":
            data = [2230, 6000, 5003, 9544, 4200, 8000, 6000];
            break;

        case "year":
            data = [
                40450, 33000, 40000, 50000, 60023, 33300, 49739, 69000, 51000,
                23003,
            ];
            break;
    }

    return Promise.resolve({ data, status: 200 });
};

export const getOrdersLineStatistic = (time = "week") => {
    let data = [];

    switch (time) {
        case "day":
            data = [
                500, 40, 220, 504, 230, 100, 44, 11, 50, 300, 230, 440, 500,
                405, 482, 755,
            ];
            break;
        case "week":
            data = [1230, 3000, 2003, 4544, 1200, 4000, 700];
            break;

        case "month":
            data = [1230, 3000, 2003, 4544, 1200, 4000, 700];
            break;

        case "year":
            data = [
                30450, 23000, 33000, 42000, 55023, 27300, 46739, 63000, 44000,
                12003,
            ];
            break;
    }
    return Promise.resolve({ data, status: 200 });
};

export const getProfitsStatistic = (time = "week") => {
    let data = [];

    switch (time) {
        case "day":
            data = [
                500, 40, 220, 504, 230, 100, 44, 11, 50, 300, 230, 440, 500,
                405, 482, 755,
            ];
            break;
        case "week":
            data = [1230, 3000, 2003, 4544, 1200, 4000, 700];
            break;

        case "month":
            data = [1230, 3000, 2003, 4544, 1200, 4000, 700];
            break;

        case "year":
            data = [
                30450, 23000, 33000, 42000, 55023, 27300, 46739, 63000, 44000,
                12003,
            ];
            break;
    }
    return Promise.resolve({ data, status: 200 });
};
