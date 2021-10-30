import { useHookstate } from "@hookstate/core";
import React, { useState } from "react";
import store from "../../state";
import Loading from "../Loading";

const ProductsSearch = ({
    label = "Products Search",
    placeholder = "",
    className = "",
    list,
    value,
}) => {
    const [loading, setLoading] = useState(false);
    const inventoryData = useHookstate(store.tables.inventory.data);
    const [resultSet, setResultSet] = useState([]);

    return (
        <div className={`inline-block font-medium relative mr-5 ${className}`}>
            <label htmlFor={label} className="mr-2">
                {label}
            </label>
            <input
                id={label}
                className="inline-block py-1.5 px-2 w-72 border border-gray-300 rounded-sm shadow focus:outline-none"
                type="search"
                placeholder={placeholder}
                type="search"
                value={value.get()}
                onInput={() => {
                    setLoading(true);
                }}
                onChange={({ target }) => {
                    value.set(target.value);
                    setResultSet(
                        inventoryData.filter((item) => {
                            return (
                                item.name
                                    .get()
                                    .search(
                                        new RegExp(`${target.value}`, "i")
                                    ) !== -1
                            );
                        })
                    );
                    setLoading(false);
                }}
            />
            <i className="fas fa-search absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-300"></i>
            {value.get() !== "" && (
                <div className="bg-white absolute z-30 right-0 w-72 max-h-64 overflow-y-auto rounded-sm border shadow mt-2">
                    {loading ? (
                        <Loading
                            label="Searching"
                            className="flex text-gray-500"
                        />
                    ) : resultSet.length ? (
                        <ul>
                            {resultSet.map((result) => (
                                <ResultItem
                                    result={result}
                                    onSelect={() => {
                                        list.set((oldList) => {
                                            let alreadyExist = false;
                                            oldList.forEach((item) => {
                                                if (
                                                    +item.id ===
                                                    +result.id.get()
                                                ) {
                                                    if (item.stock > item.qty)
                                                        item.qty++;
                                                    alreadyExist = true;
                                                }
                                            });
                                            return alreadyExist
                                                ? oldList
                                                : [
                                                      {
                                                          ...result.get(),
                                                          qty: 1,
                                                      },
                                                      ...oldList,
                                                  ];
                                        });
                                        value.set("");
                                    }}
                                />
                            ))}
                        </ul>
                    ) : (
                        <span className="p-4 block text-center">
                            No Result Found
                        </span>
                    )}
                </div>
            )}
        </div>
    );
};

const ResultItem = ({ result, onSelect }) => {
    const isInStock = +result.stock.get() > 0;
    return (
        <li className="border-b last:border-b-0">
            <button
                onClick={isInStock && onSelect}
                className={`px-3 py-2 text-left w-full ${
                    isInStock
                        ? "hover:bg-gray-100"
                        : "text-gray-500 italic bg-gray-100 cursor-not-allowed"
                }`}
            >
                <span>{result.name.get()}</span>
                <p className="text-gray-500 block text-left leading-5">
                    <span>{result.unit.get()}</span>
                    <span
                        className={`float-right font-medium text-xxs ${
                            isInStock ? "text-green" : "text-red"
                        }`}
                    >
                        {isInStock ? "In Stock" : "Out of Stock"}
                    </span>
                </p>
            </button>
        </li>
    );
};

export default ProductsSearch;
