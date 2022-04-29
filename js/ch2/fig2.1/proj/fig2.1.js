window.addEventListener("load", main)

function main(){

  // base svg and svg props
  const width = 400, height = 400;
  let svg1 = d3.select("#plot").append('svg')
    .style("width", width)
    .style("height", height)
    .attr("id", "svg1");

  // projection and generator
  let projection = d3.geoEquirectangular()
    //.center([-80,30])
    .translate([220, 200])
    .scale(1000)
    ;
  let geoGenerator = d3.geoPath().projection(projection);

  // function to center and scale based on extent of station data:
  function getCenterExtent(stationData) {
    let allLats = stationData.map( d => d.lat );
    let allLons = stationData.map( d => d.lon );
    let centersLatLon = {"lon":d3.mean(allLons), "lat":d3.mean(allLats)};
    return(centersLatLon);
  };

  // function to get the min/max of the temperature data:
  function getTempRange(stationData) {
    let temps = stationData.map( d => d.z );
    let tempRange = [ d3.min(temps), d3.mean(temps), d3.max(temps) ];
    return(tempRange);
  }

  // state drawing function:
  function renderStates(data, data2) {
    let centerCoords = getCenterExtent(data2); 
    projection.center([centerCoords.lon, centerCoords.lat]);
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
    let colorSc = d3.scaleLinear()
        .domain(getTempRange(data))
        .range(['green','yellow','red']);
    svg1.append("g").attr('id',"stationCircs")
      .selectAll("circle")
      .data(data)
      .enter()
      .append("circle")
        .attr("r", 2)
        .attr("fill", d => colorSc(d.z))
        .attr( "cx", d => projection([d.lon, d.lat])[0])
        .attr( "cy", d => projection([d.lon, d.lat])[1]);
  };

  // add graticules
  function addGraticules(){
    let graticuleGenerator = d3.geoGraticule();
    let graticules = graticuleGenerator();
    console.log(graticules);
    svg1.append("g").attr('id',"graticules")
      .append("path")
        .attr('d', geoGenerator(graticules))
        .attr('fill', '#ffffff')
        .attr('stroke', 'CadetBlue');
      ;

    //let graticuleGenerator = d3.geoGraticule();
    //let graticules = graticuleGenerator();
    //geoGenerator(graticules);
    }




  // now do the rendering:
  d3.json('https://gist.githubusercontent.com/mheydt/29eec003a4c0af362d7a/raw/d27d143bd75626647108fc514d8697e0814bf74b/us-states.json')
    .then(function(mapUSA) {
      d3.csv("https://raw.githubusercontent.com/danchurch/bayesSpatioTemp/main/js/ch2/fig2.1/Tmax_1.csv")
        .then(function(stationData){
           renderStates(mapUSA, stationData);
           drawStations(stationData);
           addGraticules();
    });
  });
} // end of main, anything past here is probably a mistake




//https://www.d3indepth.com/geographic/

// add graticules
// to tile this...try the three SVG approach?
// which means that the functions need to be made more 
// modular/re-usable.
// today, just add the graticules? 


