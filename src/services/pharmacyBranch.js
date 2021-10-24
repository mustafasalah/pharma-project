import http from "./http";

export const getPharmacyBranchInfo = async (id) => {
    return await Promise.resolve({
        data: {
            id: 1,
            name: "CVS Pharmacy",
            branch: "Omdurman Branch",
            phone_numbers: ["+249965484820", "+249148392930"],
            email: "cvs-pharma@cvs-pharma.com",
            website: "http://www.cvs-pharma.com",
        },
    });
};
