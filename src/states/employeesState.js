import configs from "../configs";

const employeesState = {
    data: [],
    filters: {
        search: "",
        role: "",
        status: "",
    },
    pagination: { ...configs.pagination },
};

export default employeesState;
