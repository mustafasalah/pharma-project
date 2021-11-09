import configs from "../configs";

const productsState = {
    data: [],
    filters: {
        search: "",
        category: "",
        company: "",
    },
    pagination: { ...configs.pagination },
};

export default productsState;
