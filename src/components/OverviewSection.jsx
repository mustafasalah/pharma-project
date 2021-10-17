import React from "react";
import SectionHeader from "./common/SectionHeader";
import StatisticsWidget from "./common/StatisticsWidget";

const OverviewSection = () => {
    return (
        <>
            <SectionHeader name="Today's Overview" faClass="fas fa-eye" />
            <div className="grid gap-6 grid-cols-4">
                <StatisticsWidget
                    mainText="24,450 SDG"
                    seconderyText="Today's Sales"
                    percent={{
                        value: 12.5,
                        direction: "up",
                    }}
                    faClass="fas fa-piggy-bank"
                    bgColor="bg-bright"
                    iconColor="text-primary"
                />

                <StatisticsWidget
                    mainText="220"
                    seconderyText="Today's Total Orders"
                    percent={{
                        value: 22.5,
                        direction: "up",
                    }}
                    faClass="fas fa-cart-arrow-down"
                    bgColor="bg-gray-100"
                    iconColor="text-gray-400"
                />

                <StatisticsWidget
                    mainText="4,350 SDG"
                    seconderyText="Today's Profits"
                    percent={{
                        value: 22.5,
                        direction: "up",
                    }}
                    faClass="fas fa-dollar-sign"
                    bgColor="bg-green-light"
                    iconColor="text-green-dark"
                />

                <StatisticsWidget
                    mainText="1365"
                    seconderyText="Today's Sold Products"
                    percent={{
                        value: 22.5,
                        direction: "down",
                    }}
                    faClass="fas fa-pills"
                    bgColor="bg-yellow-light"
                    iconColor="text-yellow"
                />
            </div>
        </>
    );
};

export default OverviewSection;
