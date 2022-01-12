window.addEventListener("load", main)

function main(){
  var zoop = d3.tsv("https://raw.githubusercontent.com/janert/d3-for-the-impatient/master/examples/examples-simple.tsv")
    .then(function(data) {

    // svg
    let svg = d3.select("#plot")
        .append('svg')
        .attr("width",300)
        .attr("height",300)
        .attr("id","svg1")
        .attr("style","background-color:green")

    // scales
    let xScale = d3.scaleLinear()
        .domain([0,600]) // this going to be based on your data
        .range([10,280]); // think of the range as pixel size, informed by the size of the svg

    let yScale = d3.scaleLinear()
        .domain([0,300])
        .range([280,10]);

    d3.select("#svg1")
        .append("g").attr("id","circles")
            .selectAll("circle")
            .data ( data )
            .enter ()
            .append ("circle")
            .attr("r", 5).attr("fill","red")
            .attr( "cx", function(d){ return xScale(d["x"])})
            .attr( "cy", function(d){ return yScale(d["y"])});
            //.attr( "cx", function(d){ return d["x"]})
            //.attr( "cy", function(d){ return d["y"]});

    // x-axis
    svg.append("g")
      .attr("id", "xAxis")
      .attr("transform", "translate(20,280)") // use this to position relative to the svg boundaries
      .call(d3.axisBottom(xScale));


    // y-axis
    svg.append("g")
        .attr("id", "yAxis")
        .attr("transform", "translate(30,0)")
        .call(d3.axisLeft(yScale));

    console.log(yScale(10))

    });
}

// check out: https://www.d3indepth.com/axes/
// https://www.d3-graph-gallery.com/graph/custom_axis.html
