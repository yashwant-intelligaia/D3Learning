d3.select(window).on("resize",callFunction);
callFunction();
function callFunction() {

			var svgtest = d3.select("body").select("svg");
			if (!svgtest.empty()) {
				svgtest.remove();
			}

      var width = window.innerWidth||document.documentElement.clientWidth||document.body.clientWidth;
      var height = window.innerHeight;

      var vertices = d3.range(100).map(function(d){ return [Math.random()*width,Math.random()*height]; });

      var voronoi = d3.voronoi().size([width,height]);
      var svg = d3.select("body").append("svg").attr("width",width).attr("height",height);

      svg.append("g").attr("class","polygons")
      .selectAll("path")
        .data(voronoi.polygons(vertices))
        .enter().append("path")
                  .attr("d",function(d){ return "M"+d.join("L")+"Z"; });

      svg.append("g").attr("class","fuel")
      .selectAll("circle")
        .data(vertices)
        .enter().append("circle")
                  .attr("cx",function(d){ return d[0]; })
                  .attr("cy",function(d){ return d[1]; })
                  .attr("r","2.5");

}