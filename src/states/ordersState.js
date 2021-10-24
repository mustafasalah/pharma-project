import configs from "../configs";

const ordersState = {
    data: [],
    filters: {
        search: "",
        type: "",
        status: "",
    },
    pagination: configs.pagination,
};

export default ordersState;
