import React, { useEffect, useRef, useMemo } from "react";
import SectionHeader from "./common/SectionHeader";
import Chart from "chart.js/auto";
import { getStatisticalLabels, nFormatter } from "../utility";
import htmlLegendPlugin from "../customLegend";
import { statisticOptions } from "../services/statistic";

Chart.defaults.font.family = "Poppins";
Chart.defaults.font.size = "12px";
Chart.defaults.color = "#A3A3A3";

function initLineChart(ctx) {
    const chart = new Chart(ctx, {
        type: "line",
        options: {
            plugins: {
                htmlLegend: {
                    containerID: "line-chart-container",
                },
                legend: {
                    display: false,
                },
            },
            elements: {
                line: {
                    tension: 0.5,
                },
            },
            scales: {
                y: {
                    ticks: {
                        // Include a dollar sign in the ticks
                        callback: function (value, index, values) {
                            return nFormatter(value) + " SDG";
                        },
                    },
                },
            },
        },
        data: {
            labels: [],
            datasets: [
                {
                    borderColor: "rgb(0, 119, 182)",
                    backgroundColor: "rgba(0, 119, 182, 0.5)",
                    pointBorderColor: "rgb(0, 119, 182)",
                    pointBackgroundColor: "rgb(0, 119, 182)",
                    data: [],
                    fill: "start",
                },

                {
                    borderColor: "rgb(0, 180, 216)",
                    backgroundColor: "rgba(0, 180, 216, 0.5)",
                    pointBorderColor: "rgb(0, 180, 216)",
                    pointBackgroundColor: "rgb(0, 180, 216)",
                    data: [],
                    fill: "start",
                },
            ],
        },
        plugins: [htmlLegendPlugin],
    });

    return chart;
}

function LineChartSection({ title, data, time, onTimeChange }) {
    const canvas = useRef(null);

    useEffect(() => {
        const ctx = canvas.current.getContext("2d");
        const chart = initLineChart(ctx);

        if (chart) {
            chart.data.labels = getStatisticalLabels(time);
            chart.data.datasets[0].label = data[0].label;
            chart.data.datasets[0].data = data[0].datasets;
            chart.data.datasets[1].label = data[1].label;
            chart.data.datasets[1].data = data[1].datasets;
            chart.update({ duration: 2000 });
        } else {
            console.log("work");
        }

        return () => chart.destroy();
    }, [time, data]);

    return (
        <div className="col-span-2">
            <SectionHeader
                name={title}
                faClass="fas fa-chart-area"
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
                <div
                    id="line-chart-container"
                    className="mb-2 select-none"
                ></div>
                <canvas ref={canvas}></canvas>
            </div>
        </div>
    );
}

export default LineChartSection;
