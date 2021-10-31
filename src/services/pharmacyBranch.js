import http from "./http";

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

export const getPharmacyBranchInfo = async (id) => {
    return await Promise.resolve({
        data: {
            id: 1,
            name: "CVS Pharmacy",
            branch: "Omdurman Branch",
            phone_numbers: ["+249965484820", "+249148392930"],
            email: "cvs-pharma@cvs-pharma.com",
            website: "http://www.cvs-pharma.com",
            state: "khartoum",
            city: "omdurman",
            address: "Alwadi Street, near Alrwdah hospital",
            support_delivery: false,
            delivery_cost: 0,
            vat: 0,
            payment_options: {
                mbok: {
                    account_no: "5678293",
                    account_owner_name: "Mustafa Salah Mustafa",
                    bank_branch_name: "sabren",
                },
                atm_card: {
                    card_no: "",
                    card_owner_name: "",
                    bank_name: "",
                },
            },
        },
    });
};
