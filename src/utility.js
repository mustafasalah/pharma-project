export function range(min, max) {
    const nums = [];
    for (let i = min; i <= max; i++) {
        nums.push(i);
    }
    return nums;
}

function getMonthDays(month) {
    let days = [];
    for (let i = 0; i < 31; i++) {
        if (month === 2 && i === 28) break;
        else if (
            ((month % 2 === 0 && month < 7) ||
                (month % 2 !== 0 && month > 8)) &&
            i === 30
        ) {
            break;
        }
        days.push(i + 1 + "");
    }
    return days;
}

const getWeekDays = (
    week = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"]
) => {
    const day = new Date().getDay();
    const currentWeekDays = week.slice(0, day + 1);

    currentWeekDays.unshift(...week.slice(day + 1));

    return currentWeekDays;
};

export const getStatisticalLabels = (time) => {
    switch (time) {
        case "day":
            return [
                "00",
                "01",
                "02",
                "03",
                "04",
                "05",
                "06",
                "07",
                "08",
                "09",
                "10",
                "11",
                "12",
                "13",
                "14",
                "15",
                "16",
                "17",
                "18",
                "19",
                "20",
                "21",
                "22",
                "23",
            ];
        case "week":
            return getWeekDays();

        case "month":
            return getMonthDays();

        case "year":
            return [
                "Jan",
                "Feb",
                "Mar",
                "Apr",
                "May",
                "Jun",
                "Jul",
                "Aug",
                "Sep",
                "Oct",
                "Nov",
                "Dec",
            ];
    }
};

export function getMonthLength(month) {
    if (month === 2) return 28;
    else if ((month % 2 === 0 && month <= 7) || (month % 2 !== 0 && month >= 8))
        return 30;
    else return 31;
}

export function nFormatter(num, digits = 1) {
    const lookup = [
        { value: 1, symbol: "" },
        { value: 1e3, symbol: "K" },
        { value: 1e6, symbol: "M" },
        { value: 1e9, symbol: "G" },
        { value: 1e12, symbol: "T" },
        { value: 1e15, symbol: "P" },
        { value: 1e18, symbol: "E" },
    ];
    const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
    var item = lookup
        .slice()
        .reverse()
        .find(function (item) {
            return num >= item.value;
        });
    return item
        ? (num / item.value).toFixed(digits).replace(rx, "$1") + item.symbol
        : "0";
}

export function paginateData(pagination, data) {
    const { currentPage, itemsPerPage } = pagination.get();
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + +itemsPerPage;
    return data.slice(start, end);
}

export function filterData(filters, filtersData, data) {
    return data.filter((row) => {
        return filters.every((filter) => {
            if (filter.isFilter === false) return true;

            const filterData = filtersData[filter.prop].get();
            if (filterData === "") return true;

            const rowData = row[filter.by].get();

            switch (filter.type) {
                case "search":
                    return (
                        rowData.search(new RegExp(`.*${filterData}.*`, "i")) !==
                        -1
                    );

                default:
                    if (filter.handler) {
                        return filter.handler(filterData, rowData);
                    }
                    return filterData === rowData;
            }
        });
    });
}

export function sortData({ columnName, order }, data) {
    columnName = columnName.get();
    order = order.get();
    data.sort((a, b) => {
        const columnA = a[columnName].value;
        const columnB = b[columnName].value;
        if (order === "desc") {
            return columnA >= columnB ? -1 : 1;
        }
        return columnA <= columnB ? -1 : 1;
    });
    return data;
}