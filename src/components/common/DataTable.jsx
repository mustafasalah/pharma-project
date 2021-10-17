import React, { useMemo } from "react";
import Filters from "../table/Filters";
import Table from "../table/Table";
import Pagination from "../table/Pagination";
import { paginateData, filterData } from "../../utility";

function DataTable({
    columns,
    data,
    form,
    filters,
    filtersData,
    pagination,
    sortColumn,
}) {
    const filteredData = useMemo(
        () => filterData(filters, filtersData, data),
        [filters, filtersData, data]
    );

    // const sortedData = useMemo(
    //     () => sortData(sortColumn, data),
    //     [sortColumn, data]
    // );

    const paginatedData = useMemo(
        () => paginateData(pagination, filteredData),
        [pagination, data]
    );

    return (
        <>
            <Filters
                filters={filters}
                data={filtersData}
                pagination={pagination}
            />
            <Table
                data={paginatedData}
                columns={columns}
                sortColumn={sortColumn}
                form={form}
            />
            <Pagination
                paginationData={pagination}
                data={filteredData}
                onPaginate={pagination.currentPage.set}
            />
        </>
    );
}

export default DataTable;
