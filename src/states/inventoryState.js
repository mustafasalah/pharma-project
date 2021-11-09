import configs from "../configs";

const inventoryState = {
    data: [],
    filters: {
        search: "",
        category: "",
        status: "",
    },
    pagination: { ...configs.pagination },
};

export default inventoryState;
