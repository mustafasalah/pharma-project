import { useHookstate } from "@hookstate/core";
import React, { useEffect, useState } from "react";
import { getOverviewStatistic } from "../services/statistic";
import store from "../state";
import overviewStatisticState from "../states/overviewStatisticState";
import SectionHeader from "./common/SectionHeader";
import StatisticsWidget from "./common/StatisticsWidget";

const OverviewSection = () => {
    const { loggedUser } = useHookstate(store);
    const [overview, setOverview] = useState(overviewStatisticState);
    const userRole = loggedUser.role.get();
    const { views, pharmacies, users, sales, profits, orders, sold_products } =
        overview;

    const getPercentage = ({ counter, previous_counter }) => {
        const deff = counter - previous_counter;
        return {
            value: ((Math.abs(deff) / previous_counter) * 100 || 0).toFixed(1),
            direction: deff >= 0 ? "up" : "down",
        };
    };

    useEffect(() => {
        (async () => {
            const { data } = await getOverviewStatistic(userRole);
            setOverview(data);
        })();
    }, []);

    return (
        <>
            <SectionHeader
                name={
                    userRole === "admin"
                        ? "General Overview"
                        : "Today's Overview"
                }
                faClass="fas fa-eye"
            />
            <div className="grid gap-6 grid-cols-4">
                {userRole === "admin" ? (
                    <StatisticsWidget
                        mainText={views.counter}
                        seconderyText="Today's Views"
                        percent={getPercentage(views)}
                        faClass="fas fa-eye"
                        bgColor="bg-blue-light"
                        iconColor="text-secondary"
                    />
                ) : (
                    <StatisticsWidget
                        mainText={`${sales.counter} SDG`}
                        seconderyText="Today's Sales"
                        percent={getPercentage(sales)}
                        faClass="fas fa-piggy-bank"
                        bgColor="bg-brighter"
                        iconColor="text-primary"
                    />
                )}

                <StatisticsWidget
                    mainText={orders.counter}
                    seconderyText={
                        userRole === "admin"
                            ? "Today's Online Orders"
                            : "Today's Total Orders"
                    }
                    percent={getPercentage(orders)}
                    faClass="fas fa-cart-arrow-down"
                    bgColor="bg-gray-100"
                    iconColor="text-gray-400"
                />

                {userRole === "admin" ? (
                    <StatisticsWidget
                        mainText={pharmacies.counter}
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
                        mainText={`${profits.counter} SDG`}
                        seconderyText="Today's Profits"
                        percent={getPercentage(profits)}
                        faClass="fas fa-dollar-sign"
                        bgColor="bg-green-light"
                        iconColor="text-green-dark"
                    />
                )}

                {userRole === "admin" ? (
                    <StatisticsWidget
                        mainText={users.counter}
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
                        mainText={sold_products.counter}
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
