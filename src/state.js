import { createState, DevTools } from "@hookstate/core";
import employeesState from "./states/employeesState";
import inventoryState from "./states/inventoryState";
import ordersState from "./states/ordersState";
import overviewStatisticState from "./states/overviewStatisticState";
import pharmaciesState from "./states/pharmaciesState";
import productsState from "./states/productsState";
import productsStatisticsState from "./states/productsStatisticsState";
import usersState from "./states/usersState";

const store = createState({
    statistics: {
        overview: overviewStatisticState,
    },
    loggedUser: {},
    pharmacyBranch: {},
    notifications: [],
    uploads: {
        productPhoto: "",
    },
    tables: {
        productsStatistics: productsStatisticsState,
        inventory: inventoryState,
        employees: employeesState,
        orders: ordersState,
        pharmacies: pharmaciesState,
        users: usersState,
        products: productsState,
    },
    popupWindow: {
        display: false,
        type: "",
        data: {},
    },
    pos: {
        products: [],
        discount: { amount: 0, unit: "SDG" },
    },
});

DevTools(store).label("Store");

export default store;
