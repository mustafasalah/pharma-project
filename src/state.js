import { createState, DevTools } from "@hookstate/core";
import { getInventoryItems } from "./services/getInventoryItems";

const store = createState({
    notifications: [
        {
            id: 1,
            type: "new_order",
            content: "New Order #1 From Mustafa Salah!",
        },
        {
            id: 2,
            type: "new_pharmacy",
            content: "New Pharmacy joining the pharma platform",
        },
    ],
    tables: {
        inventory: {
            data: getInventoryItems(),
            filters: {
                search: "",
                category: "",
                status: "",
            },
        },
    },
});

DevTools(store).label("Store");

export default store;
