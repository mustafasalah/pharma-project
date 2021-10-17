import http from "./http";

const inventoryItems = [
    {
        id: 1,
        name: "Diarrhoea. Relief - Loperamide Capsules",
        barcode: "1237980133840942",
        unit: "6 Capsules",
        category: "antibiotics",
        company: "Diarrhoea",
        photo: "/assets/images/5.jpg",
        cost: 1000,
        price: 1200,
        supplier: "AbdAlaziz Medical",
        stock: 255,
        reserved: 3,
        arrival_date: "2021-09-12",
        expair_date: "2021-12-12",
        online_order: true,
    },
    {
        id: 2,
        name: "Ovex Family Pack Tablets",
        barcode: "1237d3434340942",
        unit: "4x 100mg Tablets",
        category: "antibiotics",
        company: "Ovex",
        photo: "/assets/images/3.jpg",
        cost: 1200,
        price: 1400,
        supplier: "Abo Alra",
        stock: 95,
        reserved: 1,
        arrival_date: "2021-12-22",
        expair_date: "2022-05-22",
        online_order: true,
    },
    {
        id: 3,
        name: "ORS Rehydration Salts Lemon",
        barcode: "2783904982340234",
        unit: "12 Tablets",
        category: "antibiotics",
        company: "ORS",
        photo: "/assets/images/2.jpg",
        cost: 300,
        price: 450,
        supplier: "Abo Alra",
        stock: 34,
        reserved: 0,
        arrival_date: "2021-11-12",
        expair_date: "2022-04-12",
        online_order: true,
    },
    {
        id: 4,
        name: "Flarin Ibuprofen 200mg Capsules",
        barcode: "89348395759942",
        unit: "12 Soft Capsules",
        category: "antianxiety drugs",
        company: "Flarin",
        photo: "/assets/images/1.jpg",
        cost: 1000,
        price: 1150,
        supplier: "AbdAlaziz Medical",
        stock: 0,
        reserved: 0,
        arrival_date: "2021-09-02",
        expair_date: "2021-12-02",
        online_order: false,
    },
    {
        id: 5,
        name: "Anadin Extra Caplets",
        barcode: "78498475784922",
        unit: "6 Capsules",
        category: "antibacterials",
        company: "Anadin",
        photo: "/assets/images/4.jpg",
        cost: 600,
        price: 800,
        supplier: "Pharma Medical",
        stock: 200,
        reserved: 0,
        arrival_date: "2021-06-29",
        expair_date: "2021-12-29",
        online_order: true,
    },
    {
        id: 6,
        name: "Diarrhoea. Relief - Loperamide Capsules",
        barcode: "1237980133840942",
        unit: "6 Capsules",
        category: "antibiotics",
        company: "Diarrhoea",
        photo: "/assets/images/5.jpg",
        cost: 1000,
        price: 1200,
        supplier: "AbdAlaziz Medical",
        stock: 255,
        reserved: 3,
        arrival_date: "2021-09-12",
        expair_date: "2021-12-12",
        online_order: true,
    },
    {
        id: 7,
        name: "Ovex Family Pack Tablets",
        barcode: "1237d3434340942",
        unit: "4x 100mg Tablets",
        category: "antibiotics",
        company: "Ovex",
        photo: "/assets/images/3.jpg",
        cost: 1200,
        price: 1400,
        supplier: "Abo Alra",
        stock: 95,
        reserved: 1,
        arrival_date: "2021-12-22",
        expair_date: "2022-05-22",
        online_order: true,
    },
    {
        id: 8,
        name: "ORS Rehydration Salts Lemon",
        barcode: "2783904982340234",
        unit: "12 Tablets",
        category: "antibiotics",
        company: "ORS",
        photo: "/assets/images/2.jpg",
        cost: 300,
        price: 450,
        supplier: "Abo Alra",
        stock: 34,
        reserved: 0,
        arrival_date: "2021-11-12",
        expair_date: "2022-04-12",
        online_order: true,
    },
    {
        id: 9,
        name: "Flarin Ibuprofen 200mg Capsules",
        barcode: "89348395759942",
        unit: "12 Soft Capsules",
        category: "antianxiety drugs",
        company: "Flarin",
        photo: "/assets/images/1.jpg",
        cost: 1000,
        price: 1150,
        supplier: "AbdAlaziz Medical",
        stock: 0,
        reserved: 0,
        arrival_date: "2021-09-02",
        expair_date: "2021-12-02",
        online_order: false,
    },
    {
        id: 10,
        name: "Anadin Extra Caplets",
        barcode: "78498475784922",
        unit: "6 Capsules",
        category: "antibacterials",
        company: "Anadin",
        photo: "/assets/images/4.jpg",
        cost: 600,
        price: 800,
        supplier: "Pharma Medical",
        stock: 200,
        reserved: 0,
        arrival_date: "2021-06-29",
        expair_date: "2021-12-29",
        online_order: true,
    },
    {
        id: 11,
        name: "Diarrhoea. Relief - Loperamide Capsules",
        barcode: "1237980133840942",
        unit: "6 Capsules",
        category: "antibiotics",
        company: "Diarrhoea",
        photo: "/assets/images/5.jpg",
        cost: 1000,
        price: 1200,
        supplier: "AbdAlaziz Medical",
        stock: 255,
        reserved: 3,
        arrival_date: "2021-09-12",
        expair_date: "2021-12-12",
        online_order: true,
    },
    {
        id: 12,
        name: "Ovex Family Pack Tablets",
        barcode: "582st32",
        unit: "4x 100mg Tablets",
        category: "antibiotics",
        company: "Ovex",
        photo: "/assets/images/3.jpg",
        cost: 1200,
        price: 1400,
        supplier: "Abo Alra",
        stock: 95,
        reserved: 1,
        arrival_date: "2021-12-22",
        expair_date: "2022-05-22",
        online_order: true,
    },
    {
        id: 13,
        name: "ORS Rehydration Salts Lemon",
        barcode: "2783904982340234",
        unit: "12 Tablets",
        category: "antibiotics",
        company: "ORS",
        photo: "/assets/images/2.jpg",
        cost: 300,
        price: 450,
        supplier: "Abo Alra",
        stock: 34,
        reserved: 0,
        arrival_date: "2021-11-12",
        expair_date: "2022-04-12",
        online_order: true,
    },
    {
        id: 14,
        name: "Flarin Ibuprofen 200mg Capsules",
        barcode: "89348395759942",
        unit: "12 Soft Capsules",
        category: "antianxiety drugs",
        company: "Flarin",
        photo: "/assets/images/1.jpg",
        cost: 1000,
        price: 1150,
        supplier: "AbdAlaziz Medical",
        stock: 0,
        reserved: 0,
        arrival_date: "2021-09-02",
        expair_date: "2021-12-02",
        online_order: false,
    },
    {
        id: 15,
        name: "Anadin Extra Caplets",
        barcode: "78498475784922",
        unit: "6 Capsules",
        category: "antibacterials",
        company: "Anadin",
        photo: "/assets/images/4.jpg",
        cost: 600,
        price: 800,
        supplier: "Pharma Medical",
        stock: 200,
        reserved: 0,
        arrival_date: "2021-06-29",
        expair_date: "2021-12-29",
        online_order: true,
    },
];

export const deleteInventoryItem = async (id) => {
    return await http.delete(
        `https://jsonplaceholder.typicode.com/posts/${id}`
    );
};

export const setInventoryItem = async ({
    productId,
    cost,
    price,
    arrival_date,
    expair_date,
    online_order,
    stock,
    reserved,
    supplier,
}) => {
    const data = {
        pharmacyBranchId: 1,
        productId,
        cost,
        price,
        arrival_date,
        expair_date,
        online_order,
        stock,
        reserved,
        supplier,
    };

    return await http.post("https://jsonplaceholder.typicode.com/posts", data);
};

export const getInventoryItems = () => {
    return inventoryItems;
};
