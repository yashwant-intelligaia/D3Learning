// set the dimensions and margins of the graph
var margin = {top: 20, right: 30, bottom: 0, left: 10},
    width = 500 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#my_dataviz")
  .append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

// Parse the Data
// d3.csv("https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/5_OneCatSevNumOrdered_wide.csv", function(data) {
d3.csv("/asset/csv/data.csv", function(data) {
  // List of groups = header of the csv files
  var keys = data.columns.slice(1);

  // Add X axis

//   var domainArray = d3.extent(data, function(d) { return parseInt(d.week); });
//   console.log(domainArray);
//   var max = d3.max(data, function(d){ return parseInt(d.week)});
//   console.log(max);
  
//   var min = d3.min(data, function(d){ return parseInt(d.week)});
//   console.log(min);

  var x = d3.scaleLinear()
    .domain(d3.extent(data, function(d) { return parseInt(d.week); }))
    .range([ 0, width ]);
    
    
  svg.append("g")
    .attr("transform", "translate(0," + height*0.8 + ")")
    // .call(d3.axisBottom(x).tickSize(-height*.7).tickValues([10, 12, 14, 16]))
    .call(d3.axisBottom(x).tickSize(-height*.7).ticks(6))
    .select(".domain").remove()
  // Customization
  svg.selectAll(".tick line").attr("stroke", "#b8b8b8")

  // Add X axis label:
  svg.append("text")
      .attr("text-anchor", "end")
      .attr("x", width/2)
      .attr("y", height-30 )
      .text("Time (year)");

  // Add Y axis
  var y = d3.scaleLinear()
    .domain([-15, 25])
    .range([ height, 0 ]);

  // color palette
  var color = d3.scaleOrdinal()
    .domain(keys)
    .range(d3.schemeDark2);

  //stack the data?
  var stackedData = d3.stack()
    .offset(d3.stackOffsetSilhouette)
    .keys(keys)
    (data)

  // create a tooltip
  var Tooltip = svg
    .append("text")
    .attr("x", 0)
    .attr("y", 0)
    .style("opacity", 0)
    .style("font-size", 17)

  // Three function that change the tooltip when user hover / move / leave a cell
  var mouseover = function(d) {
    Tooltip.style("opacity", 1)
    d3.selectAll(".myArea").style("opacity", .2)
    d3.select(this)
      .style("stroke", "black")
      .style("opacity", 1)
  }
  var mousemove = function(d,i) {
    grp = keys[i]
    Tooltip.text(grp)
  }
  var mouseleave = function(d) {
    Tooltip.style("opacity", 0)
    d3.selectAll(".myArea").style("opacity", 1).style("stroke", "none")
   }

  // Area generator
  var area = d3.area()
    // .x(function(d) { return x(d.data.year); })
    .x(function(d) { return x(d.data.week); })
    .y0(function(d) { return y(d[0]); })
    .y1(function(d) { return y(d[1]); })

  // Show the areas
  svg
    .selectAll("mylayers")
    .data(stackedData)
    .enter()
    .append("path")
      .attr("class", "myArea")
      .style("fill", function(d) { return color(d.key); })
      .attr("d", area)
      .on("mouseover", mouseover)
      .on("mousemove", mousemove)
      .on("mouseleave", mouseleave)

})