import { useState } from "@hookstate/core";
import React, { useEffect } from "react";
import { getOverviewStatistic } from "../services/statistic";
import store from "../state";
import SectionHeader from "./common/SectionHeader";
import StatisticsWidget from "./common/StatisticsWidget";

const OverviewSection = ({ type }) => {
    const { overview } = useState(store.statistics);
    const { views, pharmacies, users, sales, profits, orders, sold_products } =
        overview;

    const getPercentage = ({ counter, previous_counter }) => {
        const deff = counter.get() - previous_counter.get();
        return {
            value: (
                (Math.abs(deff) / previous_counter.get()) * 100 || 0
            ).toFixed(1),
            direction: deff >= 0 ? "up" : "down",
        };
    };

    useEffect(() => {
        (async () => {
            const { data } = await getOverviewStatistic(type);
            overview.set(data);
        })();
    }, []);

    return (
        <>
            <SectionHeader
                name={
                    type === "admin" ? "General Overview" : "Today's Overview"
                }
                faClass="fas fa-eye"
            />
            <div className="grid gap-6 grid-cols-4">
                {type === "admin" ? (
                    <StatisticsWidget
                        mainText={views.counter.get()}
                        seconderyText="Today's Views"
                        percent={getPercentage(views)}
                        faClass="fas fa-eye"
                        bgColor="bg-blue-light"
                        iconColor="text-secondary"
                    />
                ) : (
                    <StatisticsWidget
                        mainText={`${sales.counter.get()} SDG`}
                        seconderyText="Today's Sales"
                        percent={getPercentage(sales)}
                        faClass="fas fa-piggy-bank"
                        bgColor="bg-brighter"
                        iconColor="text-primary"
                    />
                )}

                <StatisticsWidget
                    mainText={orders.counter.get()}
                    seconderyText={
                        type === "admin"
                            ? "Today's Online Orders"
                            : "Today's Total Orders"
                    }
                    percent={getPercentage(orders)}
                    faClass="fas fa-cart-arrow-down"
                    bgColor="bg-gray-100"
                    iconColor="text-gray-400"
                />

                {type === "admin" ? (
                    <StatisticsWidget
                        mainText={pharmacies.counter.get()}
                        seconderyText="Active Pharmacies"
                        link={{
                            url: "/pharmacies",
                            label: "View All",
                        }}
                        faClass="fas fa-clinic-medical"
                        bgColor="bg-brighter"
                        iconColor="text-primary"
                    />
                ) : (
                    <StatisticsWidget
                        mainText={`${profits.counter.get()} SDG`}
                        seconderyText="Today's Profits"
                        percent={getPercentage(profits)}
                        faClass="fas fa-dollar-sign"
                        bgColor="bg-green-light"
                        iconColor="text-green-dark"
                    />
                )}

                {type === "admin" ? (
                    <StatisticsWidget
                        mainText={users.counter.get()}
                        seconderyText="Active Users"
                        link={{
                            url: "/users",
                            label: "View All",
                        }}
                        faClass="fas fa-users"
                        bgColor="bg-green-lighter"
                        iconColor="text-green"
                    />
                ) : (
                    <StatisticsWidget
                        mainText={sold_products.counter.get()}
                        seconderyText="Today's Sold Products"
                        percent={getPercentage(sold_products)}
                        faClass="fas fa-pills"
                        bgColor="bg-yellow-light"
                        iconColor="text-yellow"
                    />
                )}
            </div>
        </>
    );
};

export default OverviewSection;
