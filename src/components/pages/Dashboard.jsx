import React, { useEffect, useState } from "react";
import {
    getProfitsStatistic,
    getSalesStatistic,
    getOrdersStatistic,
    getOnlineOrdersStatistic,
    getOrdersLineStatistic,
    getViewsStatistic,
} from "../../services/statistic";
import LineChartSection from "../lineChartSection";
import OverviewSection from "../OverviewSection";
import PieChartSection from "../PieChartSection";
import ProductsStatistics from "../ProductsStatistics";

const Dashboard = ({ type = "admin" }) => {
    const [lineChartTime, setLineChartTime] = useState("week");
    const [pieChartTime, setPieChartTime] = useState("week");
    const [lineChartState, setLineChartState] = useState([
        {
            label: type === "admin" ? "Orders" : "Profits",
            datasets: [],
        },
        {
            label: type === "admin" ? "Views" : "Sales",
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
            if (type === "admin") {
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
            if (type === "admin") {
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
            <OverviewSection type={type} />
            <div className="grid grid-cols-3 gap-x-6 mt-8">
                <LineChartSection
                    title={
                        type === "admin" ? "Views & Orders" : "Sales & Profits"
                    }
                    time={lineChartTime}
                    data={lineChartState}
                    onTimeChange={setLineChartTime}
                    type={type}
                />
                <PieChartSection
                    title="Orders Overview"
                    data={pieChartState}
                    time={pieChartTime}
                    onTimeChange={setPieChartTime}
                />
            </div>
            {type === "pharmacy owner" && (
                <div className="mt-8">
                    <ProductsStatistics />
                </div>
            )}
        </>
    );
};

export default Dashboard;
