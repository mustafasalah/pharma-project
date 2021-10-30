import React, { useMemo } from "react";
import Filters from "../table/Filters";
import Table from "../table/Table";
import Pagination from "../table/Pagination";
import { paginateData, filterData, sortData } from "../../utility";

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
        () => (filters ? filterData(filters, filtersData, data) : data),
        [filters, filtersData, data]
    );

    const sortedData = useMemo(
        () => (sortColumn ? sortData(sortColumn, filteredData) : filteredData),
        [sortColumn, filteredData]
    );

    const paginatedData = useMemo(
        () => (pagination ? paginateData(pagination, sortedData) : sortedData),
        [pagination, sortedData]
    );

    return (
        <div className="animate__animated animate__fadeIn">
            {filters && (
                <Filters
                    filters={filters}
                    data={filtersData}
                    pagination={pagination}
                />
            )}
            <Table
                data={paginatedData}
                columns={columns}
                sortColumn={sortColumn}
                form={form}
            />
            {pagination && (
                <Pagination
                    paginationData={pagination}
                    data={filteredData}
                    onPaginate={pagination.currentPage.set}
                />
            )}
        </div>
    );
}

export default DataTable;
