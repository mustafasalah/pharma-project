import React, { useEffect, useState } from "react";
import {
    getProfitsStatistic,
    getSalesStatistic,
    getOrdersStatistic,
} from "../../services/statistic";
import LineChartSection from "../lineChartSection";
import OverviewSection from "../OverviewSection";
import PieChartSection from "../PieChartSection";

const Dashboard = () => {
    const [lineChartTime, setLineChartTime] = useState("week");
    const [pieChartTime, setPieChartTime] = useState("week");
    const [lineChartState, setLineChartState] = useState([
        {
            label: "Profits",
            datasets: [],
        },
        {
            label: "Sales",
            datasets: [],
        },
    ]);

    const [pieChartState, setPieChartState] = useState({
        statusLabels: ["Finished", "Waiting", "Payment Confirmed", "Canceled"],
        label: "Orders Status",
        datasets: [],
    });

    useEffect(() => {
        const ordersDatasets = getOrdersStatistic(pieChartTime);

        setPieChartState({
            ...pieChartState,
            datasets: ordersDatasets,
        });
    }, [pieChartTime]);

    useEffect(() => {
        const profitsDatasets = getProfitsStatistic(lineChartTime);
        const salesDatasets = getSalesStatistic(lineChartTime);

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
    }, [lineChartTime]);

    return (
        <>
            <OverviewSection />
            <div className="grid grid-cols-3 gap-x-6 mt-8">
                <LineChartSection
                    title="Sales & Profits"
                    time={lineChartTime}
                    data={lineChartState}
                    onTimeChange={setLineChartTime}
                />
                <PieChartSection
                    title="Orders Overview"
                    data={pieChartState}
                    time={pieChartTime}
                    onTimeChange={setPieChartTime}
                />
            </div>
        </>
    );
};

export default Dashboard;
