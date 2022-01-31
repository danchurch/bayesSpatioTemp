window.addEventListener("load", main)

function main(){

// get map data. 
  d3.json('https://gist.githubusercontent.com/mheydt/29eec003a4c0af362d7a/raw/d27d143bd75626647108fc514d8697e0814bf74b/us-states.json')
    .then(function(mapUSA) {

        // can we delete alaska, Puerto Rico and hawaii? they don't fit into the range of our data. 
        let dontWant = ["Hawaii","Alaska","Puerto Rico"];
        mapUSA.features = mapUSA.features.filter(x => {return(!dontWant.includes(x.properties.name))});

        // svg vars
        const width = 600, height = 600;

        // size of map facets
        let facetWidth = width; //for now
        let facetHeight = height; //for now

        // project
        let projection = d3.geoAlbersUsa();
        projection.fitSize([facetWidth, facetHeight], mapUSA);
        let geoGenerator = d3.geoPath()
        .projection(projection);

        console.log(projection( [-3.0026, 16.7666] ));

        let svg1 = d3.select("#plot").append('svg')
          .style("width", width)
        .style("height", height)
        .attr("id", "svg1");

        svg1.append('g')
        .attr('id','statePaths')
        .selectAll('path')
          .data(mapUSA.features)
          .join('path')
          .attr('d', geoGenerator)
          .attr('fill', '#ffffff')
          .attr('stroke', '#000')

  });

  // now that we out of the function, I think we have to get our vars anew from the DOM:

  d3.csv("https://raw.githubusercontent.com/danchurch/bayesSpatioTemp/main/js/ch2/fig2.1/Tmax_1.csv")
    .then(function(stations){

    const width = 600, height = 600;
        let projection = d3.geoAlbersUsa();
        projection.fitSize([facetWidth, facetHeight], mapUSA);

    let svg1 = d3.select("#svg1");

    //console.log(stations);

    svg1.append("g").attr('id',"testCircs")
      .append("circle")
      .attr("r", 30)
      .attr("fill", "green")
      .attr("cx", 200)
      .attr("cy", 200);

    // that works, but the below doesn't yet. Tomorrow:

    // really we need to figure out how to use our projections for this:
    let xScale = d3.scaleLinear()
        .domain([-99.96667,-80.03333])
        .range([10,600]); 

    let yScale = d3.scaleLinear()
        .domain([32.13334,45.86666]) 
        .range([600,0]);

    svg1.append("g").attr('id',"stationCircs")
      .selectAll("circle")
      .data(stations)
      .enter()
      .append("circle")
        .attr("r", 5)
        .attr("fill", "red")
        .attr( "cx", function(d){ return xScale(d["lon"])})
        .attr( "cy", function(d){ return yScale(d["lat"])});
 



  })
} // end of main, anything past here is probably a mistake


//https://mappingwithd3.com/
//https://github.com/topojson/us-atlas
//https://www.d3indepth.com/geographic/

// this is the one to follow on next session:
//https://www.tutorialguruji.com/javascript/drawing-circles-via-d3js-and-converting-coordinates/
