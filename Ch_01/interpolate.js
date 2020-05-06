var dataArray = [{x:5, y:10}, {x:15, y:20}, {x:30, y:10}, {x:45, y:20}, {x:50, y:10}];
var svg = d3.select("body").append("svg").attr("height","300").attr("width","100%");
var interpolateTypes = [d3.curveLinear, d3.curveNatural, d3.curveStep, d3.curveBasis, d3.curveBundle, d3.curveCardinal];

for(var j=0; j<6; j++){
    var line = d3.line()
                    .x(function(d,i){return d.x*6})
                    .y(function(d,i){return d.y*4})
                    // .curve(d3.curveCardinal);
                    .curve(interpolateTypes[j])
                    // .curve(d3.curveStep);
                    // .curve(d3.curveNatural);
                    // .curve(d3.curveCardinalClosed);
    var shiftX= j*250;
    var shiftY= 0;
    var chartGroup = svg.append("g").attr("class","group"+j).attr("transform","translate("+shiftX+",0)");

    chartGroup.append("path")
        .attr("fill","none")
        .attr("stroke","blue")
        .attr("d", line(dataArray))            
        
    chartGroup.selectAll("circle.grp"+j)
        .data(dataArray)
        .enter().append("circle")
                .attr("class", function(d,i){return 'circle'+i})
                .attr("cx", function(d,i){ return d.x*6; })
                .attr("cy", function(d,i){ return d.y*4; })
                .attr("r",2);
}