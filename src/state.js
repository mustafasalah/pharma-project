import { createState, DevTools } from "@hookstate/core";
import employeesState from "./states/employeesState";
import inventoryState from "./states/inventoryState";
import ordersState from "./states/ordersState";
import productsStatisticsState from "./states/productsStatisticsState";

const store = createState({
    loggedUser: {},
    pharmacyBranch: {},
    notifications: [],
    tables: {
        productsStatistics: productsStatisticsState,
        inventory: inventoryState,
        employees: employeesState,
        orders: ordersState,
    },
    showPopupWindow: {
        state: false,
        data: {},
    },
});

DevTools(store).label("Store");

export default store;
