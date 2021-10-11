import { createState, DevTools } from "@hookstate/core";
import inventorySate from "./states/inventoryState";

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
        inventory: inventorySate,
    },
});

DevTools(store).label("Store");

export default store;
