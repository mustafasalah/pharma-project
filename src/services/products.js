import store from "../state";
import http from "./http";

const products = [
    {
        id: 1,
        name: "Diarrhoea. Relief - Loperamide Capsules",
        barcode: "1237980133840942",
        unit: "6 Capsules",
        category: "antibiotics",
        company: "Diarrhoea",
        photo: { url: "/assets/images/5.jpg", size: 123000 },
        ingredient: "loperamide hydrochloride",
        need_perspection: false,
        description: "",
        usage: "",
        warnings: "",
        side_effects: "",
    },
    {
        id: 2,
        name: "Ovex Family Pack Tablets",
        barcode: "867250056943759",
        unit: "4x 100mg Tablets",
        category: "antibiotics",
        company: "Ovex",
        photo: { url: "/assets/images/3.jpg", size: 86000 },
        ingredient: "mebendazole",
        need_perspection: false,
        description: `Ovex Family Pack Tablets are a treatment for threadworms.
It can be taken by children as young as two years old and quickly works to irradicate threadworms. It is recommended that the treatment should be taken by the entire family at the same time.
Ovex Family tablets are to be taken orally.`,
        usage: `Adults and children over 2 years: (excludes pregnant women)
1 tablet chewed or swallowed whole. Not to be given under 2 years.`,
        warnings:
            "Is not to be taken in pregnancy or by breastfeeding mothers.",
        side_effects:
            "Side effects are rare but should you experience any side effects report to your doctor or pharmacist.",
    },
    {
        id: 3,
        name: "ORS Rehydration Salts Lemon",
        barcode: "2783904982340234",
        unit: "12 Tablets",
        category: "antibiotics",
        company: "ORS",
        photo: { url: "/assets/images/2.jpg", size: 52000 },
        ingredient: "",
        need_perspection: false,
        description: "",
        usage: "",
        warnings: "",
        side_effects: "",
    },
    {
        id: 4,
        name: "Flarin Ibuprofen 200mg Capsules",
        barcode: "89348395759942",
        unit: "12 Soft Capsules",
        category: "antianxiety drugs",
        company: "Flarin",
        photo: {
            url: "/assets/images/1.jpg",
            size: 66000,
        },
        ingredient: "Ibuprofen",
        need_perspection: true,
        description: "",
        usage: "",
        warnings: "",
        side_effects: "",
    },
    {
        id: 5,
        name: "Anadin Extra Caplets",
        barcode: "78498475784922",
        unit: "6 Capsules",
        category: "antibacterials",
        company: "Anadin",
        photo: {
            url: "/assets/images/4.jpg",
            size: 83000,
        },
        ingredient: "Aspirin, Paracetamol",
        need_perspection: false,
        description: "",
        usage: "",
        warnings: "",
        side_effects: "",
    },
];

export const getProducts = async () => {
    return await Promise.resolve({ data: products, status: 200 });
};

export const deleteProduct = async (id) => {
    return await http.delete(
        `https://jsonplaceholder.typicode.com/posts/${id}`
    );
};

export const setProduct = async (data) => {
    const response = await Promise.resolve({
        data: {
            id: products.length + Math.round(Math.random() * 100),
            ...data,
        },
        status: 200,
    });
    products.push(response.data);
    return response;
    // return http.post("localhost", data);
};

export const updateProduct = (data) => {
    return Promise.resolve({ data, status: 200 });
    //return http.put(`localhost/${data.id}`, data);
};

export const uploadProductPhoto = (id) => {
    let image = "";
    store.uploads.productPhoto.set((p) => {
        image = p;
        return p;
    });

    if (image === "") return;

    const formData = new FormData();
    formData.append("product_id", id);
    formData.append("product_photo", image);

    return Promise.resolve({
        status: 200,
        data: { url: "/assets/images/6.jpg", size: 12334 },
    });
    //return http.put(`localhost/${id}`, formData);
};
