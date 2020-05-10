var dataArray = [5,11,18];
var svg = d3.select("body").append("svg").attr("height","300px").attr("width","100%");
svg.selectAll("rect")
.data(dataArray)
.enter().append("rect")
.attr("height", function(d){return d*15;})
.attr("width",50)
.attr("x", function(d,i){return i*60})
.attr("y", function(d,i){return 300 - d*15});

var newX = 300;
svg.selectAll("circle.first")
.data(dataArray)
.enter().append("circle")
.attr("class","first")
.attr("cx", function(d,i){newX+=(d*3)+(i*20); return newX})
.attr("cy","100")
.attr("r", function(d){return d*3})

var newX = 600;
svg.selectAll("ellipse")
.data(dataArray)
.enter().append("ellipse")
.attr("cx", function(d,i){newX+=(d*3)+(i*20); return newX})
.attr("cy","100")
.attr("rx", function(d){return d*3})
.attr("ry", "30")

var newX = 900;
svg.selectAll("line")
.data(dataArray)
.enter().append("line")
// .style("stroke","green")
// .attr("stroke-width","2px")
.attr("class","line")
.attr("x1", newX)
.attr("y1", function(d,i){return 80+i*20})
.attr("x2", function(d,i){return newX+(d*20)})
.attr("y2", function(d,i){return 80+i*20})

var textArray = ['one','two','three'];
svg.selectAll("tspan").data(textArray)
.enter().append("text")
.attr("x", newX)
.attr("y", function(d,i){return 150+i*30})
.attr("fill", "none")
.attr("stroke", "blue")
.attr("stroke-width","2px")
.attr("font-size", "30")
.attr("text-anchor", function(d,i){switch(d){case 'one': return 'start'; break; case 'two':return 'middle'; break; default: return 'end'; break}})
.attr("dominant-baseline", "middle")
.text(function(d){return d+'!'})

svg.append("line")
.attr("x1",newX)
.attr("y1",150)
.attr("x2",newX)
.attr("y2",210)