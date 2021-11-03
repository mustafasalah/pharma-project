import http from "./http";

export const setVATOption = (id, data) => {
    return Promise.resolve({ data, status: 200 });
};

export const setDeliveryOption = (id, data) => {
    return Promise.resolve({ data, status: 200 });
};

export const setPaymentOption = (id, type, data) => {
    if (type === "mbok") {
        return Promise.resolve({ data, status: 200 });
    } else {
        return Promise.resolve({ data, status: 200 });
    }
};

export const setPharmacyInformation = (id, data) => {
    return Promise.resolve({ data, status: 200 });
};
