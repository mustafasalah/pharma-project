import configs from "../configs";

const usersState = {
    data: [],
    filters: {
        search: "",
        role: "",
        status: "",
    },
    pagination: configs.pagination,
};

export default usersState;
