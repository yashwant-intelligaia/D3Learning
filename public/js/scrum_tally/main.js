// set the dimensions and margins of the graph
var margin = {top: 20, right: 30, bottom: 40, left: 120},
    width = 460 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#my_dataviz")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("class", "main-group")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

// Parse the Data
d3.csv("/asset/csv/scrum_tally.csv", function(data) {
  // Add X axis
  var x = d3.scaleLinear()
    // .domain(d3.extent(data, function(d){return parseInt(d.Value)}))
    .domain([d3.min(data, function(d){return parseInt(d.Value)}),d3.max(data, function(d){return parseInt(d.Value)})])
    .range([ 0, width]);

  svg.append("g")
    .attr("transform", "translate(0," + (height-50) + ")")
    .call(d3.axisBottom(x))
    .selectAll("text")
    .attr("transform", "translate(-10,0)rotate(-45)")
    .style("text-anchor", "end");

  d3.select("svg")
    .select("g")
    .append("g")
    .attr("transform", "translate(0," + height + ")")
    .append("text")
    .attr("x", width/2)
    .attr("stroke", "black")
    .attr("font-size", "14px")
    .text("Year");

  // Y axis
  var y = d3.scaleBand()
    .range([ 0, height-50 ])
    .domain(data.map(function(d) { return d.Scrum_Master; }))
    .padding(.1);
  svg.append("g")
    .call(d3.axisLeft(y))
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 6)
    .attr("x", -((height-50)/2))
    .attr("dy", "-8.1em")
    .attr("font-size", "14px")
    .attr("stroke", "black")
    .text("Members");

  //Bars
  svg.selectAll("myRect")
    .data(data)
    .enter()
    .append("rect")
    .attr("x", x(0) )
    .attr("y", function(d) { return y(d.Scrum_Master); })
    .attr("width", function(d) { return x(d.Value); })
    .attr("height", y.bandwidth() )
    .attr("fill", "rgb(17, 141, 255)")


    // .attr("x", function(d) { return x(d.Country); })
    // .attr("y", function(d) { return y(d.Value); })
    // .attr("width", x.bandwidth())
    // .attr("height", function(d) { return height - y(d.Value); })
    // .attr("fill", "#69b3a2")

})