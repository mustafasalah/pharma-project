import { useHookstate } from "@hookstate/core";
import React, { useEffect, useState } from "react";
import {
    getProfitsStatistic,
    getSalesStatistic,
    getOrdersStatistic,
    getOnlineOrdersStatistic,
    getOrdersLineStatistic,
    getViewsStatistic,
} from "../../services/statistic";
import store from "../../state";
import LineChartSection from "../lineChartSection";
import OverviewSection from "../OverviewSection";
import PieChartSection from "../PieChartSection";
import ProductsStatistics from "../ProductsStatistics";

const Dashboard = () => {
    const { loggedUser } = useHookstate(store);
    const userRole = loggedUser.role.get();

    const [lineChartTime, setLineChartTime] = useState("week");
    const [pieChartTime, setPieChartTime] = useState("week");
    const [lineChartState, setLineChartState] = useState([
        {
            label: userRole === "admin" ? "Orders" : "Profits",
            datasets: [],
        },
        {
            label: userRole === "admin" ? "Views" : "Sales",
            datasets: [],
        },
    ]);

    const [pieChartState, setPieChartState] = useState({
        statusLabels: ["Finished", "Waiting", "Payment Confirmed", "Canceled"],
        label: "Orders Status",
        datasets: [],
    });

    useEffect(() => {
        (async () => {
            let ordersDatasets = [];
            if (userRole === "admin") {
                ({ data: ordersDatasets } = await getOnlineOrdersStatistic(
                    pieChartTime
                ));
            } else {
                ({ data: ordersDatasets } = await getOrdersStatistic(
                    pieChartTime
                ));
            }

            setPieChartState({
                ...pieChartState,
                datasets: ordersDatasets,
            });
        })();
    }, [pieChartTime]);

    useEffect(() => {
        (async () => {
            if (userRole === "admin") {
                const { data: ordersDatasets } = await getOrdersLineStatistic(
                    lineChartTime
                );
                const { data: viewsDatasets } = await getViewsStatistic(
                    lineChartTime
                );

                setLineChartState([
                    {
                        label: "Orders",
                        datasets: ordersDatasets,
                    },
                    {
                        label: "Views",
                        datasets: viewsDatasets,
                    },
                ]);
            } else {
                const { data: profitsDatasets } = await getProfitsStatistic(
                    lineChartTime
                );
                const { data: salesDatasets } = await getSalesStatistic(
                    lineChartTime
                );

                setLineChartState([
                    {
                        label: "Profits",
                        datasets: profitsDatasets,
                    },
                    {
                        label: "Sales",
                        datasets: salesDatasets,
                    },
                ]);
            }
        })();
    }, [lineChartTime]);

    return (
        <>
            <OverviewSection />
            <div className="grid grid-cols-3 gap-x-6 mt-8">
                <LineChartSection
                    title={
                        userRole === "admin"
                            ? "Views & Orders"
                            : "Sales & Profits"
                    }
                    time={lineChartTime}
                    data={lineChartState}
                    onTimeChange={setLineChartTime}
                    type={userRole}
                />
                <PieChartSection
                    title="Orders Overview"
                    data={pieChartState}
                    time={pieChartTime}
                    onTimeChange={setPieChartTime}
                />
            </div>
            {userRole === "pharmacy owner" && (
                <div className="mt-8">
                    <ProductsStatistics />
                </div>
            )}
        </>
    );
};

export default Dashboard;
