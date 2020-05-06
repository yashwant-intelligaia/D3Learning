var dataArray = [25,26,28, 32, 35, 39, 42, 48, 52, 55, 59, 64, 68, 72, 100, 112, 119, 129, 135,150, 190];
var dataYears = ['2001','2002','2003','2004','2005','2006','2007','2008','2009','2010','2011','2012'];
var height = 200;
// var width = 500;

var y = d3.scaleLinear()
            .domain([0,180]) //x-axis
            .range([height, 0]); //y-axis
            
var yAxis = d3.axisLeft(y);

console.log(y(0));
console.log(y(90));
console.log(y(180));            
var area = d3.area()
                .x(function(d,i){return i*20})
                .y0(height)
                .y1(function(d){return height - d});

var svg = d3.select("body").append("svg").attr("height","100%").attr("width","100%");
svg.append("path").attr("d", area(dataArray));
svg.append("g").attr("class", "axis y").call(yAxis);