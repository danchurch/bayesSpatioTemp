window.addEventListener("load", main)

function main(){

  // base svg and svg props
  const width = 400, height = 400;
  let svg1 = d3.select("#plot").append('svg')
    .style("width", width)
    .style("height", height)
    .attr("id", "svg1");

  // projection and generator
  // let projection = d3.geoAlbersUsa();
  let projection = d3.geoEquirectangular()
    //.center([-80,30])
    .translate([200, 200])
    .scale(400)
    ;
  let geoGenerator = d3.geoPath().projection(projection);

  // function to center and scale based on extent of station data:
  function getCenterExtent(mapCoords) {
    let allLats = mapCoords.map( d => d.lat );
    let allLons = mapCoords.map( d => d.lon );
    let centersLatLon = {"lon":d3.mean(allLons), "lat":d3.mean(allLats)};
    return(centersLatLon);
  };

  // state drawing function:
  function renderStates(data, data2) {
    let centerCoords = getCenterExtent(data2); 
    projection.center([centerCoords.lon, centerCoords.lat]);
    console.log([centerCoords.lon, centerCoords.lat]);
    //projection.center([-80,30]);
    svg1.append('g')
    .attr('id','statePaths')
    .selectAll('path')
      .data(data.features)
      .join('path')
      .attr('d', geoGenerator)
      .attr('fill', '#ffffff')
      .attr('stroke', '#000');
    };

  // station plotting function:
  function drawStations(data){
    svg1.append("g").attr('id',"stationCircs")
      .selectAll("circle")
      .data(data)
      .enter()
      .append("circle")
        .attr("r", 2)
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



//https://mappingwithd3.com/
//https://github.com/topojson/us-atlas
//https://www.d3indepth.com/geographic/

// this is where we need to do a lot of reading:
//https://www.d3indepth.com/geographic/

// this is the one to follow on next session:
//https://www.tutorialguruji.com/javascript/drawing-circles-via-d3js-and-converting-coordinates/

// check out projection.invert(), may be useful

