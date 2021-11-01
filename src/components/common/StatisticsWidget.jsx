import React from "react";
import { Link } from "react-router-dom";

function StatisticsWidget({
    mainText,
    seconderyText,
    percent,
    faClass,
    bgColor,
    iconColor,
    link,
}) {
    return (
        <div className="animate__animated animate__flipInX rounded overflow-hidden flex bg-white shadow-md relative">
            <i
                className={`${faClass} px-8 py-8 w-26 text-center inline-block text-4xl ${bgColor} ${iconColor}`}
            ></i>
            <div className="py-7 pl-4 pr-2 flex-grow">
                <strong className="block text-secondary text-xl">
                    {mainText}
                </strong>
                <span className="text-gray-400 text-smd font-light inline-block mt-1">
                    {seconderyText}
                </span>
                <span className="text-xs text-gray-400 absolute top-2.5 right-2.5">
                    {percent ? (
                        <>
                            <i
                                className={`fas fa-long-arrow-alt-${
                                    percent.direction
                                } ${
                                    percent.direction === "up"
                                        ? "text-green"
                                        : "text-red"
                                }`}
                            ></i>{" "}
                            {percent.value}%
                        </>
                    ) : (
                        link && <Link to={link.url}>{link.label}</Link>
                    )}
                </span>
            </div>
        </div>
    );
}

export default StatisticsWidget;
