var parseDate = d3.timeParse("%Y");
d3.xml("asset/other/data2.xml").get(function(error, xml){
    var height = 400;
    var width = 800;
    var margin = {left: 50, right: 50, top:40, bottom:0};

    xml = [].map.call(xml.querySelectorAll("dat"), function(d){
        return {
            date: parseDate(d.getAttribute("id")),
            top: +d.querySelector("top").textContent,
            middle: +d.querySelector("middle").textContent,
            bottom: +d.querySelector("bottom").textContent
        }
    });

    var x = d3.scaleTime()
                .domain(d3.extent(xml, function(d){return d.date}))
                .range([0, width]);

    var y = d3.scaleLinear()
                .domain([0, d3.max(xml, function(d){ return d.top+d.middle+d.bottom})])
                .range([height, 0]);

    var categories = ['top','middle', 'bottom'];

    var stack = d3.stack().keys(categories);

    var area = d3.area()
                    .x(function(d){return x(d.data.date)})
                    .y0(function(d){return y(d[0])})
                    .y1(function(d){return y(d[1])})
                    .curve(d3.curveCardinal)

    var curve = d3.line()
                    .x(function(d){return x(d.data.date)})
                    .y(function(d){return y(d[0])})
                    .curve(d3.curveCardinal)

    var svg = d3.select("body").append("svg").attr("width",width+100).attr("height",height+100);

    var chartGroup = svg.append("g").attr("transform", "translate("+margin.left+","+margin.top+")");
    chartGroup.append("g").attr("class","x axis")
                            .attr("transform","translate(0,"+height+")")
                            .call(d3.axisBottom(x));

    chartGroup.append("g").attr("class","y axis")
                            .call(d3.axisLeft(y))
    var stacked = stack(xml);
    // chartGroup.selectAll("path.area")
    //             .data(stacked)
    //             .enter()
    //             .append("path")
    //             .attr("class","area")
    //             .style("fill",function(d,i){console.log('i==========>',i); return color[i]})
    //             .attr("d", function(d){return area(d);})

    var color = d3.scaleOrdinal(d3.schemeCategory10)

    chartGroup.selectAll("g.area")
                .data(stacked)
                .enter()
                .append("g")
                .attr("class","area")
                .append("path")
                .attr("class", "area")
                .attr("fill",color)
                .attr("d", function(d){return area(d);})
    console.log('stacked xml',stacked)
})
