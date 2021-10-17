const getOrCreateLegendList = (chart, id) => {
    const legendContainer = document.getElementById(id);
    let listContainer = legendContainer.querySelector("ul");

    if (!listContainer) {
        listContainer = document.createElement("ul");

        listContainer.style.display = "flex";
        listContainer.style.flexDirection = "row";
        listContainer.style.flexWrap = "wrap";
        if (chart.config._config.type === "pie") {
            listContainer.style.justifyContent = "center";
        } else {
            listContainer.style.justifyContent = "flex-end";
        }
        listContainer.style.fontSize = "12px";
        listContainer.style.margin = 0;
        listContainer.style.padding = 0;

        legendContainer.appendChild(listContainer);
    }

    return listContainer;
};

const htmlLegendPlugin = {
    id: "htmlLegend",
    afterUpdate(chart, args, options) {
        const ul = getOrCreateLegendList(chart, options.containerID);

        // Remove old legend items
        while (ul.firstChild) {
            ul.firstChild.remove();
        }

        // Reuse the built-in legendItems generator
        const items = chart.options.plugins.legend.labels.generateLabels(chart);

        items.forEach((item) => {
            const li = document.createElement("li");
            li.style.alignItems = "center";
            li.style.cursor = "pointer";
            li.style.display = "flex";
            li.style.flexDirection = "row";

            if (chart.config._config.type === "pie") {
                li.style.marginRight = "10px";
                li.style.marginBottom = "7.2px";
            } else {
                li.style.marginLeft = "10px";
            }

            li.onclick = () => {
                const { type } = chart.config;
                if (type === "pie" || type === "doughnut") {
                    // Pie and doughnut charts only have a single dataset and visibility is per item
                    chart.toggleDataVisibility(item.index);
                } else {
                    chart.setDatasetVisibility(
                        item.datasetIndex,
                        !chart.isDatasetVisible(item.datasetIndex)
                    );
                }
                chart.update();
            };

            // Color box
            const boxSpan = document.createElement("span");
            boxSpan.style.background = item.strokeStyle;
            boxSpan.style.display = "inline-block";
            boxSpan.style.height = "4px";
            boxSpan.style.marginRight = "10px";
            boxSpan.style.width = "40px";
            boxSpan.style.borderRadius = "5px";

            // Text
            const textContainer = document.createElement("p");
            textContainer.style.color = "rgba(6, 13, 22, 0.75)";
            textContainer.style.fontWeight = "medium";
            textContainer.style.margin = 0;
            textContainer.style.padding = 0;
            textContainer.style.textDecoration = item.hidden
                ? "line-through"
                : "";

            const text = document.createTextNode(item.text);
            textContainer.appendChild(text);

            li.appendChild(boxSpan);
            li.appendChild(textContainer);
            ul.appendChild(li);
        });
    },
};

export default htmlLegendPlugin;
