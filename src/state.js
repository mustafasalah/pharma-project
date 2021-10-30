import { createState, DevTools } from "@hookstate/core";
import employeesState from "./states/employeesState";
import inventoryState from "./states/inventoryState";
import ordersState from "./states/ordersState";
import pharmaciesState from "./states/pharmaciesState";
import productsState from "./states/productsState";
import productsStatisticsState from "./states/productsStatisticsState";
import usersState from "./states/usersState";

const store = createState({
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
        list: [],
        discount: 0,
        vat: 0,
    },
});

DevTools(store).label("Store");

export default store;
