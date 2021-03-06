var dataArray = [5,8,11];
var dataDays = ['Mon','Wed','Fri'];
var rainbow = d3.scaleSequential(d3.interpolateRainbow).domain([0,10]);
var cat20 = d3.schemeCategory20;
console.log(cat20);

var x = d3.scaleBand()
            .domain(dataDays)
            .range([0,170])
            .paddingInner(0.1176);

var xAxis = d3.axisBottom(x);            

var svg = d3.select('body').append('svg').attr("height",400).attr("width","100%");

svg.selectAll('rect')
    .data(dataArray)
    .enter()
    .append('rect')
    .attr('height',function(d,i){return d*15})
    .attr('width', 50)
    .attr('fill',function(d,i){return rainbow(i);})
    .attr('x',function(d,i){return 60*i})
    .attr('y',function(d,i){return 300-(d*15)});

svg.append("g")
    .attr("class","axis x hidden")
    .attr("transform","translate(0,300)")
    .call(xAxis);    