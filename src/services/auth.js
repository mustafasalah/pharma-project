import http from "./http";

export const login = async (username, password) => {
    return await Promise.resolve({
        data: {
            id: 1,
            username: "mustafa_salah",
            email: "mustafasalah99@gmail.com",
            first_name: "Mustafa",
            last_name: "Salah",
            gender: "m",
            role: "pharmacy owner",
            state: "khartoum",
            city: "omdurman",
            address: "Al thwrah, al harah 59, al shingety street",
        },
        status: 200,
    });
};

export const changePassword = (id, data) => {
    console.dir(data);
    return Promise.resolve({ data, status: 200 });
};
