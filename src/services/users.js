import http from "./http";

const users = [
    {
        id: 1,
        first_name: "Mustafa",
        last_name: "Salah",
        username: "mustafa_salah",
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
        first_name: "Ali",
        last_name: "Osman",
        username: "ali_osman",
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
        id: 3,
        first_name: "Mona",
        last_name: "Hassan",
        username: "monnna",
        email: "mona_hassssan@hotmail.com",
        role: "user",
        gender: "f",
        phone_number: "",
        state: "",
        city: "",
        address: "",
        status: "non-active",
        last_seen: "1 day ago",
        joining_date: "24-10-2021",
    },
];

export const getUsers = async () => {
    return await Promise.resolve({ data: users, status: 200 });
};

export const deleteUser = async (id) => {
    return await http.delete(
        `https://jsonplaceholder.typicode.com/posts/${id}`
    );
};

export const setUser = async ({
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

    const newUser = {
        id: users.length + Math.round(Math.random() * 100),
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
