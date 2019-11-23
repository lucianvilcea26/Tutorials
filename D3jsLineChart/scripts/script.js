﻿window.onload = function () {
    // set the dimensions and margins of the graph
    var margin = { top: 10, right: 30, bottom: 30, left: 60 },
        width = 860 - margin.left - margin.right,
        height = 600 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    var svg = d3.select("#lineChart")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

    //Read the data
    d3.csv("https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/3_TwoNumOrdered_comma.csv",
        // read the CSV file and format the data properly
        function (d) {
            return { date: d3.timeParse("%Y-%m-%d")(d.date), value: d.value }
        },
        // use the dataset to generate the chart:
        function (data) {
            // create the X axis using the date
            var x = d3.scaleTime()
                .domain(d3.extent(data, function (d) { return d.date; }))
                .range([0, width]);
            svg.append("g")
                .attr("transform", "translate(0," + height + ")")
                .call(d3.axisBottom(x));

            // create the Y axis using the value
            var y = d3.scaleLinear()
                .domain([0, d3.max(data, function (d) { return +d.value; })])
                .range([height, 0]);
            svg.append("g")
                .call(d3.axisLeft(y));

            // Add the line chart
            svg.append("path")
                .datum(data)
                .attr("fill", "none")
                .attr("stroke", "steelblue")
                .attr("stroke-width", 1.5)
                .attr("d", d3.line()
                    .x(function (d) { return x(d.date) })
                    .y(function (d) { return y(d.value) })
                )
        });
}