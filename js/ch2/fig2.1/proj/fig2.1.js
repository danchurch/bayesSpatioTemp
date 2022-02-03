window.addEventListener("load", main)

function main(){

  // base svg and svg props
  const width = 600, height = 600;
  let facetWidth = width; //for now
  let facetHeight = height; //for now
  let svg1 = d3.select("#plot").append('svg')
    .style("width", width)
    .style("height", height)
    .attr("id", "svg1");

  // projection and generator
  let projection = d3.geoAlbersUsa();
  let geoGenerator = d3.geoPath().projection(projection);

  // state drawing function:
  function renderStates(data, data2) {
    projection.fitSize([facetWidth, facetHeight], data);
    let dontWant = ["Hawaii","Alaska","Puerto Rico"];
    data.features = data.features.filter(x => {return(!dontWant.includes(x.properties.name))});
    svg1.append('g')
    .attr('id','statePaths')
    .selectAll('path')
      .data(data.features)
      .join('path')
      .attr('d', geoGenerator)
      .attr('fill', '#ffffff')
      .attr('stroke', '#000')

      // the above renders all the USA lower 48 states
      // now let's make a station-based clipped rectangle:

     let statsXminLon = d3.min(data2, d => d.lon);
     let statsXmaxLon = d3.max(data2, d => d.lon);
     let statsYminLat = d3.min(data2, d => d.lat);
     let statsYmaxLat = d3.max(data2, d => d.lat);

     console.log(statsYmaxLat = d3.max(data2, d => d.lat));

       //.attr( "cy", d => projection([d.lon, d.lat])[1]);

     svg1.append("rect")
       //.attr('x',100) 
       .attr("x", projection([statsXmaxLon, statsYmaxLat])[0])
       .attr("y", projection([statsXmaxLon, statsYmaxLat])[1])
       .attr('width', 100)
       .attr('height', 100)
       //.attr('width', projection([statsXmaxLon, statsYmaxLat])[0]) 
       //.attr('height', projection([statsXmaxLon, statsYmaxLat])[1]) 
       .attr('fill','black');

     svg1.append("circle")
       .attr("cx", projection([statsXminLon, statsYmaxLat])[0])
       .attr("cy", projection([statsXminLon, statsYmaxLat])[1])
       .attr("fill","purple")
       .attr("r","20");

    };
  // station plotting function:
  function drawStations(data){
    svg1.append("g").attr('id',"stationCircs")
      .selectAll("circle")
      .data(data)
      .enter()
      .append("circle")
        .attr("r", 5)
        .attr("fill", "red")
        .attr( "cx", d => projection([d.lon, d.lat])[0])
        .attr( "cy", d => projection([d.lon, d.lat])[1]);
  };


  // now do the rendering:
  d3.json('https://gist.githubusercontent.com/mheydt/29eec003a4c0af362d7a/raw/d27d143bd75626647108fc514d8697e0814bf74b/us-states.json')
    .then(function(mapUSA) {
      d3.csv("https://raw.githubusercontent.com/danchurch/bayesSpatioTemp/main/js/ch2/fig2.1/Tmax_1.csv")
        .then(function(stationData){
           renderStates(mapUSA, stationData);
           drawStations(stationData);
    });
  });
} // end of main, anything past here is probably a mistake


// really we need to figure out how to use our projections for this:

//https://mappingwithd3.com/
//https://github.com/topojson/us-atlas
//https://www.d3indepth.com/geographic/

// this is the one to follow on next session:
//https://www.tutorialguruji.com/javascript/drawing-circles-via-d3js-and-converting-coordinates/
