import http from "./http";

const employees = [
    {
        id: 1,
        full_name: "Mustafa Salah",
        username: "mustafa_salah",
        phone_number: "+249965474730",
        gender: "m",
        role: "pharmacy owner",
        work_from: "",
        work_to: "",
        last_seen: "4 hours ago",
        joining_date: "12-10-2019",
    },
    {
        id: 2,
        full_name: "Ali Osman Adel",
        username: "ali_osman",
        phone_number: "+249125474650",
        gender: "m",
        role: "pharmacist",
        work_from: "15:00",
        work_to: "21:00",
        last_seen: "online",
        joining_date: "10-02-2020",
    },
    {
        id: 3,
        full_name: "Sarah Mohamed",
        username: "sarah99",
        phone_number: "+249121297730",
        gender: "f",
        role: "pharmacist",
        work_from: "07:00",
        work_to: "15:00",
        last_seen: "18 hours ago",
        joining_date: "22-05-2020",
    },
];

export const getEmployees = () => {
    return employees;
};

export const deleteEmployee = async (id) => {
    return await http.delete(
        `https://jsonplaceholder.typicode.com/posts/${id}`
    );
};

export const setEmployee = async ({
    full_name,
    username,
    phone_number,
    gender,
    role,
    work_from,
    work_to,
}) => {
    const data = {
        pharmacyBranchId: 1,
        full_name,
        username,
        phone_number,
        gender,
        role,
        work_from,
        work_to,
    };

    return await http.post("https://jsonplaceholder.typicode.com/posts", data);
};

export const updateEmployee = async ({
    id,
    full_name,
    username,
    phone_number,
    gender,
    role,
    work_from,
    work_to,
}) => {
    const data = {
        full_name,
        username,
        phone_number,
        gender,
        role,
        work_from,
        work_to,
    };

    return await http.put(
        `https://jsonplaceholder.typicode.com/posts/${id}`,
        data
    );
};
