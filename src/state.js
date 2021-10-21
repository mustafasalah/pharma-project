import { createState, DevTools } from "@hookstate/core";
import employeesState from "./states/employeesState";
import inventoryState from "./states/inventoryState";
import productsStatisticsState from "./states/productsStatisticsState";

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
        productsStatistics: productsStatisticsState,
        inventory: inventoryState,
        employees: employeesState,
    },
});

DevTools(store).label("Store");

export default store;
