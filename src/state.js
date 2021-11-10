import { createState, DevTools } from "@hookstate/core";
import employeesState from "./states/employeesState";
import inventoryState from "./states/inventoryState";
import ordersState from "./states/ordersState";
import overviewStatisticState from "./states/overviewStatisticState";
import pharmaciesState from "./states/pharmaciesState";
import productsState from "./states/productsState";
import productsStatisticsState from "./states/productsStatisticsState";
import usersState from "./states/usersState";

const defaultState = {
    collapseMenu: localStorage.getItem("collapse_menu") === "true",
    statistics: {
        overview: { ...overviewStatisticState },
    },
    loggedUser: {},
    pharmacyBranches: [],
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
};

let store = createState({ ...defaultState });

export const resetStore = () => {
    store.merge({ ...defaultState });
};

DevTools(store).label("Store");

export default store;
