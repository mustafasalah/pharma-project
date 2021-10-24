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
        },
    });
};
