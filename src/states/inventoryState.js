import { getInventoryItems } from "../services/inventoryItems";
import configs from "../configs";

const inventoryState = {
    data: getInventoryItems(),
    filters: {
        search: "",
        category: "",
        status: "",
    },
    pagination: configs.pagination,
};

export default inventoryState;
