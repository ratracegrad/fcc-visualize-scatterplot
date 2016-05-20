
$(document).ready(function() {

    var margin = {top: 20, right: 20, bottom: 30, left: 40},
        width = 960 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;

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

    d3.json("cyclist-data.json", function(error, data) {
        if (error) throw error;

        var firstPlace = data[0].Seconds;

        data.forEach(function(d) {
            // d.place = +d.place;
            // d.seconds = +d.seconds;
            d.timeDiff = firstPlace - d.Seconds;
        });

        x.domain(d3.extent(data, function(d) { return d.time; })).nice();
        y.domain(d3.extent(data, function(d) { return d.place; })).nice();

        svg.append("text")
                .attr("x", width / 2)
                .attr("y", 20)
                .attr("text-anchor", "middle")
                .attr("class", "title")
                .text("Doping in Professional Bicycle Racing");
        
        svg.append("text")
                .attr("x", width / 2)
                .attr("y", 40)
                .attr("text-anchor", "middle")
                .attr("class", "subtitle")
                .text("35 Fastest times up Alpe d'Huez");
        
        svg.append("text")
                .attr("x", width / 2)
                .attr("y", 60)
                .attr("text-anchor", "middle")
                .attr("class", "label")
                .text("Normalized to 13.8km distance");
        
        svg.append("g")
                .attr("class", "x axis")
                .attr("transform", "translate(0," + height + ")")
                .call(xAxis)
                .append("text")
                .attr("class", "label")
                .attr("x", width/2)
                .attr("y", 20)
                .style("text-anchor", "middle")
                .text("Minutes Behind Fastest Time");

        svg.append("g")
                .attr("class", "y axis")
                .call(yAxis)
                .append("text")
                .attr("class", "label")
                .attr("transform", "rotate(-90)")
                .attr("y", -20)
                .attr("dy", ".71em")
                .style("text-anchor", "end")
                .text("Ranking")

        svg.selectAll(".dot")
                .data(data)
                .enter().append("circle")
                .attr("class", "dot")
                .attr("r", 3.5)
                .attr("cx", function(d) { return d.timeDiff; })
                .attr("cy", function(d) { return d.Place; })
                .style("fill", function(d) { return (d.Doping === "") ? 5 : 1});

        var legend = svg.selectAll(".legend")
                .data(color.domain())
                .enter().append("g")
                .attr("class", "legend")
                .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

        legend.append("rect")
                .attr("x", width - 18)
                .attr("width", 18)
                .attr("height", 18)
                .style("fill", color);

        legend.append("text")
                .attr("x", width - 24)
                .attr("y", 9)
                .attr("dy", ".35em")
                .style("text-anchor", "end")
                .text(function(d) { return d; });

    });

});