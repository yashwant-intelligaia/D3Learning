var height = 200;
var width = 500;
var margin = {left:50, right:50, top:40, bottom:0};

var tree = d3.tree().size([width, height]);

var svg = d3.select("body")
            .append("svg")
            .attr("height",height+margin.top+10)
            .attr("width",width+10);

var chartGroup = svg.append("g")
                    .attr("transform","translate("+margin.left+",0)");

d3.json('/asset/json/treeData.json').get(function(error, data){
    var root = d3.hierarchy(data[0]);
    tree(root);

    chartGroup.selectAll("circle")
                .data(root.descendants())
                .enter()
                .append("circle")
                .attr("cx",function(d){return d.x})
                .attr("cy",function(d){return d.y})
                .attr("r","5")

    chartGroup.selectAll("path")
                .data(root.descendants().slice(1))
                .enter()
                .append("path")
                .attr("d", function(d){return "M"+d.x+","+d.y+"L"+d.parent.x+","+d.parent.y; })

    console.log('root', root);
})