import http from "./http";

let employees = [
    {
        id: 1,
        full_name: "Mustafa Salah",
        username: "mustafa_salah",
        phone_number: "+249965474730",
        gender: "m",
        status: "approve",
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
        status: "approve",
        role: "supervisor",
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
        status: "approve",
        role: "pharmacist",
        work_from: "07:00",
        work_to: "15:00",
        last_seen: "18 hours ago",
        joining_date: "22-05-2020",
    },
];

export const getEmployees = (pharmacy_branch_id) => {
    return Promise.resolve({ data: employees, status: 200 });
};

export const deleteEmployee = async (id) => {
    employees = employees.filter((emp) => emp.id !== id);
    return Promise.resolve({ data: { id }, status: 200 });
};

export const setEmployee = ({
    full_name, // will not be send
    username, // will not be send
    phone_number, // will not be send
    gender, // will not be send
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

    const newEmployee = {
        id: employees.length + Math.round(Math.random() * 100),
        joining_date: new Date()
            .toJSON()
            .slice(0, 10)
            .split("-")
            .reverse()
            .join("-"),
        last_seen: "",
        status: "pending",
        ...data,
    };

    employees.push(newEmployee);

    return Promise.resolve({
        data: newEmployee,
        status: 200,
    });
};

export const updateEmployee = ({
    id,
    full_name, // will not be send
    username, // will not be send
    phone_number, // will not be send
    gender, // will not be send
    last_seen, // will not be send
    joining_date, // will not be send
    role,
    work_from,
    work_to,
}) => {
    const data = {
        id,
        full_name,
        username,
        phone_number,
        gender,
        role,
        work_from,
        work_to,
        joining_date,
        last_seen,
    };

    return Promise.resolve({ data: data, status: 200 });
};
