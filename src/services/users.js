import http from "./http";

export let users = [
    {
        id: 1,
        first_name: "Mustafa",
        last_name: "Salah",
        username: "mustafa",
        password: "123456",
        email: "mustafasalah99@gmail.com",
        role: "admin",
        gender: "m",
        phone_number: "+249965474730",
        state: "khartoum",
        city: "omdurman",
        address: "althwra, alhara 59",
        status: "active",
        last_seen: "online",
        joining_date: "12-10-2019",
    },
    {
        id: 2,
        username: "mustafasalah",
        password: "123456",
        email: "mustafasalah99@gmail.com",
        first_name: "Mustafa",
        last_name: "Salah",
        gender: "m",
        phone_number: "+249121297015",
        role: "pharmacy owner",
        state: "khartoum",
        city: "omdurman",
        address: "Al thwrah, al harah 59, al shingety street",
        status: "active",
        last_seen: "5 hours ago",
        joining_date: "27-02-2020",
    },
    {
        id: 3,
        first_name: "Ali",
        last_name: "Osman",
        username: "ali",
        password: "123456",
        email: "aliosman99@gmail.com",
        role: "pharmacy owner",
        gender: "m",
        phone_number: "+249965479987",
        state: "khartoum",
        city: "khartoum",
        address: "alriyad, almshtal street",
        status: "active",
        last_seen: "2 hours ago",
        joining_date: "22-12-2019",
    },
    {
        id: 4,
        first_name: "Mona",
        last_name: "Hassan",
        username: "mona",
        password: "123456",
        email: "mona_hassssan@hotmail.com",
        role: "pharmacist",
        gender: "f",
        phone_number: "",
        state: "khartoum",
        city: "",
        address: "",
        status: "active",
        last_seen: "1 day ago",
        joining_date: "01-01-2021",
    },
    {
        id: 5,
        first_name: "Ahmed",
        last_name: "Mohamed",
        username: "ahmed",
        password: "123456",
        email: "ahmed_mohamed@hotmail.com",
        role: "user",
        gender: "f",
        phone_number: "+249965949423",
        state: "khartoum",
        city: "",
        address: "",
        status: "active",
        last_seen: "1 day ago",
        joining_date: "02-02-2021",
    },
    {
        id: 6,
        first_name: "Hassan",
        last_name: "Salah",
        username: "hassan",
        password: "123456",
        email: "hassssan1993@gmail.com",
        role: "supervisor",
        gender: "m",
        phone_number: "+24990483829",
        state: "khartoum",
        city: "",
        address: "",
        status: "active",
        last_seen: "2 hours ago",
        joining_date: "24-04-2021",
    },
];

export const getUserByUsername = (username) => {
    const result = users.find((user) => user.username === username);
    return Promise.resolve({ data: result, status: 200 });
};

export const getUsersByRole = (role) => {
    const avaiableUsers = users.filter((user) => user.role === role);
    return Promise.resolve({ data: avaiableUsers, status: 200 });
};

export const getUsers = async () => {
    return await Promise.resolve({ data: users, status: 200 });
};

export const deleteUser = (id) => {
    users = users.filter((user) => user.id !== id);
    return Promise.resolve({ data: { id }, status: 200 });
};

export const setUser = async ({
    first_name,
    last_name,
    username,
    password,
    email,
    role,
    gender,
    phone_number,
    status,
    state,
    city,
    address,
}) => {
    const data = {
        first_name,
        last_name,
        username,
        email,
        role,
        gender,
        phone_number,
        status,
        state,
        city,
        address,
    };

    const newUser = {
        id: users.length + Math.round(Math.random() * 100),
        joining_date: new Date()
            .toJSON()
            .slice(0, 10)
            .split("-")
            .reverse()
            .join("-"),
        last_seen: "",
        ...data,
    };

    users.push(newUser);

    return await Promise.resolve({ data: newUser, status: 200 });
    // return await http.post("https://jsonplaceholder.typicode.com/posts", data);
};

export const updateUser = async ({
    id,
    first_name,
    last_name,
    username,
    email,
    role,
    gender,
    phone_number,
    status,
    state,
    city,
    address,
}) => {
    const data = {
        first_name,
        last_name,
        username,
        email,
        role,
        gender,
        phone_number,
        status,
        state,
        city,
        address,
    };

    return await Promise.resolve({ status: 200 });
    // return await http.put(
    //     `https://jsonplaceholder.typicode.com/posts/${id}`,
    //     data
    // );
};
