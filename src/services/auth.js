import http from "./http";
import { users } from "./users";

export const login = (username, password) => {
    const loggedUser = users.find((user) => user.username === username);

    if (!loggedUser) return Promise.resolve({ status: 403 });

    return Promise.resolve({
        data: loggedUser,
        status: 200,
    });
};

export const signup = async (userData) => {
    delete userData.password;
    delete userData.confirm_password;

    const newUser = {
        id: users.length + 1,
        ...userData,
        state: "",
        city: "",
        address: "",
        status: "non-active",
        joining_date: new Date()
            .toJSON()
            .slice(0, 10)
            .split("-")
            .reverse()
            .join("-"),
    };

    users.push(newUser);

    return Promise.resolve({ data: newUser, status: 200 });
};

export const verifyToken = (token) => {
    const validTokens = ["token1", "token2", "token3"];

    return Promise.resolve({
        status: validTokens.includes(token) ? 200 : 404,
    });
};

export const resetPassword = (token, newPassword) => {
    return Promise.resolve({
        status: 401,
    });
};

export const forgetPassword = (email) => {
    const forgettenUser = users.find((user) => user.email === email);

    if (!forgettenUser) return Promise.resolve({ state: 401 });
    return Promise.resolve({ status: 200 });
};

export const changePassword = (id, data) => {
    console.dir(data);
    return Promise.resolve({ data, status: 200 });
};
