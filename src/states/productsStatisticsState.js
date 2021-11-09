import configs from "../configs";

const productsStatisticsState = {
    data: [],
    filters: {
        search: "",
    },
    pagination: { ...configs.pagination },
};

export default productsStatisticsState;
