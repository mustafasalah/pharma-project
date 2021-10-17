import React, { useEffect, useRef, useMemo } from "react";
import SectionHeader from "./common/SectionHeader";
import Chart from "chart.js/auto";
import { getStatisticalLabels, nFormatter } from "../utility";
import htmlLegendPlugin from "../customLegend";
import { statisticOptions } from "../services/statistic";

Chart.defaults.font.family = "Poppins";
Chart.defaults.font.size = "12px";
Chart.defaults.color = "#A3A3A3";

function initPieChart(ctx) {
    const chart = new Chart(ctx, {
        type: "pie",
        options: {
            plugins: {
                htmlLegend: {
                    containerID: "pie-chart-container",
                },
                legend: {
                    display: false,
                },
            },
            animation: {
                animateScale: true,
            },
        },
        data: {
            labels: [],
            datasets: [
                {
                    label: "",
                    borderWidth: 3,
                    borderAlign: "inner",
                    borderColor: [
                        "rgb(0, 119, 182)",
                        "rgb(0, 180, 216)",
                        "rgb(144, 224, 239)",
                        "rgb(221, 221, 221)",
                    ],
                    backgroundColor: [
                        "rgba(0, 119, 182, 0.5)",
                        "rgba(0, 180, 216, 0.5)",
                        "rgba(144, 224, 239, 0.5)",
                        "rgba(221, 221, 221, 0.5)",
                    ],
                    data: [],
                },
            ],
        },
        plugins: [htmlLegendPlugin],
    });

    return chart;
}

function PieChartSection({ title, data, time, onTimeChange }) {
    const canvas = useRef(null);

    useEffect(() => {
        const ctx = canvas.current.getContext("2d");
        const chart = initPieChart(ctx);

        if (chart) {
            console.log(data.statusLabels);
            chart.data.labels = data.statusLabels;
            chart.data.datasets[0].label = data.label;
            chart.data.datasets[0].data = data.datasets;
            chart.update({ duration: 1500 });
        }

        return () => chart.destroy();
    }, [time, data]);

    return (
        <div>
            <SectionHeader
                name={title}
                faClass="fas fa-chart-pie"
                selectMenu={{
                    label: "Time",
                    options: statisticOptions,
                    value: time,
                    onchange: ({ target }) => {
                        onTimeChange(target.value);
                    },
                }}
            />
            <div className="bg-white shadow-md rounded p-5">
                <div id="pie-chart-container" className="mb-2"></div>
                <canvas ref={canvas}></canvas>
            </div>
        </div>
    );
}

export default PieChartSection;
