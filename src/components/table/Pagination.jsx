import React from "react";
import { range } from "../../utility";

function Pagination({ paginationData, data, onPaginate }) {
    const itemsPerPage = paginationData.itemsPerPage.get();
    const length = paginationData.length.get();
    const currentPage = paginationData.currentPage.get();
    const actualLength = Math.ceil(data.length / itemsPerPage);
    let start = currentPage - Math.floor(length / 2);
    start = start < 1 ? 1 : start;
    let end = start + length - 1;
    end = end > actualLength ? actualLength : end;

    return (
        <ol className="float-right mt-6 text-sm">
            <li>
                {start > 1 && (
                    <button
                        className="py-2 px-4 rounded-sm mr-1 last:mr-0 font-medium text-primary hover:text-secondary"
                        onClick={() => onPaginate(1)}
                    >
                        <i className="fas fa-angle-double-left"></i>
                    </button>
                )}
                {range(start, end).map((index) => (
                    <button
                        key={index}
                        className={`py-2 px-4 rounded-sm font-medium ${
                            +currentPage === index
                                ? "bg-primary shadow-md text-white cursor-default"
                                : "hover:text-primary"
                        }`}
                        onClick={() =>
                            index !== +currentPage ? onPaginate(index) : null
                        }
                    >
                        {index}
                    </button>
                ))}
                {end < actualLength && (
                    <button
                        className="py-2 px-4 rounded-sm mr-1 last:mr-0 font-medium text-primary hover:text-secondary"
                        onClick={() => onPaginate(actualLength)}
                    >
                        <i className="fas fa-angle-double-right"></i>
                    </button>
                )}
            </li>
        </ol>
    );
}

export default Pagination;
