var width = 960;
var height = 500;

var vertices = d3.range(100).map(function(d){
    return [Math.random()*width, Math.random()*height]
});

var voronoi = d3.voronoi().size([width,height]);
var svg = d3.select("body").append("svg").attr("width",width).attr("height",height);

svg.append("g").attr("class","fuel")
                .selectAll("circle")
                .data(vertices)
                .enter().append("circle")
                .attr("cx",function(d){return d[0]})
                .attr("cy",function(d){return d[1]})
                .attr("r","2.5");

svg.append("g").attr("class","polygons")
        .selectAll("path")
        .data(voronoi.polygons(vertices))
        .enter().append("path")
        .attr("d", function(d){ return "M"+d.join("L")+"Z"})