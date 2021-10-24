import http from "./http";

export const getProductsStatistics = () => {
    return [
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
};

export const statisticOptions = [
    { label: "This Day", value: "day" },
    { label: "This Week", value: "week" },
    { label: "This month", value: "month" },
    { label: "This Year", value: "year" },
];

export const getOrdersStatistic = (time = "week") => {
    switch (time) {
        case "day":
            return [700, 200, 140, 20];

        case "week":
            return [5003, 1002, 670, 100];

        case "month":
            return [11544, 2034, 804, 234];

        case "year":
            return [55450, 2000, 233, 400];
    }
};

export const getSalesStatistic = (time = "week") => {
    switch (time) {
        case "day":
            return [
                5800, 70, 400, 604, 430, 200, 124, 111, 120, 500, 430, 540, 800,
                505, 782, 955,
            ];

        case "week":
            return [2230, 6000, 5003, 9544, 4200, 8000, 6000];

        case "month":
            return [2230, 6000, 5003, 9544, 4200, 8000, 6000];

        case "year":
            return [
                40450, 33000, 40000, 50000, 60023, 33300, 49739, 69000, 51000,
                23003,
            ];
    }
};

export const getProfitsStatistic = (time = "week") => {
    switch (time) {
        case "day":
            return [
                500, 40, 220, 504, 230, 100, 44, 11, 50, 300, 230, 440, 500,
                405, 482, 755,
            ];
        case "week":
            return [1230, 3000, 2003, 4544, 1200, 4000, 700];

        case "month":
            return [1230, 3000, 2003, 4544, 1200, 4000, 700];

        case "year":
            return [
                30450, 23000, 33000, 42000, 55023, 27300, 46739, 63000, 44000,
                12003,
            ];
    }
};
