import React from "react";

function StatisticsWidget({
    mainText,
    seconderyText,
    percent,
    faClass,
    bgColor,
    iconColor,
}) {
    return (
        <div className="rounded overflow-hidden flex bg-white mt-6 shadow-md relative">
            <i
                className={`${faClass} px-8 py-9 w-23.5 text-center inline-block text-3xl ${bgColor} ${iconColor}`}
            ></i>
            <div className="py-7 pl-5 pr-2 flex-grow">
                <strong className="block text-secondary text-xl">
                    {mainText}
                </strong>
                <span className="text-gray-400 text-smd font-light inline-block mt-1">
                    {seconderyText}
                </span>
                <span className="text-smd text-gray-400 absolute top-2.5 right-2.5">
                    <i
                        class={`fas fa-long-arrow-alt-${percent.direction} ${
                            percent.direction === "up"
                                ? "text-green"
                                : "text-red"
                        }`}
                    ></i>{" "}
                    {percent.value}
                </span>
            </div>
        </div>
    );
}

export default StatisticsWidget;
