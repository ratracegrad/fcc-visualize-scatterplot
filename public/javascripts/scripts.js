$(document).ready(function() {

    var margin = {top: 20, right: 20, bottom: 75, left: 75},
        width = 960 - margin.left - margin.right,
        height = 650 - margin.top - margin.bottom;

    var x = d3.scale.linear()
            .range([0, width]);

    var y = d3.scale.linear()
            .range([height, 0]);

    var color = d3.scale.category10();

    var xAxis = d3.svg.axis()
            .scale(x)
            .orient("bottom");

    var yAxis = d3.svg.axis()
            .scale(y)
            .orient("left");

    var svg = d3.select(".chart").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // d3.json("data.json", function(error, data) {
    d3.json("cyclist-data.json", function(error, data) {
        if (error) throw error;

        var fastestTime = data[0].Seconds;

        data.forEach(function(d) {
            // d.sepalLength = +d.sepalLength;
            // d.sepalWidth = +d.sepalWidth;
            d.timeDiff = d.Seconds - fastestTime;

            // add doping legend
            if (d.Doping === '') {
                d.legend = "No Doping Allegation";
            } else {
                d.legend = "Doping Allegations";
            }

        });

        // x.domain(d3.extent(data, function(d) { return d.sepalWidth; })).nice();
        // y.domain(d3.extent(data, function(d) { return d.sepalLength; })).nice();
        x.domain(d3.extent(data, function(d) { return d.timeDiff; })).nice();
        y.domain(d3.extent(data, function(d) { return d.Place; })).nice();

        svg.append("g")
                .attr("class", "x axis")
                .attr("transform", "translate(0," + height + ")")
                .call(xAxis)
                .append("text")
                .attr("class", "label")
                .attr("x", width / 2)
                .attr("y", 50)
                .style("text-anchor", "middle")
                .text("Seconds Behind Fastest Time");

        svg.append("g")
                .attr("class", "y axis")
                .call(yAxis)
                .append("text")
                .attr("class", "label")
                .attr("transform", "rotate(-90)")
                .attr("y", -50)
                .attr("dy", ".71em")
                .style("text-anchor", "end")
                .text("Ranking")

        svg.selectAll(".dot")
                .data(data)
                .enter()
                .append("circle")
                .attr("class", "dot")
                .attr("r", 3.5)
                .attr("cx", function(d) { return x(d.timeDiff); })
                .attr("cy", function(d) { return y(d.Place); })
                .style("fill", function(d) { return color(d.legend); });
        // .attr("cx", function(d) { return x(d.sepalWidth); })
        // .attr("cy", function(d) { return y(d.sepalLength); })
        // .style("fill", function(d) { return color(d.species); });

        svg.selectAll(".dot")
                .data(data)
                .enter()
                .append("text")
                .text(function(d) { return d.Name; });

        svg.append("text")
                .attr("x", width / 2)
                .attr("y", 0)
                .attr("text-anchor", "middle")
                .attr("class", "title")
                .text("Doping in Professional Bicycle Racing");

        svg.append("text")
                .attr("x", width / 2)
                .attr("y", 20)
                .attr("text-anchor", "middle")
                .attr("class", "subtitle")
                .text("35 Fastest Times Up Alpe d'Huez");

        svg.append("text")
                .attr("x", width / 2)
                .attr("y", 40)
                .attr("text-anchor", "middle")
                .attr("class", "label")
                .text("Normalized to 13.8km distance");

        var legend = svg.selectAll(".legend")
                .data(color.domain())
                .enter().append("g")
                .attr("class", "legend")
                .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

        legend.append("rect")
                .attr("x", width - 18)
                .attr("y", height / 2 - 9)
                .attr("width", 18)
                .attr("height", 18)
                .style("fill", color);

        legend.append("text")
                .attr("x", width - 24)
                // .attr("y", 9)
                .attr("y", height / 2)
                .attr("dy", ".35em")
                .style("text-anchor", "end")
                .text(function(d) { return d; });

    });

});
